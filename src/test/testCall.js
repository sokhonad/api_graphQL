const { graphql } = require("graphql");
const {makeExecutableSchema } = require("apollo-server-express");

const resolvers = require("../resolvers/resolvers");
const typeDefs = require("../schema/typeDefs");

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports= graphqlTestCall = async (
  query,
  variables,
  userId
) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  );
};