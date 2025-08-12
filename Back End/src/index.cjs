const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const laporanRouter = require("./routes/laporan.cjs");
const artikelRouter = require("./routes/artikel.cjs");
const adminRouter = require("./routes/admin.cjs");
const visitorRouter = require("./routes/visitor.cjs");
const { uploadHandler } = require("./middleware/file_upload/fileHandler.cjs");

const PORT = process.env.PORT || 3000;
const app = express();

// Logging request
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json());

// Daftar origin yang diizinkan
const allowedOrigins = [
  "https://huwize.vercel.app",
  "http://localhost:5173"
];

// Konfigurasi CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked for:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Handle preflight (OPTIONS)
app.options("*", cors());

// Upload handler
app.use(uploadHandler);

// API Routes
app.use("/laporan-lingkungan", laporanRouter);
app.use("/artikel-lingkungan", artikelRouter);
app.use("/admin", adminRouter);
app.use("/visitor", visitorRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on : http://localhost:${PORT}`);
});
