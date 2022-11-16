const mongoose = require('mongoose');

const annonce = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: false
    },
    titre : {
      type : String,
      required :[true, ' is required \n'],
      minLength : [5 , ' must have more than 5 characters\n']
    },
      type: {
        type: String,
        required: false
      },
    statusPublication: {
        type: String,
        required: false
      },
    statusBien: {
        type: String,
        required: false
      },
    prix: {
        type: Number,
        required: false
      },
      dateDisponibilite: {
        type: String,
        required: false
      },
      description: {
        type: String,
        trim: false,
        maxlength: 500,
      },
      photos: {
      type: String,
      required: false,
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: false,
    },
  },
  {
    timestamps: Number,
  }
);

module.exports = mongoose.model('annonce', annonce);