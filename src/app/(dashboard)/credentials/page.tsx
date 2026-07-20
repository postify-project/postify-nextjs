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
    <div className="mx-auto max-w-[1200px] animate-fade-in p-4 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-[18px] right-[18px] z-200 flex items-center gap-2 rounded-lg bg-emerald-500 px-[18px] py-2.25 text-xs font-semibold text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] animate-[slide-up_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Credentials saved successfully!
        </div>
      )}

      {/* Page Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-[23px] font-bold text-white font-outfit">
            API Credentials <span className="text-[#818cf8]">Setup</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1.5">
            Manage your API keys for YouTube, Facebook, TikTok, and Gemini.
          </p>
        </div>
        <button
          className={`flex cursor-pointer items-center justify-center gap-1.5 rounded bg-[#5850ec] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_16px_rgba(88,80,236,0.4)] transition-all duration-150 select-none ${
            isSaving
              ? "opacity-60 cursor-not-allowed"
              : "hover:-translate-y-[1px] hover:bg-[#4f46e5] hover:shadow-[0_0_24px_rgba(88,80,236,0.6)] active:translate-y-0"
          }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <section className="grid grid-cols-1 gap-[18px] lg:grid-cols-2">
        {/* YouTube Card */}
        <div className="group rounded-[13px] border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-indigo-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <header className="mb-[18px] flex items-center gap-3">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-red-500/10 text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white font-outfit">YouTube Data API v3</h3>
          </header>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">Client ID</label>
              <input type="text" placeholder="Enter YouTube Client ID" defaultValue="Enter YouTube Client ID" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">Client Secret</label>
              <input type="password" placeholder="Client Secret" defaultValue="placeholdersecret" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Facebook Card */}
        <div className="group rounded-[13px] border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-indigo-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <header className="mb-[18px] flex items-center gap-3">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white font-outfit">Facebook & Instagram</h3>
          </header>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">App ID (Client ID)</label>
              <input type="text" placeholder="Enter Facebook App ID" defaultValue="Enter Facebook App ID" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">App Secret</label>
              <input type="password" placeholder="App Secret" defaultValue="facebooksecret" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* TikTok Card */}
        <div className="group rounded-[13px] border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-indigo-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <header className="mb-[18px] flex items-center gap-3">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.25-.25v6.52c-.03 2.32-.93 4.67-2.75 6.13-2.18 1.82-5.46 2.1-7.95 1.07-2.62-1.03-4.59-3.7-4.63-6.58-.09-3.41 2.45-6.59 5.84-7.11.82-.14 1.66-.1 2.48.07V12c-.79-.24-1.66-.18-2.4.17-1.46.64-2.31 2.21-2.11 3.79.16 1.44 1.25 2.67 2.67 2.87 1.57.26 3.19-.71 3.58-2.22.11-.38.13-.78.12-1.18V.02z"/>
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white font-outfit">TikTok Content API</h3>
          </header>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">Client Key</label>
              <input type="text" placeholder="Enter TikTok Client Key" defaultValue="Enter TikTok Client Key" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">Client Secret</label>
              <input type="password" placeholder="Client Secret" defaultValue="tiktoksecret" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Gemini Card */}
        <div className="group rounded-[13px] border border-white/5 bg-[#0f111a] p-[18px] transition-all duration-200 hover:border-indigo-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <header className="mb-[18px] flex items-center gap-3">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
              <span className="text-base font-bold dollar-badge font-outfit">$</span>
            </div>
            <h3 className="text-sm font-semibold text-white font-outfit">Google Gemini AI</h3>
          </header>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-neutral-400">API Key</label>
              <input type="text" placeholder="AI Studio Key (AIzaSy...)" defaultValue="AI Studio Key (AIzaSy...)" className="w-full border border-white/5 bg-[#090a0f] px-3 py-2.25 text-xs text-white rounded-md focus:border-indigo-500/30 focus:outline-none" />
            </div>
            <p className="mt-0.75 text-[10px] text-neutral-500">
              Required for Video Generator, Translator, and Social Post AI.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}