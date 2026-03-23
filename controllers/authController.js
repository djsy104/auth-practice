import { User } from "../models/UserModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new Error("Please provide an email");
  }

  if (!password) {
    throw new Error("Please provide a password");
  }

  const currentUser = await User.findOne({ email, password });

  if (!currentUser) {
    throw new Error("Could not find account. Please check credentials.");
  }

  return res.status(200).json(currentUser);
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new Error("Please provide a name");
  }

  if (!email) {
    throw new Error("Please provide an email");
  }

  if (!password) {
    throw new Error("Please provide a password");
  }

  const createdUser = await User.create({ name, email, password });

  res.status(200).json(createdUser);
};
