const express = require("express");
const router = express.Router();
const { protect, isClient } = require("../middlewares/authMiddleware");
 const { getProfileById, updateProfile, deleteProfile } = require("../controllers/userController");

router.get("/dashboard", protect, isClient, (req, res) => {
  res.json({ message: "Welcome User Dashboard" });
});

router.get("/profile", protect, isClient, getProfileById);
router.put("/profile", protect, isClient, updateProfile);
router.delete("/profile", protect, isClient, deleteProfile);

module.exports = router;
