import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "../types";
import { api } from "../lib/api";

const STORAGE_KEY = "food-app.auth";

type StoredAuth = { token: string; user: AuthUser };

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: {
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
  }) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadInitial(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(loadInitial);

  const persist = (value: StoredAuth | null) => {
    setAuth(value);
    try {
      if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // hadgalj chadaagui ch session-diihee ashiglaad davjina
    }
  };

  const signIn = async (email: string, password: string) => {
    const { token, user } = await api.signIn(email, password);
    persist({ token, user });
  };

  const signUp = async (input: {
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
  }) => {
    const { token, user } = await api.signUp(input);
    persist({ token, user });
  };

  const signOut = () => persist(null);

  return (
    <AuthContext.Provider
      value={{
        token: auth?.token ?? null,
        user: auth?.user ?? null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
