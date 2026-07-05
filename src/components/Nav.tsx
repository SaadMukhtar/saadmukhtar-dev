"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Writing", href: "/blog" },
  { label: "GitHub", href: "https://github.com/saadmukhtar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/saad-mukhtar" },
  { label: "Email", href: "mailto:saadmukhtar01@gmail.com" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-black dark:text-white hover:opacity-70 transition-opacity">SM</Link>
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto");
            const isActive = !isExternal && pathname.startsWith(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`group relative text-sm transition-colors hover:text-black dark:hover:text-white ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-black dark:bg-white transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
