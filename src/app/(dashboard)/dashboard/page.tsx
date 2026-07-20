"use client";

import React, { useState } from "react";

export default function AnalyticsDashboardPage() {
  const [activePlatform, setActivePlatform] = useState<"youtube" | "facebook">("youtube");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="mx-auto max-w-[1200px] animate-fade-in p-6">
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
            {/* Creator Avatar Framework Mock */}
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

          {/* Core Subscriber Metric Counter */}
          <div className="flex flex-col items-start sm:items-end pr-2">
            <span className="text-2xl font-bold font-outfit tracking-tight text-red-400 leading-none">
              17
            </span>
            <span className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase mt-1">
              Subscribers
            </span>
          </div>
        </div>
      </section>

      {/* Core Analytic Metric Highlight Grid */}
      <section className="mb-6 grid grid-cols-2 gap-3.5 md:grid-cols-5">
        {/* Metric Card 1 */}
        <div className="rounded-lg border border-white/5 bg-[#0f111a] p-3.5 shadow-md">
          <span className="text-red-400 text-xs">👁</span>
          <h4 className="mt-2 text-2xl font-bold font-outfit text-white leading-none">0</h4>
          <p className="mt-1.5 text-[9px] font-bold tracking-wider text-neutral-500 uppercase">Total Views</p>
        </div>

        {/* Metric Card 2 */}
        <div className="rounded-lg border border-white/5 bg-[#0f111a] p-3.5 shadow-md">
          <span className="text-red-400 text-xs">🕒</span>
          <h4 className="mt-2 text-2xl font-bold font-outfit text-white leading-none">0</h4>
          <p className="mt-1.5 text-[9px] font-bold tracking-wider text-neutral-500 uppercase">Watch Time (Min)</p>
        </div>

        {/* Metric Card 3 */}
        <div className="rounded-lg border border-white/5 bg-[#0f111a] p-3.5 shadow-md">
          <span className="text-red-400 text-xs">👍</span>
          <h4 className="mt-2 text-2xl font-bold font-outfit text-white leading-none">0</h4>
          <p className="mt-1.5 text-[9px] font-bold tracking-wider text-neutral-500 uppercase">Total Likes</p>
        </div>

        {/* Metric Card 4 */}
        <div className="rounded-lg border border-white/5 bg-[#0f111a] p-3.5 shadow-md">
          <span className="text-red-400 text-xs">👤</span>
          <h4 className="mt-2 text-2xl font-bold font-outfit text-white leading-none">0</h4>
          <p className="mt-1.5 text-[9px] font-bold tracking-wider text-neutral-500 uppercase">Subscribers Gained</p>
        </div>

        {/* Metric Card 5 */}
        <div className="rounded-lg border border-white/5 bg-[#0f111a] p-3.5 shadow-md">
          <span className="text-red-400 text-xs">📹</span>
          <h4 className="mt-2 text-2xl font-bold font-outfit text-white leading-none">1</h4>
          <p className="mt-1.5 text-[9px] font-bold tracking-wider text-neutral-500 uppercase">Videos (Period)</p>
        </div>
      </section>

      {/* Performance Trends Section Wrapper */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
          <span>📉</span>
          <h3>Performance Trends (28 Days)</h3>
        </div>

        {/* Graphic Canvas Box Container Mock */}
        <div className="w-full max-w-[650px] rounded-xl border border-white/5 bg-[#0f111a] p-4 shadow-xl">
          <h4 className="text-xs font-semibold text-white font-outfit">Total Views</h4>
          
          {/* Simple Vector Mock Graph Canvas */}
          <div className="relative mt-6 h-[180px] w-full border-b border-l border-white/5 px-2">
            {/* Horizonal Chart Grid lines lines help view depth mapping */}
            <div className="absolute top-0 right-0 left-0 border-t border-white/[0.02] text-[10px] font-mono text-neutral-600 pt-0.5">1</div>
            <div className="absolute top-[25%] right-0 left-0 border-t border-white/[0.02] text-[10px] font-mono text-neutral-600 pt-0.5">0.8</div>
            <div className="absolute top-[50%] right-0 left-0 border-t border-white/[0.02] text-[10px] font-mono text-neutral-600 pt-0.5">0.6</div>
            <div className="absolute top-[75%] right-0 left-0 border-t border-white/[0.02] text-[10px] font-mono text-neutral-600 pt-0.5">0.4</div>
            <div className="absolute bottom-0 right-0 left-0 text-[10px] font-mono text-neutral-600 pb-0.5">0</div>

            {/* Red Linear Static Floor Line mimicking view states */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-red-500/80" />
            
            {/* Data Node Point Markers Layout Row */}
            <div className="absolute bottom-[-3px] left-0 flex w-full justify-between px-4">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full border border-red-500 bg-[#0f111a]" />
              ))}
            </div>
          </div>

          {/* Time axis text mappings footer layout line */}
          <div className="mt-2.5 flex justify-between px-2 text-[9px] font-mono text-neutral-500">
            <span>Jun 19</span>
            <span>Jun 23</span>
            <span>Jun 27</span>
            <span>Jul 1</span>
            <span>Jul 5</span>
            <span>Jul 9</span>
            <span>Jul 13</span>
          </div>
        </div>
      </section>
    </div>
  );
}