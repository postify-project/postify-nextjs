"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
        "https://postify-main-backend.vercel.app/api/v1/auth/change-password",
        {
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      setMsg(response.data?.message || "Password updated successfully!");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setErr(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to reset password. Link may be expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#111827]/40 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-sky-500/5 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
        Set New Password
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Create a strong, secure password containing numbers and uppercase
        letters.
      </p>

      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
          {err}
        </div>
      )}
      {msg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-lg mb-4">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="New Password"
          isPassword
          required
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />
        <Input
          label="Confirm New Password"
          isPassword
          required
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg text-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
        >
          {loading ? "Updating Password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}