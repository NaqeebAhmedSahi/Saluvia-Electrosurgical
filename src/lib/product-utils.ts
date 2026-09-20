import type { Product } from "./types";
import type { CatalogListProduct } from "./catalog-list-payload";

export function variantSummary(
  product: Pick<Product, "variants"> | CatalogListProduct,
): string {
  return Object.entries(product.variants || {})
    .map(([key, values]) => `${key}: ${values.join(", ")}`)
    .join(" · ");
}
