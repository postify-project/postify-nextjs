"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import Input from "@/app/components/Input";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!token) return setErr("Invalid or missing reset token.");
    if (form.newPassword !== form.confirmPassword)
      return setErr("Passwords do not match.");
    if (form.newPassword.length < 6)
      return setErr("Password must be at least 6 characters long.");

    setLoading(true);

    try {
      const response = await api.post(
        `${BACKEND}/auth/change-password`,
        {
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMsg(response.data?.message || "Password updated successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      const errObj = error as { response?: { data?: { message?: string; error?: string } } };
      setErr(
        errObj.response?.data?.message ||
          errObj.response?.data?.error ||
          "Failed to reset password. Link may be expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 font-inter text-slate-800 shadow-xl transition-all duration-300">
      <div className="mb-6 space-y-1">
        <h2 className="font-outfit text-2xl font-bold tracking-tight text-slate-900">
          Set New Password
        </h2>
        <p className="text-xs leading-relaxed text-slate-500">
          Create a strong, secure password containing numbers and uppercase
          letters.
        </p>
      </div>

      {/* Error Banner */}
      {err && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs font-medium text-rose-700">
          {err}
        </div>
      )}

      {/* Success Banner */}
      {msg && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-medium text-emerald-700">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            label="New Password"
            isPassword
            required
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </div>

        <div>
          <Input
            label="Confirm New Password"
            isPassword
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full cursor-pointer rounded-xl bg-rose-600 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-500 hover:shadow-rose-500/10 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Updating Password..." : "Reset Password"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Back to safety?{" "}
        <Link
          href="/login"
          className="font-medium text-rose-600 hover:text-rose-700 hover:underline"
        >
          Return to Login
        </Link>
      </p>
    </div>
  );
}
