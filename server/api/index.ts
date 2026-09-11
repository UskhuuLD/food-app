import { handle } from "hono/vercel";
import app from "../src/index.js";

// Vercel looks for a default-exported handler under api/. hono/vercel's
// `handle` adapts Hono's app.fetch to the (req: Request) => Response shape
// Vercel's Node.js runtime expects. vercel.json rewrites every path here.
export default handle(app);
