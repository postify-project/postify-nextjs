"use client";

import React, { useState } from "react";

export default function AIVideoGeneratorPage() {
  const [topic, setTopic] = useState<string>("");
  const [language, setLanguage] = useState<"urdu" | "english">("urdu");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    // Simulate generation timeout
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-[1200px] animate-fade-in p-6">
      {/* Page Header */}
      <header className="mb-8 flex items-center gap-4">
        {/* Decorative Video Icon Box */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-[#0e1017] shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"/>
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🎬</span>
            <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
              AI Video Generator
            </h1>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Provide a topic and AI will generate a complete video with script, voiceover, and images!
          </p>
        </div>
      </header>

      {/* Main Console Box Container */}
      <section className="w-full max-w-[800px] rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-2xl">
        <div className="flex flex-col gap-6">
          
          {/* Input Block: Video Topic */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              Video Topic
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., 3 amazing facts about space, or Health benefits of apples..."
              className="h-28 w-full resize-none rounded-lg border border-white/5 bg-[#090a0f] p-4 text-xs leading-relaxed text-white placeholder-neutral-600 transition-all duration-150 focus:border-indigo-500/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            />
          </div>

          {/* Selector Block: Voiceover Language */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              Voiceover Language
            </label>
            <div className="flex items-center gap-2.5">
              {/* Urdu Button Tab */}
              <button
                type="button"
                onClick={() => setLanguage("urdu")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3.5 py-1.75 text-xs font-semibold transition-all duration-150 select-none ${
                  language === "urdu"
                    ? "bg-indigo-600 text-white shadow-[0_0_16px_rgba(79,70,229,0.4)]"
                    : "border border-white/5 bg-[#090a0f] text-neutral-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <span className="rounded bg-white/10 px-1 py-0.25 text-[9px] font-bold tracking-wide uppercase">
                  pk
                </span>
                Urdu
              </button>

              {/* English Button Tab */}
              <button
                type="button"
                onClick={() => setLanguage("english")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3.5 py-1.75 text-xs font-semibold transition-all duration-150 select-none ${
                  language === "english"
                    ? "bg-indigo-600 text-white shadow-[0_0_16px_rgba(79,70,229,0.4)]"
                    : "border border-white/5 bg-[#090a0f] text-neutral-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <span className="rounded bg-white/10 px-1 py-0.25 text-[9px] font-bold tracking-wide uppercase">
                  gb
                </span>
                English
              </button>
            </div>
          </div>

          {/* Submit Action Trigger Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 text-xs font-bold text-white shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all duration-200 select-none ${
              isGenerating || !topic.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:-translate-y-[1px] hover:from-amber-400 hover:to-orange-500 hover:shadow-[0_6px_24px_rgba(245,158,11,0.4)] active:translate-y-0"
            }`}
          >
            {isGenerating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating Project Content...
              </>
            ) : (
              <>
                <span className="text-sm font-bold">$</span>
                Generate Video (Wait 1-2 mins)
              </>
            )}
          </button>

        </div>
      </section>
    </div>
  );
}