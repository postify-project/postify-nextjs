"use client";

import React, { useState } from "react";

interface GeneratedPost {
  imageTopic: string;
  caption: string;
  hashtags: string[];
}

export default function PostGeneratorPage() {
  const [context, setContext] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);

  const handleGenerate = () => {
    if (!context.trim()) return;
    setIsGenerating(true);
    setGeneratedPost(null);

    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPost({
        imageTopic: context,
        caption: `✨ Boost your energy and kickstart your day! Incorporating just 20 minutes of morning exercise can transform your mood, boost productivity, and improve long-term physical health. It's not about having time, it's about making time. Let's build healthy habits together! 🏃‍♂️🌱💪`,
        hashtags: ["#MorningExercise", "#HealthyLifestyle", "#FitnessGoals", "#ActiveLiving", "#HealthyPakistan"]
      });
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-[850px] animate-fade-in p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-outfit">AI Social Post Generator</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Provide context — AI will generate an Image, Caption, and Hashtags. Then publish directly to platforms!
            </p>
          </div>
        </div>
      </header>

      {/* Inputs Form Box */}
      <section className="mb-6 rounded-[13px] border border-white/5 bg-[#0f111a] p-6 shadow-2xl">
        <header className="mb-[18px] flex items-start gap-[11px]">
          <div className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-emerald-500/10">
            <span className="text-sm font-bold text-emerald-500 font-outfit">$</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white font-outfit">Enter Post Context</h3>
            <p className="mt-0.75 text-[11px] text-neutral-400">
              AI understands the context to generate the perfect image, caption, and hashtags
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
              CONTEXT / TOPIC
            </label>
            <textarea
              className="w-full rounded-8px border border-white/5 bg-[#090a0f] p-3 text-xs leading-relaxed text-white resize-y focus:border-emerald-500 focus:outline-none focus:ring-3 focus:ring-emerald-500/25"
              rows={4}
              placeholder="E.g., A post about the benefits of morning exercise for a healthy lifestyle..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <button
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-8px p-3 text-xs font-semibold transition-all duration-200 ${
              !context.trim() || isGenerating
                ? "bg-white/[0.02] text-neutral-500 border border-white/[0.04] opacity-50 cursor-not-allowed"
                : "bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-[1px] hover:bg-emerald-600 hover:shadow-[0_4px_28px_rgba(16,185,129,0.5)]"
            }`}
            disabled={!context.trim() || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating Post...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Generate Full Post
              </>
            )}
          </button>
        </div>
      </section>

      {/* Output Results Section */}
      {generatedPost && (
        <section className="rounded-[13px] border border-white/5 bg-[#0f111a] p-6 shadow-2xl animate-fade-in">
          <h3 className="mb-[18px] text-base font-semibold text-white font-outfit">
            Generated Output Preview
          </h3>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-[1fr_1.2fr]">
            {/* Left side: AI Image Frame Mockup */}
            <div className="aspect-square overflow-hidden rounded-8px border border-white/5">
              <div className="flex h-full w-full items-end bg-gradient-to-br from-emerald-500 via-cyan-500 to-indigo-500 p-[18px]">
                <div className="w-full rounded-8px border border-white/10 bg-black/65 p-3 backdrop-blur-[8px]">
                  <span className="mb-1 block text-[9px] font-bold tracking-wider text-emerald-500 uppercase">
                    AI Generated Asset
                  </span>
                  <p className="text-[11px] font-medium leading-normal text-white">
                    "{generatedPost.imageTopic}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Copy Sections & Actions */}
            <div className="flex flex-col gap-4">
              {/* Caption Shell */}
              <div className="rounded-8px border border-white/[0.03] bg-[#090a0f] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">
                    Generated Caption
                  </span>
                  <button
                    className="cursor-pointer text-[10px] font-semibold text-emerald-500 hover:underline"
                    onClick={() => navigator.clipboard.writeText(generatedPost.caption)}
                  >
                    Copy
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed text-white">{generatedPost.caption}</p>
              </div>

              {/* Hashtags Shell */}
              <div className="rounded-8px border border-white/[0.03] bg-[#090a0f] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-wider text-neutral-500 uppercase">
                    Hashtags
                  </span>
                  <button
                    className="cursor-pointer text-[10px] font-semibold text-emerald-500 hover:underline"
                    onClick={() => navigator.clipboard.writeText(generatedPost.hashtags.join(" "))}
                  >
                    Copy
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {generatedPost.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-[20px] border border-emerald-500/15 bg-emerald-500/10 px-2 py-0.75 text-[10px] font-medium text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Platform Actions */}
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">
                  Publish Post Directly
                </span>
                <div className="flex gap-2.25">
                  <button className="flex-grow cursor-pointer rounded border border-blue-500/20 bg-blue-500/5 p-2.25 text-[11px] font-semibold text-blue-400 transition-all duration-150 hover:bg-blue-500 hover:text-white">
                    Facebook
                  </button>
                  <button className="flex-grow cursor-pointer rounded border border-pink-500/20 bg-pink-500/5 p-2.25 text-[11px] font-semibold text-pink-400 transition-all duration-150 hover:bg-pink-500 hover:text-white">
                    Instagram
                  </button>
                  <button className="flex-grow cursor-pointer rounded border border-cyan-500/20 bg-cyan-500/5 p-2.25 text-[11px] font-semibold text-cyan-400 transition-all duration-150 hover:bg-cyan-500 hover:text-white">
                    TikTok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}