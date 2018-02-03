import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/auth';

export const routes = [
    {
        method: httpMethods.POST,
        route: '/',
        handler: controller.authenticate,
    },
];
