import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "How I Write · Saad Mukhtar",
  description: "The template I use for every blog post, and why each section exists.",
};

const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">
    {children}
  </code>
);

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-black dark:text-white">{children}</strong>
);

export default function Post() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-2xl px-6">
        <article className="pb-32 pt-48">

          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 transition-colors hover:text-black dark:hover:text-white"
          >
            ← Writing
          </Link>

          <h1 className="mt-8 mb-4 text-4xl font-semibold tracking-tight text-black dark:text-white">
            How I Write
          </h1>
          <div className="mb-16 flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span>July 5, 2026</span>
            <span>·</span>
            <span>3 min read</span>
          </div>

          <div className="space-y-10 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">

            {/* Hook */}
            <p>
              I wanted every post to do two things: force me to think clearly about what I actually did,
              and let readers get value in 30 seconds without reading the whole thing.
              Here&apos;s the format I use for every post, and why each section exists.
            </p>

            {/* Background */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Background</h2>
              <p>
                <B>Structure forces clarity.</B>{" "}Writing with a fixed template separates "what happened"
                from "what I learned," the same discipline you need to explain a system design decision
                in an interview without rambling.
              </p>
              <p>
                <B>Most technical writing buries the point.</B>{" "}Long preamble, then the good stuff.
                A template forces the actionable content early, so a reader who bails after 30 seconds
                still got something.
              </p>
              <p>
                <B>Passive interview prep.</B>{" "}Every section maps to something you&apos;d say in a technical interview.
                Background = explaining concepts to an interviewer. What I Did = describing your approach.
                Deep Dive = showing depth when pushed.
              </p>
            </div>

            {/* What I did */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What I did</h2>
              <p>Defined 5 fixed sections. Every post follows them in order.</p>
              <ol className="space-y-3 list-none">
                <li>
                  <B>1. Hook</B>: one journal sentence. What I was trying to do.
                  Goal + &ldquo;here&apos;s how.&rdquo; No preamble.
                </li>
                <li>
                  <B>2. Background</B>: the CS concepts or buzzwords you need to understand the post.
                  Each defined in one sentence. Skippable if you already know them.
                </li>
                <li>
                  <B>3. What I did</B>: numbered steps. One sentence each.
                  Reads like answering an interview question: &ldquo;Walk me through your approach.&rdquo;
                </li>
                <li>
                  <B>4. Result</B>: what happened. Numbers if there are any. Short.
                </li>
                <li>
                  <B>5. Deep dive</B>: where it got messy. What broke. What I actually learned.
                  The full story for readers who want it.
                </li>
              </ol>
            </div>

            {/* Result */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Result</h2>
              <p>
                Every post has predictable structure. Readers know where to skim.
                I write faster because I&apos;m not making structural decisions each time,
                just filling in sections I already know.
              </p>
            </div>

            {/* Deep dive */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">Deep dive: why each section exists</h2>

              <p>
                <B>Hook is a journal entry, not an intro paragraph.</B>{" "}The point is to log the real moment:
                &ldquo;I was trying to do X.&rdquo; Not &ldquo;In this post I will explain X.&rdquo;
                One is a person, the other is a textbook.
              </p>

              <p>
                <B>Background exists for the reader who&apos;s one level behind.</B>{" "}If you already know DNS,
                skip it. If you don&apos;t, you&apos;re not lost by line three. It also forces me to define
                things precisely, which is where I usually discover I didn&apos;t fully understand something.
              </p>

              <p>
                <B>What I did is the skimmable core.</B>{" "}Numbered, one sentence per step.
                If someone reads nothing else, they leave with the procedure.
                This is also the section closest to how you&apos;d answer
                &ldquo;walk me through what you built&rdquo; in an interview.
              </p>

              <p>
                <B>Result is a forcing function for honesty.</B>{" "}It has to be specific.
                &ldquo;It worked&rdquo; is not a result. &ldquo;Site was live in 20 min, SSL handled automatically&rdquo; is.
                If you can&apos;t write a concrete result, you probably don&apos;t understand the outcome yet.
              </p>

              <p>
                <B>Deep dive is where the real learning lives.</B>{" "}The confusing parts, the things that
                broke, the mental model shifts. Most people only write this section. I put it last so
                it doesn&apos;t scare off the reader who just wanted the steps.
              </p>

              <p>
                The sections also have a length contract: Hook is one sentence.
                Background is one sentence per concept. Steps are one sentence each.
                Result is two sentences max. Deep dive is the only section with no limit,
                but every paragraph has to earn its place with a <C>bold question</C> that anchors it.
              </p>
            </div>

          </div>
        </article>
      </main>
      <footer className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Built with Next.js · Tailwind</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">© {new Date().getFullYear()} Saad Mukhtar</p>
        </div>
      </footer>
    </div>
  );
}
