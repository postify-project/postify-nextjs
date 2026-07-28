"use client";

import React, { useState, useRef } from "react";

export default function VideoUploadPage() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-[calc(100vh-52px)] w-full flex-col items-center justify-center p-6 animate-fade-in">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />

      {/* Upload Central Container */}
      <div className="flex w-full max-w-[720px] flex-col items-center text-center">
        <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
          Upload Content
        </h1>
        <p className="mt-2 max-w-[480px] text-xs leading-relaxed text-neutral-400 sm:text-sm">
          Select a video to format, configure, and publish across multiple channels simultaneously
        </p>

        {/* Drag & Drop Zone Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`mt-8 flex w-full flex-col items-center justify-center rounded-xl border border-dashed p-10 transition-all duration-200 cursor-pointer ${
            isDragging
              ? "border-purple-500 bg-purple-500/5 shadow-[0_0_30px_rgba(139,92,246,0.1)]"
              : "border-white/10 bg-[#0f111a]/40 hover:border-white/20 hover:bg-[#0f111a]/60"
          }`}
        >
          {/* Upload Icon Shield */}
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 text-purple-400 shadow-inner">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>

          <h3 className="mt-5 text-sm font-semibold text-white">
            {selectedFile ? selectedFile.name : "Drag and drop your video file here"}
          </h3>
          <p className="mt-1 text-[11px] text-neutral-500">
            {selectedFile 
              ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` 
              : "Supports MP4, MOV, MKV, AVI, WebM (Max 4GB)"
            }
          </p>

          {!selectedFile && (
            <button
              type="button"
              className="mt-5 cursor-pointer rounded-md border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-neutral-200 transition-all duration-150 hover:bg-white/[0.06] hover:text-white"
            >
              Browse Files
            </button>
          )}
        </div>

        {/* Target Syncs Badge Row */}
        <div className="mt-8 flex items-center gap-2 text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
          <span>Active target syncs:</span>
          <span className="rounded bg-white/[0.04] border border-white/5 px-2 py-0.75 text-[10px] font-bold text-neutral-200">
            YOUTUBE
          </span>
        </div>
      </div>
    </div>
  );
}