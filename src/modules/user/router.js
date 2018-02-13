import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/user';

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
        handler: controller.get,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'user',
            action: 'readOwn',
        },
    },
    {
        method: httpMethods.DELETE,
        route: '/',
        handler: controller.deleteSelf,
        accessControl: {
            authenticated: true,
            check: true,
            resource: 'user',
            action: 'deleteOwn',
        },
    },
    {
        method: httpMethods.PATCH,
        route: '/',
        handler: controller.update,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'user',
            action: 'updateOwn',
        },
    },
];
