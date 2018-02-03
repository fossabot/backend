import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/graphql';

export const routes = [
    {
        method: [httpMethods.GET, httpMethods.POST],
        route: '/',
        handlers: controller.graphql,
    },
    {
        method: httpMethods.GET,
        route: '/graphiql',
        active: process.env.NODE_ENV === 'development',
        handlers: controller.graphiql,
    },
];
