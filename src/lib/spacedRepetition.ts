export type Rating = "again" | "hard" | "good" | "easy";

export type CardProgress = {
  cardId: string;
  repetitions: number;
  easinessFactor: number;
  intervalDays: number;
  dueAt: string;
};

const QUALITY_BY_RATING: Record<Rating, number> = {
  again: 2,
  hard: 3,
  good: 4,
  easy: 5,
};

export function initialCardProgress(cardId: string, now = new Date()): CardProgress {
  return {
    cardId,
    repetitions: 0,
    easinessFactor: 2.5,
    intervalDays: 0,
    dueAt: now.toISOString(),
  };
}

export function reviewCard(progress: CardProgress, rating: Rating, now = new Date()): CardProgress {
  const quality = QUALITY_BY_RATING[rating];
  const nextEF = Math.max(
    1.3,
    progress.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  let repetitions = progress.repetitions;
  let intervalDays: number;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(progress.intervalDays * nextEF);
  }

  const dueAt = new Date(now.getTime() + intervalDays * 86_400_000).toISOString();

  return {
    cardId: progress.cardId,
    repetitions,
    easinessFactor: nextEF,
    intervalDays,
    dueAt,
  };
}

export function pickNextCard<T extends { id: string }>(
  cards: T[],
  progressByCardId: Record<string, CardProgress>,
  now = new Date()
): T | null {
  const due = cards.filter((c) => {
    const p = progressByCardId[c.id];
    return !p || new Date(p.dueAt) <= now;
  });
  if (due.length === 0) return null;
  due.sort((a, b) =>
    (progressByCardId[a.id]?.dueAt ?? "").localeCompare(progressByCardId[b.id]?.dueAt ?? "")
  );
  return due[0];
}

export function countDue<T extends { id: string }>(
  cards: T[],
  progressByCardId: Record<string, CardProgress>,
  now = new Date()
): number {
  return cards.filter((c) => {
    const p = progressByCardId[c.id];
    return !p || new Date(p.dueAt) <= now;
  }).length;
}
