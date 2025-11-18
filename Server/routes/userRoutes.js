import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @desc   
 * @route 
 * @access 
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc   Update logged-in user's profile
 * @route  PUT /api/user/profile
 * @access Private
 */
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/notifications", authMiddleware, async (req, res) => {
  try {
    const { email, sms, push } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,           
      { notifications: { email, sms, push } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Notification settings updated successfully",
      notifications: updatedUser.notifications
    });
  } catch (err) {
    console.error("Notification update error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
