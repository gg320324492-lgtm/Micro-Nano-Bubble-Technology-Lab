// src/components/PeopleSectionNavy.tsx
// 方向 A · 仪器手册语言 —— 团队区（首页第 05 章 · round 06 选定 D · 年级时间线 + 1880 宽）
// 统计条为 tab 筛选（博士生/硕士生/本科生/已毕业，选中滑动条动效）；
// 时间线按入学年份分层，头像卡两列挂在轴上，每 tab 最多显示 5 人
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PublicImage from "@/components/PublicImage";
import type { PersonView } from "@/types";

export type PeopleFilter = "PhD" | "Master" | "Undergrad" | "Alumni";

const FILTERS: { key: PeopleFilter; label: string }[] = [
  { key: "PhD", label: "博士生" },
  { key: "Master", label: "硕士生" },
  { key: "Undergrad", label: "本科生" },
  { key: "Alumni", label: "已毕业" },
];

const ROLE_LABELS: Record<string, string> = {
  PhD: "博士",
  Master: "硕士",
  Undergrad: "本科",
  Alumni: "已毕业",
};

function pickPersonPhoto(p: PersonView): string {
  return (p.photo ?? p.avatar ?? p.image ?? p.img ?? p.photoUrl ?? p.avatarUrl ?? p.headshot ?? "") as string;
}

function personName(p: PersonView): string {
  return (p.nameZh ?? p.name ?? "") as string;
}

export default function PeopleSectionNavy({
  allPeople,
}: {
  allPeople: PersonView[];
}) {
  const [filter, setFilter] = useState<PeopleFilter>("PhD");

  // tab 筛选
  const filtered = allPeople.filter((p) => String(p.role) === filter);
  const shown = filtered.slice(0, 5);
  const hidden = filtered.length - shown.length;

  // 按 cohort 倒序分层（同年同层）
  const byCohort = new Map<number, PersonView[]>();
  for (const p of shown) {
    const c = Number(p.cohort ?? 0) || 0;
    if (!byCohort.has(c)) byCohort.set(c, []);
    byCohort.get(c)!.push(p);
  }
  const cohorts = [...byCohort.keys()].sort((a, b) => b - a);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="ppl-wrap">
        <header className="section-head">
          <span className="section-head__no">05</span>
          <span className="section-head__zh">团队成员</span>
          <span className="section-head__line" aria-hidden="true" />
          <span className="section-head__en">TEAM</span>
        </header>

        <div className="ppl-counts" role="tablist" aria-label="成员分类筛选">
          {FILTERS.map((f) => {
            const n = allPeople.filter((p) => String(p.role) === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                className={`ppl-count ${active ? "ppl-count--on" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                <span className="ppl-count__n">{n}</span>
                <span className="ppl-count__t">{f.label}</span>
                {active ? (
                  <motion.span
                    layoutId="ppl-tab-underline"
                    className="ppl-count__bar"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="ppl-tl-wrap">
          <div className="ppl-tl-axis" aria-hidden="true" />
          {cohorts.map((c) => (
            <div key={c} className="ppl-tl-year">
              <div className="ppl-tl-yearlabel">
                <span className="ppl-tl-yearnum">{c}</span>
                <span className="ppl-tl-yeart">级</span>
              </div>
              <div className="ppl-tl-people">
                {byCohort.get(c)!.map((p, idx) => (
                  <motion.div
                    key={(p.id as string) ?? idx}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                    className="ppl-tl-person"
                  >
                    <Avatar p={p} sizes="72px" />
                    <div className="ppl-tl-pinfo">
                      <div className="ppl-tl-pname">{personName(p)}</div>
                      <div className="ppl-tl-prole">
                        {ROLE_LABELS[String(p.role)] ?? String(p.role)}
                      </div>
                      {p.tags?.length ? (
                        <div className="ppl-tl-ptag">{p.tags[0]}</div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Link href="/people" className="rs-more">
          {hidden > 0 ? `查看全部成员（还有 ${hidden} 位 →）` : "查看全部成员"}
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </motion.section>
  );
}

/* ── 头像 ── */

function Avatar({ p, sizes }: { p: PersonView; sizes: string }) {
  const photo = pickPersonPhoto(p);
  return (
    <div className="ppl-avatar">
      {photo ? (
        <PublicImage
          src={photo}
          variant="thumb"
          alt={personName(p)}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <span className="ppl-avatar__fallback">
          {(personName(p) || "?").slice(0, 1)}
        </span>
      )}
    </div>
  );
}
