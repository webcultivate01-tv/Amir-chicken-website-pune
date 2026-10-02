import validator from "validator";
import { findUserById } from "../model/userModel.js";
import {
  INQUIRY_TYPES,
  INQUIRY_STATUSES,
  createInquiry,
  listInquiries,
  getInquiryStats,
  findInquiryById,
  findActivitiesByInquiryId,
  updateInquiry,
} from "../model/inquiryModel.js";

const clean = (value) => String(value ?? "").trim();
const sameTime = (a, b) => (a ? new Date(a).getTime() : null) === (b ? new Date(b).getTime() : null);

// public: called by the website's contact / inquiry form
export const submitInquiry = async (req, res) => {
  try {
    const name = clean(req.body.name);
    const email = clean(req.body.email).toLowerCase();
    const mobile = clean(req.body.mobile);
    const inquiryType = clean(req.body.inquiryType) || "General Enquiry";
    const location = clean(req.body.location) || null;
    const message = clean(req.body.message);

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ message: "Name, email, mobile and message are required" });
    }
    if (name.length > 100 || (location && location.length > 150)) {
      return res.status(400).json({ message: "Name or location is too long" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }
    if (!/^\+?[\d\s-]{7,15}$/.test(mobile)) {
      return res.status(400).json({ message: "Enter valid mobile number" });
    }
    if (!INQUIRY_TYPES.includes(inquiryType)) {
      return res.status(400).json({ message: "Invalid inquiry type" });
    }
    if (message.length > 2000) {
      return res.status(400).json({ message: "Message must be 2000 characters or fewer" });
    }

    await createInquiry({ name, email, mobile, inquiryType, location, message });
    return res.status(201).json({ message: "Thank you! We will get back to you soon" });
  } catch (error) {
    return res.status(500).json({ message: `SubmitInquiry error ${error.message}` });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const search = clean(req.query.search);
    const status = clean(req.query.status);
    const inquiryType = clean(req.query.inquiryType);
    const sort = req.query.sort === "oldest" ? "oldest" : "newest";
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    if (status && !INQUIRY_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (inquiryType && !INQUIRY_TYPES.includes(inquiryType)) {
      return res.status(400).json({ message: "Invalid inquiry type" });
    }

    const { inquiries, total } = await listInquiries({ search, status, inquiryType, sort, page, limit });
    return res.status(200).json({
      inquiries,
      total,
      page,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    });
  } catch (error) {
    return res.status(500).json({ message: `GetInquiries error ${error.message}` });
  }
};

export const getStats = async (req, res) => {
  try {
    return res.status(200).json(await getInquiryStats());
  } catch (error) {
    return res.status(500).json({ message: `GetStats error ${error.message}` });
  }
};

export const getInquiry = async (req, res) => {
  try {
    const inquiry = await findInquiryById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    const activities = await findActivitiesByInquiryId(inquiry.id);
    return res.status(200).json({ inquiry, activities });
  } catch (error) {
    return res.status(500).json({ message: `GetInquiry error ${error.message}` });
  }
};

// body: any of { status, adminNote, followUpAt (ISO string, or null to clear) }
export const updateInquiryController = async (req, res) => {
  try {
    const current = await findInquiryById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    const changes = {};
    const activities = [];

    if (req.body.status !== undefined && req.body.status !== current.status) {
      if (!INQUIRY_STATUSES.includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      changes.status = req.body.status;
      // "from|to" — the UI renders it as a sentence
      activities.push({ type: "status", detail: `${current.status}|${req.body.status}` });
    }

    if (req.body.adminNote !== undefined) {
      const adminNote = clean(req.body.adminNote);
      if (adminNote.length > 2000) {
        return res.status(400).json({ message: "Note must be 2000 characters or fewer" });
      }
      if (adminNote !== (current.adminNote || "")) {
        changes.adminNote = adminNote || null;
        activities.push({ type: "note", detail: adminNote });
      }
    }

    if (req.body.followUpAt !== undefined) {
      let followUpAt = null;
      if (req.body.followUpAt) {
        followUpAt = new Date(req.body.followUpAt);
        if (Number.isNaN(followUpAt.getTime())) {
          return res.status(400).json({ message: "Invalid follow-up date" });
        }
      }
      if (!sameTime(followUpAt, current.followUpAt)) {
        changes.followUpAt = followUpAt;
        // ISO timestamp, or empty when cleared
        activities.push({ type: "followup", detail: followUpAt ? followUpAt.toISOString() : "" });
      }
    }

    if (activities.length === 0) {
      return res.status(400).json({ message: "No changes to save" });
    }

    const admin = await findUserById(req.userId);
    await updateInquiry(current.id, changes, activities, admin?.name || "Admin");

    const inquiry = await findInquiryById(current.id);
    const history = await findActivitiesByInquiryId(current.id);
    return res.status(200).json({ message: "Inquiry updated", inquiry, activities: history });
  } catch (error) {
    return res.status(500).json({ message: `UpdateInquiry error ${error.message}` });
  }
};
