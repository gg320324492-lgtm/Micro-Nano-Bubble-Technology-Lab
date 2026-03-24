import Link from "next/link";
import { notFound } from "next/navigation";

import PublicImage from "@/components/PublicImage";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Badge from "@/components/ui/Badge";
import { people } from "@/data/people";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return people.map((p) => ({ id: p.id }));
}

function roleLabel(role: string) {
  const map: Record<string, string> = {
    PhD: "博士生 PhD",
    Master: "硕士生 Master",
    Undergrad: "本科生 Undergrad",
    Alumni: "已毕业 Graduated",
    PI: "导师 PI",
    Faculty: "教师 Faculty",
    Staff: "工作人员 Staff",
  };
  return map[role] ?? role;
}

export default async function PeopleDetailPage(props: PageProps) {
  const { id } = await props.params;
  const person = people.find((p) => p.id === id);

  if (!person) notFound();

  const displayName = person.nameZh || person.nameEn;
  const photo = person.avatar ?? "";
  const gradeLine = [person.cohort ? `${person.cohort}级` : "", roleLabel(person.role)]
    .filter(Boolean)
    .join("");

  return (
    <Section container="wide">
      <div className="mb-6">
        <Link
          href="/people"
          className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--accent-soft)]"
        >
          ← 返回成员列表
        </Link>
      </div>

      <Heading
        as="h1"
        title={`${displayName} · 成员详情`}
        subtitle={`${person.nameEn || "People Detail"} / ${gradeLine || "占位内容"}`}
        className="[&>h1]:text-[var(--text)]"
        subtitleClassName="text-[var(--text-secondary)]"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
          {photo ? (
            <div className="relative min-h-[460px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
              <PublicImage
                src={photo}
                alt={`${displayName} 照片`}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex min-h-[460px] items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-elevated)] text-sm text-[var(--muted)]">
              照片占位（单张）
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="px-3 py-1 text-xs">{roleLabel(person.role)}</Badge>
              {person.cohort ? (
                <Badge className="px-3 py-1 text-xs">{person.cohort}级</Badge>
              ) : null}
            </div>

            <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
              {person.genderZh ||
              person.birthZh ||
              person.nativePlaceZh ||
              person.undergradSchoolZh ||
              person.gradeZh ? (
                <p>
                  <strong className="text-[var(--text)]">基本信息：</strong>
                  {[
                    person.genderZh ? `性别：${person.genderZh}` : "",
                    person.birthZh ? `出生年月：${person.birthZh}` : "",
                    person.nativePlaceZh ? `籍贯：${person.nativePlaceZh}` : "",
                    person.gradeZh ? `年级：${person.gradeZh}` : "",
                    person.undergradSchoolZh
                      ? `本科毕业院校：${person.undergradSchoolZh}`
                      : "",
                  ]
                    .filter(Boolean)
                    .join("；")}
                </p>
              ) : null}
              <p>
                <strong className="text-[var(--text)]">研究方向：</strong>
                {person.introZh || "这里放成员主要研究方向、关键词与课题简介。"}
              </p>
              {person.hobbyZh ? (
                <p>
                  <strong className="text-[var(--text)]">爱好：</strong>
                  {person.hobbyZh}
                </p>
              ) : null}
              <p>
                <strong className="text-[var(--text)]">个人介绍：</strong>
                {person.bioZh ||
                  "这里放个人学术背景、兴趣方向、近期进展等文字介绍。当前为占位文案，后续可按成员逐一补充。"}
              </p>
              {person.email || person.homepage ? (
                <p>
                  <strong className="text-[var(--text)]">联系方式：</strong>
                  {person.email ? (
                    <>
                      邮箱：
                      <a
                        href={`mailto:${person.email}`}
                        className="ml-1 underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--text)]"
                      >
                        {person.email}
                      </a>
                    </>
                  ) : null}
                  {person.homepage ? (
                    <>
                      {person.email ? "；" : ""}
                      主页：
                      <a
                        href={person.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--text)]"
                      >
                        {person.homepage}
                      </a>
                    </>
                  ) : null}
                </p>
              ) : (
                <p>
                  <strong className="text-[var(--text)]">联系方式：</strong>
                  可放邮箱、个人主页、Google Scholar 或其他链接信息。
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-card)]/60 p-5">
            <h2 className="text-base font-semibold text-[var(--text)]">更多图文占位</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
              此区域可扩展为论文列表、项目经历、成果展示、个人时间线等模块。
            </p>
            <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--muted)]">
              图文模块占位区（可替换为轮播图、时间线、卡片列表）
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
