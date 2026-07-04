import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "How the Internet Found My Website — Saad Mukhtar",
  description: "Bought a domain today. DNS, Cloudflare, Vercel — here's what actually happened.",
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
            className="mb-12 inline-flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
          >
            ← Writing
          </Link>

          <h1 className="mt-8 mb-4 text-4xl font-semibold tracking-tight text-black dark:text-white">
            How the Internet Found My Website
          </h1>
          <div className="mb-16 flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
            <span>July 4, 2026</span>
            <span>·</span>
            <span>3 min read</span>
          </div>

          <div className="space-y-10 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">

            <p>
              Bought <C>saadmukhtar.dev</C> today. Here&apos;s what I learned setting it up.
            </p>

            {/* Short version */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">The short version</h2>
              <p>
                Your computer speaks IPs, not domain names. DNS is the phonebook that translates between the two.
                Setting up a custom domain is just updating the phonebook to point at your server.
              </p>
              <p>That&apos;s it. Everything below is detail.</p>
            </div>

            {/* Two records */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Two records. That&apos;s all.</h2>
              <p>Vercel needs two DNS records added in Cloudflare:</p>
              <Block>{`@ (apex)   CNAME  →  4cca535debee29c0.vercel-dns-017.com
www        CNAME  →  4cca535debee29c0.vercel-dns-017.com`}</Block>
              <p>
                <B>Proxy: off.</B>{" "}Grey cloud in Cloudflare, not orange. Vercel has its own CDN —
                Cloudflare&apos;s proxy creates SSL conflicts. Always grey.
              </p>
            </div>

            {/* Cloudflare vs Vercel */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Cloudflare vs Vercel — two different jobs</h2>
              <p><B>Cloudflare</B>{" "}manages the phonebook. Buy the domain there, add the DNS records, done.</p>
              <p><B>Vercel</B>{" "}hosts your site. You also need to add the domain inside Vercel&apos;s dashboard — that&apos;s how it knows which project to serve when traffic arrives.</p>
              <p>Both sides. Most people miss the Vercel side.</p>
            </div>

            {/* Apex vs www */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Apex vs www</h2>
              <p><C>saadmukhtar.dev</C> is the apex — the root domain.</p>
              <p><C>www.saadmukhtar.dev</C> is technically a subdomain. Different address.</p>
              <p>
                Add only the apex in Vercel. It automatically redirects{" "}<C>www</C> → apex with a 308.
                Nobody types <C>www</C> anymore anyway.
              </p>
            </div>

            {/* CNAME flattening */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">CNAME on a root domain?</h2>
              <p>Normally only A records (IP addresses) are allowed on an apex domain. CNAMEs are for subdomains.</p>
              <p>
                Cloudflare gets around this with <B>CNAME flattening</B> — it resolves the CNAME chain
                down to an IP automatically. So you get the flexibility of a CNAME without breaking DNS rules.
              </p>
            </div>

            {/* Invalid config */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">&ldquo;Invalid Configuration&rdquo; — don&apos;t panic</h2>
              <p>Vercel shows this the second you add the domain. It doesn&apos;t mean something is broken.</p>
              <p>It means DNS hasn&apos;t propagated yet. On Cloudflare: usually 5–30 min. Refresh. It turns green.</p>
            </div>

            {/* What happens */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What&apos;s actually happening</h2>
              <Block>{`You type saadmukhtar.dev
    ↓
DNS lookup → Cloudflare returns Vercel's IP
    ↓
Browser hits Vercel, Host: saadmukhtar.dev
    ↓
Vercel: I know that domain → your site loads`}</Block>
            </div>

          </div>
        </article>
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
