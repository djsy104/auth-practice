import { Model } from "mongoose";

const login = (req, res) => {
  res.send("This is the login function");
};

const register = (req, res) => {
  res.send("This is the register function");
};

module.exports = { login, register };
