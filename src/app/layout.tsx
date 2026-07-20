import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Sidebar from "@/app/components/sidebar/Sidebar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Postify AI | AI Powered Social Media Marketing Platform",
  description:
    "Postify AI is an AI-powered social media marketing platform that helps businesses and individuals create, schedule, and analyze their social media content. With Postify AI, you can generate engaging posts, optimize your posting schedule, and gain insights into your audience's behavior to improve your social media strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Google for Auth */}
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body className="h-full bg-[#0e1017] font-inter text-[#f3f4f6]">
        {/* Top Fixed Navigation */}
        <Navbar />

        {/* Layout Shell */}
        <div className="flex h-full pt-[52px]">
          {/* Left Sidebar View */}
          <Sidebar />

          {/* Right Fluid Scroll Panel */}
          <main className="h-full w-full overflow-y-auto pl-[60px] md:pl-[200px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
