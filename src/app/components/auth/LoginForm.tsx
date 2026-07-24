"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import api from "@/lib/axios";
import Input from "@/app/components/Input";
import GoogleButton from "@/app/components/auth/GoogleAuthButton";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

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

      const response = await api.post(
        "https://postify-main-backend.vercel.app/api/v1/auth/login",
        payload
      );
      console.log("response --> ",response);

      // Extract token and user data based on backend response shape
      const { token, data: user } = response.data;

      // Store JWT token securely in Cookies for 7 days
      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      // Store user details in localStorage
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      const responseData = error.response?.data;

      // If user exists but is not verified, route directly to OTP verification
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
    <div className="w-full max-w-md bg-[#111827]/40 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-sky-500/5 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-400 mb-6">Sign in to your account.</p>

      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
          {err}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          value={form.email}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-400 font-medium tracking-wide uppercase">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-sky-400 hover:underline"
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
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 mt-2"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-[#1E293B]"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase">
          or
        </span>
        <div className="flex-grow border-t border-[#1E293B]"></div>
      </div>

      <GoogleButton onError={(msg) => setErr(msg)} />

      <p className="text-center text-xs text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-sky-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}