import User from '../models/User';

export default async (ctx, next) => {
    if (ctx.state.jwtdata && ctx.state.jwtdata.sub) {
        ctx.state.user = await User.query().findById(ctx.state.jwtdata.sub);
    }

    return next();
};
