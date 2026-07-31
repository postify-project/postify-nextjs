"use client";

import React from "react";

export default function PlatformConnectionsPage() {
  return (
    <div className="relative mx-auto max-w-[1200px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-rose-400/5 blur-[100px]" />

      {/* View Header */}
      <header className="relative mb-8 border-b border-slate-200/80 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
          Integrations Hub
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-outfit sm:text-3xl">
          Platform Connections
        </h1>
        <p className="mt-1 text-xs text-slate-500 max-w-xl leading-relaxed">
          Manage authorizations and check rate limit quotas across your social
          network hubs seamlessly from one dashboard.
        </p>
      </header>

      {/* Connections Canvas Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: YouTube (Active Channel State) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rose-200/80 bg-white p-6 shadow-xl shadow-rose-500/5 transition-all duration-300 hover:border-rose-300 hover:shadow-2xl hover:-translate-y-1">
          {/* Subtle Accent Glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-500/5 blur-2xl transition-all duration-300 group-hover:bg-rose-500/10" />

          <div>
            <header className="flex items-start gap-4">
              {/* Play Avatar Wrapper */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-slate-900 font-outfit tracking-tight">
                  DEEN over DUNYA
                </h3>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  YOUTUBE • CREATOR
                </span>
                {/* Active Badge */}
                <div className="mt-1 flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  ACTIVE
                </div>
              </div>
            </header>
          </div>

          {/* Quota Metric Console Area */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-medium text-slate-700">
                API Quota:{" "}
                <span className="font-bold text-emerald-600">100%</span>{" "}
                remaining
              </p>
              <span className="text-[11px] text-slate-400">
                Connected: 7/16/2026
              </span>
            </div>
            <button className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95">
              Disconnect
            </button>
          </div>
        </div>

        {/* Card 2: Instagram (Offline Action State) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl transition-all duration-300 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-1">
          <div>
            <header className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-200 bg-pink-50 text-pink-600 shadow-sm">
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OFFLINE
              </span>
            </header>
            <h3 className="text-base font-bold text-slate-900 font-outfit">
              Instagram
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 max-w-[400px]">
              Share short-form videos directly to your business feed or as
              vertical Reels.
            </p>
          </div>
          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Connect Instagram
          </button>
        </div>

        {/* Card 3: TikTok (Offline Action State) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl transition-all duration-300 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-1">
          <div>
            <header className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-slate-900 text-white shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.25-.25v6.52c-.03 2.32-.93 4.67-2.75 6.13-2.18 1.82-5.46 2.1-7.95 1.07-2.62-1.03-4.59-3.7-4.63-6.58-.09-3.41 2.45-6.59 5.84-7.11.82-.14 1.66-.1 2.48.07V12c-.79-.24-1.66-.18-2.4.17-1.46.64-2.31 2.21-2.11 3.79.16 1.44 1.25 2.67 2.67 2.87 1.57.26 3.19-.71 3.58-2.22.11-.38.13-.78.12-1.18V.02z" />
                </svg>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OFFLINE
              </span>
            </header>
            <h3 className="text-base font-bold text-slate-900 font-outfit">
              TikTok
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 max-w-[400px]">
              Distribute content to your mobile audience with comment and
              interaction controls.
            </p>
          </div>
          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Connect TikTok
          </button>
        </div>

        {/* Card 4: Facebook (Offline Action State) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl transition-all duration-300 hover:border-slate-300 hover:shadow-2xl hover:-translate-y-1">
          <div>
            <header className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                OFFLINE
              </span>
            </header>
            <h3 className="text-base font-bold text-slate-900 font-outfit">
              Facebook
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 max-w-[400px]">
              Syndicate video files to page followers, reels channels, and
              custom feeds.
            </p>
          </div>
          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Connect Facebook
          </button>
        </div>
      </section>
    </div>
  );
}
