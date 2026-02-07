import Image from "next/image";
import Link from "next/link";
import industrialBases from "@/data/industrialization";

function Cover({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-56 w-full rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100" />
    );
  }
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border bg-gray-50">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

export default function IndustrializationPage() {
  return (
    <main className="py-10">
      <h1 className="text-4xl font-semibold tracking-tight">产业化</h1>
      <p className="mt-3 text-sm text-gray-600">
        围绕应用验证基地与示范场景，展示监测平台入口与工程化落地内容。
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {industrialBases.map((b) => (
          <section key={b.slug} className="rounded-3xl border p-5">
            <Cover src={b.cover} alt={b.titleZh} />

            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xl font-semibold">{b.titleZh}</div>
                {b.titleEn ? (
                  <div className="text-sm text-gray-500">{b.titleEn}</div>
                ) : null}
              </div>

              <Link
                href={`/industrialization/${encodeURIComponent(b.slug)}`}
                className="shrink-0 rounded-full border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                查看详情
              </Link>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">{b.briefZh}</p>

            {/* ✅ 列表页位置：可点击跳转到高德 */}
            {b.locationZh ? (
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium text-gray-900">位置/说明：</span>
                {b.locationUrl ? (
                  <a
                    href={b.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-gray-900"
                  >
                    {b.locationZh}
                  </a>
                ) : (
                  b.locationZh
                )}
              </div>
            ) : null}

            {b.highlightsZh?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {b.highlightsZh.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : null}

            {/* ✅ 监测大屏按钮：不动（仍是外链） */}
            {b.monitorUrl ? (
              <div className="mt-5">
                <a
                  href={b.monitorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  打开监测大屏
                </a>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
