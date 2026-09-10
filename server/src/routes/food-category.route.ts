import { Hono } from "hono";
import {
  createFoodCatergory,
  getFoodCategories,
  deleteFoodCategory,
} from "../controllers/food-category.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const foodCategoryRoute = new Hono();

foodCategoryRoute.get("/", getFoodCategories);
foodCategoryRoute.post("/", authMiddleware, adminMiddleware, createFoodCatergory);
foodCategoryRoute.delete(
  "/:foodCategoryId",
  authMiddleware,
  adminMiddleware,
  deleteFoodCategory
);

export default foodCategoryRoute;
