import User from "../models/User.js";

export default async function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const user = await User.findById(req.user.id).select("role");
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  next();
}
