const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
   },
   phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{9,14}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
   subject: {
      type: String,
      trim: true,
   },
   message: {
      type: String,
      required: true,
   },
   ipAddress: {
      type: String,
   },
},
   {
      timestamps: { 
         createdAt: "submittedAt", 
         updatedAt: false 
      }

   }
);

module.exports = mongoose.model("Contact", contactSchema);