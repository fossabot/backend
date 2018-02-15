import { hasNextPages } from 'koa-ctx-paginate';

import User from '../../models/User';

/**
 * This gets all the users in the system.
 *
 * @param {object} ctx
 */
export async function getAll(ctx) {
    const users = await User.query()
        .limit(ctx.query.limit)
        .offset(ctx.paginate.skip);

    const totalUsers = (await User.query().count())[0]['count(*)'];

    const pageCount = Math.ceil(totalUsers / ctx.query.limit);

    const response = {
        type: 'list',
        total_count: totalUsers,
        has_more: hasNextPages(ctx)(pageCount),
        items: users,
    };

    ctx.ok(response);
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
        return ctx.notFound('No user with that Id was found');
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
        return ctx.notFound('No user with that Id was found');
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
        return ctx.notFound('No user with that Id was found');
    }

    const updatedUser = await user.$query().patchAndFetch(ctx.request.body);

    ctx.ok(updatedUser);
}
