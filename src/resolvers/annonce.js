const modelAnnonce  =require("../models/annonce");

module.exports= {

    getAllAnnonces: async () =>  {
      return await modelAnnonce.find();
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
        console.log("kkkkkkkkkkkkk",idUser)
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
};
