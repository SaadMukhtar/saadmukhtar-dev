"use client";

import { useEffect, useMemo, useState } from "react";
import { conceptFlashcards, type ConceptFlashcard } from "@/data/conceptFlashcards";
import { getCategoryStyle } from "@/data/categoryStyles";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import type { Rating } from "@/lib/spacedRepetition";

const RATING_BUTTONS: { rating: Rating; label: string; key: string }[] = [
  { rating: "again", label: "Again", key: "1" },
  { rating: "hard", label: "Hard", key: "2" },
  { rating: "good", label: "Good", key: "3" },
  { rating: "easy", label: "Easy", key: "4" },
];

const CATEGORIES = Array.from(new Set(conceptFlashcards.map((c) => c.category)));
const CATEGORY_PILLS = ["All", ...CATEGORIES];

type FlashcardModeProps = {
  onNavigateToScenario?: (slug: string) => void;
};

function BrowseCardRow({ card }: { card: ConceptFlashcard }) {
  const [expanded, setExpanded] = useState(false);
  const style = getCategoryStyle(card.category);

  return (
    <div className="border-b border-black/[0.06] py-6 first:border-t dark:border-white/[0.06]">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30"
      >
        <p className="mb-1 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          <span className={`font-mono text-xs ${style.text}`}>{card.category}</span>
        </p>
        <p className="mb-1 text-sm font-medium text-black dark:text-white">{card.term}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{card.prompt}</p>
      </button>
      {expanded && (
        <p className="animate-fade-in mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {card.answer}
        </p>
      )}
    </div>
  );
}

export function FlashcardMode({ onNavigateToScenario }: FlashcardModeProps) {
  const [viewMode, setViewMode] = useState<"study" | "browse">("study");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredCards = useMemo(
    () =>
      selectedCategory === "All"
        ? conceptFlashcards
        : conceptFlashcards.filter((c) => c.category === selectedCategory),
    [selectedCategory]
  );

  const { hydrated, currentCard, dueCount, rate } = useSpacedRepetition(filteredCards);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const revealed = currentCard !== null && revealedCardId === currentCard.id;

  useEffect(() => {
    if (viewMode !== "study" || !currentCard) return;

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
  }, [viewMode, currentCard, revealed, rate]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setViewMode("study")}
          className={`rounded-full px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 ${
            viewMode === "study"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "border border-black/15 text-neutral-600 hover:border-black/35 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/35"
          }`}
        >
          Study
        </button>
        <button
          onClick={() => setViewMode("browse")}
          className={`rounded-full px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 ${
            viewMode === "browse"
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "border border-black/15 text-neutral-600 hover:border-black/35 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/35"
          }`}
        >
          Browse all
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {CATEGORY_PILLS.map((cat) => {
          const isActive = cat === selectedCategory;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-black/[0.04] text-neutral-600 hover:bg-black/[0.08] dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/[0.12]"
              }`}
            >
              {cat !== "All" && (
                <span className={`h-1.5 w-1.5 rounded-full ${getCategoryStyle(cat).dot}`} />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {viewMode === "browse" ? (
        <div>
          <p className="mb-6 text-xs text-neutral-500 dark:text-neutral-400">
            {filteredCards.length} card{filteredCards.length === 1 ? "" : "s"}
          </p>
          {filteredCards.map((card) => (
            <BrowseCardRow key={card.id} card={card} />
          ))}
        </div>
      ) : !hydrated ? (
        <div className="h-64" />
      ) : !currentCard ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          All caught up — no cards due right now. Come back later.
        </p>
      ) : (
        <>
          <p className="mb-6 text-xs text-neutral-500 dark:text-neutral-400">
            {dueCount} card{dueCount === 1 ? "" : "s"} due today
          </p>

          <div className="border border-black/[0.10] dark:border-white/[0.10] p-6">
            <p className="mb-1 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${getCategoryStyle(currentCard.category).dot}`}
              />
              <span className={`font-mono text-xs ${getCategoryStyle(currentCard.category).text}`}>
                {currentCard.category}
              </span>
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
                {currentCard.relatedScenarioSlug && onNavigateToScenario && (
                  <button
                    onClick={() => onNavigateToScenario(currentCard.relatedScenarioSlug!)}
                    className="animate-fade-in mb-5 block text-sm text-black dark:text-white transition-opacity hover:opacity-70"
                  >
                    → Full walkthrough
                  </button>
                )}
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
        </>
      )}
    </div>
  );
}
