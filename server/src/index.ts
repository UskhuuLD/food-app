import { Hono } from "hono";
import { cors } from "hono/cors";

import authRoute from "./routes/auth.route.js";
import foodCategoryRoute from "./routes/food-category.route.js";
import foodRoute from "./routes/food.route.js";
import foodOrderRoute from "./routes/food-order.route.js";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.json({ message: "food-app api" }));

app.route("/auth", authRoute);
app.route("/food-category", foodCategoryRoute);
app.route("/food", foodRoute);
app.route("/food-order", foodOrderRoute);

export default app;
