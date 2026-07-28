import React from "react";
import { Navbar } from "@/app/components/landing/Navbar";
import { HeroSection } from "@/app/components/landing/HeroSection";
import { Footer } from "@/app/components/landing/Footer";
import { Features } from "./components/landing/Features";
import { PostifyEverything } from "./components/landing/PostifyEverything";
import { CtaBanner } from "./components/landing/CTABanner";
import { FaqSection } from "./components/landing/FAQ";
import { TestimonialsSection } from "./components/landing/Testimonials";
import { MeetOurExperts } from "./components/landing/Founders";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col scroll-smooth bg-[#FDFAFC] font-sans antialiased text-zinc-900 selection:bg-pink-500 selection:text-white">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Hero & Content Section */}
      <main className="flex-1 w-full">
        <HeroSection />
        <Features />
        <PostifyEverything />
        <MeetOurExperts />
        <TestimonialsSection />
        <FaqSection />
        <CtaBanner />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
