// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_SC, JetBrains_Mono } from "next/font/google";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Container from "@/components/Container";

const notoSerif = Noto_Serif_SC({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Micro & Nano Bubble Technology Lab",
  description: "Lab website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={jetbrainsMono.variable}>
      <body className={`min-h-dvh flex flex-col antialiased ${notoSerif.className}`}>
        <SiteHeader />

        {/* ✅ 让所有页面内容也统一居中 + 左右留白 */}
        <div className="flex-1 pt-[80px]">
          {children}
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
