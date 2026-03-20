import mongoose from "mongoose";
const { Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },

  email: {
    type: String,
    required: [true, "Please provide a email."],
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: [4, "Password length must be at least 4 characters"],
  },
});
