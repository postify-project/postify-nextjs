"use client";

import React, { useState, useRef } from "react";

interface LanguageOption {
  code: string;
  name: string;
}

interface TranslationResult {
  original: string;
  translation: string;
}

export default function VideoTranslatorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>("PK Urdu");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationProgress, setTranslationProgress] = useState<number>(0);
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [translatedResult, setTranslatedResult] = useState<TranslationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages: LanguageOption[] = [
    { code: "PK", name: "Urdu" },
    { code: "GB", name: "English" },
    { code: "IN", name: "Hindi" },
    { code: "SA", name: "Arabic" }
  ];

  const handleSelectVideo = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setTranslatedResult(null); // Reset previous layout results
    }
  };

  const startTranslation = (): void => {
    if (!selectedFile) return;
    setIsTranslating(true);
    setTranslationProgress(0);
    setTranslatedResult(null);

    const steps = [
      { progress: 20, message: "Extracting audio track from video..." },
      { progress: 50, message: "Gemini AI transcribing audio..." },
      { progress: 80, message: `Translating transcript into ${selectedLang.split(" ")[1]}...` },
      { progress: 100, message: "Translation completed!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setTranslationProgress(steps[currentStep].progress);
        setProgressMessage(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsTranslating(false);
          setTranslatedResult({
            original: "Hello everyone, welcome to the ViralSync demonstration. Today we will show you how AI can automate your viral reach.",
            translation: getMockTranslation(selectedLang)
          });
        }, 800);
      }
    }, 1200);
  };

  const getMockTranslation = (lang: string): string => {
    if (lang.includes("Urdu")) {
      return "السلام علیکم، وائرل سنک کے مظاہرے میں خوش آمدید۔ آج ہم آپ کو دکھائیں گے کہ کس طرح AI آپ کی رسائی کو خودکار بنا سکتا ہے۔";
    }
    if (lang.includes("Hindi")) {
      return "नमस्कार दोस्तों, वायरलसिंक प्रदर्शन में आपका स्वागत है। आज हम आपको दिखाएंगे कि कैसे एआई आपकी पहुंच को स्वचालित बना सकता है।";
    }
    if (lang.includes("Arabic")) {
      return "مرحباً بالجميع، أهلاً بكم في عرض ViralSync التجريبي. سنوضح لكم اليوم كيف يمكن للذكاء الاصطناعي أتمتة انتشاركم.";
    }
    return "Hello everyone, welcome to the ViralSync demonstration. Today we will show you how AI can automate your viral reach.";
  };

  return (
    <div className="mx-auto max-w-[800px] animate-fade-in p-6">
      
      {/* Page Header Layout Container */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)] border border-indigo-500/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white font-outfit sm:text-2xl">
              Video Translator
            </h1>
            <p className="mt-1 text-xs text-neutral-400">
              Listen to video audio to generate transcript + translation
            </p>
          </div>
        </div>
      </header>

      {/* Main Console Action Card Container */}
      <section className="mb-[18px] rounded-xl border border-white/5 bg-[#0f111a] p-6 shadow-xl">
        <header className="mb-5 flex items-start gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-purple-500/10 text-purple-400 border border-purple-500/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white font-outfit">Transcribe and Translate</h3>
            <p className="mt-0.5 text-[11px] text-neutral-400">
              Gemini AI converts video audio into text and translates it
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-5">
          {/* File Picker Console Row Layout */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              readOnly
              placeholder="No video selected..."
              value={selectedFile ? selectedFile.name : ""}
              className="w-full flex-grow rounded-lg border border-white/5 bg-[#090a0f] px-3.5 py-2 text-xs text-white placeholder-neutral-600 outline-none"
            />
            <button
              onClick={handleSelectVideo}
              className="flex cursor-pointer items-center justify-center gap-1.5 shrink-0 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:bg-white/[0.08]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Select Video
            </button>
            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Target Language Options Segment */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
              TARGET LANGUAGE — WHICH LANGUAGE?
            </span>
            <div className="flex flex-wrap gap-2.5">
              {languages.map((lang) => {
                const label = `${lang.code} ${lang.name}`;
                const isActive = selectedLang === label;
                return (
                  <button
                    key={label}
                    onClick={() => setSelectedLang(label)}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-purple-600 border-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                        : "bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <span className={`rounded px-1 py-0.5 text-[9px] font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-black/20 text-indigo-300"
                    }`}>
                      {lang.code}
                    </span>
                    <span>{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Dynamic Processing Progress Row */}
          {isTranslating && (
            <div className="flex flex-col gap-2 animate-fade-in">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-300"
                  style={{ width: `${translationProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-400">{progressMessage}</span>
                <span className="font-semibold text-white">{translationProgress}%</span>
              </div>
            </div>
          )}

          {/* Main Context Action Primary CTA Trigger */}
          <button
            disabled={!selectedFile || isTranslating}
            onClick={startTranslation}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-200 select-none ${
              selectedFile && !isTranslating
                ? "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:-translate-y-[1px] hover:bg-purple-500 hover:shadow-[0_4px_24px_rgba(147,51,234,0.45)]"
                : "bg-white/[0.02] text-neutral-500 border border-white/4 cursor-not-allowed opacity-50"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            Transcribe & Translate
          </button>
        </div>
      </section>

      {/* Generated Content Output Panels presentation block */}
      {translatedResult && (
        <section className="rounded-xl border border-white/5 bg-[#0f111a] p-[18px] shadow-xl animate-fade-in">
          <h4 className="text-sm font-semibold text-white font-outfit mb-3.5">
            Generated Output
          </h4>
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-white/[0.03] bg-[#090a0f] p-3">
              <span className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                Original Transcription (English)
              </span>
              <p className="text-xs leading-relaxed text-white">
                {translatedResult.original}
              </p>
            </div>
            
            <div className="rounded-lg border border-indigo-500/15 bg-indigo-500/[0.02] p-3">
              <span className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">
                Translated Version ({selectedLang.split(" ")[1]})
              </span>
              <p className="text-xs leading-relaxed text-white">
                {translatedResult.translation}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}