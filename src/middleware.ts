import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function clientIp(request: NextRequest): string {
  const candidates = [
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];
  return candidates.find((value) => Boolean(value)) ?? "unknown";
}

/** Log only real traffic — blocked bots were flooding Vercel log quota. */
function logRequest(request: NextRequest, pathname: string, search: string) {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/hero") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|map|woff2?|txt|html)$/i.test(
      pathname,
    )
  ) {
    return;
  }

  console.info(
    JSON.stringify({
      type: "request",
      method: request.method,
      path: `${pathname}${search}`,
      ip: clientIp(request),
      userAgent: request.headers.get("user-agent") ?? "",
      referer: request.headers.get("referer") ?? "",
      host: request.headers.get("host") ?? "",
      country:
        request.headers.get("x-vercel-ip-country") ??
        request.headers.get("cf-ipcountry") ??
        "",
      city: request.headers.get("x-vercel-ip-city") ?? "",
      region: request.headers.get("x-vercel-ip-country-region") ?? "",
      requestId: request.headers.get("x-vercel-id") ?? "",
    }),
  );
}

/** Cached negative response — helps CDN/Cloudflare absorb repeat bot hits. */
function botBlockedResponse(): NextResponse {
  return new NextResponse("Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}

function cheapNotFound(): NextResponse {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isHeavyFacetQuery(request: NextRequest): boolean {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname !== "/products" && !pathname.startsWith("/categories/")) {
    return false;
  }

  const categories = searchParams.getAll("category");
  const facetKeys = [...searchParams.keys()].filter((key) =>
    key.toLowerCase().startsWith("f-"),
  );
  const facetValueCount = facetKeys.reduce(
    (sum, key) => sum + searchParams.getAll(key).length,
    0,
  );

  return categories.length >= 2 || facetValueCount >= 2 || facetKeys.length >= 2;
}

/**
 * Blocks non-Search GoogleOther + facet crawl traps early.
 * Prefer blocking GoogleOther in Cloudflare so requests never reach Vercel.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lower = pathname.toLowerCase();
  const ua = request.headers.get("user-agent") ?? "";

  if (/^\/google[\w-]+\.html$/i.test(pathname)) {
    return NextResponse.next();
  }

  const isDataPath =
    lower === "/data" ||
    lower.startsWith("/data/") ||
    lower.endsWith(".json") ||
    lower.includes(".json/");

  if (isDataPath) {
    return cheapNotFound();
  }

  // No logging here — these were burning Vercel log/invocation noise
  if (/GoogleOther/i.test(ua)) {
    return botBlockedResponse();
  }

  if (/^Go-http-client\//i.test(ua) || ua.trim() === "") {
    return botBlockedResponse();
  }

  const looksLikeBot =
    /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|LinkedInBot|Bytespider|GPTBot|ClaudeBot|CCBot/i.test(
      ua,
    );
  if (looksLikeBot && isHeavyFacetQuery(request)) {
    return botBlockedResponse();
  }

  logRequest(request, pathname, search);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|google[^/]+\\.html$|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|map|woff|woff2)$).*)",
  ],
};
