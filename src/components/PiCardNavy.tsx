// src/components/PiCardNavy.tsx
// 方向 A · 仪器手册语言 —— 导师介绍区（首页第 01 章 · round 02 选定 B 方案）
// 全屏分栏规格档案：左栏身份面板（大照片 + 姓名 + 联系入口），右栏规格表
// （BIO 导师简介 / RESEARCH 研究方向 / TIMELINE 经历年表 / RECRUIT 招生信息）
// 全 rem / clamp（缩放适应性规则 4-6）；白字对深底 ≥7:1（投影可读规则）
"use client";

import { motion } from "framer-motion";
import PublicImage from "@/components/PublicImage";
import { pi, type PiTimelineItem } from "@/data/pi";

// 时间显示格式统一："A - B" → "A – B"，"至 今" → "– 至今"，单年份保持
function fmtTime(t: string): string {
  return t
    .replace(/(\d{4}(?:\.\d{2})?)\s*-\s*(\d{4}(?:\.\d{2})?)/, "$1 – $2")
    .replace(/至\s*今/, "– 至今");
}

// 教育/工作时间精简为年份区间："2009.09 - 2013.07" → "2009 – 2013"（两列布局下单行保证）
function fmtYear(t: string): string {
  const m = t.match(/(\d{4})\.\d{2}\s*-\s*(\d{4})\.\d{2}/);
  if (m) return `${m[1]} – ${m[2]}`;
  const y = t.match(/\d{4}/);
  return y ? `${y[0]} – 至今` : t;
}

// 条目文本格式统一："A - B - C" → "A · B · C"
function fmtText(t: string): string {
  return t.replace(/\s*-\s*/g, " · ");
}

export default function PiCardNavy() {
  // 工作经历去掉与教育经历重复的博士后条目
  const work = pi.work.filter(
    (w) => !pi.education.some((e) => e.time === w.time && e.text === w.text),
  );
  // 左栏现任职务取自工作经历最后一条（数据驱动）
  const current = pi.work[pi.work.length - 1];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="pi-wrap">
        <div className="pi-split">
        {/* ── 左栏：身份面板 ── */}
        <aside className="pi-left">
          <div className="pi-left__head">
            <span className="pi-left__no">01</span>
            <span className="pi-left__en">PI PROFILE · 导师介绍</span>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="pi-avatar-lg"
          >
            <PublicImage
              src={pi.avatar}
              variant="main"
              alt={pi.nameEn}
              fill
              sizes="(max-width: 48rem) 90vw, 30vw"
              className="object-cover object-top"
            />
          </motion.div>

          <div className="pi-nameblock">
            <div className="pi-nameblock__zh">{pi.nameZh}</div>
            <div className="pi-nameblock__en">{pi.nameEn}</div>
            <div className="pi-nameblock__title">{pi.title}</div>
            <div className="pi-nameblock__org">
              {pi.org}
              <br />
              {fmtText(current?.text ?? "")}
            </div>
          </div>

          <div className="pi-vlinks">
            {pi.email ? (
              <a className="pi-vlink" href={`mailto:${pi.email}`} title={pi.email}>
                Email
                <span className="pi-vlink__ico" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              <button type="button" className="pi-vlink pi-vlink--off" title="暂无邮箱信息">
                Email
                <span className="pi-vlink__ico" aria-hidden="true">
                  —
                </span>
              </button>
            )}
            <a className="pi-vlink" href={pi.homepage} target="_blank" rel="noreferrer">
              教师主页
              <span className="pi-vlink__ico" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="pi-addr-v">{pi.addr}</div>
        </aside>

        {/* ── 右栏：规格档案 ── */}
        <div className="pi-right">
          <SpecSection k="BIO" t="导师简介">
            <p className="pi-spec__body">{pi.bio}</p>
          </SpecSection>

          <SpecSection k="RESEARCH" t="研究方向">
            <div className="pi-tags">
              {pi.tags.map((t, idx) => (
                <span key={t} className="pi-tag">
                  <b>{String(idx + 1).padStart(2, "0")}</b>
                  {t}
                </span>
              ))}
            </div>
          </SpecSection>

          <SpecSection k="TIMELINE" t="经历年表">
            <div className="pi-tl-cols">
              <TlGroup title="教育经历" en="EDUCATION" items={pi.education} shortTime />
              <TlGroup title="工作经历" en="EXPERIENCE" items={work} shortTime />
            </div>
            <TlGroup title="学术兼职与荣誉" en="SERVICE & HONORS" items={pi.service} inline />
          </SpecSection>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="pi-recruit"
          >
            <span className="pi-recruit__k">RECRUIT</span>
            <span className="pi-recruit__t">招生信息</span>
            <p className="pi-recruit__body">{pi.recruit}</p>
          </motion.div>
        </div>
        </div>
      </div>
    </motion.section>
  );
}

function SpecSection({
  k,
  t,
  children,
}: {
  k: string;
  t: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pi-spec"
    >
      <div className="pi-spec__lab">
        <span className="pi-spec__k">{k}</span>
        <span className="pi-spec__t">{t}</span>
        <span className="pi-spec__ln" aria-hidden="true" />
      </div>
      {children}
    </motion.section>
  );
}

function TlGroup({
  title,
  en,
  items,
  inline = false,
  shortTime = false,
}: {
  title: string;
  en: string;
  items: PiTimelineItem[];
  inline?: boolean;
  shortTime?: boolean;
}) {
  return (
    <div className="pi-tl-group">
      <div className="pi-tl-group__gk">
        <span className="pi-tl-group__gt">{title}</span>
        <span className="pi-tl-group__ge">{en}</span>
      </div>
      <div className={inline ? "pi-tl-items pi-tl-items--two" : "pi-tl-items"}>
        {items.map((it, idx) =>
          inline ? (
            <div key={idx} className="pi-tl-inline">
              <span className="pi-tl-time">{fmtTime(it.time)}</span>
              <span className="pi-tl-text">{fmtText(it.text)}</span>
            </div>
          ) : (
            <div key={idx} className="pi-tl-item">
              <span className="pi-tl-time">
                {shortTime ? fmtYear(it.time) : fmtTime(it.time)}
              </span>
              <span className="pi-tl-text">{fmtText(it.text)}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
