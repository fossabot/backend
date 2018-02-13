import Boom from 'boom';

import User from '../../models/User';

/**
 * This gets all the users in the system.
 *
 * @param {object} ctx
 */
export async function getAll(ctx) {
    const users = await User.query();

    ctx.ok(users);
}

/**
 * This will create a user in the system.
 *
 * @param {object} ctx
 */
export async function create(ctx) {
    const user = await User.query().insert(ctx.request.body);

    // set the Location header of the newly created user
    ctx.set('Location', `/users/${user.id}`);

    ctx.created(user);
}

/**
 * This gets a single user in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function getOne(ctx) {
    const user = await User.query().findById(ctx.params.userId);

    if (!user) {
        return ctx.throw(404, Boom.notFound('No user with that Id was found'));
    }

    ctx.ok(user);
}

/**
 * This deletes a single user in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function deleteOne(ctx) {
    const user = await User.query().findById(ctx.params.userId);

    if (!user) {
        return ctx.throw(404, Boom.notFound('No user with that Id was found'));
    }

    await user.$query().delete();

    ctx.noContent();
}

/**
 * This will update a user in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function update(ctx) {
    const user = await User.query().findById(ctx.params.userId);

    if (!user) {
        return ctx.throw(404, Boom.notFound('No user with that Id was found'));
    }

    const updatedUser = await user.$query().patchAndFetch(ctx.request.body);

    ctx.ok(updatedUser);
}
