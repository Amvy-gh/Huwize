const corsOptions = {
  origin: [
    "https://huwize.vercel.app",
    "http://localhost:5173",
    "https://huwize-production.up.railway.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;