"use client";

import React, { useState, useRef } from "react";

interface ThumbnailOption {
  id: number;
  title: string;
  theme: "gradient-sunset" | "dark-neon" | "cyberpunk";
  badge: string;
}

export default function ThumbnailGeneratorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("Mera viral video...");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailOption[] | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setThumbnails(null); // Reset layout canvas state
    }
  };

  const startGeneration = () => {
    if (!selectedFile) return;
    setIsGenerating(true);
    setThumbnails(null);

    setTimeout(() => {
      setIsGenerating(false);
      setThumbnails([
        {
          id: 0,
          title: videoTitle || "Mera Viral Video",
          theme: "gradient-sunset",
          badge: "OPTION 1 - VIBRANT",
        },
        {
          id: 1,
          title: videoTitle || "Mera Viral Video",
          theme: "dark-neon",
          badge: "OPTION 2 - RETRO",
        },
        {
          id: 2,
          title: videoTitle || "Mera Viral Video",
          theme: "cyberpunk",
          badge: "OPTION 3 - TECH",
        },
      ]);
      setSelectedThumbnail(0);
    }, 2000);
  };

  return (
    <div className="relative mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      {/* View Title Header */}
      <header className="mb-8 border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div>
            <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              AI Thumbnail Generator
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Select a video — AI will automatically generate a thumbnail
            </p>
          </div>
        </div>
      </header>

      {/* Main Form Box Wrapper */}
      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
        <header className="mb-5 flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Video se AI Thumbnail
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Gemini AI analyzes the video frame and designs a stunning
              thumbnail
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-5">
          {/* File Picker Console Row */}
          <div className="flex gap-2.5">
            <input
              type="text"
              readOnly
              placeholder="Select a video — auto thumbnail will be generated..."
              value={selectedFile ? selectedFile.name : ""}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none"
            />
            <button
              onClick={handleSelectVideo}
              className="flex cursor-pointer items-center gap-1.5 shrink-0 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-150 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-95"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Select Video
            </button>
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Optional Video Title Block */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              VIDEO TITLE (OPTIONAL — AI CAN GENERATE AUTOMATICALLY)
            </label>
            <input
              type="text"
              placeholder="Mera viral video..."
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-1 focus:ring-rose-500/30"
            />
          </div>

          {/* Progress Processing Indicator */}
          {isGenerating && (
            <div className="mt-1 flex flex-col gap-2 animate-pulse">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full w-full rounded-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-500"
                  style={{ width: "100%" }}
                />
              </div>
              <span className="text-[11px] text-slate-500">
                Gemini AI analyzing video frames and overlaying text...
              </span>
            </div>
          )}

          {/* Submit Action Block */}
          <button
            disabled={!selectedFile || isGenerating}
            onClick={startGeneration}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all duration-200 select-none ${
              selectedFile && !isGenerating
                ? "bg-rose-600 text-white shadow-sm shadow-rose-600/10 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]"
                : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 opacity-60"
            }`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            Generate Thumbnails
          </button>
        </div>
      </section>

      {/* Generated Selection Presentation Row */}
      {thumbnails && (
        <section className="animate-fade-in rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <h3 className="font-outfit mb-4 text-base font-bold text-slate-900">
            Choose Your Thumbnail Design
          </h3>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {thumbnails.map((thumb) => {
              const isSelected = selectedThumbnail === thumb.id;

              // Theme Variant String Switch mapping
              const themeStyles =
                thumb.theme === "gradient-sunset"
                  ? "bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-400"
                  : thumb.theme === "dark-neon"
                    ? "bg-gradient-to-tr from-indigo-900 via-purple-800 to-rose-600"
                    : "bg-gradient-to-tr from-slate-800 via-teal-600 to-emerald-400";

              return (
                <div
                  key={thumb.id}
                  onClick={() => setSelectedThumbnail(thumb.id)}
                  className={`group relative flex aspect-video cursor-pointer items-end overflow-hidden rounded-xl p-3 border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${themeStyles} ${
                    isSelected
                      ? "border-rose-500 ring-2 ring-rose-500/30 shadow-md"
                      : "border-transparent"
                  }`}
                >
                  {/* Visual Darkening Overlay Layer */}
                  <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

                  {/* Top Badge */}
                  <span className="absolute top-2 left-2 z-2 rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-[8px] font-bold tracking-wider text-white backdrop-blur-sm">
                    {thumb.badge}
                  </span>

                  {/* Foreground Card elements */}
                  <div className="relative z-2 w-full">
                    <span className="mb-1.5 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors duration-150 group-hover:bg-rose-600">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="6 4 20 12 6 20"></polygon>
                      </svg>
                    </span>
                    <h4 className="text-[11px] font-bold tracking-wide text-white line-clamp-2 drop-shadow-md">
                      {thumb.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Footer Actions Group */}
          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all duration-150 hover:bg-slate-100 active:scale-95">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit in Thumbnail Studio
            </button>

            <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-150 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-95">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Selected Option
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
