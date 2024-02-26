import { useCustomFetch } from "@/composables/useFetch";
import type { Product, SingleProductPayload } from "@/types/product";

/* Get all products */
export const getProducts = async (options: {} = {}) => {
  return useCustomFetch<Product[]>("/products", options);
};

/* Get one product */
export const getProduct = async (productId: number, options: {} = {}) => {
  return useCustomFetch<SingleProductPayload>(
    `/products/${productId}`,
    options,
  );
};

/* Create product */
export const createProduct = async (payload: {
  name: string;
}): Promise<Product> => {
  return useApi(`/products`, { method: "POST", body: payload });
};

/* Update product */
export const updateProduct = async (
  productId: number,
  payload: {
    name: string;
  },
): Promise<Product> => {
  return useApi(`/products/${productId}`, { method: "PATCH", body: payload });
};

/* Delete product */
export const deleteProduct = async (productId: number): Promise<void> => {
  await useApi(`/products/${productId}`, { method: "DELETE" });
};
