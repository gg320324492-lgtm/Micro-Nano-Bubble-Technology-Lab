"use client";

// Contact 页客户端外壳：已固化 Hero D（居中）+ 版式 4（TAB）+ 大小 L（宽松）
import { useState } from "react";

import ContactMethods from "@/components/contact/ContactMethods";
import JoinSteps from "@/components/contact/JoinSteps";
import FaqSection from "@/components/contact/FaqSection";

export type ContactClientProps = {
  email: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  website: string;
  websiteText: string;
  amapLink: string;
  hero: React.ReactNode;
};

type TabKey = "contact" | "join" | "faq";

export default function ContactClient(props: ContactClientProps) {
  const [tab, setTab] = useState<TabKey>("contact");

  return (
    <>
      {/* Hero 顶部标题区（D 居中版式） */}
      <div className="ct-hero ct-hero--centered">{props.hero}</div>

      <div className="ct-page ct-l">
        {/* TAB 导航 */}
        <div className="ct-tabs">
          {(
            [
              ["contact", "联系方式"],
              ["join", "加入流程"],
              ["faq", "常见问题"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-selected={tab === k}
              className={`ct-tabs__btn ${tab === k ? "is-on" : ""}`}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* TAB 内容 */}
        {tab === "contact" ? <ContactMethods {...props} /> : null}
        {tab === "join" ? <JoinSteps /> : null}
        {tab === "faq" ? <FaqSection /> : null}
      </div>
    </>
  );
}
