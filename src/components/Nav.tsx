"use client";

import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Writing", href: "/blog" },
  { label: "GitHub", href: "https://github.com/saadmukhtar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/saad-mukhtar" },
  { label: "Email", href: "mailto:saadmukhtar01@gmail.com" },
];

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <span className="font-mono text-sm font-semibold tracking-tight text-black dark:text-white">SM</span>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative text-sm text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
