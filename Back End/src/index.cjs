const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const laporanRouter = require("./routes/laporan.cjs");
const artikelRouter = require("./routes/artikel.cjs");
const adminRouter = require("./routes/admin.cjs");
const visitorRouter = require("./routes/visitor.cjs");
const { uploadHandler } = require("./middleware/file_upload/fileHandler.cjs");
const corsOptions = require("./config/cors.cjs");

const PORT = process.env.PORT || 3000;
const app = express();

// ----- Global Middleware -----
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Logging request
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// Upload handler
app.use(uploadHandler);

// ----- Healthcheck -----
app.get("/", (req, res) => {
  res.json({ message: "Backend API running 🚀" });
});

// ----- Routes -----
app.use("/laporan-lingkungan", laporanRouter);
app.use("/artikel-lingkungan", artikelRouter);
app.use("/admin", adminRouter);
app.use("/visitor", visitorRouter);

// ----- Error Handling -----
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ----- Start Server -----
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});