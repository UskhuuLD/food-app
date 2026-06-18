import { Hono } from "hono";
import {createFood} from "../controllers/food.controller.js";

const foodRoute = new Hono();

foodRoute.post("/", createFood);

export default foodRoute;

