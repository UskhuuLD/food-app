import { useState, type FormEvent } from "react";
import { Sheet } from "./Sheet";
import { useDelivery } from "../context/AddressContext";

export function AddressModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { delivery, setDelivery } = useDelivery();
  const [address, setAddress] = useState(delivery.address);
  const [phoneNumber, setPhoneNumber] = useState(delivery.phoneNumber);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDelivery({ address: address.trim(), phoneNumber: phoneNumber.trim() });
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title="Хүргэлтийн хаяг">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-white/60">Хаяг</span>
          <input
            autoFocus
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Жишээ нь: Сүхбаатар дүүрэг, 1-р хороо..."
            required
            className="rounded-xl bg-base-800 px-3.5 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-brand-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-white/60">
            Утасны дугаар
          </span>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="99001122"
            inputMode="tel"
            className="rounded-xl bg-base-800 px-3.5 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-brand-500"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-[0.98]"
        >
          Хадгалах
        </button>
      </form>
    </Sheet>
  );
}
