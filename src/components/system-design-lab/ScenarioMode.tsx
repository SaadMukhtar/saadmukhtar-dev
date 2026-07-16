"use client";

import { useState } from "react";
import { designScenarios } from "@/data/designScenarios";

export function ScenarioMode() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [revealed, setRevealed] = useState(false);

  function selectScenario(index: number) {
    setSelectedIndex(index);
    setNotes("");
    setRevealed(false);
  }

  if (selectedIndex === null) {
    return (
      <div>
        {designScenarios.map((scenario, i) => (
          <button
            key={scenario.slug}
            onClick={() => selectScenario(i)}
            className="block w-full border-b border-black/[0.06] py-6 text-left transition-colors first:border-t hover:bg-black/[0.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:border-white/[0.06] dark:hover:bg-white/[0.02] dark:focus-visible:ring-white/30"
          >
            <p className="text-sm text-black dark:text-white">{scenario.prompt}</p>
          </button>
        ))}
      </div>
    );
  }

  const scenario = designScenarios[selectedIndex];
  const paragraphs = scenario.modelAnswer.split("\n\n");

  return (
    <div>
      <button
        onClick={() => setSelectedIndex(null)}
        className="mb-6 text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        ← All scenarios
      </button>

      <div className="border border-black/[0.10] p-6 dark:border-white/[0.10]">
        <p className="mb-4 text-sm leading-relaxed text-black dark:text-white">{scenario.prompt}</p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Sketch your answer here — this isn't saved or graded, it's just for your own thinking."
          rows={6}
          className="mb-4 w-full resize-y border border-black/[0.10] bg-transparent px-3 py-2 text-sm text-black placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:border-white/[0.10] dark:text-white dark:placeholder:text-neutral-500 dark:focus-visible:ring-white/30"
        />

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:bg-white dark:text-black dark:focus-visible:ring-white/30"
          >
            Reveal model answer
          </button>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6 space-y-3">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {p}
                </p>
              ))}
            </div>

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
    </div>
  );
}
