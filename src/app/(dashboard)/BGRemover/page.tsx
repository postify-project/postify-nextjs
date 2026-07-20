"use client";

import React, { useState, useRef } from "react";

interface OutputFile {
  name: string;
  size: string;
}

export default function BackgroundRemoverPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bgType, setBgType] = useState<string>("transparent");
  const [customColor, setCustomColor] = useState<string>("#00ff00");
  const [bitrate, setBitrate] = useState<number>(4);
  const [chunkSpeed, setChunkSpeed] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processPct, setProcessPct] = useState<number>(0);
  const [outputFile, setOutputFile] = useState<OutputFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setOutputFile(null);
    }
  };

const handleRemoveBackground = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProcessPct(0);
    setOutputFile(null);

    const interval = setInterval(() => {
      setProcessPct((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setOutputFile({
              name: `nobg_${selectedFile.name}`,
              size: `${((selectedFile.size * 0.75) / (1024 * 1024)).toFixed(1)} MB`,
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="mx-auto max-w-[850px] animate-fade-in text-white antialiased">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Video Background Remover</h1>
            <p className="mt-1 text-xs text-neutral-400">
              Remove video background using RobustVideoMatting (AI) — professional quality
            </p>
          </div>
        </div>
      </header>

      {/* Info Alert Banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-400/15 bg-blue-400/5 p-3 px-4">
        <div className="flex shrink-0 items-center justify-center text-blue-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <p className="text-[11px] leading-relaxed text-blue-300">
          <strong>How it works:</strong> This feature uses <strong>RobustVideoMatting</strong> (AI model) running locally on Python + PyTorch. It might take some time on the first run to download and load the model. Ensure that packages from{" "}
          <code className="rounded bg-white/8 px-1 py-0.5 font-mono text-[10px] text-white">requirements_inference.txt</code> are installed.
        </p>
      </div>

      <div className="flex flex-col gap-[18px]">
        {/* Step 1: Input Selection */}
        <section className="rounded-xl border border-white/10 bg-[#0f111a] p-[22px] shadow-md">
          <header className="mb-[18px] flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600 font-mono text-[10px] font-bold text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]">
              1
            </span>
            <div>
              <h3 className="text-xs font-semibold text-white">Select Input Video</h3>
              <p className="mt-0.5 text-[11px] text-neutral-400">
                MP4, MOV, MKV — the video you want to remove the background from
              </p>
            </div>
          </header>
          <div>
            <div className="flex gap-2.5">
              <input
                type="text"
                readOnly
                placeholder="Select a video to remove its background..."
                value={selectedFile ? selectedFile.name : ""}
                className="w-full flex-grow rounded-md border border-white/5 bg-[#090a0f] px-3 py-2 text-xs text-white outline-none placeholder:text-neutral-500"
              />
              <button
                onClick={handleSelectVideo}
                className="flex cursor-pointer items-center gap-1.5 rounded bg-purple-600 px-4 py-2 text-xs font-medium text-white transition-all duration-150 hover:bg-purple-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="whitespace-nowrap">Select Video</span>
              </button>
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </section>

        {/* Step 2: Background Type */}
        <section className="rounded-xl border border-white/10 bg-[#0f111a] p-[22px] shadow-md">
          <header className="mb-[18px] flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600 font-mono text-[10px] font-bold text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]">
              2
            </span>
            <div>
              <h3 className="text-xs font-semibold text-white">Select Output Background Type</h3>
              <p className="mt-0.5 text-[11px] text-neutral-400">What would you like behind the foreground?</p>
            </div>
          </header>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 min-[960px]:grid-cols-4">
              {/* Option 1: Transparent */}
              <div
                className={`flex cursor-pointer flex-col gap-2 rounded-lg border p-3.5 transition-all duration-200 bg-white/[0.01] ${
                  bgType === "transparent"
                    ? "border-purple-600 bg-purple-500/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]"
                    : "border-white/10 hover:border-white/15 hover:bg-white/[0.03]"
                }`}
                onClick={() => setBgType("transparent")}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full border border-neutral-400 shrink-0 ${bgType === "transparent" ? "bg-purple-600 border-purple-600" : ""}`} />
                  <strong className="text-white">Transparent</strong>
                </div>
                <span className="text-[9px] text-neutral-400">Alpha / PNG sequence</span>
              </div>

              {/* Option 2: Green Screen */}
              <div
                className={`flex cursor-pointer flex-col gap-2 rounded-lg border p-3.5 transition-all duration-200 bg-white/[0.01] ${
                  bgType === "greenscreen"
                    ? "border-purple-600 bg-purple-500/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]"
                    : "border-white/10 hover:border-white/15 hover:bg-white/[0.03]"
                }`}
                onClick={() => setBgType("greenscreen")}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full border border-emerald-500 shrink-0 ${bgType === "greenscreen" ? "bg-emerald-500" : ""}`} />
                  <strong className="text-white">Green Screen</strong>
                </div>
                <span className="text-[9px] text-neutral-400">Solid green BG (video)</span>
              </div>

              {/* Option 3: Custom Color */}
              <div
                className={`flex cursor-pointer flex-col gap-2 rounded-lg border p-3.5 transition-all duration-200 bg-white/[0.01] ${
                  bgType === "color"
                    ? "border-purple-600 bg-purple-500/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]"
                    : "border-white/10 hover:border-white/15 hover:bg-white/[0.03]"
                }`}
                onClick={() => setBgType("color")}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full border border-red-500 shrink-0 ${bgType === "color" ? "bg-red-500" : ""}`} />
                  <strong className="text-white">Custom Color</strong>
                </div>
                <span className="text-[9px] text-neutral-400">Pick any solid color</span>
              </div>

              {/* Option 4: Custom Image */}
              <div
                className={`flex cursor-pointer flex-col gap-2 rounded-lg border p-3.5 transition-all duration-200 bg-white/[0.01] ${
                  bgType === "image"
                    ? "border-purple-600 bg-purple-500/5 shadow-[0_0_16px_rgba(139,92,246,0.1)]"
                    : "border-white/10 hover:border-white/15 hover:bg-white/[0.03]"
                }`}
                onClick={() => setBgType("image")}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className={`h-2.5 w-2.5 rounded-full border border-amber-500 shrink-0 ${bgType === "image" ? "bg-amber-500" : ""}`} />
                  <strong className="text-white">Custom Image</strong>
                </div>
                <span className="text-[9px] text-neutral-400">Use a background photo</span>
              </div>
            </div>

            {/* Dynamic Custom Color Inputs */}
            {bgType === "color" && (
              <div className="mt-4 border-t border-white/10 pt-4 animate-fade-in">
                <label className="mb-2 block text-[10px] font-semibold text-neutral-300">Select Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-[38px] w-[38px] cursor-pointer border border-white/10 bg-transparent outline-none"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-[100px] bg-[#090a0f] border border-white/5 p-2 text-center text-xs text-white outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>
            )}

            {/* Dynamic Custom Image Inputs */}
            {bgType === "image" && (
              <div className="mt-4 border-t border-white/10 pt-4 animate-fade-in">
                <label className="mb-2 block text-[10px] font-semibold text-neutral-300">Upload Custom Background Image</label>
                <button className="flex cursor-pointer items-center gap-1.5 rounded border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white/[0.06]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Select Background Image</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Quality Controls */}
        <section className="rounded-xl border border-white/10 bg-[#0f111a] p-[22px] shadow-md">
          <header className="mb-[18px] flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600 font-mono text-[10px] font-bold text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]">
              3
            </span>
            <div>
              <h3 className="text-xs font-semibold text-white">Output Quality</h3>
              <p className="mt-0.5 text-[11px] text-neutral-400">Video bitrate and processing speed</p>
            </div>
          </header>
          <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-wider text-neutral-300">VIDEO BITRATE (MBPS)</span>
                  <span className="rounded bg-purple-500/10 px-1.5 py-0.5 text-xs font-bold text-purple-400">{bitrate}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={bitrate}
                  onChange={(e) => setBitrate(Number(e.target.value))}
                  className="h-[5px] w-full cursor-pointer appearance-none rounded-sm bg-white/8 outline-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-100 hover:[&::-webkit-slider-thumb]:scale-125"
                />
                <span className="text-[9px] text-neutral-500">Higher = better quality, larger file size</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-wider text-neutral-300">SEQ. CHUNK (SPEED)</span>
                  <span className="rounded bg-purple-500/10 px-1.5 py-0.5 text-xs font-bold text-purple-400">{chunkSpeed}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={chunkSpeed}
                  onChange={(e) => setChunkSpeed(Number(e.target.value))}
                  className="h-[5px] w-full cursor-pointer appearance-none rounded-sm bg-white/8 outline-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,92,246,0.5)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-100 hover:[&::-webkit-slider-thumb]:scale-125"
                />
                <span className="text-[9px] text-neutral-500">Higher = faster processing (requires more RAM)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Processing Feedback Block */}
        {isProcessing && (
          <div className="rounded-lg border border-purple-500/20 bg-[#0f111a] p-4 shadow-md animate-fade-in">
            <div className="mb-2.5 flex items-center gap-2 text-xs font-medium text-white">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-[2.5px] border-purple-500/20 border-t-purple-600" />
              <span>Processing Video Background Removal: {processPct}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-sm bg-white/5">
              <div className="h-full bg-purple-600 transition-all duration-200 ease-out" style={{ width: `${processPct}%` }} />
            </div>
          </div>
        )}

        {/* Dynamic Action Trigger / Success Output Block */}
        {!outputFile ? (
          <button
            disabled={!selectedFile || isProcessing}
            onClick={handleRemoveBackground}
            className={`flex w-full items-center justify-center gap-2 rounded-lg p-3 text-xs font-semibold transition-all duration-200 outline-none select-none ${
              selectedFile
                ? "cursor-pointer bg-purple-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-[0_4px_28px_rgba(139,92,246,0.5)]"
                : "cursor-not-allowed border border-white/5 bg-white/[0.02] text-neutral-500 opacity-50"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>{isProcessing ? "Processing Video..." : "Remove Background"}</span>
          </button>
        ) : (
          <section className="rounded-xl border border-emerald-500/20 bg-[#0f111a] p-[18px] shadow-lg animate-fade-in">
            <div className="mb-3.5 flex items-start gap-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <h4 className="text-xs font-semibold text-emerald-500">Background Removed Successfully!</h4>
                <p className="mt-0.5 text-[11px] text-neutral-400">Your video is ready to download.</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-md border border-white/[0.03] bg-[#090a0f] p-3 px-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="break-all text-xs font-medium text-white">{outputFile.name}</span>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="whitespace-nowrap text-[11px] text-neutral-500">{outputFile.size}</span>
                <button className="flex cursor-pointer items-center gap-1.5 rounded bg-emerald-500 px-3.5 py-2 text-[11px] font-semibold text-white shadow-[0_4px_14px_rgba(16,185,129,0.25)] transition-all hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="whitespace-nowrap">Download Video</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}