// src/types/index.ts
// 集中定义项目中复用的数据类型，消除 any 使用

// ===================== 成果展示（首页 & 成果页共用） =====================

export type OutputKind = "paper" | "patent" | "honor" | "project";

export type OutputCard = {
  id: string;
  type: OutputKind;
  year?: number;
  title: string;
  subtitle?: string;
  meta?: string;
  status?: string;
  href: string;
};

export type OutputTab = "papers" | "patents" | "honors" | "projects";

// ===================== 通用工具类型 =====================

export type AnyRecord = Record<string, unknown>;

/** 研究方向的宽松视图，用于首页等只需部分字段的场景 */
export type ResearchDirectionView = {
  id?: string;
  slug?: string;
  titleZh?: string;
  titleZH?: string;
  title?: string;
  nameZh?: string;
  name?: string;
  titleEn?: string;
  titleEN?: string;
  subtitle?: string;
  nameEn?: string;
  en?: string;
  descZh?: string;
  descriptionZh?: string;
  desc?: string;
  description?: string;
  [key: string]: unknown;
};

/** 出版物的宽松视图 */
export type PublicationView = {
  id?: string;
  year?: number;
  date?: string;
  title?: string;
  titleZh?: string;
  titleEn?: string;
  venue?: string;
  citation?: string;
  doi?: string;
  url?: string;
  link?: string;
  href?: string;
  featured?: boolean;
  type?: string;
  category?: string;
  status?: string;
  [key: string]: unknown;
};

/** 专利的宽松视图 */
export type PatentView = {
  id: string;
  year?: number;
  title: string;
  number?: string;
  inventors?: string;
  [key: string]: unknown;
};

/** 荣誉的宽松视图 */
export type HonorView = {
  id: string;
  year?: number;
  title: string;
  titleZh?: string;
  titleEn?: string;
  imageSrc?: string;
  imageAlt?: string;
  [key: string]: unknown;
};

/** 项目的条目 */
export type ProjectItemView = {
  name: string;
  start?: string;
  end?: string;
};

/** 项目的分组 */
export type ProjectSectionView = {
  title: string;
  items: ProjectItemView[];
};

/** 成员的宽松视图 */
export type PersonView = {
  id: string;
  role?: string;
  nameZh?: string;
  nameEn?: string;
  titleZh?: string;
  orgZh?: string;
  introZh?: string;
  tags?: string[];
  avatar?: string;
  photo?: string;
  image?: string;
  img?: string;
  photoUrl?: string;
  avatarUrl?: string;
  headshot?: string;
  cohort?: number;
  [key: string]: unknown;
};

/** 联系信息 */
export type ContactView = {
  email?: string;
  addressZh?: string;
  address?: string;
  websiteZh?: string;
  website?: string;
  joinZh?: string;
  coopZh?: string;
};

/** 外部媒体链接 */
export type MediaLinkView = {
  id: string;
  title: string;
  date?: string;
  description?: string;
  url: string;
  source?: string;
  tag?: string;
  thumbnail?: string;
  thumbnailFit?: "cover" | "contain";
};

/** 产业化基地的宽松视图 */
export type IndustrialBaseView = {
  slug: string;
  titleZh: string;
  titleEn?: string;
  briefZh?: string;
  cover?: string;
  highlightsZh?: string[];
  [key: string]: unknown;
};
