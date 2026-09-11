import type { ReactNode } from "react";

export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <button
        type="button"
        aria-label="Хаах"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative z-10 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-base-900 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-card ring-1 ring-white/10">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-base-800 text-white/70 transition hover:bg-base-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
