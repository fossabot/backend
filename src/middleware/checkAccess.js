import logger from '../logger';
import ac from '../accesscontrol';
import httpMethods from '../utils/httpMethods';
import { access } from 'fs';

export default (accessControl) => (ctx, next) => {
    if (!ctx.state.user) {
        return ctx.unauthorized('You must be authenticated');
    }

    const role = ctx.state.user ? ctx.state.user.role : 'guest';

    // no action defined, so let's try to figure it out
    if (!accessControl.action) {
        const method = ctx.method.toLowerCase();

        let scope = 'Any';

        // if the user is an owner of this resource, we want to make sure they're affecting Own not Any action
        if (accessControl.isResourceOwner && accessControl.isResourceOwner(ctx)) {
            scope = 'Own';
        }

        if (method === httpMethods.GET) {
            accessControl.action = `read${scope}`;
        } else if (method === httpMethods.POST) {
            accessControl.action = `create${scope}`;
        } else if (method === httpMethods.PUT || method === httpMethods.PATCH) {
            accessControl.action = `update${scope}`;
        } else if (method === httpMethods.DELETE) {
            accessControl.action = `delete${scope}`;
        } else {
            throw new Error('Cannot determine access control action from http method');
        }
    }

    logger.debug(
        `Checking permissions for role '${role}' on action '${accessControl.action}' for resource '${
            accessControl.resource
        }'`
    );

    const permission = ac.can(role)[accessControl.action](accessControl.resource);

    if (!permission.granted) {
        return ctx.forbidden('You do not have permission to do this');
    }

    ctx.state.permission = permission;
    ctx.state.accessControl = accessControl;

    return next();
};
