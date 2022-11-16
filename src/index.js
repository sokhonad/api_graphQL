const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const mongoose = require('mongoose');


const { applyMiddleware } = require("graphql-middleware");
const express = require("express");
const expressJwt = require("express-jwt");

const permissions = require("./permissions");
const resolvers = require("./resolvers/resolvers");

const typeDefs = require("./schema/typeDefs");

const port = 3000;
const app = express();

app.use(
  expressJwt({
    secret: "SUPER_SECRET",
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs,resolvers }),
    permissions
  ),
  context: ({ req }) => {
    const user = req.user || null;
    console.log(user)
    return { user };
  }
});

server.applyMiddleware({ app });
  
 mongoose.connect("mongodb://localhost/apigql", {
  useNewUrlParser: true
});
app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
