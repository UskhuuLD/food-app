import { Context, Next } from "hono";
import { verifyToken } from "../lib/jwt.js";

// Authorization: Bearer <token> header-ees hereglegchiig tanih
export const authMiddleware = async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  c.set("user", payload);
  await next();
};

// Zovhon ADMIN erhtei hereglegch nevtreh
export const adminMiddleware = async (c: Context, next: Next) => {
  const user = c.get("user");
  if (!user || user.role !== "ADMIN") {
    return c.json({ message: "Admin access required" }, 403);
  }
  await next();
};
