import Boom from 'boom';

import logger from '../logger';
import ac from '../accesscontrol';

export default (accessControl) => (ctx, next) => {
    if (!ctx.state.user) {
        return ctx.throw(401, Boom.unauthorized('You must be authenticated'));
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

    return next();
};
