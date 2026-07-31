"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/app/components/auth/ResetPasswordForm";

function ResetFallback() {
  return (
    <div className="flex w-full max-w-md items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-8 font-inter text-slate-800 shadow-xl">
      <p className="animate-pulse text-xs text-slate-500">
        Verifying token context...
      </p>
    </div>
  );
}

function ResetContainer() {
  const searchParams = useSearchParams();
  const token = searchParams.get("q") || searchParams.get("token") || "";

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-inter text-slate-800">
      <Suspense fallback={<ResetFallback />}>
        <ResetContainer />
      </Suspense>
    </main>
  );
}
