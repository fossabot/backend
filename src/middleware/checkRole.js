export default (neededRole) => (ctx, next) => {
    const role = ctx.state.user ? ctx.state.user.role : 'guest';

    if (role !== neededRole) {
        return ctx.forbidden('You do not have permission to do that');
    }

    return next();
};
