import config from 'config';

import * as controller from './controller';
import httpMethods from '../../utils/httpMethods';

export const baseUrl = '/graphql';

export const routes = [
    {
        method: [httpMethods.GET, httpMethods.POST],
        route: '/',
        active: config.get('graphql.enabled'),
        handler: controller.graphql,
    },
    {
        method: httpMethods.GET,
        route: '/graphiql',
        active: config.get('graphql.graphiql.enabled'),
        handler: controller.graphiql,
    },
];
