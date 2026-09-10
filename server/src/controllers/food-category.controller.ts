import { connectDb } from "../lib/connectDb.js";
import { FoodCategoryModel } from "../model/food-category.model.js";
import { Context } from "hono";

// POST /food-category  (ADMIN)
export const createFoodCatergory = async (c: Context) => {
  await connectDb(); // db tei holbogdoh functionoo duudaj ajilluulna
  const input = await c.req.json(); // gadnaas useriin bichj ugsun utgiig avna
  await FoodCategoryModel.create({
    // db ruugee category nemj bga heseg
    categoryName: input.categoryName,
  });
  return c.json({
    message: "successfully created food category",
  });
};

// GET /food-category
export const getFoodCategories = async (c: Context) => {
  await connectDb();
  const FoodCategories = await FoodCategoryModel.find();

  return c.json({
    message: "categorygoo avarai",
    FoodCategories,
  });
};

// DELETE /food-category/:foodCategoryId  (ADMIN)
export const deleteFoodCategory = async (c: Context) => {
  await connectDb();
  const foodCategoryId = c.req.param("foodCategoryId");
  await FoodCategoryModel.findByIdAndDelete(foodCategoryId);
  return c.json({
    message: "successfully deleted food category",
  });
};
