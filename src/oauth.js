import passport from 'passport';
import oauth2orize from 'oauth2orize';
import login from 'connect-ensure-login';

import { generateUID } from './utils';

import OAuthClient from './models/OAuthClient';
import OAuthAccessToken from './models/OAuthAccessToken';
import OAuthAuthorizationCode from './models/OAuthAuthorizationCode';

const server = oauth2orize.createServer();

server.serializeClient(function (client, done) {
    console.log('serializeClient', client);
    return done(null, client.client_id);
});

server.deserializeClient(async function (id, done) {
    console.log('deserializeClient', id);
    const client = await OAuthClient.query().where({client_id: id}).first();

    if (!client) {
        return done(new Error('Client not found.'));
    }

    console.log('deserializeClient:client', client);

    return done(null, client);
});

server.grant(oauth2orize.grant.code(async function (client, redirectURI, user, ares, done) {
    const code = {
        authorization_code: generateUID(),
        client_id: client.id,
        user_id: user.id,
        redirect_uri: redirectURI
    };

    const authorizationCode = await OAuthAuthorizationCode.query().insert(code);

    if (!authorizationCode) {
        return done(new Error('Error creating authorization code.'));
    }

    return done(null, code.authorization_code);
}));

server.exchange(oauth2orize.exchange.code(async function (client, code, redirectURI, done) {
    console.log('exchange', client, code, redirectURI);
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

    const token = generateUID(256);

    const accessToken = await OAuthAccessToken.query().insert({
        user_id: authorizationCode.user_id,
        client_id: authorizationCode.client_id,
        access_token: token
    });

    console.log('accessToken', accessToken);

    if (!accessToken) {
        return done(new Error('Error creating access token.'));
    }

    return done(null, token);
}));

export const authorization = [
    login.ensureLoggedIn(),
    server.authorization(async function (clientID, redirectURI, done) {
        console.log('authorization', clientID, redirectURI);

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