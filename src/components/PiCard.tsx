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
  return (
    p.photo ||
    p.avatar ||
    p.image ||
    p.img ||
    p.photoUrl ||
    p.avatarUrl ||
    "/images/pi-wang-tianzhi.jpg" // ✅ 兜底：你截图中的 PI 照片
  );
}

export default function PiCard() {
  const pi: any = pickPiObject(piModule);
  const photo = pickPhoto(pi);

  const nameZh = pi.nameZh ?? "王天志";
  const nameEn = pi.nameEn ?? pi.en ?? "Tianzhi Wang";
  const titleZh = pi.titleZh ?? pi.title ?? "副教授（博导）";
  const orgZh = pi.orgZh ?? pi.org ?? "天津大学 环境科学与工程学院";
  const addressZh = pi.addressZh ?? pi.address ?? "";
  const email = pi.email ?? "";
  const introZh = pi.introZh ?? pi.intro ?? "";
  const tags: string[] = Array.isArray(pi.tags) ? pi.tags : [];
  const recruitZh = pi.recruitZh ?? pi.joinZh ?? pi.recruit ?? "";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-gray-50">
            <PublicImage
              src={photo}
              alt={nameEn || nameZh}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <div className="text-xl font-semibold">{nameZh}</div>
              <div className="text-sm text-gray-500">{nameEn}</div>
            </div>

            <div className="mt-1 text-sm text-gray-700">{titleZh}</div>
            <div className="mt-2 text-sm text-gray-600">{orgZh}</div>
            {addressZh ? (
              <div className="mt-1 text-sm text-gray-500">{addressZh}</div>
            ) : null}

            {introZh ? (
              <div
                className="mt-4 text-sm leading-relaxed text-gray-700"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {introZh}
              </div>
            ) : null}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              Email
            </a>
          ) : null}
          <Link
            href="/"
            className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 transition"
          >
            主页
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/90 transition"
          >
            加入我们
          </Link>
        </div>
      </div>

      {/* Tags */}
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

      {/* Recruit */}
      {recruitZh ? (
        <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-sm text-gray-700">
          <div className="font-semibold mb-2">招生信息</div>
          <div className="leading-relaxed">{recruitZh}</div>
        </div>
      ) : null}
    </div>
  );
}
