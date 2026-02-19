import CopyButton from "@/components/CopyButton";
import Card from "@/components/ui/Card";

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
  "inline-flex h-8 min-w-[78px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg-card)] px-3 text-xs font-medium text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)]";

export default function ContactMethods({
  email,
  addressLine1,
  addressLine2,
  address,
  amapLink,
  website,
  websiteText,
}: ContactMethodsProps) {
  return (
    <section aria-labelledby="contact-title">
      <Card as="section" className="rounded-3xl bg-[var(--accent-soft)]/20 p-6">
        <div className="mb-4">
          <h2
            id="contact-title"
            className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl"
          >
            联系方式
          </h2>
          <p className="text-sm text-[var(--muted)] md:text-base">Contact</p>
        </div>

        <div className="space-y-3 text-sm">
          <ContactRow label="邮箱 Email">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <a
                className="break-all font-medium text-[var(--text)]"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <CopyButton text={email} className={actionBtnClass} />
            </div>
          </ContactRow>

          <ContactRow label="地址 Address">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 text-[var(--text-secondary)]">
                <div className="font-medium text-[var(--text)]">
                  {addressLine1}
                </div>
                <div className="font-medium text-[var(--text)]">
                  {addressLine2}
                </div>
              </div>
              <a
                href={amapLink}
                target="_blank"
                rel="noreferrer"
                className={actionBtnClass}
              >
                导航前往
              </a>
            </div>
          </ContactRow>

          <ContactRow label="主页 Website">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <a
                className="font-medium text-[var(--text)] underline"
                href={website}
                target="_blank"
                rel="noreferrer"
              >
                {websiteText}
              </a>
              <a
                href={website}
                target="_blank"
                rel="noreferrer"
                className={actionBtnClass}
              >
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
  children: React.ReactNode;
};

function ContactRow({ label, children }: ContactRowProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

