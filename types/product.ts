import type { CategoryWithProducts } from "@/types/category";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryId: number;
  description?: string;
}

export interface ProductWithCategory extends Product {
  category: {
    id: string;
    name: string;
  };
}

export type SingleProductPayload = Omit<
  ProductWithCategory,
  "id" | "categoryId"
>;
