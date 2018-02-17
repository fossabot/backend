import Pack from '../../models/Pack';
import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/packs';

/**
 * This will resolve any packId params to a Pack object and place it in the context state, returning a not found if it
 * wasn't found.
 *
 * @param {object} ctx
 * @param {function} next
 * @returns {void}
 */
export const paramResolver = async (ctx, next) => {
    if (!ctx.params || !ctx.params.packId) {
        return next();
    }

    // grab the pack (if exists) along with it's tags
    const pack = await Pack.query()
        .eager('[packTags as pack_tags, launcherTags as launcher_tags]')
        .findById(ctx.params.packId);

    if (!pack) {
        return ctx.notFound('No pack with that Id was found');
    }

    ctx.state.resolved = {
        pack,
    };

    return next();
};

/**
 * Middleware run order:
 *
 * - Check for authenticated user (accessControl.authenticated === true)
 * - Any middleware defined in the route definition under `middleware` array
 * - Check if user has access to route (accessControl.check === true)
 * - Filter out inaccessible attributes from request (accessControl.filter === true)
 * - Handler method
 * - Filter out inaccessible attributes from response (accessControl.filter === true)
 * - Any middleware defined in the route definition under `afterMiddleware` array
 */
export const routes = [
    {
        method: httpMethods.GET,
        route: '/',
        handler: controller.getAll,
        accessControl: {
            authenticated: false,
            check: true,
            filter: true,
            resource: 'pack',
        },
    },
    {
        method: httpMethods.GET,
        route: '/:packId',
        handler: controller.getOne,
        accessControl: {
            authenticated: false,
            check: true,
            filter: true,
            resource: 'pack',
        },
    },
    {
        method: httpMethods.POST,
        route: '/:packId/tags/pack',
        handler: controller.postPackTags,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'packTag',
            isResourceOwner: async (ctx) => await ctx.state.resolved.pack.canCreate(ctx.state.user),
        },
    },
    {
        method: httpMethods.POST,
        route: '/:packId/tags/launcher',
        handler: controller.postLauncherTags,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'launcherTag',
            isResourceOwner: async (ctx) => await ctx.state.resolved.pack.canCreate(ctx.state.user),
        },
    },
    {
        method: httpMethods.POST,
        route: '/',
        handler: controller.create,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'pack',
        },
    },
    {
        method: httpMethods.DELETE,
        route: '/:packId',
        handler: controller.deleteOne,
        accessControl: {
            authenticated: true,
            check: true,
            resource: 'pack',
        },
    },
    {
        method: httpMethods.PATCH,
        route: '/:packId',
        handler: controller.update,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'pack',
        },
    },
];
