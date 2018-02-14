import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/auth';

export const routes = [
    {
        method: httpMethods.POST,
        route: '/',
        handler: controller.authenticate,
    },
    {
        method: httpMethods.POST,
        route: '/password',
        handler: controller.password,
        accessControl: {
            authenticated: true,
        },
    },
];
