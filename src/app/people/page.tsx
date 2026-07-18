// src/app/people/page.tsx
"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as peopleModule from "@/data/people";
import type { Person } from "@/data/people";
import PeopleCard from "@/components/PeopleCard";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";
import { DIRECTION_TAGS, getDirectionTone, getRoleTone } from "@/lib/peopleTheme";
import { pickArray } from "@/lib/data";

function normalize(s: unknown) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function roleLabel(role: Person["role"] | string) {
  const map: Record<string, string> = {
    PhD: "博士生 PhD",
    Master: "硕士生 Master",
    Undergrad: "本科生 Undergrad",
    Alumni: "已毕业 Graduated",
  };
  return map[role] ?? role;
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

function groupOrder(role: string) {
  const order: Record<string, number> = {
    PhD: 0,
    Master: 1,
    Undergrad: 2,
    Alumni: 3,
  };
  return order[role] ?? 99;
}

export default function PeoplePage() {
  const reduceMotion = useReducedMotion();
  // ✅ 只展示学生/已毕业成员（避免与 Home PI 重复）
  const all = pickArray<Person>(peopleModule, ["people"]).filter((p) =>
    ["PhD", "Master", "Undergrad", "Alumni"].includes(String(p.role))
  );

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [tagFilter, setTagFilter] = useState<string>("ALL");

  // 角色选项（固定顺序）
  const roleOptions = useMemo(() => {
    const exist = new Set(all.map((p) => String(p.role)));
    const ordered = ["PhD", "Master", "Undergrad", "Alumni"].filter((r) =>
      exist.has(r)
    );
    return ["ALL", ...ordered];
  }, [all]);

  // ✅ 点击标签：切换标签筛选（重复点击同一标签=取消）
  const handleTagClick = (tag: string) => {
    setTagFilter((prev) => (prev === tag ? "ALL" : tag));
  };

  // ✅ 用于“方向快捷标签”的基础集合：只受【搜索 + 角色】影响，不受 tagFilter 影响（便于显示每个方向的人数）
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

  // ✅ 只显示数据里确实存在的方向标签 + 统计人数
  const directionChips = useMemo(() => {
    const exist = DIRECTION_TAGS.filter((t) =>
      all.some((p) => (p.tags ?? []).includes(t))
    );

    const counts: Record<string, number> = {};
    for (const t of exist) {
      counts[t] = baseNoTag.filter((p) => (p.tags ?? []).includes(t)).length;
    }

    return exist.map((t) => ({ tag: t, count: counts[t] ?? 0 }));
  }, [all, baseNoTag]);

  // 搜索 + 角色 + 标签筛选
  const filtered = useMemo(() => {
    return baseNoTag.filter((p) =>
      tagFilter === "ALL" ? true : (p.tags ?? []).includes(tagFilter)
    );
  }, [baseNoTag, tagFilter]);

  const activeTagTone = tagFilter === "ALL" ? null : getDirectionTone(tagFilter);

  // 分组（按 role）
  const grouped = useMemo(() => {
    const map = new Map<string, Person[]>();
    for (const p of filtered) {
      const role = String(p.role ?? "Other");
      if (!map.has(role)) map.set(role, []);
      map.get(role)!.push(p);
    }

    const roles = Array.from(map.keys()).sort(
      (a, b) => groupOrder(a) - groupOrder(b)
    );

    return roles.map((r) => ({
      role: r,
      items: map
        .get(r)!
        .slice()
        .sort((a, b) => {
          // 优先按 cohort(高年级→低年级；入学更早=年级更高)，再按姓名
          const ca = Number(a.cohort ?? 0);
          const cb = Number(b.cohort ?? 0);
          if (ca !== cb) return ca - cb;
          return String(a.nameZh).localeCompare(String(b.nameZh), "zh");
        }),
    }));
  }, [filtered]);

  return (
    <Section container="wide">
      {/* Header */}
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Heading
            as="h1"
            title="成员 People"
            className="[&>h1]:text-[var(--text)]"
            subtitleClassName="text-[var(--text-secondary)]"
            subtitle="本页仅展示学生与已毕业成员信息（博士/硕士/本科/已毕业）。导师信息请见首页导师介绍。支持关键词搜索与按角色筛选；点击成员卡片标签或顶部方向快捷标签可直接筛选。"
          />
        </div>

        <div className="w-full md:w-96">
          <input
            id="people-search"
            name="people-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索：姓名 / 方向 / 单位 / 标签…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--accent)]/30"
          />
        </div>
      </Reveal>

      {/* Filters */}
      <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-3 md:p-4">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-2 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {roleOptions.map((r) => {
              const active = roleFilter === r;
              const mainLabel = ROLE_MAIN_LABEL[r] ?? r;
              const badgeLabel = ROLE_BADGE_LABEL[r] ?? "";
              return (
                <motion.button
                  key={r}
                  type="button"
                  onClick={() => setRoleFilter(r)}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                  className="relative inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold"
                  aria-pressed={active}
                >
                  {active ? (
                    <motion.span
                      layoutId="people-role-tab-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-md"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  ) : null}
                  <span
                    className={`relative z-10 text-center leading-tight ${
                      active ? "text-white" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    <span className="block">{mainLabel}</span>
                    <span
                      className={`mt-0.5 block text-[10px] font-bold uppercase tracking-widest ${
                        active ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {badgeLabel}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 px-1 text-xs font-medium text-[var(--muted)]">
          共 {filtered.length} 人
        </div>
      </div>

      {/* ✅ 方向快捷标签（四大方向一键筛） */}
      {directionChips.length ? (
        <div className="mt-3">
          <div className="mb-2 text-xs font-medium text-[var(--muted)]">方向快捷筛选：</div>
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/90 p-2 shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {directionChips.map(({ tag, count }) => {
                const active = tagFilter === tag;
                return (
                  <motion.button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.02 }}
                    whileTap={reduceMotion ? {} : { scale: 0.98 }}
                    className="relative inline-flex items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold"
                    aria-pressed={active}
                    title="点击按方向筛选（再点一次取消）"
                  >
                    {active ? (
                      <motion.span
                        layoutId="people-direction-tab-active"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-md"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    ) : null}
                    <span
                      className={`relative z-10 w-full text-center leading-tight ${
                        active ? "text-white" : "text-[var(--text-secondary)]"
                      }`}
                    >
                      <span className="block line-clamp-2 text-balance">{tag}</span>
                      <span
                        className={`mt-1 block text-[10px] font-bold uppercase tracking-widest ${
                          active ? "text-white/80" : "text-[var(--muted)]"
                        }`}
                      >
                        {count} 人
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* 当前标签筛选提示 */}
      {tagFilter !== "ALL" ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">标签筛选：</span>
          <Badge className={`${activeTagTone?.badge ?? ""} px-3 py-1 text-xs font-semibold`}>
            {tagFilter}
          </Badge>
          <button
            type="button"
            onClick={() => setTagFilter("ALL")}
            className="text-xs font-medium text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]"
          >
            清除标签筛选
          </button>
        </div>
      ) : null}

      {/* Groups */}
      <div className="mt-8 space-y-10">
        {grouped.map(({ role, items }) => (
          <section
            key={role}
            className={`${getRoleTone(role).sectionSurface} ${getRoleTone(role).sectionBorder} space-y-4 rounded-2xl border p-4 md:p-5`}
          >
            <h2 className="flex items-center text-xl font-semibold text-[var(--text)]">
              <span className={`${getRoleTone(role).sectionDot} mr-2 inline-block h-2.5 w-2.5 rounded-full`} />
              {roleLabel(role)}
              <span className="ml-2 text-sm text-[var(--muted)]">({items.length})</span>
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, index) => (
                <Reveal key={p.id} delay={index * 0.03}>
                  <PeopleCard
                    person={p}
                    onTagClick={handleTagClick}
                    activeTag={tagFilter === "ALL" ? undefined : tagFilter}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        {!filtered.length ? (
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] p-6 text-sm text-[var(--muted)]">
            没有匹配的成员信息，请调整关键词/角色筛选/标签筛选。
          </div>
        ) : null}
      </div>
    </Section>
  );
}
