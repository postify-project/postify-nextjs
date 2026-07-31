"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote?: string;
  isVideo?: boolean;
  videoPoster?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Saad Khatri",
    role: "Content Lead",
    avatar: "/testimonial-man.png", // Replace with your image paths
    quote:
      "From scheduling posts to tracking competitors, everything we need is in one place, making it an essential, time-saving tool that every modern marketer should use.",
  },
  {
    id: "2",
    name: "Aun Baloch",
    role: "Content Lead",
    avatar: "/avatars/aun.jpg",
    isVideo: true,
    videoPoster: "/testimonial-big-man.png", // High quality video thumbnail image
  },
  {
    id: "3",
    name: "Sharjeel Memon",
    role: "Content Lead",
    avatar: "/testimonial-man.png",
    quote:
      "From scheduling posts to tracking competitors, everything we need is in one place, making it an essential, time-saving tool that every modern marketer should use.",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#fdfafb] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-pink-200 bg-pink-50/50 text-xs font-medium text-[#800033] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#800033]" />
          Testimonials
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a010b] text-center mb-4"
        >
          Everything Postify Handles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-zinc-600 text-center max-w-xl mb-10 sm:mb-16 leading-relaxed"
        >
          One AI assistant to create content, publish posts, engage with
          customers, and grow your brand automatically.
        </motion.p>

        {/* Cards Grid Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {testimonials.map((item, index) => {
            if (item.isVideo) {
              return (
                /* Video Feature Card */
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1] as const,
                  }}
                  className="relative group w-full h-[380px] sm:h-[460px] md:h-[500px] lg:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl border border-rose-950/10 flex flex-col justify-end p-6 text-white bg-black/90"
                >
                  {/* Poster Background */}
                  <Image
                    src={item.videoPoster || "/video-poster.jpg"}
                    alt={item.name}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                  {/* Animated Central Play Button */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <motion.button
                      onClick={() => setIsPlaying(!isPlaying)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        y: {
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut" as const,
                        },
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center shadow-2xl backdrop-blur-md pl-1 transition-colors duration-300"
                      aria-label="Play video testimonial"
                    >
                      <Play className="w-6 h-6 fill-zinc-900 text-zinc-900" />
                    </motion.button>
                  </div>

                  {/* Video Card Footer Info */}
                  <div className="relative z-20 space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                      {item.role}
                    </p>
                  </div>
                </motion.div>
              );
            }

            return (
              /* Standard Quote Card */
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1] as const,
                }}
                className="w-full h-auto min-h-[300px] sm:min-h-[360px] md:min-h-[460px] lg:min-h-[480px] rounded-[2rem] bg-white border border-rose-100/70 p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-pink-200 transition-all duration-300"
              >
                {/* User Avatar */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-zinc-200 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                {/* Quote Content */}
                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-normal my-6">
                  {item.quote}
                </p>

                {/* Card Footer Info */}
                <div className="space-y-0.5 pt-2 border-t border-zinc-100">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
