import config from 'config';
import { sign } from 'jsonwebtoken';
import passport from 'koa-passport';

import { convertTimeStringToSeconds } from '../../utils';

/**
 * This will attempt to authenticate a user from a POST request.
 *
 * @export
 * @param {object} ctx
 * @param {function} next
 * @returns {void}
 */
export function authenticate(ctx, next) {
    return passport.authenticate('local', (err, user) => {
        if (err) {
            return ctx.internalServerError(err.message);
        }

        if (!user) {
            return ctx.unauthorized();
        }

        const token = sign(
            {
                iss: config.get('authentication.jwt_iss'),
                sub: user.id,
            },
            config.get('secret'),
            {
                expiresIn: convertTimeStringToSeconds(config.get('authentication.jwt_validity')),
            }
        );

        ctx.ok({ token });
    })(ctx, next);
}

/**
 * This will change the password for the current logged in user.
 *
 * @export
 * @param {object} ctx
 * @returns {void}
 */
export async function password(ctx) {
    const body = ctx.request.body;
    const user = ctx.state.user;

    if (!body.password) {
        return ctx.badRequest('Current password must be provided');
    }

    if (!user.verifyPassword(body.password)) {
        return ctx.badRequest("Current password doesn't match");
    }

    if (body.password === body.new_password) {
        return ctx.badRequest('New password must be different from old password');
    }

    if (!body.new_password) {
        return ctx.badRequest('New password must be provided');
    }

    await user.$query().patch({
        password: body.new_password,
    });

    ctx.noContent();
}
