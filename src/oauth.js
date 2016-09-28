import passport from 'passport';
import oauth2orize from 'oauth2orize';
import login from 'connect-ensure-login';

import { getConfig } from '../config';
import { addTimeStringToDate, generateUID } from './utils';

import OAuthClient from './models/OAuthClient';
import OAuthAccessToken from './models/OAuthAccessToken';
import OAuthRefreshToken from './models/OAuthRefreshToken';
import OAuthAuthorizationCode from './models/OAuthAuthorizationCode';

const config = getConfig();
const server = oauth2orize.createServer();

server.serializeClient(function (client, done) {
    console.log('serializeClient', client);
    return done(null, client.client_id);
});

server.deserializeClient(async function (id, done) {
    console.log('deserializeClient', id);
    try {
        const client = await OAuthClient.query().where({client_id: id}).first();

        if (!client) {
            return done(new Error('Client not found.'));
        }

        console.log('deserializeClient:client', client);

        return done(null, client);
    } catch (err) {
        return done(err);
    }
});

server.grant(oauth2orize.grant.code(async function (client, redirectURI, user, ares, done) {
    const code = {
        authorization_code: generateUID(),
        client_id: client.id,
        user_id: user.id,
        redirect_uri: redirectURI,
        expires_at: addTimeStringToDate(config.oauth.validity.authorization_code)
    };

    console.log('code', code);

    try {
        const authorizationCode = await OAuthAuthorizationCode.query().insert(code);

        if (!authorizationCode) {
            return done(new Error('Error creating authorization code.'));
        }

        return done(null, code.authorization_code);
    } catch (err) {
        return done(err);
    }
}));

server.exchange(oauth2orize.exchange.authorizationCode(async function (client, code, redirectURI, done) {
    console.log('exchange', client, code, redirectURI);
    try {
        const authorizationCode = await OAuthAuthorizationCode.query().where({authorization_code: code}).first();

        console.log('authorizationCode', authorizationCode);

        if (!authorizationCode) {
            console.log('no authorizationCode');
            return done(null, false);
        }

        if (client.id !== authorizationCode.client_id) {
            console.log('non matching client id');
            return done(null, false);
        }

        if (redirectURI !== authorizationCode.redirect_uri) {
            console.log('non matching redirect uri');
            return done(null, false);
        }

        await OAuthAuthorizationCode.query().findById(authorizationCode.id).delete();

        const accessToken = await OAuthAccessToken.query().insert({
            user_id: authorizationCode.user_id,
            client_id: authorizationCode.client_id,
            access_token: generateUID(256),
            expires_at: addTimeStringToDate(config.oauth.validity.access_token)
        });

        console.log('accessToken', accessToken);

        if (!accessToken) {
            return done(new Error('Error creating access token.'));
        }

        const refreshToken = await OAuthRefreshToken.query().insert({
            access_token_id: accessToken.id,
            refresh_token: generateUID(256),
            expires_at: addTimeStringToDate(config.oauth.validity.refresh_token)
        });

        console.log('refreshToken', refreshToken);

        if (!refreshToken) {
            return done(new Error('Error creating refresh token.'));
        }

        return done(null, accessToken.access_token, refreshToken.refresh_token);
    } catch (err) {
        return done(err);
    }
}));

export const authorization = [
    login.ensureLoggedIn(),
    server.authorization(async function (clientID, redirectURI, done) {
        console.log('authorization', clientID, redirectURI);

        try {
            const client = await OAuthClient.query().where({
                client_id: clientID,
                redirect_uri: redirectURI
            }).first();

            console.log('client', client);

            if (!client) {
                console.log('no client');
                return done(new Error('Client not found.'));
            }

            console.log('authorized');

            return done(null, client, redirectURI);
        } catch (err) {
            return done(err);
        }
    }),
    function (req, res) {
        res.render('dialog', {transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client});
    }
];

export const decision = [
    login.ensureLoggedIn(),
    server.decision()
];

export const token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
];

export default server;