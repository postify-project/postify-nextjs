import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token")?.value;
  const { pathname, searchParams } = request.nextUrl;

  // Check if incoming URL carries either 'token' or 'q' in the query parameters
  const hasTokenQuery = searchParams.has("token") || searchParams.has("q");

  // 1. If trying to access dashboard/protected routes without a cookie OR a query token, bounce to login
  if (pathname.startsWith("/dashboard") && !tokenCookie && !hasTokenQuery) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If already logged in with cookie, skip auth screens completely
  if ((pathname === "/login" || pathname === "/signup") && tokenCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};