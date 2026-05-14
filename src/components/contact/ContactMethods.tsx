import type { ReactNode } from "react";
import CopyButton from "@/components/CopyButton";
import Card from "@/components/ui/Card";
import RevealCard from "@/components/motion/RevealCard";

type ContactMethodsProps = {
  email: string;
  addressLine1: string;
  addressLine2: string;
  address: string;
  amapLink: string;
  website: string;
  websiteText: string;
};

const actionBtnClass =
  "inline-flex h-9 min-w-[84px] items-center justify-center rounded-full border border-[var(--border-strong)] bg-white px-3 text-xs font-semibold text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]";

export default function ContactMethods({
  email,
  addressLine1,
  addressLine2,
  amapLink,
  website,
  websiteText,
}: ContactMethodsProps) {
  return (
    <section aria-labelledby="contact-title">
      <Card as="section" className="rounded-3xl border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 id="contact-title" className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
              联系方式
            </h2>
            <p className="text-sm text-[var(--muted)] md:text-base">Contact</p>
          </div>
          <div className="hidden rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs text-[var(--text-secondary)] md:block">
            响应时间：通常 24h 内
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <ContactRow label="邮箱 Email" icon="✉" delay={0}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <a className="break-all text-base font-semibold text-[var(--text)]" href={`mailto:${email}`}>
                {email}
              </a>
              <CopyButton text={email} className={actionBtnClass} />
            </div>
          </ContactRow>

          <ContactRow label="地址 Address" icon="📍" delay={0.05}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 text-[var(--text-secondary)]">
                <div className="font-medium text-[var(--text)]">{addressLine1}</div>
                <div className="font-medium text-[var(--text)]">{addressLine2}</div>
              </div>
              <a href={amapLink} target="_blank" rel="noreferrer" className={actionBtnClass}>
                导航前往
              </a>
            </div>
          </ContactRow>

          <ContactRow label="主页 Website" icon="🌐" delay={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <a className="font-semibold text-[var(--text)] underline" href={website} target="_blank" rel="noreferrer">
                {websiteText}
              </a>
              <a href={website} target="_blank" rel="noreferrer" className={actionBtnClass}>
                打开
              </a>
            </div>
          </ContactRow>
        </div>
      </Card>
    </section>
  );
}

type ContactRowProps = {
  label: string;
  icon: string;
  children: ReactNode;
  delay?: number;
};

function ContactRow({ label, icon, children, delay = 0 }: ContactRowProps) {
  return (
    <RevealCard className="rounded-2xl border border-[var(--border)] bg-white p-4" delay={delay}>
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs">{icon}</span>
        <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">{label}</div>
      </div>
      <div>{children}</div>
    </RevealCard>
  );
}
