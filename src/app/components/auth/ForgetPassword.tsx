"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Input from "@/app/components/Input";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return setErr("Please enter your email address.");
    }

    setLoading(true);

    try {
      const response = await api.post(`${BACKEND}/auth/forget-password`, {
        email: trimmedEmail,
      });

      if (response.data?.status || response.status === 200) {
        setSuccess(
          response.data?.message ||
            "Forget password link sent to your email address.",
        );
      }
    } catch (error: any) {
      const responseData = error.response?.data;
      setErr(
        responseData?.message ||
          responseData?.error ||
          "Failed to process request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 font-inter text-slate-800 shadow-xl transition-all duration-300">
      <div className="mb-6 space-y-1">
        <h2 className="font-outfit text-2xl font-bold tracking-tight text-slate-900">
          Recover Password
        </h2>
        <p className="text-xs leading-relaxed text-slate-500">
          Enter your account email below and we will send you a secure password
          reset link.
        </p>
      </div>

      {/* Error Banner */}
      {err && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs font-medium text-rose-700">
          {err}
        </div>
      )}

      {/* Success Banner */}
      {success && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-medium text-emerald-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            label="Account Email Address"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full cursor-pointer rounded-xl bg-rose-600 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/10 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Sending Request..." : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-medium text-rose-600 hover:text-rose-700 hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </div>
  );
}
