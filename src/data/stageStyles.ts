export type StageStyle = {
  dot: string;
  text: string;
};

// Deliberately a distinct hue set from categoryStyles.ts so "stage" and "category"
// tags never look like the same taxonomy when shown near each other.
export const STAGE_STYLES: Record<string, StageStyle> = {
  "Requirements & Scope": { dot: "bg-teal-500", text: "text-teal-600 dark:text-teal-400" },
  "Back-of-Envelope Estimation": { dot: "bg-blue-500", text: "text-blue-600 dark:text-blue-400" },
  "High-Level Design": { dot: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400" },
  "Deep Dive & Bottlenecks": { dot: "bg-red-500", text: "text-red-600 dark:text-red-400" },
  "Trade-offs & Scaling": { dot: "bg-purple-500", text: "text-purple-600 dark:text-purple-400" },
};

const FALLBACK_STYLE: StageStyle = {
  dot: "bg-neutral-400",
  text: "text-neutral-500 dark:text-neutral-400",
};

export function getStageStyle(stage: string): StageStyle {
  return STAGE_STYLES[stage] ?? FALLBACK_STYLE;
}
