import express from "express";
import {
  submitInquiry,
  getInquiries,
  getStats,
  getInquiry,
  updateInquiryController,
  deleteInquiryController,
  replyController,
  addNoteController,
  deleteNoteController,
  getFollowups,
  addFollowupController,
  completeFollowupController,
  deleteFollowupController,
} from "../controllers/inquiryController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// MySQL casts strings like "5abc" to 5 when comparing to an INT column, so reject anything that
// isn't a plain positive integer before it reaches a query
const requireNumericId = (req, res, next, value) =>
  /^[1-9]\d{0,9}$/.test(value) ? next() : res.status(404).json({ message: "Not found" });
router.param("id", requireNumericId);
router.param("noteId", requireNumericId);
router.param("followupId", requireNumericId);

router.post("/", submitInquiry);
router.get("/", isAuth, getInquiries);
router.get("/stats", isAuth, getStats);
// registered before "/:id" so "followups" is not read as an inquiry id
router.get("/followups", isAuth, getFollowups);
router.patch("/followups/:followupId", isAuth, completeFollowupController);
router.get("/:id", isAuth, getInquiry);
router.patch("/:id", isAuth, updateInquiryController);
router.delete("/:id", isAuth, deleteInquiryController);
router.post("/:id/reply", isAuth, replyController);
router.post("/:id/notes", isAuth, addNoteController);
router.delete("/:id/notes/:noteId", isAuth, deleteNoteController);
router.post("/:id/followups", isAuth, addFollowupController);
router.patch("/:id/followups/:followupId", isAuth, completeFollowupController);
router.delete("/:id/followups/:followupId", isAuth, deleteFollowupController);

export default router;
