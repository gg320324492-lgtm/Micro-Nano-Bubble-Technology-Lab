// src/app/industrialization/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

import industrialBases from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";

// ✅ 静态导出必须：告诉 Next 这类动态路由有哪些 slug
export const dynamicParams = false;
export function generateStaticParams() {
  return industrialBases.map((b) => ({ slug: String(b.slug) }));
}

function CoverHero({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-56 w-full rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100" />
    );
  }
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border bg-gray-50">
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}

type Props = { params: any };

export default async function IndustrialBaseDetailPage(props: Props) {
  // ✅ 关键修复：兼容 params 是对象 or Promise（某些版本/导出形态下会出现）
  const p = await Promise.resolve(props?.params);
  const slug = String(p?.slug ?? "").trim();

  const base = industrialBases.find((b) => String(b.slug) === slug);
  const sectionThemes = [
    {
      card: "border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-blue-50/80",
      accent: "from-sky-400 to-blue-500",
      badge: "border-sky-200 bg-sky-100/80 text-sky-700",
      title: "text-sky-950",
      body: "text-slate-700",
      bullet: "bg-sky-500",
    },
    {
      card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/80",
      accent: "from-emerald-400 to-teal-500",
      badge: "border-emerald-200 bg-emerald-100/80 text-emerald-700",
      title: "text-emerald-950",
      body: "text-slate-700",
      bullet: "bg-emerald-500",
    },
    {
      card: "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-indigo-50/80",
      accent: "from-violet-400 to-indigo-500",
      badge: "border-violet-200 bg-violet-100/80 text-violet-700",
      title: "text-violet-950",
      body: "text-slate-700",
      bullet: "bg-violet-500",
    },
  ] as const;

  if (!base) {
    return (
      <main className="py-10">
        <h1 className="text-2xl font-semibold">未找到该基地</h1>
        <p className="mt-2 text-sm text-gray-600">当前 slug：{slug || "(空)"}</p>

        <div className="mt-6 rounded-2xl border p-5">
          <div className="font-semibold">可用 slug（点击直达）</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
            {industrialBases.map((b) => (
              <li key={b.slug}>
                <Link
                  className="underline"
                  href={`/industrialization/${String(b.slug)}/`}
                >
                  {String(b.slug)}
                </Link>{" "}
                —— {b.titleZh}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Link
            href="/industrialization/"
            className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            ← 返回产业化列表
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/industrialization/"
          className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          ← 返回产业化列表
        </Link>

        {base.locationUrl ? (
          <a
            href={base.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            高德地图导航
          </a>
        ) : null}

        {base.monitorUrl ? (
          <a
            href={base.monitorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            打开监测大屏
          </a>
        ) : null}
      </div>

      <div className="mt-6">
        <CoverHero src={base.cover} alt={base.titleZh} />

        <div className="mt-5">
          <h1 className="text-3xl font-semibold tracking-tight">{base.titleZh}</h1>
          {base.titleEn ? (
            <div className="mt-1 text-sm text-gray-500">{base.titleEn}</div>
          ) : null}

          <p className="mt-3 text-sm leading-relaxed text-gray-700">{base.briefZh}</p>

          {base.locationZh ? (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium text-gray-900">位置/说明：</span>
              {base.locationUrl ? (
                <a
                  href={base.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-gray-900"
                >
                  {base.locationZh}
                </a>
              ) : (
                base.locationZh
              )}
            </div>
          ) : null}

          {base.highlightsZh?.length ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-cyan-600 shadow-sm">
                    ✦
                  </span>
                  <div className="text-lg font-semibold text-slate-900">基地亮点</div>
                </div>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {base.highlightsZh.map((x) => (
                    <li
                      key={x}
                      className="flex items-start gap-2 rounded-xl border border-sky-200/70 bg-white/85 p-3 text-sm text-slate-700 shadow-sm"
                    >
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {base.sections?.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {base.sections.map((s, idx) => {
            const theme = sectionThemes[idx % sectionThemes.length];
            const lastOddSpan =
              base.sections && base.sections.length % 2 === 1 && idx === base.sections.length - 1;

            return (
              <section
                key={s.titleZh}
                className={[
                  "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  theme.card,
                  lastOddSpan ? "md:col-span-2" : "",
                ].join(" ")}
              >
                <div className={["absolute inset-x-0 top-0 h-1 bg-gradient-to-r", theme.accent].join(" ")} />

                <h2 className={["text-2xl font-semibold tracking-tight", theme.title].join(" ")}>
                  {s.titleZh}
                </h2>
                <p className={["mt-2 text-sm leading-relaxed", theme.body].join(" ")}>{s.bodyZh}</p>

                {s.bulletsZh?.length ? (
                  <ul className="mt-4 space-y-2">
                    {s.bulletsZh.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className={["mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", theme.bullet].join(" ")} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}

      {base.gallery?.length ? (
        <div className="mt-10">
          <div className="mb-3 text-lg font-semibold">图片 / 图集</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {base.gallery.map((img) => (
              <figure key={img.src} className="rounded-2xl border p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={assetPath(img.src)}
                    alt={img.alt ?? base.titleZh}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                {img.captionZh ? (
                  <figcaption className="mt-2 text-xs text-gray-600">
                    {img.captionZh}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
