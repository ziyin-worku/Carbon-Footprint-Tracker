import express from "express";
import auth from "../middleware/auth.js";
import Activity from "../models/Activity.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { date, transportKm, electricityKwh, meals } = req.body;
    const act = await Activity.create({
      userId: req.user.id,
      date,
      transportKm,
      electricityKwh,
      meals,
    });
    res.status(201).json(act);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { from, to } = req.query;
    const query = { userId: req.user.id };
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    const list = await Activity.find(query).sort({ date: 1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
