import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "团队成员",
  description: "了解天津大学微纳米气泡课题组的教师、博士生、硕士生及本科生团队成员。",
};

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
