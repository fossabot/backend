const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLDateTime } = require('graphql-iso-date');

const User = require('../models/User');

// the GraphQL schema in string form
const typeDefs = `
    scalar DateTime

    type Query {
        users: [User]
    }

    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
        must_change_password: Boolean!,
        is_banned: Boolean!,
        ban_reason: String,
        is_verified: Boolean!,
        verfication_code: String,
        tfa_secret: String,
        created_at: DateTime!,
        updated_at: DateTime,
        banned_at: DateTime,
        verified_at: DateTime,
    }
`;

// the resolvers
const resolvers = {
    DateTime: GraphQLDateTime,
    Query: { users: async () => await User.query() },
};

// put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
