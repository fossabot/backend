import passport from 'passport';
import { Router } from 'express';

import { authorization, decision, token } from '../oauth';

import { RootController } from '../controllers';

export default () => {
    const routes = Router();

    routes.get('/login', RootController.login);
    routes.post('/login', passport.authenticate('local', {successReturnToOrRedirect: '/', failureRedirect: '/login', failureFlash: true}));
    routes.get('/logout', RootController.logout);

    routes.get('/oauth/authorize', authorization);
    routes.post('/oauth/authorize', decision);
    routes.post('/oauth/token', token);

    return routes;
}