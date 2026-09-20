import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

/**
 * Edge middleware scoped to raw catalog data paths only — HTML pages (including
 * static catalog listings) no longer invoke middleware on every request.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  const ua = request.headers.get("user-agent") ?? "";

  const isDataPath =
    lower === "/data" ||
    lower.startsWith("/data/") ||
    lower.endsWith(".json") ||
    lower.includes(".json/");

  if (!isDataPath) {
    return NextResponse.next();
  }

  if (/GoogleOther/i.test(ua) || /^Go-http-client\//i.test(ua) || ua.trim() === "") {
    return botBlockedResponse();
  }

  return cheapNotFound();
}

export const config = {
  matcher: ["/data/:path*", "/:path*.json"],
};
