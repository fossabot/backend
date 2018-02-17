export default (ctx, next) => {
    if (!ctx.state.user) {
        return ctx.unauthorized('You must be authenticated');
    }

    return next();
};
