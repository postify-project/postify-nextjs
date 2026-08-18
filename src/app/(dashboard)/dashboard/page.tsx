"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import BrandBanner from "@/app/components/context/BrandBanner";
import {
  Users,
  Calendar,
  Sparkles,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Clock,
  Activity,
  Zap,
} from "lucide-react";
import { YoutubeIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/app/components/icons/SocialIcons";

interface SocialAccount {
  _id: string;
  platform: string;
  accountName: string;
  createdAt: string;
}

interface ScheduledPost {
  _id: string;
  platform: string;
  title?: string;
  caption?: string;
  scheduledAt: string;
  status: string;
}

export default function AnalyticsDashboardPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [activePlatform] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const fetchDashboardData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const token = Cookies.get("token");
      if (token) {
        // 1. Fetch connected accounts
        const accRes = await api.get(`${BACKEND}/social-media/accounts`);
        if (accRes.data?.success && Array.isArray(accRes.data?.data)) {
          setAccounts(accRes.data.data);
        } else if (Array.isArray(accRes.data)) {
          setAccounts(accRes.data);
        }

        // 2. Fetch scheduled posts
        const schedRes = await api.get(`${BACKEND}/social-media/scheduled`);
        if (schedRes.data?.status && Array.isArray(schedRes.data?.data)) {
          setScheduledPosts(schedRes.data.data);
        }
      }
    } catch (err) {
      console.warn("Error loading dashboard metrics:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [BACKEND]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDashboardData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchDashboardData]);

  const pendingPosts = scheduledPosts.filter((p) => p.status === "pending");
  const publishedCount = scheduledPosts.filter((p) => p.status === "published").length;

  return (
    <div className="mx-auto max-w-6xl animate-fade-in font-inter text-slate-800 antialiased selection:bg-rose-500/20 p-6">
      {/* Brand Alert Banner */}
      <BrandBanner />

      {/* Page Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
            Live Automation Suite
          </div>
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Analytics & Operations
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Real-time publishing queue, platform integrations, and AI engagement console.
          </p>
        </div>

        {/* Sync Button */}
        <button
          onClick={fetchDashboardData}
          disabled={isRefreshing}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${
              isRefreshing ? "animate-spin text-rose-600" : "text-slate-500"
            }`}
          />
          <span>Sync Operations</span>
        </button>
      </header>

      {/* Metrics Stat Grid */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Connected Accounts */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-rose-500/5 transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Connected Channels
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-outfit text-3xl font-extrabold text-slate-900">
              {loading ? "..." : accounts.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Platforms active</span>
          </div>
        </div>

        {/* Card 2: Pending Scheduled Posts */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-rose-500/5 transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Scheduled Queue
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-outfit text-3xl font-extrabold text-slate-900">
              {loading ? "..." : pendingPosts.length}
            </span>
            <span className="text-xs text-amber-600 font-semibold">Upcoming posts</span>
          </div>
        </div>

        {/* Card 3: Published Posts */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-rose-500/5 transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Published Posts
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-outfit text-3xl font-extrabold text-slate-900">
              {loading ? "..." : publishedCount}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Completed</span>
          </div>
        </div>

        {/* Card 4: AI Auto-Reply System */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-rose-500/5 transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              AI Auto-Reply
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-outfit text-xl font-bold text-slate-900">
              10 Min Cron
            </span>
            <span className="text-xs text-rose-600 font-semibold">Active</span>
          </div>
        </div>
      </section>

      {/* Connected Channels & Quick Schedule split */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Active Social Connections */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-outfit text-base font-bold text-slate-900">
                Connected Platforms
              </h3>
              <p className="text-xs text-slate-500">
                Your authenticated social media publishing pipelines.
              </p>
            </div>
            <Link
              href="/dashboard/connections"
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
            >
              <span>Manage</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-slate-100/70 animate-pulse" />
              ))}
            </div>
          ) : accounts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
              <p className="text-xs text-slate-500 mb-3">No social channels connected yet.</p>
              <Link
                href="/dashboard/connections"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-600"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Connect Your First Account</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((acc) => (
                <div
                  key={acc._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:bg-slate-100/80"
                >
                  <div className="flex items-center gap-3">
                    {acc.platform.toLowerCase() === "youtube" && (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600">
                        <YoutubeIcon className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {acc.platform.toLowerCase() === "linkedin" && (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600">
                        <LinkedinIcon className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {acc.platform.toLowerCase() === "facebook" && (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-700">
                        <FacebookIcon className="h-4 w-4 text-blue-700" />
                      </div>
                    )}
                    {acc.platform.toLowerCase() === "instagram" && (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-200 bg-pink-50 text-pink-600">
                        <InstagramIcon className="h-4 w-4 text-pink-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{acc.accountName}</h4>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        {acc.platform}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right: Upcoming Scheduled Queue */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-outfit text-base font-bold text-slate-900">
                Upcoming Queue
              </h3>
              <p className="text-xs text-slate-500">
                Posts ready to be published by background cron worker.
              </p>
            </div>
            <Link
              href="/dashboard/calendar"
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
            >
              <span>Calendar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-slate-100/70 animate-pulse" />
              ))}
            </div>
          ) : pendingPosts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
              <p className="text-xs text-slate-500 mb-3">No pending scheduled posts.</p>
              <Link
                href="/dashboard/video-upload"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Schedule a Post</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingPosts.slice(0, 4).map((post) => (
                <div
                  key={post._id}
                  className="flex items-center justify-between rounded-xl border border-amber-200/70 bg-amber-50/30 p-3.5"
                >
                  <div className="space-y-1 max-w-[240px]">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 uppercase">
                        {post.platform}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(post.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {post.title || post.caption || "Scheduled Post"}
                    </p>
                  </div>

                  <Link
                    href="/dashboard/calendar"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
