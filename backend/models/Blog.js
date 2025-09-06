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
      type: String,
   },
   tags: {
      type: [String],
      default: []
   },
},
{
   timestamps: {
      createdAt: "submittedAt",
      updatedAt: false
   }
});


module.exports = mongoose.model('Blog', blogSchema);

