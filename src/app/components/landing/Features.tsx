"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Layers,
  Zap,
  ShieldCheck,
  Clock,
  Send,
} from "lucide-react";
import Image from "next/image";

// Animated Counter Component for Card 3
const Counter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: "easeOut" as const,
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, prefix, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const Features: React.FC = () => {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <section
      id="features"
      className="w-full bg-[#FDFAFC] py-20 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
            <span className="text-xs font-semibold text-pink-700">
              Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight leading-tight"
          >
            What Postify <br className="hidden sm:block" /> Does For You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed"
          >
            Postify quietly handles your social presence—publishing content,
            replying to customers, and adapting to your brand automatically.
          </motion.p>
        </div>

        {/* 3 Main Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* CARD 1: Posts Itself */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl p-6 border border-zinc-100/80 shadow-xl shadow-zinc-200/30 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-full mb-4">
                01
              </span>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Posts Itself.
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                Create, schedule, and publish content automatically across all
                your social channels.
              </p>

              {/* Visual Mockup Container */}
              <div className="bg-[#FAF5F7] rounded-2xl p-4 min-h-[220px] flex items-center justify-center relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
                  className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-zinc-100"
                >
                  <div className="bg-gradient-to-br from-pink-800 via-rose-900 to-zinc-950 p-4 text-white">
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <div className="flex items-center gap-1 font-medium">
                        <Image
                          width={14}
                          height={14}
                          src="/features-insta.png"
                          alt="Instagram"
                          className="w-3.5 h-3.5"
                        />
                        <span>Instagram</span>
                      </div>
                      <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px]">
                        Scheduled
                      </span>
                    </div>
                    <p className="text-xs font-semibold tracking-wide mt-3 mb-1">
                      &quot;New Product Launch 🚀&quot;
                    </p>
                    <p className="text-[10px] text-pink-200/80">
                      Today · 3:00 PM
                    </p>
                  </div>

                  <div className="p-3 space-y-2 text-[11px] text-zinc-700 font-medium bg-white">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Send className="w-3 h-3" /> Auto Publish
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Sparkles className="w-3 h-3 text-pink-500" /> AI Caption
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Layers className="w-3 h-3 text-pink-500" /> Hashtags
                      Ready
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Badges */}
            <div className="flex items-center gap-1.5 mt-6 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Sparkles className="w-2.5 h-2.5" /> AI Generated
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Calendar className="w-2.5 h-2.5" /> Auto Scheduled
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Layers className="w-2.5 h-2.5" /> Multi-Platform
              </span>
            </div>
          </motion.div>

          {/* CARD 2: Replies to Customers Itself */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl p-6 border border-zinc-100/80 shadow-xl shadow-zinc-200/30 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-full mb-4">
                02
              </span>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Replies to Customers Itself.
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                Responds to comments and direct messages instantly using AI
                trained on your brand.
              </p>

              {/* Visual Mockup Container */}
              <div className="bg-[#FAF5F7] rounded-2xl p-4 min-h-[220px] flex flex-col justify-center space-y-3 relative">
                {/* Incoming Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-sm border border-zinc-100 max-w-[85%] self-start"
                >
                  <p className="text-[10px] font-semibold text-zinc-700 mb-1">
                    Sarah
                  </p>
                  <p className="text-xs text-zinc-600">
                    Is this available in blue?
                  </p>
                  <p className="text-[9px] text-zinc-400 mt-1">9:40 AM</p>
                </motion.div>

                {/* AI Reply Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="bg-gradient-to-r from-pink-800 to-rose-900 text-white p-3 rounded-2xl rounded-tr-xs shadow-md max-w-[88%] self-end"
                >
                  <p className="text-[9px] text-pink-200 font-medium mb-1 text-right">
                    Postify AI
                  </p>
                  <p className="text-xs leading-snug">
                    Yes! It&apos;s available in Blue, Black and White. 🎨
                  </p>
                  <p className="text-[9px] text-pink-300 mt-1 text-right">
                    9:41 AM
                  </p>
                </motion.div>

                {/* Reply bar pill */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 1 }}
                  className="bg-white rounded-full px-3 py-1.5 border border-zinc-200 text-center text-[10px] text-zinc-500 font-medium"
                >
                  Reply now ↗
                </motion.div>
              </div>
            </div>

            {/* Bottom Badges */}
            <div className="flex items-center gap-1.5 mt-6 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Zap className="w-2.5 h-2.5" /> Instant Reply
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-2.5 h-2.5" /> Brand Voice
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Clock className="w-2.5 h-2.5" /> 24/7 Support
              </span>
            </div>
          </motion.div>

          {/* CARD 3: Learns Your Brand */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl p-6 border border-zinc-100/80 shadow-xl shadow-zinc-200/30 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-full mb-4">
                03
              </span>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                Learns Your Brand and Adjusts Itself.
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                Adapts to your tone, audience, and content performance to
                improve every post.
              </p>

              {/* Visual Mockup Container */}
              <div className="bg-[#FAF5F7] rounded-2xl p-4 min-h-[220px] flex flex-col justify-center space-y-3 relative">
                {/* Upper Engagement Card */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-zinc-100 space-y-2"
                >
                  <p className="text-[10px] font-bold text-pink-800 tracking-wider uppercase">
                    ENGAGEMENT
                  </p>
                  <div className="space-y-1 text-xs text-zinc-600 font-medium">
                    <div className="flex justify-between items-center">
                      <span>Followers</span>
                      <span className="text-emerald-500 font-bold">
                        <Counter value={21} prefix="+" suffix="%" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reach</span>
                      <span className="text-emerald-500 font-bold">
                        <Counter value={36} prefix="+" suffix="%" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>CTR</span>
                      <span className="text-emerald-500 font-bold">
                        <Counter value={46} prefix="+" suffix="%" />
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Lower Brand Voice Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] font-bold text-pink-800 tracking-wider uppercase mb-1">
                      BRAND VOICE
                    </p>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Image
                        src="/features-insta.png"
                        alt="Instagram"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5"
                      />
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                        f
                      </div>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full border-2 border-pink-500 flex items-center justify-center text-xs font-bold text-pink-700">
                    <Counter value={92} suffix="%" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Badges */}
            <div className="flex items-center gap-1.5 mt-6 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Zap className="w-2.5 h-2.5" /> Instant Reply
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-2.5 h-2.5" /> Brand Voice
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full">
                <Clock className="w-2.5 h-2.5" /> 24/7 Support
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
