import Card from "@/components/ui/Card";

const faqs = [
  {
    q: "我没有相关基础，可以加入吗？",
    a: "可以。我们更看重学习能力与执行力，通常会从可落地的小任务开始。",
  },
  {
    q: "课题组更偏实验还是偏建模/控制？",
    a: "我们强调“机理—实验—建模—工程化”闭环，可根据兴趣侧重，也鼓励跨方向能力组合。",
  },
  {
    q: "邮件里需要写哪些信息？",
    a: "建议包含姓名/年级/学校、研究兴趣、可投入时间，以及过往经历与技能点，并附 PDF 简历。",
  },
];

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title">
      <Card
        as="section"
        className="rounded-3xl border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm"
      >
        <h2
          id="faq-title"
          className="text-lg font-semibold text-[var(--text)] md:text-xl"
        >
          常见问题
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">FAQ</p>

        <div className="mt-5 space-y-3 text-sm">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition hover:bg-[var(--accent-soft)]/50"
            >
              <summary className="cursor-pointer font-medium text-[var(--text)]">
                {item.q}
              </summary>
              <div className="mt-2 leading-7 text-[var(--text-secondary)]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Card>
    </section>
  );
}

