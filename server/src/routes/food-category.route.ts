import {Hono} from "hono";
import {createFoodCatergory, getFoodCategories} from "../controllers/food-category.controller.js";

const foodCategoryRoute = new Hono();

foodCategoryRoute.post("/", createFoodCatergory);

foodCategoryRoute.get("/", getFoodCategories);

export default foodCategoryRoute ;