"use client";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
}

export default function Input({ label, isPassword, ...props }: InputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs text-gray-400 font-medium tracking-wide uppercase">
        {label}
      </label>
      <div className="relative w-full group">
        <input
          type={isPassword ? (show ? "text" : "password") : props.type}
          {...props}
          className="w-full bg-[#0F1524] text-white border border-[#1E293B] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-all duration-300 group-hover:border-gray-700"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs select-none transition-colors"
          >
            {show ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
    </div>
  );
}
