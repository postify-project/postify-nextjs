import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 1. If trying to access dashboard/protected routes without a token, bounce to login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If already logged in with token, skip landing authentication screens completely
  if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Limit the paths this middleware runs on
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
