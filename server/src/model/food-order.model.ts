import { Schema, model } from "mongoose";

export const FOOD_ORDER_STATUS = ["PENDING", "CANCELED", "DELIVERED"] as const;

// ERD deer "Энэ model биш" гэсэн тул FoodOrder дотор embedded subdocument
const FoodOrderItemSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    foodOrderItems: {
      type: [FoodOrderItemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: FOOD_ORDER_STATUS,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export const FoodOrderModel = model("FoodOrder", FoodOrderSchema);
