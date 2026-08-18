"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { History, RefreshCw, MessageSquare, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { YoutubeIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/app/components/icons/SocialIcons";

interface AutoReplyLog {
  _id: string;
  platform: string;
  postId: string;
  commentId: string;
  originalComment: string;
  generatedReply: string;
  sentiment?: string;
  createdAt: string;
}

interface ScheduledPostLog {
  _id: string;
  platform: string;
  title?: string;
  caption?: string;
  scheduledAt: string;
  status: string;
  errorMessage?: string;
}

export default function TaskHistoryPage() {
  const [replyLogs, setReplyLogs] = useState<AutoReplyLog[]>([]);
  const [scheduledLogs, setScheduledLogs] = useState<ScheduledPostLog[]>([]);
  const [activeTab, setActiveTab] = useState<"replies" | "scheduled">("replies");
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const fetchHistory = async () => {
    setIsRefreshing(true);
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (token) {
        // 1. Fetch Auto-Reply History
        const replyRes = await api.get(`${BACKEND}/cron/auto-reply/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (replyRes.data?.success && replyRes.data?.data?.replies) {
          setReplyLogs(replyRes.data.data.replies);
        }

        // 2. Fetch Scheduled Posts History
        const schedRes = await api.get(`${BACKEND}/social-media/scheduled`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (schedRes.data?.status && Array.isArray(schedRes.data?.data)) {
          setScheduledLogs(schedRes.data.data);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch history logs:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [BACKEND]);

  const renderPlatformIcon = (plat: string) => {
    switch (plat.toLowerCase()) {
      case "youtube":
        return <YoutubeIcon className="h-4 w-4 text-red-500" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4 text-blue-500" />;
      case "facebook":
        return <FacebookIcon className="h-4 w-4 text-blue-600" />;
      case "instagram":
        return <InstagramIcon className="h-4 w-4 text-pink-500" />;
      default:
        return <History className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative mx-auto max-w-[1200px] animate-fade-in p-6 font-inter text-slate-800 antialiased">
      {/* Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
            Audit & System Traces
          </div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Task & Operation Logs
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Review automated AI comment auto-replies, post publishing logs, and cron background tasks.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          disabled={isRefreshing}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-rose-600" : "text-slate-500"}`} />
          <span>Refresh History</span>
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/60 p-1 w-fit">
        <button
          onClick={() => setActiveTab("replies")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "replies"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5 text-rose-500" />
          <span>AI Auto-Reply Logs ({replyLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("scheduled")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "scheduled"
              ? "bg-white text-slate-900 shadow-xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Calendar className="h-3.5 w-3.5 text-amber-500" />
          <span>Post Publishing Queue ({scheduledLogs.length})</span>
        </button>
      </div>

      {/* Main Content Feed */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-100/70 animate-pulse" />
          ))}
        </div>
      ) : activeTab === "replies" ? (
        replyLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <MessageSquare className="h-10 w-10 text-slate-300 mb-3" />
            <h3 className="font-outfit text-sm font-bold text-slate-900">No Auto-Reply History Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              When someone comments on your connected social media posts, your AI will generate replies and record them here!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {replyLogs.map((log) => (
              <div
                key={log._id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md space-y-2"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    {renderPlatformIcon(log.platform)}
                    <span className="text-xs font-bold text-slate-900 capitalize">{log.platform} Auto-Reply</span>
                    {log.sentiment && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-semibold text-slate-600 uppercase">
                        {log.sentiment}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      User Comment
                    </span>
                    <p className="text-slate-800 italic">"{log.originalComment}"</p>
                  </div>

                  <div className="rounded-xl border border-rose-200/80 bg-rose-50/40 p-3">
                    <span className="text-[9px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                      AI Generated Reply
                    </span>
                    <p className="text-slate-900 font-medium">"{log.generatedReply}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        scheduledLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <Calendar className="h-10 w-10 text-slate-300 mb-3" />
            <h3 className="font-outfit text-sm font-bold text-slate-900">No Post Publishing Logs</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Your scheduled and published posts will be tracked here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {scheduledLogs.map((log) => (
              <div
                key={log._id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {renderPlatformIcon(log.platform)}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {log.title || log.caption?.slice(0, 50) || "Scheduled Post"}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Scheduled for: {new Date(log.scheduledAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                    log.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : log.status === "pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}