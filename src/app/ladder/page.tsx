import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ladder, type LadderStatus } from "@/data/ladder";

// Unlisted: not linked from the nav or home page, and kept out of search results.
export const metadata: Metadata = {
  title: "Ladder · Saad Mukhtar",
  robots: { index: false, follow: false },
};

const statusStyle: Record<LadderStatus, string> = {
  next: "bg-black text-white dark:bg-white dark:text-black",
  planned: "text-neutral-500 dark:text-neutral-400",
  building: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  shipped: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export default function Ladder() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-24">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Ladder
        </p>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight text-black dark:text-white">
          AI agents + infra, one level at a time
        </h1>
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-300">
          Each level is a new repo with a README, real eval numbers, and one post.
        </p>

        <div className="border border-black/[0.10] bg-white dark:border-white/[0.10] dark:bg-black">
          <div className="grid grid-cols-[2.5rem_1fr_auto] gap-4 border-b border-black/[0.10] px-4 py-2 text-xs font-medium uppercase tracking-widest text-neutral-500 sm:grid-cols-[2.5rem_1fr_10rem_7rem_5rem] dark:border-white/[0.10] dark:text-neutral-400">
            <span>#</span>
            <span>Project</span>
            <span className="hidden sm:block">Skill</span>
            <span className="hidden sm:block">Time</span>
            <span>Status</span>
          </div>
          {ladder.map((l) => (
            <details
              key={l.level}
              className="group border-b border-black/[0.06] last:border-b-0 dark:border-white/[0.06]"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-4 py-3 transition-colors hover:bg-black/[0.02] sm:grid-cols-[2.5rem_1fr_10rem_7rem_5rem] dark:hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-sm text-neutral-500">L{l.level}</span>
                <span className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="shrink-0 text-neutral-400 transition-transform group-open:rotate-90"
                  >
                    <path d="M4.5 3l3 3-3 3" />
                  </svg>
                  {l.name}
                </span>
                <span className="hidden text-sm text-neutral-600 sm:block dark:text-neutral-300">{l.skill}</span>
                <span className="hidden font-mono text-xs text-neutral-500 sm:block">{l.time}</span>
                <span className={`justify-self-start rounded-full px-2 py-0.5 text-xs ${statusStyle[l.status]}`}>
                  {l.status === "next" ? "up next" : l.status}
                </span>
              </summary>
              <dl className="grid gap-x-4 gap-y-2 px-4 pb-4 text-sm sm:ml-[3.5rem] sm:grid-cols-[5rem_1fr]">
                <dt className="text-neutral-500">Goal</dt>
                <dd className="text-black dark:text-white">{l.goal}</dd>
                <dt className="text-neutral-500">Build</dt>
                <dd className="text-neutral-600 dark:text-neutral-300">{l.build}</dd>
                <dt className="text-neutral-500">Measure</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {l.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded bg-black/[0.04] px-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-300"
                    >
                      {m}
                    </span>
                  ))}
                </dd>
                <dt className="text-neutral-500 sm:hidden">Time</dt>
                <dd className="font-mono text-xs text-neutral-500 sm:hidden">{l.time}</dd>
              </dl>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
}
