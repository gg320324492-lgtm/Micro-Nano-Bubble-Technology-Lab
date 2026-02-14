export const DIRECTION_TAGS = [
  "水质提升与安全保障",
  "气泡溃灭与·OH原位生成",
  "表面清洗与去除",
  "农业高效种养与盐碱土修复",
  "水环境治理设备开发",
] as const;

type DirectionTone = {
  chip: string;
  chipActive: string;
  badge: string;
  bar: string;
};

const directionToneMap: Record<string, DirectionTone> = {
  水质提升与安全保障: {
    chip: "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100",
    chipActive: "border-blue-600 bg-blue-600 text-white hover:bg-blue-600",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    bar: "from-blue-600 via-blue-500 to-cyan-500",
  },
  "气泡溃灭与·OH原位生成": {
    chip: "border-cyan-200 bg-cyan-50 text-cyan-800 hover:bg-cyan-100",
    chipActive: "border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-600",
    badge: "border-cyan-200 bg-cyan-50 text-cyan-700",
    bar: "from-cyan-600 via-cyan-500 to-sky-500",
  },
  表面清洗与去除: {
    chip: "border-violet-200 bg-violet-50 text-violet-800 hover:bg-violet-100",
    chipActive: "border-violet-600 bg-violet-600 text-white hover:bg-violet-600",
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    bar: "from-violet-600 via-violet-500 to-indigo-500",
  },
  农业高效种养与盐碱土修复: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
    chipActive: "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-600",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    bar: "from-emerald-600 via-emerald-500 to-lime-500",
  },
  水环境治理设备开发: {
    chip: "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100",
    chipActive: "border-amber-500 bg-amber-500 text-white hover:bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    bar: "from-amber-500 via-orange-500 to-amber-400",
  },
};

const defaultDirectionTone: DirectionTone = {
  chip: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
  chipActive: "border-slate-700 bg-slate-700 text-white hover:bg-slate-700",
  badge: "border-slate-200 bg-slate-50 text-slate-700",
  bar: "from-slate-500 via-slate-500 to-slate-400",
};

export function getDirectionTone(tag?: string) {
  if (!tag) return defaultDirectionTone;
  return directionToneMap[tag] ?? defaultDirectionTone;
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

const roleToneMap: Record<string, RoleTone> = {
  ALL: {
    filterIdle: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
    filterActive: "bg-slate-700 text-white border-slate-700 shadow-sm",
    sectionDot: "bg-slate-500",
    sectionSurface: "bg-slate-50/30",
    sectionBorder: "border-slate-200/70",
    avatarBg: "bg-slate-100",
    avatarBorder: "border-slate-200",
    avatarText: "text-slate-600",
    cohort: "bg-slate-100 text-slate-700",
  },
  PhD: {
    filterIdle: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    filterActive: "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200",
    sectionDot: "bg-blue-600",
    sectionSurface: "bg-blue-50/45",
    sectionBorder: "border-blue-200/70",
    avatarBg: "bg-blue-50",
    avatarBorder: "border-blue-200",
    avatarText: "text-blue-700",
    cohort: "bg-blue-100 text-blue-700",
  },
  Master: {
    filterIdle: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100",
    filterActive: "bg-cyan-600 text-white border-cyan-600 shadow-sm shadow-cyan-200",
    sectionDot: "bg-cyan-600",
    sectionSurface: "bg-cyan-50/45",
    sectionBorder: "border-cyan-200/70",
    avatarBg: "bg-cyan-50",
    avatarBorder: "border-cyan-200",
    avatarText: "text-cyan-700",
    cohort: "bg-cyan-100 text-cyan-700",
  },
  Undergrad: {
    filterIdle: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
    filterActive: "bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200",
    sectionDot: "bg-violet-600",
    sectionSurface: "bg-violet-50/45",
    sectionBorder: "border-violet-200/70",
    avatarBg: "bg-violet-50",
    avatarBorder: "border-violet-200",
    avatarText: "text-violet-700",
    cohort: "bg-violet-100 text-violet-700",
  },
  Alumni: {
    filterIdle: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    filterActive: "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-200",
    sectionDot: "bg-amber-500",
    sectionSurface: "bg-amber-50/45",
    sectionBorder: "border-amber-200/70",
    avatarBg: "bg-amber-50",
    avatarBorder: "border-amber-200",
    avatarText: "text-amber-700",
    cohort: "bg-amber-100 text-amber-700",
  },
};

const defaultRoleTone = roleToneMap.ALL;

export function getRoleTone(role?: string) {
  if (!role) return defaultRoleTone;
  return roleToneMap[role] ?? defaultRoleTone;
}