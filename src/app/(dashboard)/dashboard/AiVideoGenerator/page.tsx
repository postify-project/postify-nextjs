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
    <div className="mx-auto max-w-4xl px-4 py-8 text-slate-100 antialiased selection:bg-indigo-500/20">
      {/* Header */}
      <header className="mb-8 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            AI Video Generator
          </h1>
          <p className="mt-0.5 text-xs text-slate-400">
            Generate video scripts, voiceovers, and dynamic visuals from prompt
            inputs
          </p>
        </div>
      </header>

      {/* Main Form Box */}
      <section className="rounded-2xl border border-slate-800/80 bg-[#111623] p-6 shadow-sm transition-all duration-200 hover:border-slate-700/80">
        <div className="space-y-6">
          {/* Input Block: Video Topic */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">
              Video Topic or Prompt
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., 3 amazing facts about deep space exploration, or simple health benefits of daily walking..."
              className="h-32 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-150 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
            />
          </div>

          {/* Selector Block: Voiceover Language */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">
              Voiceover Language
            </label>
            <div className="flex items-center gap-2">
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
                    className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all duration-150 ${
                      active
                        ? "bg-indigo-600/15 text-indigo-400 ring-1 ring-indigo-500/30"
                        : "border border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <span className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[9px] uppercase text-slate-300">
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
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-semibold transition-all duration-150 ${
              isGenerating || !topic.trim()
                ? "cursor-not-allowed border border-slate-800 bg-slate-900/50 text-slate-600"
                : "bg-indigo-600 text-white shadow-md hover:bg-indigo-500 active:scale-[0.99]"
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
  );
}
