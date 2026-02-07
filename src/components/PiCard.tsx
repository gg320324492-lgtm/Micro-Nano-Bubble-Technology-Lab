// src/components/PiCard.tsx
import Link from "next/link";
import * as piModule from "@/data/pi";
import PublicImage from "@/components/PublicImage";

function pickPiObject(mod: any) {
  return (
    mod?.default ||
    mod?.pi ||
    mod?.PI ||
    mod?.principalInvestigator ||
    mod?.principal ||
    {}
  );
}

function pickPhoto(p: any): string {
  // ✅ 只取数据里真实配置的路径，不要用不存在的 /images/pi-wang-tianzhi.jpg 兜底
  return (
    p.photo ||
    p.avatar ||
    p.image ||
    p.img ||
    p.photoUrl ||
    p.avatarUrl ||
    ""
  );
}

export default function PiCard() {
  const pi: any = pickPiObject(piModule);

  // ✅ 字段对齐到 src/data/pi.ts
  const nameZh = pi.nameZh ?? "王天志";
  const nameEn = pi.nameEn ?? "Tianzhi Wang";

  const titleZh = pi.titleZh ?? "";
  const titleEn = pi.titleEn ?? "";

  const affiliationZh = pi.affiliationZh ?? pi.orgZh ?? pi.org ?? "";
  const affiliationEn = pi.affiliationEn ?? "";

  const email = pi.email ?? "";
  const websiteZh = pi.websiteZh ?? pi.website ?? "";
  const addressZh = pi.addressZh ?? "";

  const bioZh = pi.bioZh ?? pi.introZh ?? pi.intro ?? "";
  const tags: string[] = Array.isArray(pi.researchFocusZh)
    ? pi.researchFocusZh
    : Array.isArray(pi.tags)
      ? pi.tags
      : [];

  const recruitmentZh = pi.recruitmentZh ?? pi.joinZh ?? pi.recruit ?? "";

  const educationZh: string[] = Array.isArray(pi.educationZh) ? pi.educationZh : [];
  const experienceZh: string[] = Array.isArray(pi.experienceZh) ? pi.experienceZh : [];
  const appointmentsZh: string[] = Array.isArray(pi.appointmentsZh) ? pi.appointmentsZh : [];

  const photo = pickPhoto(pi);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-5">
          {/* Avatar（保留原来的方块头像风格） */}
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-gray-50">
            {photo ? (
              <PublicImage
                src={photo}
                alt={nameEn || nameZh}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">
                {(nameZh || nameEn || "?").slice(0, 1)}
              </div>
            )}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <div className="text-xl font-semibold">{nameZh}</div>
              <div className="text-sm text-gray-500">{nameEn}</div>
            </div>

            {(titleZh || titleEn) ? (
              <div className="mt-1 text-sm text-gray-700">
                {titleZh}
                {titleEn ? <span className="text-gray-500"> / {titleEn}</span> : null}
              </div>
            ) : null}

            {affiliationZh ? (
              <div className="mt-2 text-sm text-gray-600">
                {affiliationZh}
                {affiliationEn ? <span className="text-gray-500"> / {affiliationEn}</span> : null}
              </div>
            ) : null}

            {addressZh ? (
              <div className="mt-1 text-sm text-gray-500">{addressZh}</div>
            ) : null}

            {bioZh ? (
              <div
                className="mt-4 text-sm leading-relaxed text-gray-700"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {bioZh}
              </div>
            ) : null}
          </div>
        </div>

        {/* Actions（保持你原来右上角按钮区） */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              Email
            </a>
          ) : null}

          {websiteZh ? (
            <a
              href={websiteZh}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              主页
            </a>
          ) : (
            <Link
              href="/"
              className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              主页
            </Link>
          )}

          <Link
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/90 transition"
          >
            加入我们
          </Link>
        </div>
      </div>

      {/* Tags（研究方向 chips，保留原来的“标签条”观感） */}
      {tags.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((t: string) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* 更多信息（你原来有“更多信息”这一块，这里用 details 保留同样的交互） */}
      {(educationZh.length || experienceZh.length || appointmentsZh.length) ? (
        <details className="mt-5">
          <summary className="cursor-pointer select-none text-sm text-gray-700">
            ▶ 更多信息（教育经历 / 工作经历 / 学术兼职）
          </summary>

          <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm text-gray-700">
            {educationZh.length ? (
              <div>
                <div className="font-medium mb-2">教育经历</div>
                <ul className="list-disc pl-5 space-y-1">
                  {educationZh.map((x: string) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {experienceZh.length ? (
              <div>
                <div className="font-medium mb-2">工作经历</div>
                <ul className="list-disc pl-5 space-y-1">
                  {experienceZh.map((x: string) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {appointmentsZh.length ? (
              <div>
                <div className="font-medium mb-2">学术兼职</div>
                <ul className="list-disc pl-5 space-y-1">
                  {appointmentsZh.map((x: string) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </details>
      ) : null}

      {/* 招生信息（保留你原来的底部灰底块） */}
      {recruitmentZh ? (
        <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-sm text-gray-700">
          <div className="font-semibold mb-2">招生信息</div>
          <div className="leading-relaxed">{recruitmentZh}</div>
        </div>
      ) : null}
    </div>
  );
}
