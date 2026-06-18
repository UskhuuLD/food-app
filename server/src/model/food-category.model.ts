import { model, Schema } from "mongoose";
 
const FoodcategorySchema = new Schema(
    {
        categoryName:{
            type: String,
            required:true,
        },
    },
{
 timestamps:true
}
);
export const FoodCategoryModel = model("foodCategory", FoodcategorySchema);