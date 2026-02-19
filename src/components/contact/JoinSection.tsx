import Link from "next/link";
import Card from "@/components/ui/Card";

type JoinSectionProps = {
  email: string;
  joinMailSubject: string;
  coopMailSubject: string;
  amapLink: string;
};

export default function JoinSection({
  email,
  joinMailSubject,
  coopMailSubject,
  amapLink,
}: JoinSectionProps) {
  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="space-y-4 md:space-y-6"
    >
      <div>
        <h2
          id="join-title"
          className="text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl"
        >
          加入我们
        </h2>
        <p className="text-sm text-[var(--muted)] md:text-base">Join</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <Card
          as="section"
          className="flex h-full flex-col rounded-3xl border-[var(--border-strong)] bg-[var(--accent-soft)]/70 p-6 shadow-sm"
        >
          <div className="space-y-4 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
            <p>
              <span className="font-medium text-[var(--text)]">我们欢迎谁：</span>
              欢迎对水环境治理、饮用水安全、微纳米气泡、强化氧化、装置与控制方向感兴趣的同学加入。
            </p>
            <p>
              <span className="font-medium text-[var(--text)]">我们看重什么：</span>
              我们更看重主动性、动手能力、数据意识与持续学习能力。
            </p>
            <p>
              <span className="font-medium text-[var(--text)]">你需要准备什么：</span>
              建议准备自我介绍、研究兴趣与可投入时间，并附简历或个人介绍（PDF）。
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(
                joinMailSubject,
              )}`}
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg-deep)] hover:bg-[var(--accent-hover)]"
            >
              申请加入（邮件）
            </a>
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--accent-soft)]"
            >
              了解研究方向
            </Link>
          </div>
        </Card>

        <Card as="section" className="flex h-full flex-col rounded-3xl p-6" aria-label="快速入口">
          <h3 className="text-base font-semibold text-[var(--text)] md:text-lg">
            快速入口
          </h3>
          <p className="mt-1 text-xs text-[var(--text-secondary)] md:text-sm">
            一步到位找到你需要的入口。
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <QuickLink
              label="发送邮件申请加入"
              description="附上自我介绍与研究兴趣，通常 1 天内回复。"
              href={`mailto:${email}?subject=${encodeURIComponent(
                joinMailSubject,
              )}`}
            />
            <QuickLink
              label="科研合作联系"
              description="围绕成果转化、示范应用或联合项目开展合作。"
              href={`mailto:${email}?subject=${encodeURIComponent(
                coopMailSubject,
              )}`}
            />
            <QuickLink
              label="查看产业化案例"
              description="了解已有工程化落地与合作场景。"
              href="/industrialization"
              isInternal
            />
            <QuickLink
              label="查看实验室位置（地图）"
              description="快速定位到天津大学校区与学院位置。"
              href={amapLink}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}

type QuickLinkProps = {
  label: string;
  description: string;
  href: string;
  isInternal?: boolean;
};

function QuickLink({ label, description, href, isInternal }: QuickLinkProps) {
  const content = (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-[var(--text)]">
          {label}
        </div>
        <p className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-2">
          {description}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-medium text-[var(--accent)]">
        GO
      </span>
    </div>
  );

  if (isInternal) {
    return (
      <Link
        href={href}
        className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 hover:border-[var(--border-strong)] hover:bg-[var(--accent-soft)]/40 transition-colors"
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 hover:border-[var(--border-strong)] hover:bg-[var(--accent-soft)]/40 transition-colors"
    >
      {content}
    </a>
  );
}

