"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

const ACCOUNT_TYPES = ["Business / Company", "Influencer / Creator"];

const INDUSTRIES = [
  "B2B SaaS & Tech",
  "E-commerce & Retail",
  "Digital Marketing & Agency",
  "Finance & Fintech",
  "Healthcare & Wellness",
  "Education & EdTech",
  "Real Estate",
  "Gaming & Entertainment",
];

const CREATOR_NICHES = [
  "Software Development & AI",
  "Tech Productivity & Tools",
  "Fitness, Diet & Lifestyle",
  "Business, Crypto & Investing",
  "Design & Creative Arts",
  "Fashion & Beauty",
  "Gaming & Streaming",
];

const TONE_ARCHETYPES = [
  "Professional & Corporate",
  "Authoritative & Expert",
  "Casual & Friendly",
  "Witty, Sarcastic & High Energy",
  "Educational & Informative",
  "Motivational & Inspirational",
];

const CREATOR_PERSONAS = [
  "The Educational Mentor (Informative & Clear)",
  "The Relatable Friend (Casual & Honest)",
  "High-Energy Hype (Punchy & Viral Hooks)",
  "Thought Leader (Opinionated & Technical)",
  "The Curious Builder (Raw & Behind-the-Scenes)",
];

const IMAGERY_STYLES = [
  "Minimalist & Light Mode",
  "Bold, Vibrant & Neon",
  "Real Photography & Clean",
  "Memes, Edgy & High-Energy",
  "Technical Diagrams & Vectors",
];

const CONTENT_FORMATS = [
  "Short-form Reels & Shorts",
  "Multi-page Carousel Guides",
  "Text Threads & Short Tips",
  "Single Image Quotes & Banners",
];

const EMOJI_RULES = [
  "Heavy (3-5 emojis per sentence)",
  "Moderate (Bullet points & key accents)",
  "Minimal (1-2 total in caption)",
  "None (Clean corporate text only)",
];

const CALL_TO_ACTIONS = [
  "Link in bio for more details",
  "Comment below your thoughts",
  "Save this post for later",
  "Share this with a friend",
  "DM me 'GROWTH' to start",
];

interface BrandKitSectionProps {
  isModalOpen?: boolean;
  setIsModalOpen?: (open: boolean) => void;
}

