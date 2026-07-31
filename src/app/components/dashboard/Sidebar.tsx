"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Scissors,
  Users,
  KeyRound,
  History,
  Sparkles,
  Image as ImageIcon,
  Globe,
  UploadCloud,
  Settings,
  X,
} from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      path: "/dashboard/AiVideoGenerator",
      label: "AI Video Gen",
      icon: <Video className="w-4 h-4" />,
    },
    {
      path: "/dashboard/connections",
      label: "Connections",
      icon: <Users className="w-4 h-4" />,
    },
    {
      path: "/dashboard/credentials",
      label: "API Credentials",
      icon: <KeyRound className="w-4 h-4" />,
    },
    {
      path: "/dashboard/history",
      label: "Task History",
      icon: <History className="w-4 h-4" />,
    },
    {
      path: "/dashboard/postGenerator",
      label: "AI Social Post",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      path: "/dashboard/thumbnail",
      label: "AI Thumbnail",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      path: "/dashboard/translator",
      label: "Video Translator",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      path: "/dashboard/video-upload",
      label: "Video Upload",
      icon: <UploadCloud className="w-4 h-4" />,
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between border-r border-zinc-200/80 bg-[#FDFAFC] p-3 transition-transform duration-300 ease-in-out lg:top-[52px] lg:translate-x-0 ${
          isOpen ? "translate-x-0 w-[240px]" : "-translate-x-full lg:w-[220px]"
        }`}
      >
        <div className="space-y-4">
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between px-2 pt-2 pb-1 lg:hidden">
            <span className="text-sm font-bold text-zinc-900 tracking-tight">
              Postify Menu
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-pink-50 text-pink-700 border border-pink-200/80 shadow-xs"
                      : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center transition-colors duration-200 ${
                      isActive
                        ? "text-pink-600"
                        : "text-zinc-400 group-hover:text-zinc-700"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Brand Tag */}
        <div className="border-t border-zinc-200/80 pt-3 mt-4">
          <div className="flex items-center justify-between px-2 text-[11px] font-semibold text-zinc-500">
            <span>Postify System</span>
            <span className="px-2 py-0.5 rounded-full bg-[#800033] text-white text-[9px] font-bold">
              v1.0.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
