import {
  getAllProducts,
  getCategories,
  getCategory,
  getProductByCode,
  getProductsByCategory,
} from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";

export { SITE_URL } from "@/lib/site";

export const PAGE_SIZE = 24;

export type SearchParamsInput = Record<string, string | string[] | undefined>;

export type QueryValue = string | number | string[] | undefined | null;

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
/* Query params                                                                */
/* -------------------------------------------------------------------------- */

export function firstParam(
  params: SearchParamsInput,
  key: string,
): string | undefined {
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

/** Accepts repeated params (`?category=a&category=b`) and comma lists. */
export function listParam(params: SearchParamsInput, key: string): string[] {
  const value = params[key];
  if (value === undefined) return [];
  const raw = Array.isArray(value) ? value : [value];
  const flattened = raw
    .flatMap((entry) => entry.split(","))
    .map((entry) => entry.trim())
    .filter(Boolean);
  return Array.from(new Set(flattened));
}

export function buildHref(
  pathname: string,
  params: Record<string, QueryValue>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry) search.append(key, entry);
      }
      continue;
    }
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((entry) => entry !== value)
    : [...values, value];
}

/* -------------------------------------------------------------------------- */
/* Sorting                                                                     */
/* -------------------------------------------------------------------------- */

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "az", label: "Name (A–Z)" },
  { value: "code", label: "Product code" },
  { value: "category", label: "Category" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function parseSort(value: string | undefined): SortValue {
  const match = SORT_OPTIONS.find((option) => option.value === value);
  return match ? match.value : "relevance";
}

export function parsePage(value: string | undefined): number {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

function relevanceScore(product: Product, query: string): number {
  const q = query.toLowerCase();
  const code = product.code.toLowerCase();
  const title = product.title.toLowerCase();
  let score = 0;
  if (code === q) score += 120;
  else if (code.startsWith(q)) score += 80;
  else if (code.includes(q)) score += 50;
  if (title === q) score += 60;
  else if (title.startsWith(q)) score += 40;
  else if (title.includes(q)) score += 25;
  if (product.short_description.toLowerCase().includes(q)) score += 10;
  if (product.category_name.toLowerCase().includes(q)) score += 5;
  return score;
}

export function sortProducts(
  products: Product[],
  sort: SortValue,
  query?: string,
): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "az":
      sorted.sort(
        (a, b) =>
          collator.compare(a.title, b.title) ||
          collator.compare(a.code, b.code),
      );
      break;
    case "code":
      sorted.sort((a, b) => collator.compare(a.code, b.code));
      break;
    case "category":
      sorted.sort(
        (a, b) =>
          collator.compare(a.category_name, b.category_name) ||
          collator.compare(a.code, b.code),
      );
      break;
    default:
      if (query) {
        sorted.sort(
          (a, b) =>
            relevanceScore(b, query) - relevanceScore(a, query) ||
            collator.compare(a.code, b.code),
        );
      } else {
        sorted.sort((a, b) => collator.compare(a.code, b.code));
      }
  }
  return sorted;
}

export function matchesQuery(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    product.title.toLowerCase().includes(q) ||
    product.code.toLowerCase().includes(q) ||
    product.short_description.toLowerCase().includes(q) ||
    product.category_name.toLowerCase().includes(q)
  );
}

/* -------------------------------------------------------------------------- */
/* Variant facets                                                              */
/* -------------------------------------------------------------------------- */

export type FacetValue = { value: string; count: number; selected: boolean };

export type Facet = {
  key: string;
  param: string;
  values: FacetValue[];
};

export function slugifyKey(key: string): string {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function facetParam(key: string): string {
  return `f-${slugifyKey(key)}`;
}

export function facetKeys(products: Product[]): string[] {
  const keys: string[] = [];
  for (const product of products) {
    for (const key of Object.keys(product.variants ?? {})) {
      if (!keys.includes(key)) keys.push(key);
    }
  }
  return keys;
}

export function readFacetSelections(
  params: SearchParamsInput,
  keys: string[],
): Record<string, string[]> {
  const selections: Record<string, string[]> = {};
  for (const key of keys) {
    const values = listParam(params, facetParam(key));
    if (values.length) selections[key] = values;
  }
  return selections;
}

function matchesFacet(product: Product, key: string, values: string[]) {
  const productValues = product.variants?.[key] ?? [];
  return values.some((value) => productValues.includes(value));
}

export function applyFacets(
  products: Product[],
  selections: Record<string, string[]>,
  skipKey?: string,
): Product[] {
  const entries = Object.entries(selections).filter(
    ([key, values]) => values.length > 0 && key !== skipKey,
  );
  if (!entries.length) return products;
  return products.filter((product) =>
    entries.every(([key, values]) => matchesFacet(product, key, values)),
  );
}

/**
 * Counts each facet against the result set filtered by every *other* facet, so
 * unselected options still show how many products they would add.
 */
export function buildFacets(
  products: Product[],
  selections: Record<string, string[]>,
  maxValuesPerFacet = 12,
): Facet[] {
  return facetKeys(products)
    .map((key) => {
      const scoped = applyFacets(products, selections, key);
      const counts = new Map<string, number>();
      for (const product of scoped) {
        for (const value of product.variants?.[key] ?? []) {
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }
      const selected = selections[key] ?? [];
      for (const value of selected) {
        if (!counts.has(value)) counts.set(value, 0);
      }
      const values = Array.from(counts.entries())
        .map(([value, count]) => ({
          value,
          count,
          selected: selected.includes(value),
        }))
        .sort(
          (a, b) =>
            Number(b.selected) - Number(a.selected) ||
            collator.compare(a.value, b.value),
        )
        .slice(0, maxValuesPerFacet);
      return { key, param: facetParam(key), values };
    })
    .filter((facet) => facet.values.length > 1 || facet.values.some((v) => v.selected));
}

export function facetQueryParams(
  selections: Record<string, string[]>,
): Record<string, string[]> {
  const params: Record<string, string[]> = {};
  for (const [key, values] of Object.entries(selections)) {
    if (values.length) params[facetParam(key)] = values;
  }
  return params;
}

export function countActiveFacets(selections: Record<string, string[]>): number {
  return Object.values(selections).reduce(
    (total, values) => total + values.length,
    0,
  );
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                  */
/* -------------------------------------------------------------------------- */

export type Paged<T> = {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
  from: number;
  to: number;
};

export function paginate<T>(
  items: T[],
  page: number,
  pageSize = PAGE_SIZE,
): Paged<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  return {
    items: slice,
    page: current,
    pageCount,
    total,
    from: total === 0 ? 0 : start + 1,
    to: start + slice.length,
  };
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
  count: number,
): string {
  return clampText(
    `${category.name} from Saluvia — ${count} electrosurgical ${
      count === 1 ? "reference" : "references"
    } listed with product codes, tip and size options, and imagery. Request a quote.`,
  );
}

/**
 * Category descriptions are a known content gap (no CMS copy yet), so the
 * intro is derived from catalog facts rather than invented marketing claims.
 */
export function categoryIntro(category: Category, products: Product[]): string {
  const count = products.length || category.total_products;
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
  return `The Saluvia ${category.name} range covers ${count} ${
    count === 1 ? "reference" : "references"
  }, each listed with its product code, ${optionText}, and product imagery for specification and procurement. ${closing}`;
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
