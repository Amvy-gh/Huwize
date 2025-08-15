import express from "express";
import "dotenv/config";
import cors from "cors";
import { corsOptions } from "./config/cors.cjs";
import laporanRouter from "./routes/laporan.cjs";
import artikelRouter from "./routes/artikel.cjs";
import adminRouter from "./routes/admin.cjs";
import visitorRouter from "./routes/visitor.cjs";
import { uploadHandler } from "./middleware/file_upload/fileHandler.cjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(uploadHandler);

app.use("/laporan-lingkungan", laporanRouter);
app.use("/artikel-lingkungan", artikelRouter);
app.use("/admin", adminRouter);
app.use("/visitor", visitorRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});