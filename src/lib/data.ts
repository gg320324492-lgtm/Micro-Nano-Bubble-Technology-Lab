// src/lib/data.ts

export function pickArray<T = unknown>(mod: unknown, keys: string[]): T[] {
  for (const k of ["default", ...keys]) {
    const v = (mod as Record<string, unknown>)?.[k];
    if (Array.isArray(v)) return v as T[];
  }
  return [];
}

export function pickObject<T extends Record<string, unknown> = Record<string, unknown>>(
  mod: unknown,
  keys: string[],
): T {
  for (const k of ["default", ...keys]) {
    const v = (mod as Record<string, unknown>)?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v as T;
  }
  return {} as T;
}

export function pickList<T = unknown>(mod: unknown, keys: string[] = []): T[] {
  const merged = [
    "default",
    ...keys,
    "items",
    "list",
    "data",
    "publications",
    "papers",
    "patents",
    "honors",
    "projects",
  ];

  for (const k of merged) {
    const v = (mod as Record<string, unknown>)?.[k];
    if (Array.isArray(v)) return v as T[];
  }
  return [];
}
