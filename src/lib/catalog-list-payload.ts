import type { Category, Product } from "@/lib/types";

/**
 * Minimal product shape for catalog grids — strips related_products, notes,
 * full-res paths, and scrape metadata so the static /products payload stays small.
 */
export type CatalogListProduct = {
  title: string;
  code: string;
  category_name: string;
  category_slug: string;
  short_description: string;
  variants: Record<string, string[]>;
  images: {
    medium: string;
    thumb: string;
    full: string;
  };
};

export function toCatalogListProduct(product: Product): CatalogListProduct {
  const medium =
    product.images.medium || product.images.thumb || product.images.full;
  const thumb =
    product.images.thumb || product.images.medium || product.images.full;
  return {
    title: product.title,
    code: product.code,
    category_name: product.category_name,
    category_slug: product.category_slug,
    short_description: product.short_description ?? "",
    variants: product.variants ?? {},
    images: {
      medium,
      thumb,
      // Keep a full fallback for AddToCart / cards, but prefer medium on the wire
      full: medium,
    },
  };
}

export function toCatalogListProducts(products: Product[]): CatalogListProduct[] {
  return products.map(toCatalogListProduct);
}

export type CatalogListCategory = Pick<
  Category,
  "name" | "slug" | "total_products"
>;

export function toCatalogListCategory(category: Category): CatalogListCategory {
  return {
    name: category.name,
    slug: category.slug,
    total_products: category.total_products,
  };
}
