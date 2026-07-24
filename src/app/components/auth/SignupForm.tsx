"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import Input from "@/app/components/Input";
import GoogleButton from "@/app/components/auth/GoogleAuthButton";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    // Trim inputs
    const trimmedName = form.name.trim().replace(/\s+/g, ' ');
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phoneNumber ? form.phoneNumber.trim() : "";

    // 1. Name Validation
    if (trimmedName.length < 2) {
      return setErr("Please enter your full name.");
    }

    // 2. Structural Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return setErr("Please enter a valid email address.");
    }

    // 3. International Phone Number Validation via libphonenumber
    if (!trimmedPhone || !isValidPhoneNumber(trimmedPhone)) {
      return setErr("Please enter a valid phone number for the selected country.");
    }

    // 4. Strict Password Character Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      return setErr(
        "Password must be at least 8 characters long, contain an uppercase letter, and a number."
      );
    }

    // 5. Confirm Equality Matcher
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

      console.log("payload--> ", payload);

      await api.post(
        "https://postify-main-backend.vercel.app/api/v1/auth/signup",
        payload
      );

      router.push(`/verify-otp?email=${encodeURIComponent(trimmedEmail)}`);
    } catch (error: any) {
      setErr(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An error occurred during sign up."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#111827]/40 border border-[#1E293B] rounded-2xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-sky-500/5 hover:-translate-y-1 group">
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-2">
        Create an account
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Join us by filling out the details below.
      </p>

      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
          {err}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* International Phone Input Container */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-300">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <div className="custom-phone-input dark-theme">
            <PhoneInput
              defaultCountry="US"
              international
              withCountryCallingCode
              value={form.phoneNumber}
              onChange={(value) =>
                setForm({ ...form, phoneNumber: value || "" })
              }
              className="flex items-center gap-2 w-full bg-[#1E293B]/50 border border-[#1E293B] rounded-lg p-2.5 text-sm text-white focus-within:border-sky-500 transition-colors"
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
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg text-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Visual Divider */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-[#1E293B]"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase tracking-wider">
          or
        </span>
        <div className="flex-grow border-t border-[#1E293B]"></div>
      </div>

      {/* Google Interactive Action */}
      <GoogleButton onError={(msg) => setErr(msg)} />

      <p className="text-center text-xs text-gray-400 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-sky-400 hover:underline">
          Log in
        </Link>
      </p>

    </div>
  );
}