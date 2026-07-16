export type CategoryStyle = {
  dot: string;
  text: string;
};

// Class strings are written out in full (not built with template literals) because
// Tailwind scans source for literal class names — a dynamic `bg-${color}-500` risks
// never being generated in the production build.
export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Fundamentals: { dot: "bg-sky-500", text: "text-sky-600 dark:text-sky-400" },
  Networking: { dot: "bg-violet-500", text: "text-violet-600 dark:text-violet-400" },
  "API Design": { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  Databases: { dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" },
  "Distributed Systems & Consistency": {
    dot: "bg-cyan-500",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  "Caching & Performance": { dot: "bg-orange-500", text: "text-orange-600 dark:text-orange-400" },
  "Reliability & Scaling": {
    dot: "bg-fuchsia-500",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
  },
};

const FALLBACK_STYLE: CategoryStyle = {
  dot: "bg-neutral-400",
  text: "text-neutral-500 dark:text-neutral-400",
};

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category] ?? FALLBACK_STYLE;
}
