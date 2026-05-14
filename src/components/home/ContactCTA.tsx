"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, ArrowRight } from "lucide-react";
import type { ContactView } from "@/types";

export default function ContactCTA({ contact }: { contact: ContactView }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-[var(--radius-xl)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent-secondary)]/5 to-transparent" />
      <div className="relative z-10 p-12 md:p-16 text-center border-2 border-[var(--border)] rounded-[var(--radius-xl)] bg-white/80 backdrop-blur-xl">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">加入我们</h2>
        <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
          我们正在寻找对微纳米气泡技术充满热情的研究人员。欢迎加入我们的团队！
        </p>
        <div className="grid gap-6 sm:grid-cols-3 mb-8 text-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
              <Mail className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Email</div>
            <a
              href={`mailto:${contact.email ?? ""}`}
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              {contact.email ?? ""}
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
              <MapPin className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Address</div>
            <div className="text-[var(--text-secondary)]">{contact.addressZh ?? contact.address ?? ""}</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
              <Globe className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider">Website</div>
            <a
              href={contact.websiteZh ?? contact.website ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              教师主页
            </a>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] px-10 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all"
          >
            立即联系
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

