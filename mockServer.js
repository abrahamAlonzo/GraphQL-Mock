var { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
var { graphql , GraphQLScalarType} = require('graphql');
var { Kind } = require('graphql/language');

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
const schemaString = `
    scalar Date

    enum Currency {
        DLLS
        MXN
        YEN
    }


    enum Language {
        ES
        EN
        JAP
    }

    type Address {
        street: String
        number: String
        PostalCode: Int
        
    }

    type GeoCoordinates {
        lat: Float
        lng: Float
    }

    type AppPreferences {
        darkMode: String
        pushNotificationsEnabled: [String]
    }

    type Post {
        id: ID!
        comment: String
    }

    type User {
        id: ID!
        activated: Boolean
        creationDate: Date
        username: String
        firstName: String
        lastName: String
        age: Int
        phone: Int
        email: Int
        secondaryEmail: Int
        recoveryEmail: Int
        facebookToken: String
        twitterToken: String
        googlePlusToken: String
        token: String
        address: [Address]
        oauth2Methods: [String]
        foodPreferences: [String]
        totalMoneyExpend: [Int]
        methodsOfPay: [Int]
        numberOfTotalOrders: [Int]
        coordinates: [GeoCoordinates]
        language: Language
        avatar: String
        savedOrders: [Order]
    }

    type Promotion {
        id: ID
        code: String
    }

    type Item {
        id: ID
        SKU: String
        name: String
        description: String
        price: Float
        currency: Currency
        category: Category
    }

    type Menu {
        id: ID!
        items: [Item]
        promotions: [Promotion]
    }

    type Ingredients {
        id: ID!
        name: String
        description: String
        price: Float
        currency: Currency
    }


    type Category {
        ingredientComposition: Boolean
    }

    type Order {
        id: ID!
        category: String
        items: [Item]
        totalPrice: Float
        currency: Currency
    }

    type Company {
        id: ID!
        companyName: String
        branchOffice: String
        email: String
        recoveryEmail: String
        language: Language
        phone: [String] 
        avatarMobileApp: String
        avatarAdminApp: String
        menu: Menu
    }

    # the schema allows the following query:
    type Query {
        user(id: Int!): User
        company(id: Int!): Company
        order(id: Int!): Order
        menu(id: Int!): Menu
    }
`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers: resolverMap });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

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
graphql(schema, queryCompany).then((result) => console.log('Got result Company: ', JSON.stringify(result, null, 4)));
graphql(schema, queryOrder).then((result) => console.log('Got result Order: ', JSON.stringify(result, null, 4)));
graphql(schema, queryMenu).then((result) => console.log('Got result Menu', JSON.stringify(result, null, 4)));


