export const DIRECTION_TAGS = [
  "气泡成核过程调控与设备研发",
  "饮用水水质提升与安全保障",
  "黑臭水体无药剂低能耗治理",
  "水产高密度无抗养殖与品质改善",
] as const;

type DirectionTone = {
  chip: string;
  chipActive: string;
  badge: string;
  bar: string;
};

// 统一配色：所有方向标签使用同一套主色
const defaultDirectionTone: DirectionTone = {
  chip:
    "border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]",
  chipActive: "border-[var(--accent)] bg-[var(--accent)] text-white",
  badge: "border-[var(--border)] bg-[var(--accent-soft)] text-[var(--accent)]",
  bar: "from-[var(--accent)] to-[var(--accent-secondary)]",
};

export function getDirectionTone(_tag?: string) {
  return defaultDirectionTone;
}

type RoleTone = {
  filterIdle: string;
  filterActive: string;
  sectionDot: string;
  sectionSurface: string;
  sectionBorder: string;
  avatarBg: string;
  avatarBorder: string;
  avatarText: string;
  cohort: string;
};

// 统一配色：所有角色使用同一套主色
const unifiedTone: RoleTone = {
  filterIdle:
    "bg-white text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]",
  filterActive:
    "bg-[var(--accent)] text-white border-[var(--accent)]",
  sectionDot: "bg-[var(--accent)]",
  sectionSurface: "bg-[var(--bg-surface)]",
  sectionBorder: "border-[var(--border)]",
  avatarBg: "bg-[var(--bg-elevated)]",
  avatarBorder: "border-[var(--border)]",
  avatarText: "text-[var(--muted)]",
  cohort: "bg-[var(--accent-soft)] text-[var(--accent)]",
};

const roleToneMap: Record<string, RoleTone> = {
  ALL: unifiedTone,
  PhD: unifiedTone,
  Master: unifiedTone,
  Undergrad: unifiedTone,
  Alumni: unifiedTone,
};

export function getRoleTone(_role?: string) {
  return unifiedTone;
}
