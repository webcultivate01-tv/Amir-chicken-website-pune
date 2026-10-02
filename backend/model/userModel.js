import pool from "../config/database.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, photo, createdAt, updatedAt FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

export const updateProfile = async (id, name, email, photo) => {
  await pool.query("UPDATE users SET name = ?, email = ?, photo = ? WHERE id = ?", [
    name,
    email,
    photo,
    id,
  ]);
};

export const updatePassword = async (id, hashedPassword) => {
  await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id]);
};

export const findPasswordHashById = async (id) => {
  const [rows] = await pool.query("SELECT id, password FROM users WHERE id = ?", [id]);
  return rows[0] || null;
};

export const saveResetCode = async (email, codeHash, expiresAt) => {
  await pool.query(
    `INSERT INTO password_resets (email, codeHash, expiresAt, attempts)
     VALUES (?, ?, ?, 0)
     ON DUPLICATE KEY UPDATE codeHash = VALUES(codeHash), expiresAt = VALUES(expiresAt), attempts = 0`,
    [email, codeHash, expiresAt]
  );
};

export const findResetByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM password_resets WHERE email = ?", [email]);
  return rows[0] || null;
};

export const incrementResetAttempts = async (email) => {
  await pool.query("UPDATE password_resets SET attempts = attempts + 1 WHERE email = ?", [email]);
};

export const deleteReset = async (email) => {
  await pool.query("DELETE FROM password_resets WHERE email = ?", [email]);
};

export const createUser =async (name, email, password, role) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  return result.insertId;
};
