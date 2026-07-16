"use client";

import { useState, type KeyboardEvent } from "react";
import { estimationDrills } from "@/data/estimationDrills";
import { getStageStyle } from "@/data/stageStyles";

type StepResult = "unanswered" | "correct" | "incorrect" | "invalid";

function checkStepAnswer(
  userInput: string,
  expectedExponentRange: [number, number]
): "correct" | "incorrect" | "invalid" {
  const value = parseFloat(userInput);
  if (!isFinite(value) || value <= 0) return "invalid";
  const exponent = Math.floor(Math.log10(value));
  const [min, max] = expectedExponentRange;
  return exponent >= min && exponent <= max ? "correct" : "incorrect";
}

export function EstimationMode() {
  const [drillIndex, setDrillIndex] = useState(0);
  const drill = estimationDrills[drillIndex];
  const [stepIndex, setStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<StepResult[]>(() =>
    drill.steps.map(() => "unanswered")
  );

  const step = drill.steps[stepIndex];
  const stageStyle = getStageStyle(step.stage);
  const result = results[stepIndex];
  const isChecked = result !== "unanswered";
  const isLastStep = stepIndex === drill.steps.length - 1;
  const correctCount = results.filter((r) => r === "correct").length;
  const allChecked = results.every((r) => r === "correct" || r === "incorrect");

  function selectDrill(index: number) {
    setDrillIndex(index);
    setStepIndex(0);
    setInputValue("");
    setResults(estimationDrills[index].steps.map(() => "unanswered"));
  }

  function handleCheck() {
    const outcome = checkStepAnswer(inputValue, step.expectedExponentRange);
    setResults((prev) => {
      const next = [...prev];
      next[stepIndex] = outcome;
      return next;
    });
  }

  function handleRetry() {
    setResults((prev) => {
      const next = [...prev];
      next[stepIndex] = "unanswered";
      return next;
    });
  }

  function handleNext() {
    setStepIndex((i) => i + 1);
    setInputValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (!isChecked) {
      handleCheck();
    } else if (result !== "invalid" && !isLastStep) {
      handleNext();
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        {estimationDrills.map((d, i) => (
          <button
            key={d.slug}
            onClick={() => selectDrill(i)}
            className={`rounded px-1.5 py-0.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 ${
              i === drillIndex
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-black/[0.04] text-neutral-600 hover:bg-black/[0.08] dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/[0.12]"
            }`}
          >
            {d.system}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-300">{drill.description}</p>

      <div className="border border-black/[0.10] dark:border-white/[0.10] p-6">
        <div className="mb-4 flex items-center gap-3">
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
            Step {stepIndex + 1} of {drill.steps.length}
          </p>
          <span className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${stageStyle.dot}`} />
            <span className={`text-xs ${stageStyle.text}`}>{step.stage}</span>
          </span>
        </div>
        <p className="mb-2 text-sm leading-relaxed text-black dark:text-white">{step.question}</p>
        <p className="mb-4 text-xs italic text-neutral-500 dark:text-neutral-400">
          {step.whenAsked}
        </p>

        <div className="mb-4 flex items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isChecked}
            placeholder="Your estimate"
            aria-label={step.question}
            className="w-40 border border-black/[0.10] dark:border-white/[0.10] bg-transparent px-3 py-2 text-sm text-black dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 disabled:opacity-60"
          />
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {step.unit}
          </span>
          {!isChecked && (
            <button
              onClick={handleCheck}
              className="rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30"
            >
              Check
            </button>
          )}
        </div>

        {isChecked && (
          <div className="animate-fade-in mb-4">
            {result === "correct" && (
              <p className="mb-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                right order of magnitude
              </p>
            )}
            {result === "incorrect" && (
              <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                off by more than an order of magnitude
              </p>
            )}
            {result === "invalid" && (
              <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                enter a positive number
              </p>
            )}
            {result !== "invalid" && (
              <>
                <p className="mb-2 font-mono text-xs text-neutral-600 dark:text-neutral-300">
                  {step.derivation}
                </p>
                <p className="mb-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {step.explanation}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Say it like this:
                  </span>
                  {step.buzzwords.map((word) => (
                    <span
                      key={word}
                      className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:text-neutral-300"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {result === "invalid" && (
          <button
            onClick={handleRetry}
            className="text-sm text-black dark:text-white transition-opacity hover:opacity-70"
          >
            Try again
          </button>
        )}

        {isChecked && result !== "invalid" && !isLastStep && (
          <button
            onClick={handleNext}
            className="rounded-full border border-black/15 dark:border-white/15 px-4 py-2 text-sm text-black dark:text-white transition-colors hover:border-black/35 dark:hover:border-white/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30"
          >
            Next step →
          </button>
        )}
      </div>

      {allChecked && (
        <p className="animate-fade-in mt-6 text-sm text-neutral-600 dark:text-neutral-300">
          {correctCount}/{drill.steps.length} steps within the right order of magnitude.
        </p>
      )}
    </div>
  );
}
