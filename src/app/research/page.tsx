// src/app/research/page.tsx
// 研究索引页（server 薄壳：metadata + 客户端组件；版式 A × 108 已由用户确认）
import type { Metadata } from "next";
import ResearchPageClient from "./ResearchPageClient";

export const metadata: Metadata = {
  title: "研究方向",
  description:
    "了解天津大学微纳米气泡课题组的核心研究方向，涵盖气泡成核调控、水质安全保障、黑臭水体治理及水产养殖应用。",
};

export default function ResearchPage() {
  return <ResearchPageClient />;
}
