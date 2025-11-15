import { $api } from "./api";
import { IProductQuickView } from "./types/product";

export enum ProductCategory {
  LAPTOP = "laptop",
  SMARTPHONE = "smartphone",
  HEADPHONE = "headphone",
  SMARTWATCH = "smartwatch",
  ACCESORY = "accesory",
}

export async function searchProducts(
  query: string,
  category: ProductCategory | null
): Promise<IProductQuickView[]> {
  const { data } = await $api.get("products/search", {
    params: {
      query,
      category,
    },
  });
  return data ?? [];
}
