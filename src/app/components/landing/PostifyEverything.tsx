"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Helper hook for animating numbers count-up
const CountUp: React.FC<{
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}> = ({ end, duration = 1.5, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const steps = 60;
    const increment = end / steps;
    const stepTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const PostifyEverything: React.FC = () => {
  // Animation Variants for Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.12,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  return (
      <section
          
      id="analytics"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-zinc-900"
    >
      {/* Header Section */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/60 text-xs font-semibold text-[#D8005A]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8005A]" />
          Platform Features
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
        >
          Everything <br className="hidden sm:inline" />
          Postify Handles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed"
        >
          One AI assistant to create content, publish posts, engage with
          customers, and grow your brand automatically.
        </motion.p>
      </div>

      {/* Main Grid: 1 col on mobile, 2 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Card 1: AI Content Creation */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-[#FFF8FA] rounded-3xl p-6 border border-pink-100/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="mb-6">
            <h3 className="font-bold text-lg text-zinc-900 mb-1.5">
              AI Content Creation
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Generate engaging captions, post ideas, and campaign content
              tailored to your brand voice in seconds.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-pink-100/60 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-800">
                Advanced Analytics
              </span>
              <span className="bg-[#D8005A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Last Week
              </span>
            </div>

            {/* Smooth Animated Area Chart */}
            <div className="relative h-28 w-full">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="pinkAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D8005A" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#D8005A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 80 Q 75 80, 150 30 T 300 70 L 300 100 L 0 100 Z"
                  fill="url(#pinkAreaGrad)"
                />
                <motion.path
                  d="M 0 80 Q 75 80, 150 30 T 300 70"
                  fill="none"
                  stroke="#D8005A"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeInOut" as const }}
                />
              </svg>
              {/* Highlight Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className="absolute left-[50%] top-[28%] w-3 h-3 rounded-full bg-[#D8005A] border-2 border-white shadow-sm -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </motion.div>

        {/* Card 2: Smart Publishing */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-[#FFF8FA] rounded-3xl p-6 border border-pink-100/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="mb-6">
            <h3 className="font-bold text-lg text-zinc-900 mb-1.5">
              Smart Publishing
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Schedule, optimize, and publish content automatically across all
              your social media platforms.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-pink-100/60 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-800">
                Audience Growth Insights
              </span>
              <span className="bg-[#D8005A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Week
              </span>
            </div>

            {/* Multi-line growth chart */}
            <div className="relative h-24 w-full mb-3">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
              >
                {/* Blue Line */}
                <motion.path
                  d="M 0 65 Q 75 50, 150 40 T 300 20"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" as const }}
                />
                {/* Green Line */}
                <motion.path
                  d="M 0 70 Q 75 60, 150 50 T 300 35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" as const }}
                />
                {/* Gray Line */}
                <motion.path
                  d="M 0 75 Q 75 70, 150 65 T 300 55"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" as const }}
                />
              </svg>
            </div>

            {/* Percentage Indicators */}
            <div className="grid grid-cols-4 text-center text-xs font-semibold text-zinc-700 pt-2 border-t border-zinc-100">
              <div>
                <CountUp end={35} suffix="%" />
              </div>
              <div>
                <CountUp end={50} suffix="%" />
              </div>
              <div>
                <CountUp end={16} suffix="%" />
              </div>
              <div>
                <CountUp end={7} suffix="%" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Customer Conversations */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-[#FFF8FA] rounded-3xl p-6 border border-pink-100/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="mb-6">
            <h3 className="font-bold text-lg text-zinc-900 mb-1.5">
              Customer Conversations
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Reply to comments and direct messages instantly while maintaining
              your brand&apos;s unique tone.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-pink-100/60 shadow-sm">
            <span className="text-xs font-semibold text-zinc-800 block mb-3">
              Optimal Posting Time
            </span>

            {/* Heatmap Grid */}
            <div className="space-y-1.5">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, rowIndex) => (
                  <div key={day} className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400 font-medium w-6">
                      {day}
                    </span>
                    <div className="flex-1 grid grid-cols-8 gap-1.5">
                      {[
                        "bg-pink-100",
                        "bg-rose-400",
                        "bg-rose-500",
                        "bg-[#D8005A]",
                        "bg-rose-300",
                        "bg-pink-200",
                        "bg-[#D8005A]",
                        "bg-rose-200",
                      ].map((colorClass, colIndex) => (
                        <motion.div
                          key={colIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: rowIndex * 0.05 + colIndex * 0.02,
                          }}
                          className={`h-2.5 rounded-full ${colorClass}`}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* Card 4: Brand Intelligence */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-[#FFF8FA] rounded-3xl p-6 border border-pink-100/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div className="mb-6">
            <h3 className="font-bold text-lg text-zinc-900 mb-1.5">
              Brand Intelligence
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
              Analyze performance, learn audience behavior, and continuously
              improve every future post.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-pink-100/60 shadow-sm">
            <span className="text-xs font-semibold text-zinc-800 block mb-4">
              Audience Reaction Analysis
            </span>

            <div className="flex items-center justify-around gap-4">
              {/* Donut Chart */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  {/* Outer circle / base */}
                  <path
                    className="text-zinc-100"
                    strokeWidth="4.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Animated segment */}
                  <motion.path
                    className="text-[#D8005A]"
                    strokeDasharray="72, 100"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    initial={{ strokeDasharray: "0, 100" }}
                    whileInView={{ strokeDasharray: "72, 100" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" as const }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-base font-extrabold text-zinc-900 leading-none">
                    <CountUp end={100} suffix="%" />
                  </p>
                  <p className="text-[9px] text-zinc-400 font-medium mt-0.5">
                    Total
                  </p>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="w-2 h-2 rounded-full bg-[#D8005A]" />{" "}
                    Positive
                  </span>
                  <span className="text-zinc-900 font-bold">
                    <CountUp end={72} suffix="%" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                    Neutral
                  </span>
                  <span className="text-zinc-900 font-bold">
                    <CountUp end={20} suffix="%" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />{" "}
                    Negative
                  </span>
                  <span className="text-zinc-900 font-bold">
                    <CountUp end={8} suffix="%" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card 5: Full Width - Unified Social Dashboard */}
      <motion.div
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardVariants}
        className="bg-[#FFF8FA] rounded-3xl p-6 border border-pink-100/70 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="mb-6">
          <h3 className="font-bold text-lg text-zinc-900 mb-1.5">
            Unified Social Dashboard
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Manage Instagram, Facebook, LinkedIn, X, Threads, and TikTok from
            one AI-powered workspace.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-pink-100/60 shadow-sm overflow-x-auto">
          <span className="text-xs font-semibold text-zinc-800 block mb-4">
            Social Media Overview
          </span>

          <table className="w-full text-left border-collapse min-w-[320px]">
            <thead>
              <tr className="text-[11px] text-zinc-400 font-semibold border-b border-zinc-100 pb-2">
                <th className="pb-3 font-medium">Platform</th>
                <th className="pb-3 font-medium">Followers</th>
                <th className="pb-3 font-medium">Engagement</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold text-zinc-800 divide-y divide-zinc-50">
              {/* Instagram */}
              <tr>
                <td className="py-3">
                  <span className="inline-block bg-[#D8005A] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    Instagram
                  </span>
                </td>
                <td className="py-3">
                  <CountUp end={54} suffix="K" />
                </td>
                <td className="py-3">
                  <CountUp end={12} suffix=".3K" />
                </td>
              </tr>
              {/* Facebook */}
              <tr>
                <td className="py-3">
                  <span className="inline-block bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    Facebook
                  </span>
                </td>
                <td className="py-3">
                  <CountUp end={38} suffix="K" />
                </td>
                <td className="py-3">
                  <CountUp end={8} suffix=".2K" />
                </td>
              </tr>
              {/* TikTok */}
              <tr>
                <td className="py-3">
                  <span className="inline-block bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    TikTok
                  </span>
                </td>
                <td className="py-3">
                  <CountUp end={22} suffix="K" />
                </td>
                <td className="py-3">
                  <CountUp end={15} suffix=".1K" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};
