"use client";

import { useEffect, useState } from "react";
import { conceptFlashcards } from "@/data/conceptFlashcards";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import type { Rating } from "@/lib/spacedRepetition";

const RATING_BUTTONS: { rating: Rating; label: string; key: string }[] = [
  { rating: "again", label: "Again", key: "1" },
  { rating: "hard", label: "Hard", key: "2" },
  { rating: "good", label: "Good", key: "3" },
  { rating: "easy", label: "Easy", key: "4" },
];

export function FlashcardMode() {
  const { hydrated, currentCard, dueCount, rate } = useSpacedRepetition(conceptFlashcards);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const revealed = currentCard !== null && revealedCardId === currentCard.id;

  useEffect(() => {
    if (!currentCard) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (!revealed) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setRevealedCardId(currentCard!.id);
        }
        return;
      }
      const found = RATING_BUTTONS.find(
        (b) => b.key === e.key || b.label[0].toLowerCase() === e.key.toLowerCase()
      );
      if (found) {
        e.preventDefault();
        rate(found.rating);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCard, revealed, rate]);

  if (!hydrated) {
    return <div className="h-64" />;
  }

  if (!currentCard) {
    return (
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        All caught up — no cards due right now. Come back later.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-6 text-xs text-neutral-500 dark:text-neutral-400">
        {dueCount} card{dueCount === 1 ? "" : "s"} due today
      </p>

      <div className="border border-black/[0.10] dark:border-white/[0.10] p-6">
        <p className="mb-1 font-mono text-xs text-neutral-500 dark:text-neutral-500">
          {currentCard.category}
        </p>
        <h3 className="mb-4 font-medium text-black dark:text-white">{currentCard.term}</h3>
        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {currentCard.prompt}
        </p>

        {!revealed ? (
          <button
            onClick={() => setRevealedCardId(currentCard.id)}
            className="rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30"
          >
            Reveal <span className="opacity-60">(Space)</span>
          </button>
        ) : (
          <>
            <p className="animate-fade-in mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {currentCard.answer}
            </p>
            <div className="animate-fade-in flex flex-wrap gap-3">
              {RATING_BUTTONS.map((b) => (
                <button
                  key={b.rating}
                  onClick={() => rate(b.rating)}
                  className="rounded-full border border-black/15 dark:border-white/15 px-4 py-2 text-sm text-black dark:text-white transition-colors hover:border-black/35 dark:hover:border-white/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30"
                >
                  {b.label}{" "}
                  <span className="text-neutral-400 dark:text-neutral-500">({b.key})</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
