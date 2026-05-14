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
    q: "邮件里需要写哪些信息？",
    a: "建议包含姓名/年级/学校、研究兴趣、可投入时间，以及过往经历与技能点，并附 PDF 简历。",
  },
  {
    q: "课题组更偏实验还是偏建模/控制？",
    a: "我们强调机理-实验-建模-工程化闭环，可根据兴趣侧重，也鼓励跨方向能力组合。",
  },
];

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title">
      <Card as="section" className="rounded-3xl border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
        <h2 id="faq-title" className="text-xl font-semibold text-[var(--text)] md:text-2xl">
          常见问题
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">FAQ</p>

        <div className="mt-5 grid items-start gap-3 md:grid-cols-2">
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
    <RevealCard delay={delay} className="">
      <details
        open={open}
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
        className="rounded-2xl border border-[var(--border)] bg-white p-4 transition hover:border-[var(--border-strong)]"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-[var(--text)]">
          <span>{q}</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
            {open ? "−" : "+"}
          </span>
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
              <div className="pt-3 leading-7 text-[var(--text-secondary)]">{a}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </details>
    </RevealCard>
  );
}
