import { useState } from "react";
import { Sheet } from "./Sheet";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useDelivery } from "../context/AddressContext";
import { useToast } from "../context/ToastContext";
import { api, ApiError } from "../lib/api";

function formatPrice(price: number) {
  return `${price.toLocaleString("mn-MN")}₮`;
}

export function CartDrawer({
  open,
  onClose,
  onNeedsAuth,
  onNeedsAddress,
}: {
  open: boolean;
  onClose: () => void;
  onNeedsAuth: () => void;
  onNeedsAddress: () => void;
}) {
  const { lines, totalPrice, setQuantity, clearCart } = useCart();
  const { token } = useAuth();
  const { delivery } = useDelivery();
  const { showToast } = useToast();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!token) {
      onClose();
      onNeedsAuth();
      return;
    }
    if (!delivery.address) {
      onClose();
      onNeedsAddress();
      return;
    }
    setError(null);
    setPlacing(true);
    try {
      await api.createOrder(
        token,
        lines.map((l) => ({ food: l.food._id, quantity: l.quantity }))
      );
      clearCart();
      showToast("Захиалга баталгаажлаа 🎉", "Тун удахгүй хүргэнэ");
      onClose();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Захиалга үүсгэхэд алдаа гарлаа"
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Sheet open={open} onClose={onClose} title="Сагс">
      {lines.length === 0 ? (
        <p className="py-8 text-center text-sm text-white/50">
          Сагс хоосон байна
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {lines.map((line) => (
            <div key={line.food._id} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-base-800">
                {line.food.image ? (
                  <img
                    src={line.food.image}
                    alt={line.food.foodName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>🍽️</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {line.food.foodName}
                </p>
                <p className="text-xs text-brand-400">
                  {formatPrice(line.food.price)}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-base-800 px-1.5 py-1 ring-1 ring-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(line.food._id, line.quantity - 1)
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white/80 hover:bg-base-700"
                  aria-label="Тоо хасах"
                >
                  −
                </button>
                <span className="w-4 text-center text-xs font-semibold text-white">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(line.food._id, line.quantity + 1)
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white/80 hover:bg-base-700"
                  aria-label="Тоо нэмэх"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-sm text-white/60">Нийт дүн</span>
            <span className="text-lg font-bold text-white">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {error && <p className="text-xs text-brand-400">{error}</p>}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={placing}
            className="mt-1 rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-[0.98] disabled:opacity-60"
          >
            {placing ? "Захиалж байна…" : "Захиалах"}
          </button>
        </div>
      )}
    </Sheet>
  );
}
