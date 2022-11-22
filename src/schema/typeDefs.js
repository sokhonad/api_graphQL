const { gql } =require("apollo-server-express");

module.exports= gql`
  type User {
    id: ID!
    name: String
  }

  type annonce {
    id: ID!
    titre: String!
    type: String!
    statusPublication: String!
    statusBien: String!
    prix: Int!
    dateDisponibilite: String!
    description: String!
    photos: String!
    comments :[comments]
  }

  type comments {
    commenterId:String!
    commenterPseudo: String!
    text: String!
    timestamp: Int!
  }

  type Query {
    user(id: ID!): User
    viewer: User!
    getAllAnnonces: [annonce!]!
  }

  type Mutation {
    login(email: String!, password: String!): String

    createUser(
      name: String!
      email: String!
      password: String!
      roles: [String]
      permissions: [String]
      ): User

      createAnnonce(
        titre: String!
        type: String!
        statusPublication: String!
        statusBien: String!
        prix: Int!
        dateDisponibilite: String!
        description: String!
        photos: String!
        ): annonce!


      deleteAnnonce(id: String!): String

      updateAnnonce(ID :String!
        titre: String
        type: String
        statusPublication: String
        statusBien: String
        prix: Int
        dateDisponibilite: String
        description: String
        photos: String
        ): annonce!

      commentAnnonce(id: String!,text: String!): annonce!
  }
`;
