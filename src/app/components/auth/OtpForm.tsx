"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Input from "@/app/components/Input";

interface OtpFormProps {
  email: string;
}

export default function OtpForm({ email }: OtpFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const trimmedOtp = otp.trim().toUpperCase();
    const trimmedEmail = email ? email.trim() : "";

    if (!trimmedOtp) {
      return setErr("Please enter the OTP code.");
    }

    setLoading(true);

    try {
      const payload = {
        otp: trimmedOtp,
        email: trimmedEmail,
      };

      await api.post(`${BACKEND}/auth/otp-verify`, payload);

      // Successfully verified -> redirect to login page
      router.push("/login");
    } catch (error: any) {
      setErr(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Verification failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 font-inter text-slate-800 shadow-xl transition-all duration-300">
      {/* Brand Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 font-outfit text-lg font-bold text-white shadow-sm shadow-rose-500/20">
          P
        </div>
        <h2 className="font-outfit text-2xl font-bold tracking-tight text-slate-900">
          Verify Your Email
        </h2>
        <p className="mt-1 text-xs text-slate-500 leading-normal">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-slate-800">
            {email || "your email"}
          </span>
        </p>
      </div>

      {err && (
        <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50/80 p-3 text-xs font-medium text-rose-700">
          {err}
        </div>
      )}

      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <Input
          label="Verification Code (OTP)"
          type="text"
          value={otp}
          maxLength={6}
          required
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-rose-600 py-3 text-xs font-semibold text-white shadow-sm shadow-rose-600/10 transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/20 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Proceed to Login"}
        </button>
      </form>

      {/* Resend Action & Back Link */}
      <div className="mt-6 flex flex-col items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500">
        <p>
          Didn't receive code?{" "}
          <button
            type="button"
            onClick={() => router.refresh()}
            className="font-semibold text-rose-600 transition-colors hover:text-rose-700 hover:underline"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
}
