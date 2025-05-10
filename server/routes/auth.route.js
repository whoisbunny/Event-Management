import express from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  Logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleWare.js";

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Get Profile Route (Protected)
router.get("/profile", authMiddleware, getProfile);

// Update Profile Route (Protected)
router.put("/profile", authMiddleware, updateProfile);

// Delete Profile Route (Protected)
router.delete("/profile", authMiddleware, deleteProfile);

router.get("/logout", authMiddleware, Logout);

export default router;
