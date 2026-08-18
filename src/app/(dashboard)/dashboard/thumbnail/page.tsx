"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { Image as ImageIcon, Sparkles, RefreshCw, CheckCircle2, Download, AlertCircle } from "lucide-react";

interface ThumbJobResult {
  status: string;
  thumbnail_url?: string;
  caption?: string;
  hashtags?: string[];
  error?: string;
}

export default function ThumbnailGeneratorPage() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobResult, setJobResult] = useState<ThumbJobResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [pollCount, setPollCount] = useState<number>(0);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    if (!jobId || jobResult?.status === "completed" || jobResult?.status === "failed") return;

    const interval = setInterval(async () => {
      try {
        const token = Cookies.get("token");
        const res = await api.get(`${BACKEND}/ai/thumbnail/status/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success && res.data?.data) {
          const data = res.data.data;
          setJobResult(data);
          setPollCount((prev) => prev + 1);

          if (data.status === "completed" || data.status === "failed") {
            setIsGenerating(false);
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.warn("Thumbnail polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, jobResult, BACKEND]);

  const handleStartGeneration = async () => {
    if (!videoUrl.trim()) return;
    setIsGenerating(true);
    setErrorMsg("");
    setJobId(null);
    setJobResult(null);
    setPollCount(0);

    try {
      const token = Cookies.get("token");
      const res = await api.post(
        `${BACKEND}/ai/thumbnail`,
        { video_url: videoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success && res.data?.data?.job_id) {
        setJobId(res.data.data.job_id);
        setJobResult({ status: "processing" });
      } else {
        throw new Error(res.data?.message || "Failed to start thumbnail generation");
      }
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      console.error("Thumbnail error:", err);
      setErrorMsg(errObj.response?.data?.message || errObj.message || "Thumbnail generation failed.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3.5 border-b border-slate-200/80 pb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
          <ImageIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AI Thumbnail & Caption Generator
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Provide a video URL — AI frame analysis creates an engaging thumbnail, text overlay, and hashtags.
          </p>
        </div>
      </header>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg("")} className="cursor-pointer opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Form Input */}
      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Video Asset URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://cloudinary.com/... or https://domain.com/video.mp4"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 outline-none focus:border-rose-500 focus:bg-white"
          />
        </div>

        <button
          disabled={!videoUrl.trim() || isGenerating}
          onClick={handleStartGeneration}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 py-3.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-500 active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Analyzing Video & Generating Thumbnail...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Thumbnail & Caption</span>
            </>
          )}
        </button>
      </section>

      {/* Progress Polling Indicator */}
      {isGenerating && (
        <div className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/50 p-6 text-center animate-fade-in space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-xs">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <h3 className="font-outfit text-sm font-bold text-slate-900">
              Extracting Keyframe & Generating Thumbnail
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Analyzing video frame compositions... (Poll #{pollCount})
            </p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {jobResult && jobResult.status === "completed" && (
        <section className="animate-fade-in rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Generated Thumbnail Asset
            </h3>
          </div>

          {jobResult.thumbnail_url && (
            <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-md aspect-video max-w-lg mx-auto">
              <img src={jobResult.thumbnail_url} alt="AI Thumbnail" className="w-full h-full object-cover" />
            </div>
          )}

          {jobResult.caption && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suggested Caption
              </span>
              <p className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-700">
                {jobResult.caption}
              </p>
            </div>
          )}

          {jobResult.hashtags && jobResult.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {jobResult.hashtags.map((tag, idx) => (
                <span key={idx} className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {jobResult.thumbnail_url && (
            <div className="flex justify-end pt-2">
              <a
                href={jobResult.thumbnail_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-rose-600"
              >
                <Download className="h-4 w-4" />
                <span>Download High-Res Thumbnail</span>
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
