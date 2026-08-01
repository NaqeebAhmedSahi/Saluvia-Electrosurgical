import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

/** Clean indexable URLs only — no facet/query variants. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/categories",
    "/about",
    "/contact",
    "/reviews",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/products" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/products" || path === "/categories" ? 0.9 : 0.6,
  }));

  const categories: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${SITE_URL}/products/${encodeURIComponent(product.code)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categories, ...products];
}
