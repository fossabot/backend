import Boom from 'boom';

import User from '../../models/User';

/**
 * This gets all the users in the system.
 *
 * @param {object} ctx
 */
export async function getAll(ctx) {
    const users = await User.query().omit(['password']);

    ctx.ok(users);
}

/**
 * This gets a single user in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function getOne(ctx) {
    const user = await User.query()
        .findById(ctx.params.userId)
        .omit(['password']);

    if (!user) {
        return ctx.throw(404, Boom.notFound('No user with that Id was found'));
    }

    ctx.ok(user);
}
