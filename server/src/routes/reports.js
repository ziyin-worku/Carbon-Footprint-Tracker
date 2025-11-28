import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import Activity from "../models/Activity.js";
import { FACTORS } from "../config/factors.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const { period = "month" } = req.query;
    const pipeline = [
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $addFields: {
          transportEmission: {
            $multiply: ["$transportKm", FACTORS.transportKgPerKm],
          },
          electricityEmission: {
            $multiply: ["$electricityKwh", FACTORS.electricityKgPerKwh],
          },
          foodEmission: { $multiply: ["$meals", FACTORS.mealKgPerMeal] },
          total: {
            $add: [
              { $multiply: ["$transportKm", FACTORS.transportKgPerKm] },
              { $multiply: ["$electricityKwh", FACTORS.electricityKgPerKwh] },
              { $multiply: ["$meals", FACTORS.mealKgPerMeal] },
            ],
          },
        },
      },
      {
        $group: {
          _id:
            period === "week"
              ? { $dateToString: { format: "%G-W%V", date: "$date" } }
              : { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$total" },
          transport: { $sum: "$transportEmission" },
          electricity: { $sum: "$electricityEmission" },
          food: { $sum: "$foodEmission" },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const agg = await Activity.aggregate(pipeline);
    res.json({ period, rows: agg });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
