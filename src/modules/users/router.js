import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

import isAuthenticated from '../../middleware/isAuthenticated';

export const baseUrl = '/users';

export const middleware = [isAuthenticated];

export const routes = [
    {
        method: httpMethods.GET,
        route: '/',
        handler: controller.getAll,
    },
    {
        method: httpMethods.GET,
        route: '/:userId',
        handler: controller.getOne,
    },
];
