"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/axios";

export default function LogoutButtons() {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState<"single" | "all" | null>(null);
  const [err, setErr] = useState("");

  const BACKEND = process.env.NEXT_PUBLIC_API_URL;

  const handleLogout = async (isLogoutAll: boolean = false) => {
    setErr("");
    const type = isLogoutAll ? "all" : "single";
    setLoadingType(type);

    const token = Cookies.get("token");

    const endpoint = isLogoutAll
      ? `${BACKEND}/auth/logout-all`
      : `${BACKEND}/auth/logout`;

    try {
      if (token) {
        // Send Authorization header with Bearer token
        await api.post(
          endpoint,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error: any) {
      console.warn("Logout endpoint error:", error.response?.data || error.message);
      // We still clear local state so the user isn't stuck logged in on the client side
    } finally {
      // Clear token from cookies & user data from localStorage
      Cookies.remove("token");
      localStorage.removeItem("user");

      setLoadingType(null);

      // Redirect back to login page
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-2">
          {err}
        </div>
      )}

      {/* Logout Current Session Button */}
      <button
        onClick={() => handleLogout(false)}
        disabled={loadingType !== null}
        className="w-full bg-[#1E293B] hover:bg-[#334155] text-white font-medium py-2.5 px-4 rounded-xl text-sm border border-[#334155]/50 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {loadingType === "single" ? (
          "Logging out..."
        ) : (
          <>
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </>
        )}
      </button>

      {/* Logout All Devices Button */}
      <button
        onClick={() => handleLogout(true)}
        disabled={loadingType !== null}
        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium py-2.5 px-4 rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loadingType === "all" ? (
          "Logging out all devices..."
        ) : (
          <>
            <svg
              className="w-4 h-4 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Logout From All Devices
          </>
        )}
      </button>
    </div>
  );
}