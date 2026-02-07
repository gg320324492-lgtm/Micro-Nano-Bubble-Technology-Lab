// src/app/industrialization/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

// ✅ 你如果不是这个文件名，就把这里改成你真实的数据文件
import * as indMod from "@/data/industrialization";

function pickList(mod: any) {
  return mod?.items ?? mod?.industrialization ?? mod?.projects ?? mod?.default ?? [];
}

function pickSlug(it: any) {
  return it?.slug ?? it?.id ?? it?.key ?? "";
}

function pickTitle(it: any) {
  return it?.title ?? it?.name ?? it?.titleZh ?? it?.titleEn ?? "Untitled";
}

// ✅ 静态导出时，动态路由必须关掉“运行时兜底”
export const dynamicParams = false;

// ✅ 关键：告诉 Next 要生成哪些 /industrialization/xxx
export function generateStaticParams() {
  const list = pickList(indMod) as any[];
  return list
    .map((it) => String(pickSlug(it)))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export default function IndustrializationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const list = pickList(indMod) as any[];
  const item = list.find((it) => String(pickSlug(it)) === params.slug);

  if (!item) notFound();

  return (
    <main className="py-10">
      <div className="mb-6">
        <Link
          href="/industrialization"
          className="text-sm text-gray-600 hover:underline"
        >
          ← 返回 Industrialization
        </Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">
        {pickTitle(item)}
      </h1>

      {item?.subtitle ? (
        <p className="mt-2 text-gray-600">{String(item.subtitle)}</p>
      ) : null}

      {item?.content ? (
        <div className="mt-6 prose max-w-none">
          {/* 你如果 content 是字符串/富文本/数组，在这里按你的结构渲染即可 */}
          <pre className="whitespace-pre-wrap">{String(item.content)}</pre>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border p-6 text-sm text-gray-600">
          该条目暂无详细内容（你可以在 data/industrialization 中补充字段）。
        </div>
      )}
    </main>
  );
}
