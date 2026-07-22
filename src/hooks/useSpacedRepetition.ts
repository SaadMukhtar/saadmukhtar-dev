"use client";

import { useEffect, useState } from "react";
import type { ConceptFlashcard } from "@/data/conceptFlashcards";
import {
  type CardProgress,
  type Rating,
  initialCardProgress,
  reviewCard,
  pickNextCard,
  countDue,
} from "@/lib/spacedRepetition";

const STORAGE_KEY = "sdl:flashcard-progress:v1";

export function useSpacedRepetition(cards: ConceptFlashcard[]) {
  const [progress, setProgress] = useState<Record<string, CardProgress>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      // corrupt localStorage, fall back to empty progress
    }
    setHydrated(true);
  }, []);

  const currentCard = hydrated ? pickNextCard(cards, progress) : null;
  const dueCount = hydrated ? countDue(cards, progress) : 0;

  function rate(rating: Rating) {
    if (!currentCard) return;
    const prior = progress[currentCard.id] ?? initialCardProgress(currentCard.id);
    const next = reviewCard(prior, rating);
    const nextProgress = { ...progress, [currentCard.id]: next };
    setProgress(nextProgress);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    } catch {
      // localStorage unavailable, progress stays in-memory for this session
    }
  }

  return { hydrated, currentCard, dueCount, rate };
}
