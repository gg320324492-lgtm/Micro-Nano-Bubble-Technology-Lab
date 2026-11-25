import type { Metadata } from "next";
import PeopleClient from "./PeopleClient";

export const metadata: Metadata = {
  title: "团队成员",
  description: "了解天津大学微纳米气泡课题组的博士生、硕士生、本科生及已毕业成员。",
};

export default function PeoplePage() {
  return <PeopleClient />;
}
