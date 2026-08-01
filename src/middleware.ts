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

/**
 * Catalog JSON lives in /data (server-only via fs). It is not under /public,
 * but we still hard-block common probe paths so raw JSON is never served.
 * Also logs request metadata to Vercel Runtime Logs for traffic inspection.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lower = pathname.toLowerCase();

  const isDataPath =
    lower === "/data" ||
    lower.startsWith("/data/") ||
    lower.endsWith(".json") ||
    lower.includes(".json/");

  if (isDataPath) {
    console.info(
      JSON.stringify({
        type: "request_blocked",
        method: request.method,
        path: `${pathname}${search}`,
        ip: clientIp(request),
        userAgent: request.headers.get("user-agent") ?? "",
        host: request.headers.get("host") ?? "",
      }),
    );

    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  if (shouldLogPath(pathname)) {
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
        forwardedFor: request.headers.get("x-forwarded-for") ?? "",
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next internals and common static files.
     * Still runs for pages/API so request details appear in Vercel logs.
     */
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|map|woff|woff2)$).*)",
  ],
};
