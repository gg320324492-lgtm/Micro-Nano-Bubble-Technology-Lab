// FAQ 需要根据 <details> 展开/收起状态做高度动画
"use client";

import Card from "@/components/ui/Card";
import RevealCard from "@/components/motion/RevealCard";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
          {faqs.map((item, idx) => (
            <FaqItem key={item.q} q={item.q} a={item.a} delay={idx * 0.05} />
          ))}
        </div>
      </Card>
    </section>
  );
}

function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <RevealCard key={q} delay={delay} className="">
      <details
        open={open}
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
        className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition hover:bg-[var(--accent-soft)]/50"
      >
        <summary className="cursor-pointer font-medium text-[var(--text)]">
          {q}
        </summary>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2 leading-7 text-[var(--text-secondary)]">
                {a}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </details>
    </RevealCard>
  );
}

