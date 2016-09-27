import bcrypt from 'bcryptjs';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import ClientPasswordStrategy from 'passport-oauth2-client-password';

import User from './models/User';
import OAuthClient from './models/OAuthClient';
import OAuthAccessToken from './models/OAuthAccessToken';

passport.use(new LocalStrategy(async function (username, password, done) {
    console.log('LocalStrategy', username, password);
    const user = await User.query().where({username}).first();

    console.log('user', user);

    if (!user) {
        console.log('no user');
        return done(null, false);
    }

    if (!bcrypt.compareSync(password, user.password)) {
        console.log('bad password');
        return done(null, false);
    }

    console.log('authenticated');
    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    console.log('deserializeUser', id);
    const user = await User.query().findById(id);

    if (!user) {
        return done(new Error('Error finding user.'));
    }

    return done(null, user);
});

passport.use(new BasicStrategy(async function (username, password, done) {
    console.log('BasicStrategy', username, password);
    const client = await OAuthClient.query().where({client_id: username}).first();

    if (!client) {
        return done(null, false);
    }

    if (client.client_secret !== password) {
        return done(null, false);
    }

    return done(null, client);
}));

passport.use(new ClientPasswordStrategy(async function (clientId, clientSecret, done) {
    console.log('ClientPasswordStrategy', clientId, clientSecret);
    const client = await OAuthClient.query().where({client_id: clientId, client_secret: clientSecret}).first();

    if (!client) {
        return done(null, false);
    }

    return done(null, client);
}));

passport.use(new BearerStrategy(async function (accessToken, done) {
    console.log('BearerStrategy', accessToken);
    const token = await OAuthAccessToken.query().where({access_token: accessToken}).first();

    if (!token) {
        return done(null, false);
    }

    const user = await User.query().findById(token.user_id);

    if (!user) {
        return done(null, false);
    }

    return done(null, user, {scope: '*'});
}));