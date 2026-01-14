const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { isClient } = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, isClient, (req, res) => {
  res.json({ message: "Welcome User Dashboard" });
});

module.exports = router;
