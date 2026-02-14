// src/components/PeopleCard.tsx
"use client";

import type { Person } from "@/data/people";
import PublicImage from "@/components/PublicImage";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { getDirectionTone, getRoleTone } from "@/lib/peopleTheme";

type Props = {
  person: Person;
  onTagClick?: (tag: string) => void;
  activeTag?: string;
};

function pickPhoto(p: any): string {
  return (
    p.photo ||
    p.avatar ||
    p.image ||
    p.img ||
    p.photoUrl ||
    p.avatarUrl ||
    p.headshot ||
    ""
  );
}

export default function PeopleCard({ person, onTagClick, activeTag }: Props) {
  const p: any = person as any;

  const photo = pickPhoto(p);
  const nameZh = p.nameZh ?? "";
  const nameEn = p.nameEn ?? "";
  const cohort = p.cohort ? `${p.cohort}级` : "";
  const titleZh = p.titleZh ?? "";
  const orgZh = p.orgZh ?? p.org ?? "";
  const introZh = p.introZh ?? "";
  const tags: string[] = Array.isArray(p.tags) ? p.tags : [];
  const primaryTag = tags[0];
  const directionTone = getDirectionTone(primaryTag);
  const roleTone = getRoleTone(String(p.role ?? "ALL"));

  return (
    <Card className="relative overflow-hidden border-slate-200/90 bg-white/95 p-5 shadow-[0_10px_24px_rgba(15,45,92,0.09)] hover:shadow-[0_14px_32px_rgba(37,99,235,0.18)]">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${directionTone.bar}`} />
      <div className="flex gap-4">
        {/* Avatar */}
        <div
          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border ${roleTone.avatarBorder} ${roleTone.avatarBg}`}
        >
          {photo ? (
            <PublicImage
              src={photo}
              variant="thumb"
              alt={nameZh || nameEn || "person"}
              fill
              sizes="56px"
              loading="lazy"
              fetchPriority="low"
              className="object-cover"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center text-sm font-medium ${roleTone.avatarText}`}
            >
              {(nameZh || nameEn || "?").slice(0, 1)}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          {/* 第一行：仅姓名 */}
          <div className="flex min-w-0 items-baseline gap-x-2">
            <div className="truncate text-base font-semibold">
              {nameZh || nameEn}
            </div>
            {nameZh && nameEn ? (
              <div className="truncate text-sm text-slate-500">{nameEn}</div>
            ) : null}
          </div>

          {/* 第二行：年级 + 身份（如：2025级 + 硕士研究生） */}
          {cohort || titleZh ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {cohort ? (
                <div className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleTone.cohort}`}>
                  {cohort}
                </div>
              ) : null}
              {titleZh ? <div className="text-sm text-slate-700">{titleZh}</div> : null}
            </div>
          ) : null}

          {orgZh ? (
            <div className="mt-0.5 text-sm text-slate-500">{orgZh}</div>
          ) : null}

          {introZh ? (
            <div
              className="mt-3 text-sm leading-relaxed text-slate-700"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {introZh}
            </div>
          ) : null}
        </div>
      </div>

      {/* Tags */}
      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = activeTag === t;
            const tone = getDirectionTone(t);
            return (
              <Chip
                key={t}
                onClick={() => onTagClick?.(t)}
                active={active}
                size="sm"
                className={active ? tone.chipActive : tone.chip}
                title="点击按标签筛选"
              >
                {t}
              </Chip>
            );
          })}
        </div>
      ) : null}
    </Card>
  );
}
