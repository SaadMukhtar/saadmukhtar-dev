export type CategoryStyle = {
  dot: string;
  text: string;
  bg: string;
};

// Class strings are written out in full (not built with template literals) because
// Tailwind scans source for literal class names — a dynamic `bg-${color}-500` risks
// never being generated in the production build.
export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Fundamentals: {
    dot: "bg-sky-500",
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10 dark:bg-sky-400/10",
  },
  Networking: {
    dot: "bg-violet-500",
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10 dark:bg-violet-400/10",
  },
  "API Design": {
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-400/10",
  },
  Databases: {
    dot: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10 dark:bg-rose-400/10",
  },
  "Distributed Systems & Consistency": {
    dot: "bg-cyan-500",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  "Caching & Performance": {
    dot: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10 dark:bg-orange-400/10",
  },
  "Reliability & Scaling": {
    dot: "bg-fuchsia-500",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-500/10 dark:bg-fuchsia-400/10",
  },
  Observability: {
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
  },
  "AI Systems": {
    dot: "bg-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10 dark:bg-indigo-400/10",
  },
  "ML Infra": {
    dot: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10 dark:bg-purple-400/10",
  },
  "Infrastructure & DevOps": {
    dot: "bg-yellow-500",
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-500/10 dark:bg-yellow-400/10",
  },
  "Data Pipelines": {
    dot: "bg-teal-500",
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500/10 dark:bg-teal-400/10",
  },
  Security: {
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10 dark:bg-red-400/10",
  },
  "Company Architectures": {
    dot: "bg-lime-500",
    text: "text-lime-600 dark:text-lime-400",
    bg: "bg-lime-500/10 dark:bg-lime-400/10",
  },
  "Common Patterns": {
    dot: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-400/10",
  },
  "Advanced Topics": {
    dot: "bg-pink-500",
    text: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10 dark:bg-pink-400/10",
  },
  "Key Technologies": {
    dot: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-500/10 dark:bg-green-400/10",
  },
  "SD Interview Framework": {
    dot: "bg-slate-500",
    text: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-500/10 dark:bg-slate-400/10",
  },
};

const FALLBACK_STYLE: CategoryStyle = {
  dot: "bg-neutral-400",
  text: "text-neutral-500 dark:text-neutral-400",
  bg: "bg-neutral-400/10",
};

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category] ?? FALLBACK_STYLE;
}
