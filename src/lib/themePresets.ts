// src/lib/themePresets.ts

export const industrialSectionThemes = [
  {
    card: "border-sky-400/35 bg-[var(--bg-card)]/95",
    accent: "from-sky-500 to-blue-500",
    title: "text-[var(--text)]",
    body: "text-[var(--text-secondary)]",
    bullet: "bg-sky-500",
  },
  {
    card: "border-emerald-400/35 bg-[var(--bg-card)]/95",
    accent: "from-emerald-500 to-teal-500",
    title: "text-[var(--text)]",
    body: "text-[var(--text-secondary)]",
    bullet: "bg-emerald-500",
  },
  {
    card: "border-violet-400/35 bg-[var(--bg-card)]/95",
    accent: "from-violet-500 to-indigo-500",
    title: "text-[var(--text)]",
    body: "text-[var(--text-secondary)]",
    bullet: "bg-violet-500",
  },
] as const;
