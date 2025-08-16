const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Buat fungsi untuk mengecek dan membuat direktori
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    let uploadPath;

    // Tentukan path berdasarkan route
    if (req.path.includes("artikel")) {
      uploadPath = "client_images/artikel";
    } else if (req.path.includes("laporan")) {
      uploadPath = "client_images/laporan";
    } else {
      uploadPath = "client_images/others";
    }

    // Buat direktori jika belum ada
    ensureDirectoryExists(uploadPath);
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Filter file yang diizinkan
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const uploadHandler = multer({
  storage: storageImage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).fields([
  { name: "gambar_laporan", maxCount: 1 },
  { name: "gambar_artikel", maxCount: 1 },
]);

module.exports = {
  fileFilter,
  uploadHandler,
};
