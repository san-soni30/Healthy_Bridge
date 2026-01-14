const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

module.exports = router;
