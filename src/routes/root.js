import passport from 'passport';
import { Router } from 'express';

import { authorization, decision, token } from '../oauth';

import AuthController from '../controllers/AuthController';

export default () => {
    const routes = Router();

    routes.get('/login', AuthController.login);
    routes.post('/login', passport.authenticate('local', {successReturnToOrRedirect: '/', failureRedirect: '/login', failureFlash: true}));
    routes.get('/logout', AuthController.logout);

    routes.get('/oauth/authorize', authorization);
    routes.post('/oauth/authorize', decision);
    routes.post('/oauth/token', token);

    return routes;
}