"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative w-full  py-12 sm:py-20 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const  }}
        className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[580px]  overflow-hidden flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-16 shadow-2xl border border-rose-950/20 bg-[#1a010b]"
      >
        {/* Background Image Container with scale animation */}
        <motion.div
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src="/cta-banner.png" // REPLACE WITH YOUR BACKGROUND IMAGE PATH
            alt="CTA Background"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="object-cover object-center"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>

        {/* Main Content with relative z-10 */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center">
          {/* Main Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.12] text-balance drop-shadow-md">
            Transform Your Business with Our Cutting-Edge Software Solutions
          </h2>

          {/* Interactive Dual-Pill Button */}
          <motion.a
            href="#contact"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-1.5 p-1.5 pl-6 bg-white text-zinc-900 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl hover:shadow-pink-500/20 hover:bg-zinc-50"
          >
            <span>Lets chat</span>
            <motion.div
              variants={{
                hover: { rotate: 45, backgroundColor: "#b90049" },
              }}
              transition={{ duration: 0.25, ease: "easeInOut" as const }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#800033] flex items-center justify-center text-white shadow-inner transition-colors duration-200"
            >
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </motion.div>
          </motion.a>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 pt-2 text-xs sm:text-sm font-medium text-pink-100/90 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
            <span>Now Booking New Projects</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
