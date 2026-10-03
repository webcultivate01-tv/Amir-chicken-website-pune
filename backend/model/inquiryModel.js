import pool from "../config/database.js";

export const INQUIRY_TYPES = [
  "General Enquiry",
  "Product Enquiry",
  "Bulk / Wholesale Enquiry",
  "Franchise Enquiry",
  "Store Enquiry",
  "Business Enquiry",
  "Feedback",
  "Other",
];

export const INQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Follow-up Required",
  "Converted",
  "Closed",
  "Not Interested",
  "Spam",
];

export const createInquiry = async ({ name, email, mobile, inquiryType, location, message }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      "INSERT INTO inquiries (name, email, mobile, inquiryType, location, message) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, mobile, inquiryType, location, message]
    );
    await connection.query(
      "INSERT INTO inquiry_activities (inquiryId, type, detail, adminName) VALUES (?, 'created', 'Inquiry received', NULL)",
      [result.insertId]
    );
    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const listInquiries = async ({ search, status, inquiryType, sort, page, limit }) => {
  const where = [];
  const params = [];
  if (status) {
    where.push("status = ?");
    params.push(status);
  }
  if (inquiryType) {
    where.push("inquiryType = ?");
    params.push(inquiryType);
  }
  if (search) {
    const like = `%${search}%`;
    where.push("(name LIKE ? OR email LIKE ? OR mobile LIKE ? OR location LIKE ?)");
    params.push(like, like, like, like);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const order = sort === "oldest" ? "ASC" : "DESC";

  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM inquiries ${clause}`, params);
  const [rows] = await pool.query(
    `SELECT id, name, email, mobile, inquiryType, location, status, followUpAt, createdAt, updatedAt
     FROM inquiries ${clause} ORDER BY createdAt ${order}, id ${order} LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  );
  return { inquiries: rows, total };
};

export const getInquiryStats = async () => {
  const [rows] = await pool.query("SELECT status, COUNT(*) AS count FROM inquiries GROUP BY status");
  const byStatus = Object.fromEntries(INQUIRY_STATUSES.map((s) => [s, 0]));
  rows.forEach((r) => (byStatus[r.status] = r.count));

  const [typeRows] = await pool.query("SELECT inquiryType, COUNT(*) AS count FROM inquiries GROUP BY inquiryType");
  const byType = Object.fromEntries(INQUIRY_TYPES.map((t) => [t, 0]));
  typeRows.forEach((r) => (byType[r.inquiryType] = r.count));

  // inquiries per day for the last 30 days; days with none are filled in with 0
  const [dayRows] = await pool.query(
    `SELECT DATE_FORMAT(createdAt, '%Y-%m-%d') AS day, COUNT(*) AS count FROM inquiries
     WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL 29 DAY) GROUP BY day`
  );
  const perDay = Object.fromEntries(dayRows.map((r) => [r.day, r.count]));
  const daily = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    daily.push({ day, count: perDay[day] || 0 });
  }

  const [[followups]] = await pool.query(
    `SELECT COUNT(*) AS pending, COALESCE(SUM(scheduledAt < NOW()), 0) AS overdue
     FROM inquiry_followups WHERE status = 'Pending'`
  );
  const [recent] = await pool.query(
    "SELECT id, name, inquiryType, status, createdAt FROM inquiries ORDER BY createdAt DESC, id DESC LIMIT 6"
  );

  return {
    total: rows.reduce((sum, r) => sum + r.count, 0),
    byStatus,
    byType,
    daily,
    followups: { pending: Number(followups.pending), overdue: Number(followups.overdue) },
    recent,
  };
};

export const findInquiryById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM inquiries WHERE id = ?", [id]);
  return rows[0] || null;
};

export const findActivitiesByInquiryId = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, type, detail, adminName, createdAt FROM inquiry_activities WHERE inquiryId = ? ORDER BY createdAt DESC, id DESC",
    [id]
  );
  return rows;
};

