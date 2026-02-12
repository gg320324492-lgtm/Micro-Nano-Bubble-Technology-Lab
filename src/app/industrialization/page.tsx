// src/app/industrialization/page.tsx
import Image from "next/image";
import Link from "next/link";
import industrialBases from "@/data/industrialization";
import { assetPath } from "@/lib/assetPath";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import { buttonClassName } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";

function Cover({ src, alt }: { src?: string; alt: string }) {
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
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

export default function IndustrializationPage() {
  return (
    <Section container="wide">
      <Reveal>
        <Heading
          as="h1"
          title="产业化"
          subtitle="围绕应用验证基地与示范场景，展示监测平台入口与工程化落地内容。"
        />
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {industrialBases.map((b, index) => (
          <Reveal key={b.slug} delay={index * 0.05}>
            <Card as="section" className="rounded-3xl p-5">
              <ImageReveal>
                <Cover src={b.cover} alt={b.titleZh} />
              </ImageReveal>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xl font-semibold">{b.titleZh}</div>
                  {b.titleEn ? (
                    <div className="text-sm text-gray-500">{b.titleEn}</div>
                  ) : null}
                </div>

                {/* ✅ 强制带尾部 /，完全匹配 trailingSlash 导出的目录结构 */}
                <Link
                  href={`/industrialization/${encodeURIComponent(String(b.slug))}/`}
                  className={buttonClassName("secondary", "shrink-0 px-4 py-2 text-sm")}
                >
                  查看详情
                </Link>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {b.briefZh}
              </p>

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

              {b.monitorUrl ? (
                <div className="mt-5">
                  <a
                    href={b.monitorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClassName("primary", "px-5 py-2.5 text-sm")}
                  >
                    打开监测大屏
                  </a>
                </div>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
