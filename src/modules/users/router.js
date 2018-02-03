import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/users';

export const routes = [
    {
        method: httpMethods.GET,
        route: '/',
        handler: controller.getAll,
    },
];
