import ac from '../accesscontrol';

export default (ctx, next) => {
    if (!ctx.state.permission) {
        return next();
    }

    if (ctx.state.accessControl.response) {
        const accessControl = ctx.state.accessControl;
        const permission = ac.can(ctx.state.user.role)[accessControl.response.action](accessControl.response.resource);

        // filter the response based on the permission the user has for the custom response control
        ctx.response.body = permission.filter(ctx.response.body);
    } else {
        // filter the response based on the permission the user has
        ctx.response.body = ctx.state.permission.filter(ctx.response.body);
    }

    return next();
};
