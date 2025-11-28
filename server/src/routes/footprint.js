import express from "express";
import auth from "../middleware/auth.js";
import Activity from "../models/Activity.js";
import { FACTORS, calculateFootprint } from "../config/factors.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { from, to } = req.query;
    const query = { userId: req.user.id };
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    const activities = await Activity.find(query).sort({ date: 1 });

    const points = activities.map((a) => {
      const calc = calculateFootprint(a);
      return { date: a.date, total: calc.total, breakdown: calc.breakdown };
    });

    const totals = points.reduce(
      (acc, p) => {
        acc.total += p.total;
        acc.transport += p.breakdown.transport;
        acc.electricity += p.breakdown.electricity;
        acc.food += p.breakdown.food;
        return acc;
      },
      { total: 0, transport: 0, electricity: 0, food: 0 }
    );

    const badges = {
      lowTransport: totals.transport < 50,
      energySaver: totals.electricity < 100,
      greenFood: totals.food < 80,
    };

    let streak = 0;
    let lastDate = null;
    for (const p of points) {
      const d = new Date(p.date);
      if (!lastDate) {
        streak = 1;
        lastDate = d;
      } else {
        const prev = new Date(lastDate);
        prev.setDate(prev.getDate() + 1);
        if (d.toDateString() === prev.toDateString()) {
          streak += 1;
          lastDate = d;
        } else if (d.toDateString() !== lastDate.toDateString()) {
          streak = 1;
          lastDate = d;
        }
      }
    }

    res.json({ points, totals, factors: FACTORS, badges, streak });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
