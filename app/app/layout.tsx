import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Notepad } from "@/components/Notepad";
import { Sidebar } from "@/components/Sidebar";
import { CommandSearch } from "@/components/CommandSearch";
import { ChatBot } from "@/components/ChatBot";
import { RegisterSW } from "@/components/RegisterSW";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "MSP Exams Office",
  description: "Single source of truth for MSP exam coordination",
  manifest: "/manifest.json",
  themeColor: "#001C3D",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Exams Office",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 px-4 py-4 pt-20 md:px-10 md:py-10 md:pt-10 max-w-6xl">
            <div className="fade-up">{children}</div>
          </main>
        </div>
        <CommandSearch />
        <Notepad />
        <ChatBot />
        <RegisterSW />
      </body>
    </html>
  );
}
