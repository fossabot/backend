import { GraphQLDateTime } from 'graphql-iso-date';
import { makeExecutableSchema } from 'graphql-tools';

import User from '../models/User';
import * as types from './types';

const RootQuery = `
    """
    Root query used at the base for all queries
    """
    type RootQuery {
        """
        Get a single user
        """
        user(id: ID!): UserType

        """
        Get all users
        """
        users: [UserType]
    }
`;

const SchemaDefinition = `
    schema {
        query: RootQuery
    }
`;

// the resolvers
const resolvers = {
    DateTime: GraphQLDateTime,
    RootQuery: {
        user: async (obj, args) => await User.query().findById(args.id),
        users: async () => await User.query(),
    },
};

// put together a schema
const schema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery, types.UserType],
    resolvers,
});

export default schema;
