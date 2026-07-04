import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Writing — Saad Mukhtar",
  description: "Writing on distributed systems, infrastructure, and things I'm building.",
};

const posts = [
  {
    slug: "how-the-internet-finds-your-website",
    title: "How the Internet Found My Website",
    date: "July 4, 2026",
    description: "Bought a domain today. Here's everything that happened — DNS, Cloudflare, Vercel, and the confusing parts nobody explains.",
    readTime: "4 min",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-12 text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Writing
          </p>
          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-8 border-b border-black/[0.06] dark:border-white/[0.06] py-6 transition-colors first:border-t hover:bg-black/[0.02] dark:hover:bg-white/[0.02] px-1"
              >
                <div>
                  <h2 className="mb-1 font-medium text-black dark:text-white group-hover:underline underline-offset-4">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-500">
                    {post.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">{post.date}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">{post.readTime} read</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Built with Next.js · Tailwind</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">© {new Date().getFullYear()} Saad Mukhtar</p>
        </div>
      </footer>
    </div>
  );
}
