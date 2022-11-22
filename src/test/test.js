
const { ApolloServer,gql } = require("apollo-server-express");
const resolvers = require("../resolvers/resolvers");
const typeDefs = require("../schema/typeDefs");
const mongoose = require('mongoose');


const  graphqlTestCall  = require("./testCall");

const modelUsers  =require("../models/user");
const modelAnnonce  =require("../models/annonce");

mongoose.connect("mongodb://localhost/apigqlTest", {
  useNewUrlParser: true
});



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const testUser = { name: "bob",email: "bob@bob.com", password: "bobby" };

it("should validate user info correctly", async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation {
        login(
          credentials: {
            email: "bob@gmail.com"
            username: "helloworld"
            password: ""
          }
        )
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result.errors).toBeTruthy();
});

const registerMutation = `
  mutation RegisterMutation($name: String!,$email: String!, $password: String!) {
    createUser(name: $name,email: $email, password: $password){
      name
    }
  }
`;


const loginMutation = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;


const deleteAnnonceMutation = `
  mutation deleteAnnonceMutation($id: String!) {
    deleteAnnonce(id: $id)
  }
`;

const updateAnnonceMutation = `
  mutation updateAnnonceMutation($ID: String!,$titre: String!) {
    updateAnnonce(ID: $ID,titre: $titre){
      titre
    }
  }
`;

const getAllAnnoncesMutation = `
  mutation getAllAnnoncesMutation() {
    getAllAnnonces(){
      titre
    }
  }
`;

const viewer = `
  query viewerQuery {
    viewer {
      name
    }
  }
`;

describe("resolvers", () => {
  it("register", async () => {
    const testUser = { name: "bob",email: "bob@bobb.com", password: "bobby" };

    const registerResponse = await graphqlTestCall(registerMutation, {
      name: testUser.name,
      email: testUser.email,
      password: testUser.password
    });
    expect(registerResponse).toEqual({
      data: {
        createUser: {
          name: testUser.name
        }
      }
    });

    });


  
   mongoose.connection.dropDatabase();
});

describe("resolvers", () => {
  it("login", async () => {
    const dbUser = await modelUsers.findOne({ where: { email: testUser.email } });

    expect(dbUser).toBeDefined();
  
    const response = await graphqlTestCall(loginMutation, {
      email: testUser.email,
      password: testUser.password
    });
    expect(response).toBeDefined();

  });

});

describe("resolvers", () => {

  it("delete annonce", async () => {
    const annonce = new modelAnnonce({
      titre:"testAnnonce",
    });
    await annonce.save();
    const testAnnonce = await modelAnnonce.findOne({ where: { titre: 'testAnnonce'} });

    expect(testAnnonce).toBeDefined();
    const response = await graphqlTestCall(deleteAnnonceMutation, {
      id: testAnnonce.id,
    });
    expect(response).toBeDefined();

  });
  });

  describe("resolvers", () => {

    it("update annonce", async () => {
      const annonce = new modelAnnonce({
        titre:"testAnnonce",
      });
      await annonce.save();
      const testAnnonce = await modelAnnonce.findOne({ where: { titre: 'testAnnonce'} });
  
      expect(testAnnonce).toBeDefined();
      const response = await graphqlTestCall(updateAnnonceMutation, {
        ID: testAnnonce.id,titre: "mise a jour titre"
      });
      expect(response).toBeDefined();
      expect(response).toEqual({
        data: {
          updateAnnonce: {
            titre:  "mise a jour titre"
          }
        }
      })
  
    });
    });

    describe("resolvers", () => {

      it("getAllAnnonce", async () => {
        const annonce = new modelAnnonce({
          titre:"testAnnonce",
        });
        await annonce.save();
        const testAnnonce = await modelAnnonce.findOne({ where: { titre: 'testAnnonce'} });
    
        expect(testAnnonce).toBeDefined();
        const response = await graphqlTestCall(getAllAnnoncesMutation, {
        });

        console.log("nnnnnnnnnnnnnnnn",response)
        expect(response).toBeDefined();

    
      });
      });


  mongoose.connection.dropDatabase();
