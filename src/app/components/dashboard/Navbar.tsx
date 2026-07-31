"use client";

import React from "react";
import Link from "next/link";
import { Menu, Activity } from "lucide-react";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[52px] items-center justify-between border-b border-zinc-200/80 bg-[#FDFAFC]/80 px-4 backdrop-blur-md">
      {/* Left Section: Mobile Menu Button & Brand Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Button */}
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

      {/* Right Section: System Metrics & Profile */}
      <div className="flex items-center gap-3 font-inter">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-semibold text-emerald-700">
            System Active
          </span>
        </div>

        {/* API Usage Badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-1 text-[11px]">
          <Activity className="h-3 w-3 text-zinc-400" />
          <span className="text-zinc-500">API Usage:</span>
          <span className="font-semibold text-pink-700">98% Success</span>
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 border-l border-zinc-200/80 pl-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-xs font-bold text-[#800033] shadow-2xs">
            UR
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-zinc-800">
            Ubaid Raza
          </span>
        </div>
      </div>
    </header>
  );
}
