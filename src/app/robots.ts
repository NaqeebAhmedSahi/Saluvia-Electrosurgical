import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Limit crawler URL explosion from faceted catalog query strings.
 * GoogleOther is Google's non-Search crawler — blocking it does not hurt SEO.
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
          "/products?",
          "/*?*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/cart", "/data/", "/products?", "/*?*"],
      },
      // Non-Search Google crawler — main source of facet spam in Vercel logs
      {
        userAgent: "GoogleOther",
        disallow: ["/"],
      },
      {
        userAgent: "GoogleOther-Image",
        disallow: ["/"],
      },
      {
        userAgent: "GoogleOther-Video",
        disallow: ["/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
