import type { Metadata } from "next";
import PublicationsClient from "./PublicationsClient";

export const metadata: Metadata = {
  title: "成果 / Publications",
  description:
    "论文、专利、荣誉与项目。支持搜索、按年份筛选、Featured 置顶，以及 DOI/链接直达。",
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
