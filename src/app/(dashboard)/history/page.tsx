"use client";

import React, { useState } from "react";

export default function UploadHistoryPage() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col p-6 animate-fade-in">
      {/* Page Header */}
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
            Distribution Logs
          </h1>
          <p className="mt-1.5 text-xs text-neutral-400">
            Monitor live upload transfers, review history, and inspect console event traces
          </p>
        </div>

        {/* Refresh Action Trigger */}
        <button
          onClick={handleRefresh}
          className="flex cursor-pointer items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] px-3 py-1.75 text-xs font-semibold text-neutral-200 transition-all duration-150 select-none hover:bg-white/[0.06] hover:text-white active:scale-98"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isRefreshing ? "animate-spin" : ""}
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Refresh
        </button>
      </header>

      {/* Main Content Area: Centered Empty State Canvas */}
      <section className="flex min-h-[50vh] w-full flex-col items-center justify-center rounded-xl border border-white/[0.02] bg-[#090a0f]/20 p-8 text-center">
        {/* Dynamic History Clock Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 text-neutral-500 shadow-inner">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z" className="opacity-10" />
          </svg>
        </div>

        {/* Messaging Logs */}
        <h3 className="mt-5 text-sm font-semibold text-white font-outfit tracking-wide">
          No Distribution History
        </h3>
        <p className="mt-2 max-w-[340px] text-xs leading-relaxed text-neutral-500">
          Upload records will appear here once you distribute video content to your connected platforms.
        </p>
      </section>
    </div>
  );
}