export type FoodCategory = {
  _id: string;
  categoryName: string;
};

export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image?: string;
  ingredients?: string;
  category?: FoodCategory | string;
};

export type CartLine = {
  food: Food;
  quantity: number;
};

export type AuthUser = {
  _id: string;
  email: string;
  role: "USER" | "ADMIN";
  address?: string;
  phoneNumber?: string;
};
