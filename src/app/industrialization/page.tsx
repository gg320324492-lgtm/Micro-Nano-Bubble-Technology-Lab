// src/app/industrialization/page.tsx
// 产业化主界面（server 薄壳：metadata + 客户端多版式组件）
import type { Metadata } from "next";
import industrialBases from "@/data/industrialization";
import IndustrializationClient, { type IzpBase } from "./IndustrializationClient";

export const metadata: Metadata = {
  title: "产业化",
  description: "天津大学微纳米气泡课题组的产业化应用基地与示范场景，涵盖水产养殖、农业灌溉等领域。",
};

export default function IndustrializationPage() {
  const bases: IzpBase[] = industrialBases.map((b) => ({
    slug: b.slug,
    titleZh: b.titleZh,
    titleEn: b.titleEn,
    briefZh: b.briefZh,
    cover: b.cover,
    locationZh: b.locationZh,
    locationUrl: b.locationUrl,
    highlightsZh: b.highlightsZh,
  }));

  return <IndustrializationClient bases={bases} />;
}
