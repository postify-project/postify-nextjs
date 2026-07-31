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
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(
    null,
  );

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
        hashtags: [
          "#MorningExercise",
          "#HealthyLifestyle",
          "#FitnessGoals",
          "#ActiveLiving",
          "#HealthyPakistan",
        ],
      });
    }, 2000);
  };

  return (
    <div className="relative mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      {/* Header */}
      <header className="mb-8 border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <div>
            <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              AI Social Post Generator
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Provide context — AI will generate an Image, Caption, and
              Hashtags. Then publish directly to platforms!
            </p>
          </div>
        </div>
      </header>

      {/* Inputs Form Box */}
      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
        <header className="mb-5 flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600">
            <span className="font-outfit text-sm font-bold">✦</span>
          </div>
          <div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Enter Post Context
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              AI understands the context to generate the perfect image, caption,
              and hashtags
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              CONTEXT / TOPIC
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs leading-relaxed text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:ring-1 focus:ring-rose-500/30 resize-y"
              rows={4}
              placeholder="E.g., A post about the benefits of morning exercise for a healthy lifestyle..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <button
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl p-3 text-xs font-semibold transition-all duration-200 ${
              !context.trim() || isGenerating
                ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 opacity-60"
                : "bg-rose-600 text-white shadow-sm shadow-rose-600/10 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]"
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
        <section className="animate-fade-in rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <h3 className="font-outfit mb-5 text-base font-bold text-slate-900">
            Generated Output Preview
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.2fr]">
            {/* Left side: AI Image Frame Mockup */}
            <div className="aspect-square overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
              <div className="flex h-full w-full items-end bg-gradient-to-br from-rose-500 via-pink-500 to-indigo-500 p-4">
                <div className="w-full rounded-xl border border-white/40 bg-white/80 p-3.5 backdrop-blur-md shadow-lg">
                  <span className="mb-1 block text-[9px] font-bold tracking-wider text-rose-600 uppercase">
                    AI Generated Asset
                  </span>
                  <p className="text-[11px] font-semibold leading-normal text-slate-900 line-clamp-3">
                    "{generatedPost.imageTopic}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Copy Sections & Actions */}
            <div className="flex flex-col gap-4">
              {/* Caption Shell */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    Generated Caption
                  </span>
                  <button
                    className="cursor-pointer text-[10px] font-semibold text-rose-600 hover:underline"
                    onClick={() =>
                      navigator.clipboard.writeText(generatedPost.caption)
                    }
                  >
                    Copy
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  {generatedPost.caption}
                </p>
              </div>

              {/* Hashtags Shell */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    Hashtags
                  </span>
                  <button
                    className="cursor-pointer text-[10px] font-semibold text-rose-600 hover:underline"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        generatedPost.hashtags.join(" "),
                      )
                    }
                  >
                    Copy
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {generatedPost.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Platform Actions */}
              <div className="mt-1 flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                  Publish Post Directly
                </span>
                <div className="flex gap-2">
                  <button className="flex-1 cursor-pointer rounded-xl border border-blue-200 bg-blue-50 py-2 text-[11px] font-semibold text-blue-600 transition-all duration-150 hover:bg-blue-600 hover:text-white active:scale-95">
                    Facebook
                  </button>
                  <button className="flex-1 cursor-pointer rounded-xl border border-pink-200 bg-pink-50 py-2 text-[11px] font-semibold text-pink-600 transition-all duration-150 hover:bg-pink-600 hover:text-white active:scale-95">
                    Instagram
                  </button>
                  <button className="flex-1 cursor-pointer rounded-xl border border-slate-300 bg-slate-900 py-2 text-[11px] font-semibold text-white transition-all duration-150 hover:bg-slate-800 active:scale-95">
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
