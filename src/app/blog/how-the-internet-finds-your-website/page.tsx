import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "How the Internet Found My Website — Saad Mukhtar",
  description: "Bought a domain today. Here's everything that happened — DNS, Cloudflare, Vercel, and the confusing parts nobody explains.",
};

export default function Post() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-2xl px-6">
        <article className="pb-32 pt-48">

          {/* Header */}
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
            <span>4 min read</span>
          </div>

          {/* Body */}
          <div className="space-y-8 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">

            <p>
              I bought <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">saadmukhtar.dev</code> today.
              Ten minutes later the site was live. Here&apos;s everything that happened — including the confusing parts nobody explains.
            </p>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">The phonebook nobody talks about</h2>
              <p>
                Computers don&apos;t know what <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">saadmukhtar.dev</code> means.
                They speak IPs — <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">76.76.21.21</code>.
                DNS is the phonebook that translates between the two. Every time you type a URL, a lookup happens in milliseconds before the page even starts loading.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">The types of records</h2>
              <p>
                <strong className="text-black dark:text-white">A record</strong> — maps a domain directly to an IP address.
              </p>
              <pre className="rounded bg-black/[0.04] dark:bg-white/[0.06] p-4 font-mono text-sm overflow-x-auto">
                <code>saadmukhtar.dev → 76.76.21.21</code>
              </pre>
              <p>
                <strong className="text-black dark:text-white">CNAME record</strong> — maps a domain to another domain instead of an IP. More flexible — if the destination IP changes, the CNAME still resolves correctly.
              </p>
              <pre className="rounded bg-black/[0.04] dark:bg-white/[0.06] p-4 font-mono text-sm overflow-x-auto">
                <code>www.saadmukhtar.dev → 4cca535debee29c0.vercel-dns-017.com</code>
              </pre>
              <p>
                Vercel now uses CNAMEs for both apex and www — including the root domain (<code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">@</code>).
                This works because Cloudflare supports <strong className="text-black dark:text-white">CNAME flattening</strong>: it resolves the chain down to an IP automatically,
                even for apex domains where CNAMEs technically aren&apos;t allowed in standard DNS.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What Cloudflare is</h2>
              <p>
                Cloudflare is a DNS registrar and CDN. When you buy a domain through them, they manage the phonebook.
                You add records through their dashboard — they tell the rest of the internet where your domain points.
              </p>
              <p>
                Cloudflare also has a <strong className="text-black dark:text-white">proxy</strong> feature (the orange cloud icon).
                When enabled, traffic flows through Cloudflare&apos;s network before reaching your server — adding DDoS protection, caching, and analytics.
                When disabled (grey cloud), DNS resolves directly to the destination.
              </p>
              <p>
                For Vercel: <strong className="text-black dark:text-white">keep proxy off.</strong> Vercel runs its own CDN and edge network.
                Turning Cloudflare&apos;s proxy on creates SSL conflicts and routing issues. Grey cloud, always.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What Vercel is</h2>
              <p>
                Vercel hosts your site. Your files live on their servers, distributed across their global edge network.
                When you add a custom domain inside Vercel&apos;s dashboard, you&apos;re telling it: <em>when a request arrives for this domain, serve my project.</em>
              </p>
              <p>
                DNS points traffic to Vercel. Vercel knows what to do when it arrives. Both sides need to be configured — that&apos;s the part most people miss.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Apex vs www — what Vercel actually asks you</h2>
              <p>
                <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">saadmukhtar.dev</code> is the <strong className="text-black dark:text-white">apex domain</strong> — the root.
                <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm"> www.saadmukhtar.dev</code> is a subdomain. They&apos;re different addresses that most people treat as the same thing.
              </p>
              <p>
                When you add both to Vercel, it flags an overlap and asks which is primary. Pick the apex — it&apos;s shorter, cleaner, and nobody types <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">www</code> anymore.
                Vercel automatically redirects <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">www</code> → apex with a 308 permanent redirect.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">How to connect them</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Buy your domain on Cloudflare Registrar</li>
                <li>In Vercel → Settings → Domains → add your apex domain only</li>
                <li>Vercel gives you CNAME records — one for <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">@</code> (apex), one for <code className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">www</code></li>
                <li>Add both in Cloudflare DNS with proxy <strong className="text-black dark:text-white">disabled</strong> (grey cloud)</li>
                <li>Wait 5–30 minutes</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">&ldquo;Invalid Configuration&rdquo; — don&apos;t panic</h2>
              <p>
                Vercel shows this immediately after you add the records. It doesn&apos;t mean something is broken —
                it means Vercel is waiting to verify that the DNS records have propagated across the internet.
                On Cloudflare this usually takes 5–30 minutes. Refresh and it turns green.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What actually happens when someone visits</h2>
              <pre className="rounded bg-black/[0.04] dark:bg-white/[0.06] p-4 font-mono text-sm overflow-x-auto">
                <code>{`Browser: what IP is saadmukhtar.dev?
Cloudflare DNS: resolves CNAME → Vercel's IP
Browser hits Vercel, Host: saadmukhtar.dev
Vercel: I know that domain → serves your site
Page loads`}</code>
              </pre>
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
