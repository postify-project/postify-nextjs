"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Bell,
  Calendar as CalendarIcon,
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Users,
  Clock,
  Share2,
  ThumbsUp,
  MessageSquare,
  Repeat,
  MoreHorizontal,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  const dashboardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const floatAnimation = (delay: number) => ({
    y: [0, -12, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay: delay,
    },
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8FA] pt-28 pb-20 md:pt-36 md:pb-32 text-zinc-800">
      {/* Background Soft Pink Glow / Gradient matching the UI design */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial from-pink-200/60 via-rose-100/25 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating Social Media Icons */}
      <motion.div
        animate={floatAnimation(0)}
        className="hidden lg:flex absolute top-32 left-[10%] w-16 h-16 items-center justify-center z-10"
      >
        <Image
          src="/social-facebook.png"
          alt="Facebook"
          width={64}
          height={64}
        />
      </motion.div>

      <motion.div
        animate={floatAnimation(1)}
        className="hidden lg:flex absolute top-28 right-[10%] w-16 h-16 items-center justify-center z-10"
      >
        <Image src="/social-insta.png" alt="Instagram" width={64} height={64} />
      </motion.div>

      <motion.div
        animate={floatAnimation(0.5)}
        className="hidden lg:flex absolute top-72 left-[12%] w-16 h-16 items-center justify-center z-10"
      >
        <Image src="/social-tiktok.png" alt="TikTok" width={64} height={64} />
      </motion.div>

      <motion.div
        animate={floatAnimation(1.5)}
        className="hidden lg:flex absolute top-80 right-[12%] w-16 h-16 items-center justify-center z-10"
      >
        <Image src="/social-youtube.png" alt="YouTube" width={64} height={64} />
      </motion.div>

      {/* Hero Content Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 text-center relative z-20 flex flex-col items-center"
      >
        {/* Top Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 mb-6"
        >
          <div className="w-4 h-4 rounded-full bg-[#D8005A] flex items-center justify-center text-white">
            <Sparkles className="w-2.5 h-2.5 fill-white" />
          </div>
          <span className="text-xs font-medium text-[#D8005A]">
            AI Social Media Assistant
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.15] max-w-4xl"
        >
          Fire Your Social Media Manager. <br className="hidden sm:inline" />
          Hire Postify{" "}
          <span className="italic font-normal text-[#D8005A]">Right Now.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-xs sm:text-sm text-zinc-500 max-w-xl leading-relaxed"
        >
          Postify writes your posts, replies to your customers, and keeps your
          brand voice automatically, every single day. You just sit back and
          watch your business grow.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeInUp} className="mt-8">
          <Link href="/login" className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 text-xs sm:text-sm font-semibold text-white bg-[#D8005A] hover:bg-[#b8004d] rounded-full shadow-lg shadow-pink-600/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            <span>Claim 100 Free Credits</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Dashboard Mockup Preview */}
      <motion.div
        variants={dashboardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the dashboard enters the viewport
        className="max-w-6xl mx-auto px-2 sm:px-4 mt-12 sm:mt-16 relative z-20"
      >
        <div className="bg-[#FAF5F7] rounded-3xl p-3 sm:p-5 border border-pink-100/60 shadow-2xl overflow-hidden grid grid-cols-12 gap-4 text-zinc-800">
          {/* Sidebar */}
          <div className="hidden lg:flex col-span-2 flex-col justify-between py-2 pr-2">
            <div>
              {/* Brand Logo */}
              <div className="flex items-center gap-2 font-bold text-xl text-zinc-900 px-2 mb-8">
                <div className="w-7 h-7 rounded-lg bg-[#D8005A] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 fill-white" />
                </div>
                <span>Postify</span>
              </div>

              {/* Navigation Menu */}
              <nav className="flex flex-col gap-1 text-xs font-semibold">
                <div className="flex items-center gap-3 px-3 py-2.5 bg-[#D8005A] text-white rounded-xl shadow-md shadow-pink-500/10">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <FileText className="w-4 h-4 text-zinc-500" /> Posts
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <BarChart3 className="w-4 h-4 text-zinc-500" /> Analytics
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <CalendarIcon className="w-4 h-4 text-zinc-500" /> Calendar
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <Clock className="w-4 h-4 text-zinc-500" /> Schedule
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <Share2 className="w-4 h-4 text-zinc-500" /> Social
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <Users className="w-4 h-4 text-zinc-500" /> Accounts
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-pink-100/50 rounded-xl transition-colors">
                  <Settings className="w-4 h-4 text-zinc-500" /> Setting
                </div>
              </nav>
            </div>

            {/* Postify Pro Banner */}
            <div className="bg-gradient-to-b from-[#20000B] to-[#120006] text-white rounded-2xl p-4 space-y-3 relative overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300">
                <Rocket className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-xs text-white">Postify Pro</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                  Unlock all features and grow faster.
                </p>
              </div>
              <button className="w-full py-2 bg-[#D8005A] hover:bg-pink-600 text-white rounded-xl text-[11px] font-semibold transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Main Dashboard Workspace */}
          <div className="col-span-12 lg:col-span-10 flex flex-col gap-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-white">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-1.5">
                  Hello, Faizan 👋
                </h2>
                <p className="text-[11px] text-zinc-400">
                  Check your schedule and tasks for today
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium bg-pink-50 text-pink-700 px-3 py-1.5 rounded-full border border-pink-100 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-pink-500" /> 321 tasks
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-600">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#D8005A] text-white flex items-center justify-center text-xs font-bold shadow-md shadow-pink-500/20">
                  AI
                </div>
              </div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-12 gap-4">
              {/* Center Main Column */}
              <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                {/* AI Assisted Posts Card */}
                <motion.div
                  variants={cardItemVariants}
                  className="bg-white rounded-2xl p-4 border border-pink-100/50 shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">
                        AI Assisted Posts
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        3 posts scheduled for today
                      </p>
                    </div>
                    <button className="text-[#D8005A] text-xs font-semibold hover:underline">
                      View all &gt;
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between p-2 rounded-xl border border-zinc-50 bg-zinc-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-800 overflow-hidden relative">
                          <Image
                            src="/DB-1.png"
                            alt="post"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-800">
                            Morning motivation thread
                          </p>
                          <p className="text-[10px] text-zinc-400">9:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-pink-50 text-pink-600 font-semibold px-2 py-0.5 rounded-full">
                          Scheduled
                        </span>
                        <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[9px] font-bold flex items-center justify-center">
                          TW
                        </span>
                        <MoreHorizontal className="w-3.5 h-3.5 text-zinc-300" />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between p-2 rounded-xl border border-zinc-50 bg-zinc-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-rose-500 overflow-hidden relative">
                          <Image
                            src="/DB-2.png"
                            alt="product"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-800">
                            New product launch teaser
                          </p>
                          <p className="text-[10px] text-zinc-400">12:30 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-rose-50 text-rose-500 font-semibold px-2 py-0.5 rounded-full">
                          Draft
                        </span>
                        <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                          IG
                        </span>
                        <MoreHorizontal className="w-3.5 h-3.5 text-zinc-300" />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between p-2 rounded-xl border border-zinc-50 bg-zinc-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 overflow-hidden relative">
                          <Image
                            src="/DB-3.png"
                            alt="case study"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-800">
                            Case study: 3x growth in 90 days
                          </p>
                          <p className="text-[10px] text-zinc-400">3:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-pink-50 text-pink-600 font-semibold px-2 py-0.5 rounded-full">
                          Scheduled
                        </span>
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                          LI
                        </span>
                        <MoreHorizontal className="w-3.5 h-3.5 text-zinc-300" />
                      </div>
                    </div>
                  </div>

                  {/* Likes / Comments / Shares bar */}
                  <div className="flex items-center gap-6 pt-2 border-t border-zinc-100 text-xs font-bold text-zinc-700">
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" /> 2.4K{" "}
                      <span className="text-zinc-400 font-normal text-[11px]">
                        Likes
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />{" "}
                      389{" "}
                      <span className="text-zinc-400 font-normal text-[11px]">
                        Comments
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Repeat className="w-3.5 h-3.5 text-zinc-400" /> 1.1K{" "}
                      <span className="text-zinc-400 font-normal text-[11px]">
                        Shares
                      </span>
                    </span>
                  </div>
                </motion.div>

                {/* Bottom Stats Row (Donut Chart & Line Graph) */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Circular Donut Chart Card */}
                  <motion.div
                    variants={cardItemVariants}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: true, amount: 0.3 }}
                    className="col-span-12 sm:col-span-5 bg-white rounded-2xl p-4 border border-pink-100/50 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-zinc-900">
                        Email Learning
                      </h4>
                      <p className="text-[10px] text-zinc-400">
                        Campaign overview
                      </p>
                    </div>

                    {/* Animated Progress Ring */}
                    <div className="relative w-28 h-28 mx-auto my-3 flex items-center justify-center">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-pink-100"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-[#D8005A]"
                          strokeDasharray="91, 100"
                          initial={{ strokeDasharray: "0, 100" }}
                          whileInView={{ strokeDasharray: "91, 100" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut" as const,
                            delay: 0.2,
                          }}
                          strokeWidth="4"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-base font-extrabold text-zinc-800">
                        91%
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1 text-zinc-500">
                          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>{" "}
                          Total Posts
                        </span>
                        <span className="font-bold text-zinc-800">120K</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1 text-zinc-500">
                          <span className="w-2 h-2 rounded-full bg-pink-500 inline-block"></span>{" "}
                          Active Users
                        </span>
                        <span className="font-bold text-zinc-800">73K</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Performance Over Time Animated Graph Card */}
                  <motion.div
                    variants={cardItemVariants}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: true, amount: 0.3 }}
                    className="col-span-12 sm:col-span-7 bg-white rounded-2xl p-4 border border-pink-100/50 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-xs text-zinc-900">
                          Performance Over Time
                        </h4>
                        <p className="text-[10px] text-zinc-400">
                          Engagement & reach trends
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-medium">
                        <span className="flex items-center gap-1 text-zinc-600">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>{" "}
                          Engagement
                        </span>
                        <span className="flex items-center gap-1 text-zinc-600">
                          <span className="w-2 h-2 rounded-full bg-pink-400"></span>{" "}
                          Reach
                        </span>
                      </div>
                    </div>

                    {/* SVG Line Graph with Draw Animation */}
                    <div className="w-full h-28 my-2 relative">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 300 100"
                        preserveAspectRatio="none"
                      >
                        {/* Area Gradient */}
                        <defs>
                          <linearGradient
                            id="purpleGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#9333ea"
                              stopOpacity="0.25"
                            />
                            <stop
                              offset="100%"
                              stopColor="#9333ea"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <linearGradient
                            id="pinkGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#ec4899"
                              stopOpacity="0.2"
                            />
                            <stop
                              offset="100%"
                              stopColor="#ec4899"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        {/* Fill paths */}
                        <path
                          d="M 0 80 Q 50 30, 100 60 T 200 20 T 300 10 L 300 100 L 0 100 Z"
                          fill="url(#purpleGrad)"
                        />
                        <path
                          d="M 0 90 Q 60 70, 120 85 T 220 50 T 300 30 L 300 100 L 0 100 Z"
                          fill="url(#pinkGrad)"
                        />

                        {/* Animated Curved Line 1 (Engagement) */}
                        <motion.path
                          d="M 0 80 Q 50 30, 100 60 T 200 20 T 300 10"
                          fill="none"
                          stroke="#9333ea"
                          strokeWidth="2.5"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.8,
                            ease: "easeInOut" as const,
                            delay: 0.2,
                          }}
                        />

                        {/* Animated Curved Line 2 (Reach) */}
                        <motion.path
                          d="M 0 90 Q 60 70, 120 85 T 220 50 T 300 30"
                          fill="none"
                          stroke="#f472b6"
                          strokeWidth="2.5"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.8,
                            delay: 0.4,
                            ease: "easeInOut" as const,
                          }}
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[9px] text-zinc-400 font-medium">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right Column (Calendar & Overlay Replies) */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4 relative">
                {/* Mini Calendar Card */}
                <motion.div
                  variants={cardItemVariants}
                  className="bg-white rounded-2xl p-4 border border-pink-100/50 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-900">
                      November 2025
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-400 font-medium">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span className="text-zinc-200">29</span>
                    <span className="text-zinc-200">30</span>
                    <span className="text-zinc-200">31</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span className="bg-[#D8005A] text-white rounded-full font-bold">
                      14
                    </span>
                    <span>15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                    <span>19</span>
                    <span>20</span>
                    <span>21</span>
                    <span>22</span>
                    <span>23</span>
                    <span>24</span>
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                    <span>29</span>
                    <span>30</span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-zinc-100 text-[10px]">
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>{" "}
                      Team sync
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>{" "}
                      Post review
                    </div>
                  </div>
                </motion.div>

                {/* Floating Customer Replies Overlay Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-xl space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xs text-zinc-900">
                      Customer Replies
                    </h4>
                    <span className="text-[10px] text-zinc-400">
                      2 unread messages
                    </span>
                  </div>

                  {/* Message bubble */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-bold text-[10px] flex items-center justify-center">
                          SM
                        </div>
                        <span className="font-bold text-zinc-800 text-xs">
                          Sarah Mitchell
                        </span>
                      </div>
                      <span className="text-[9px] text-zinc-400">2m ago</span>
                    </div>

                    <p className="text-[11px] text-zinc-500 pl-8">
                      Hey, do I get this kit if I subscribe to the pro plan?
                    </p>

                    {/* AI Generated Reply Card */}
                    <div className="ml-6 p-3 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100/80 rounded-2xl space-y-2">
                      <p className="text-[11px] text-zinc-700 leading-snug">
                        Yes, the pro kit is included with all Pro subscriptions
                        — you&apos;ll get instant access after upgrading! 🎉
                      </p>
                      <button className="w-full py-1.5 bg-[#D8005A] hover:bg-pink-600 text-white rounded-xl text-[11px] font-semibold transition-colors shadow-sm">
                        Send Reply
                      </button>
                    </div>
                  </div>

                  {/* Another customer item */}
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                        JC
                      </div>
                      <div>
                        <p className="font-bold text-zinc-800 text-[11px]">
                          John Carter
                        </p>
                        <p className="text-[10px] text-zinc-400 truncate max-w-[150px]">
                          The analytics report isn&apos;t loading...
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] text-zinc-400">15m ago</span>
                  </div>
                </motion.div>

                {/* Suggested Post Floating Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-2xl p-3 border border-pink-100 shadow-lg space-y-2"
                >
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Suggested Post
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                      P
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-800">
                        Postify Tips
                      </p>
                      <p className="text-[9px] text-zinc-400">@postify</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-600 leading-tight">
                    📊 Did you know consistent posting increases reach by{" "}
                    <strong>3x</strong>? Try our AI scheduler today!
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button className="flex-1 py-1 border border-zinc-200 text-zinc-600 rounded-lg text-[10px] font-medium hover:bg-zinc-50">
                      Dismiss
                    </button>
                    <button className="flex-1 py-1 bg-[#D8005A] text-white rounded-lg text-[10px] font-semibold hover:bg-pink-600">
                      Post it
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Circular Mask Cutout matching design */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-20 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C600,120 600,120 1200,0 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
