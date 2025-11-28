import express from "express";
import auth from "../middleware/auth.js";
import requireAdmin from "../middleware/requireAdmin.js";
import User from "../models/User.js";
import Activity from "../models/Activity.js";

const router = express.Router();

router.get("/users", auth, requireAdmin, async (req, res) => {
  const users = await User.find().select("name email role createdAt");
  res.json(users);
});

router.post("/users/:id/role", auth, requireAdmin, async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role))
    return res.status(400).json({ error: "Invalid role" });
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("name email role");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.get("/activities", auth, requireAdmin, async (req, res) => {
  const { userId, from, to } = req.query;
  const query = {};
  if (userId) query.userId = userId;
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }
  const acts = await Activity.find(query).sort({ date: -1 }).limit(500);
  res.json(acts);
});

router.delete("/activities/:id", auth, requireAdmin, async (req, res) => {
  const deleted = await Activity.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
