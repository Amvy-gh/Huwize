const express = require("express");
require("dotenv").config();
const cors = require("cors");

const laporanRouter = require("./routes/laporan.cjs");
const artikelRouter = require("./routes/artikel.cjs");
const adminRouter = require("./routes/admin.cjs");
const visitorRouter = require("./routes/visitor.cjs");
const { uploadHandler } = require("./middleware/file_upload/fileHandler.cjs");
const corsOptions = require("./config/cors.cjs");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(uploadHandler);
app.use('/client_images', express.static('client_images')); // Tambahkan ini

// ----- Routes -----
app.use("/laporan-lingkungan", laporanRouter);
app.use("/artikel-lingkungan", artikelRouter);
app.use("/admin", adminRouter);
app.use("/visitor", visitorRouter);

// ----- Error Handling -----
app.use((err, req, res, next) => {
  console.error("Error:", err); // Untuk logging error di server

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    message: message,
    error:
      process.env.NODE_ENV === "development"
        ? {
            detail: err.message,
            stack: err.stack,
          }
        : undefined,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});