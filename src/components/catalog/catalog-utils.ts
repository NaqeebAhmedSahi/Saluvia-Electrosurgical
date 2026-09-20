import {
  getAllProducts,
  getCategories,
  getCategory,
  getProductByCode,
  getProductsByCategory,
} from "@/lib/catalog";
import { buildHref, facetKeys } from "@/lib/catalog-query";
import type { Category, Product } from "@/lib/types";

export { SITE_URL } from "@/lib/site";

export {
  PAGE_SIZE,
  SORT_OPTIONS,
  applyFacets,
  buildFacets,
  buildHref,
  countActiveFacets,
  facetKeys,
  facetParam,
  facetQueryParams,
  firstParam,
  listParam,
  matchesQuery,
  paginate,
  parsePage,
  parseSort,
  readFacetSelections,
  searchParamsFromReadonly,
  slugifyKey,
  sortProducts,
  toggleValue,
  type Facet,
  type FacetValue,
  type Paged,
  type QueryValue,
  type SearchParamsInput,
  type SortValue,
} from "@/lib/catalog-query";

/* -------------------------------------------------------------------------- */
/* Data access                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Reading the JSON catalog is cheap but `getProductByCode` scans every
 * category file, which becomes 100k+ reads while prerendering 572 PDPs.
 * Caching is limited to production so `next dev` still picks up data edits.
 */
const CACHE_ENABLED = process.env.NODE_ENV === "production";

let categoriesCache: Category[] | null = null;
let productsCache: Product[] | null = null;
let productIndexCache: Map<string, Product> | null = null;
const categoryProductsCache = new Map<string, Product[]>();

export function allCategories(): Category[] {
  if (categoriesCache) return categoriesCache;
  const categories = getCategories();
  if (CACHE_ENABLED) categoriesCache = categories;
  return categories;
}

export function findCategory(slug: string): Category | undefined {
  if (!CACHE_ENABLED) return getCategory(slug);
  return allCategories().find((category) => category.slug === slug);
}

export function allProducts(): Product[] {
  if (productsCache) return productsCache;
  const products = getAllProducts();
  if (CACHE_ENABLED) productsCache = products;
  return products;
}

export function productsInCategory(slug: string): Product[] {
  const cached = categoryProductsCache.get(slug);
  if (cached) return cached;
  const products = getProductsByCategory(slug);
  if (CACHE_ENABLED) categoryProductsCache.set(slug, products);
  return products;
}

export function findProduct(code: string): Product | undefined {
  if (!CACHE_ENABLED) return getProductByCode(code);
  if (!productIndexCache) {
    productIndexCache = new Map(
      allProducts().map((product) => [product.code.toLowerCase(), product]),
    );
  }
  return productIndexCache.get(code.trim().toLowerCase());
}

/** Mirrors `getRelatedResolved` but resolves codes through the cached index. */
export function relatedFor(product: Product, limit = 4): Product[] {
  const resolved: Product[] = [];
  for (const related of product.related_products ?? []) {
    if (resolved.length >= limit) break;
    const match = findProduct(related.code);
    if (match && match.code !== product.code) resolved.push(match);
  }
  if (resolved.length < limit) {
    for (const sibling of productsInCategory(product.category_slug)) {
      if (resolved.length >= limit) break;
      if (sibling.code === product.code) continue;
      if (resolved.some((item) => item.code === sibling.code)) continue;
      resolved.push(sibling);
    }
  }
  return resolved;
}

export function categoryThumb(slug: string): string | null {
  const product = productsInCategory(slug)[0];
  return (
    product?.images.medium ??
    product?.images.full ??
    product?.images.thumb ??
    null
  );
}

export function totalProductCount(): number {
  return allCategories().reduce(
    (total, category) => total + category.total_products,
    0,
  );
}

/* -------------------------------------------------------------------------- */
/* Copy helpers                                                                */
/* -------------------------------------------------------------------------- */

export function clampText(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/[\s,;.–-]+$/, "")}…`;
}

export function productSpecs(product: Product): [string, string][] {
  return Object.entries(product.variants ?? {})
    .filter(([, values]) => values.length > 0)
    .map(([key, values]) => [key, values.join(" · ")]);
}

export function productMetaDescription(product: Product): string {
  const specs = productSpecs(product)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
  const base = [
    `${product.title} (${product.code}) from the Saluvia ${product.category_name} range.`,
    specs,
    "Request a quote for hospital, clinic, and distributor supply.",
  ]
    .filter(Boolean)
    .join(" ");
  return clampText(base);
}

export function categoryMetaDescription(
  category: Category,
  _count: number,
): string {
  return clampText(
    `${category.name} from Saluvia — electrosurgical references listed with product codes, tip and size options, and imagery. Request a quote.`,
  );
}

/**
 * Category descriptions are a known content gap (no CMS copy yet), so the
 * intro is derived from catalog facts rather than invented marketing claims.
 */
export function categoryIntro(category: Category, products: Product[]): string {
  const keys = facetKeys(products);
  const optionText = keys.length
    ? `${keys.slice(0, 3).join(", ").toLowerCase()} options`
    : "reference imagery";
  const slug = category.slug;
  let closing =
    "Browse the full range below or search by Saluvia product code.";
  if (slug.includes("single-use")) {
    closing =
      "References in this range are intended for single-procedure use, so no reprocessing step is required.";
  } else if (slug.includes("ultra-non-stick")) {
    closing =
      "Tips in this range carry Saluvia's ultra non-stick finish, listed per reference.";
  } else if (slug.includes("non-stick")) {
    closing = "Tips in this range carry a non-stick finish, listed per reference.";
  } else if (slug.includes("cables")) {
    closing =
      "Cable lengths and connector styles are listed against each reference.";
  } else if (slug.includes("electrodes") || slug.includes("pencils")) {
    closing =
      "Tip geometry and shaft dimensions are listed against each reference.";
  } else if (slug.startsWith("european")) {
    closing =
      "European-pattern handles and tip geometries are listed per reference.";
  }
  return `The Saluvia ${category.name} range includes electrosurgical references, each listed with its product code, ${optionText}, and product imagery for specification and procurement. ${closing}`;
}

export function quoteHref(options?: {
  code?: string;
  title?: string;
  category?: string;
}): string {
  return buildHref("/contact", {
    subject: "quote",
    code: options?.code,
    product: options?.title,
    category: options?.category,
  });
}
