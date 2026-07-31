"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserPlus, BookOpen } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  baseSize: "sm" | "md" | "lg";
  desktopPos: { top?: string; bottom?: string; left?: string; right?: string };
  floatPath: { x: number[]; y: number[] };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Farhan Khan",
    role: "Full-Stack Dev & Team Lead",
    image: "/farhan-founder.png",
    baseSize: "lg",
    desktopPos: { top: "8%", left: "22%" },
    floatPath: { x: [0, 15, -10, 0], y: [0, -18, 12, 0] },
  },
  {
    id: "2",
    name: "Syed Sajid Hussain",
    role: "AI Engineer",
    image: "/syed-sajid.jpeg",
    baseSize: "sm",
    desktopPos: { top: "25%", left: "10%" },
    floatPath: { x: [0, -12, 10, 0], y: [0, 15, -15, 0] },
  },
  {
    id: "3",
    name: "Farhan Khan",
    role: "Full-Stack Lead",
    image: "/founder-man.png",
    baseSize: "md",
    desktopPos: { top: "15%", left: "50%" },
    floatPath: { x: [0, 18, -12, 0], y: [0, -12, 18, 0] },
  },
  {
    id: "4",
    name: "Saad Khatri",
    role: "Frontend Architect",
    image: "/founder-man.png",
    baseSize: "lg",
    desktopPos: { top: "6%", right: "12%" },
    floatPath: { x: [0, -15, 12, 0], y: [0, 16, -10, 0] },
  },
  {
    id: "5",
    name: "Sharjeel Khan",
    role: "Product Designer",
    image: "/founder-man.png",
    baseSize: "lg",
    desktopPos: { bottom: "10%", left: "8%" },
    floatPath: { x: [0, 12, -18, 0], y: [0, -15, 10, 0] },
  },
  {
    id: "6",
    name: "Daniyal Raza",
    role: "UX Researcher",
    image: "/founder-man.png",
    baseSize: "md",
    desktopPos: { bottom: "12%", left: "20%" },
    floatPath: { x: [0, -10, 15, 0], y: [0, 14, -12, 0] },
  },
  {
    id: "7",
    name: "Usman Ali",
    role: "Growth Marketer",
    image: "/founder-man.png",
    baseSize: "sm",
    desktopPos: { bottom: "30%", right: "28%" },
    floatPath: { x: [0, 14, -10, 0], y: [0, -16, 14, 0] },
  },
  {
    id: "8",
    name: "Abad Khan",
    role: "Product Designer",
    image: "/founder-man.png",
    baseSize: "lg",
    desktopPos: { bottom: "8%", right: "12%" },
    floatPath: { x: [0, -16, 14, 0], y: [0, 12, -18, 0] },
  },
];

export const MeetOurExperts: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Initial Resting Dimensions (in pixels)
  const baseDimensions = {
    sm: { width: 64, height: 64 },
    md: { width: 112, height: 112 },
    lg: { width: 176, height: 176 },
  };

  // Expanded Target Dimensions (in pixels) on Hover - gives full space for readable text
  const expandedDimension = { width: 220, height: 220 };

  return (
    <section
      id="experts"
      className="relative w-full min-h-[700px] md:min-h-[850px] bg-[#fdfafb] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans flex flex-col justify-center items-center"
    >
      {/* Center Fixed Content */}
      <div className="relative z-30 max-w-2xl mx-auto text-center space-y-6 my-auto pointer-events-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1a010b]"
        >
          Meet Our Experts.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
        >
          <button className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full bg-[#800033] hover:bg-[#b90049] text-white font-medium text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-pink-900/20 active:scale-95">
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Meet Our Team</span>
          </button>

          <button className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm sm:text-base transition-all duration-300 shadow-sm active:scale-95">
            <BookOpen className="w-4 h-4 text-zinc-700 stroke-[2]" />
            <span>Read Our Story</span>
          </button>
        </motion.div>
      </div>

      {/* Desktop Floating Canvas */}
      <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
        {teamMembers.map((member, index) => {
          const isHovered = hoveredId === member.id;
          const currentBase = baseDimensions[member.baseSize];

          return (
            <motion.div
              key={member.id}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ ...member.desktopPos }}
              animate={
                isHovered
                  ? { x: 0, y: 0 }
                  : {
                      x: member.floatPath.x,
                      y: member.floatPath.y,
                    }
              }
              transition={
                isHovered
                  ? { duration: 0 }
                  : {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 6 + index,
                      ease: "easeInOut" as const,
                    }
              }
              className={`absolute pointer-events-auto cursor-pointer ${
                isHovered ? "z-50" : "z-10"
              }`}
            >
              {/* Animating Width and Height directly (No Scale Distortion) */}
              <motion.div
                animate={{
                  width: isHovered
                    ? expandedDimension.width
                    : currentBase.width,
                  height: isHovered
                    ? expandedDimension.height
                    : currentBase.height,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 22,
                }}
                className="relative overflow-hidden rounded-[1.5rem] shadow-xl border border-rose-950/10 flex flex-col justify-end"
              >
                {/* Replaced Image Asset with CSS Gradient Background */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ffc5be] via-[#fca8a1] to-[#f88f87] opacity-100" />

                {/* Person Photo */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="300px"
                  className="object-cover object-top relative z-10"
                />

                {/* Details Badge Overlay - Fixed font size, clear layout */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 12,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" as const }}
                  className="relative z-20 m-2.5 p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-white/60 text-zinc-900 shadow-md"
                >
                  <p className="text-xs font-bold leading-snug truncate text-zinc-900">
                    {member.name}
                  </p>
                  <p className="text-[11px] text-zinc-600 font-medium truncate">
                    {member.role}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Screen Fallback */}
      <div className="md:hidden w-full mt-10 grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative aspect-square rounded-[1.25rem] overflow-hidden border border-rose-950/10 shadow-md p-2 flex flex-col justify-end"
          >
            <Image
              src="/founder-bg.png"
              alt="Card Background"
              fill
              quality={100}
              className="object-cover"
            />
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="200px"
              className="object-cover object-top relative z-10"
            />
            <div className="relative z-20 p-2 rounded-lg bg-white/80 backdrop-blur-sm">
              <p className="text-xs font-bold text-zinc-900 truncate">
                {member.name}
              </p>
              <p className="text-[10px] text-zinc-600 truncate">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
