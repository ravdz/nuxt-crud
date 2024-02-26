import { useCustomFetch } from "@/composables/useFetch";
import type { Category, SingleCategoryPayload } from "@/types/category";

/* Get all categories */
export const getCategories = (options: {} = {}) => {
  return useCustomFetch<Category[]>("/categories", options);
};

/* Get on category */
export const getCategory = (categoryId: number, options: {} = {}) => {
  return useCustomFetch<SingleCategoryPayload>(
    `/categories/${categoryId}`,
    options,
  );
};

/* Create category */
export const createCategory = async (payload: {
  name: string;
}): Promise<Category> => {
  return useApi(`/categories`, { method: "POST", body: payload });
};

/* Update category */
export const updateCategory = async (
  categoryId: number,
  payload: {
    name: string;
  },
): Promise<Category> => {
  return useApi(`/categories/${categoryId}`, { method: "PUT", body: payload });
};

/* Delete category */
export const deleteCategory = async (categoryId: number): Promise<void> => {
  await useApi(`/categories/${categoryId}`, { method: "DELETE" });
};
