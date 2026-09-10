import { Hono } from "hono";
import {
  createFoodOrder,
  getFoodOrders,
  getFoodOrdersByUser,
  updateFoodOrder,
} from "../controllers/food-order.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const foodOrderRoute = new Hono();

foodOrderRoute.post("/", authMiddleware, createFoodOrder);
foodOrderRoute.get("/", authMiddleware, adminMiddleware, getFoodOrders);
foodOrderRoute.get("/:userId", authMiddleware, getFoodOrdersByUser);
foodOrderRoute.patch(
  "/:foodOrderId",
  authMiddleware,
  adminMiddleware,
  updateFoodOrder
);

export default foodOrderRoute;
