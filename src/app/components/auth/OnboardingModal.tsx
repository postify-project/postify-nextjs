"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<"INFLUENCER" | "BUSINESS" | "">("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);

  // Skip Onboarding Flow
  const handleSkip = () => {
    localStorage.setItem("postify_onboarding_skipped", "true");
    onClose();
    router.push("/dashboard");
  };

  // Website Scraping Handler
  const handleScrape = async () => {
    if (!websiteUrl) return;
    setIsScraping(true);
    try {
      const res = await fetch("/api/brand/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: websiteUrl }),
      });
      const data = await res.json();

      if (res.ok && data.brandKit) {
        localStorage.setItem("postify_brand_kit", JSON.stringify(data.brandKit));
        localStorage.removeItem("postify_onboarding_skipped");
        onClose();
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Scraping failed", err);
    } finally {
      setIsScraping(false);
    }
  };

  const handleManualFinish = () => {
    localStorage.setItem("postify_account_type", accountType);
    localStorage.removeItem("postify_onboarding_skipped");
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e1017] p-6 text-white shadow-2xl">
        
        {/* Header & Skip Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-xs text-purple-400">Step {step} of 2</span>
          <button
            onClick={handleSkip}
            className="cursor-pointer text-xs text-neutral-400 transition-colors hover:text-white"
          >
            Skip for now &rarr;
          </button>
        </div>

        {/* Website Auto-Scraper Banner */}
        <div className="my-5 rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5">
          <label className="mb-1.5 block text-[11px] font-semibold text-purple-300">
            ✨ Fast Track: Import Brand from Website
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white outline-none focus:border-purple-500"
            />
            <button
              onClick={handleScrape}
              disabled={isScraping || !websiteUrl}
              className="cursor-pointer rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-purple-500 disabled:opacity-50"
            >
              {isScraping ? "Scraping..." : "Auto-Fill"}
            </button>
          </div>
        </div>

        <div className="relative my-4 flex items-center justify-center">
          <span className="bg-[#0e1017] px-2 text-[10px] uppercase tracking-widest text-neutral-500">
            Or select manually
          </span>
        </div>

        {/* Step 1: Account Type Cards */}
        {step === 1 && (
          <div>
            <h2 className="mb-1 text-base font-bold text-white">What best describes you?</h2>
            <p className="mb-4 text-xs text-neutral-400">This helps us customize your AI features.</p>

            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setAccountType("INFLUENCER")}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  accountType === "INFLUENCER"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="mb-2 text-2xl">🤳</div>
                <h3 className="text-xs font-bold text-white">Content Creator</h3>
                <p className="mt-1 text-[10px] text-neutral-400">Focus on viral posts, thumbnails, and reach.</p>
              </div>

              <div
                onClick={() => setAccountType("BUSINESS")}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  accountType === "BUSINESS"
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="mb-2 text-2xl">💼</div>
                <h3 className="text-xs font-bold text-white">Business / E-com</h3>
                <p className="mt-1 text-[10px] text-neutral-400">Automate DMs, sales, lead capture, and ads.</p>
              </div>
            </div>

            <button
              disabled={!accountType}
              onClick={() => setStep(2)}
              className="mt-6 w-full cursor-pointer rounded-lg bg-purple-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-purple-500 disabled:opacity-50"
            >
              Continue &rarr;
            </button>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div>
            <h2 className="mb-1 text-base font-bold text-white">You&apos;re All Set!</h2>
            <p className="mb-4 text-xs text-neutral-400">
              You can fine-tune brand colors, logo, and tones anytime inside Settings.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 cursor-pointer rounded-lg border border-white/10 py-2.5 text-xs font-medium text-white hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={handleManualFinish}
                className="w-2/3 cursor-pointer rounded-lg bg-purple-600 py-2.5 text-xs font-semibold text-white hover:bg-purple-500"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}