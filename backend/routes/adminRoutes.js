const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const { getAllUsers, getUserById, updateUser, deactivateUser, activateUser, deleteUser } = require("../controllers/adminController");

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/users/:id", protect, isAdmin, getUserById);
router.put("/users/:id", protect, isAdmin, updateUser);
router.patch("/users/deactivate/:id", protect, isAdmin, deactivateUser);
router.patch("/users/activate/:id", protect, isAdmin, activateUser);
router.delete("/users/:id", protect, isAdmin, deleteUser);

module.exports = router;
