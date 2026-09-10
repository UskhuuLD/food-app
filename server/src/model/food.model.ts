import { Schema, model } from "mongoose";

// ERD: Food -> _id, foodName, price, image, ingredients, category, createdAt, updatedAt
const FoodSchema = new Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "foodCategory",
    },
  },
  {
    timestamps: true,
  }
);

export const FoodModel = model("Food", FoodSchema);
