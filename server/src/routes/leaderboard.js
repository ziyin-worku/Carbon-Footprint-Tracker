import express from "express";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import { FACTORS } from "../config/factors.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const acts = await Activity.aggregate([
      {
        $addFields: {
          transportEmission: {
            $multiply: ["$transportKm", FACTORS.transportKgPerKm],
          },
          electricityEmission: {
            $multiply: ["$electricityKwh", FACTORS.electricityKgPerKwh],
          },
          foodEmission: { $multiply: ["$meals", FACTORS.mealKgPerMeal] },
        },
      },
      {
        $group: {
          _id: "$userId",
          total: {
            $sum: {
              $add: [
                "$transportEmission",
                "$electricityEmission",
                "$foodEmission",
              ],
            },
          },
        },
      },
      { $sort: { total: 1 } },
      { $limit: 20 },
    ]);

    const users = await User.find({
      _id: { $in: acts.map((a) => a._id) },
    }).select("name");
    const userMap = Object.fromEntries(
      users.map((u) => [u._id.toString(), u.name])
    );

    res.json(
      acts.map((a) => ({
        userId: a._id,
        name: userMap[a._id.toString()] || "Anonymous",
        total: a.total,
      }))
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
