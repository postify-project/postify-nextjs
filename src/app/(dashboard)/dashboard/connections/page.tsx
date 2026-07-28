"use client";

import React from "react";

export default function PlatformConnectionsPage() {
  return (
    <div className="mx-auto max-w-[1200px] animate-fade-in p-6">
      {/* View Header */}
      <header className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
          Platform Connections
        </h1>
        <p className="mt-1.5 text-xs text-neutral-400">
          Manage authorizations and check rate limit quotas across your social network hubs
        </p>
      </header>

      {/* Connections Canvas Grid */}
      <section className="grid grid-cols-1 gap-[18px] lg:grid-cols-2">
        
        {/* Card 1: YouTube (Active Channel State) */}
        <div className="flex flex-col justify-between rounded-xl border border-red-500/20 bg-[#0f111a] p-[18px] shadow-xl">
          <div>
            <header className="flex items-start gap-3">
              {/* Play Avatar Wrapper */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-white font-outfit tracking-wide">
                  DEEN over DUNYA
                </h3>
                <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  YOUTUBE • CREATOR
                </span>
                {/* Active Badge */}
                <div className="mt-1 flex w-fit items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/10">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  ACTIVE
                </div>
              </div>
            </header>
          </div>

          {/* Quota Metric Console Area */}
          <div className="mt-12 flex items-center justify-between border-t border-white/[0.04] pt-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-mono tracking-wide text-neutral-400">
                API Quota: <span className="font-bold text-white">100%</span> remaining
              </p>
              <span className="text-[10px] text-neutral-500">
                Connected: 7/16/2026
              </span>
            </div>
            <button className="cursor-pointer rounded border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all duration-150 hover:bg-red-500 hover:text-white">
              Disconnect
            </button>
          </div>
        </div>

        {/* Card 2: Instagram (Offline Action State) */}
        <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-white/10 shadow-xl">
          <div>
            <header className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="rounded bg-white/[0.02] border border-white/5 px-1.5 py-0.5 text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                OFFLINE
              </span>
            </header>
            <h3 className="text-sm font-semibold text-white font-outfit">Instagram</h3>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400 max-w-[400px]">
              Share short-form videos directly to your business feed or as vertical Reels.
            </p>
          </div>
          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] py-2 text-xs font-semibold text-neutral-300 transition-all duration-150 hover:bg-white/[0.06] hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Connect Instagram
          </button>
        </div>

        {/* Card 3: TikTok (Offline Action State) */}
        <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-white/10 shadow-xl">
          <div>
            <header className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.25-.25v6.52c-.03 2.32-.93 4.67-2.75 6.13-2.18 1.82-5.46 2.1-7.95 1.07-2.62-1.03-4.59-3.7-4.63-6.58-.09-3.41 2.45-6.59 5.84-7.11.82-.14 1.66-.1 2.48.07V12c-.79-.24-1.66-.18-2.4.17-1.46.64-2.31 2.21-2.11 3.79.16 1.44 1.25 2.67 2.67 2.87 1.57.26 3.19-.71 3.58-2.22.11-.38.13-.78.12-1.18V.02z" />
                </svg>
              </div>
              <span className="rounded bg-white/[0.02] border border-white/5 px-1.5 py-0.5 text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                OFFLINE
              </span>
            </header>
            <h3 className="text-sm font-semibold text-white font-outfit">TikTok</h3>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400 max-w-[400px]">
              Distribute content to your mobile audience with comment and interaction controls.
            </p>
          </div>
          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] py-2 text-xs font-semibold text-neutral-300 transition-all duration-150 hover:bg-white/[0.06] hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Connect TikTok
          </button>
        </div>

        {/* Card 4: Facebook (Offline Action State) */}
        <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-white/10 shadow-xl">
          <div>
            <header className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="rounded bg-white/[0.02] border border-white/5 px-1.5 py-0.5 text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                OFFLINE
              </span>
            </header>
            <h3 className="text-sm font-semibold text-white font-outfit">Facebook</h3>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400 max-w-[400px]">
              Syndicate video files to page followers, reels channels, and custom feeds.
            </p>
          </div>
          <button className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] py-2 text-xs font-semibold text-neutral-300 transition-all duration-150 hover:bg-white/[0.06] hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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