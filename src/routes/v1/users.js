import passport from 'passport';
import { Router } from 'express';

import { checkPermissions } from '../../middleware';
import UsersController from '../../controllers/v1/UsersController';

export default () => {
    const routes = Router();

    routes.get('/', [passport.authenticate('bearer', {session: false}), checkPermissions({role: 'admin', scope: 'admin:read'})], UsersController.index);
    routes.post('/', [passport.authenticate('bearer', {session: false}), checkPermissions({role: 'admin', scope: 'admin:write'})], UsersController.post);
    routes.put('/{id}', [passport.authenticate('bearer', {session: false}), checkPermissions({role: 'admin', scope: 'admin:write'})], UsersController.put);
    routes.delete('/{id}', [passport.authenticate('bearer', {session: false}), checkPermissions({role: 'admin', scope: 'admin:write'})], UsersController.delete);

    return routes;
}