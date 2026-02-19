import Link from "next/link";
import JoinSection from "@/components/contact/JoinSection";
import ContactMethods from "@/components/contact/ContactMethods";
import JoinSteps from "@/components/contact/JoinSteps";
import FaqSection from "@/components/contact/FaqSection";

export default function ContactPage() {
  const email = "wangtianzhi@tju.edu.cn";
  const addressLine1 = "天津市南开区卫津路92号（天津大学）";
  const addressLine2 = "邮编：300072";
  const address = `${addressLine1}，${addressLine2}`;
  const website = "https://faculty.tju.edu.cn/226066/zh_CN/index.htm";
  const websiteText = "faculty.tju.edu.cn";
  const amapLink = `https://www.amap.com/search?query=${encodeURIComponent(addressLine1)}`;

  const joinMailSubject = "【加入】姓名-学校/单位-意向方向";
  const coopMailSubject = "【合作】姓名-单位-合作方向";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-10 md:mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
          联系我们 / 加入我们&nbsp;
          <span className="align-baseline text-xl font-normal text-[var(--muted)]">
            Contact &amp; Join Us
          </span>
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          欢迎联系科研合作与加入事宜，我们会尽快回复并提供清晰路径。
        </p>
      </header>

      <div className="space-y-10 md:space-y-12">
        <JoinSection
          email={email}
          joinMailSubject={joinMailSubject}
          coopMailSubject={coopMailSubject}
          amapLink={amapLink}
        />

        <ContactMethods
          email={email}
          amapLink={amapLink}
          address={address}
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          website={website}
          websiteText={websiteText}
        />

        <JoinSteps />

        <FaqSection />
      </div>
    </main>
  );
}
