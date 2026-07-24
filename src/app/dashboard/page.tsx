import { Suspense } from "react";
import GoogleAuthHandler from "@/app/components/auth/GoogleAuthHandler";
import LogoutButtons from "@/app/components/auth/LogoutButtons";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
            <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
          </div>
        }
      >
        <GoogleAuthHandler>
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <LogoutButtons />
          </div>
        </GoogleAuthHandler>
      </Suspense>
    </main>
  );
}