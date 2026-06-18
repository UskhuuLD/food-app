import { Context} from "hono";
import { connectDb } from "../lib/connectDb.js";
import { FoodModel } from "../model/food-model.js";

export const createFood = async (c:Context)=>{
    await connectDb();
    const input = await c.req.json();
    const response = await FoodModel.create({
        foodname: input.foodName,
        price:input.price,
        ingredients:input.ingredients,
        image:input.image,
        category:input.category,
    });
    return c.json({
        message: "Amjilttai hool nemle",
        response,
    });
};