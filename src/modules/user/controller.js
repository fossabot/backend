import Boom from 'boom';

import User from '../../models/User';

/**
 * This gets all the users in the system.
 *
 * @param {object} ctx
 */
export async function get(ctx) {
    ctx.ok(ctx.state.user);
}

/**
 * This deletes the logged in user from the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function deleteSelf(ctx) {
    if (!ctx.request.body.password || !ctx.state.user.verifyPassword(ctx.request.body.password)) {
        return ctx.throw(403, Boom.forbidden('Password must be sent in request and must match'));
    }

    await ctx.state.user.$query().delete();

    ctx.noContent();
}

/**
 * This will update the logged in user in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function update(ctx) {
    const updatedUser = await ctx.state.user.$query().patchAndFetch(ctx.request.body);

    ctx.ok(updatedUser);
}
