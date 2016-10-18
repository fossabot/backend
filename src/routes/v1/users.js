import passport from 'passport';
import { Router } from 'express';

import { checkRole, checkScope } from '../../middleware';
import UsersController from '../../controllers/v1/UsersController';

export default () => {
    const routes = Router();

    routes.use(passport.authenticate('bearer', {session: false}));
    routes.use(checkRole('admin'));

    routes.get('/', checkScope('admin:read'), UsersController.index);
    routes.post('/', checkScope('admin:write'), UsersController.post);
    routes.put('/{id}', checkScope('admin:write'), UsersController.put);
    routes.delete('/{id}', checkScope('admin:write'), UsersController.delete);

    return routes;
}