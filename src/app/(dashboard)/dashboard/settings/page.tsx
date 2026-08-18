"use client";

import React, { useState, useEffect } from "react";
import BrandKitSection from "@/app/components/context/brandKitSection";
import LogoutButtons from "@/app/components/auth/LogoutButtons";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { Zap, Sliders, ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";

interface ConfigState {
  simultaneousUploads: string;
  bandwidthThrottle: number;
  enableSandbox: boolean;
  autoLock: boolean;
  inactivityLimit: number;
  consolePin: string;
}

// Subcomponent: Light Mode Auto-Reply Console
function AutoReplyConsole() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin", "facebook"]);
  const [saving, setSaving] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const res = await api.get(`${BACKEND}/profile/me`);
          const user = res.data?.user || res.data?.data;
          if (user?.autoReply) {
            setEnabled(user.autoReply.enabled ?? false);
            if (Array.isArray(user.autoReply.platforms)) {
              setSelectedPlatforms(user.autoReply.platforms);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to load auto-reply settings:", err);
      }
    };
    fetchSettings();
  }, [BACKEND]);

  const togglePlatform = (plat: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  const handleSaveAutoReply = async () => {
    setSaving(true);
    setMsg("");
    try {
      const token = Cookies.get("token");
      const res = await api.put(
        `${BACKEND}/profile/auto-reply`,
        { enabled, platforms: selectedPlatforms },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success || res.data?.status) {
        setMsg("Auto-reply settings saved successfully!");
      }
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      setMsg(errObj.response?.data?.message || errObj.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
      <header className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Zap className="h-4 w-4 text-rose-600" />
        <h3 className="font-outfit text-sm font-bold text-slate-900">
          AI Comment Auto-Reply Console (10 Min Cron)
        </h3>
      </header>

      {msg && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <label className="text-xs font-bold text-slate-900">Enable Automated Comment Replies</label>
          <p className="text-xs text-slate-500 mt-0.5 max-w-md">
            Cron background worker checks new comments every 10 mins across your accounts and posts AI replies.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
            enabled ? "bg-rose-600" : "bg-slate-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Active Auto-Reply Platforms
        </label>
        <div className="flex flex-wrap gap-2.5">
          {["linkedin", "facebook", "instagram", "youtube"].map((plat) => {
            const isSelected = selectedPlatforms.includes(plat);
            return (
              <button
                key={plat}
                type="button"
                onClick={() => togglePlatform(plat)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isSelected
                    ? "border-rose-500 bg-rose-50 text-rose-700 ring-1 ring-rose-500"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{plat}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleSaveAutoReply}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-rose-500 cursor-pointer disabled:opacity-50"
        >
          {saving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : null}
          <span>{saving ? "Saving Rules..." : "Save Auto-Reply Settings"}</span>
        </button>
      </div>
    </section>
  );
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
      alert("System configurations updated!");
    }, 800);
  };

  return (
    <div className="mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Header */}
      <header className="mb-6 border-b border-slate-200/80 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
          Settings Console
        </div>
        <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Configuration & Preferences
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Manage brand kit parameters, AI comment auto-reply rules, session management, and system limits.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* 1. Brand Kit Section */}
        <BrandKitSection />

        {/* 2. AI Auto-Reply Console */}
        <AutoReplyConsole />

        {/* 3. System Preferences Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* UPLOAD QUEUE ENGINE */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <header className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="h-4 w-4 text-slate-700" />
              <h3 className="font-outfit text-sm font-bold text-slate-900">
                Upload Queue Engine
              </h3>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Simultaneous Uploads
                </label>
                <select
                  name="simultaneousUploads"
                  value={config.simultaneousUploads}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 outline-none focus:border-rose-500"
                >
                  <option>1 Platform (Sequential)</option>
                  <option>2 Platforms (Balanced)</option>
                  <option>4 Platforms (Aggressive)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Bandwidth Throttle (MB/S)
                </label>
                <input
                  type="number"
                  name="bandwidthThrottle"
                  value={config.bandwidthThrottle}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 outline-none focus:border-rose-500"
                />
                <span className="text-[10px] text-slate-400">
                  Limit video transfer speeds (0 for max speed).
                </span>
              </div>
            </div>
          </section>

          {/* SESSION & DEVICE MANAGEMENT */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <header className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="h-4 w-4 text-slate-700" />
              <h3 className="font-outfit text-sm font-bold text-slate-900">
                Session & Device Management
              </h3>
            </header>

            <p className="text-xs text-slate-500">
              Logout your active browser session or revoke all active device tokens across all hardware instantly.
            </p>

            <LogoutButtons />
          </section>
        </form>
      </div>
    </div>
  );
}