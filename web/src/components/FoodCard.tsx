import { useState } from "react";
import type { Food } from "../types";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function formatPrice(price: number) {
  return `${price.toLocaleString("mn-MN")}₮`;
}

export function FoodCard({ food }: { food: Food }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addToCart(food, 1);
    showToast("Сагсанд нэмэгдлээ", food.foodName);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-base-850 shadow-card ring-1 ring-white/5">
      <div className="relative aspect-square w-full overflow-hidden bg-base-800">
        {food.image && !imgError ? (
          <img
            src={food.image}
            alt={food.foodName}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            🍽️
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <p className="line-clamp-2 min-h-[2.5em] text-[13px] font-medium leading-tight text-white/90">
          {food.foodName}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-brand-400">
            {formatPrice(food.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`${food.foodName} сагсанд нэмэх`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-bold leading-none text-white transition hover:bg-brand-600 active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
