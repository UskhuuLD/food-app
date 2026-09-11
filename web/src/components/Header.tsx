import { useAuth } from "../context/AuthContext";

export function Header({
  onOpenAuth,
}: {
  onOpenAuth: () => void;
}) {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-base-950/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="text-xl leading-none">🍔</span>
        <span className="text-base font-bold tracking-tight text-white">
          Food App
        </span>
      </div>

      {user ? (
        <button
          type="button"
          onClick={signOut}
          className="rounded-full bg-base-800 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10 transition hover:bg-base-700"
        >
          {user.email.split("@")[0]} · гарах
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenAuth}
          className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600"
        >
          Нэвтрэх
        </button>
      )}
    </header>
  );
}
