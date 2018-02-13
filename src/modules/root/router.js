import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/';

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
    },
];
