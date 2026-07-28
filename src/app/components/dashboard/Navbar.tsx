"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[52px] items-center justify-between border-b border-pink-100 bg-white/90 px-4 backdrop-blur-md">
      {/* Left Section: Brand Logo */}
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500 to-rose-500 shadow-md shadow-pink-500/20">
            <span className="font-outfit text-sm font-bold text-white">P</span>
          </div>
          <span className="font-outfit text-lg font-bold tracking-tight text-slate-900">
            Postify<span className="text-pink-500">.</span>
          </span>
        </Link>
      </div>

      {/* Right Section: System Metrics & Profile */}
      <div className="flex items-center gap-3 font-inter">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-semibold text-emerald-700">
            System Active
          </span>
        </div>

        {/* API Usage Badge */}
        <div className="hidden sm:flex items-center gap-1 rounded-full border border-pink-100 bg-pink-50/50 px-3 py-1 text-[11px]">
          <span className="text-slate-500">API Usage:</span>
          <span className="font-semibold text-pink-600">98% Success</span>
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-pink-200 bg-gradient-to-tr from-pink-500 to-rose-500 text-xs font-bold text-white shadow-sm shadow-pink-500/20">
            UR
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-700">
            Ubaid Raza
          </span>
        </div>
      </div>
    </header>
  );
}
