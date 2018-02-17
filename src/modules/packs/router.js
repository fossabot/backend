import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/packs';

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
