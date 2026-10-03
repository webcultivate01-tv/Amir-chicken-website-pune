import pool from "./database.js";

// Dummy data for the admin inquiries list. Mobile numbers are masked on purpose (not real).
// Safe to re-run: rows are matched by their @example.com email and skipped if already present.
const daysAgo = (n, hour = 10) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(hour, 0, 0, 0);
  return d;
};

const SAMPLES = [
  ["Rahul Sharma", "rahul.sharma@example.com", "+91 98XXX XXX01", "General Enquiry", "Mumbai", "What are your store timings on weekends?", "New", 0],
  ["Priya Patel", "priya.patel@example.com", "+91 97XXX XXX02", "Product Enquiry", "Ahmedabad", "Do you have fresh boneless chicken available daily?", "New", 1],
  ["Imran Khan", "imran.khan@example.com", "+91 99XXX XXX03", "Bulk / Wholesale Enquiry", "Pune", "We need 200 kg of chicken weekly for our restaurant.", "Contacted", 2],
  ["Sneha Reddy", "sneha.reddy@example.com", "+91 91XXX XXX04", "Franchise Enquiry", "Hyderabad", "Interested in opening a franchise. What is the investment?", "In Progress", 3],
  ["Arjun Mehta", "arjun.mehta@example.com", "+91 90XXX XXX05", "Store Enquiry", "Surat", "Is there a store near Adajan?", "Follow-up Required", 4],
  ["Fatima Sheikh", "fatima.sheikh@example.com", "+91 96XXX XXX06", "Business Enquiry", "Delhi", "We would like to discuss a supply partnership for our catering business.", "Converted", 6],
  ["Vikram Singh", "vikram.singh@example.com", "+91 95XXX XXX07", "Feedback", "Jaipur", "Loved the quality of the chicken, delivery was quick too.", "Closed", 8],
  ["Neha Joshi", "neha.joshi@example.com", "+91 93XXX XXX08", "Product Enquiry", "Nagpur", "Do you sell marinated products?", "Not Interested", 10],
  ["Karan Desai", "karan.desai@example.com", "+91 94XXX XXX09", "Other", "Vadodara", "Looking for job openings at your processing unit.", "Contacted", 12],
  ["Anita Nair", "anita.nair@example.com", "+91 92XXX XXX10", "General Enquiry", "Kochi", "Do you deliver to Kochi?", "New", 14],
];

const run = async () => {
  let added = 0;
  for (const [name, email, mobile, inquiryType, location, message, status, age] of SAMPLES) {
    const [existing] = await pool.query("SELECT id FROM inquiries WHERE email = ?", [email]);
    if (existing.length) continue;
    const createdAt = daysAgo(age, 9 + (added % 8));
    const [result] = await pool.query(
      "INSERT INTO inquiries (name, email, mobile, inquiryType, location, message, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, mobile, inquiryType, location, message, status, createdAt, createdAt]
    );
    await pool.query(
      "INSERT INTO inquiry_activities (inquiryId, type, detail, adminName, createdAt) VALUES (?, 'created', 'Inquiry received', NULL, ?)",
      [result.insertId, createdAt]
    );
    added++;
  }
  console.log(`Seeded ${added} dummy inquiries (${SAMPLES.length - added} already existed)`);
  await pool.end();
};

run().catch((error) => {
  console.log(error);
  process.exit(1);
});
