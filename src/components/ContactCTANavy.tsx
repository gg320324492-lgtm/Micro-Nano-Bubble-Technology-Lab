// src/components/ContactCTANavy.tsx
// 方向 A · 仪器手册语言 —— 联系 CTA（首页第 07 章 · round 08 选定 B · 双栏 + 1720 宽）
// 「加入我们」+「合作对接」两面板 + 底部联系信息条（EMAIL / ADDRESS）
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ContactView } from "@/types";

export default function ContactCTANavy({ contact }: { contact: ContactView }) {
  const email = (contact.email ?? "") as string;
  const rawAddress = (contact.addressZh ?? contact.address ?? "") as string;
  const homepage = (contact.websiteZh ?? contact.website ?? "#") as string;
  const joinZh = (contact.joinZh ?? "") as string;
  const coopZh = (contact.coopZh ?? "") as string;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="cta-wrap">
        <header className="section-head">
          <span className="section-head__no">07</span>
          <span className="section-head__zh">联系我们</span>
          <span className="section-head__line" aria-hidden="true" />
          <span className="section-head__en">CONTACT &amp; JOIN</span>
        </header>

        <div className="cta-split">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="cta-panel"
          >
            <div className="cta-panel__k">JOIN · 招生加入</div>
            <h3 className="cta-panel__title">加入我们</h3>
            <p className="cta-panel__body">{joinZh}</p>
            <div className="cta-panel__links">
              <Link href="/contact" className="navy-btn navy-btn--main">
                查看招生详情 →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="cta-panel"
          >
            <div className="cta-panel__k">COOPERATION · 产学研合作</div>
            <h3 className="cta-panel__title">合作对接</h3>
            <p className="cta-panel__body">{coopZh}</p>
            <div className="cta-panel__links">
              <a href={`mailto:${email}`} className="navy-btn navy-btn--ghost">
                邮件洽谈
              </a>
              <a href={homepage} target="_blank" rel="noreferrer" className="cta-panel__link">
                教师主页 ↗
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.16, duration: 0.4 }}
            className="cta-panel cta-panel--info"
          >
            <div className="cta-panel__k">CONTACT · 联系方式</div>
            <div className="cta-panel__contactrow">
              <span className="cta-panel__metalab">EMAIL</span>
              <a href={`mailto:${email}`} className="cta-panel__metaval">
                {email}
              </a>
            </div>
            <div className="cta-panel__contactrow">
              <span className="cta-panel__metalab">ADDRESS</span>
              <span className="cta-panel__metaval">{rawAddress}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
