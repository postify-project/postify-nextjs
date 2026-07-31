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
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 font-inter text-slate-800">
      {/* Top Navigation Bar */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Container Shell */}
      <div className="flex flex-1 pt-[56px] overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Content Area */}
        <main className="relative flex-1 overflow-y-auto pl-[60px] md:pl-[200px] transition-all duration-200 ease-in-out">
          <div className="container mx-auto min-h-full p-5 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
