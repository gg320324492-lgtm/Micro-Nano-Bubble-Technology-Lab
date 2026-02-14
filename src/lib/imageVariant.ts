export type ImageVariant = "thumb" | "main" | "full";

const EXTERNAL_RE = /^(https?:\/\/|data:|blob:)/i;
const VARIANT_RE = /\.(thumb|main|full)\.webp$/i;

export function toImageVariant(src: string, variant: ImageVariant): string {
  if (!src) return src;
  if (EXTERNAL_RE.test(src)) return src;

  const queryIndex = src.search(/[?#]/);
  const base = queryIndex >= 0 ? src.slice(0, queryIndex) : src;
  const suffix = queryIndex >= 0 ? src.slice(queryIndex) : "";

  if (VARIANT_RE.test(base)) {
    return base.replace(VARIANT_RE, `.${variant}.webp`) + suffix;
  }

  const withVariant = base.replace(/\.[a-zA-Z0-9]+$/, `.${variant}.webp`);
  return (withVariant === base ? `${base}.${variant}.webp` : withVariant) + suffix;
}
