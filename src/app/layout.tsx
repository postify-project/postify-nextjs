import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

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
      <body
        suppressHydrationWarning={true}
        className="h-full bg-[#0e1017] font-inter text-[#f3f4f6]"
      >
        {children}
      </body>
    </html>
  );
}
