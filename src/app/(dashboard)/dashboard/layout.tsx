"use client";

import { useState } from "react";
import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0e1017] font-inter text-[#f3f4f6]">
      {/* Top Navigation */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Shell Container */}
      <div className="flex flex-1 pt-[52px] overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Scrollable Content View */}
        <main className="relative flex-1 overflow-y-auto pl-[60px] md:pl-[200px] transition-all duration-200 ease-in-out">
          <div className="container mx-auto min-h-full p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
