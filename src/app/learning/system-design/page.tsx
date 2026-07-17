import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { designScenarios } from "@/data/designScenarios";
import { getCategoryStyle } from "@/data/categoryStyles";

export const metadata: Metadata = {
  title: "System Design — Learning — Saad Mukhtar",
  description:
    "Real system design walkthroughs with interviewer/candidate dialog and architecture diagrams.",
};

export default function SystemDesignPage() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Learning · System Design
          </p>
          <p className="mb-12 text-sm text-neutral-600 dark:text-neutral-300">
            Real interview walkthroughs — the template + one full reference (bit.ly).
            More scenarios landing as I build them out.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {designScenarios.map((scenario) => {
              const style = getCategoryStyle(scenario.category);
              return (
                <Link
                  key={scenario.slug}
                  href={`/learning/system-design/${scenario.slug}`}
                  className="group flex flex-col border border-black/[0.10] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:border-white/[0.10] dark:hover:bg-white/[0.02]"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                      aria-hidden
                    />
                    <span className={`font-mono text-xs ${style.text}`}>
                      {scenario.category}
                    </span>
                    {scenario.template && (
                      <span className="ml-1 rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                        template
                      </span>
                    )}
                    {scenario.company && (
                      <span className={`ml-1 rounded ${style.bg} px-1.5 py-0.5 font-mono text-[10px] ${style.text}`}>
                        {scenario.company}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 font-medium text-black dark:text-white">
                    {scenario.system}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {scenario.prompt}
                  </p>
                  <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                    {scenario.sections.length} sections · read →
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Built with Next.js · Tailwind
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Saad Mukhtar
          </p>
        </div>
      </footer>
    </div>
  );
}
