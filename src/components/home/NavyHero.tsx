// src/components/home/NavyHero.tsx
// 方向 A · 深海军蓝 · 仪器手册 —— 首页 Hero（round 01 已确认 + 轮播反馈修正）
// 结构：上方轮播图区（原官网 7 张真实图，轻衬底保色调）+ 下方实色深蓝文字面板
// 白字永远落在实色深底上（投影可读），轮播图完整可见不与标题打架
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toImageVariant } from "@/lib/imageVariant";

const SLIDES = Array.from({ length: 7 }, (_, i) => ({
  src: `/home/slide-${i + 1}.png`,
  alt: `课题组研究与应用现场（轮播图 ${i + 1}/7）`,
}));

const SLIDE_INTERVAL = 5200;

const STATS = [
  { n: 41, unit: "篇", label: "学术论文" },
  { n: 44, unit: "项", label: "授权专利" },
  { n: 20, unit: "个", label: "科研项目" },
  { n: 15, unit: "项", label: "荣誉奖项" },
] as const;

export default function NavyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  // 背景图视差：滚动时图片缓慢下移
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // 自动轮播；用户偏好减弱动效时保持静态首图
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      SLIDE_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative -mt-[5rem]">
      <div className="navy-hero">
        {/* 轮播图区（视差层） */}
        <motion.div
          style={{ y: photoY }}
          className="navy-hero__media"
          aria-hidden="false"
        >
          {SLIDES.map((s, i) => (
            <Image
              key={s.src}
              src={toImageVariant(s.src, "full")}
              alt={i === current ? s.alt : ""}
              fill
              priority={i === 0}
              loading={i <= 1 ? "eager" : "lazy"}
              sizes="100vw"
              className="navy-hero__slide"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))}
          <div className="navy-hero__scrim" aria-hidden="true" />
          <div className="navy-hero__counter" aria-hidden="true">
            <b>{String(current + 1).padStart(2, "0")}</b>
            <span> / {String(SLIDES.length).padStart(2, "0")}</span>
          </div>
        </motion.div>

        {/* 手机端不再显示院校徽章（避免压在轮播图文字上） */}

        {/* 文字面板（实色深蓝底，白字投影可读） */}
        <div className="navy-hero__panel">
          <div>
            <div className="navy-hero__kicker hidden md:inline-flex">
              TIANJIN UNIVERSITY · ENVIRONMENTAL SCIENCE &amp; ENGINEERING
            </div>
            <h1>
              从气泡成核机理
              <br />
              到<span className="hl">可交付的水处理装备</span>
            </h1>
            <p className="navy-hero__sub">
              聚焦微纳米气泡技术的机理研究、装备开发与多场景应用，面向饮用水安全、环境治理与智能化工程系统。
            </p>
            <div className="navy-hero__actions">
              <Link href="/research" className="navy-btn navy-btn--main">
                查看研究方向 →
              </Link>
              <Link href="/contact" className="navy-btn navy-btn--ghost">
                联系我们
              </Link>
            </div>
          </div>

          {/* 数据栏：桌面竖排靠右 / 手机 2×2 网格 */}
          <div className="navy-stats" role="list" aria-label="课题组数据">
            {STATS.map((s) => (
              <div className="navy-stat" role="listitem" key={s.label}>
                <div className="navy-stat__n">
                  {s.n}
                  <small>{s.unit}</small>
                </div>
                <div className="navy-stat__t">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 四大研究方向条 */}
      <div className="navy-strip">
        <span className="navy-strip__lab">四大研究方向</span>
        <div className="navy-strip__items">
          <span>
            <b>01</b>气泡成核调控与设备研发
          </span>
          <span>
            <b>02</b>饮用水水质提升
          </span>
          <span>
            <b>03</b>黑臭水体治理
          </span>
          <span>
            <b>04</b>高密度无抗养殖
          </span>
        </div>
      </div>
    </section>
  );
}
