import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  timezone: "Z",
});

// every timestamp is stored and read as UTC; the admin's timezone is applied in the UI
pool.pool.on("connection", (connection) => {
  connection.query("SET time_zone = '+00:00'");
});

export const connectDB = async () => {
  try {
    const setupConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    await setupConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );
    await setupConnection.end();

    const connection = await pool.getConnection();
    connection.release();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin') NOT NULL DEFAULT 'admin',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [photoCol] = await pool.query("SHOW COLUMNS FROM users LIKE 'photo'");
    if (photoCol.length === 0) {
      await pool.query("ALTER TABLE users ADD COLUMN photo VARCHAR(255) NULL AFTER password");
    }

    const [tzCol] = await pool.query("SHOW COLUMNS FROM users LIKE 'timezone'");
    if (tzCol.length === 0) {
      await pool.query(
        "ALTER TABLE users ADD COLUMN timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata' AFTER photo"
      );
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        inquiryType ENUM('General Enquiry','Product Enquiry','Bulk / Wholesale Enquiry','Franchise Enquiry','Store Enquiry','Business Enquiry','Feedback','Other') NOT NULL DEFAULT 'General Enquiry',
        location VARCHAR(150) NULL,
        message TEXT NOT NULL,
        status ENUM('New','Contacted','In Progress','Follow-up Required','Converted','Closed','Not Interested','Spam') NOT NULL DEFAULT 'New',
        adminNote TEXT NULL,
        followUpAt DATETIME NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_inquiries_status (status),
        INDEX idx_inquiries_createdAt (createdAt)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiry_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        inquiryId INT NOT NULL,
        type ENUM('created','status','note','followup') NOT NULL,
        detail TEXT NOT NULL,
        adminName VARCHAR(100) NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_activities_inquiry (inquiryId, createdAt),
        FOREIGN KEY (inquiryId) REFERENCES inquiries(id) ON DELETE CASCADE
      )
    `);

    const [activityCol] = await pool.query("SHOW COLUMNS FROM inquiry_activities LIKE 'type'");
    if (!activityCol[0].Type.includes("followup_done")) {
      await pool.query(
        "ALTER TABLE inquiry_activities MODIFY type ENUM('created','status','note','followup','followup_done') NOT NULL"
      );
    }

    const [statusCol] = await pool.query("SHOW COLUMNS FROM inquiries LIKE 'status'");
    if (!statusCol[0].Type.includes("Spam")) {
      await pool.query(
        "ALTER TABLE inquiries MODIFY status ENUM('New','Contacted','In Progress','Follow-up Required','Converted','Closed','Not Interested','Spam') NOT NULL DEFAULT 'New'"
      );
    }
    const [activityTypeCol] = await pool.query("SHOW COLUMNS FROM inquiry_activities LIKE 'type'");
    if (!activityTypeCol[0].Type.includes("reply")) {
      await pool.query(
        "ALTER TABLE inquiry_activities MODIFY type ENUM('created','status','note','followup','followup_done','reply') NOT NULL"
      );
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiry_replies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        inquiryId INT NOT NULL,
        subject VARCHAR(200) NOT NULL,
        body TEXT NOT NULL,
        adminName VARCHAR(100) NULL,
        adminEmail VARCHAR(150) NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_replies_inquiry (inquiryId, createdAt),
        FOREIGN KEY (inquiryId) REFERENCES inquiries(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiry_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        inquiryId INT NOT NULL,
        note TEXT NOT NULL,
        adminName VARCHAR(100) NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_notes_inquiry (inquiryId, createdAt),
        FOREIGN KEY (inquiryId) REFERENCES inquiries(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiry_followups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        inquiryId INT NOT NULL,
        scheduledAt DATETIME NOT NULL,
        type ENUM('Call','Email','Meeting') NOT NULL DEFAULT 'Call',
        notes TEXT NULL,
        status ENUM('Pending','Completed') NOT NULL DEFAULT 'Pending',
        completedAt DATETIME NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_followups_inquiry (inquiryId),
        INDEX idx_followups_due (status, scheduledAt),
        FOREIGN KEY (inquiryId) REFERENCES inquiries(id) ON DELETE CASCADE
      )
    `);

    // one-time move of the old single adminNote / followUpAt columns into the new tables (idempotent)
    await pool.query(
      `INSERT INTO inquiry_notes (inquiryId, note, createdAt)
       SELECT id, adminNote, updatedAt FROM inquiries WHERE adminNote IS NOT NULL AND adminNote <> ''`
    );
    await pool.query("UPDATE inquiries SET adminNote = NULL, updatedAt = updatedAt WHERE adminNote IS NOT NULL");
    await pool.query(
      `INSERT INTO inquiry_followups (inquiryId, scheduledAt)
       SELECT i.id, i.followUpAt FROM inquiries i
       WHERE i.followUpAt IS NOT NULL
         AND NOT EXISTS (SELECT 1 FROM inquiry_followups f WHERE f.inquiryId = i.id)`
    );

    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        email VARCHAR(150) NOT NULL PRIMARY KEY,
        codeHash VARCHAR(255) NOT NULL,
        expiresAt DATETIME NOT NULL,
        attempts INT NOT NULL DEFAULT 0
      )
    `);

    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [
      "admin@gmail.com",
    ]);
    if (rows.length === 0) {
      const hashPassword = await bcrypt.hash("admin123", 10);
      await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        ["Admin", "admin@gmail.com", hashPassword, "admin"]
      );
      console.log("Admin user seeded");
    }

    console.log("MySQL Connected");
  } catch (error) {
    console.log(`MySQL connection error ${error}`);
    process.exit(1);
  }
};

export default pool;
