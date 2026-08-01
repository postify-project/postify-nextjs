import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL;

// Helper function to validate token against your backend /profile/me endpoint
async function verifyTokenWithBackend(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND}/profile/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return false;

    const data = await res.json();
    return Boolean(data?.success);
  } catch (error) {
    console.error("Token verification failed in middleware:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token")?.value;
  const { pathname, searchParams } = request.nextUrl;

  const urlToken = searchParams.get("token") || searchParams.get("q");

  // 1. Protected routes handling
  if (pathname.startsWith("/dashboard")) {
    // Case A: User has a cookie token (already logged in)
    if (tokenCookie) {
      return NextResponse.next();
    }

    // Case B: User has no cookie, but passed a query token in URL
    if (urlToken) {
      const isValid = await verifyTokenWithBackend(urlToken);

      if (isValid) {
        // Clean URL parameter
        const cleanUrl = new URL(pathname, request.url);
        const response = NextResponse.redirect(cleanUrl);

        // Set cookie matching js-cookie settings (expires in 7 days, path '/', sameSite 'lax')
        response.cookies.set({
          name: "token",
          value: urlToken,
          path: "/",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days (matches `expires: 7`)
          // httpOnly is intentionally omitted so js-cookie / client JS can access and clear it
        });

        return response;
      }
    }

    // Case C: Neither valid cookie nor valid URL token exists -> Bounce to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Auth screens handling (Skip login/signup if already authenticated via cookie)
  if ((pathname === "/login" || pathname === "/signup") && tokenCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};