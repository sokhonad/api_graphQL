const jwt =require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const modelUsers  =require("../models/user");
const modelAnnonce  =require("../models/annonce");



module.exports= {
  Query: {
    user(parent, { id }) {
      return modelUsers.find(user => user.id === id);
    },
    viewer: async (_, args, { user }) =>{
      return  await modelUsers.findById({ _id: user.sub }).exec();
    },
    getAllAnnonces: async () =>  {
      return await modelAnnonce.find();
    }
  },
  Mutation: {
    createUser: async (_, 
      { 
        name ,
        email,
        password
      }
) => {
  try {
    const existingUser = await modelUsers.findOne({ email: email });
    if (existingUser) {
      throw new Error('User exists already.');
    }
  }catch (err) {
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
      const user = new modelUsers({
        name ,
        email,
        password: hashedPassword,
        roles:[],
        permissions:["read:user"]
        });
      await user.save();
      return user;
    },

    login: async  (_, { email, password })=>{
     const user= await modelUsers.find({ email: email }).exec();
     const isEqual = await bcrypt.compare(password, user[0].password);
     const { id,name, permissions, roles } = user.find(
      user => user.email === email && isEqual
    );
    return jwt.sign(
      { "https://spaceapi.com/graphql": { name,roles, permissions } },
      "SUPER_SECRET",
      { algorithm: "HS256", subject: id, expiresIn: 5*60} 
    );
    },

    createAnnonce: async (_,
      { 
        titre ,
        type,
        statusPublication,
        statusBien,
        prix,
        dateDisponibilite,
        description,
        photos,
        
      },
      {user}
) => {
      const idUser=user.sub;
      const annonce = new modelAnnonce({
        postId: idUser,
         titre ,
         type,
         statusPublication,
         statusBien,
         prix,
         dateDisponibilite,
         description,
         photos,
         Comment:[]
        });
      await annonce.save();
      return annonce;
    },

    deleteAnnonce: async (_,{id}) =>  {
      await modelAnnonce.findByIdAndDelete(id);
      return "annonce id "+id+" a éte bien supprime";
    },
    updateAnnonce: async (_, 
      { 
        ID,
        titre ,
        type,
        statusPublication,
        statusBien,
        prix,
        dateDisponibilite,
        description,
        photos
      }
) => {
      const annonce = await modelAnnonce.findByIdAndUpdate(ID,{
         titre ,
         type,
         statusPublication,
         statusBien,
         prix,
         dateDisponibilite,
         description,
         photos,
        },{new:true});
      return annonce;
    }
  }
};
