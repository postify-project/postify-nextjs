"use client";

import React, { useState } from "react";
import BrandBanner from "@/app/components/context/BrandBanner";

export default function AnalyticsDashboardPage() {
  const [activePlatform, setActivePlatform] = useState<"youtube" | "facebook">(
    "youtube",
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="mx-auto max-w-6xl animate-fade-in font-inter text-slate-800">
      {/* Brand Alert Banner */}
      <BrandBanner />

      {/* Page Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
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
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h1 className="font-outfit text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Analytics Dashboard
            </h1>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Platform performance, engagement trends, and content insights
          </p>
        </div>

        {/* Refresh Sync Button */}
        <button
          onClick={handleRefresh}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              isRefreshing ? "animate-spin text-rose-600" : "text-slate-500"
            }
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Refresh Data
        </button>
      </header>

      {/* Platform Switcher Tabs */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-100/60 p-1 w-fit">
        <button
          onClick={() => setActivePlatform("youtube")}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
            activePlatform === "youtube"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full bg-rose-500 ${activePlatform === "youtube" ? "animate-pulse" : "hidden"}`}
          />
          YouTube
        </button>
        <button
          onClick={() => setActivePlatform("facebook")}
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 ${
            activePlatform === "facebook"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full bg-blue-500 ${activePlatform === "facebook" ? "animate-pulse" : "hidden"}`}
          />
          Facebook
        </button>
      </div>

      {/* Creator Profile Card */}
      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg shadow-xs">
              🌌
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-outfit text-base font-bold tracking-tight text-slate-900">
                  DEEN over DUNYA
                </h2>
                <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  YouTube Creator
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Last 28 days •{" "}
                <span className="text-slate-400">
                  Updated 7/16/2026, 10:48 PM
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
