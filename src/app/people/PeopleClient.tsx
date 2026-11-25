"use client";

// 成员页客户端外壳：rsp-hero 左对齐 + V4 详情档案卡（已固化，宽档 · 文字大小 M）
// 此前的 V1/V2/V3/V5 版式、文字大小档与切换器已移除
import { useDeferredValue, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

import * as peopleModule from "@/data/people";
import type { Person } from "@/data/people";
import Section from "@/components/ui/Section";
import PublicImage from "@/components/PublicImage";
import { DIRECTION_TAGS } from "@/lib/peopleTheme";
import { pickArray } from "@/lib/data";

// ── 卡片动效（已固化：入场「浮起」+ 悬停「光晕」） ──
const EASE = [0.22, 1, 0.36, 1] as const;

function buildEnterVariants(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
  };
}

function normalize(s: unknown) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const ROLE_MAIN_LABEL: Record<string, string> = {
  ALL: "全部",
  PhD: "博士生",
  Master: "硕士生",
  Undergrad: "本科生",
  Alumni: "已毕业",
};

const ROLE_BADGE_LABEL: Record<string, string> = {
  ALL: "All",
  PhD: "PhD",
  Master: "Master",
  Undergrad: "Undergrad",
  Alumni: "Graduated",
};

function roleLabel(role: string) {
  return ROLE_MAIN_LABEL[role] ?? role;
}

function groupOrder(role: string) {
  const order: Record<string, number> = { PhD: 0, Master: 1, Undergrad: 2, Alumni: 3 };
  return order[role] ?? 99;
}

