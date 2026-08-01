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

function shouldLogPath(pathname: string): boolean {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/hero") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return false;
  }

  if (/\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|map|woff2?|txt)$/i.test(pathname)) {
    return false;
  }

  return true;
}

function logRequest(
  type: string,
  request: NextRequest,
  pathname: string,
  search: string,
) {
  if (!shouldLogPath(pathname) && type === "request") return;

  console.info(
    JSON.stringify({
      type,
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
      forwardedFor: request.headers.get("x-forwarded-for") ?? "",
    }),
  );
}

function cheapNotFound(): NextResponse {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Faceted listing URLs that explode crawl graphs. */
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

  // Multi-category and/or multi-facet combos are the crawl trap seen in logs
  return categories.length >= 2 || facetValueCount >= 2 || facetKeys.length >= 2;
}

/**
 * Catalog JSON lives in /data (server-only via fs). It is not under /public,
 * but we still hard-block common probe paths so raw JSON is never served.
 * Also logs request metadata and stops known non-Search crawl traps early.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lower = pathname.toLowerCase();
  const ua = request.headers.get("user-agent") ?? "";

  // Always allow Google Search Console HTML verification files
  if (/^\/google[\w-]+\.html$/i.test(pathname)) {
    return NextResponse.next();
  }

  const isDataPath =
    lower === "/data" ||
    lower.startsWith("/data/") ||
    lower.endsWith(".json") ||
    lower.includes(".json/");

  if (isDataPath) {
    logRequest("request_blocked", request, pathname, search);
    return cheapNotFound();
  }

  // GoogleOther = Google non-Search crawler (does not affect SEO). Stop immediately.
  if (/GoogleOther/i.test(ua)) {
    logRequest("request_blocked_googleother", request, pathname, search);
    return cheapNotFound();
  }

  // Cheap probes / scrapers with no real browser UA
  if (/^Go-http-client\//i.test(ua) || ua.trim() === "") {
    logRequest("request_blocked_probe", request, pathname, search);
    return cheapNotFound();
  }

  // Known bots hitting heavy facet combinations — do not render the catalog page
  const looksLikeBot =
    /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|LinkedInBot|Bytespider|GPTBot|ClaudeBot|CCBot/i.test(
      ua,
    );
  if (looksLikeBot && isHeavyFacetQuery(request)) {
    logRequest("request_blocked_facet_bot", request, pathname, search);
    return cheapNotFound();
  }

  logRequest("request", request, pathname, search);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|google[^/]+\\.html$|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|map|woff|woff2)$).*)",
  ],
};
