import express from "express";
import auth from "../middleware/auth.js";
import Pledge from "../models/Pledge.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { title, targetPerWeek = 1 } = req.body;
    const pledge = await Pledge.create({
      userId: req.user.id,
      title,
      targetPerWeek,
    });
    res.status(201).json(pledge);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const pledges = await Pledge.find({
      userId: req.user.id,
      active: true,
    }).sort({ createdAt: -1 });
    res.json(pledges);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/:id/complete", auth, async (req, res) => {
  try {
    const pledge = await Pledge.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!pledge) return res.status(404).json({ error: "Not found" });
    pledge.completedCount += 1;
    await pledge.save();
    res.json(pledge);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/:id/toggle", auth, async (req, res) => {
  try {
    const pledge = await Pledge.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!pledge) return res.status(404).json({ error: "Not found" });
    pledge.active = !pledge.active;
    await pledge.save();
    res.json(pledge);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
