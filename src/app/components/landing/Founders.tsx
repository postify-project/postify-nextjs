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
    image: "/farhan.png",
    baseSize: "lg",
    desktopPos: { top: "18%", left: "18%" },
    floatPath: { x: [0, 10, -8, 0], y: [0, -10, 8, 0] },
  },
  {
    id: "2",
    name: "Syed Sajid Hussain",
    role: "AI Engineer",
    image: "/sajid.png",
    baseSize: "sm",
    desktopPos: { top: "35%", left: "6%" },
    floatPath: { x: [0, -8, 8, 0], y: [0, 8, -8, 0] },
  },
  {
    id: "3",
    name: "Ubaid",
    role: "Full Stack Developer",
    image: "/ubaid.png",
    baseSize: "md",
    desktopPos: { top: "18%", left: "46%" },
    floatPath: { x: [0, 10, -8, 0], y: [0, -8, 10, 0] },
  },
  {
    id: "4",
    name: "Rana Adil",
    role: "FullStack Developer",
    image: "/adil.png",
    baseSize: "lg",
    desktopPos: { top: "18%", right: "10%" },
    floatPath: { x: [0, -10, 8, 0], y: [0, 10, -8, 0] },
  },
  {
    id: "5",
    name: "Muneer",
    role: "AI Engineer",
    image: "/muneer.png",
    baseSize: "lg",
    desktopPos: { bottom: "6%", left: "6%" },
    floatPath: { x: [0, 8, -10, 0], y: [0, -8, 6, 0] },
  },
  {
    id: "6",
    name: "Luqman Khan",
    role: "FullStack Developer",
    image: "/luqman.png",
    baseSize: "md",
    desktopPos: { bottom: "8%", left: "22%" },
    floatPath: { x: [0, -6, 8, 0], y: [0, 8, -6, 0] },
  },
  {
    id: "7",
    name: "Hamza",
    role: "FullStack Developer",
    image: "/hamza.png",
    baseSize: "sm",
    desktopPos: { bottom: "25%", right: "22%" },
    floatPath: { x: [0, 8, -6, 0], y: [0, -8, 8, 0] },
  },
  {
    id: "8",
    name: "Ayan ",
    role: "AI Engineer",
    image: "/ayan.png",
    baseSize: "lg",
    desktopPos: { bottom: "6%", right: "8%" },
    floatPath: { x: [0, -8, 8, 0], y: [0, 8, -10, 0] },
  },
  {
    id: "9",
    name: "Shamas",
    role: "AI Engineer",
    image: "/shamas.png",
    baseSize: "md",
    desktopPos: { bottom: "8%", right: "46%" },
    floatPath: { x: [0, -8, 8, 0], y: [0, 8, -10, 0] },
  },
];

export const MeetOurExperts: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Original Resting Dimensions Restored
  const baseDimensions = {
    sm: { width: 64, height: 64 },
    md: { width: 112, height: 112 },
    lg: { width: 176, height: 176 },
  };

  // Original Hover Target Dimensions Restored
  const expandedDimension = { width: 220, height: 220 };

  return (
    <section
      id="experts"
      className="relative w-full h-[100dvh] max-h-[100dvh] bg-[#fdfafb] pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans flex flex-col justify-between items-center"
    >
      {/* Center Fixed Content */}
      <div className="relative z-30 max-w-2xl mx-auto text-center space-y-4 my-auto pointer-events-auto">
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
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ffc5be] via-[#fca8a1] to-[#f88f87] opacity-100" />

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="300px"
                  className="object-cover object-top relative z-10"
                />

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
      <div className="md:hidden w-full z-30 pb-4">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-2 py-2 no-scrollbar">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="snap-center shrink-0 w-28 h-28 relative rounded-[1.25rem] overflow-hidden border border-rose-950/10 shadow-md p-1.5 flex flex-col justify-end"
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
                sizes="150px"
                className="object-cover object-top relative z-10"
              />
              <div className="relative z-20 p-1.5 rounded-lg bg-white/80 backdrop-blur-sm">
                <p className="text-[10px] font-bold text-zinc-900 truncate">
                  {member.name}
                </p>
                <p className="text-[8px] text-zinc-600 truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
