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
    <div className="relative flex min-h-[calc(100vh-52px)] w-full flex-col items-center justify-center p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20 animate-fade-in">
      {/* Light Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />

      {/* Upload Central Container */}
      <div className="flex w-full max-w-[720px] flex-col items-center text-center">
        <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Upload Content
        </h1>
        <p className="mt-2 max-w-[480px] text-xs leading-relaxed text-slate-500 sm:text-sm">
          Select a video to format, configure, and publish across multiple
          channels simultaneously
        </p>

        {/* Drag & Drop Zone Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`mt-8 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-200 cursor-pointer ${
            isDragging
              ? "border-rose-500 bg-rose-500/5 shadow-lg shadow-rose-500/10"
              : "border-slate-200/80 bg-white shadow-xl hover:border-slate-300 hover:bg-slate-50/50"
          }`}
        >
          {/* Upload Icon Shield */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>

          <h3 className="font-outfit mt-5 text-sm font-bold text-slate-900">
            {selectedFile
              ? selectedFile.name
              : "Drag and drop your video file here"}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {selectedFile
              ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
              : "Supports MP4, MOV, MKV, AVI, WebM (Max 4GB)"}
          </p>

          {!selectedFile && (
            <button
              type="button"
              className="mt-5 cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
            >
              Browse Files
            </button>
          )}
        </div>

        {/* Target Syncs Badge Row */}
        <div className="mt-8 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          <span>Active target syncs:</span>
          <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-800">
            YOUTUBE
          </span>
        </div>
      </div>
    </div>
  );
}
