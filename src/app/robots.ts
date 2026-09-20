import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Limit crawler URL explosion from faceted catalog query strings.
 * GoogleOther is Google's non-Search crawler — blocking it does not hurt SEO.
 * SEO scrapers are disallowed to cut Edge Requests / Origin Transfer on Hobby.
 */
export default function robots(): MetadataRoute.Robots {
  const scrapers = [
    "AhrefsBot",
    "SemrushBot",
    "DotBot",
    "MJ12bot",
    "DataForSeoBot",
    "BLEXBot",
    "Seekport",
    "ZoominfoBot",
    "PetalBot",
    "Bytespider",
    "GPTBot",
    "ClaudeBot",
    "CCBot",
    "Amazonbot",
    "meta-externalagent",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/data/", "/products?", "/*?*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/cart", "/data/", "/products?", "/*?*"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/api/", "/cart", "/data/", "/*?*"],
      },
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
      ...scrapers.map((userAgent) => ({
        userAgent,
        disallow: ["/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
