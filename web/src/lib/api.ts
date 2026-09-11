import type { AuthUser, Food, FoodCategory } from "../types";

const BASE_URL = (import.meta.env.VITE_API_URL ?? "https://food-app-8no4.vercel.app").replace(
  /\/$/,
  ""
);

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<T> {
  const { token, headers, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : undefined;

  if (!res.ok) {
    throw new ApiError(body?.message ?? res.statusText, res.status);
  }
  return body as T;
}

export const api = {
  getFoodCategories: () =>
    request<{ FoodCategories: FoodCategory[] }>("/food-category").then(
      (r) => r.FoodCategories
    ),

  getFoods: () => request<{ foods: Food[] }>("/food").then((r) => r.foods),

  getFoodsByCategory: (categoryId: string) =>
    request<{ foods: Food[] }>(`/food/${categoryId}`).then((r) => r.foods),

  signIn: (email: string, password: string) =>
    request<{ token: string; user: AuthUser }>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signUp: (input: {
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
  }) =>
    request<{ token: string; user: AuthUser }>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  createOrder: (
    token: string,
    foodOrderItems: { food: string; quantity: number }[]
  ) =>
    request<{ order: { _id: string; totalPrice: number } }>("/food-order", {
      method: "POST",
      token,
      body: JSON.stringify({ foodOrderItems }),
    }),
};

export { ApiError };
