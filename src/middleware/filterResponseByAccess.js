import ac from '../accesscontrol';

export default (ctx, next) => {
    if (!ctx.state.permission) {
        return next();
    }

    const accessControl = ctx.state.accessControl;

    // when creating or updating any, we need to change the permission to that of a read
    if (accessControl.action === 'createAny' || accessControl.action === 'updateAny') {
        ctx.state.permission = ac.can(ctx.state.user.role).readAny(accessControl.resource);
    }

    // when creating or updating own, we need to change the permission to that of a read
    if (accessControl.action === 'createOwn' || accessControl.action === 'updateOwn') {
        ctx.state.permission = ac.can(ctx.state.user.role).readOwn(accessControl.resource);
    }

    // filter the response based on the permission the user has
    const body = ctx.response.body;

    // filter list types differently than normal
    if (body.type && body.type === 'list') {
        ctx.response.body.items = ctx.state.permission.filter(body.items);
    } else {
        ctx.response.body = ctx.state.permission.filter(body);
    }

    return next();
};
