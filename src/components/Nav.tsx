"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavLink = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
};

const links: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  {
    label: "Learning",
    dropdown: [
      { label: "System Design", href: "/learning/system-design" },
      { label: "DSA Patterns", href: "/learning/dsa-patterns" },
      { label: "Flashcards", href: "/learning/flashcards" },
    ],
  },
  { label: "GitHub", href: "https://github.com/saadmukhtar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/saad-mukhtar" },
  { label: "Email", href: "mailto:saadmukhtar01@gmail.com" },
];

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto");
}

function LearningDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: { label: string; href: string }[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive =
    items.some((i) => pathname.startsWith(i.href)) || pathname.startsWith("/learning");

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (!open) return;
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={`group relative flex items-center gap-1 whitespace-nowrap text-sm transition-colors hover:text-black dark:hover:text-white ${
          isActive
            ? "text-black dark:text-white"
            : "text-neutral-500 dark:text-neutral-400"
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 4.5l3 3 3-3" />
        </svg>
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-black dark:bg-white transition-all duration-300 ${
            isActive ? "w-[calc(100%-14px)]" : "w-0 group-hover:w-[calc(100%-14px)]"
          }`}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 pt-2">
          <div
            className="min-w-[180px] border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-black shadow-lg"
            role="menu"
          >
            {items.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                    active
                      ? "text-black dark:text-white"
                      : "text-neutral-600 dark:text-neutral-300"
                  }`}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  if (!open) return null;
  return (
    <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto max-w-4xl px-6 py-3">
        {links.map((link) => {
          if (link.dropdown) {
            return (
              <div key={link.label} className="py-2">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  {link.label}
                </p>
                {link.dropdown.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`block py-2 text-base transition-colors hover:text-black dark:hover:text-white ${
                        active
                          ? "text-black dark:text-white"
                          : "text-neutral-600 dark:text-neutral-300"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            );
          }
          const href = link.href!;
          const external = isExternalHref(href);
          const active = !external && pathname.startsWith(href);
          return (
            <a
              key={link.label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={onClose}
              className={`block py-2.5 text-base transition-colors hover:text-black dark:hover:text-white ${
                active
                  ? "text-black dark:text-white"
                  : "text-neutral-600 dark:text-neutral-300"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-sm font-semibold tracking-tight text-black dark:text-white hover:opacity-70 transition-opacity"
          >
            SM
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              if (link.dropdown) {
                return (
                  <LearningDropdown
                    key={link.label}
                    label={link.label}
                    items={link.dropdown}
                    pathname={pathname}
                  />
                );
              }
              const href = link.href!;
              const external = isExternalHref(href);
              const active = !external && pathname.startsWith(href);
              return (
                <a
                  key={link.label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`group relative whitespace-nowrap text-sm transition-colors hover:text-black dark:hover:text-white ${
                    active
                      ? "text-black dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-black dark:bg-white transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-8 w-8 items-center justify-center text-neutral-600 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              {mobileOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 4l10 10M14 4L4 14" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M2 5h14M2 9h14M2 13h14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </nav>
  );
}
