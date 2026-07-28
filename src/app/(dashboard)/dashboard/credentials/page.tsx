"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Save,
  Loader2,
  DollarSign,
  Youtube,
  Facebook,
  Music,
  BrainCircuit,
} from "lucide-react";

export default function CredentialsPage() {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="relative mx-auto max-w-screen-2xl animate-fade-in p-6 font-inter text-[#f3f4f6]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-[#0c1410] px-5 py-3 text-xs font-semibold text-emerald-400 shadow-xl animate-slide-up backdrop-blur-md">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <span>API Credentials saved successfully!</span>
        </div>
      )}

      {/* Page Header */}
      <header className="mb-8 flex flex-col justify-between gap-5 border-b border-[#1f2430] pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-white md:text-3xl">
            API Credentials <span className="text-[#818cf8]">Management</span>
          </h1>
          <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-400">
            Set up and manage your secure keys for integration across YouTube,
            Facebook, TikTok, and Gemini AI endpoints.
          </p>
        </div>
        <button
          className={`group flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-xs font-bold transition-all duration-200 select-none ${
            isSaving
              ? "bg-[#1f2430] text-slate-500 cursor-not-allowed opacity-70"
              : "bg-[#5850ec] text-white hover:bg-[#4f46e5] active:scale-[0.98] shadow-lg shadow-[#5850ec]/20"
          }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white/60" />
              Saving Keys...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Credentials
            </>
          )}
        </button>
      </header>

      {/* Grid Canvas */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          {
            name: "YouTube Data API v3",
            icon: Youtube,
            iconBg: "red-500/10",
            iconColor: "red-500",
            fields: ["Client ID", "Client Secret"],
            placeholders: ["Enter YouTube Client ID", "Client Secret"],
          },
          {
            name: "Facebook & Instagram Graph",
            icon: Facebook,
            iconBg: "blue-500/10",
            iconColor: "blue-500",
            fields: ["App ID (Client ID)", "App Secret"],
            placeholders: ["Enter Facebook App ID", "App Secret"],
          },
          {
            name: "TikTok Content API",
            icon: Music,
            iconBg: "cyan-500/10",
            iconColor: "cyan-500",
            fields: ["Client Key", "Client Secret"],
            placeholders: ["Enter TikTok Client Key", "Client Secret"],
          },
          {
            name: "Google Gemini AI",
            icon: BrainCircuit,
            iconBg: "violet-500/10",
            iconColor: "violet-500",
            special: true,
            fields: ["API Key"],
            placeholders: ["AI Studio Key (AIzaSy...)"],
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.name}
              className="group rounded-2xl border border-[#1f2430] bg-[#111623] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <header className="mb-6 flex items-center gap-3.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg bg-${card.iconBg} text-${card.iconColor} border border-${card.iconColor}/20`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-outfit text-base font-semibold text-white tracking-wide">
                  {card.name}
                </h3>
              </header>
              <div className="space-y-4">
                {card.fields.map((field, index) => (
                  <div key={field} className="space-y-1.5">
                    <label className="font-outfit text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      {field}
                    </label>
                    <input
                      type={
                        field.includes("Secret") ||
                        card.name === "Google Gemini AI"
                          ? "password"
                          : "text"
                      }
                      placeholder={card.placeholders[index]}
                      defaultValue={
                        field.includes("Secret") ||
                        card.name === "Google Gemini AI"
                          ? "mock_secret_key"
                          : card.placeholders[index]
                      }
                      className="w-full rounded-lg border border-[#1f2430] bg-[#090a0f] px-4 py-2.5 text-xs text-white placeholder-slate-600 transition-colors focus:border-violet-500/30 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                    />
                  </div>
                ))}
                {card.special && (
                  <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
                    Required for generating video scripts, translating content,
                    and creating tailored Social Post AI generations.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
