import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRouter from "./routes/authRoute.js";
import inquiryRouter from "./routes/inquiryRoute.js";
import newsletterRouter from "./routes/newsletterRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
// Vite falls back to 5174, 5175... when 5173 is busy, so accept any localhost port
// in production the site and API share one origin via nginx; FRONTEND_URL allows a separate frontend origin if needed
const allowedOrigins = [/^http:\/\/localhost:\d+$/];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/newsletter", newsletterRouter);

app.get("/", (req, res) => res.send("Hello From Tejas Mehar"));

// create/migrate the tables first so no request can hit the database before they exist
await connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