export default function PeopleClient() {
  const reduceMotion = useReducedMotion();
  const all = pickArray<Person>(peopleModule, ["people"]).filter((p) =>
    ["PhD", "Master", "Undergrad", "Alumni"].includes(String(p.role))
  );

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [tagFilter, setTagFilter] = useState<string>("ALL");

  const roleOptions = useMemo(() => {
    const exist = new Set(all.map((p) => String(p.role)));
    const ordered = ["PhD", "Master", "Undergrad", "Alumni"].filter((r) => exist.has(r));
    return ["ALL", ...ordered];
  }, [all]);

  function handleTagClick(tag: string) {
    setTagFilter((prev) => (prev === tag ? "ALL" : tag));
  }

  const baseNoTag = useMemo(() => {
    const q = normalize(deferredQuery);
    return all
      .filter((p) => (roleFilter === "ALL" ? true : String(p.role) === roleFilter))
      .filter((p) => {
        if (!q) return true;
        const hay = normalize(
          [
            p.nameZh,
            p.nameEn,
            p.titleZh,
            p.orgZh,
            p.cohort ? `${p.cohort}级` : "",
            (p.tags ?? []).join(" "),
            p.introZh,
          ].join(" ")
        );
        return hay.includes(q);
      });
  }, [all, deferredQuery, roleFilter]);

  const directionChips = useMemo(() => {
    const exist = DIRECTION_TAGS.filter((t) => all.some((p) => (p.tags ?? []).includes(t)));
    return exist.map((t) => ({
      tag: t,
      count: baseNoTag.filter((p) => (p.tags ?? []).includes(t)).length,
    }));
  }, [all, baseNoTag]);

  const filtered = useMemo(
    () => baseNoTag.filter((p) => (tagFilter === "ALL" ? true : (p.tags ?? []).includes(tagFilter))),
    [baseNoTag, tagFilter]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Person[]>();
    for (const p of filtered) {
      const role = String(p.role ?? "Other");
      if (!map.has(role)) map.set(role, []);
      map.get(role)!.push(p);
    }
    const roles = Array.from(map.keys()).sort((a, b) => groupOrder(a) - groupOrder(b));
    return roles.map((r) => ({
      role: r,
      items: map.get(r)!.slice().sort((a, b) => {
        const ca = Number(a.cohort ?? 0);
        const cb = Number(b.cohort ?? 0);
        if (ca !== cb) return ca - cb;
        return String(a.nameZh).localeCompare(String(b.nameZh), "zh");
      }),
    }));
  }, [filtered]);

  /* ── V4 · 详情档案卡（头像+基本信息头 / 研究简介+标签，文字完整不截断） ── */
  function renderV4Card(p: Person, index: number) {
    const name = p.nameZh || p.nameEn || "?";
    const photo = p.avatar;

    return (
      <motion.div
        key={p.id}
        className="ppl-v4__wrap ppl-v4__wrap--glow"
        variants={buildEnterVariants((index % 3) * 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <Link href={`/people/${p.id}`} className="ppl-v4__card">
          <div className="ppl-v4__avatar">
            {photo ? (
              <PublicImage src={photo} variant="thumb" alt={name} fill sizes="80px" loading="lazy" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-[var(--navy-ink-dim)]">
                {name.slice(0, 1)}
              </div>
            )}
          </div>
          <div className="ppl-v4__head">
            <div className="ppl-v4__name">{p.nameZh}</div>
            {p.nameEn ? <div className="ppl-v4__nameEn">{p.nameEn}</div> : null}
            <div className="ppl-v4__meta">
              <span>{p.titleZh}</span>
              {p.cohort ? <span>· {p.cohort}级</span> : null}
            </div>
          </div>
          <div>
            <div className="ppl-v4__intro">{p.introZh}</div>
            {(p.tags ?? []).length ? (
              <div className="ppl-v4__tags">
                {(p.tags ?? []).map((t) => (
                  <span key={t} className="ppl-v4__tag">{t}</span>
                ))}
              </div>
            ) : null}
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="theme-navy">
      <Section container="wide">
        {/* Hero — 左对齐仪器手册风格 */}
        <header className="rsp-hero">
          <span className="rsp-kicker">PEOPLE · 团队成员</span>
          <h1 className="rsp-h1">课题组学生与毕业成员</h1>
          <p className="rsp-lede">
            本页仅展示学生与已毕业成员（博士/硕士/本科/已毕业），导师信息请见首页。支持关键词搜索、角色筛选与方向筛选。
          </p>
          <div className="rsp-headrule" />
        </header>

        <div className="ppl-page">
          {/* 搜索 + 计数 */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              id="people-search"
              name="people-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索：姓名 / 方向 / 单位 / 标签…"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--accent)]/30 sm:max-w-md"
            />
            <div className="text-sm text-[var(--muted)]">共 {filtered.length} 人</div>
          </div>

          {/* 角色筛选 TAB — C 方块编号版式（已固化） */}
          <div className="ct-tabs ct-tabs--role" data-style="c">
            {roleOptions.map((r, i) => (
              <motion.button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`ct-tabs__btn ${roleFilter === r ? "is-on" : ""}`}
                aria-pressed={roleFilter === r}
                data-index={String(i).padStart(2, "0")}
                data-count={r === "ALL" ? all.length : all.filter((p) => String(p.role) === r).length}
                whileTap={reduceMotion ? {} : { scale: 0.96 }}
              >
                <span className="block">{ROLE_MAIN_LABEL[r] ?? r}</span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-widest opacity-70">
                  {ROLE_BADGE_LABEL[r] ?? ""}
                </span>
              </motion.button>
            ))}
          </div>

          {/* 方向快捷筛选 — A 药丸流（已固化） */}
          {directionChips.length ? (
            <div className="dir-filter" data-style="a">
              <div className="dir-filter__label">方向快捷筛选：</div>
              <div className="dir-filter__list">
                {directionChips.map(({ tag, count }, i) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`dir-chip ${tagFilter === tag ? "is-on" : ""}`}
                    aria-pressed={tagFilter === tag}
                    data-index={String(i).padStart(2, "0")}
                    data-count={count}
                  >
                    <span>{tag}</span>
                    <span className="dir-chip__count">{count}</span>
                  </button>
                ))}
                {tagFilter !== "ALL" ? (
                  <button type="button" onClick={() => setTagFilter("ALL")} className="dir-filter__clear">
                    清除标签筛选
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* 内容区 — V4 详情档案卡 */}
          <div className="ppl-v4">
            {grouped.map(({ role, items }) => (
              <section key={role}>
                <h2 className="ppl-v4__group-title">
                  <span className="ppl-v4__group-dot" />
                  {roleLabel(role)}
                  <span className="ppl-v4__group-count">({items.length})</span>
                </h2>
                <div className="ppl-v4__grid">{items.map((p, i) => renderV4Card(p, i))}</div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
