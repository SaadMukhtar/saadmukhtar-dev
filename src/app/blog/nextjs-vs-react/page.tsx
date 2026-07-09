import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Next.js vs React — Saad Mukhtar",
  description: "Built this site with Next.js for the first time. Here's what's actually different from plain React — and what an interviewer would ask.",
};

const C = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">
    {children}
  </code>
);

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-black dark:text-white">{children}</strong>
);

const Block = ({ children }: { children: React.ReactNode }) => (
  <pre className="rounded bg-black/[0.04] dark:bg-white/[0.06] p-4 font-mono text-sm overflow-x-auto">
    <code>{children}</code>
  </pre>
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
            Next.js vs React — First Time Using It
          </h1>
          <div className="mb-16 flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span>July 5, 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>

          <div className="space-y-10 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">

            {/* Hook */}
            <p>
              Built this site with Next.js — my first time using it after years of plain React.
              Goal: understand what Next.js actually adds and why you&apos;d choose it.
              Here&apos;s what I learned and what I&apos;d say if an interviewer asked.
            </p>

            {/* Background */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Background</h2>
              <p><B>React</B>{" "}— a UI library. Renders components in the browser. Gives you components and state management. Nothing else.</p>
              <p><B>Next.js</B>{" "}— a framework built on top of React. Adds routing, server rendering, image optimization, and font loading out of the box.</p>
              <p><B>&ldquo;The server&rdquo; (in Next.js context)</B>{" "}— a real computer running Node.js that executes your React code <em>before</em> the browser sees it. When you deploy to Vercel, that server is Vercel&apos;s infrastructure (specifically serverless functions that spin up on demand for each request). Locally during <C>npm run dev</C>, it&apos;s Node.js on your laptop. In plain React, there is no such server for your app code — the browser is the only thing running React.</p>
              <p><B>CSR (Client-Side Rendering)</B>{" "}— the browser downloads a nearly-empty HTML shell and a JS bundle, then builds the page entirely in JavaScript. What plain React does by default. No server logic runs after the initial files are served.</p>
              <p><B>SSR (Server-Side Rendering)</B>{" "}— the server runs your React code on each request and sends the finished HTML to the browser. User sees real content instantly instead of a blank page. Better SEO because crawlers see real HTML.</p>
              <p><B>SSG (Static Site Generation)</B>{" "}— HTML generated <em>once</em> when you build the app, then served as a plain file from a CDN. Fastest possible — no server logic runs at request time.</p>
              <p><B>Server Components</B>{" "}— React components that run only on the server (Vercel&apos;s infrastructure or your Node.js host) and never in the browser. Their JavaScript code is <em>never sent to the user</em>. The browser only receives the HTML they produced. Default in the Next.js App Router.</p>
              <p><B>Hydration</B>{" "}— after the server sends HTML, React runs in the browser and attaches event listeners so the page becomes interactive. Less JS shipped means faster hydration.</p>
              <p><B>App Router</B>{" "}— Next.js 13+ routing system. Every folder in <C>app/</C> is a route. Every component is a server component unless you opt out.</p>
            </div>

            {/* What I did */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What I did</h2>
              <ol className="space-y-2 list-none">
                <li><B>1.</B>{" "}Used the App Router (not the older Pages Router)</li>
                <li><B>2.</B>{" "}Kept every component as a server component by default</li>
                <li><B>3.</B>{" "}Only added <C>&quot;use client&quot;</C> where the browser was actually needed — nav (active route detection), theme toggle (state)</li>
                <li><B>4.</B>{" "}Used file-based routing: <C>app/blog/page.tsx</C> → <C>/blog</C>, no config</li>
                <li><B>5.</B>{" "}Used <C>next/image</C> for the headshot — automatic resizing and lazy loading</li>
                <li><B>6.</B>{" "}Used <C>next/font</C> for Geist — zero layout shift, font is inlined at build time</li>
              </ol>
            </div>

            {/* Result */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Result</h2>
              <p>
                The site ships minimal JS because most components never reach the browser.
                Routing, image optimization, and fonts required zero config.
                In plain React I would have needed React Router, a bundler config, and manual image handling to get the same result.
              </p>
            </div>

            {/* Deep dive */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">Deep dive</h2>

              <p>
                <B>What&apos;s the difference between Next.js and React?</B>{" "}React is a library —
                it does one thing (UI components) and leaves everything else to you.
                Next.js is a framework with opinions: it decides your routing, rendering strategy,
                and build pipeline. You trade control for speed of setup.
              </p>

              <p>
                <B>What are server components and why do they matter?</B>{" "}Server components run on the server (Vercel&apos;s infrastructure in this project&apos;s case) and their JavaScript code is never sent to the browser.
                The browser only receives the finished HTML, so there&apos;s less JS to download, parse, and execute on the client.
                The tradeoff: they can&apos;t use <C>useState</C>, <C>useEffect</C>, or browser APIs like <C>window</C> or <C>localStorage</C>.
                If you need those, add <C>&quot;use client&quot;</C> at the top of the file to opt that component into running in the browser.
              </p>

              <p>
                <B>When do you use <C>&quot;use client&quot;</C>?</B>{" "}Only when you actually need the browser:
                event handlers, hooks, <C>localStorage</C>, <C>window</C>.
                Not just because it&apos;s easier. Every <C>&quot;use client&quot;</C> is JS you&apos;re shipping to the user —
                it should earn its place.
              </p>

              <p>
                <B>What is hydration?</B>{" "}The server sends pre-rendered HTML so the page appears instantly.
                Then React runs in the browser and &quot;hydrates&quot; it — attaches event listeners and takes over rendering.
                With server components, less code is sent to the browser, so hydration is faster.
              </p>

              <p>
                <B>App Router vs Pages Router?</B>{" "}Pages Router is the old system — every file in <C>pages/</C> is a route, all components are client-side by default.
                App Router is the new system — files in <C>app/</C>, server components by default, nested layouts via <C>layout.tsx</C>.
                New projects should use App Router. Pages Router still works but isn&apos;t where Next.js is heading.
              </p>

              <p><B>The folder structure that matters:</B></p>
              <Block>{`app/
  layout.tsx     ← wraps every page (nav, fonts, providers)
  page.tsx       ← the / route
  blog/
    page.tsx     ← the /blog route
    [slug]/
      page.tsx   ← /blog/any-post-slug`}</Block>

              <p>
                <B>What are you actually giving up by picking Next.js?</B>{" "}Framework lock-in. Server infrastructure that has to exist somewhere.
                The mental overhead of server vs client, hydration boundaries, and <C>&quot;use client&quot;</C>. You can&apos;t just deploy static files
                to any CDN anymore. For a content site with SEO needs and a normal deploy target, that&apos;s a fine trade.
                For a highly interactive SPA where SEO doesn&apos;t matter, plain React (or Vite + React) is simpler and you avoid all of it.
              </p>

              <p>
                So: Next.js if you need routing, SSR, and optimizations for free. Plain React if you want control and don&apos;t need any of that.
                The rest — server components, hydration, <C>&quot;use client&quot;</C> — all falls out of that first decision.
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
