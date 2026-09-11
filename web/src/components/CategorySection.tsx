import type { Food, FoodCategory } from "../types";
import { FoodCard } from "./FoodCard";

export function CategorySection({
  category,
  foods,
}: {
  category: FoodCategory;
  foods: Food[];
}) {
  if (foods.length === 0) return null;

  return (
    <section className="px-4 pt-5">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/70">
        {category.categoryName}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
}
