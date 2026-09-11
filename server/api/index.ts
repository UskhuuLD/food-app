import { getRequestListener } from "@hono/node-server";
import app from "../src/index.js";

// Vercel's Node.js function runtime invokes handlers the classic Node way
// — (req: IncomingMessage, res: ServerResponse) — not with a Web-standard
// Request/Response. hono/vercel's `handle()` assumes the latter and blows
// up here ("this.raw.headers.get is not a function"). getRequestListener
// bridges Hono's app.fetch to the Node req/res shape Vercel actually calls.
export default getRequestListener(app.fetch);
