import express from "express";
import {
  submitInquiry,
  getInquiries,
  getStats,
  getInquiry,
  updateInquiryController,
} from "../controllers/inquiryController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/", submitInquiry);
router.get("/", isAuth, getInquiries);
router.get("/stats", isAuth, getStats);
router.get("/:id", isAuth, getInquiry);
router.patch("/:id", isAuth, updateInquiryController);

export default router;
