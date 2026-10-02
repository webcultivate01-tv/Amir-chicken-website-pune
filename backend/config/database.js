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
