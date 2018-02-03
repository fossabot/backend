import Boom from 'boom';

import User from '../models/User';

export default async (ctx, next) => {
    if (!ctx.state.jwtdata || !ctx.state.jwtdata.sub) {
        return ctx.throw(401, Boom.unauthorized('You must be authenticated'));
    }

    ctx.state.user = await User.query().findById(ctx.state.jwtdata.sub);

    return next();
};
