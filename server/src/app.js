import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import activityRoutes from "./routes/activities.js";
import footprintRoutes from "./routes/footprint.js";
import pledgeRoutes from "./routes/pledges.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import reportRoutes from "./routes/reports.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ status: "ok", message: "Carbon Footprint API v2" })
);

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/footprint", footprintRoutes);
app.use("/api/pledges", pledgeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);

export default app;
