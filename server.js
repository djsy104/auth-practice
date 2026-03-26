import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connect.js";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";

const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());

// Routers
app.use("/api/auth", authRouter);
app.use("/api/", profileRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {}
};

start();
