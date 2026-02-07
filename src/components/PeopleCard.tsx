// src/components/PeopleCard.tsx
import Image from "next/image";
import type { Person } from "@/data/people";

export default function PeopleCard({
  person,
  onTagClick,
  activeTag,
}: {
  person: Person;
  onTagClick?: (tag: string) => void;
  activeTag?: string;
}) {
  const tags = Array.isArray(person.tags) ? person.tags : [];
  const MAX_TAGS = 4;
  const shownTags = tags.slice(0, MAX_TAGS);
  const extraCount = Math.max(0, tags.length - MAX_TAGS);

  const fallbackChar = (person.nameZh ?? "").trim().slice(0, 1) || "N";
  const cohortText = person.cohort ? `${person.cohort}级` : "";

  return (
    <div className="h-full rounded-2xl border bg-white p-5 transition hover:shadow-sm">
      {/* Top */}
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-gray-100">
          {person.avatar ? (
            <Image
              src={person.avatar}
              alt={person.nameZh ?? "avatar"}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-600">
              {fallbackChar}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <div className="text-lg font-semibold text-gray-900">
              {person.nameZh}
            </div>
            {person.nameEn ? (
              <div className="text-sm text-gray-500">{person.nameEn}</div>
            ) : null}
          </div>

          {(cohortText || person.titleZh) && (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {cohortText ? (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                  {cohortText}
                </span>
              ) : null}
              {person.titleZh ? (
                <span className="text-sm text-gray-700">{person.titleZh}</span>
              ) : null}
            </div>
          )}

          {person.orgZh ? (
            <div className="mt-0.5 text-sm text-gray-500">{person.orgZh}</div>
          ) : null}
        </div>
      </div>

      {/* Intro (2-line clamp + fixed height) */}
      <div
        className="mt-4 text-sm leading-relaxed text-gray-700"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical" as any,
          WebkitLineClamp: 2,
          overflow: "hidden",
          minHeight: "2.75rem",
        }}
      >
        {person.introZh ?? ""}
      </div>

      {/* Tags (max 4 +N) */}
      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {shownTags.map((t) => {
            const isActive = activeTag && t === activeTag;

            // ✅ 可点击：按钮；不可点击：普通 span
            if (onTagClick) {
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTagClick(t)}
                  className={[
                    "rounded-full px-3 py-1 text-xs transition",
                    isActive
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  ].join(" ")}
                  title="点击筛选该标签"
                >
                  {t}
                </button>
              );
            }

            return (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                title={t}
              >
                {t}
              </span>
            );
          })}

          {extraCount > 0 ? (
            <span
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              title={tags.slice(MAX_TAGS).join(" / ")}
            >
              +{extraCount}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
