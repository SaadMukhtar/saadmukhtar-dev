"use client";

import { useState } from "react";
import { EstimationMode } from "./EstimationMode";
import { FlashcardMode } from "./FlashcardMode";
import { ScenarioMode } from "./ScenarioMode";

type Mode = "estimation" | "flashcards" | "scenarios";

const modes: { id: Mode; label: string }[] = [
  { id: "estimation", label: "Estimation Drills" },
  { id: "flashcards", label: "Flashcards" },
  { id: "scenarios", label: "Scenarios" },
];

export function SystemDesignLab() {
  const [mode, setMode] = useState<Mode>("estimation");

  return (
    <div>
      <div className="mb-12 flex items-center gap-6 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`group relative text-sm transition-colors focus-visible:outline-none ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {m.label}
              <span
                className={`absolute -bottom-[17px] left-0 h-px bg-black dark:bg-white transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          );
        })}
      </div>

      {mode === "estimation" && <EstimationMode />}
      {mode === "flashcards" && <FlashcardMode />}
      {mode === "scenarios" && <ScenarioMode />}
    </div>
  );
}
