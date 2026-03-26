import { User } from "../models/UserModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(401).json({ error: "Please provide a name" });
  }

  if (!email) {
    return res.status(401).json({ error: "Please provide an email" });
  }

  if (!password) {
    return res.status(401).json({ error: "Please provide a password" });
  }

  const currentUser = await User.findOne({ email });

  if (currentUser) {
    return res
      .status(401)
      .json({ error: "There is already an account with that email" });
  }

  const createdUser = await User.create({ name, email, password });
  const token = createdUser.createJWT();

  res.status(200).json({ user: createdUser, token: token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({ error: "Please provide an email" });
  }

  if (!password) {
    return res.status(401).json({ error: "Please provide a password" });
  }

  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    return res
      .status(401)
      .json({ error: "Could not find account. Please try a different email." });
  }

  const userPassword = await currentUser.comparePasswords(password);

  if (!userPassword) {
    return res
      .status(401)
      .json({ error: "Incorrect password. Did you enter the correct one?" });
  }

  const token = currentUser.createJWT();

  res.status(200).json({ user: currentUser, token: token });
};
