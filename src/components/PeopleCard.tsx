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

function pickPhoto(p: Person): string {
  const x = p as Record<string, unknown>;
  return (
    (x.photo as string) ||
    (x.avatar as string) ||
    (x.image as string) ||
    (x.img as string) ||
    (x.photoUrl as string) ||
    (x.avatarUrl as string) ||
    (x.headshot as string) ||
    ""
  );
}

export default function PeopleCard({ person, onTagClick, activeTag }: Props) {
  const p = person as Record<string, unknown>;

  const photo = pickPhoto(person);
  const nameZh = (p.nameZh ?? "") as string;
  const nameEn = (p.nameEn ?? "") as string;
  const cohort = p.cohort ? `${p.cohort}级` : "";
  const titleZh = (p.titleZh ?? "") as string;
  const orgZhRaw = (p.orgZh ?? p.org ?? "") as string;
  const orgZh = orgZhRaw === "天津大学" ? "" : orgZhRaw;
  const introZh = (p.introZh ?? "") as string;
  const tags: string[] = Array.isArray(p.tags) ? (p.tags as string[]) : [];
  const directionTone = getDirectionTone();
  const roleTone = getRoleTone(String(p.role ?? "ALL"));

  return (
    <Card className="relative flex h-full min-h-[220px] flex-col overflow-hidden p-5">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${directionTone.bar}`}
      />
      <div className="flex flex-1 gap-4">
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

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-baseline gap-x-2">
            <div className="truncate text-base font-semibold text-[var(--text)]">
              {nameZh || nameEn}
            </div>
            {nameZh && nameEn ? (
              <div className="truncate text-sm text-[var(--muted)]">
                {nameEn}
              </div>
            ) : null}
          </div>

          {cohort || titleZh ? (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {cohort ? (
                <div
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleTone.cohort}`}
                >
                  {cohort}
                </div>
              ) : null}
              {titleZh ? (
                <div className="text-sm text-[var(--text-secondary)]">
                  {titleZh}
                </div>
              ) : null}
            </div>
          ) : null}

          {orgZh ? (
            <div className="mt-0.5 truncate text-sm text-[var(--muted)]">
              {orgZh}
            </div>
          ) : null}

          {introZh ? (
            <div
              className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {introZh}
            </div>
          ) : (
            <div className="mt-3 min-h-[2.5rem]" />
          )}
        </div>
      </div>

      {tags.length ? (
        <div className="mt-4 grid min-h-[28px] grid-cols-2 gap-x-2 gap-y-1.5 content-start">
          {tags.map((t) => {
            const active = activeTag === t;
            const tone = getDirectionTone();
            return (
              <Chip
                key={t}
                onClick={() => onTagClick?.(t)}
                active={active}
                size="sm"
                className={`min-w-0 max-w-full ${active ? tone.chipActive : tone.chip}`}
                title="点击按标签筛选"
              >
                {t}
              </Chip>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 min-h-[28px]" />
      )}
    </Card>
  );
}
