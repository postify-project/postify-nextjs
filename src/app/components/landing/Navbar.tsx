"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mapped directly to the sections visible in your page layout
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Analytics", href: "#analytics" },
    { label: "Experts", href: "#experts" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  // Handles smooth scrolling to anchor targets
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-white text-zinc-900 rounded-full shadow-lg border border-zinc-100/80 px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight pl-1"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-700 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
          <span>
            Postify<span className="text-pink-600">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-zinc-600 hover:text-pink-600 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-zinc-50 border border-pink-100/60 rounded-full">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-medium text-zinc-700 hover:text-pink-600 rounded-full transition-all duration-200 hover:bg-zinc-100/80"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 rounded-full shadow-sm hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-zinc-700 hover:text-zinc-900 focus:outline-none transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer with Smooth Opening & Closing Animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="md:hidden absolute top-16 inset-x-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-100 p-6 flex flex-col gap-4 z-50 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="py-2 text-base font-medium text-zinc-700 hover:text-pink-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-zinc-100 my-1" />
            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-zinc-700 border border-zinc-200 rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
