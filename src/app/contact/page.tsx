import type { Metadata } from "next";
import Heading from "@/components/ui/Heading";
import contact from "@/data/contact";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "联系我们 / 加入我们",
  description: "联系天津大学微纳米气泡课题组，了解招生信息与产学研合作机会。",
};

export default function ContactPage() {
  const email = contact.email;
  const address = contact.addressZh;
  const addressParts = address.split("，");
  const addressLine1 = addressParts[0] ?? address;
  const addressLine2 = addressParts[1] ?? "";
  const addressLine3 = addressParts[2] ?? "";
  const website = contact.websiteZh;
  const websiteText = "faculty.tju.edu.cn";
  const amapLink = `https://www.amap.com/search?query=${encodeURIComponent(addressLine1)}`;

  const hero = (
    <Heading
      as="h1"
      title={
        <>
          联系我们 / 加入我们
          <span className="ct-hero__en">Contact&amp;JoinUs</span>
        </>
      }
      className="[&>h1]:text-[var(--text)]"
      subtitleClassName="text-[var(--text-secondary)]"
      subtitle="欢迎联系科研合作与加入事宜。你可以通过邮件、地图导航和教师主页快速建立沟通，我们会尽快回复并提供清晰路径。"
    />
  );

  return (
    <main className="theme-navy relative mx-auto w-full max-w-7xl px-4 py-10 md:py-14">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-28 h-64 w-64 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" />

      <ContactClient
        email={email}
        address={address}
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        addressLine3={addressLine3}
        website={website}
        websiteText={websiteText}
        amapLink={amapLink}
        hero={hero}
      />
    </main>
  );
}
