import { useEffect, useMemo, useState } from "react";
import type { Food, FoodCategory } from "./types";
import { api, ApiError } from "./lib/api";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { CategorySection } from "./components/CategorySection";
import { CartBar } from "./components/CartBar";
import { CartDrawer } from "./components/CartDrawer";
import { AddressModal } from "./components/AddressModal";
import { AuthModal } from "./components/AuthModal";
import { ToastStack } from "./components/ToastStack";

export default function App() {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([api.getFoodCategories(), api.getFoods()])
      .then(([cats, allFoods]) => {
        if (cancelled) return;
        setCategories(cats);
        setFoods(allFoods);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof ApiError
            ? err.message
            : "Сервертэй холбогдож чадсангүй"
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const foodsByCategory = useMemo(() => {
    const map = new Map<string, Food[]>();
    for (const food of foods) {
      const catId =
        typeof food.category === "string"
          ? food.category
          : food.category?._id;
      if (!catId) continue;
      const list = map.get(catId) ?? [];
      list.push(food);
      map.set(catId, list);
    }
    return map;
  }, [foods]);

  return (
    <div className="min-h-screen pb-24">
      <Header onOpenAuth={() => setAuthOpen(true)} />
      <HeroBanner />

      {loading && (
        <div className="flex flex-col items-center gap-2 py-16 text-white/50">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-brand-500" />
          <p className="text-sm">Ачааллаж байна…</p>
        </div>
      )}

      {!loading && error && (
        <div className="mx-4 mt-6 rounded-2xl bg-base-850 p-4 text-center ring-1 ring-white/10">
          <p className="text-sm text-white/70">{error}</p>
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <div className="mx-4 mt-6 rounded-2xl bg-base-850 p-4 text-center ring-1 ring-white/10">
          <p className="text-sm text-white/70">
            Одоогоор цэс хоосон байна — удахгүй хоол нэмэгдэнэ 🍳
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        categories.map((category) => (
          <CategorySection
            key={category._id}
            category={category}
            foods={foodsByCategory.get(category._id) ?? []}
          />
        ))}

      <CartBar
        onOpenAddress={() => setAddressOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onNeedsAuth={() => setAuthOpen(true)}
        onNeedsAddress={() => setAddressOpen(true)}
      />
      <AddressModal open={addressOpen} onClose={() => setAddressOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <ToastStack />
    </div>
  );
}
