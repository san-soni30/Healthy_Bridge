const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
   dob: {
      type: Date,
      required: true,
      validate: {
         validator: function (v) {
            const today = new Date();
            return v <= today;
         },
         message: "Date of birth cannot be in the future.",
      },
   },
   appointmentDate: {
      type: Date,
      validate: {
         validator: function (v) {
            return v >= new Date().setHours(0, 0, 0, 0);
         },
         message: "Appointment date must be today or in the future.",
      },
   },
   address: {
      type: String,
      required: true,
      trim: true,
   },
   status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
   }

},
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Appointment", appointmentSchema);