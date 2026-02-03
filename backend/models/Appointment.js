const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // 🔗 User who booked appointment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },

    // 👤 Basic details (snapshot – do NOT rely only on User model)
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^\+?[1-9]\d{9,14}$/,
        "Please enter a valid international phone number",
      ],
    },

    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (v) {
          return v <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    // 📅 Appointment details
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
      validate: {
        validator: function (v) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return v >= today;
        },
        message: "Appointment date must be today or future",
      },
    },

    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      enum: [
        "09:00-09:30",
        "09:30-10:00",
        "10:00-10:30",
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
        "16:00-16:30",
        "16:30-17:00",
        "17:30-18:00",
        "20:10-20:30",
      ],
    },

    // 🧑‍⚕️ Doctor/Admin workflow
    status: {
      type: String,
      enum: [
        "pending",     // user submitted form
        "approved",    // admin approved
        "rejected",    // admin rejected
        "paid",        // payment completed
        "ongoing",     // video call started
        "completed",   // consultation done
        "cancelled",   // cancelled by admin/user
      ],
      default: "pending",
      index: true,
    },

    adminNote: {
      type: String,
      trim: true,
      maxlength: [300, "Admin note too long"],
    },

    // 💰 Payment (only after admin approval)
    payment: {
      amount: {
        type: Number,
        min: [0, "Amount cannot be negative"],
      },
      method: {
        type: String,
        enum: ["razorpay", "stripe", "cod"],
      },
      paymentId: String,
      paidAt: Date,
    },

    // 🔐 OTP (hashed, short-lived)
    otpHash: {
      type: String,
      select: false, // never expose
    },
    otpExpiresAt: Date,

   meetingToken: {
  type: String,
  unique: true,
  sparse: true,
},
    meetingLink: {
      type: String,
      trim: true,
    },

    meetingExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index(
  { appointmentDate: 1, timeSlot: 1 },
  { unique: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
