# GraphQL-Mock
GraphQL server Mock using graphql-tools and common schemas

Common mock schemas for apps using graphql

## Getting Starter
```shell
git clone git@github.com:abrahamAlonzo/GraphQL-Mock.git
cd GraphQL-Mock
npm install
npm start
```

## Custom Type

Graphql doesn't have date type as timestamp, but in order to have one, you can do something like

```
scalar Date

type MyType {
    created: Date
}

```

with his own resolver

```
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

```
## Example of Schemas

- User
- Post

>Note: If your schema has custom scalar types, you still need to define the __serialize, __parseValue, and __parseLiteral functions, and pass them inside the second argument to makeExecutableSchema.


