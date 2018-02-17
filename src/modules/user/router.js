import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/user';

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
