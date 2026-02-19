import Card from "@/components/ui/Card";

const steps = [
  {
    title: "1）邮件自我介绍",
    badge: "通常 1 天内完成",
    description: "说明背景与兴趣方向，附简历/成绩单/代表作（如有）。",
  },
  {
    title: "2）沟通交流",
    badge: "通常 1–3 天安排",
    description: "了解课题项目与工作方式，匹配你的时间与目标。",
  },
  {
    title: "3）从小任务开始",
    badge: "通常 1–2 周进入状态",
    description: "完成一个明确小目标，逐步参与到完整课题中。",
  },
];

const checklist = [
  "自我介绍",
  "研究兴趣",
  "简历",
  "成绩单",
  "代表作 / 项目经历",
];

export default function JoinSteps() {
  return (
    <section aria-labelledby="steps-title">
      <Card
        as="section"
        className="rounded-3xl border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm"
      >
        <h2
          id="steps-title"
          className="text-lg font-semibold text-[var(--text)] md:text-xl"
        >
          加入流程
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">3 steps</p>

        <div className="mt-5 space-y-3 text-sm">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-semibold text-[var(--text)]">
                  {step.title}
                </div>
                <span className="rounded-[var(--radius-md)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--accent)]">
                  {step.badge}
                </span>
              </div>
              <p className="mt-2 text-[var(--text-secondary)]">
                {step.description}
              </p>
            </div>
          ))}

          <div className="mt-5 rounded-2xl bg-[var(--bg-elevated)] p-4">
            <h3 className="text-sm font-medium text-[var(--text)]">
              准备材料（申请邮件清单）
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--text-secondary)]">
              {checklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}

