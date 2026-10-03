import validator from "validator";
import { sendInquiryReplyMail } from "../config/mailer.js";
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
  deleteInquiry,
  FOLLOWUP_TYPES,
  findNotesByInquiryId,
  findRepliesByInquiryId,
  addReply,
  findNoteById,
  addNote,
  deleteNote,
  findFollowupsByInquiryId,
  findFollowupById,
  listAllFollowups,
  addFollowup,
  completeFollowup,
  deleteFollowup,
} from "../model/inquiryModel.js";

const clean = (value) => String(value ?? "").trim();
const adminNameOf = async (userId) => (await findUserById(userId))?.name || "Admin";

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

// everything the detail page shows, in one response
const detailPayload = async (id) => {
  const [inquiry, activities, notes, followups, replies] = await Promise.all([
    findInquiryById(id),
    findActivitiesByInquiryId(id),
    findNotesByInquiryId(id),
    findFollowupsByInquiryId(id),
    findRepliesByInquiryId(id),
  ]);
  return { inquiry, activities, notes, followups, replies };
};

export const getInquiry = async (req, res) => {
  try {
    const inquiry = await findInquiryById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    return res.status(200).json(await detailPayload(inquiry.id));
  } catch (error) {
    return res.status(500).json({ message: `GetInquiry error ${error.message}` });
  }
};

// body: { status }
export const updateInquiryController = async (req, res) => {
  try {
    const current = await findInquiryById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    const status = req.body.status;
    if (!INQUIRY_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (status === current.status) {
      return res.status(400).json({ message: "No changes to save" });
    }
    // status only moves forward through the list, never back
    if (INQUIRY_STATUSES.indexOf(status) < INQUIRY_STATUSES.indexOf(current.status)) {
      return res.status(400).json({ message: `Status cannot go back to ${status}` });
    }

    // "from|to" — the UI renders it as a sentence
    await updateInquiry(
      current.id,
      { status },
      [{ type: "status", detail: `${current.status}|${status}` }],
      await adminNameOf(req.userId)
    );
    return res.status(200).json({ message: "Status updated", ...(await detailPayload(current.id)) });
  } catch (error) {
    return res.status(500).json({ message: `UpdateInquiry error ${error.message}` });
  }
};

export const deleteInquiryController = async (req, res) => {
  try {
    const current = await findInquiryById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    await deleteInquiry(current.id);
    return res.status(200).json({ message: "Inquiry deleted" });
  } catch (error) {
    return res.status(500).json({ message: `DeleteInquiry error ${error.message}` });
  }
};

// ---- replies ----

// body: { subject, message } — emailed to the customer, then logged
export const replyController = async (req, res) => {
  try {
    const current = await findInquiryById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    const subject = clean(req.body.subject);
    const message = clean(req.body.message);
    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }
    if (subject.length > 200 || message.length > 5000) {
      return res.status(400).json({ message: "Subject or message is too long" });
    }
    const admin = await findUserById(req.userId);
    const adminName = admin?.name || "Admin";
    try {
      await sendInquiryReplyMail({
        to: current.email,
        subject,
        text: message,
        adminName,
        adminEmail: admin?.email,
      });
    } catch (error) {
      console.log(error);
      return res.status(502).json({ message: "Could not send the email. Check the email settings." });
    }
    await addReply(current.id, { subject, body: message, adminEmail: admin?.email }, adminName);
    return res.status(201).json({ message: "Reply sent", ...(await detailPayload(current.id)) });
  } catch (error) {
    return res.status(500).json({ message: `Reply error ${error.message}` });
  }
};

// ---- notes ----

// body: { note }
export const addNoteController = async (req, res) => {
  try {
    const current = await findInquiryById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    const note = clean(req.body.note);
    if (!note) {
      return res.status(400).json({ message: "Note cannot be empty" });
    }
    if (note.length > 2000) {
      return res.status(400).json({ message: "Note must be 2000 characters or fewer" });
    }
    await addNote(current.id, note, await adminNameOf(req.userId));
    return res.status(201).json({ message: "Note added", ...(await detailPayload(current.id)) });
  } catch (error) {
    return res.status(500).json({ message: `AddNote error ${error.message}` });
  }
};

export const deleteNoteController = async (req, res) => {
  try {
    const note = await findNoteById(req.params.noteId);
    if (!note || String(note.inquiryId) !== req.params.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    await deleteNote(note.inquiryId, note.id);
    return res.status(200).json({ message: "Note deleted", ...(await detailPayload(note.inquiryId)) });
  } catch (error) {
    return res.status(500).json({ message: `DeleteNote error ${error.message}` });
  }
};

// ---- follow-ups ----

// the Follow-ups tab: every follow-up across inquiries
export const getFollowups = async (req, res) => {
  try {
    const status = clean(req.query.status);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    if (status && !["Pending", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const parseDate = (v) => {
      const d = v ? new Date(v) : null;
      return d && !Number.isNaN(d.getTime()) ? d : null;
    };
    const from = parseDate(req.query.from);
    const to = parseDate(req.query.to);
    const { followups, total } = await listAllFollowups({ status, page, limit, from, to });
    return res.status(200).json({ followups, total, page, totalPages: Math.max(Math.ceil(total / limit), 1) });
  } catch (error) {
    return res.status(500).json({ message: `GetFollowups error ${error.message}` });
  }
};

// body: { scheduledAt (ISO string), type, notes? }
export const addFollowupController = async (req, res) => {
  try {
    const current = await findInquiryById(req.params.id);
    if (!current) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    const scheduledAt = new Date(req.body.scheduledAt);
    if (!req.body.scheduledAt || Number.isNaN(scheduledAt.getTime())) {
      return res.status(400).json({ message: "Enter a valid follow-up date and time" });
    }
    const type = clean(req.body.type) || "Call";
    if (!FOLLOWUP_TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid follow-up type" });
    }
    const notes = clean(req.body.notes) || null;
    if (notes && notes.length > 1000) {
      return res.status(400).json({ message: "Follow-up notes must be 1000 characters or fewer" });
    }
    await addFollowup(current.id, { scheduledAt, type, notes }, await adminNameOf(req.userId));
    return res.status(201).json({ message: "Follow-up scheduled", ...(await detailPayload(current.id)) });
  } catch (error) {
    return res.status(500).json({ message: `AddFollowup error ${error.message}` });
  }
};

// reachable with or without the inquiry id so the Follow-ups tab can complete one without opening the inquiry
export const completeFollowupController = async (req, res) => {
  try {
    const followup = await findFollowupById(req.params.followupId);
    if (!followup || (req.params.id && String(followup.inquiryId) !== req.params.id)) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    if (followup.status === "Completed") {
      return res.status(400).json({ message: "Follow-up is already completed" });
    }
    await completeFollowup(followup, await adminNameOf(req.userId));
    return res.status(200).json({ message: "Follow-up completed", ...(await detailPayload(followup.inquiryId)) });
  } catch (error) {
    return res.status(500).json({ message: `CompleteFollowup error ${error.message}` });
  }
};

export const deleteFollowupController = async (req, res) => {
  try {
    const followup = await findFollowupById(req.params.followupId);
    if (!followup || String(followup.inquiryId) !== req.params.id) {
      return res.status(404).json({ message: "Follow-up not found" });
    }
    await deleteFollowup(followup.inquiryId, followup.id);
    return res.status(200).json({ message: "Follow-up deleted", ...(await detailPayload(followup.inquiryId)) });
  } catch (error) {
    return res.status(500).json({ message: `DeleteFollowup error ${error.message}` });
  }
};
