// src/components/SiteFooterNavy.tsx
// 方向 A · 仪器手册语言 —— 全站页脚（round 09 选定 A · 经典三栏）
// 页脚是全站组件（layout 中位于 .theme-navy 作用域外），变量在 .ftr-footer 自带
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as contactModule from "@/data/contact";
import { navItems, site } from "@/data/site";
import { pickObject } from "@/lib/data";

type ContactLike = {
  email?: string;
  addressZh?: string;
  address?: string;
  websiteZh?: string;
  website?: string;
};

const footerNavItems = navItems.filter((item) => item.href !== "/contact");

export default function SiteFooterNavy() {
  const contact = pickObject<ContactLike>(contactModule, ["contact", "contacts"]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <footer className="ftr-footer">
        <div className="ftr-wrap">
          <div className="ftr-classic">
            {/* 品牌 */}
            <div className="ftr-brand">
              <div className="ftr-brand__zh">{site.nameZh}</div>
              <div className="ftr-brand__en">{site.nameEn}</div>
              <p className="ftr-brand__desc">{site.taglineZh}</p>
            </div>

            {/* 导航 */}
            <div className="ftr-nav">
              <div className="ftr-nav__t">导航</div>
              <div className="ftr-nav__links">
                {footerNavItems.map((item) => (
                  <Link key={item.href} href={item.href} className="ftr-nav__link">
                    {item.zh}
                  </Link>
                ))}
              </div>
            </div>

            {/* 联系 */}
            <div className="ftr-contact">
              <div className="ftr-nav__t">联系</div>
              <div className="ftr-contact__row">
                <span className="ftr-contact__lab">EMAIL</span>
                <a href={`mailto:${contact.email ?? ""}`} className="ftr-contact__val">
                  {contact.email ?? ""}
                </a>
              </div>
              <div className="ftr-contact__row">
                <span className="ftr-contact__lab">ADDRESS</span>
                <span className="ftr-contact__val">
                  {contact.addressZh ?? contact.address ?? ""}
                </span>
              </div>
              <div className="ftr-contact__row">
                <span className="ftr-contact__lab">HOMEPAGE</span>
                <a
                  href={contact.websiteZh ?? contact.website ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="ftr-contact__val ftr-contact__val--link"
                >
                  教师主页 ↗
                </a>
              </div>
              <Link href="/contact" className="navy-btn navy-btn--main ftr-contact__btn">
                联系我们 →
              </Link>
            </div>
          </div>

          {/* 备案条 */}
          <div className="ftr-beian">
            <div className="ftr-beian__copy">
              © {year} {site.nameEn}
            </div>
            <div className="ftr-beian__links">
              {site.icpNumber ? (
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.icpNumber}
                </a>
              ) : null}
              {site.icpNumber && site.policeRecordNumber ? (
                <span className="ftr-beian__sep">|</span>
              ) : null}
              {site.policeRecordNumber ? (
                <a
                  href="http://www.beian.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.policeRecordNumber}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </footer>

      {/* 回到顶部 */}
      {showTop ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="ftr-top"
          aria-label="回到顶部"
        >
          ↑
        </motion.button>
      ) : null}
    </>
  );
}
