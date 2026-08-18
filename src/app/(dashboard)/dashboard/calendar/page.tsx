"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { YoutubeIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/app/components/icons/SocialIcons";

interface ScheduledPost {
  _id: string;
  platform: string;
  title?: string;
  caption?: string;
  mediaUrl?: string;
  mimeType?: string;
  scheduledAt: string;
  status: "pending" | "published" | "failed";
  errorMessage?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const fetchScheduledPosts = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (token) {
        const res = await api.get(`${BACKEND}/social-media/scheduled`);
        if (res.data?.status && Array.isArray(res.data?.data)) {
          setScheduledPosts(res.data.data);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch scheduled posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledPosts();
  }, [BACKEND]);

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to cancel and delete this scheduled post?")) return;
    setDeletingId(id);
    try {
      const res = await api.delete(`${BACKEND}/social-media/scheduled/${id}`);
      if (res.data?.status || res.data?.success) {
        setScheduledPosts((prev) => prev.filter((p) => p._id !== id));
        setSelectedPost(null);
      }
    } catch (err) {
      console.error("Error cancelling scheduled post:", err);
      alert("Failed to delete scheduled post.");
    } finally {
      setDeletingId(null);
    }
  };

  // Calendar Math Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = () => setCurrentDate(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filter posts
  const filteredPosts = scheduledPosts.filter((post) => {
    if (selectedPlatform === "all") return true;
    return post.platform.toLowerCase() === selectedPlatform.toLowerCase();
  });

  const getPostsForDay = (day: number) => {
    return filteredPosts.filter((post) => {
      const postDate = new Date(post.scheduledAt);
      return (
        postDate.getFullYear() === year &&
        postDate.getMonth() === month &&
        postDate.getDate() === day
      );
    });
  };

  const renderPlatformIcon = (plat: string) => {
    switch (plat.toLowerCase()) {
      case "youtube":
        return <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />;
      case "linkedin":
        return <LinkedinIcon className="h-3.5 w-3.5 text-blue-500" />;
      case "facebook":
        return <FacebookIcon className="h-3.5 w-3.5 text-blue-600" />;
      case "instagram":
        return <InstagramIcon className="h-3.5 w-3.5 text-pink-500" />;
      default:
        return <CalendarIcon className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="relative mx-auto max-w-[1250px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      {/* Header Controls */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
            Automated Publishing Calendar
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-outfit sm:text-3xl">
            Schedule Hub
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            View, manage, and cancel upcoming scheduled posts across all your social accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchScheduledPosts}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-slate-500 ${loading ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>

          <Link
            href="/dashboard/video-upload"
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-500 active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule New Post</span>
          </Link>
        </div>
      </header>

      {/* Filter Tabs & Month Navigator */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Month Navigator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={today}
              className="px-3 py-1 text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <h2 className="font-outfit text-xl font-bold text-slate-900">
            {monthNames[month]} {year}
          </h2>
        </div>

        {/* Platform Filters */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-1.5 text-xs">
          {["all", "linkedin", "facebook", "instagram", "youtube"].map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`rounded-xl px-3 py-1.5 font-semibold transition-all capitalize cursor-pointer ${
                selectedPlatform === plat
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl">
        {/* Day Header */}
        <div className="grid grid-cols-7 border-b border-slate-200/80 bg-slate-50/70 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider py-3">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Days Grid */}
        {loading ? (
          <div className="grid grid-cols-7 gap-1 p-4">
            {Array.from({ length: 35 }).map((_, idx) => (
              <div key={idx} className="h-28 rounded-xl bg-slate-100/60 animate-pulse p-2" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 border-b border-slate-100">
            {/* Empty slots for previous month overflow */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[110px] border-r border-b border-slate-100 bg-slate-50/30 p-2" />
            ))}

            {/* Days of Current Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dayPosts = getPostsForDay(day);
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-[110px] border-r border-b border-slate-100 p-2 transition-colors hover:bg-slate-50/60 ${
                    isToday ? "bg-rose-50/30" : ""
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isToday
                          ? "bg-rose-600 text-white shadow-xs"
                          : "text-slate-700"
                      }`}
                    >
                      {day}
                    </span>
                    {dayPosts.length > 0 && (
                      <span className="text-[10px] font-bold text-slate-400">
                        {dayPosts.length} post{dayPosts.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Scheduled Posts Pinned to this day */}
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[85px]">
                    {dayPosts.map((post) => (
                      <button
                        key={post._id}
                        onClick={() => setSelectedPost(post)}
                        className={`group text-left flex items-center justify-between gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold transition-all border cursor-pointer ${
                          post.status === "pending"
                            ? "bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100"
                            : post.status === "published"
                            ? "bg-emerald-50 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100"
                            : "bg-rose-50 text-rose-900 border-rose-200/80 hover:bg-rose-100"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {renderPlatformIcon(post.platform)}
                          <span className="truncate">
                            {post.title || post.caption?.slice(0, 20) || post.platform}
                          </span>
                        </div>
                        <span className="text-[9px] opacity-70 shrink-0 font-mono">
                          {new Date(post.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: View & Delete Scheduled Post */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-in text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                {renderPlatformIcon(selectedPost.platform)}
                <h3 className="font-outfit text-base font-bold text-slate-900 capitalize">
                  {selectedPost.platform} Scheduled Post
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Scheduled Date & Time
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Clock className="h-3.5 w-3.5 text-rose-500" />
                  <span>{new Date(selectedPost.scheduledAt).toLocaleString()}</span>
                </div>
              </div>

              {selectedPost.title && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Title
                  </span>
                  <p className="font-medium text-slate-900">{selectedPost.title}</p>
                </div>
              )}

              {selectedPost.caption && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Caption
                  </span>
                  <p className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 leading-relaxed text-slate-700 max-h-32 overflow-y-auto">
                    {selectedPost.caption}
                  </p>
                </div>
              )}

              {selectedPost.mediaUrl && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Attached Media Asset
                  </span>
                  <img
                    src={selectedPost.mediaUrl}
                    alt="Scheduled media preview"
                    className="h-36 w-full rounded-xl object-cover border border-slate-200"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                onClick={() => handleDeletePost(selectedPost._id)}
                disabled={deletingId === selectedPost._id}
                className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition-all hover:bg-rose-100 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                <span>{deletingId === selectedPost._id ? "Cancelling..." : "Cancel & Delete Post"}</span>
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
