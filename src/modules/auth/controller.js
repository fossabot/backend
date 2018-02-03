import Boom from 'boom';
import config from 'config';
import { sign } from 'jsonwebtoken';
import passport from 'koa-passport';

import { convertTimeStringToMilliseconds } from '../../utils';

/**
 * This will attempt to authenticate a user from a POST request.
 *
 * @export
 * @param {object} ctx
 * @param {function} next
 * @returns {void}
 */
export function authenticate(ctx, next) {
    // eslint-disable-next-line consistent-return
    return passport.authenticate('local', (err, user) => {
        if (err) {
            return ctx.throw(500, Boom.serverUnavailable(err.message));
        }

        if (!user) {
            return ctx.throw(401, Boom.unauthorized());
        }

        const token = sign(
            {
                iss: config.get('authentication.jwt_iss'),
                sub: user.id,
            },
            config.get('secret'),
            {
                expiresIn: convertTimeStringToMilliseconds(config.get('authentication.jwt_validity')),
            }
        );

        ctx.body = { token };
    })(ctx, next);
}
