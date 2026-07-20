import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "How the Internet Found My Website · Saad Mukhtar",
  description: "Bought a domain today. DNS, Cloudflare, Vercel: here's what actually happened.",
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
            <span>4 min read</span>
          </div>

          <div className="space-y-10 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">

            {/* Hook */}
            <p>
              Bought <C>saadmukhtar.dev</C> today. Goal: get it pointing at my Vercel site.
              Took about 20 minutes once I understood what was actually happening. Here&apos;s how it works.
            </p>

            {/* Background */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Background</h2>
              <p><B>DNS</B>: the phonebook of the internet. Translates domain names (<C>saadmukhtar.dev</C>) to IP addresses (<C>76.76.21.21</C>). Every browser request starts with a DNS lookup.</p>
              <p><B>A record</B>: maps a domain directly to an IP address.</p>
              <p><B>CNAME record</B>: maps a domain to another domain. More flexible; if Vercel&apos;s IP changes, the CNAME still resolves correctly.</p>
              <p><B>CNAME flattening</B>: Cloudflare&apos;s trick for using CNAMEs on root domains (the DNS spec doesn&apos;t normally allow this).</p>
              <p><B>CDN</B>: a network of servers distributed close to users. Vercel runs one. Cloudflare runs one too.</p>
            </div>

            {/* What I did */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">What I did</h2>
              <ol className="space-y-2 list-none">
                <li><B>1.</B>{" "}Bought <C>saadmukhtar.dev</C> on Cloudflare Registrar</li>
                <li><B>2.</B>{" "}Added the domain in Vercel (Settings → Domains → apex only)</li>
                <li><B>3.</B>{" "}Copied Vercel&apos;s two CNAME values</li>
                <li><B>4.</B>{" "}Added both in Cloudflare DNS with proxy <B>off</B>{" "}(grey cloud, not orange)</li>
                <li><B>5.</B>{" "}Waited ~15 min for DNS propagation</li>
              </ol>
              <p>That&apos;s the whole thing.</p>
            </div>

            {/* Result */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black dark:text-white">Result</h2>
              <p>
                <C>saadmukhtar.dev</C> is live. Apex and www both resolve. SSL handled automatically by Vercel.
                No extra config beyond what&apos;s above.
              </p>
            </div>

            {/* Deep dive */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">Deep dive: the confusing parts</h2>

              <p>
                <B>Why two CNAME records?</B>{" "}One for the apex (<C>@</C>), one for <C>www</C>.
                They&apos;re technically different addresses; most people treat them as the same thing but DNS doesn&apos;t.
                Add only the apex in Vercel; it auto-redirects www → apex with a 308.
              </p>

              <p>
                <B>Why proxy off?</B>{" "}Cloudflare&apos;s orange cloud routes traffic through their network,
                which creates SSL conflicts with Vercel&apos;s own CDN. Grey cloud always for Vercel-hosted sites.
              </p>

              <p>
                <B>CNAME on a root domain?</B>{" "}The DNS spec says only A records (IPs) are allowed on an apex;
                CNAMEs are for subdomains. Cloudflare works around this by resolving the CNAME chain down to an IP
                automatically before responding. That&apos;s CNAME flattening.
              </p>

              <Block>{`@ (apex)   CNAME  →  4cca535debee29c0.vercel-dns-017.com
www        CNAME  →  4cca535debee29c0.vercel-dns-017.com`}</Block>

              <p>
                <B>&ldquo;Invalid Configuration&rdquo; in Vercel?</B>{" "}Not broken.
                That&apos;s Vercel waiting to confirm the DNS records exist. On Cloudflare it usually clears in 5–30 min.
                Refresh and it turns green.
              </p>

              <p><B>What actually happens end-to-end:</B></p>
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
