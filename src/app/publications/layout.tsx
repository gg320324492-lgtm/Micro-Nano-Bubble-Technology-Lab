import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "成果展示",
  description: "天津大学微纳米气泡课题组的学术论文、专利、科研项目与荣誉成果。",
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
