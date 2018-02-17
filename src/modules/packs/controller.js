import { hasNextPages } from 'koa-ctx-paginate';

import Pack from '../../models/Pack';

/**
 * This gets all the packs in the system.
 *
 * @param {object} ctx
 */
export async function getAll(ctx) {
    const packs = await Pack.query()
        .limit(ctx.query.limit)
        .offset(ctx.paginate.skip);

    const totalPacks = (await Pack.query().count())[0]['count(*)'];

    const pageCount = Math.ceil(totalPacks / ctx.query.limit);

    const response = {
        type: 'list',
        total_count: totalPacks,
        has_more: hasNextPages(ctx)(pageCount),
        items: packs,
    };

    ctx.ok(response);
}

/**
 * This will create a pack in the system.
 *
 * @param {object} ctx
 */
export async function create(ctx) {
    const pack = await Pack.query().insert(ctx.request.body);

    // set the Location header of the newly created pack
    ctx.set('Location', `/packs/${pack.id}`);

    ctx.created(pack);
}

/**
 * This gets a single pack in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function getOne(ctx) {
    const pack = await Pack.query().findById(ctx.params.packId);

    if (!pack) {
        return ctx.notFound('No pack with that Id was found');
    }

    ctx.ok(pack);
}

/**
 * This deletes a single pack in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function deleteOne(ctx) {
    const pack = await Pack.query().findById(ctx.params.packId);

    if (!pack) {
        return ctx.notFound('No pack with that Id was found');
    }

    await pack.$query().delete();

    ctx.noContent();
}

/**
 * This will update a pack in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function update(ctx) {
    const pack = await Pack.query().findById(ctx.params.packId);

    if (!pack) {
        return ctx.notFound('No pack with that Id was found');
    }

    const updatedPack = await pack.$query().patchAndFetch(ctx.request.body);

    ctx.ok(updatedPack);
}
