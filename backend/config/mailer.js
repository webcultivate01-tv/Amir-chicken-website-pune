import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
};

// Replies go out through the site's SMTP account but carry the admin's name, and the
// customer's answer lands in the admin's own inbox (Reply-To).
export const sendInquiryReplyMail = async ({ to, subject, text, adminName, adminEmail }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("Email service is not configured (SMTP_USER / SMTP_PASS missing)");
  }
  await getTransporter().sendMail({
    from: `"${adminName.replace(/"/g, "")} - Amir Chicken" <${process.env.SMTP_USER}>`,
    replyTo: adminEmail,
    to,
    subject,
    text,
  });
};

export const sendResetCodeMail = async (to, code) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("Email service is not configured (SMTP_USER / SMTP_PASS missing)");
  }
  await getTransporter().sendMail({
    from: `"Amir Chicken" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your password reset code",
    text: `Your Amir Chicken admin verification code is ${code}. It expires in 10 minutes. If you did not request this, ignore this email.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto">
      <h2>Password reset</h2>
      <p>Use this verification code to reset your admin password:</p>
      <p style="font-size:32px;letter-spacing:8px;font-weight:bold">${code}</p>
      <p>It expires in 10 minutes. If you did not request this, ignore this email.</p></div>`,
  });
};
