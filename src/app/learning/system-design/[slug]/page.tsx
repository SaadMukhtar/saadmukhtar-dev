import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import {
  designScenarios,
  type DialogTurn,
  type ScenarioSection,
} from "@/data/designScenarios";
import { getCategoryStyle } from "@/data/categoryStyles";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return designScenarios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scenario = designScenarios.find((s) => s.slug === slug);
  if (!scenario) return { title: "Not found" };
  return {
    title: `${scenario.system} — System Design — Saad Mukhtar`,
    description: scenario.prompt,
  };
}

// Simple markdown → JSX. Handles paragraphs, **bold**, and lists starting with "- ".
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

function renderBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-black dark:text-white"
        >
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function DialogBlock({ turns }: { turns: DialogTurn[] }) {
  return (
    <div className="space-y-6">
      {turns.map((turn, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-24 shrink-0 pt-0.5">
            <span
              className={`font-mono text-xs uppercase tracking-wider ${
                turn.speaker === "interviewer"
                  ? "text-neutral-500 dark:text-neutral-400"
                  : "text-black dark:text-white"
              }`}
            >
              {turn.speaker === "interviewer" ? "Interviewer" : "You"}
            </span>
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            {turn.text.split(/\n\n+/).map((para, j) => (
              <p
                key={j}
                className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200"
              >
                {renderBold(para)}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({ section, index }: { section: ScenarioSection; index: number }) {
  return (
    <section className="border-t border-black/[0.06] py-10 dark:border-white/[0.06]">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {section.stage}
        </h2>
      </div>
      {section.content && (
        <div className="space-y-3">{renderMarkdown(section.content, `s${index}-`)}</div>
      )}
      {section.diagram && (
        <div className="mt-4">
          <MermaidDiagram source={section.diagram} />
        </div>
      )}
      {section.dialog && (
        <div className="mt-2">
          <DialogBlock turns={section.dialog} />
        </div>
      )}
    </section>
  );
}

export default async function ScenarioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const scenario = designScenarios.find((s) => s.slug === slug);
  if (!scenario) notFound();

  const style = getCategoryStyle(scenario.category);

  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-3xl px-6">
        <article className="pb-32 pt-48">
          <Link
            href="/learning/system-design"
            className="mb-12 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            ← System Design
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
            <span className={`font-mono text-xs ${style.text}`}>
              {scenario.category}
            </span>
            {scenario.template && (
              <span className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                template
              </span>
            )}
            {scenario.company && (
              <span
                className={`rounded ${style.bg} px-1.5 py-0.5 font-mono text-[10px] ${style.text}`}
              >
                {scenario.company}
              </span>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-black dark:text-white">
            {scenario.system}
          </h1>
          <p className="mb-16 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {scenario.prompt}
          </p>

          {scenario.sections.map((section, i) => (
            <Section key={i} section={section} index={i} />
          ))}

          {(scenario.strongAnswerIncludes.length > 0 ||
            scenario.weakAnswerMisses.length > 0) && (
            <section className="border-t border-black/[0.06] py-10 dark:border-white/[0.06]">
              <div className="mb-6 flex items-baseline gap-3">
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
                  ✓
                </span>
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Rubric
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                {scenario.strongAnswerIncludes.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Strong answer includes
                    </p>
                    <ul className="space-y-2">
                      {scenario.strongAnswerIncludes.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {scenario.weakAnswerMisses.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                      Weak answer misses
                    </p>
                    <ul className="space-y-2">
                      {scenario.weakAnswerMisses.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/20 dark:bg-white/20" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
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
