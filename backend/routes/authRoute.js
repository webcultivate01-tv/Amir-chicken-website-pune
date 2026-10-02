import express from "express";
import {
  login,
  logout,
  getCurrentUser,
  sendResetCode,
  verifyResetCode,
  resetPassword,
  updateProfileController,
} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";
import { uploadPhoto } from "../middleware/upload.js";

const router = express.Router();

router.post("/login", login);
router.post("/send-reset-code", sendResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.get("/logout", logout);
router.get("/getcurrentuser", isAuth, getCurrentUser);
router.put("/profile", isAuth, uploadPhoto, updateProfileController);

export default router;
