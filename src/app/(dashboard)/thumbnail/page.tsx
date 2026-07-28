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
    <div className="mx-auto max-w-[850px] animate-fade-in p-6">
      
      {/* View Title Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)] border border-indigo-500/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
              AI Thumbnail Generator
            </h1>
            <p className="mt-1 text-xs text-neutral-400">
              Select a video — AI will automatically generate a thumbnail
            </p>
          </div>
        </div>
      </header>

      {/* Main Form Box Wrapper */}
      <section className="mb-6 rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-xl">
        <header className="mb-5 flex items-start gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-500/10 text-purple-400 border border-purple-500/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white font-outfit">Video se AI Thumbnail</h3>
            <p className="mt-0.5 text-[11px] text-neutral-400">
              Gemini AI analyzes the video frame and designs a stunning thumbnail
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
              className="w-full flex-1 rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-2 text-xs text-white placeholder-neutral-600 outline-none"
            />
            <button
              onClick={handleSelectVideo}
              className="flex cursor-pointer items-center gap-1.5 shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-150 hover:bg-purple-500"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
              VIDEO TITLE (OPTIONAL — AI CAN GENERATE AUTOMATICALLY)
            </label>
            <input
              type="text"
              placeholder="Mera viral video..."
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/30"
            />
          </div>

          {/* Progress Processing Indicator */}
          {isGenerating && (
            <div className="mt-1 flex flex-col gap-2 animate-pulse">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500" style={{ width: '100%' }} />
              </div>
              <span className="text-[11px] text-neutral-400">
                Gemini AI analyzing video frames and overlaying text...
              </span>
            </div>
          )}

          {/* Submit Action Block */}
          <button
            disabled={!selectedFile || isGenerating}
            onClick={startGeneration}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-200 select-none ${
              selectedFile && !isGenerating
                ? "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:-translate-y-[1px] hover:bg-purple-500 hover:shadow-[0_4px_24px_rgba(147,51,234,0.45)]"
                : "bg-white/[0.01] text-neutral-500 border border-white/5 cursor-not-allowed opacity-50"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        <section className="rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-xl animate-fade-in">
          <h3 className="text-sm font-semibold text-white font-outfit mb-4">
            Choose Your Thumbnail Design
          </h3>
          
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {thumbnails.map((thumb) => {
              const isSelected = selectedThumbnail === thumb.id;
              
              // Theme Variant String Switch mapping
              const themeStyles = 
                thumb.theme === "gradient-sunset" ? "bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-500" :
                thumb.theme === "dark-neon" ? "bg-gradient-to-tr from-indigo-950 via-purple-900 to-indigo-600" :
                "bg-gradient-to-tr from-slate-900 via-cyan-600 to-emerald-500";

              return (
                <div
                  key={thumb.id}
                  onClick={() => setSelectedThumbnail(thumb.id)}
                  className={`group relative flex aspect-video cursor-pointer items-end rounded-lg p-3 border-2 transition-all duration-200 overflow-hidden hover:-translate-y-1 hover:shadow-2xl ${themeStyles} ${
                    isSelected ? "border-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.35)]" : "border-transparent"
                  }`}
                >
                  {/* Visual Darkening Overlay Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-1" />

                  {/* Top Badge */}
                  <span className="absolute top-2 left-2 z-2 rounded bg-black/70 border border-white/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white">
                    {thumb.badge}
                  </span>

                  {/* Foreground Card elements */}
                  <div className="relative z-2 w-full">
                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white mb-1.5 transition-colors duration-150 group-hover:bg-purple-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6 4 20 12 6 20"></polygon>
                      </svg>
                    </span>
                    <h4 className="text-[11px] font-bold text-white tracking-wide line-clamp-2 drop-shadow-md">
                      {thumb.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Footer Actions Group */}
          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-neutral-200 transition-all duration-150 hover:bg-white/[0.06]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit in Thumbnail Studio
            </button>
            
            <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all duration-150 hover:bg-purple-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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