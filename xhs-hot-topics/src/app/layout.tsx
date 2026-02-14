import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "小红书内容生成器",
  description: "热点话题生成小红书推文文案",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
