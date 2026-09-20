import type { NextConfig } from "next";

const immutableYear =
  "public, max-age=31536000, s-maxage=31536000, immutable";

/** Static HTML — long CDN cache so Fast Origin Transfer stays low on repeats. */
const staticHtmlCache =
  "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  images: {
    // Serve /public assets directly. Vercel Hobby Image Optimization returns
    // 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED once the monthly quota is
    // hit; catalog assets are already WebP so the optimizer is optional.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/data/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: immutableYear }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: immutableYear }],
      },
      {
        source: "/:path*.(webp|png|jpg|jpeg|gif|avif|svg|ico|woff|woff2)",
        headers: [{ key: "Cache-Control", value: immutableYear }],
      },
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/about",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/contact",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/privacy",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/terms",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/reviews",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/products",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/products/:code",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/categories",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/categories/:slug",
        headers: [{ key: "Cache-Control", value: staticHtmlCache }],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
