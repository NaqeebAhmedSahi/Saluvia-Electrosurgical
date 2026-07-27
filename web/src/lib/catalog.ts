import fs from "fs";
import path from "path";
import type { Category, Product, ProgressEntry } from "./types";

const DATA_ROOT = path.join(process.cwd(), "data");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function publicImagePath(relative: string): string {
  // JSON paths are like "images/bipolar-forceps/.../thumb.webp"
  // served from /images/... via public junction
  return "/" + relative.replace(/^\/+/, "").replace(/^images\//, "images/");
}

export function getProgress(): Record<string, ProgressEntry> {
  return readJson(path.join(DATA_ROOT, "progress.json"));
}

export function getCategories(): Category[] {
  const categories = readJson<Category[]>(
    path.join(DATA_ROOT, "categories.json"),
  );
  const progress = getProgress();
  return categories.map((c) => ({
    ...c,
    total_products: progress[c.slug]?.total_products ?? c.total_products ?? 0,
  }));
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  const file = path.join(DATA_ROOT, "products", `${slug}.json`);
  if (!fs.existsSync(file)) return [];
  const products = readJson<Product[]>(file);
  return products.map(normalizeProduct);
}

export function getAllProducts(): Product[] {
  return getCategories().flatMap((c) => getProductsByCategory(c.slug));
}

export function getProductByCode(code: string): Product | undefined {
  const normalized = code.trim().toLowerCase();
  for (const category of getCategories()) {
    const match = getProductsByCategory(category.slug).find(
      (p) => p.code.toLowerCase() === normalized,
    );
    if (match) return match;
  }
  return undefined;
}

export function getFeaturedProducts(limit = 12): Product[] {
  const preferred = [
    "bipolar-forceps",
    "european-bipolar-forceps",
    "bipolar-forceps-non-stick",
    "electrosurgical-pencils",
    "bipolar-electrodes",
    "arthroscopic-electrodes",
    "electrosurgical-instruments-for-gynecology",
    "bipolar-cables",
  ];
  const picks: Product[] = [];
  for (const slug of preferred) {
    const first = getProductsByCategory(slug)[0];
    if (first) picks.push(first);
    if (picks.length >= limit) break;
  }
  if (picks.length < limit) {
    for (const p of getAllProducts()) {
      if (!picks.some((x) => x.code === p.code)) picks.push(p);
      if (picks.length >= limit) break;
    }
  }
  return picks;
}

export function getSliderProducts(limit = 6): Product[] {
  return getFeaturedProducts(limit);
}

export function getCategoryThumb(slug: string): string | null {
  const product = getProductsByCategory(slug)[0];
  return (
    product?.images.medium ??
    product?.images.full ??
    product?.images.thumb ??
    null
  );
}

export function searchProducts(query: string, limit = 48): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllProducts().slice(0, limit);
  return getAllProducts()
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q),
    )
    .slice(0, limit);
}

export function getRelatedResolved(product: Product, limit = 4): Product[] {
  const related = product.related_products ?? [];
  const resolved: Product[] = [];
  for (const r of related) {
    const found = getProductByCode(r.code);
    if (found) resolved.push(found);
    if (resolved.length >= limit) break;
  }
  if (resolved.length < limit) {
    for (const p of getProductsByCategory(product.category_slug)) {
      if (p.code === product.code) continue;
      if (!resolved.some((x) => x.code === p.code)) resolved.push(p);
      if (resolved.length >= limit) break;
    }
  }
  return resolved;
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    images: {
      ...product.images,
      full: publicImagePath(product.images.full),
      medium: publicImagePath(product.images.medium),
      thumb: publicImagePath(product.images.thumb),
    },
  };
}

export { CATEGORY_FAMILIES } from "./category-families";
