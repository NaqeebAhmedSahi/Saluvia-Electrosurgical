import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve /public assets directly. Vercel Hobby Image Optimization returns
    // 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED once the monthly quota is
    // hit; catalog assets are already WebP so the optimizer is optional.
    unoptimized: true,
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
