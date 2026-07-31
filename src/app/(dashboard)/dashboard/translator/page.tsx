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
  const [translatedResult, setTranslatedResult] =
    useState<TranslationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages: LanguageOption[] = [
    { code: "PK", name: "Urdu" },
    { code: "GB", name: "English" },
    { code: "IN", name: "Hindi" },
    { code: "SA", name: "Arabic" },
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
      {
        progress: 80,
        message: `Translating transcript into ${selectedLang.split(" ")[1]}...`,
      },
      { progress: 100, message: "Translation completed!" },
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
            original:
              "Hello everyone, welcome to the Postify demonstration. Today we will show you how AI can automate your viral reach.",
            translation: getMockTranslation(selectedLang),
          });
        }, 800);
      }
    }, 1200);
  };

  const getMockTranslation = (lang: string): string => {
    if (lang.includes("Urdu")) {
      return "السلام علیکم، پوسٹی فائ کے مظاہرے میں خوش آمدید۔ آج ہم آپ کو دکھائیں گے کہ کس طرح AI آپ کی رسائی کو خودکار بنا سکتا ہے۔";
    }
    if (lang.includes("Hindi")) {
      return "नमस्कार दोस्तों, पोस्टिफ़ाई प्रदर्शन में आपका स्वागत है। आज हम आपको दिखाएंगे कि कैसे एआई आपकी पहुंच को स्वचालित बना सकता है।";
    }
    if (lang.includes("Arabic")) {
      return "مرحباً بالجميع، أهلاً بكم في عرض Postify التجريبي. سنوضح لكم اليوم كيف يمكن للذكاء الاصطناعي أتمتة انتشاركم.";
    }
    return "Hello everyone, welcome to the Postify demonstration. Today we will show you how AI can automate your viral reach.";
  };

  return (
    <div className="relative mx-auto max-w-[850px] animate-fade-in p-6 font-inter text-slate-800 antialiased selection:bg-rose-500/20">
      {/* Light Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px]" />

      {/* Page Header Layout Container */}
      <header className="mb-8 border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div>
            <h1 className="font-outfit text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Video Translator
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Listen to video audio to generate transcript + translation
            </p>
          </div>
        </div>
      </header>

      {/* Main Console Action Card Container */}
      <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
        <header className="mb-5 flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-outfit text-base font-bold text-slate-900">
              Transcribe and Translate
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
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
              className="w-full flex-grow rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none"
            />
            <button
              onClick={handleSelectVideo}
              className="flex cursor-pointer items-center justify-center gap-1.5 shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:bg-slate-100 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
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
                    className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-150 active:scale-95 ${
                      isActive
                        ? "border-rose-600 bg-rose-600 text-white shadow-sm shadow-rose-600/20"
                        : "border-slate-200 bg-slate-50/60 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
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
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${translationProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">{progressMessage}</span>
                <span className="font-bold text-slate-800">
                  {translationProgress}%
                </span>
              </div>
            </div>
          )}

          {/* Main Context Action Primary CTA Trigger */}
          <button
            disabled={!selectedFile || isTranslating}
            onClick={startTranslation}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all duration-200 select-none ${
              selectedFile && !isTranslating
                ? "bg-rose-600 text-white shadow-sm shadow-rose-600/10 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98]"
                : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 opacity-60"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            Transcribe & Translate
          </button>
        </div>
      </section>

      {/* Generated Content Output Panels presentation block */}
      {translatedResult && (
        <section className="animate-fade-in rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl">
          <h4 className="font-outfit mb-4 text-base font-bold text-slate-900">
            Generated Output
          </h4>
          <div className="flex flex-col gap-3.5">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <span className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                Original Transcription (English)
              </span>
              <p className="text-xs leading-relaxed text-slate-800">
                {translatedResult.original}
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4">
              <span className="mb-1.5 block text-[10px] font-bold tracking-wider text-rose-600 uppercase">
                Translated Version ({selectedLang.split(" ")[1]})
              </span>
              <p className="text-xs leading-relaxed text-slate-900 font-medium">
                {translatedResult.translation}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
