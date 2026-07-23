"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/verify-otp", { email, otp });
      const { token, user } = response.data;

      // Instantly log the user in locally
      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (error: any) {
      setErr(error.response?.data?.error || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#111827]/40 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
        Verify Account
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Enter the verification code sent to your email.
      </p>

      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
          {err}
        </div>
      )}

      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <Input
          label="Verification OTP Code"
          type="text"
          maxLength={6}
          required
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg text-sm transition-all duration-300"
        >
          {loading ? "Verifying..." : "Verify & Dashboard"}
        </button>
      </form>
    </div>
  );
}