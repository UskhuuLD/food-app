import { Context } from "hono";
import { connectDb } from "../lib/connectDb.js";
import { FoodModel } from "../model/food.model.js";

// POST /food  (ADMIN)
export const createFood = async (c: Context) => {
  await connectDb();
  const input = await c.req.json();
  const response = await FoodModel.create({
    foodName: input.foodName,
    price: input.price,
    ingredients: input.ingredients,
    image: input.image,
    category: input.category,
  });
  return c.json({
    message: "Amjilttai hool nemle",
    response,
  });
};

// GET /food  -> buh hool
export const getFoods = async (c: Context) => {
  await connectDb();
  const foods = await FoodModel.find().populate("category");
  return c.json({
    message: "buh hool",
    foods,
  });
};

// GET /food/:categoryId  -> tuhain category-n hoolnuud
export const getFoodsByCategory = async (c: Context) => {
  await connectDb();
  const categoryId = c.req.param("categoryId");
  const foods = await FoodModel.find({ category: categoryId }).populate(
    "category"
  );
  return c.json({
    message: "category-n hoolnuud",
    foods,
  });
};

// PATCH /food/:foodId  (ADMIN)
export const updateFood = async (c: Context) => {
  await connectDb();
  const foodId = c.req.param("foodId");
  const input = await c.req.json();
  const response = await FoodModel.findByIdAndUpdate(foodId, input, {
    new: true,
  });
  return c.json({
    message: "hool shinechlelee",
    response,
  });
};

// DELETE /food/:foodId  (ADMIN)
export const deleteFood = async (c: Context) => {
  await connectDb();
  const foodId = c.req.param("foodId");
  await FoodModel.findByIdAndDelete(foodId);
  return c.json({
    message: "hool ustlaa",
  });
};
