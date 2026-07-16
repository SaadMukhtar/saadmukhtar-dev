"use client";

import { useState } from "react";
import { designScenarios } from "@/data/designScenarios";
import { getCategoryStyle } from "@/data/categoryStyles";
import { getStageStyle } from "@/data/stageStyles";

type ScenarioModeProps = {
  initialOpenSlug?: string;
};

export function ScenarioMode({ initialOpenSlug }: ScenarioModeProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    if (!initialOpenSlug) return null;
    const idx = designScenarios.findIndex((s) => s.slug === initialOpenSlug);
    return idx === -1 ? null : idx;
  });
  const [notes, setNotes] = useState("");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [rubricShown, setRubricShown] = useState(false);

  function selectScenario(index: number) {
    setSelectedIndex(index);
    setNotes("");
    setSectionIndex(0);
    setRubricShown(false);
  }

  if (selectedIndex === null) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {designScenarios.map((scenario, i) => {
          const style = getCategoryStyle(scenario.category);
          return (
            <button
              key={scenario.slug}
              onClick={() => selectScenario(i)}
              className="group border border-black/[0.10] p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:border-white/[0.10] dark:hover:bg-white/[0.02] dark:focus-visible:ring-white/30"
            >
              <p className="mb-2 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                <span className={`font-mono text-xs ${style.text}`}>{scenario.category}</span>
              </p>
              <h3 className="mb-2 font-medium text-black dark:text-white">{scenario.system}</h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {scenario.prompt}
              </p>
            </button>
          );
        })}
      </div>
    );
  }

  const scenario = designScenarios[selectedIndex];
  const categoryStyle = getCategoryStyle(scenario.category);
  const section = scenario.sections[sectionIndex];
  const stageStyle = getStageStyle(section.stage);
  const isLastSection = sectionIndex === scenario.sections.length - 1;
  const paragraphs = section.content.split("\n\n");

  return (
    <div>
      <button
        onClick={() => setSelectedIndex(null)}
        className="mb-6 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        ← All scenarios
      </button>

      <div className="mb-8 border border-black/[0.10] p-6 dark:border-white/[0.10]">
        <p className="mb-2 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${categoryStyle.dot}`} />
          <span className={`font-mono text-xs ${categoryStyle.text}`}>{scenario.category}</span>
        </p>
        <h3 className="mb-2 font-medium text-black dark:text-white">{scenario.system}</h3>
        <p className="mb-4 text-sm leading-relaxed text-black dark:text-white">{scenario.prompt}</p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Sketch your own approach first — optional, not saved or graded."
          rows={4}
          className="w-full resize-y border border-black/[0.10] bg-transparent px-3 py-2 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:border-white/[0.10] dark:text-white dark:placeholder:text-neutral-500 dark:focus-visible:ring-white/30"
        />
      </div>

      {!rubricShown ? (
        <div className="border border-black/[0.10] p-6 dark:border-white/[0.10]">
          <div className="mb-4 flex items-center gap-3">
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
              Step {sectionIndex + 1} of {scenario.sections.length}
            </p>
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${stageStyle.dot}`} />
              <span className={`text-xs ${stageStyle.text}`}>{section.stage}</span>
            </span>
          </div>
          <div className="mb-5 space-y-3">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {p}
              </p>
            ))}
          </div>
          <button
            onClick={() => {
              if (isLastSection) setRubricShown(true);
              else setSectionIndex((i) => i + 1);
            }}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:bg-white dark:text-black dark:focus-visible:ring-white/30"
          >
            {isLastSection ? "Show rubric →" : "Next step →"}
          </button>
        </div>
      ) : (
        <div className="animate-fade-in border border-black/[0.10] p-6 dark:border-white/[0.10]">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Strong answer includes
              </p>
              <ul className="space-y-2">
                {scenario.strongAnswerIncludes.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Weak answer misses
              </p>
              <ul className="space-y-2">
                {scenario.weakAnswerMisses.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/20 dark:bg-white/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
