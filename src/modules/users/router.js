import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

import isAuthenticated from '../../middleware/isAuthenticated';

export const baseUrl = '/users';

export const routes = [
    {
        method: httpMethods.GET,
        route: '/',
        middleware: [isAuthenticated],
        handler: controller.getAll,
    },
];
