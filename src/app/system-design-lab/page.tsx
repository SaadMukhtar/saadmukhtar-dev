import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SystemDesignLab } from "@/components/system-design-lab/SystemDesignLab";

export const metadata: Metadata = {
  title: "System Design Lab — Saad Mukhtar",
  description:
    "A self-quiz tool for system design interview prep — estimation drills, spaced-repetition flashcards, and design scenarios.",
};

export default function SystemDesignLabPage() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            System Design Lab
          </p>
          <p className="mb-12 text-sm text-neutral-600 dark:text-neutral-300">
            A practice tool I built and use for my own interview prep.
          </p>
          <SystemDesignLab />
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
    </div>
  );
}
