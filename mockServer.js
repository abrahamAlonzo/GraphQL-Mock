
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql , GraphQLScalarType} from 'graphql';
import { Kind } from 'graphql/language';
import { importSchema } from 'graphql-import';
var typeDef = importSchema('./schema.graphql')
// var typeDef = require('./schema.graphql');
// import schema from './schema.graphql'

const resolverMap = {
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Date custom scalar type',
      parseValue(value) {
        return new Date(value); // value from the client
      },
      serialize(value) {
        return value.getTime(); // value sent to the client
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      },
    }) 
}


// Fill this in with the schema string


// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: typeDef, resolvers: resolverMap });


const DateMock = {
    Date: () => new Date()
  }

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema,mocks: DateMock });
const query = `
    query {
        user(id: 6) { 
            id,
            creationDate,
            activated,
            username,
            firstName,
            lastName,
            age,
            phone,
            email,
            secondaryEmail,
            recoveryEmail
            address {
                street
            },
            oauth2Methods,
            foodPreferences,
            totalMoneyExpend,
            methodsOfPay,
            numberOfTotalOrders,
            coordinates {
                lat,
                lng
            },
        }
    }
`;

const queryCompany = `
    query {
        company(id: 1) {
            companyName
            branchOffice
            email
            recoveryEmail
            phone 
            avatarMobileApp
            avatarAdminApp
        }
    }
`
const queryOrder = `
    query {
        order(id: 1) {
            category
            items {
                id
                SKU
                name
                description
                price
                currency
            }
            totalPrice
            currency
        }
    }
`

const queryMenu = `
    query {
        menu(id: 1) {
            id
            items {
                id
                SKU
                name
                description
                price
                currency
                category {
                    ingredientComposition
                }
            }
            promotions {
                id
                code
            }
        }
    }
`


graphql(schema, query).then((result) => console.log('Got result User: ', JSON.stringify(result, null, 4)));
// graphql(schema, queryCompany).then((result) => console.log('Got result Company: ', JSON.stringify(result, null, 4)));
// graphql(schema, queryOrder).then((result) => console.log('Got result Order: ', JSON.stringify(result, null, 4)));
// graphql(schema, queryMenu).then((result) => console.log('Got result Menu', JSON.stringify(result, null, 4)));


