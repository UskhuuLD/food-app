import type { JwtPayload } from "./lib/jwt.js";

declare module "hono" {
  interface ContextVariableMap {
    user: JwtPayload;
  }
}
