// src/components/PeopleCard.tsx
"use client";

import type { Person } from "@/data/people";
import PublicImage from "@/components/PublicImage";

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

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-gray-50">
          {photo ? (
            <PublicImage
              src={photo}
              alt={nameZh || nameEn || "person"}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">
              {(nameZh || nameEn || "?").slice(0, 1)}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <div className="truncate text-base font-semibold">
              {nameZh || nameEn}
            </div>
            {nameZh && nameEn ? (
              <div className="truncate text-sm text-gray-500">{nameEn}</div>
            ) : null}
            {cohort ? <div className="text-sm text-gray-500">{cohort}</div> : null}
          </div>

          {titleZh ? (
            <div className="mt-1 text-sm text-gray-700">{titleZh}</div>
          ) : null}
          {orgZh ? (
            <div className="mt-0.5 text-sm text-gray-500">{orgZh}</div>
          ) : null}

          {introZh ? (
            <div
              className="mt-3 text-sm leading-relaxed text-gray-700"
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
            return (
              <button
                key={t}
                type="button"
                onClick={() => onTagClick?.(t)}
                className={[
                  "rounded-full border px-2.5 py-1 text-xs transition",
                  active
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100",
                ].join(" ")}
                title="点击按标签筛选"
              >
                {t}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
