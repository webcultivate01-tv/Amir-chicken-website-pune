import bcrypt from "bcryptjs";
import validator from "validator";
import { genToken } from "../config/token.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { adminUploadDir } from "../middleware/upload.js";
import {
  updateProfile,
  findUserByEmail,
  findUserById,
  findPasswordHashById,
  updatePassword,
  saveResetCode,
  findResetByEmail,
  incrementResetAttempts,
  deleteReset,
} from "../model/userModel.js";
import { sendResetCodeMail } from "../config/mailer.js";

const MAX_ATTEMPTS = 5;
const isValidTimezone = (tz) => {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = genToken(user.id);
    // production over HTTPS needs sameSite: "none" and secure: true
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: await findUserById(user.id),
    });
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error.message}` });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await findUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `GetCurrentUser error ${error.message}` });
  }
};

const removeFile = (relPath) => {
  if (!relPath) return;
  const full = path.join(process.cwd(), relPath);
  // only ever delete inside uploads/admin
  if (!full.startsWith(adminUploadDir)) return;
  fs.unlink(full, () => {});
};

export const updateProfileController = async (req, res) => {
  const newPhoto = req.file ? `uploads/admin/${req.file.filename}` : null;
  try {
    const current = await findUserById(req.userId);
    if (!current) {
      removeFile(newPhoto);
      return res.status(404).json({ message: "User not found" });
    }

    const name = String(req.body.name ?? current.name).trim();
    const email = normalizeEmail(req.body.email ?? current.email);
    const password = req.body.password || "";
    const timezone = String(req.body.timezone ?? current.timezone).trim();

    if (!isValidTimezone(timezone)) {
      removeFile(newPhoto);
      return res.status(400).json({ message: "Select a valid timezone" });
    }
    if (!name) {
      removeFile(newPhoto);
      return res.status(400).json({ message: "Name is required" });
    }
    if (!validator.isEmail(email)) {
      removeFile(newPhoto);
      return res.status(400).json({ message: "Enter valid Email" });
    }
    if (password && password.length < 8) {
      removeFile(newPhoto);
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    if (email !== current.email) {
      const taken = await findUserByEmail(email);
      if (taken && taken.id !== current.id) {
        removeFile(newPhoto);
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    await updateProfile(current.id, name, email, newPhoto || current.photo, timezone);
    if (password) {
      await updatePassword(current.id, await bcrypt.hash(password, 10));
    }
    if (newPhoto) removeFile(current.photo);

    const user = await findUserById(current.id);
    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    removeFile(newPhoto);
    return res.status(500).json({ message: `UpdateProfile error ${error.message}` });
  }
};

export const sendResetCode = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "No admin account found with this email" });
    }

    const code = crypto.randomInt(100000, 1000000).toString();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await saveResetCode(user.email, codeHash, expiresAt);

    try {
      await sendResetCodeMail(user.email, code);
    } catch (mailError) {
      await deleteReset(user.email);
      console.log(`Mail error ${mailError.message}`);
      return res
        .status(500)
        .json({ message: "Could not send verification email. Try again later" });
    }
    return res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: `SendResetCode error ${error.message}` });
  }
};

export const verifyResetCode = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const code = String(req.body.code || "").trim();
    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }
    const user = await findUserByEmail(email);
    const record = user ? await findResetByEmail(user.email) : null;
    if (!record) {
      return res.status(400).json({ message: "Request a verification code first" });
    }
    if (new Date(record.expiresAt) < new Date()) {
      await deleteReset(user.email);
      return res.status(400).json({ message: "Code expired. Request a new one" });
    }
    if (record.attempts >= MAX_ATTEMPTS) {
      await deleteReset(user.email);
      return res.status(429).json({ message: "Too many attempts. Request a new code" });
    }
    const isMatch = await bcrypt.compare(code, record.codeHash);
    if (!isMatch) {
      await incrementResetAttempts(user.email);
      return res.status(400).json({ message: "Invalid verification code" });
    }

    await deleteReset(user.email);
    // secret includes the current password hash, so the token dies once the password changes
    const resetToken = jwt.sign(
      { userId: user.id, purpose: "reset" },
      process.env.JWT_SECRET + user.password,
      { expiresIn: "10m" }
    );
    return res.status(200).json({ message: "Code verified", resetToken });
  } catch (error) {
    return res.status(500).json({ message: `VerifyResetCode error ${error.message}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password, confirmPassword } = req.body;
    if (!resetToken || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const decoded = jwt.decode(resetToken);
    const user = decoded?.userId ? await findPasswordHashById(decoded.userId) : null;
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset session" });
    }
    try {
      const verified = jwt.verify(resetToken, process.env.JWT_SECRET + user.password);
      if (verified.purpose !== "reset") throw new Error("bad purpose");
    } catch {
      return res.status(400).json({ message: "Invalid or expired reset session" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await updatePassword(user.id, hashPassword);
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: `ResetPassword error ${error.message}` });
  }
};
