import type { Product } from "@/types/product";

export interface Category {
  id: number;
  name: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export type SingleCategoryPayload = Omit<CategoryWithProducts, "id">;
