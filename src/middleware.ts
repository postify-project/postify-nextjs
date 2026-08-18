import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Helper function to validate token against backend /profile/me endpoint
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
    return Boolean(data?.success || data?.status || data?.user || data?.data);
  } catch (error) {
    console.error("Token verification failed in middleware:", error);
    return false;
  }
}

function clearCookieResponse(response: NextResponse) {
  response.cookies.delete("token");
  response.cookies.delete("authToken");
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  response.cookies.set({
    name: "authToken",
    value: "",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const tokenCookie = request.cookies.get("token")?.value || request.cookies.get("authToken")?.value;
  const urlToken = searchParams.get("token") || searchParams.get("q");
  const isLogoutRequested = searchParams.has("logout") || searchParams.get("action") === "logout";

  // 1. If explicit logout requested, clear cookies and stay on login
  if (isLogoutRequested) {
    const response = NextResponse.next();
    return clearCookieResponse(response);
  }

  // 2. Protected routes (/dashboard/*)
  if (pathname.startsWith("/dashboard")) {
    // Case A: Token passed in URL (OAuth redirect)
    if (urlToken) {
      const isValid = await verifyTokenWithBackend(urlToken);
      if (isValid) {
        const response = NextResponse.next();
        response.cookies.set({
          name: "token",
          value: urlToken,
          httpOnly: false, // Ensure client JS can access token
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        return response;
      }
    }

    // Case B: Cookie token present
    if (tokenCookie) {
      const isValid = await verifyTokenWithBackend(tokenCookie);
      if (isValid) {
        return NextResponse.next();
      }
    }

    // Invalid/Expired or Missing Token -> Bounce to login and clear bad cookies
    const redirectResponse = NextResponse.redirect(new URL("/login?logout=true", request.url));
    return clearCookieResponse(redirectResponse);
  }

  // 3. Auth screens (/login, /signup)
  if ((pathname === "/login" || pathname === "/signup") && tokenCookie) {
    const isValid = await verifyTokenWithBackend(tokenCookie);
    if (isValid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      // Stale or invalid cookie -> clear it so user can log in
      const response = NextResponse.next();
      return clearCookieResponse(response);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
