"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Nav } from "@/components/Nav";
import { conceptFlashcards, type ConceptFlashcard } from "@/data/conceptFlashcards";
import { categories, getCategoryByName } from "@/data/categories";
import { getCategoryStyle } from "@/data/categoryStyles";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import type { Rating } from "@/lib/spacedRepetition";

const RATING_BUTTONS: { rating: Rating; label: string; key: string }[] = [
  { rating: "again", label: "Again", key: "1" },
  { rating: "hard", label: "Hard", key: "2" },
  { rating: "good", label: "Good", key: "3" },
  { rating: "easy", label: "Easy", key: "4" },
];

type ViewMode = "daily" | "categories" | "study";

// Deterministic PRNG seeded by a number. Same seed → same sequence.
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pick N unique cards for the given date. Same date → same picks (everyone sees
// the same daily deck; refreshes at local midnight).
function pickDailyCards(
  cards: ConceptFlashcard[],
  dateStr: string,
  count: number
): ConceptFlashcard[] {
  const seed = dateStr
    .split("-")
    .reduce((acc, part) => acc * 100 + parseInt(part, 10), 0);
  const indices: number[] = [];
  const used = new Set<number>();
  let step = 0;
  while (indices.length < count && step < 1000) {
    const idx = Math.floor(seededRandom(seed + step) * cards.length);
    if (!used.has(idx)) {
      used.add(idx);
      indices.push(idx);
    }
    step++;
  }
  return indices.map((i) => cards[i]);
}

function todayLocalDateStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// The concise interview-recall answer. If a card has an explicit keyPoint use it;
// otherwise fall back to the first sentence of the full answer.
function getKeyPoint(card: ConceptFlashcard): string {
  if (card.keyPoint) return card.keyPoint;
  const match = card.answer.match(/^[^.!?]+[.!?]+/);
  return match ? match[0].trim() : card.answer;
}

// The full explanation shown behind the "Show full explanation" toggle. Only
// worth rendering if it adds context beyond the keyPoint.
function hasFullExplanation(card: ConceptFlashcard): boolean {
  if (card.keyPoint) return true; // there's always more in `answer` beyond an explicit keyPoint
  const keyPoint = getKeyPoint(card);
  return card.answer.length > keyPoint.length + 20;
}

function RevealedAnswer({ card }: { card: ConceptFlashcard }) {
  const [showFull, setShowFull] = useState(false);
  const keyPoint = getKeyPoint(card);
  const hasMore = hasFullExplanation(card);
  return (
    <div className="animate-fade-in">
      <p className="text-base leading-relaxed text-black dark:text-white">
        {keyPoint}
      </p>
      {hasMore && (
        <div className="mt-4">
          <button
            onClick={() => setShowFull((s) => !s)}
            className="inline-flex items-center gap-1 text-xs text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            {showFull ? "Hide full explanation" : "Show full explanation"}
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className={`transition-transform ${showFull ? "rotate-180" : ""}`}
            >
              <path d="M3 4.5l3 3 3-3" />
            </svg>
          </button>
          {showFull && (
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
              <ReactMarkdown
                components={{
                  h3: ({ children }) => (
                    <h3 className="mt-5 mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="ml-5 list-disc space-y-1.5 text-sm text-neutral-700 dark:text-neutral-200">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="ml-5 list-decimal space-y-1.5 text-sm text-neutral-700 dark:text-neutral-200">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-black dark:text-white">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-black/[0.06] px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/[0.10]">
                      {children}
                    </code>
                  ),
                }}
              >
                {card.answer}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CardModal({
  card,
  onClose,
}: {
  card: ConceptFlashcard;
  onClose: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const style = getCategoryStyle(card.category);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (!revealed && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setRevealed(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl border border-black/[0.10] bg-white p-8 dark:border-white/[0.20] dark:bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
        <p className="mb-2 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
          <span className={`font-mono text-xs ${style.text}`}>{card.category}</span>
        </p>
        <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          {card.term}
        </h3>
        <p className="mb-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
          {card.prompt}
        </p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-black"
          >
            Reveal <span className="opacity-60">(Space)</span>
          </button>
        ) : (
          <div className="border-t border-black/[0.06] pt-6 dark:border-white/[0.06]">
            <RevealedAnswer card={card} />
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryGrid({
  onSelect,
}: {
  onSelect: (categoryName: string) => void;
}) {
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of conceptFlashcards) {
      map.set(c.category, (map.get(c.category) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const style = getCategoryStyle(cat.name);
        const cardCount = counts.get(cat.name) ?? 0;
        const covered = cat.topics.filter((t) => t.covered).length;
        const total = cat.topics.length;
        const isStub = cat.status === "stub";
        return (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.name)}
            className="group flex flex-col border border-black/[0.10] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:border-white/[0.10] dark:hover:bg-white/[0.02]"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-sm ${style.dot}`} aria-hidden />
                <span className="font-medium text-black dark:text-white">
                  {cat.name}
                </span>
              </div>
              {isStub && (
                <span className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400">
                  stub
                </span>
              )}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {cat.description}
            </p>
            <div className="mt-auto flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <span>
                {covered}/{total} topics
              </span>
              <span>·</span>
              <span>
                {cardCount} card{cardCount === 1 ? "" : "s"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function SearchResults({
  query,
  onSelectCard,
  onSelectCategory,
}: {
  query: string;
  onSelectCard: (card: ConceptFlashcard) => void;
  onSelectCategory: (categoryName: string) => void;
}) {
  const q = query.trim().toLowerCase();

  const matchingCategories = useMemo(
    () =>
      categories.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.topics.some((t) => t.name.toLowerCase().includes(q))
      ),
    [q]
  );

  const matchingCards = useMemo(
    () =>
      conceptFlashcards.filter(
        (card) =>
          card.term.toLowerCase().includes(q) ||
          card.prompt.toLowerCase().includes(q) ||
          card.category.toLowerCase().includes(q) ||
          (card.keyPoint ?? "").toLowerCase().includes(q) ||
          card.answer.toLowerCase().includes(q)
      ),
    [q]
  );

  if (!q) return null;

  const totalHits = matchingCategories.length + matchingCards.length;

  return (
    <div>
      <p className="mb-6 text-xs text-neutral-500 dark:text-neutral-400">
        {totalHits === 0
          ? "No matches"
          : `${matchingCategories.length} categor${matchingCategories.length === 1 ? "y" : "ies"} · ${matchingCards.length} card${matchingCards.length === 1 ? "" : "s"}`}
      </p>

      {matchingCategories.length > 0 && (
        <section className="mb-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Categories
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matchingCategories.map((cat) => {
              const style = getCategoryStyle(cat.name);
              const cardCount = conceptFlashcards.filter(
                (c) => c.category === cat.name
              ).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onSelectCategory(cat.name)}
                  className="group flex flex-col border border-black/[0.10] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:border-white/[0.10] dark:hover:bg-white/[0.02]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-sm ${style.dot}`} aria-hidden />
                    <span className="text-sm font-medium text-black dark:text-white">
                      {cat.name}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {cat.description}
                  </p>
                  <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                    {cardCount} card{cardCount === 1 ? "" : "s"}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {matchingCards.length > 0 && (
        <section>
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Cards
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matchingCards.map((card) => {
              const style = getCategoryStyle(card.category);
              return (
                <button
                  key={card.id}
                  onClick={() => onSelectCard(card)}
                  className="group flex flex-col border border-black/[0.08] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:border-white/[0.08] dark:hover:bg-white/[0.02]"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
                    <span className={`font-mono text-[10px] ${style.text}`}>
                      {card.category}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-black dark:text-white">
                    {card.term}
                  </p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {card.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function CategoryDetail({
  categoryName,
  onBack,
  onSelectCard,
}: {
  categoryName: string;
  onBack: () => void;
  onSelectCard: (card: ConceptFlashcard) => void;
}) {
  const cat = getCategoryByName(categoryName);
  const style = getCategoryStyle(categoryName);
  const cards = conceptFlashcards.filter((c) => c.category === categoryName);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        ← All categories
      </button>

      <div className="mb-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-sm ${style.dot}`} aria-hidden />
        <span className={`font-mono text-xs ${style.text}`}>{categoryName}</span>
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-black dark:text-white">
        {cat?.name ?? categoryName}
      </h2>
      {cat && (
        <p className="mb-10 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {cat.description}
        </p>
      )}

      {cat && cat.topics.length > 0 && (
        <section className="mb-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Topic checklist
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {cat.topics.map((topic, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300"
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                    topic.covered
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-black/20 dark:border-white/20"
                  }`}
                  aria-hidden
                >
                  {topic.covered && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 5l2 2 4-5" />
                    </svg>
                  )}
                </span>
                <span
                  className={topic.covered ? "" : "text-neutral-400 dark:text-neutral-500"}
                >
                  {topic.name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Flashcards ({cards.length})
        </p>
        {cards.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No flashcards yet in this category. Coming soon.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => onSelectCard(card)}
                className="flex flex-col border border-black/[0.08] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:border-white/[0.08] dark:hover:bg-white/[0.02]"
              >
                <p className="mb-1 text-sm font-medium text-black dark:text-white">
                  {card.term}
                </p>
                <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {card.prompt}
                </p>
                {card.relatedScenarioSlug && (
                  <Link
                    href={`/learning/system-design/${card.relatedScenarioSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 text-xs text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    → walkthrough
                  </Link>
                )}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function DailyFiveMode() {
  const today = useMemo(() => todayLocalDateStr(), []);
  const dailyCards = useMemo(
    () => pickDailyCards(conceptFlashcards, today, 5),
    [today]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentCard = dailyCards[currentIndex];

  function goNext() {
    if (currentIndex < dailyCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  }

  useEffect(() => {
    if (completed) return;
    function onKey(e: KeyboardEvent) {
      if (!revealed) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setRevealed(true);
        }
      } else {
        if (e.key === "ArrowRight" || e.key === "Enter") {
          e.preventDefault();
          goNext();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, completed, currentIndex]);

  if (completed) {
    return (
      <div className="border border-black/[0.10] p-10 text-center dark:border-white/[0.10]">
        <p className="mb-2 text-lg font-medium text-black dark:text-white">
          Done for today.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          5 fresh cards land tomorrow at midnight.
        </p>
      </div>
    );
  }

  const style = getCategoryStyle(currentCard.category);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Card {currentIndex + 1} of {dailyCards.length} · {today}
        </p>
        <div className="flex gap-1">
          {dailyCards.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-6 rounded-full ${
                i < currentIndex
                  ? "bg-emerald-500"
                  : i === currentIndex
                    ? "bg-black dark:bg-white"
                    : "bg-black/10 dark:bg-white/10"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="border border-black/[0.10] p-6 dark:border-white/[0.10]">
        <p className="mb-2 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
          <span className={`font-mono text-xs ${style.text}`}>
            {currentCard.category}
          </span>
        </p>
        <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          {currentCard.term}
        </h3>
        <p className="mb-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
          {currentCard.prompt}
        </p>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-black"
          >
            Reveal <span className="opacity-60">(Space)</span>
          </button>
        ) : (
          <>
            <div className="mb-6 border-t border-black/[0.06] pt-6 dark:border-white/[0.06]">
              <RevealedAnswer card={currentCard} />
            </div>
            <button
              onClick={goNext}
              className="animate-fade-in rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-black"
            >
              {currentIndex < dailyCards.length - 1 ? "Next card" : "Finish"}{" "}
              <span className="opacity-60">(→)</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function StudyMode() {
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

  const CATEGORY_PILLS = useMemo(
    () => [
      "All",
      ...Array.from(new Set(conceptFlashcards.map((c) => c.category))),
    ],
    []
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORY_PILLS.map((cat) => {
          const isActive = cat === selectedCategory;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs transition-colors ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-black/[0.04] text-neutral-600 hover:bg-black/[0.08] dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:bg-white/[0.12]"
              }`}
            >
              {cat !== "All" && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${getCategoryStyle(cat).dot}`}
                  aria-hidden
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {!hydrated ? (
        <div className="h-64" />
      ) : !currentCard ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          All caught up, no cards due right now. Come back later.
        </p>
      ) : (
        <>
          <p className="mb-6 text-xs text-neutral-500 dark:text-neutral-400">
            {dueCount} card{dueCount === 1 ? "" : "s"} due
          </p>

          <div className="border border-black/[0.10] p-6 dark:border-white/[0.10]">
            <p className="mb-2 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${getCategoryStyle(currentCard.category).dot}`}
                aria-hidden
              />
              <span
                className={`font-mono text-xs ${getCategoryStyle(currentCard.category).text}`}
              >
                {currentCard.category}
              </span>
            </p>
            <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
              {currentCard.term}
            </h3>
            <p className="mb-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-200">
              {currentCard.prompt}
            </p>

            {!revealed ? (
              <button
                onClick={() => setRevealedCardId(currentCard.id)}
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-black"
              >
                Reveal <span className="opacity-60">(Space)</span>
              </button>
            ) : (
              <>
                <div className="mb-6 border-t border-black/[0.06] pt-6 dark:border-white/[0.06]">
                  <RevealedAnswer card={currentCard} />
                </div>
                <div className="animate-fade-in flex flex-wrap gap-3">
                  {RATING_BUTTONS.map((b) => (
                    <button
                      key={b.rating}
                      onClick={() => rate(b.rating)}
                      className="rounded-full border border-black/15 px-4 py-2 text-sm text-black transition-colors hover:border-black/35 dark:border-white/15 dark:text-white dark:hover:border-white/35"
                    >
                      {b.label}{" "}
                      <span className="text-neutral-400 dark:text-neutral-500">
                        ({b.key})
                      </span>
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

export default function FlashcardsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalCard, setModalCard] = useState<ConceptFlashcard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Learning · Flashcards
          </p>
          <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-300">
            Concept cards across systems, distributed, AI infra, and ML. Do the daily
            5, browse by category, or run a spaced-repetition study session.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setViewMode("daily");
                setSelectedCategory(null);
              }}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                viewMode === "daily"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-black/15 text-neutral-600 hover:border-black/35 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/35"
              }`}
            >
              Daily 5
            </button>
            <button
              onClick={() => {
                setViewMode("categories");
                setSelectedCategory(null);
              }}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                viewMode === "categories"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-black/15 text-neutral-600 hover:border-black/35 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/35"
              }`}
            >
              Browse by Category
            </button>
            <button
              onClick={() => setViewMode("study")}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                viewMode === "study"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border border-black/15 text-neutral-600 hover:border-black/35 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/35"
              }`}
            >
              Study Session (SM-2)
            </button>
          </div>

          {viewMode === "categories" && !selectedCategory && (
            <div className="mb-8 relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards, categories, or topics…"
                className="w-full border border-black/[0.10] bg-transparent py-3 pl-10 pr-4 text-sm text-black placeholder:text-neutral-500 focus:border-black/30 focus:outline-none dark:border-white/[0.10] dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-white/30"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
              >
                <circle cx="9" cy="9" r="6" />
                <path d="M13.5 13.5L17 17" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 3l8 8M11 3L3 11" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {viewMode === "daily" ? (
            <DailyFiveMode />
          ) : viewMode === "categories" ? (
            selectedCategory ? (
              <CategoryDetail
                categoryName={selectedCategory}
                onBack={() => setSelectedCategory(null)}
                onSelectCard={(c) => setModalCard(c)}
              />
            ) : searchQuery.trim() ? (
              <SearchResults
                query={searchQuery}
                onSelectCard={(c) => setModalCard(c)}
                onSelectCategory={(name) => {
                  setSelectedCategory(name);
                  setSearchQuery("");
                }}
              />
            ) : (
              <CategoryGrid onSelect={(name) => setSelectedCategory(name)} />
            )
          ) : (
            <StudyMode />
          )}
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

      {modalCard && (
        <CardModal card={modalCard} onClose={() => setModalCard(null)} />
      )}
    </div>
  );
}
