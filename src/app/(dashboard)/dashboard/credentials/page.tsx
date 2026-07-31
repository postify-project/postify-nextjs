"use client";

import React, { useState } from "react";

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
    <div className="relative mx-auto max-w-4xl px-4 py-8 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      {/* Toast Notification - Light theme styled */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-xl animate-[slide-up_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <div className="flex shrink-0 items-center justify-center text-emerald-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <span>Configuration saved successfully!</span>
        </div>
      )}

      {/* Page Header */}
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            API Credentials <span className="text-rose-600">Setup</span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Securely manage your integrated service keys for YouTube, Facebook,
            TikTok, and Gemini.
          </p>
        </div>
        <button
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-150 select-none ${
            isSaving
              ? "cursor-not-allowed opacity-60"
              : "hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]"
          }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving Changes...
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Credentials
            </>
          )}
        </button>
      </header>

      {/* Grid Canvas */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cardData.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl transition-all duration-300 hover:border-slate-300 hover:shadow-2xl"
          >
            <header className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
              {/* Icon Container - Clean Light Styling */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors group-hover:border-rose-200 group-hover:bg-rose-50 group-hover:text-rose-600">
                {card.icon}
              </div>
              <h3 className="font-outfit text-sm font-bold text-slate-900">
                {card.title}
              </h3>
            </header>

            <div className="space-y-4">
              {card.inputs.map((input, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    defaultValue={input.defaultValue}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:ring-1 focus:ring-rose-500/30"
                  />
                </div>
              ))}
              {card.note && (
                <p className="mt-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-[10px] leading-relaxed text-slate-500">
                  {card.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// Data structure for the cards
const cardData = [
  {
    title: "YouTube Data API v3",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    inputs: [
      {
        label: "Client ID",
        type: "text",
        placeholder: "Enter YouTube Client ID",
        defaultValue: "",
      },
      {
        label: "Client Secret",
        type: "password",
        placeholder: "Enter Client Secret",
        defaultValue: "placeholdersecret",
      },
    ],
  },
  {
    title: "Facebook & Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    inputs: [
      {
        label: "App ID (Client ID)",
        type: "text",
        placeholder: "Enter Facebook App ID",
        defaultValue: "",
      },
      {
        label: "App Secret",
        type: "password",
        placeholder: "Enter App Secret",
        defaultValue: "facebooksecret",
      },
    ],
  },
  {
    title: "TikTok Content API",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.25-.25v6.52c-.03 2.32-.93 4.67-2.75 6.13-2.18 1.82-5.46 2.1-7.95 1.07-2.62-1.03-4.59-3.7-4.63-6.58-.09-3.41 2.45-6.59 5.84-7.11.82-.14 1.66-.1 2.48.07V12c-.79-.24-1.66-.18-2.4.17-1.46.64-2.31 2.21-2.11 3.79.16 1.44 1.25 2.67 2.67 2.87 1.57.26 3.19-.71 3.58-2.22.11-.38.13-.78.12-1.18V.02z" />
      </svg>
    ),
    inputs: [
      {
        label: "Client Key",
        type: "text",
        placeholder: "Enter TikTok Client Key",
        defaultValue: "",
      },
      {
        label: "Client Secret",
        type: "password",
        placeholder: "Enter Client Secret",
        defaultValue: "tiktoksecret",
      },
    ],
  },
  {
    title: "Google Gemini AI",
    icon: (
      <span className="font-outfit text-base font-bold text-slate-500 transition-colors group-hover:text-rose-600">
        ✦
      </span>
    ),
    inputs: [
      {
        label: "API Key",
        type: "text",
        placeholder: "AI Studio Key (AIzaSy...)",
        defaultValue: "",
      },
    ],
    note: "Required for core AI features including Video Generation, Translation, and Social Post automation.",
  },
];