// changes: { status?, adminNote?, followUpAt? } — only the columns that actually changed.
// activities: [{ type, detail }] logged under the admin in the same transaction.
export const updateInquiry = async (id, changes, activities, adminName) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const columns = Object.keys(changes);
    await connection.query(
      `UPDATE inquiries SET ${columns.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`,
      [...columns.map((c) => changes[c]), id]
    );
    for (const activity of activities) {
      await connection.query(
        "INSERT INTO inquiry_activities (inquiryId, type, detail, adminName) VALUES (?, ?, ?, ?)",
        [id, activity.type, activity.detail, adminName]
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const FOLLOWUP_TYPES = ["Call", "Email", "Meeting"];

// runs `work(connection)` in a transaction; the inquiry's `followUpAt` (shown in the list) is always
// re-derived afterwards as the earliest pending follow-up, and `updatedAt` is bumped
const inInquiryTransaction = async (inquiryId, work) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.query(
      `UPDATE inquiries SET updatedAt = CURRENT_TIMESTAMP,
         followUpAt = (SELECT MIN(scheduledAt) FROM inquiry_followups WHERE inquiryId = ? AND status = 'Pending')
       WHERE id = ?`,
      [inquiryId, inquiryId]
    );
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const logActivity = (connection, inquiryId, type, detail, adminName) =>
  connection.query(
    "INSERT INTO inquiry_activities (inquiryId, type, detail, adminName) VALUES (?, ?, ?, ?)",
    [inquiryId, type, detail, adminName]
  );

export const deleteInquiry = async (id) => {
  await pool.query("DELETE FROM inquiries WHERE id = ?", [id]);
};

// ---- replies ----

export const findRepliesByInquiryId = async (inquiryId) => {
  const [rows] = await pool.query(
    "SELECT id, subject, body, adminName, adminEmail, createdAt FROM inquiry_replies WHERE inquiryId = ? ORDER BY createdAt DESC, id DESC",
    [inquiryId]
  );
  return rows;
};

// call after the email has actually been sent
export const addReply = (inquiryId, { subject, body, adminEmail }, adminName) =>
  inInquiryTransaction(inquiryId, async (connection) => {
    await connection.query(
      "INSERT INTO inquiry_replies (inquiryId, subject, body, adminName, adminEmail) VALUES (?, ?, ?, ?, ?)",
      [inquiryId, subject, body, adminName, adminEmail]
    );
    await logActivity(connection, inquiryId, "reply", subject, adminName);
  });

// ---- notes ----

export const findNotesByInquiryId = async (inquiryId) => {
  const [rows] = await pool.query(
    "SELECT id, note, adminName, createdAt FROM inquiry_notes WHERE inquiryId = ? ORDER BY createdAt DESC, id DESC",
    [inquiryId]
  );
  return rows;
};

export const findNoteById = async (noteId) => {
  const [rows] = await pool.query("SELECT * FROM inquiry_notes WHERE id = ?", [noteId]);
  return rows[0] || null;
};

export const addNote = (inquiryId, note, adminName) =>
  inInquiryTransaction(inquiryId, async (connection) => {
    await connection.query("INSERT INTO inquiry_notes (inquiryId, note, adminName) VALUES (?, ?, ?)", [
      inquiryId,
      note,
      adminName,
    ]);
    await logActivity(connection, inquiryId, "note", note, adminName);
  });

export const deleteNote = (inquiryId, noteId) =>
  inInquiryTransaction(inquiryId, (connection) =>
    connection.query("DELETE FROM inquiry_notes WHERE id = ? AND inquiryId = ?", [noteId, inquiryId])
  );

// ---- follow-ups ----

export const findFollowupsByInquiryId = async (inquiryId) => {
  const [rows] = await pool.query(
    `SELECT id, scheduledAt, type, notes, status, completedAt, createdAt FROM inquiry_followups
     WHERE inquiryId = ? ORDER BY status = 'Completed', scheduledAt ASC, id ASC`,
    [inquiryId]
  );
  return rows;
};

export const findFollowupById = async (followupId) => {
  const [rows] = await pool.query("SELECT * FROM inquiry_followups WHERE id = ?", [followupId]);
  return rows[0] || null;
};

// every follow-up across inquiries, pending first (soonest due on top), then completed (latest first)
export const listAllFollowups = async ({ status, page, limit, from, to }) => {
  const conditions = [];
  const params = [];
  if (status) {
    conditions.push("f.status = ?");
    params.push(status);
  }
  if (from) {
    conditions.push("f.scheduledAt >= ?");
    params.push(from);
  }
  if (to) {
    conditions.push("f.scheduledAt < ?");
    params.push(to);
  }
  const clause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM inquiry_followups f ${clause}`, params);
  const [rows] = await pool.query(
    `SELECT f.id, f.inquiryId, f.scheduledAt, f.type, f.notes, f.status, f.completedAt,
            i.name, i.mobile, i.email
     FROM inquiry_followups f JOIN inquiries i ON i.id = f.inquiryId ${clause}
     ORDER BY f.status = 'Completed', IF(f.status = 'Pending', f.scheduledAt, NULL) ASC, f.completedAt DESC, f.id DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  );
  return { followups: rows, total };
};

export const addFollowup = (inquiryId, { scheduledAt, type, notes }, adminName) =>
  inInquiryTransaction(inquiryId, async (connection) => {
    await connection.query(
      "INSERT INTO inquiry_followups (inquiryId, scheduledAt, type, notes) VALUES (?, ?, ?, ?)",
      [inquiryId, scheduledAt, type, notes]
    );
    // "ISO|Type" — the UI renders it as a sentence
    await logActivity(connection, inquiryId, "followup", `${scheduledAt.toISOString()}|${type}`, adminName);
  });

export const completeFollowup = (followup, adminName) =>
  inInquiryTransaction(followup.inquiryId, async (connection) => {
    await connection.query(
      "UPDATE inquiry_followups SET status = 'Completed', completedAt = CURRENT_TIMESTAMP WHERE id = ?",
      [followup.id]
    );
    await logActivity(
      connection,
      followup.inquiryId,
      "followup_done",
      `${new Date(followup.scheduledAt).toISOString()}|${followup.type}`,
      adminName
    );
  });

export const deleteFollowup = (inquiryId, followupId) =>
  inInquiryTransaction(inquiryId, (connection) =>
    connection.query("DELETE FROM inquiry_followups WHERE id = ? AND inquiryId = ?", [followupId, inquiryId])
  );
