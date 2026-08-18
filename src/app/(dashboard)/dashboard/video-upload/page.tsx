"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import {
  UploadCloud,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  FileText,
} from "lucide-react";
import { YoutubeIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/app/components/icons/SocialIcons";

export default function VideoUploadPage() {
  const [platform, setPlatform] = useState<string>("linkedin");
  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [scheduledDateTime, setScheduledDateTime] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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
      setSelectedFile(e.dataTransfer.files[0]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!caption.trim() && !selectedFile) {
      setFeedback({ type: "error", message: "Please provide text caption or select a media file!" });
      return;
    }

    if (["youtube", "instagram"].includes(platform.toLowerCase()) && !selectedFile) {
      setFeedback({ type: "error", message: `A media file is required to post on ${platform.toUpperCase()}!` });
      return;
    }

    if (isScheduled && !scheduledDateTime) {
      setFeedback({ type: "error", message: "Please select a future date and time for scheduling!" });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("platform", platform);
      formData.append("caption", caption);
      if (title) formData.append("title", title);

      if (selectedFile) {
        formData.append("media", selectedFile);
      }

      if (isScheduled && scheduledDateTime) {
        formData.append("isScheduled", "true");
        formData.append("postTime", new Date(scheduledDateTime).toISOString());
      }

      const token = Cookies.get("token");
      const res = await api.post(`${BACKEND}/social-media/publish`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.status || res.data?.success) {
        setFeedback({
          type: "success",
          message: res.data.message || (isScheduled ? "Post scheduled successfully!" : "Post published successfully!"),
        });
        // Reset form
        setTitle("");
        setCaption("");
        setSelectedFile(null);
        setIsScheduled(false);
        setScheduledDateTime("");
      } else {
        throw new Error(res.data?.message || "Publishing failed");
      }
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      console.error("Publishing Error:", err);
      setFeedback({
        type: "error",
        message: errObj.response?.data?.message || errObj.message || "Publishing failed. Ensure your account is connected.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />

      {/* Header */}
      <header className="mb-6 border-b border-slate-200/80 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
          Publisher & Scheduler Engine
        </div>
        <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Publish & Schedule Content
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Format, configure, and post immediately or schedule for future publication across your social channels.
        </p>
      </header>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`mb-6 flex items-center justify-between rounded-xl p-4 text-xs font-semibold shadow-sm transition-all ${
            feedback.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600" />
            )}
            <span>{feedback.message}</span>
          </div>

          {feedback.type === "success" && (
            <Link
              href="/dashboard/calendar"
              className="rounded-lg bg-emerald-600 px-3 py-1 text-[11px] text-white font-semibold hover:bg-emerald-700"
            >
              View Calendar
            </Link>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Select Platform */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <label className="mb-3 block text-xs font-bold text-slate-900 uppercase tracking-wider">
            1. Select Target Social Platform <span className="text-rose-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { id: "linkedin", label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4 text-blue-500" /> },
              { id: "facebook", label: "Facebook", icon: <FacebookIcon className="h-4 w-4 text-blue-600" /> },
              { id: "instagram", label: "Instagram", icon: <InstagramIcon className="h-4 w-4 text-pink-500" /> },
              { id: "youtube", label: "YouTube", icon: <YoutubeIcon className="h-4 w-4 text-red-500" /> },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlatform(item.id)}
                className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                  platform === item.id
                    ? "border-rose-500 bg-rose-50/50 text-slate-900 shadow-xs ring-1 ring-rose-500"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Content Fields & Media Drag and Drop */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
            2. Post Content & Media Asset
          </label>

          {platform === "youtube" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-slate-600">
                Video Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., 10 Tips for Software Engineers in 2026"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 outline-none focus:border-rose-500 focus:bg-white"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-slate-600">
              Post Caption / Message
            </label>
            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Type your caption, links, or description..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 outline-none focus:border-rose-500 focus:bg-white"
            />
          </div>

          {/* Media Drag & Drop Zone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-slate-600">
              Media File (Image or Video)
            </label>

            {selectedFile ? (
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[300px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all cursor-pointer ${
                  isDragging
                    ? "border-rose-500 bg-rose-500/5"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/50"
                }`}
              >
                <UploadCloud className="h-8 w-8 text-rose-500 mb-2" />
                <p className="text-xs font-bold text-slate-800">
                  Click or drag and drop media file here
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Supports MP4, MOV, JPG, PNG, WebP
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Publishing Mode (Now vs Schedule) */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
            3. Publishing Schedule Mode
          </label>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsScheduled(false)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                !isScheduled
                  ? "border-rose-500 bg-rose-50 text-rose-700 ring-1 ring-rose-500"
                  : "border-slate-200 bg-slate-50/50 text-slate-600"
              }`}
            >
              <Send className="h-4 w-4" />
              <span>Publish Now</span>
            </button>

            <button
              type="button"
              onClick={() => setIsScheduled(true)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                isScheduled
                  ? "border-amber-500 bg-amber-50 text-amber-800 ring-1 ring-amber-500"
                  : "border-slate-200 bg-slate-50/50 text-slate-600"
              }`}
            >
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Schedule Post</span>
            </button>
          </div>

          {isScheduled && (
            <div className="flex flex-col gap-1.5 pt-2 animate-fade-in">
              <label className="text-[11px] font-semibold text-slate-600">
                Select Date & Time for Publishing <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={scheduledDateTime}
                onChange={(e) => setScheduledDateTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          )}
        </section>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={uploading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-xs font-bold text-white shadow-xl transition-all hover:bg-rose-600 active:scale-[0.98] disabled:opacity-50"
        >
          {uploading ? (
            <span>Processing & Transferring...</span>
          ) : isScheduled ? (
            <>
              <Clock className="h-4 w-4" />
              <span>Schedule Post for {platform.toUpperCase()}</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Publish Now to {platform.toUpperCase()}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
