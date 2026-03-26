import express from "express";
import { showProfile } from "../controllers/profileController.js";
import { authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

router.get("/profile", authenticateUser, showProfile);

export default router;
