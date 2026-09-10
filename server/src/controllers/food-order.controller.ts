import { Context } from "hono";
import { connectDb } from "../lib/connectDb.js";
import { FoodOrderModel } from "../model/food-order.model.js";
import { FoodModel } from "../model/food.model.js";

type OrderItemInput = { food: string; quantity: number };


export const createFoodOrder = async (c: Context) => {
  await connectDb();
  const user = c.get("user");
  const input = await c.req.json();
  const items: OrderItemInput[] = input.foodOrderItems || [];

  if (!items.length) {
    return c.json({ message: "foodOrderItems required" }, 400);
  }

  // Niiit uniig server tald tootsoolno (гаднаас ирсэн үнэд итгэхгүй)
  const foodIds = items.map((i) => i.food);
  const foods = await FoodModel.find({ _id: { $in: foodIds } });
  const priceMap = new Map(foods.map((f) => [String(f._id), f.price ?? 0]));

  let totalPrice = 0;
  for (const item of items) {
    const price = priceMap.get(item.food);
    if (price == null) {
      return c.json({ message: `food not found: ${item.food}` }, 400);
    }
    totalPrice += price * item.quantity;
  }

  const order = await FoodOrderModel.create({
    user: user.userId,
    foodOrderItems: items,
    totalPrice,
    status: "PENDING",
  });

  return c.json({
    message: "order created",
    order,
  });
};

// GET /food-order  (ADMIN) -> buh zahialga
export const getFoodOrders = async (c: Context) => {
  await connectDb();
  const orders = await FoodOrderModel.find()
    .populate("user", "email phoneNumber address")
    .populate("foodOrderItems.food")
    .sort({ createdAt: -1 });
  return c.json({
    message: "buh zahialga",
    orders,
  });
};

// GET /food-order/:userId  (auth) -> tuhain hereglegchiin zahialga
export const getFoodOrdersByUser = async (c: Context) => {
  await connectDb();
  const requester = c.get("user");
  const userId = c.req.param("userId");

  if (requester.role !== "ADMIN" && requester.userId !== userId) {
    return c.json({ message: "forbidden" }, 403);
  }

  const orders = await FoodOrderModel.find({ user: userId })
    .populate("foodOrderItems.food")
    .sort({ createdAt: -1 });
  return c.json({
    message: "hereglegchiin zahialga",
    orders,
  });
};

// PATCH /food-order/:foodOrderId  (ADMIN) -> tuluviig oorchloh
export const updateFoodOrder = async (c: Context) => {
  await connectDb();
  const foodOrderId = c.req.param("foodOrderId");
  const input = await c.req.json();

  const update: Record<string, unknown> = {};
  if (input.status) update.status = input.status;

  const order = await FoodOrderModel.findByIdAndUpdate(foodOrderId, update, {
    new: true,
  });
  return c.json({
    message: "zahialga shinechlelee",
    order,
  });
};
