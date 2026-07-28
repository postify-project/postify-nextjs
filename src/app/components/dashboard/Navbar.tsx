import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-100 flex h-[52px] items-center justify-between border-b border-[rgba(255,255,255,0.08)] bg-[#0e1017] px-[18px] backdrop-blur-[12px] -webkit-backdrop-blur-[12px]">
      {/* Left section */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad)" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818cf8"/>
                  <stop offset="1" stopColor="#4f46e5"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-outfit text-[17px] font-bold tracking-[-0.5px] text-[#f3f4f6]">
            Viral<span className="text-[#5850ec]">Sync</span>
          </span>
        </Link>
      </div>
      
      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-1.25 border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] px-2.5 py-1 rounded-[20px]">
          <span className="h-1.25 w-1.25 animate-pulse rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-medium text-[#10b981]">System Active</span>
        </div>

        {/* Credits Badge */}
        <div className="hidden sm:flex gap-0.75 border border-[rgba(255,255,255,0.08)] bg-white/[0.03] px-2.5 py-1 text-[11px] rounded-[20px]">
          <span className="text-[#8e94a5]">API Usage:</span>
          <span className="font-semibold text-[#f3f4f6]">98% Success</span>
        </div>

        {/* User Profile Container */}
        <div className="flex items-center gap-2 border-l border-[rgba(255,255,255,0.08)] pl-2">
          <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#5850ec] to-[#10b981] text-[11px] font-bold text-white">
            UR
          </div>
          <span className="hidden sm:inline text-xs font-medium text-[#8e94a5]">Ubaid Raza</span>
        </div>
      </div>
    </header>
  );
}