"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BrandBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkBrandKitStatus = () => {
      const isSkipped = localStorage.getItem("postify_onboarding_skipped");
      const hasBrandKit = localStorage.getItem("postify_brand_kit");

      if (isSkipped === "true" || !hasBrandKit) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    checkBrandKitStatus();

    // Listen for storage changes if brand kit gets updated elsewhere
    window.addEventListener("storage", checkBrandKitStatus);
    return () => window.removeEventListener("storage", checkBrandKitStatus);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-200 sm:flex-row shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-xl border border-amber-500/30">
          ⚠️
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-300">Complete Your Brand Kit</h4>
          <p className="text-xs text-amber-200/80 mt-0.5">
            Configure your brand identity, logo, colors, and niche parameters to enable custom AI post generation.
          </p>
        </div>
      </div>

      <Link
        href="/settings"
        className="shrink-0 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] shadow-md"
      >
        Complete in Settings &rarr;
      </Link>
    </div>
  );
}