"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { Video, Sparkles, CheckCircle2, AlertCircle, Play, ArrowRight, RefreshCw } from "lucide-react";

interface VideoJobResult {
  job_id: string;
  status: string;
  video_url?: string;
  script?: string;
  error?: string;
}

export default function AIVideoGeneratorPage() {
  const [topic, setTopic] = useState<string>("");
  const [captions, setCaptions] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobResult, setJobResult] = useState<VideoJobResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [pollCount, setPollCount] = useState<number>(0);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  // Polling Effect for AI Video Status
  useEffect(() => {
    if (!jobId || jobResult?.status === "completed" || jobResult?.status === "failed") return;

    const interval = setInterval(async () => {
      try {
        const token = Cookies.get("token");
        const res = await api.get(`${BACKEND}/ai/video/status/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success && res.data?.data) {
          const statusData = res.data.data;
          setJobResult(statusData);
          setPollCount((prev) => prev + 1);

          if (statusData.status === "completed" || statusData.status === "failed") {
            setIsGenerating(false);
            clearInterval(interval);
          }
        }
      } catch (err: any) {
        console.warn("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, jobResult, BACKEND]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setErrorMsg("");
    setJobId(null);
    setJobResult(null);
    setPollCount(0);

    try {
      const token = Cookies.get("token");
      const res = await api.post(
        `${BACKEND}/ai/video`,
        { prompt: topic, captions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success && res.data?.data?.job_id) {
        setJobId(res.data.data.job_id);
        setJobResult({ job_id: res.data.data.job_id, status: "processing" });
      } else {
        throw new Error(res.data?.message || "Failed to initiate AI video generation job");
      }
    } catch (err: any) {
      console.error("AI Video Generation Error:", err);
      setErrorMsg(err.response?.data?.message || err.message || "Failed to start AI Video job.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl animate-fade-in p-6 font-inter text-slate-800 antialiased">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3.5 border-b border-slate-200/80 pb-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600 font-outfit text-xl font-bold text-white shadow-md shadow-rose-600/20">
          <Video className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900">
            AI Video Generator
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate video scripts, AI voiceovers, and dynamic video compilations automatically from text prompts.
          </p>
        </div>
      </header>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg("")} className="cursor-pointer opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Main Prompt Form */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Video Topic or Prompt <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., 3 amazing productivity hacks for remote software developers, or benefits of daily meditation..."
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 outline-none transition-all focus:border-rose-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={captions}
                onChange={(e) => setCaptions(e.target.checked)}
                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
              />
              <span>Generate Embedded Subtitles / Captions</span>
            </label>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-500 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing AI Video...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Complete AI Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Progress & Polling Indicator */}
      {isGenerating && (
        <div className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/50 p-6 text-center animate-fade-in space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-xs">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <h3 className="font-outfit text-sm font-bold text-slate-900">
              AI Backend is Generating Your Video
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Synthesizing script, generating voiceover audio, and rendering visual frames... (Poll #{pollCount})
            </p>
          </div>
          <div className="w-full bg-rose-200/60 h-2 rounded-full overflow-hidden max-w-md mx-auto">
            <div className="bg-rose-600 h-full animate-pulse w-3/4 rounded-full" />
          </div>
        </div>
      )}

      {/* Output Results Section */}
      {jobResult && jobResult.status === "completed" && (
        <section className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl animate-fade-in space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="font-outfit text-base font-bold text-slate-900">
                AI Generated Video Ready
              </h3>
            </div>
            <Link
              href="/dashboard/video-upload"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-600"
            >
              <span>Schedule / Publish Video</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {jobResult.video_url ? (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-black aspect-video max-w-xl mx-auto shadow-md">
              <video src={jobResult.video_url} controls className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600 text-center">
              Video rendering finished! URL will be available shortly.
            </div>
          )}

          {jobResult.script && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Generated Script Transcript
              </span>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-800 max-h-48 overflow-y-auto">
                {jobResult.script}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
