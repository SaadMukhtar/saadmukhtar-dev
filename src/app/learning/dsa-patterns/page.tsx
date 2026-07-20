import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { dsaPatterns } from "@/data/dsaPatterns";

export const metadata: Metadata = {
  title: "DSA Patterns · Learning · Saad Mukhtar",
  description:
    "The recurring patterns behind medium-difficulty coding interviews: when to reach for each, curated problems, common mistakes.",
};

export default function DsaPatternsPage() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Learning · DSA Patterns
          </p>
          <p className="mb-12 text-sm text-neutral-600 dark:text-neutral-300">
            The patterns behind most medium-difficulty problems. Two Pointers is fully
            documented as the reference; others land as I fill them in.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {dsaPatterns.map((pattern) => {
              const isStub = pattern.status === "stub";
              return (
                <Link
                  key={pattern.slug}
                  href={`/learning/dsa-patterns/${pattern.slug}`}
                  className="group flex flex-col border border-black/[0.10] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:border-white/[0.10] dark:hover:bg-white/[0.02]"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-medium text-black dark:text-white">
                      {pattern.name}
                    </h3>
                    {isStub ? (
                      <span className="mt-0.5 shrink-0 rounded bg-black/[0.04] px-1.5 py-0.5 text-xs text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400">
                        coming soon
                      </span>
                    ) : (
                      <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        ready
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {pattern.shortDescription}
                  </p>
                  {!isStub && (
                    <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                      {pattern.problems.length} problems · read →
                    </p>
                  )}
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
