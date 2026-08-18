"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, ShieldCheck } from "lucide-react";
import { verifyAuth, UserProfile } from "@/lib/auth";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userInitials, setUserInitials] = useState<string>("US");
  const [isSystemHealthy, setIsSystemHealthy] = useState<boolean>(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const liveUser = await verifyAuth();
      if (!liveUser) {
        // Token invalid or expired -> Bounce to login
        router.push("/login");
        return;
      }

      setUser(liveUser);
      const name = liveUser.name || liveUser.fullName || liveUser.email?.split("@")[0] || "User";
      const parts = name.trim().split(" ");
      const initials = parts.length > 1
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();
      setUserInitials(initials);
    };

    const checkSystemHealth = async () => {
      try {
        const healthUrl = process.env.NEXT_PUBLIC_API_URL
          ? process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "/health")
          : "http://localhost:5000/health";
        const res = await fetch(healthUrl);
        setIsSystemHealthy(res.ok);
      } catch {
        setIsSystemHealthy(false);
      }
    };

    authenticateUser();
    checkSystemHealth();
  }, [router]);

  const userName = user?.name || user?.fullName || user?.email?.split("@")[0] || "User";
  const profileImage = user?.profileImage || user?.avatar || null;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[52px] items-center justify-between border-b border-zinc-200/80 bg-[#FDFAFC]/80 px-4 backdrop-blur-md">
      {/* Left Section: Mobile Menu Button & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 lg:hidden cursor-pointer shadow-2xs"
          aria-label="Toggle Mobile Menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#800033] shadow-xs">
            <span className="font-outfit text-sm font-bold text-white">P</span>
          </div>
          <span className="font-outfit text-lg font-bold tracking-tight text-zinc-900">
            Postify<span className="text-pink-600">.</span>
          </span>
        </Link>
      </div>

      {/* Right Section: System Metrics & User Profile */}
      <div className="flex items-center gap-3 font-inter">
        {/* Live Backend Health Status Badge */}
        {isSystemHealthy ? (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-[11px] font-semibold text-emerald-700">
              System Operational
            </span>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[11px] font-semibold text-amber-700">
              Offline / Reconnecting
            </span>
          </div>
        )}

        {/* User Role Badge */}
        {user?.role && (
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[10px] font-bold text-pink-700 uppercase">
            <ShieldCheck className="h-3 w-3 text-pink-600" />
            <span>{user.role}</span>
          </div>
        )}

        {/* User Profile Avatar & Name */}
        <div className="flex items-center gap-2.5 border-l border-zinc-200/80 pl-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt={userName}
              className="h-7 w-7 rounded-full object-cover border border-pink-200 shadow-2xs"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-xs font-bold text-[#800033] shadow-2xs">
              {userInitials}
            </div>
          )}

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-semibold text-zinc-800">{userName}</span>
            {user?.email && (
              <span className="text-[10px] text-zinc-400 max-w-[120px] truncate">
                {user.email}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
