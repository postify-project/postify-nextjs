"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { Trash2, Link2, CheckCircle2, AlertCircle } from "lucide-react";
import { YoutubeIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/app/components/icons/SocialIcons";

interface SocialAccountData {
  _id: string;
  platform: string; // youtube, facebook, instagram, linkedin
  accountName: string;
  platformAccountId: string;
  createdAt: string;
}

export default function PlatformConnectionsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 animate-pulse">Loading connections console...</div>}>
      <ConnectionsContent />
    </Suspense>
  );
}

function ConnectionsContent() {
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<SocialAccountData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const getToken = () => {
    return (
      Cookies.get("token") ||
      localStorage.getItem("token") ||
      Cookies.get("authToken") ||
      localStorage.getItem("authToken") ||
      ""
    );
  };

  const fetchConnectedAccounts = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (token) {
        const res = await api.get(`${BACKEND}/social-media/accounts`);
        const accountsList = res.data?.data || res.data?.accounts || (Array.isArray(res.data) ? res.data : []);
        if (Array.isArray(accountsList)) {
          setAccounts(accountsList);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch connected social accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedAccounts();

    // Check OAuth return query params
    const status = searchParams.get("status");
    const platformParam = searchParams.get("platform");
    const errorParam = searchParams.get("error");

    if (status === "success") {
      setToastMsg({
        type: "success",
        text: `Successfully connected ${platformParam ? platformParam.toUpperCase() : "Social"} account!`,
      });
    } else if (status === "error" || errorParam) {
      setToastMsg({
        type: "error",
        text: `OAuth connection failed: ${errorParam || "Unknown error"}`,
      });
    }
  }, [searchParams]);

  const handleConnect = (platform: string) => {
    const token = getToken();
    if (!token) {
      alert("Session token not found. Please log in again to connect your social account.");
      window.location.href = "/login";
      return;
    }

    let connectUrl = "";

    switch (platform.toLowerCase()) {
      case "youtube":
        connectUrl = `${BACKEND}/social-media/connect/youtube`;
        break;
      case "facebook":
      case "meta":
      case "instagram":
        connectUrl = `${BACKEND}/social-media/connect/meta`;
        break;
      case "linkedin":
        connectUrl = `${BACKEND}/social-media/connect/linkedin`;
        break;
      default:
        alert(`OAuth flow for ${platform} is coming soon!`);
        return;
    }

    if (connectUrl) {
      window.location.href = `${connectUrl}?token=${token}`;
    }
  };

  const handleDisconnect = async (accountId: string, platformName: string) => {
    if (!confirm(`Are you sure you want to disconnect your ${platformName.toUpperCase()} account?`)) return;

    setDisconnectingId(accountId);
    try {
      const res = await api.delete(`${BACKEND}/social-media/accounts/${accountId}`);
      if (res.data?.status || res.data?.success) {
        setToastMsg({ type: "success", text: `Disconnected ${platformName} account successfully.` });
        setAccounts((prev) => prev.filter((a) => a._id !== accountId));
      }
    } catch (err: any) {
      console.error("Disconnect error:", err);
      setToastMsg({
        type: "error",
        text: err.response?.data?.message || `Failed to disconnect ${platformName} account.`,
      });
    } finally {
      setDisconnectingId(null);
    }
  };

  const getAccountByPlatform = (plat: string) => {
    return accounts.find((a) => a.platform.toLowerCase() === plat.toLowerCase());
  };

  return (
    <div className="relative mx-auto max-w-[1200px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-rose-400/5 blur-[100px]" />

      {/* View Header */}
      <header className="relative mb-8 border-b border-slate-200/80 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
          Integrations Hub
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-outfit sm:text-3xl">
          Platform Connections
        </h1>
        <p className="mt-1 text-xs text-slate-500 max-w-xl leading-relaxed">
          Manage authorizations, connect your social profiles, and monitor real-time publishing pipelines across YouTube, LinkedIn, Meta & Instagram.
        </p>
      </header>

      {/* Toast Notification Banner */}
      {toastMsg && (
        <div
          className={`mb-6 flex items-center justify-between rounded-xl p-4 text-xs font-semibold shadow-sm transition-all ${
            toastMsg.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toastMsg.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-600" />
            )}
            <span>{toastMsg.text}</span>
          </div>
          <button
            onClick={() => setToastMsg(null)}
            className="cursor-pointer opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Connections Canvas Grid */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 1. YouTube */}
        {loading ? (
          <SkeletonCard />
        ) : (
          <PlatformCard
            platform="youtube"
            title="YouTube Channel"
            description="Upload long-form videos and YouTube Shorts directly to your channel."
            icon={<YoutubeIcon className="h-5 w-5 text-red-600" />}
            iconBg="bg-red-50 border-red-200"
            connectedAccount={getAccountByPlatform("youtube")}
            onConnect={() => handleConnect("youtube")}
            onDisconnect={(id) => handleDisconnect(id, "youtube")}
            isDisconnecting={disconnectingId === getAccountByPlatform("youtube")?._id}
          />
        )}

        {/* 2. LinkedIn */}
        {loading ? (
          <SkeletonCard />
        ) : (
          <PlatformCard
            platform="linkedin"
            title="LinkedIn Profile / Page"
            description="Publish automated articles, text updates, and media posts to your LinkedIn audience."
            icon={<LinkedinIcon className="h-5 w-5 text-blue-600" />}
            iconBg="bg-blue-50 border-blue-200"
            connectedAccount={getAccountByPlatform("linkedin")}
            onConnect={() => handleConnect("linkedin")}
            onDisconnect={(id) => handleDisconnect(id, "linkedin")}
            isDisconnecting={disconnectingId === getAccountByPlatform("linkedin")?._id}
          />
        )}

        {/* 3. Facebook */}
        {loading ? (
          <SkeletonCard />
        ) : (
          <PlatformCard
            platform="facebook"
            title="Facebook Page"
            description="Syndicate video files and post updates directly to your Facebook business page followers."
            icon={<FacebookIcon className="h-5 w-5 text-blue-700" />}
            iconBg="bg-blue-50/80 border-blue-200"
            connectedAccount={getAccountByPlatform("facebook")}
            onConnect={() => handleConnect("facebook")}
            onDisconnect={(id) => handleDisconnect(id, "facebook")}
            isDisconnecting={disconnectingId === getAccountByPlatform("facebook")?._id}
          />
        )}

        {/* 4. Instagram */}
        {loading ? (
          <SkeletonCard />
        ) : (
          <PlatformCard
            platform="instagram"
            title="Instagram Business"
            description="Share photos, carousels, and vertical Reels directly to your Instagram feed."
            icon={<InstagramIcon className="h-5 w-5 text-pink-600" />}
            iconBg="bg-pink-50 border-pink-200"
            connectedAccount={getAccountByPlatform("instagram")}
            onConnect={() => handleConnect("facebook")}
            onDisconnect={(id) => handleDisconnect(id, "instagram")}
            isDisconnecting={disconnectingId === getAccountByPlatform("instagram")?._id}
          />
        )}
      </section>
    </div>
  );
}

// Subcomponent: Individual Platform Card
interface PlatformCardProps {
  platform: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  connectedAccount?: SocialAccountData;
  onConnect: () => void;
  onDisconnect: (id: string) => void;
  isDisconnecting?: boolean;
}

function PlatformCard({
  platform,
  title,
  description,
  icon,
  iconBg,
  connectedAccount,
  onConnect,
  onDisconnect,
  isDisconnecting,
}: PlatformCardProps) {
  const isConnected = Boolean(connectedAccount);

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isConnected ? "border-rose-200/80 shadow-rose-500/5" : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      <div>
        <header className="mb-4 flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${iconBg} shadow-sm`}>
            {icon}
          </div>

          {/* Status Badge */}
          {isConnected ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ACTIVE
            </div>
          ) : (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              OFFLINE
            </span>
          )}
        </header>

        <h3 className="text-base font-bold text-slate-900 font-outfit tracking-tight">
          {isConnected ? connectedAccount?.accountName || title : title}
        </h3>
        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
          {platform.toUpperCase()} {isConnected ? "• CONNECTED" : ""}
        </span>
        <p className="mt-1 text-xs leading-relaxed text-slate-500 max-w-[400px]">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      {isConnected ? (
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-[11px] text-slate-400">
            Connected: {new Date(connectedAccount!.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={() => onDisconnect(connectedAccount!._id)}
            disabled={isDisconnecting}
            className="cursor-pointer flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
            <span>{isDisconnecting ? "Disconnecting..." : "Disconnect"}</span>
          </button>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]"
        >
          <Link2 className="h-4 w-4" />
          <span>Connect {title}</span>
        </button>
      )}
    </div>
  );
}

// Subcomponent: Skeleton Loading Card
function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm animate-pulse h-[220px]">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 rounded-xl bg-slate-200" />
          <div className="h-5 w-16 rounded-full bg-slate-200" />
        </div>
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-3 w-48 rounded bg-slate-100" />
      </div>
      <div className="h-9 w-full rounded-xl bg-slate-200" />
    </div>
  );
}
