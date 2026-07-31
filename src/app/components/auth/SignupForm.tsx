"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import Input from "@/app/components/Input";
import GoogleButton from "@/app/components/auth/GoogleAuthButton";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FacebookAuthButton from "./FacebookAuthButton";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const trimmedName = form.name.trim().replace(/\s+/g, " ");
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phoneNumber ? form.phoneNumber.trim() : "";

    if (trimmedName.length < 2) {
      return setErr("Please enter your full name.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return setErr("Please enter a valid email address.");
    }

    if (!trimmedPhone || !isValidPhoneNumber(trimmedPhone)) {
      return setErr(
        "Please enter a valid phone number for the selected country.",
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      return setErr(
        "Password must be at least 8 characters long, contain an uppercase letter, and a number.",
      );
    }

    if (form.password !== form.confirmPassword) {
      return setErr("Passwords do not match.");
    }

    setLoading(true);

    try {
      const payload = {
        name: trimmedName,
        phoneNumber: trimmedPhone,
        email: trimmedEmail,
        password: form.password,
      };

      await api.post(`${BACKEND}/auth/signup`, payload);

      router.push(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`);
    } catch (error: any) {
      setErr(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred during sign up.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-slate-200/80 bg-white font-inter text-slate-800 shadow-2xl transition-all duration-300">
      {/* Left Brand Panel */}
      <div className="hidden md:flex w-1/2 flex-col justify-between bg-slate-900 p-8 text-white border-r border-slate-800">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-600 font-outfit text-base font-bold text-white shadow-sm">
            P
          </div>
          <span className="font-outfit text-xl font-bold tracking-tight text-white">
            Postify
          </span>
        </div>

        {/* Main Bold Headline & Value Prop */}
        <div className="my-auto space-y-4 py-4">
          <h1 className="font-outfit text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-[1.15]">
            Start growing your audience today.
          </h1>
          <p className="text-xs leading-relaxed text-slate-400">
            Join thousands of creators and teams automating their social
            channels in one unified workflow.
          </p>

          {/* Clean Metric Stats */}
          <div className="pt-3 grid grid-cols-2 gap-3 border-t border-slate-800">
            <div>
              <p className="font-outfit text-xl font-bold text-white">
                14 Days
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                Free Pro Trial
              </p>
            </div>
            <div>
              <p className="font-outfit text-xl font-bold text-white">0 Card</p>
              <p className="text-[10px] text-slate-400 font-medium">
                Required Upfront
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-slate-500 font-medium">
          © 2026 Postify Inc. All rights reserved.
        </div>
      </div>

      {/* Right Sign Up Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center ">
        <div className="mb-3 space-y-0.5">
          <h2 className="font-outfit text-xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h2>
          <p className="text-[11px] text-slate-500">
            Get started with your free Postify account today.
          </p>
        </div>

        {err && (
          <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50/80 p-2 text-[11px] font-medium text-rose-700">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Full Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Phone Input with matching style */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="custom-phone-input">
              <PhoneInput
                defaultCountry="US"
                international
                withCountryCallingCode
                value={form.phoneNumber}
                onChange={(value) =>
                  setForm({ ...form, phoneNumber: value || "" })
                }
                className="flex items-center gap-2 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-3.5 text-xs text-black focus-within:border-rose-500 focus-within:bg-white transition-all"
              />
            </div>
          </div>

          <Input
            label="Email Address"
            type="email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            isPassword
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            label="Confirm Password"
            isPassword
            value={form.confirmPassword}
            required
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-1.5 w-full cursor-pointer rounded-lg bg-rose-600 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/10 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="relative my-3 flex items-center">
          <div className="flex-grow border-t border-slate-100" />
          <span className="shrink-0 px-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            or continue with
          </span>
          <div className="flex-grow border-t border-slate-100" />
        </div>

        <div className="space-y-2">
          <GoogleButton onError={(msg) => setErr(msg)} />
          <FacebookAuthButton onError={(msg) => setErr(msg)} />
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-rose-600 hover:text-rose-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
