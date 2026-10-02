import multer from "multer";
import path from "path";
import fs from "fs";

export const adminUploadDir = path.join(process.cwd(), "uploads", "admin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(adminUploadDir, { recursive: true });
    cb(null, adminUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `admin-${req.userId}-${Date.now()}${ext}`);
  },
});

const allowed = [".jpg", ".jpeg", ".png", ".webp"];

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (file.mimetype.startsWith("image/") && allowed.includes(ext)) return cb(null, true);
    cb(new Error("Only JPG, PNG or WEBP images are allowed"));
  },
});

// wraps multer so upload errors come back as clean 400 JSON
export const uploadPhoto = (req, res, next) => {
  upload.single("photo")(req, res, (err) => {
    if (!err) return next();
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "Image must be 2MB or smaller" : err.message;
    return res.status(400).json({ message });
  });
};
