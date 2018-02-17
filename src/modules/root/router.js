import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/';

export const routes = [
    {
        method: httpMethods.GET,
        route: '/',
        handler: controller.get,
    },
];
