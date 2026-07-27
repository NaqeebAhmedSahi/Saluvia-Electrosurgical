import type { Product } from "./types";

export function variantSummary(product: Product): string {
  return Object.entries(product.variants || {})
    .map(([key, values]) => `${key}: ${values.join(", ")}`)
    .join(" · ");
}
