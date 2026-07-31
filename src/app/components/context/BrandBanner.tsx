"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BrandBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkBrandKitStatus = () => {
      const isSkipped = localStorage.getItem("postify_onboarding_skipped");
      const hasBrandKit = localStorage.getItem("postify_brand_kit");

      if (isSkipped === "true" || !hasBrandKit) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
      setIsChecking(false);
    };

    checkBrandKitStatus();

    window.addEventListener("storage", checkBrandKitStatus);
    return () => window.removeEventListener("storage", checkBrandKitStatus);
  }, []);

  if (isChecking) {
    return (
      <div className="mb-6 flex h-[72px] w-full animate-pulse items-center justify-between rounded-2xl border border-zinc-200/60 bg-zinc-50/50 px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-zinc-200/70" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-40 rounded bg-zinc-200/70" />
            <div className="h-2.5 w-60 rounded bg-zinc-100" />
          </div>
        </div>
        <div className="h-8 w-32 rounded-xl bg-zinc-200/70" />
      </div>
    );
  }

  if (!showBanner) return null;

  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-pink-200/80 bg-gradient-to-r from-pink-50/70 via-[#FDFAFC] to-pink-50/40 px-4 py-3.5 text-zinc-800 shadow-2xs backdrop-blur-md sm:flex-row sm:items-center">
      <div className="flex items-center gap-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-pink-200/60 bg-white text-pink-700 shadow-2xs">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h4 className="font-outfit text-xs font-bold text-zinc-900 tracking-tight">
            Complete Your Brand Kit
          </h4>
          <p className="mt-0.5 text-xs text-zinc-600 leading-snug">
            Configure your brand identity and niche parameters to generate higher quality AI posts.
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/settings"
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#800033] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#660029] hover:shadow-pink-900/10 active:scale-[0.98]"
      >
        <span>Complete Setup</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}