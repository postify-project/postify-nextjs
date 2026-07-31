"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function FacebookAuthHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Check both 'token' and 'q' query parameters
    const tokenFromQuery = searchParams.get("token") || searchParams.get("q");

    if (tokenFromQuery) {
      // 1. Store token in cookies
      Cookies.set("token", tokenFromQuery, {
        expires: 7,
        path: "/",
        sameSite: "lax",
      });

      // 2. Strip query params from address bar without a full page reload
      window.history.replaceState({}, "", "/dashboard");

      // 3. Refresh router so Next.js server context recognizes the new cookie
      router.refresh();
      setIsProcessing(false);
      return;
    }

    setIsProcessing(false);
  }, [searchParams, router]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">
          Authenticating with Facebook...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}