export default function BrandKitSection({
  isModalOpen: externalIsModalOpen,
  setIsModalOpen: externalSetIsModalOpen,
}: BrandKitSectionProps) {
  const [internalIsModalOpen, setInternalIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isModalOpen = externalIsModalOpen ?? internalIsModalOpen;
  const setIsModalOpen = externalSetIsModalOpen ?? setInternalIsModalOpen;

  const [brandData, setBrandData] = useState({
    accountType: "Business / Company",
    brandName: "",
    brandTagline: "",
    brandDescription: "",
    industry: "B2B SaaS & Tech",
    creatorNiche: "Software Development & AI",
    website: "",
    primaryColor: "#ec4899",
    secondaryColor: "#1e293b",
    logoUrl: "",
    tone: "Professional & Corporate",
    creatorPersona: "The Educational Mentor (Informative & Clear)",
    imageryStyle: "Minimalist & Light Mode",
    contentFormat: "Short-form Reels & Shorts",
    emojiRule: "Moderate (Bullet points & key accents)",
    primaryCTA: "Link in bio for more details",
    keywords: "saas, nextjs, ai tools, webdev",
    hashtags: "#buildinpublic #indiehackers #postify",
  });

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    const checkSaved = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const res = await api.get(`${BACKEND}/profile/brand-context`);
          if (res.data?.success && res.data?.data) {
            const serverData = res.data.data;
            if (serverData.brandName || serverData.brandDescription || serverData.website) {
              setBrandData((prev) => ({ ...prev, ...serverData }));
              setIsFinished(true);
              localStorage.setItem("postify_brand_kit", JSON.stringify(serverData));
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Failed to load brand context from MongoDB server:", err);
      }

      // Fallback to localStorage if offline/server unavailable
      const stored = localStorage.getItem("postify_brand_kit");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setBrandData(parsed);
          if (parsed.brandName || parsed.logoUrl) {
            setIsFinished(true);
          }
        } catch (e) {
          console.error("Error reading localStorage", e);
        }
      }
      setIsLoading(false);
    };

    checkSaved();

    const handleOpenGlobalModal = () => setIsModalOpen(true);
    window.addEventListener("postify_open_brand_modal", handleOpenGlobalModal);
    window.addEventListener("storage", checkSaved);

    return () => {
      window.removeEventListener(
        "postify_open_brand_modal",
        handleOpenGlobalModal,
      );
      window.removeEventListener("storage", checkSaved);
    };
  }, [setIsModalOpen, BACKEND]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "postify_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data.secure_url) {
        setBrandData((prev) => ({ ...prev, logoUrl: data.secure_url }));
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDetails = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      if (token) {
        await api.post(`${BACKEND}/profile/brand-context`, brandData);
      }
    } catch (err) {
      console.error("Failed to save brand context to MongoDB:", err);
    } finally {
      localStorage.setItem("postify_brand_kit", JSON.stringify(brandData));
      localStorage.removeItem("postify_onboarding_skipped");
      setIsFinished(true);
      setIsModalOpen(false);
      setIsLoading(false);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleDeleteDetails = async () => {
    if (!confirm("Are you sure you want to delete and reset your Brand Context from the database?")) return;
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      if (token) {
        await api.delete(`${BACKEND}/profile/brand-context`);
      }
    } catch (err) {
      console.error("Failed to delete brand context from MongoDB:", err);
    } finally {
      const defaultState = {
        accountType: "Business / Company",
        brandName: "",
        brandTagline: "",
        brandDescription: "",
        industry: "B2B SaaS & Tech",
        creatorNiche: "Software Development & AI",
        website: "",
        primaryColor: "#ec4899",
        secondaryColor: "#1e293b",
        logoUrl: "",
        tone: "Professional & Corporate",
        creatorPersona: "The Educational Mentor (Informative & Clear)",
        imageryStyle: "Minimalist & Light Mode",
        contentFormat: "Short-form Reels & Shorts",
        emojiRule: "Moderate (Bullet points & key accents)",
        primaryCTA: "Link in bio for more details",
        keywords: "",
        hashtags: "",
      };
      setBrandData(defaultState);
      localStorage.removeItem("postify_brand_kit");
      setIsFinished(false);
      setIsModalOpen(false);
      setIsLoading(false);
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="space-y-6 font-inter text-slate-800">
      {/* Top Banner Control Box */}
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 md:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h3 className="font-outfit text-xl font-bold tracking-tight text-slate-900">
                Brand Kit & Voice Engine
              </h3>
              {isLoading ? (
                <span className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
              ) : isFinished ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
                  Configured
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />{" "}
                  Pending
                </span>
              )}
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xl">
              Set your target audience, colors, and tone guidelines to let AI
              auto-craft posts tailored specifically to your agency or creator
              handle.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 cursor-pointer rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-600 hover:shadow-rose-500/10 active:scale-[0.98]"
          >
            {isFinished ? "Edit Parameters" : "Configure Brand Kit"}
          </button>
        </div>
      </div>

      {/* Active Brand Overview Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-outfit text-sm font-bold text-slate-900">
              Active Identity Overview
            </h3>
            <p className="text-xs text-slate-500">
              Live configurations stored locally on your device.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Manage
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-3"
              >
                <div className="h-3 w-16 rounded bg-slate-200" />
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-24 rounded bg-slate-200" />
                    <div className="h-2.5 w-32 rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Identity Tile */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-200">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Brand & Logo
              </span>
              <div className="flex items-center gap-3">
                {brandData.logoUrl ? (
                  <img
                    src={brandData.logoUrl}
                    alt="Logo"
                    className="h-9 w-9 rounded-lg border border-slate-200 object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white font-outfit text-xs font-bold text-slate-800 shadow-sm">
                    {brandData.brandName ? brandData.brandName[0] : "P"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <span className="block truncate font-outfit text-xs font-bold text-slate-900">
                    {brandData.brandName || "Unconfigured"}
                  </span>
                  <span className="block truncate text-[11px] text-slate-500">
                    {brandData.brandTagline || "No tagline assigned"}
                  </span>
                </div>
              </div>
            </div>

            {/* Classification Tile */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-200">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Classification & Persona
              </span>
              <p className="font-outfit text-xs font-bold text-rose-600">
                {brandData.accountType}
              </p>
              <p className="mt-0.5 truncate text-[11px] font-medium text-slate-600">
                {brandData.accountType === "Influencer / Creator"
                  ? brandData.creatorPersona
                  : brandData.tone}
              </p>
            </div>

            {/* Palette Tile */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-200">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Color Palette
              </span>
              <div className="mt-2.5 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border border-slate-300 shadow-sm"
                    style={{ backgroundColor: brandData.primaryColor }}
                  />
                  <span className="font-mono text-xs text-slate-600">
                    {brandData.primaryColor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border border-slate-300 shadow-sm"
                    style={{ backgroundColor: brandData.secondaryColor }}
                  />
                  <span className="font-mono text-xs text-slate-600">
                    {brandData.secondaryColor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LANDSCAPE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm transition-opacity">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 text-slate-800 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-outfit text-xl font-bold tracking-tight text-slate-900">
                  Brand Kit Setup
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Define structural parameters for your custom AI publishing
                  pipeline.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Account Type Tabs */}
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100/80 p-1">
                  {ACCOUNT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setBrandData({ ...brandData, accountType: type })
                      }
                      className={`rounded-lg py-2 text-xs font-semibold transition-all duration-150 ${
                        brandData.accountType === type
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Identity */}
              <div className="space-y-3">
                <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-slate-900">
                  Core Identity
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      {brandData.accountType === "Influencer / Creator"
                        ? "Creator / Channel Name"
                        : "Brand Name"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Postify"
                      value={brandData.brandName}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          brandName: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Tagline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI Social Engine for Developers"
                      value={brandData.brandTagline}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          brandTagline: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700">
                    Brand Context
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what your brand does, target users, and key product goals..."
                    value={brandData.brandDescription}
                    onChange={(e) =>
                      setBrandData({
                        ...brandData,
                        brandDescription: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Niche & Assets */}
              <div className="space-y-3">
                <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-slate-900">
                  Niche & Assets
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {brandData.accountType === "Business / Company" ? (
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        Industry
                      </label>
                      <select
                        value={brandData.industry}
                        onChange={(e) =>
                          setBrandData({
                            ...brandData,
                            industry: e.target.value,
                          })
                        }
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                      >
                        {INDUSTRIES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        Niche
                      </label>
                      <select
                        value={brandData.creatorNiche}
                        onChange={(e) =>
                          setBrandData({
                            ...brandData,
                            creatorNiche: e.target.value,
                          })
                        }
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                      >
                        {CREATOR_NICHES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      {brandData.accountType === "Influencer / Creator"
                        ? "Persona"
                        : "Tone Archetype"}
                    </label>
                    <select
                      value={
                        brandData.accountType === "Influencer / Creator"
                          ? brandData.creatorPersona
                          : brandData.tone
                      }
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          [brandData.accountType === "Influencer / Creator"
                            ? "creatorPersona"
                            : "tone"]: e.target.value,
                        })
                      }
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                    >
                      {(brandData.accountType === "Influencer / Creator"
                        ? CREATOR_PERSONAS
                        : TONE_ARCHETYPES
                      ).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Logo Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="w-full cursor-pointer text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                    />
                    {isUploading && (
                      <p className="mt-1.5 text-[10px] font-medium text-rose-600 animate-pulse">
                        Uploading to Cloudinary...
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandData.primaryColor}
                        onChange={(e) =>
                          setBrandData({
                            ...brandData,
                            primaryColor: e.target.value,
                          })
                        }
                        className="h-9 w-10 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                      />
                      <input
                        type="text"
                        value={brandData.primaryColor}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Secondary Accent
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandData.secondaryColor}
                        onChange={(e) =>
                          setBrandData({
                            ...brandData,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="h-9 w-10 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                      />
                      <input
                        type="text"
                        value={brandData.secondaryColor}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Formatting & Strategy */}
              <div className="space-y-3">
                <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-slate-900">
                  Formatting & Rules
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Visual Style
                    </label>
                    <select
                      value={brandData.imageryStyle}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          imageryStyle: e.target.value,
                        })
                      }
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                    >
                      {IMAGERY_STYLES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Post Format
                    </label>
                    <select
                      value={brandData.contentFormat}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          contentFormat: e.target.value,
                        })
                      }
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                    >
                      {CONTENT_FORMATS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Emoji Usage
                    </label>
                    <select
                      value={brandData.emojiRule}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          emojiRule: e.target.value,
                        })
                      }
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                    >
                      {EMOJI_RULES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Primary Call-To-Action
                    </label>
                    <select
                      value={brandData.primaryCTA}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          primaryCTA: e.target.value,
                        })
                      }
                      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900"
                    >
                      {CALL_TO_ACTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Target Keywords
                    </label>
                    <input
                      type="text"
                      value={brandData.keywords}
                      onChange={(e) =>
                        setBrandData({ ...brandData, keywords: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Default Hashtags
                    </label>
                    <input
                      type="text"
                      value={brandData.hashtags}
                      onChange={(e) =>
                        setBrandData({ ...brandData, hashtags: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              {isFinished ? (
                <button
                  type="button"
                  onClick={handleDeleteDetails}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100 hover:text-rose-800"
                >
                  Delete Brand Kit
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDetails}
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-600 active:scale-[0.98]"
                >
                  Save Brand Parameters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
