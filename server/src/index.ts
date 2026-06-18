import { Hono } from "hono";

import { Schema, model } from "mongoose";
import { connectDb } from "./lib/connectDb.js";
import foodCategoryRoute from "./routes/food-category.route.js";
import { cors } from "hono/cors";
import foodRoute from "./routes/food.route.js";

const app = new Hono();

app.use("*", cors());

//food category nemeh huselt

app.route("/category", foodCategoryRoute);
app.route("/food", foodRoute);


export default app;