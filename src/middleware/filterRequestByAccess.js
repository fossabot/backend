export default (ctx, next) => {
    if (!ctx.state.permission || !ctx.request.body) {
        return next();
    }

    // filter the request based on the permission the user has
    ctx.request.body = ctx.state.permission.filter(ctx.request.body);

    return next();
};
