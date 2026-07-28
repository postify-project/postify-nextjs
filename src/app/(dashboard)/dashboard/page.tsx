"use client";

import React, { useState } from "react";
import BrandBanner from "@/app/components/context/BrandBanner";

export default function AnalyticsDashboardPage() {
  const [activePlatform, setActivePlatform] = useState<"youtube" | "facebook">("youtube");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="mx-auto max-w-[1200px] animate-fade-in p-6">
      
      {/* 2. Add Brand Banner Alert Here */}
      <BrandBanner />

      {/* Page Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
              Analytics Dashboard
            </h1>
          </div>
          <p className="mt-1.5 text-xs text-neutral-400">
            Platform performance, engagement trends, and content insights
          </p>
        </div>

        {/* Refresh Sync Button */}
        <button
          onClick={handleRefresh}
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] px-3 py-1.75 text-xs font-semibold text-neutral-200 transition-all duration-150 select-none hover:bg-white/[0.06] hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={isRefreshing ? "animate-spin" : ""}
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Refresh YouTube
        </button>
      </header>

      {/* Platform Switcher Tabs Row */}
      <div className="mb-6 flex items-center gap-2.5">
        <button
          onClick={() => setActivePlatform("youtube")}
          className={`flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
            activePlatform === "youtube"
              ? "bg-red-500 text-white shadow-[0_2px_12px_rgba(239,68,68,0.25)]"
              : "bg-white/[0.02] text-neutral-400 border border-white/5 hover:bg-white/[0.05] hover:text-white"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full bg-white ${activePlatform === "youtube" ? "animate-pulse" : "hidden"}`} />
          YouTube
        </button>
        <button
          onClick={() => setActivePlatform("facebook")}
          className={`flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
            activePlatform === "facebook"
              ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
              : "bg-white/[0.02] text-neutral-400 border border-white/5 hover:bg-white/[0.05] hover:text-white"
          }`}
        >
          Facebook
        </button>
      </div>

      {/* Creator Profile Banner */}
      <section className="mb-5 rounded-xl border border-red-500/20 bg-[#0f111a] p-4 shadow-xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <div className="h-[46px] w-[46px] shrink-0 overflow-hidden rounded-full border border-white/10 bg-neutral-800">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-slate-700 to-indigo-900 text-base text-white">
                🌌
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-white font-outfit tracking-wide">
                  DEEN over DUNYA
                </h2>
                <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[9px] font-bold text-red-400 border border-red-500/10 uppercase tracking-wide">
                  YouTube Creator
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-neutral-400">
                Last 28 days • <span className="text-neutral-500">Updated 7/16/2026, 10:48:23 PM</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}