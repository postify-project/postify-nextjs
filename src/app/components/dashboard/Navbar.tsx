"use client";

import React from "react";
import Link from "next/link";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[52px] items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 backdrop-blur-md">
      {/* Left Section: Mobile Menu Button & Brand Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200 lg:hidden cursor-pointer"
          aria-label="Toggle Mobile Menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-600/20">
            <span className="font-outfit text-sm font-bold text-white">P</span>
          </div>
          <span className="font-outfit text-lg font-bold tracking-tight text-white">
            Postify<span className="text-indigo-400">.</span>
          </span>
        </Link>
      </div>

      {/* Right Section: System Metrics & Profile */}
      <div className="flex items-center gap-3 font-inter">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-semibold text-emerald-400">
            System Active
          </span>
        </div>

        {/* API Usage Badge */}
        <div className="hidden sm:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px]">
          <span className="text-slate-400">API Usage:</span>
          <span className="font-semibold text-indigo-400">98% Success</span>
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900 text-xs font-bold text-indigo-400 shadow-sm">
            UR
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-300">
            Ubaid Raza
          </span>
        </div>
      </div>
    </header>
  );
}