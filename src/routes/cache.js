import passport from 'passport';
import { Router } from 'express';

import { checkRole, checkScope } from '../middleware';
import CacheController from '../controllers/CacheController';

export default () => {
    const routes = Router();

    routes.use(passport.authenticate('bearer', { session: false }));
    routes.use(checkRole('admin'));
    routes.use(checkScope('admin:read'));

    routes.get('/', CacheController.index);

    return routes;
};
