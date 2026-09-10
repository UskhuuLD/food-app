import { Hono } from "hono";
import {
  createFood,
  getFoods,
  getFoodsByCategory,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const foodRoute = new Hono();

foodRoute.get("/", getFoods);
foodRoute.get("/:categoryId", getFoodsByCategory);
foodRoute.post("/", authMiddleware, adminMiddleware, createFood);
foodRoute.patch("/:foodId", authMiddleware, adminMiddleware, updateFood);
foodRoute.delete("/:foodId", authMiddleware, adminMiddleware, deleteFood);

export default foodRoute;
