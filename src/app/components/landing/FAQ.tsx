"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How does Postify create social media content?",
    answer:
      "Postify leverages advanced AI models trained on high-converting social copy to generate custom captions, post ideas, and visual concepts based on your prompt, website URL, or uploaded brand assets.",
  },
  {
    question: "Can Postify publish posts automatically?",
    answer:
      "Yes. Once you connect your social channels, you can set custom posting schedules. Postify handles direct publishing for single posts, carousels, and video content without requiring manual intervention.",
  },
  {
    question: "Does Postify reply to comments and direct messages?",
    answer:
      "Postify includes an AI-driven auto-responder that monitors engagement and draft or send on-brand replies to incoming comments and direct messages based on your predefined rules.",
  },
  {
    question: "Which social media platforms are supported?",
    answer:
      "We support direct auto-publishing and scheduling across LinkedIn, Instagram, X (Twitter), Facebook, TikTok, and Pinterest, with new integrations regularly added.",
  },
  {
    question: "Can I customize Postify to match my brand voice?",
    answer:
      "Absolutely. You can define custom brand personas, target tone parameters, core terminology, and guidelines so every generated piece of content speaks in your unique voice.",
  },
  {
    question: "Is my social media data secure?",
    answer:
      "Security is a core priority. Postify uses official, OAuth-backed social network APIs with end-to-end encryption to store access tokens and campaign data securely.",
  },
  {
    question: "Can I schedule posts for multiple accounts?",
    answer:
      "Yes, you can manage multiple brands or client workspaces within a single dashboard, organizing accounts into distinct channels and team permissions.",
  },
  {
    question: "Does Postify provide analytics and performance insights?",
    answer:
      "Yes. Postify delivers unified performance dashboards tracking reach, engagement, follower growth, and optimal posting times across all connected platforms.",
  },
];

export const FaqSection: React.FC = () => {
  // Keeps track of the currently open accordion index (null if all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#fdfafb] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-pink-200 bg-pink-50/50 text-xs font-medium text-[#800033] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#800033]" />
          Faqs
        </div>

        {/* Section Header */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a010b] text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 text-center max-w-2xl mb-12 sm:mb-16 leading-relaxed">
          Everything you need to know about Postify, AI automation, pricing,
          integrations, and getting started.
        </p>

        {/* Accordion List */}
        <div className="w-full divide-y divide-zinc-200/70 border-t border-b border-zinc-200/70">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-5 sm:py-6">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-zinc-900 group-hover:text-[#800033] transition-colors duration-200">
                    {item.question}
                  </span>

                  {/* Circular Button with Rotating Chevron */}
                  <div
                    className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#800033] text-white"
                        : "bg-[#800033] text-white hover:bg-[#b90049]"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    </motion.div>
                  </div>
                </button>

                {/* Animated Collapse Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] as const },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.25, 1, 0.5, 1] as const },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-12 text-sm sm:text-base text-zinc-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
