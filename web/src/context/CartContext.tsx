import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Food } from "../types";

const STORAGE_KEY = "food-app.cart";

type CartContextValue = {
  lines: CartLine[];
  totalCount: number;
  totalPrice: number;
  addToCart: (food: Food, quantity?: number) => void;
  removeFromCart: (foodId: string) => void;
  setQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadInitial(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // localStorage untsaan bol chimeegui unshina — cart ni zovhon
      // ene session-d bagtana
    }
  }, [lines]);

  const addToCart = (food: Food, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.food._id === food._id);
      if (existing) {
        return prev.map((l) =>
          l.food._id === food._id
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { food, quantity }];
    });
  };

  const removeFromCart = (foodId: string) => {
    setLines((prev) => prev.filter((l) => l.food._id !== foodId));
  };

  const setQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.food._id === foodId ? { ...l, quantity } : l))
    );
  };

  const clearCart = () => setLines([]);

  const totalCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );
  const totalPrice = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity * l.food.price, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        totalCount,
        totalPrice,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
