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
      const response = await api.post(
        `${BACKEND}/auth/forget-password`,
        { email: trimmedEmail }
      );
      console.log(response);

      // Backend returns: { status: true, message: "Forget password link sent to your email" }
      if (response.data?.status || response.status === 200) {
        setSuccess(
          response.data?.message ||
            "Forget password link sent to your email"
        );
      }
    } catch (error: any) {
      const responseData = error.response?.data;
      setErr(
        responseData?.message ||
          responseData?.error ||
          "Failed to process request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#111827]/40 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-sky-500/5 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
        Recover Password
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Enter your email and we will send you a secure password reset link.
      </p>

      {/* Error Banner */}
      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
          {err}
        </div>
      )}

      {/* Success Banner */}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Account Email Address"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 mt-2"
        >
          {loading ? "Sending Request..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-6">
        Remembered your password?{" "}
        <Link href="/login" className="text-sky-400 hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
}