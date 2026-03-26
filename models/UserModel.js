import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

UserSchema.methods.comparePasswords = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

export const User = model("User", UserSchema);
