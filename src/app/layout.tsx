// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif_SC, JetBrains_Mono } from "next/font/google";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
  metadataBase: new URL("https://mnb-lab.cn"),
  title: {
    default: "微纳米气泡课题组 | Micro & Nano Bubble Technology Lab",
    template: "%s | 微纳米气泡课题组",
  },
  description:
    "天津大学微纳米气泡课题组，聚焦微纳米气泡技术的机理研究、装备开发与多场景应用，面向饮用水安全、水环境治理、农业增产与智能化工程系统。",
  keywords: [
    "微纳米气泡",
    "micro-nano bubble",
    "天津大学",
    "Tianjin University",
    "水处理",
    "water treatment",
    "臭氧",
    "ozone",
    "饮用水安全",
    "环境治理",
  ],
  authors: [{ name: "天津大学微纳米气泡课题组" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://mnb-lab.cn",
    siteName: "微纳米气泡课题组",
    title: "微纳米气泡课题组 | Micro & Nano Bubble Technology Lab",
    description:
      "聚焦微纳米气泡技术的机理研究、装备开发与多场景应用，面向饮用水安全、环境治理与智能化工程系统。",
    images: [
      {
        url: "/home/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "天津大学微纳米气泡课题组",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "微纳米气泡课题组 | Micro & Nano Bubble Technology Lab",
    description:
      "天津大学微纳米气泡课题组 — 机理研究、装备开发与多场景应用。",
    images: ["/home/og-cover.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "天津大学微纳米气泡课题组",
  alternateName: "Micro & Nano Bubble Technology Lab, Tianjin University",
  url: "https://mnb-lab.cn",
  logo: "https://mnb-lab.cn/logos/lab.png",
  image: "https://mnb-lab.cn/home/og-cover.jpg",
  description:
    "聚焦微纳米气泡技术的机理研究、装备开发与多场景应用，面向饮用水安全、水环境治理、农业增产与智能化工程系统。",
  address: {
    "@type": "PostalAddress",
    streetAddress: "海河教育园区雅观路135号 天津大学北洋园校区",
    addressLocality: "天津市",
    addressRegion: "津南区",
    postalCode: "300354",
    addressCountry: "CN",
  },
  sameAs: ["https://faculty.tju.edu.cn/226066/zh_CN/index.htm"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className={`min-h-dvh flex flex-col antialiased ${notoSerif.className}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="skip-to-content">
          跳转到主内容
        </a>
        <SiteHeader />

        {/* ✅ 让所有页面内容也统一居中 + 左右留白 */}
        <div id="main-content" className="flex-1 pt-[80px]" role="main">
          {children}
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}

