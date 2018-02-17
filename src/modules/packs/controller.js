import { hasNextPages } from 'koa-ctx-paginate';

import Pack from '../../models/Pack';

/**
 * This gets all the packs in the system.
 *
 * @param {object} ctx
 */
export async function getAll(ctx) {
    const packs = await Pack.query()
        .eager('[packTags as pack_tags, launcherTags as launcher_tags]')
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
export function getOne(ctx) {
    ctx.ok(ctx.state.resolved.pack);
}

/**
 * This gets a single pack's pack tags.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function postPackTags(ctx) {
    const packTag = await ctx.state.resolved.pack.$relatedQuery('packTags').insert({ tag: ctx.request.body.tag });

    ctx.ok(packTag);
}

/**
 * This gets a single pack's launcher tags.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function postLauncherTags(ctx) {
    const launcherTag = await ctx.state.resolved.pack
        .$relatedQuery('launcherTags')
        .insert({ tag: ctx.request.body.tag });

    ctx.ok(launcherTag);
}

/**
 * This deletes a single pack in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function deleteOne(ctx) {
    await ctx.state.resolved.pack.$query().delete();

    ctx.noContent();
}

/**
 * This will update a pack in the system.
 *
 * @param {object} ctx
 * @returns {void}
 */
export async function update(ctx) {
    const updatedPack = await ctx.state.resolved.pack.$query().patchAndFetch(ctx.request.body);

    ctx.ok(updatedPack);
}
