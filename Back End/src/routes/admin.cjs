const express = require("express");
const adminAuth = require("../controller/admin/adminAuthentication.cjs");

const adminRouter = express.Router();

// Main login handler - langsung gunakan adminAuth
adminRouter.post("/login", adminAuth);

module.exports = adminRouter;
