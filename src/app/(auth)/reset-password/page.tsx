"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";

function ResetFallback() {
  return (
    <div className="w-full max-w-md bg-[#111827]/40 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl flex items-center justify-center">
      <p className="text-sm text-gray-400 animate-pulse">
        Verifying token context...
      </p>
    </div>
  );
}

function ResetContainer() {
  const searchParams = useSearchParams();
  // Extracts token whether query param is ?q= or ?token=
  const token = searchParams.get("q") || searchParams.get("token") || "";

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <Suspense fallback={<ResetFallback />}>
        <ResetContainer />
      </Suspense>
    </main>
  );
}