import app from "../../src/index.js";

// Netlify Functions v2 hands us a standard Web `Request` and expects a
// `Response` back — exactly the shape of Hono's `app.fetch`.
// `config.path = "/*"` sends every incoming request through this function,
// and Hono dispatches to the matching route from there.
export default async (request: Request): Promise<Response> => {
  return app.fetch(request);
};

export const config = {
  path: "/*",
};
