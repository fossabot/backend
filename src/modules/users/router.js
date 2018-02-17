import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/users';

export const routes = [
    {
        method: httpMethods.GET,
        route: '/',
        handler: controller.getAll,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'user',
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
            resource: 'user',
        },
    },
    {
        method: httpMethods.GET,
        route: '/:userId',
        handler: controller.getOne,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'user',
        },
    },
    {
        method: httpMethods.DELETE,
        route: '/:userId',
        handler: controller.deleteOne,
        accessControl: {
            authenticated: true,
            check: true,
            resource: 'user',
        },
    },
    {
        method: httpMethods.PATCH,
        route: '/:userId',
        handler: controller.update,
        accessControl: {
            authenticated: true,
            check: true,
            filter: true,
            resource: 'user',
        },
    },
];
