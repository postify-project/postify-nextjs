import Cookies from "js-cookie";
import api from "./axios";

export interface UserProfile {
  _id?: string;
  id?: string;
  name?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  profileImage?: string;
  avatar?: string;
  role?: string;
  isVerified?: boolean;
}

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Retrieves the JWT token from Cookies or localStorage.
 */
export function getToken(): string {
  if (typeof window === "undefined") return "";
  return (
    Cookies.get("token") ||
    Cookies.get("authToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    ""
  );
}

/**
 * Stores the JWT token in both Cookies (client accessible) and localStorage.
 */
export function setToken(token: string) {
  if (!token) return;
  Cookies.set("token", token, {
    expires: 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  Cookies.set("authToken", token, {
    expires: 7,
    path: "/",
    sameSite: "lax",
  });
  localStorage.setItem("token", token);
  localStorage.setItem("authToken", token);
}

/**
 * Bulletproof token deletion across cookies and localStorage.
 */
export function clearAuth() {
  Cookies.remove("token", { path: "/" });
  Cookies.remove("token");
  Cookies.remove("authToken", { path: "/" });
  Cookies.remove("authToken");

  if (typeof document !== "undefined") {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
}

/**
 * Validates current token against backend GET /profile/me endpoint.
 */
export async function verifyAuth(): Promise<UserProfile | null> {
  const token = getToken();
  if (!token) {
    clearAuth();
    return null;
  }

  try {
    const res = await api.get(`${BACKEND}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data?.success || res.data?.status) {
      const user: UserProfile = res.data.user || res.data.data;
      if (user && typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    }

    clearAuth();
    return null;
  } catch (error: unknown) {
    const errObj = error as { response?: { data?: { message?: string } }; message?: string };
    console.warn("Auth verification failed:", errObj.response?.data?.message || errObj.message);
    clearAuth();
    return null;
  }
}

/**
 * Performs a complete logout via server API route /api/auth/logout, invalidating session in MongoDB and deleting cookies.
 */
export async function performLogout(allDevices: boolean = false): Promise<boolean> {
  try {
    const token = getToken();
    // 1. Call Next.js server route /api/auth/logout which clears cookies on server response
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ allDevices }),
    });
  } catch (err: unknown) {
    console.warn("Logout request error:", err);
  } finally {
    // 2. Clear client storage
    clearAuth();

    // 3. Force page navigation to /login?logout=true so middleware processes cookie clearing
    if (typeof window !== "undefined") {
      window.location.href = "/login?logout=true";
    }
  }
  return true;
}
