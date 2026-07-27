// Client-safe site constants (no Node-only imports here).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://saluvia.com"
).replace(/\/$/, "");
