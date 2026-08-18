"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { performLogout } from "@/lib/auth";
import { LogOut, ShieldAlert } from "lucide-react";

export default function LogoutButtons() {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState<"single" | "all" | null>(null);
  const [err, setErr] = useState<string>("");

  const handleLogoutAction = async (isLogoutAll: boolean = false) => {
    setErr("");
    const type = isLogoutAll ? "all" : "single";
    setLoadingType(type);

    try {
      // Calls backend API (GET/POST /auth/logout or /auth/logout-all) to clear session from MongoDB
      // and wipes cookies + localStorage on client
      await performLogout(isLogoutAll);
      router.push("/login");
    } catch (error: unknown) {
      setErr((error as Error).message || "Logout failed");
    } finally {
      setLoadingType(null);
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
        onClick={() => handleLogoutAction(false)}
        disabled={loadingType !== null}
        className="w-full bg-[#1E293B] hover:bg-[#334155] text-white font-medium py-2.5 px-4 rounded-xl text-sm border border-[#334155]/50 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
      >
        {loadingType === "single" ? (
          <span>Logging out...</span>
        ) : (
          <>
            <LogOut className="w-4 h-4 text-slate-300" />
            <span>Logout Current Session</span>
          </>
        )}
      </button>

      {/* Logout All Devices Button */}
      <button
        onClick={() => handleLogoutAction(true)}
        disabled={loadingType !== null}
        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium py-2.5 px-4 rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loadingType === "all" ? (
          <span>Logging out all devices...</span>
        ) : (
          <>
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Logout From All Devices</span>
          </>
        )}
      </button>
    </div>
  );
}