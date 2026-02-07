// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Container from "@/components/Container";

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
    <html lang="zh-CN">
      <body className="min-h-dvh flex flex-col bg-white text-gray-900">
        <SiteHeader />

        {/* ✅ 让所有页面内容也统一居中 + 左右留白 */}
        <div className="flex-1">
          <Container>{children}</Container>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
