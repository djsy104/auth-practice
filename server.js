import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Routers
const authRouter = require("./routes/authRouter");

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
