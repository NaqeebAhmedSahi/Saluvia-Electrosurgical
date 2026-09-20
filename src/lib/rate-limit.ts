/**
 * Lightweight in-memory sliding-window rate limit for serverless.
 * Best-effort per instance — pair with Cloudflare rate rules in production.
 */

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - opts.windowMs;
  const existing = buckets.get(opts.key);
  const timestamps = (existing?.timestamps ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= opts.limit) {
    const oldest = timestamps[0] ?? now;
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldest + opts.windowMs - now) / 1000),
    );
    buckets.set(opts.key, { timestamps });
    return { ok: false, retryAfterSec };
  }

  timestamps.push(now);
  buckets.set(opts.key, { timestamps });

  // Bound memory on long-lived instances
  if (buckets.size > 5000) {
    const firstKey = buckets.keys().next().value;
    if (firstKey) buckets.delete(firstKey);
  }

  return { ok: true };
}

export function clientIpFromRequest(request: Request): string {
  const headers = request.headers;
  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];
  return candidates.find((value) => Boolean(value)) ?? "unknown";
}
