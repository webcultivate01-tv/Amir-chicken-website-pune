import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRouter from "./routes/authRoute.js";
import inquiryRouter from "./routes/inquiryRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
// Vite falls back to 5174, 5175... when 5173 is busy, so accept any localhost port
app.use(cors({ origin: /^http:\/\/localhost:\d+$/, credentials: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/inquiries", inquiryRouter);

app.get("/", (req, res) => res.send("Hello From Tejas Mehar"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
