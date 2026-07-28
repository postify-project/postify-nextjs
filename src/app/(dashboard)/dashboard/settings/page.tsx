"use client";

import React, { useState } from "react";
import BrandKitSection from "@/app/components/context/brandKitSection"; // <-- 1. Import BrandKitSection

interface ConfigState {
  simultaneousUploads: string;
  bandwidthThrottle: number;
  enableSandbox: boolean;
  autoLock: boolean;
  inactivityLimit: number;
  consolePin: string;
}

export default function ConfigurationPage() {
  const [config, setConfig] = useState<ConfigState>({
    simultaneousUploads: "2 Platforms (Balanced)",
    bandwidthThrottle: 0,
    enableSandbox: false,
    autoLock: false,
    inactivityLimit: 10,
    consolePin: "0000",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setConfig((prev) => ({ ...prev, [name]: checked }));
    } else {
      setConfig((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleToggle = (name: keyof ConfigState) => {
    setConfig((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      alert("Configurations successfully saved!");
    }, 800);
  };

  return (
    <div className="w-full text-white antialiased p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white font-outfit">
          Configuration & Settings
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Fine-tune system variables, credentials mode, throttle bounds, and brand profile
        </p>
      </header>

      <div className="flex flex-col gap-6 max-w-[760px]">
        {/* 2. Brand Kit Section (Scraper & Assets) */}
        <BrandKitSection />

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
          {/* 1. UPLOAD QUEUE ENGINE */}
          <section className="rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-xl">
            <header className="mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
              <svg className="text-neutral-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <h3 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                Upload Queue Engine
              </h3>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  Simultaneous Uploads
                </label>
                <select
                  name="simultaneousUploads"
                  value={config.simultaneousUploads}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-3 text-xs text-white outline-none cursor-pointer focus:border-purple-500/50"
                >
                  <option>1 Platform (Sequential)</option>
                  <option>2 Platforms (Balanced)</option>
                  <option>4 Platforms (Aggressive)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  Bandwidth Throttle (MB/S)
                </label>
                <input
                  type="number"
                  name="bandwidthThrottle"
                  value={config.bandwidthThrottle}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-3 text-xs text-white outline-none focus:border-purple-500/50"
                />
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  Limit video binary transfer speeds. Keep at 0 for maximum speed.
                </span>
              </div>
            </div>
          </section>

          {/* 2. SANDBOX TESTING */}
          <section className="rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-xl">
            <header className="mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
              <svg className="text-neutral-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
              </svg>
              <h3 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                Sandbox Testing
              </h3>
            </header>

            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-white">
                  Enable Sandbox Simulator
                </label>
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  If enabled, ViralSync Pro bypasses real OAuth calls and mimics video uploads using local timers. Connect fake accounts instantly for demo evaluation.
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => handleToggle("enableSandbox")}
                className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none ${
                  config.enableSandbox ? "bg-purple-600" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    config.enableSandbox ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* 3. CONSOLE SECURITY */}
          <section className="rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-xl">
            <header className="mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
              <svg className="text-neutral-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <h3 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                Console Security
              </h3>
            </header>

            <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-5 mb-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-white">
                  Auto-Lock on Inactivity
                </label>
                <p className="text-[11px] text-neutral-400">
                  Lock the application dashboard automatically when mouse/keyboard action freezes.
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => handleToggle("autoLock")}
                className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none ${
                  config.autoLock ? "bg-purple-600" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    config.autoLock ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  Inactivity Limit (Minutes)
                </label>
                <input
                  type="number"
                  name="inactivityLimit"
                  value={config.inactivityLimit}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-3 text-xs text-white outline-none focus:border-purple-500/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  Console Pin
                </label>
                <input
                  type="text"
                  name="consolePin"
                  maxLength={4}
                  value={config.consolePin}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-3 text-xs text-white tracking-[0.25em] font-mono outline-none focus:border-purple-500/50"
                />
              </div>
            </div>
          </section>

          {/* Global Action CTA Button Container */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-2.5 text-xs font-bold text-white transition-all duration-150 select-none shadow-[0_4px_20px_rgba(147,51,234,0.25)] hover:bg-purple-500 hover:shadow-[0_4px_24px_rgba(147,51,234,0.4)] disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {isSaving ? "Saving..." : "Save Configurations"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}