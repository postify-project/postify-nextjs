"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { Globe, Sparkles, RefreshCw, CheckCircle2, Copy, AlertCircle } from "lucide-react";

interface TranslationJobResult {
  status: string;
  translated_video_url?: string;
  original_text?: string;
  translated_text?: string;
  error?: string;
}

export default function VideoTranslatorPage() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("Urdu");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobResult, setJobResult] = useState<TranslationJobResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [pollCount, setPollCount] = useState<number>(0);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const languages = [
    { code: "PK", name: "Urdu" },
    { code: "US", name: "English" },
    { code: "IN", name: "Hindi" },
    { code: "SA", name: "Arabic" },
    { code: "ES", name: "Spanish" },
    { code: "FR", name: "French" },
  ];

  useEffect(() => {
    if (!jobId || jobResult?.status === "completed" || jobResult?.status === "failed") return;

    const interval = setInterval(async () => {
      try {
        const token = Cookies.get("token");
        const res = await api.get(`${BACKEND}/ai/translate/status/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success && res.data?.data) {
          const data = res.data.data;
          setJobResult(data);
          setPollCount((prev) => prev + 1);

          if (data.status === "completed" || data.status === "failed") {
            setIsTranslating(false);
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.warn("Translation polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, jobResult, BACKEND]);

  const handleStartTranslation = async () => {
    if (!videoUrl.trim()) return;
    setIsTranslating(true);
    setErrorMsg("");
    setJobId(null);
    setJobResult(null);
    setPollCount(0);

    try {
      const token = Cookies.get("token");
      const res = await api.post(
        `${BACKEND}/ai/translate`,
        { video_url: videoUrl, target_language: targetLanguage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success && res.data?.data?.job_id) {
        setJobId(res.data.data.job_id);
        setJobResult({ status: "processing" });
      } else {
        throw new Error(res.data?.message || "Failed to start translation job");
      }
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      console.error("Translation error:", err);
      setErrorMsg(errObj.response?.data?.message || errObj.message || "Translation failed.");
      setIsTranslating(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3.5 border-b border-slate-200/80 pb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AI Video Translator
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Transcribe and translate video audio into multiple international languages.
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

      {/* Input Form */}
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

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Select Target Language
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.name}
                type="button"
                onClick={() => setTargetLanguage(lang.name)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                  targetLanguage === lang.name
                    ? "border-rose-600 bg-rose-600 text-white shadow-xs"
                    : "border-slate-200 bg-slate-50/60 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span className="rounded px-1.5 py-0.5 text-[9px] font-bold bg-white/20">
                  {lang.code}
                </span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!videoUrl.trim() || isTranslating}
          onClick={handleStartTranslation}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 py-3.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-500 active:scale-95 disabled:opacity-50"
        >
          {isTranslating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Transcribing & Translating Audio...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Translate Video to {targetLanguage}</span>
            </>
          )}
        </button>
      </section>

      {/* Progress Indicator */}
      {isTranslating && (
        <div className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/50 p-6 text-center animate-fade-in space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow-xs">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
          <div>
            <h3 className="font-outfit text-sm font-bold text-slate-900">
              Translating Audio Stream
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Processing speech recognition & neural machine translation... (Poll #{pollCount})
            </p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {jobResult && jobResult.status === "completed" && (
        <section className="animate-fade-in rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Translation Completed
            </h3>
          </div>

          {jobResult.original_text && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Original Speech Transcript
              </span>
              <p className="text-xs leading-relaxed text-slate-800">
                {jobResult.original_text}
              </p>
            </div>
          )}

          {jobResult.translated_text && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  Translated Transcript ({targetLanguage})
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(jobResult.translated_text!)}
                  className="text-[10px] font-semibold text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-xs leading-relaxed text-slate-900 font-semibold">
                {jobResult.translated_text}
              </p>
            </div>
          )}

          {jobResult.translated_video_url && (
            <div className="pt-2 flex justify-end">
              <a
                href={jobResult.translated_video_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-rose-600"
              >
                <span>Download Translated Video</span>
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
