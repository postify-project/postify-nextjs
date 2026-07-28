"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function OAuthHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const tokenFromQuery = searchParams.get("token") || searchParams.get("q");

    if (tokenFromQuery) {
      Cookies.set("token", tokenFromQuery, {
        expires: 7,
        path: "/",
        sameSite: "lax",
      });

      window.history.replaceState({}, "", "/dashboard");
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
          Completing authentication...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}