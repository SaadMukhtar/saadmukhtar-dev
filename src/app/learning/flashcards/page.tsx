"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

type ViewMode = "categories" | "study";

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
        <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
          {card.term}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
          {card.prompt}
        </p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-black"
          >
            Reveal <span className="opacity-60">(Space)</span>
          </button>
        ) : (
          <p className="animate-fade-in border-t border-black/[0.06] pt-6 text-sm leading-relaxed text-neutral-600 dark:border-white/[0.06] dark:text-neutral-300">
            {card.answer}
          </p>
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
          All caught up — no cards due right now. Come back later.
        </p>
      ) : (
        <>
          <p className="mb-6 text-xs text-neutral-500 dark:text-neutral-400">
            {dueCount} card{dueCount === 1 ? "" : "s"} due
          </p>

          <div className="border border-black/[0.10] p-6 dark:border-white/[0.10]">
            <p className="mb-1 flex items-center gap-1.5">
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
            <h3 className="mb-4 font-medium text-black dark:text-white">
              {currentCard.term}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {currentCard.prompt}
            </p>

            {!revealed ? (
              <button
                onClick={() => setRevealedCardId(currentCard.id)}
                className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-black"
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
  const [viewMode, setViewMode] = useState<ViewMode>("categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalCard, setModalCard] = useState<ConceptFlashcard | null>(null);

  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Learning · Flashcards
          </p>
          <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-300">
            Concept cards across systems, distributed, AI infra, and ML. Browse by
            category or run a spaced-repetition study session.
          </p>

          <div className="mb-10 flex items-center gap-2">
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

          {viewMode === "categories" ? (
            selectedCategory ? (
              <CategoryDetail
                categoryName={selectedCategory}
                onBack={() => setSelectedCategory(null)}
                onSelectCard={(c) => setModalCard(c)}
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
