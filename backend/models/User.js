const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // do not return password by default
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
      immutable: true, // role cannot be changed after creation
    },
    isActive: {
      type: Boolean,
      default: true, // soft block users
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);