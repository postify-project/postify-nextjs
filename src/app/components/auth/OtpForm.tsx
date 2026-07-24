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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    // Trim and format inputs
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

      await api.post(
        "https://postify-main-backend.vercel.app/api/v1/auth/otp-verify",
        payload
      );

      // Successfully verified -> redirect to login page
      router.push("/login");
    } catch (error: any) {
      setErr(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Verification failed."
      );
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
        Enter the verification code sent to{" "}
        <span className="text-white font-medium">{email}</span>.
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
          value={otp}
          maxLength={6}
          required
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 mt-2"
        >
          {loading ? "Verifying..." : "Verify & Proceed to Login"}
        </button>
      </form>
    </div>
  );
}