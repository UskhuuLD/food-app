import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/AddressContext";

function formatPrice(price: number) {
  return `${price.toLocaleString("mn-MN")}₮`;
}

export function CartBar({
  onOpenAddress,
  onOpenCart,
}: {
  onOpenAddress: () => void;
  onOpenCart: () => void;
}) {
  const { totalCount, totalPrice } = useCart();
  const { delivery } = useDelivery();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-base-900/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <button
          type="button"
          onClick={onOpenAddress}
          className="flex min-w-0 flex-1 flex-col items-start rounded-xl bg-base-800 px-3 py-2 text-left ring-1 ring-white/10 transition hover:bg-base-700"
        >
          <span className="text-[10px] font-medium uppercase tracking-wide text-white/50">
            Хүргэх хаяг
          </span>
          <span className="w-full truncate text-xs font-medium text-white">
            {delivery.address || "Хаяг нэмэх +"}
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-95"
        >
          <span aria-hidden>🛒</span>
          <span>{formatPrice(totalPrice)}</span>
          {totalCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-brand-600 ring-2 ring-base-900">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
