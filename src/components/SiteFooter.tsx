// src/components/SiteFooter.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import * as contactModule from "@/data/contact";
import { navItems } from "@/data/site";

type ContactLike = {
  email?: string;
  addressZh?: string;
  address?: string;
  websiteZh?: string;
  website?: string;
};

function pickObject(mod: Record<string, unknown>, keys: string[]): ContactLike {
  for (const k of ["default", ...keys]) {
    const v = mod?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v as ContactLike;
  }
  return {};
}

export default function SiteFooter() {
  const contact = pickObject(contactModule as unknown as Record<string, unknown>, ["contact", "contacts"]);
  const footerNavItems = navItems.filter((item) => item.href !== "/contact");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-[var(--border)] bg-[var(--bg-surface)] backdrop-blur-xl overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 to-transparent pointer-events-none" />
      
      <Container className="relative z-10 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-lg font-bold text-[var(--text)] mb-2 gradient-text">微纳米气泡课题组</div>
            <div className="text-sm text-[var(--text-secondary)] mb-4">
              Micro & Nano Bubble Technology Lab
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              聚焦微纳米气泡技术的机理研究、装备开发与多场景应用。
            </p>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-base font-bold text-[var(--text)] mb-4 gradient-text">导航</div>
            <div className="grid gap-3 text-sm text-[var(--text-secondary)]">
              {footerNavItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="hover:text-[var(--accent)] transition-colors inline-block"
                  >
                    {item.zh} / {item.en}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-base font-bold text-[var(--text)] mb-4 gradient-text">联系</div>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div>
                <span className="text-[var(--muted)] block text-xs mb-1 uppercase tracking-wider">Email</span>
                <a
                  href={`mailto:${contact.email ?? ""}`}
                  className="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors font-medium"
                >
                  {contact.email ?? ""}
                </a>
              </div>
              <div>
                <span className="text-[var(--muted)] block text-xs mb-1 uppercase tracking-wider">Address</span>
                {contact.addressZh ?? contact.address ?? ""}
              </div>
              <div>
                <span className="text-[var(--muted)] block text-xs mb-1 uppercase tracking-wider">Website</span>
                <a
                  href={contact.websiteZh ?? contact.website ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors font-medium"
                >
                  教师主页
                </a>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Link
                href="/contact"
                  className="inline-flex rounded-[var(--radius-md)] border-2 border-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all hover:shadow-md"
              >
                联系我们 / Join Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between"
        >
          <div>© {year} Micro & Nano Bubble Technology Lab</div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <Link href="/publications" className="hover:text-[var(--accent)] transition-colors">
              Publications
            </Link>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
