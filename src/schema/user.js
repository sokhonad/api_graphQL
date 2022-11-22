const { gql } =require("apollo-server-express");

module.exports= gql`
  type User {
    id: ID!
    name: String
  }

  type Query {
    user(id: ID!): User
    viewer: User!
  }

  type Mutation {
    login(email: String!, password: String!): String

    createUser(
      name: String!
      email: String!
      password: String!
      roles: [String]
      permissions: [String]
      ): User!
  }
`;
