// src/app/people/page.tsx
"use client";

import { useMemo, useState } from "react";
import * as peopleModule from "@/data/people";
import type { Person } from "@/data/people";
import PeopleCard from "@/components/PeopleCard";

function pickArray(mod: any, keys: string[]) {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (Array.isArray(v)) return v as Person[];
  }
  return [] as Person[];
}

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
    Alumni: "校友 Alumni",
  };
  return map[role] ?? role;
}

function groupOrder(role: string) {
  const order: Record<string, number> = {
    PhD: 0,
    Master: 1,
    Undergrad: 2,
    Alumni: 3,
  };
  return order[role] ?? 99;
}

const DIRECTION_TAGS = [
  "水质提升与安全保障",
  "气泡溃灭与·OH原位生成",
  "表面清洗与去除",
  "农业高效种养与盐碱土修复",
  "水环境治理设备开发",
];

export default function PeoplePage() {
  // ✅ 只展示学生/校友（避免与 Home PI 重复）
  const all = pickArray(peopleModule, ["people"]).filter((p) =>
    ["PhD", "Master", "Undergrad", "Alumni"].includes(String(p.role))
  );

  const [query, setQuery] = useState("");
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
    const q = normalize(query);

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
  }, [all, query, roleFilter]);

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
          // 优先按 cohort(新→旧)，再按姓名
          const ca = Number(a.cohort ?? 0);
          const cb = Number(b.cohort ?? 0);
          if (cb !== ca) return cb - ca;
          return String(a.nameZh).localeCompare(String(b.nameZh), "zh");
        }),
    }));
  }, [filtered]);

  return (
    <main className="py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">成员 People</h1>
          <p className="mt-2 text-sm text-gray-500">
            本页仅展示学生与校友信息（博士/硕士/本科/校友）。导师信息请见首页导师介绍。
            支持关键词搜索与按角色筛选；点击成员卡片标签或顶部“方向快捷标签”可直接筛选。
          </p>
        </div>

        <div className="w-full md:w-96">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索：姓名 / 方向 / 单位 / 标签…"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {roleOptions.map((r) => {
          const active = roleFilter === r;
          return (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={[
                "rounded-full border px-3 py-1.5 text-sm transition",
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              {r === "ALL" ? "全部" : roleLabel(r)}
            </button>
          );
        })}

        <div className="ml-auto text-xs text-gray-500">共 {filtered.length} 人</div>
      </div>

      {/* ✅ 方向快捷标签（五大方向一键筛） */}
      {directionChips.length ? (
        <div className="mt-3">
          <div className="mb-2 text-xs text-gray-500">方向快捷筛选：</div>
          <div className="flex flex-wrap gap-2">
            {directionChips.map(({ tag, count }) => {
              const active = tagFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs transition",
                    active
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                  title="点击按方向筛选（再点一次取消）"
                >
                  {tag}
                  <span className="ml-1 text-[11px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* 当前标签筛选提示 */}
      {tagFilter !== "ALL" ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">标签筛选：</span>
          <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
            {tagFilter}
          </span>
          <button
            type="button"
            onClick={() => setTagFilter("ALL")}
            className="text-xs text-gray-600 underline"
          >
            清除标签筛选
          </button>
        </div>
      ) : null}

      {/* Groups */}
      <div className="mt-8 space-y-10">
        {grouped.map(({ role, items }) => (
          <section key={role} className="space-y-4">
            <h2 className="text-xl font-semibold">
              {roleLabel(role)}
              <span className="ml-2 text-sm text-gray-500">({items.length})</span>
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <PeopleCard
                  key={p.id}
                  person={p}
                  onTagClick={handleTagClick}
                  activeTag={tagFilter === "ALL" ? undefined : tagFilter}
                />
              ))}
            </div>
          </section>
        ))}

        {!filtered.length ? (
          <div className="rounded-2xl border p-6 text-sm text-gray-600">
            没有匹配的成员信息，请调整关键词/角色筛选/标签筛选。
          </div>
        ) : null}
      </div>
    </main>
  );
}
