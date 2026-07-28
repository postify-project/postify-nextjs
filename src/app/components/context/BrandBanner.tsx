"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

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
      <div className="mb-6 flex h-[72px] w-full animate-pulse items-center justify-between rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-slate-200" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-44 rounded bg-slate-200" />
            <div className="h-2.5 w-64 rounded bg-slate-100" />
          </div>
        </div>
        <div className="h-8 w-32 rounded-xl bg-slate-200" />
      </div>
    );
  }

  if (!showBanner) return null;

  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 text-slate-800 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center font-inter">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100/80 text-amber-800 font-outfit text-xs font-bold">
          !
        </div>
        <div>
          <h4 className="font-outfit text-xs font-bold text-slate-900">
            Complete Your Brand Kit
          </h4>
          <p className="mt-0.5 text-xs text-slate-600">
            Configure your account identity and niche parameters to optimize AI
            post outputs.
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/settings"
        className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-600 hover:shadow-rose-500/10 active:scale-[0.98]"
      >
        Complete Setup &rarr;
      </Link>
    </div>
  );
}
