"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function PiCard() {
  const [open, setOpen] = useState(false);

  const pi = useMemo(
    () => ({
      nameZh: "王天志",
      nameEn: "Tianzhi Wang",
      title: "副教授（博导）",
      org: "天津大学 环境科学与工程学院",
      addr: "天津市南开区卫津路92号（天津大学），邮编：300072",
      bio:
        "聚焦微纳米气泡机理与工程应用，涵盖气泡溃灭与·OH原位形成、协同消毒与饮用水生物稳定性提升、表面清洗与水环境治理装备开发等方向。",

      avatar: "/images/pi-wang-tianzhi.jpg",
      homepage: "https://faculty.tju.edu.cn/226066/zh_CN/index.htm",

      // ✅ 邮箱在这里
      email: "wangtianzhi@tju.edu.cn",

      tags: [
        "微纳米气泡溃灭与·OH原位形成",
        "协同消毒与杀菌机制",
        "饮用水生物稳定性（AOC/BDOC）",
        "臭氧/纳米气泡水处理强化",
        "微纳米气泡装备与在线监测",
        "表面清洗与农业应用",
      ],

      education: [
        { time: "2009.9 - 2013.6", text: "中国农业大学 - 农业水利工程 - 学士" },
        { time: "2013.9 - 2018.6", text: "中国农业大学 - 农业水土工程 - 博士" },
        { time: "2016.11 - 2017.11", text: "美国伊利诺伊香槟分校 - 农业与生物工程学院 - 联合培养博士" },
        { time: "2017.8 - 2017.10", text: "美国哥伦比亚大学 - Earth Engineering Center - 交流生" },
        { time: "2018.8 - 2020.9", text: "清华大学 - 环境科学 - 博士后" },
      ],
      work: [
        { time: "2020.9 - 2022.3", text: "环境科学与工程学院 → 天津大学 → 助理研究员" },
        { time: "2022.3 - 2024.10", text: "环境科学与工程学院 → 天津大学 → 环工支部青年委员 → 副研究员" },
      ],
      service: [
        { time: "2024.3 - 2027.2", text: "《Processes》期刊客座编辑" },
        { time: "2024.4 - 2029.4", text: "全国研究生教育评估监测专家库专家" },
        { time: "2025.4 - 2029.3", text: "《净水技术》期刊青年编委" },
        { time: "2025.2 - 2030.1", text: "天津市宁河区产业高质量发展“领衔专家”" },
      ],

      recruit:
        "团队常年招收硕士研究生3–4名、博士生1–2名及本科生若干，欢迎环境/市政/自动化/农业工程/化工/工业设计等背景同学加入。",
    }),
    []
  );

  return (
    <div className="rounded-2xl border bg-white p-6 md:p-8">
      {/* 顶部：头像 + 姓名 + 按钮 */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100 md:h-24 md:w-24">
            <Image
              src={pi.avatar}
              alt={pi.nameEn}
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <div className="text-xl font-semibold md:text-2xl">{pi.nameZh}</div>
              <div className="text-sm text-gray-500 md:text-base">{pi.nameEn}</div>
            </div>

            <div className="text-sm text-gray-700 md:text-base">{pi.title}</div>
            <div className="pt-2 text-sm text-gray-700 md:text-base">{pi.org}</div>
            <div className="text-sm text-gray-600 md:text-base">{pi.addr}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {/* ✅ 只显示“Email”，不显示邮箱；但 hover 提示邮箱，点击 mailto */}
          {pi.email ? (
            <a
              href={`mailto:${pi.email}`}
              className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
              title={pi.email}
              aria-label={`Email: ${pi.email}`}
            >
              Email
            </a>
          ) : (
            <button
              type="button"
              className="rounded-full border px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
              title="暂无邮箱信息"
            >
              Email
            </button>
          )}

          <a
            href={pi.homepage}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            主页
          </a>

          <Link
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            加入我们
          </Link>
        </div>
      </div>

      {/* 简介 */}
      <div className="mt-5 text-sm leading-relaxed text-gray-700 md:text-base">
        {pi.bio}
      </div>

      {/* 研究标签 */}
      <div className="mt-5 flex flex-wrap gap-2">
        {pi.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-700 md:text-sm"
          >
            {t}
          </span>
        ))}
      </div>

      {/* 更多信息 */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-black"
        >
          ▶ 更多信息（教育经历 / 工作经历 / 学术兼职）
        </button>

        {open ? (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoBlock title="教育经历" items={pi.education} />
            <InfoBlock title="工作经历" items={pi.work} />
            <InfoBlock title="社会兼职" items={pi.service} />
          </div>
        ) : null}
      </div>

      {/* 招生信息 */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-5 md:p-6">
        <div className="font-semibold text-gray-800">招生信息</div>
        <div className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
          {pi.recruit}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  title,
  items,
}: {
  title: string;
  items: { time: string; text: string }[];
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="mt-3 space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="text-sm md:text-base">
            <div className="text-xs text-gray-500 md:text-sm">{it.time}</div>
            <div className="mt-1 text-gray-700 leading-relaxed">{it.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
