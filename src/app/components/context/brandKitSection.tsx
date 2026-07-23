"use client";

import React, { useState, useEffect } from "react";

// Preset Options for Dropdowns
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
  "Minimalist & Dark Mode",
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
  const [isUploading, setIsUploading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Sync internal/external modal state
  const isModalOpen = externalIsModalOpen ?? internalIsModalOpen;
  const setIsModalOpen = externalSetIsModalOpen ?? setInternalIsModalOpen;

  // Form State including Description
  const [brandData, setBrandData] = useState({
    accountType: "Business / Company",
    brandName: "",
    brandTagline: "",
    brandDescription: "", // Added description field
    industry: "B2B SaaS & Tech",
    creatorNiche: "Software Development & AI",
    website: "",
    primaryColor: "#8b5cf6",
    secondaryColor: "#ec4899",
    logoUrl: "",
    tone: "Professional & Corporate",
    creatorPersona: "The Educational Mentor (Informative & Clear)",
    imageryStyle: "Minimalist & Dark Mode",
    contentFormat: "Short-form Reels & Shorts",
    emojiRule: "Moderate (Bullet points & key accents)",
    primaryCTA: "Link in bio for more details",
    keywords: "saas, nextjs, ai tools, webdev",
    hashtags: "#buildinpublic #indiehackers #postify",
  });

  // Load saved details from LocalStorage & Listen for global trigger event
  useEffect(() => {
    const checkSaved = () => {
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
    };

    checkSaved();

    // Event listener to open modal directly when Banner button is clicked
    const handleOpenGlobalModal = () => setIsModalOpen(true);
    window.addEventListener("postify_open_brand_modal", handleOpenGlobalModal);
    window.addEventListener("storage", checkSaved);

    return () => {
      window.removeEventListener("postify_open_brand_modal", handleOpenGlobalModal);
      window.removeEventListener("storage", checkSaved);
    };
  }, [setIsModalOpen]);

  // Upload Logo directly to Cloudinary
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    // Replace 'postify_preset' with your Cloudinary Unsigned Upload Preset
    formData.append("upload_preset", "postify_preset");

    try {
      // Replace 'your_cloud_name' with your Cloudinary Cloud Name
      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

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

  // Save to LocalStorage & Mark Finished
  const handleSaveDetails = () => {
    localStorage.setItem("postify_brand_kit", JSON.stringify(brandData));
    localStorage.removeItem("postify_onboarding_skipped");
    setIsFinished(true);
    setIsModalOpen(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Control Box */}
      <div className="flex flex-col gap-4 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-950/30 p-6 md:flex-row md:items-center md:justify-between shadow-xl backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white tracking-tight">Brand Kit & Voice Settings</h3>
            {isFinished ? (
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                ✓ Finished
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
                Action Needed
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-300">
            Configure preset parameters so AI generates tailored posts for your channel.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-xl bg-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-purple-500 hover:scale-[1.01] active:scale-[0.99]"
        >
          {isFinished ? "Edit Brand Details" : "Start Adding Details"}
        </button>
      </div>

      {/* Active Brand Overview Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0f111a] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Active Brand Identity</h3>
            <p className="text-xs text-neutral-400">Current settings stored locally on client.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg border border-white/10 bg-[#090a0f] px-4 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:text-white"
          >
            Configure
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-[#090a0f] p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Identity & Logo</span>
            <div className="flex items-center gap-3">
              {brandData.logoUrl ? (
                <img src={brandData.logoUrl} alt="Logo" className="h-8 w-8 rounded-lg object-cover border border-white/10" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/30 text-xs font-bold text-purple-300 border border-purple-500/30">
                  {brandData.brandName ? brandData.brandName[0] : "B"}
                </div>
              )}
              <div>
                <span className="text-xs font-bold text-white block">{brandData.brandName || "Not Configured"}</span>
                <span className="text-[11px] text-neutral-400 block truncate max-w-[180px]">{brandData.brandTagline || "No tagline added"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#090a0f] p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Type & Tone</span>
            <p className="text-xs font-bold text-purple-400">{brandData.accountType}</p>
            <p className="mt-1 truncate text-[11px] text-neutral-300">
              {brandData.accountType === "Influencer / Creator" ? brandData.creatorPersona : brandData.tone}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#090a0f] p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Brand Palette</span>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: brandData.primaryColor }} />
                <span className="text-xs font-mono text-neutral-300">{brandData.primaryColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: brandData.secondaryColor }} />
                <span className="text-xs font-mono text-neutral-300">{brandData.secondaryColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LANDSCAPE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          {/* Expanded to max-w-5xl for wide Landscape view */}
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0e17] p-8 text-white shadow-2xl">
            
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Configure Brand Kit & Language</h2>
                <p className="text-xs text-neutral-400 mt-1">Select dropdown presets to shape post generation.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-lg font-bold text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Form Fields Grid - Landscape Layout */}
            <div className="space-y-6">
              
              {/* Account Type Selector Bar */}
              <div className="rounded-xl border border-white/10 bg-[#06070b] p-4">
                <label className="mb-2 block text-xs font-bold text-purple-400 uppercase tracking-wider">Account Classification</label>
                <div className="grid grid-cols-2 gap-3">
                  {ACCOUNT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBrandData({ ...brandData, accountType: type })}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                        brandData.accountType === type
                          ? "bg-purple-600 text-white border-purple-500 shadow-lg"
                          : "bg-[#0f111a] text-neutral-400 border-white/10 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 1: IDENTITY */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">1. Core Identity & Story</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">
                      {brandData.accountType === "Influencer / Creator" ? "Creator / Channel Name" : "Brand Name"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Postify"
                      value={brandData.brandName}
                      onChange={(e) => setBrandData({ ...brandData, brandName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Tagline / Hook</label>
                    <input
                      type="text"
                      placeholder="e.g. AI Social Media Engine for Creators"
                      value={brandData.brandTagline}
                      onChange={(e) => setBrandData({ ...brandData, brandTagline: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Brand Description Input */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-neutral-300">
                    Brand Story & Overview Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what your brand or channel does, your target market, core goals, and key message..."
                    value={brandData.brandDescription}
                    onChange={(e) => setBrandData({ ...brandData, brandDescription: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#06070b] p-4 text-xs text-white outline-none focus:border-purple-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* SECTION 2: DROPDOWN PRESETS (Landscape 2-Columns) */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">2. Niche, Tone & Assets</h4>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {brandData.accountType === "Business / Company" ? (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Industry / Sector</label>
                      <select
                        value={brandData.industry}
                        onChange={(e) => setBrandData({ ...brandData, industry: e.target.value })}
                        className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                      >
                        {INDUSTRIES.map((item) => (
                          <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Creator Niche</label>
                      <select
                        value={brandData.creatorNiche}
                        onChange={(e) => setBrandData({ ...brandData, creatorNiche: e.target.value })}
                        className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                      >
                        {CREATOR_NICHES.map((item) => (
                          <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">
                      {brandData.accountType === "Influencer / Creator" ? "Creator Persona" : "Brand Tone & Archetype"}
                    </label>
                    <select
                      value={brandData.accountType === "Influencer / Creator" ? brandData.creatorPersona : brandData.tone}
                      onChange={(e) =>
                        setBrandData({
                          ...brandData,
                          [brandData.accountType === "Influencer / Creator" ? "creatorPersona" : "tone"]: e.target.value,
                        })
                      }
                      className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    >
                      {(brandData.accountType === "Influencer / Creator" ? CREATOR_PERSONAS : TONE_ARCHETYPES).map((item) => (
                        <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cloudinary & Colors Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Logo Asset (Cloudinary)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="w-full cursor-pointer text-xs text-neutral-400 file:mr-3 file:rounded-xl file:border-0 file:bg-purple-600/20 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-purple-300 hover:file:bg-purple-600/30"
                    />
                    {isUploading && <p className="mt-1 text-[10px] text-purple-400">Uploading to Cloudinary...</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandData.primaryColor}
                        onChange={(e) => setBrandData({ ...brandData, primaryColor: e.target.value })}
                        className="h-10 w-12 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
                      />
                      <input
                        type="text"
                        value={brandData.primaryColor}
                        readOnly
                        className="w-full rounded-xl border border-white/10 bg-[#06070b] px-3 py-2.5 text-xs font-mono text-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Secondary Accent</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={brandData.secondaryColor}
                        onChange={(e) => setBrandData({ ...brandData, secondaryColor: e.target.value })}
                        className="h-10 w-12 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
                      />
                      <input
                        type="text"
                        value={brandData.secondaryColor}
                        readOnly
                        className="w-full rounded-xl border border-white/10 bg-[#06070b] px-3 py-2.5 text-xs font-mono text-neutral-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: FORMATTING RULES */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">3. Content Rules & Call-To-Actions</h4>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Visual & Imagery Style</label>
                    <select
                      value={brandData.imageryStyle}
                      onChange={(e) => setBrandData({ ...brandData, imageryStyle: e.target.value })}
                      className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    >
                      {IMAGERY_STYLES.map((item) => (
                        <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Preferred Post Format</label>
                    <select
                      value={brandData.contentFormat}
                      onChange={(e) => setBrandData({ ...brandData, contentFormat: e.target.value })}
                      className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    >
                      {CONTENT_FORMATS.map((item) => (
                        <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Emoji Policy</label>
                    <select
                      value={brandData.emojiRule}
                      onChange={(e) => setBrandData({ ...brandData, emojiRule: e.target.value })}
                      className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    >
                      {EMOJI_RULES.map((item) => (
                        <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Primary Call-To-Action (CTA)</label>
                    <select
                      value={brandData.primaryCTA}
                      onChange={(e) => setBrandData({ ...brandData, primaryCTA: e.target.value })}
                      className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    >
                      {CALL_TO_ACTIONS.map((item) => (
                        <option key={item} value={item} className="bg-[#0c0e17]">{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Target Keywords</label>
                    <input
                      type="text"
                      value={brandData.keywords}
                      onChange={(e) => setBrandData({ ...brandData, keywords: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-300">Default Hashtags</label>
                    <input
                      type="text"
                      value={brandData.hashtags}
                      onChange={(e) => setBrandData({ ...brandData, hashtags: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#06070b] px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDetails}
                className="cursor-pointer rounded-xl bg-purple-600 px-7 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-purple-500"
              >
                Save Details & Finish Setup
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}