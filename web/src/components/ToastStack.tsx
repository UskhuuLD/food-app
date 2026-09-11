import { useToast } from "../context/ToastContext";

export function ToastStack() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-base-800/95 px-4 py-2.5 shadow-card ring-1 ring-white/10 backdrop-blur animate-[fade-in_0.15s_ease-out]"
        >
          <span className="text-base leading-none">✅</span>
          <div className="text-xs leading-tight">
            <p className="font-semibold text-white">{t.message}</p>
            {t.sub && <p className="text-white/60">{t.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
