const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
      trim: true,
   },
   image: {
      url: String,
      public_id: String
   },
   tags: {
      type: [String],
      default: []
   },
   likes: [
      {
         type: mongoose.Schema.Types.ObjectId,  // prevents duplicate likes
         ref: "User",
      }
   ],
   likesCount: {  //Fast UI rendering
      type: Number,
      default: 0,
   },
   //    shares: {
   //   type: Number,
   //   default: 0,
   // },
},
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('Blog', blogSchema);

