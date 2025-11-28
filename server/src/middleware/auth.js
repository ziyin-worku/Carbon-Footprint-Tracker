import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authorization header missing or invalid" });
    }

    const token = header.slice(7).trim();
    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    // Verify token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set in environment variables");
      return res
        .status(500)
        .json({ error: "Server misconfiguration: JWT_SECRET missing" });
    }

    const payload = jwt.verify(token, secret);

    // Ensure payload has required fields
    if (!payload.id) {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    req.user = {
      id: payload.id,
      name: payload.name || null,
      email: payload.email || null,
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
