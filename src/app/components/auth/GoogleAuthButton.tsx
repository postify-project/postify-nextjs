"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/axios";

interface GoogleButtonProps {
  onError: (msg: string) => void;
}

export default function GoogleButton({ onError }: GoogleButtonProps) {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).google) {
      const google = (window as any).google;

      google.accounts.id.initialize({
        client_id:
          "52790475889-suvp1mp1g9a9e6q8os81v540m0886kk5.apps.googleusercontent.com",
        callback: async (response: any) => {
          try {
            const res = await api.post("/api/auth/google", {
              credential: response.credential,
            });
            const { token, user } = res.data;

            // Save state securely
            Cookies.set("token", token, {
              expires: 7,
              secure: true,
              sameSite: "strict",
            });
            localStorage.setItem("user", JSON.stringify(user));

            router.push("/dashboard");
          } catch (err: any) {
            onError(
              err.response?.data?.error || "Google Authentication failed.",
            );
          }
        },
      });

      google.accounts.id.renderButton(divRef.current, {
        theme: "dark",
        size: "large",
        width: "100%",
        text: "continue_with",
        shape: "rounded",
      });
    }
  }, [router, onError]);

  return <div ref={divRef} className="w-full min-h-[44px]" />;
}
