import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Limit crawler URL explosion from faceted catalog query strings.
 * Metadata noindex on filtered pages is the stronger signal; robots helps polite bots.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/cart",
          "/data/",
          // Faceted / filtered catalog (query-string crawl traps)
          "/products?",
          "/*?*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/cart", "/data/", "/products?", "/*?*"],
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
        disallow: ["/api/", "/cart", "/data/", "/products?", "/*?*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
