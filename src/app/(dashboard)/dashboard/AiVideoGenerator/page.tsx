"use client";

import React, { useState } from "react";

export default function AIVideoGeneratorPage() {
  const [topic, setTopic] = useState<string>("");
  const [language, setLanguage] = useState<"urdu" | "english">("urdu");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-inter antialiased selection:bg-rose-500/20 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-6 flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-600 font-outfit text-xl font-bold text-white shadow-md shadow-rose-600/20 shrink-0">
            P
          </div>
          <div>
            <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900">
              AI Video Generator
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate video scripts, voiceovers, and dynamic visuals from
              prompt inputs
            </p>
          </div>
        </header>

        {/* Main Form Card */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl transition-all duration-300">
          <div className="space-y-6">
            {/* Input Block: Video Topic */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Video Topic or Prompt <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., 3 amazing facts about deep space exploration, or simple health benefits of daily walking..."
                className="h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-rose-500 focus:bg-white focus:ring-1 focus:ring-rose-500/30"
              />
            </div>

            {/* Selector Block: Voiceover Language */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Voiceover Language
              </label>
              <div className="flex items-center gap-2.5 pt-0.5">
                {[
                  { id: "urdu", label: "Urdu", region: "PK" },
                  { id: "english", label: "English", region: "US" },
                ].map((lang) => {
                  const active = language === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setLanguage(lang.id as "urdu" | "english")}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        active
                          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
                          : "border border-slate-200 bg-slate-50/40 text-slate-500 hover:border-slate-300 hover:text-slate-800"
                      }`}
                    >
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold transition-colors ${
                          active
                            ? "bg-rose-600 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {lang.region}
                      </span>
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Trigger Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 ${
                isGenerating || !topic.trim()
                  ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none"
                  : "bg-rose-600 shadow-rose-600/10 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]"
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Generating Script & Visuals...</span>
                </>
              ) : (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Generate Complete Video</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
