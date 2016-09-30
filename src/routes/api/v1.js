import passport from 'passport';
import { Router } from 'express';

import { RootController } from '../../controllers/api/v1';

export default () => {
    const routes = Router();

    routes.get('/', passport.authenticate(['bearer', 'anonymous'], {session: false}), RootController.root);
    routes.get('/scopes', RootController.scopes);
    routes.get('/roles', RootController.roles);

    return routes;
}