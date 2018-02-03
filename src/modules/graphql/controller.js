import { printSchema } from 'graphql';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import schema from '../../graphql/schema';

export const graphql = graphqlKoa({ schema: schema });

export const graphiql = graphiqlKoa({ endpointURL: '/graphql' });

export function print(ctx) {
    ctx.type = 'text/plain';
    ctx.body = printSchema(schema);
}
