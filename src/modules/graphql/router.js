import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/graphql';

export const routes = [
    {
        method: [httpMethods.GET, httpMethods.POST],
        route: '/',
        handler: controller.graphql,
    },
    {
        method: httpMethods.GET,
        route: '/graphiql',
        active: process.env.NODE_ENV === 'development',
        handler: controller.graphiql,
    },
];
