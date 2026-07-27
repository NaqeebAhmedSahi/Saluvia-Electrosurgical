import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Catalog JSON lives in /data (server-only via fs). It is not under /public,
 * but we still hard-block common probe paths so raw JSON is never served.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();

  const isDataPath =
    lower === "/data" ||
    lower.startsWith("/data/") ||
    lower.endsWith(".json") ||
    lower.includes(".json/");

  if (isDataPath) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/data",
    "/data/:path*",
    "/:path*.json",
    "/:path*.JSON",
  ],
};
