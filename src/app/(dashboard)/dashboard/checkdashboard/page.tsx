import { Suspense } from "react";
import OAuthHandler from "@/app/components/auth/OAuthHandler";
import LogoutButtons from "@/app/components/auth/LogoutButtons";
import { LayoutGrid, Loader2 } from "lucide-react";

// Matches landing page design system: clean layout, indigo accent, smooth loading states
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-6 font-inter text-[#f3f4f6]">
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#0B0F17] flex flex-col gap-3 items-center justify-center z-[500]">
            <Loader2 className="h-10 w-10 animate-spin text-[#6366f1]" />
            <p className="font-outfit text-sm font-semibold text-slate-400 animate-pulse tracking-wide">
              Postify initializing dashboard...
            </p>
          </div>
        }
      >
        <OAuthHandler>
          <div className="w-full max-w-sm flex flex-col items-center gap-8 rounded-2xl border border-white/5 bg-[#111623] p-10 shadow-2xl shadow-[#6366f1]/5">
            <header className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 shadow-lg shadow-[#6366f1]/10">
                <LayoutGrid className="h-8 w-8 text-[#6366f1]" />
              </div>
              <h1 className="font-outfit text-3xl font-bold tracking-tight text-white md:text-4xl">
                Dashboard
              </h1>
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Auth State: Success. Please manage session below.
              </p>
            </header>
            <div className="w-full border-t border-[#1f2430] pt-8">
              <LogoutButtons />
            </div>
          </div>
        </OAuthHandler>
      </Suspense>
    </main>
  );
}
