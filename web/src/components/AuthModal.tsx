import { useState, type FormEvent } from "react";
import { Sheet } from "./Sheet";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../lib/api";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "sign-in") {
        await signIn(email, password);
      } else {
        await signUp({ email, password });
      }
      onClose();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Алдаа гарлаа, дахин оролдоно уу"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={mode === "sign-in" ? "Нэвтрэх" : "Бүртгүүлэх"}
    >
      <div className="mb-4 flex rounded-xl bg-base-800 p-1 text-sm ring-1 ring-white/10">
        <button
          type="button"
          onClick={() => setMode("sign-in")}
          className={`flex-1 rounded-lg py-2 font-semibold transition ${
            mode === "sign-in"
              ? "bg-brand-500 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Нэвтрэх
        </button>
        <button
          type="button"
          onClick={() => setMode("sign-up")}
          className={`flex-1 rounded-lg py-2 font-semibold transition ${
            mode === "sign-up"
              ? "bg-brand-500 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Бүртгүүлэх
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-white/60">Имэйл</span>
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl bg-base-800 px-3.5 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-brand-500"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-white/60">Нууц үг</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl bg-base-800 px-3.5 py-3 text-sm text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-brand-500"
          />
        </label>

        {error && <p className="text-xs text-brand-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition hover:bg-brand-600 active:scale-[0.98] disabled:opacity-60"
        >
          {loading
            ? "Түр хүлээнэ үү…"
            : mode === "sign-in"
              ? "Нэвтрэх"
              : "Бүртгүүлэх"}
        </button>
      </form>
    </Sheet>
  );
}
