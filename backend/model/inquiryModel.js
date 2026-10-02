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
    // "AC-0012" or "12" both match the inquiry id
    const idMatch = search.match(/^(?:ac-?)?0*(\d+)$/i);
    where.push(
      `(name LIKE ? OR email LIKE ? OR mobile LIKE ? OR location LIKE ?${idMatch ? " OR id = ?" : ""})`
    );
    params.push(like, like, like, like);
    if (idMatch) params.push(Number(idMatch[1]));
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
  return { total: rows.reduce((sum, r) => sum + r.count, 0), byStatus };
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
