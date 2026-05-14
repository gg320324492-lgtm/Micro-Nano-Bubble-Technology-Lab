import Card from "@/components/ui/Card";
import RevealCard from "@/components/motion/RevealCard";

const steps = [
  {
    title: "邮件自我介绍",
    badge: "当天可完成",
    description: "说明背景与兴趣方向，附简历/成绩单/代表作（如有）。",
  },
  {
    title: "沟通交流",
    badge: "1-3 天安排",
    description: "了解课题项目与工作方式，确认双方期望与投入节奏。",
  },
  {
    title: "从小任务开始",
    badge: "1-2 周进入状态",
    description: "完成一个可交付小目标，逐步参与完整课题与长期合作。",
  },
];

const checklist = ["自我介绍", "研究兴趣", "简历", "成绩单", "代表作 / 项目经历"];

export default function JoinSteps() {
  return (
    <section aria-labelledby="steps-title" className="h-full">
      <Card as="section" className="rounded-3xl border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-28">
        <h2 id="steps-title" className="text-xl font-semibold text-[var(--text)] md:text-2xl">
          加入流程
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">3 steps</p>

        <div className="mt-5 space-y-3 text-sm">
          {steps.map((step, idx) => (
            <RevealCard key={step.title} delay={idx * 0.05}>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                      {idx + 1}
                    </span>
                    <div className="font-semibold text-[var(--text)]">{step.title}</div>
                  </div>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--accent)]">
                    {step.badge}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)]">{step.description}</p>
              </div>
            </RevealCard>
          ))}

          <RevealCard delay={0.18}>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text)]">申请材料清单</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-[var(--text-secondary)]">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealCard>
        </div>
      </Card>
    </section>
  );
}
