import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { dsaPatterns } from "@/data/dsaPatterns";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return dsaPatterns.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pattern = dsaPatterns.find((p) => p.slug === slug);
  if (!pattern) return { title: "Not found" };
  return {
    title: `${pattern.name} — DSA Patterns — Saad Mukhtar`,
    description: pattern.shortDescription,
  };
}

function renderBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-black dark:text-white">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function renderMarkdown(text: string, keyPrefix = ""): React.ReactNode {
  const blocks = text.split(/\n\n+/);
  return blocks.map((block, i) => {
    const key = `${keyPrefix}${i}`;
    const lines = block.split("\n");
    const isList = lines.every((l) => l.trim().startsWith("- "));
    if (isList) {
      return (
        <ul key={key} className="my-3 space-y-1.5 pl-5">
          {lines.map((l, j) => (
            <li
              key={j}
              className="list-disc text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
            >
              {renderBold(l.trim().replace(/^-\s+/, ""))}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p
        key={key}
        className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
      >
        {renderBold(block)}
      </p>
    );
  });
}

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  hard: "text-rose-600 dark:text-rose-400",
};

export default async function PatternPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pattern = dsaPatterns.find((p) => p.slug === slug);
  if (!pattern) notFound();

  const isStub = pattern.status === "stub";

  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-3xl px-6">
        <article className="pb-32 pt-48">
          <Link
            href="/learning/dsa-patterns"
            className="mb-12 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            ← DSA Patterns
          </Link>

          <h1 className="mb-3 text-4xl font-semibold tracking-tight text-black dark:text-white">
            {pattern.name}
          </h1>
          <p className="mb-16 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {pattern.shortDescription}
          </p>

          {isStub ? (
            <div className="border border-black/[0.10] p-8 text-center dark:border-white/[0.10]">
              <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
                Coming soon.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                See{" "}
                <Link
                  href="/learning/dsa-patterns/two-pointers"
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white"
                >
                  Two Pointers
                </Link>{" "}
                for the reference format.
              </p>
            </div>
          ) : (
            <>
              <section className="border-t border-black/[0.06] py-10 dark:border-white/[0.06]">
                <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                  When to use
                </h2>
                <div className="space-y-3">
                  {renderMarkdown(pattern.whenToUse, "wtu-")}
                </div>
              </section>

              <section className="border-t border-black/[0.06] py-10 dark:border-white/[0.06]">
                <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                  Why it matters
                </h2>
                <div className="space-y-3">
                  {renderMarkdown(pattern.whyItMatters, "wim-")}
                </div>
              </section>

              {pattern.problems.length > 0 && (
                <section className="border-t border-black/[0.06] py-10 dark:border-white/[0.06]">
                  <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                    Curated problems
                  </h2>
                  <div className="space-y-4">
                    {pattern.problems.map((prob, i) => (
                      <a
                        key={i}
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-l-2 border-transparent pl-4 transition-colors hover:border-black dark:hover:border-white"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-black dark:text-white">
                            {prob.name}
                          </span>
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider ${DIFFICULTY_STYLES[prob.difficulty]}`}
                          >
                            {prob.difficulty}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                          {prob.note}
                        </p>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {pattern.commonMistakes.length > 0 && (
                <section className="border-t border-black/[0.06] py-10 dark:border-white/[0.06]">
                  <h2 className="mb-6 text-lg font-semibold text-black dark:text-white">
                    Common mistakes
                  </h2>
                  <ul className="space-y-2">
                    {pattern.commonMistakes.map((m, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </article>
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
