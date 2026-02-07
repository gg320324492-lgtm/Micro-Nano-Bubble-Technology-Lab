import Image from "next/image";
import Link from "next/link";
import industrialBases from "@/data/industrialization";
import { assetPath } from "@/lib/asset";

function CoverHero({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-56 w-full rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100" />
    );
  }
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border bg-gray-50">
      <Image src={assetPath(src)!} alt={alt} fill className="object-cover" sizes="100vw" />
    </div>
  );
}

// ✅ 静态导出 + 动态路由必须提供
export const dynamicParams = false;
export function generateStaticParams() {
  return industrialBases.map((b) => ({ slug: b.slug }));
}

export default function IndustrialBaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug?.toString()?.trim();
  const base = industrialBases.find((b) => b.slug === slug);

  if (!base) {
    return (
      <main className="py-10">
        <h1 className="text-2xl font-semibold">未找到该基地</h1>
        <p className="mt-2 text-sm text-gray-600">当前 slug：{slug ?? "(空)"}</p>

        <div className="mt-6 rounded-2xl border p-5">
          <div className="font-semibold">可用 slug（点击直达）</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
            {industrialBases.map((b) => (
              <li key={b.slug}>
                <Link className="underline" href={`/industrialization/${b.slug}`}>
                  {b.slug}
                </Link>{" "}
                —— {b.titleZh}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Link
            href="/industrialization"
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
          href="/industrialization"
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
          {base.titleEn ? <div className="mt-1 text-sm text-gray-500">{base.titleEn}</div> : null}

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
            <div className="mt-4 rounded-2xl border p-5">
              <div className="text-lg font-semibold">基地亮点</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {base.highlightsZh.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {base.sections?.length ? (
        <div className="mt-8 space-y-4">
          {base.sections.map((s) => (
            <section key={s.titleZh} className="rounded-2xl border p-6">
              <h2 className="text-lg font-semibold">{s.titleZh}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{s.bodyZh}</p>
              {s.bulletsZh?.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {s.bulletsZh.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
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
                    src={assetPath(img.src)!}
                    alt={img.alt ?? base.titleZh}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                {img.captionZh ? (
                  <figcaption className="mt-2 text-xs text-gray-600">{img.captionZh}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
