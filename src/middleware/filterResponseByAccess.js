export default (ctx, next) => {
    if (!ctx.state.permission) {
        return next();
    }

    // filter the response based on the permission the user has
    ctx.response.body = ctx.state.permission.filter(ctx.response.body);

    return next();
};
