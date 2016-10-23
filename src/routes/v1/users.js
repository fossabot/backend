import passport from 'passport';
import { Router } from 'express';

import { checkRole, checkScope } from '../../middleware';
import UsersController from '../../controllers/v1/UsersController';

export default () => {
    const routes = Router();

    routes.use(passport.authenticate('bearer', {session: false}));
    routes.use(checkRole('admin'));

    routes.get('/', checkScope('admin:read'), UsersController.index);
    routes.get('/:user_id', checkScope('admin:read'), UsersController.get);
    routes.post('/', checkScope('admin:write'), UsersController.post);
    routes.put('/:user_id', checkScope('admin:write'), UsersController.put);
    routes.delete('/:user_id', checkScope('admin:write'), UsersController.delete);

    return routes;
}