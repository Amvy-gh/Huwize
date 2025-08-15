const express = require("express");
const adminAuth = require("../controller/admin/adminAuthentication.cjs");

const adminRouter = express.Router();

// Debug route untuk testing
adminRouter.get("/login", (req, res) => {
  res.json({ message: "Login page" });
});

// Main login handler
adminRouter.post("/login", async (req, res) => {
  try {
    // ...existing login logic...
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = adminRouter;
