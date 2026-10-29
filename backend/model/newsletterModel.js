import pool from "../config/database.js";

// returns false if the email was already subscribed, true if it was newly added
export const addSubscriber = async (email) => {
  try {
    await pool.query("INSERT INTO newsletter_subscribers (email) VALUES (?)", [email]);
    return true;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return false;
    throw error;
  }
};
