"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    setEmail("");
  };

  const footerLinks = {
    Product: [
      { label: "Social Inbox", href: "#" },
      { label: "AI Caption Generator", href: "#" },
      { label: "Content Planner", href: "#" },
      { label: "Scheduler", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "API Documentation", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: "/footer-fb.png", href: "#", label: "Facebook" },
    { icon: "/footer-twitter.png", href: "#", label: "Twitter" },
    { icon: "/footer-insta.png", href: "#", label: "Instagram" },
    { icon: "/footer-linkedin.png", href: "#", label: "LinkedIn" },
    { icon: "/footer-mail.png", href: "mailto:Abc@gmail.pk", label: "Email" },
  ];

  return (
    <footer className="w-full bg-white text-zinc-100 pt-8 md:pt-16 pb-0 px-2 sm:px-4 lg:px-6 overflow-hidden">
      {/* Expanded Container Width */}
      <div className="max-w-7xl lg:max-w-[1400px] mx-auto relative">
        {/* Main Card Container */}
        <div className="bg-[#2B000D] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-rose-950/20 shadow-2xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Brand Info */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 font-bold text-2xl tracking-tight text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-4 h-4 fill-white" />
                  </div>
                  <span>
                    Postify<span className="text-pink-500">.</span>
                  </span>
                </Link>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                  Create, schedule, publish, and analyze your social media
                  content from one powerful dashboard.
                </p>
              </div>

              {/* Address & Email Details */}
              <div className="space-y-2 text-xs text-zinc-300 pt-2 sm:pt-6">
                <p className="leading-relaxed">
                  <span className="font-medium text-white">A :</span> Near
                  Falcon Society and Baloch Colony Bridge.
                  <br />
                  Karachi - Pakistan
                </p>
                <p className="pt-1">
                  <span className="font-medium text-white">Email :</span>{" "}
                  Abc@gmail.pk
                </p>
              </div>
            </div>

            {/* Right Column: Links, Newsletter, & Socials */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-8">
              {/* Navigation Links */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-4">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title} className="space-y-3">
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {title}
                    </h4>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-xs text-zinc-300 hover:text-white transition-colors block"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Subscription Form */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-semibold text-white">
                  Subscribe for Circulars
                </h4>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-xl p-1 sm:p-1.5 max-w-md gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                    className="flex-1 bg-transparent text-zinc-900 text-xs px-3 py-2 outline-none placeholder:text-zinc-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#800033] hover:bg-[#a30041] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2 justify-start md:justify-end">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="w-11 h-11 rounded-full border border-zinc-700/80 hover:border-pink-500 flex items-center justify-center transition-all hover:bg-pink-500/10 shrink-0"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      
                      width={item.label === "Facebook" ? 8 : 14}
                      height={item.label === "Facebook" ? 8 : 14}
                      className="object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-[#4F2C37] my-6 sm:my-8" />

          {/* Copyright Notice */}
          <div className="text-center text-[10px] sm:text-xs text-zinc-400">
            © 2025 Board of Intermediate Education Karachi - Pakistan. All
            rights reserved.
          </div>
        </div>

        {/* Big Background Watermark with Exact Figma Linear Gradient */}
        <div className="hidden md:flex relative w-full justify-center items-center pointer-events-none select-none -mb-16 lg:-mb-24 z-0 ">
          <span className="text-[19vw] font-black  leading-none bg-gradient-to-b from-[#2D0113]/0 via-[#2D0113]/40 to-[#2D0113]/80 bg-clip-text text-transparent">
            Postify
          </span>
        </div>
      </div>
    </footer>
  );
};
