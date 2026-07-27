import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local catalog images are WebP files under /public/images (junction)
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
  // Never treat /data as a static asset root; catalog JSON is server-only.
  async headers() {
    return [
      {
        source: "/data/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
