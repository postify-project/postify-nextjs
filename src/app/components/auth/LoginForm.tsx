"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import api from "@/lib/axios";
import Input from "@/app/components/Input";
import GoogleButton from "@/app/components/auth/GoogleAuthButton";
import FacebookAuthButton from "./FacebookAuthButton";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      return setErr("Please enter your email address.");
    }

    setLoading(true);

    try {
      const payload = {
        email: trimmedEmail,
        password: form.password,
      };

      const response = await api.post(`${BACKEND}/auth/login`, payload);
      const { token, data: user } = response.data;

      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      router.push("/dashboard");
    } catch (error: unknown) {
      const errObj = error as { response?: { data?: { unverified?: boolean; message?: string; error?: string } } };
      const responseData = errObj.response?.data;

      if (responseData?.unverified) {
        router.push(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`);
        return;
      }

      setErr(
        responseData?.message ||
          responseData?.error ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white font-inter text-slate-800 shadow-xl transition-all duration-300">
      {/* Left Brand Panel */}
      <div className="hidden md:flex w-1/2 flex-col justify-between bg-slate-900 p-10 text-white border-r border-slate-800">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 font-outfit text-lg font-bold text-white shadow-sm">
            P
          </div>
          <span className="font-outfit text-2xl font-bold tracking-tight text-white">
            Postify
          </span>
        </div>

        {/* Main Bold Headline & Value Prop */}
        <div className="my-auto space-y-6 py-8">
          <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
            Supercharge your content workflow.
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            Publish everywhere with confidence. Seamlessly plan, schedule, and analyze all your social media posts in one clean workspace.
          </p>

          {/* Clean Metric Stats */}
          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-800">
            <div>
              <p className="font-outfit text-2xl font-bold text-white">10x</p>
              <p className="text-[11px] text-slate-400 font-medium">Faster Scheduling</p>
            </div>
            <div>
              <p className="font-outfit text-2xl font-bold text-white">99.9%</p>
              <p className="text-[11px] text-slate-400 font-medium">Uptime Guarantee</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-500 font-medium">
          © 2026 Postify Inc. All rights reserved.
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
        <div className="mb-6 space-y-1">
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access your Postify publishing dashboard.
          </p>
        </div>

        {err && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs font-medium text-rose-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              label="Email Address"
              type="email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              label=""
              isPassword
              value={form.password}
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full cursor-pointer rounded-xl bg-rose-600 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/10 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-slate-100" />
          <span className="shrink-0 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            or continue with
          </span>
          <div className="flex-grow border-t border-slate-100" />
        </div>

        <div className="space-y-3">
          <GoogleButton onError={(msg) => setErr(msg)} />
          <FacebookAuthButton onError={(msg) => setErr(msg)} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-rose-600 hover:text-rose-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}