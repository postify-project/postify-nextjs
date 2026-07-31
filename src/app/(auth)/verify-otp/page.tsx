"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OtpForm from "@/app/components/auth/OtpForm";

function OtpFallback() {
  return (
    <div className="w-full max-w-md bg-white border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl flex items-center justify-center">
      <p className="text-sm text-gray-400 animate-pulse">
        Initializing security context...
      </p>
    </div>
  );
}

function OtpContainer() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return <OtpForm email={email} />;
}

export default function VerifyOtpPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <Suspense fallback={<OtpFallback />}>
        <OtpContainer />
      </Suspense>
    </main>
  );
}
