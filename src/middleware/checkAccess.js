import Boom from 'boom';

import logger from '../logger';
import ac from '../accesscontrol';
import httpMethods from '../utils/httpMethods';

export default (accessControl) => (ctx, next) => {
    if (!ctx.state.user) {
        return ctx.throw(401, Boom.unauthorized('You must be authenticated'));
    }

    // no action defined, so let's try to figure it out
    if (!accessControl.action) {
        const method = ctx.method.toLowerCase();

        if (method === httpMethods.GET) {
            accessControl.action = 'readAny';
        } else if (method === httpMethods.POST) {
            accessControl.action = 'createAny';
        } else if (method === httpMethods.PUT) {
            accessControl.action = 'updateAny';
        } else if (method === httpMethods.DELETE) {
            accessControl.action = 'deleteAny';
        } else {
            throw new Error('Cannot determine access control action from http method');
        }
    }

    logger.debug(
        `Checking permissions for role '${ctx.state.user.role}' on action '${accessControl.action}' for resource '${
            accessControl.resource
        }'`
    );

    const permission = ac.can(ctx.state.user.role)[accessControl.action](accessControl.resource);

    if (!permission.granted) {
        return ctx.throw(403, Boom.forbidden('You do not have permission to do this'));
    }

    ctx.state.permission = permission;
    ctx.state.accessControl = accessControl;

    return next();
};
