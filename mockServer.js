var { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
var { graphql } = require('graphql');

// Fill this in with the schema string
const schemaString = `
    type User {
        id: Int!
        firstName: String
        lastName: String
    }

    # the schema allows the following query:
    type Query {
        user(id: Int!): User
    }

`;


// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

const query = `
    query {
    user(id: 6) { id, firstName, lastName }
    }
`;

graphql(schema, query).then((result) => console.log('Got result', result));


