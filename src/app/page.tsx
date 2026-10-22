import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { projects } from "@/data/projects";

function boldify(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-black dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export const metadata: Metadata = {
  title: "Saad Mukhtar",
  description: "Software Engineer: distributed systems, observability, infrastructure",
};

const featuredProjects = projects.filter((p) => p.featured);

type ExperienceEntry = {
  company: string;
  subtitle?: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  bullets: string[];
};

const experience: ExperienceEntry[] = [
  {
    company: "Capital One Software",
    subtitle: "Developer Infrastructure",
    role: "Software Engineer",
    period: "Aug 2025–Present",
    location: "San Francisco, CA",
    current: true,
    bullets: [
      "Engineered a **20x** API latency reduction (11s → 500ms) on a **4.9B-row** ClickHouse cluster via table partitioning, parallel query execution in Go, materialized columns, and hash-based GROUP BY.",
      "Diagnosed a **92.5%** billing undercounting defect from incorrect OpenTelemetry metric aggregation; redesigned ClickHouse GROUP BY across all OTel identity dimensions (name, attributes, resource attributes, instrumentation scope), recovering **$1M+** in enterprise contract billing.",
    ],
  },
  {
    company: "Tesla",
    role: "Software Engineer Intern",
    period: "Jan–Apr 2024",
    location: "Palo Alto, CA",
    current: false,
    bullets: [
      "Extended Tesla's Fused OTA test suite with production signing validation for ECU binary files across all platforms, preventing unsigned firmware releases that could cause Vehicle Off Road (VOR) events across **1M+** updates per release.",
      "Built a cross-platform Canbase link layer backend (TCAN, UDP CAN, MAC-CAN) enabling Mac-native ECU access, eliminating the Windows VM dependency for firmware and manufacturing engineering teams.",
    ],
  },
  {
    company: "Super.com",
    role: "Software Engineer Intern",
    period: "May–Aug 2023",
    location: "Remote",
    current: false,
    bullets: [
      "Built Super+ (Super.com's flagship membership) across Flask/PostgreSQL and React with Braintree webhook idempotent reconciliation and LaunchDarkly feature-flagged rollouts; now driving ~**$180M ARR** across **950K+** members.",
      "Built fraud detection observability from scratch using DataDog; instrumented the Flask microservice with structured logs, metrics, and alerting, cutting time-to-detect for fraud events from **30+ min to near real-time**.",
    ],
  },
  {
    company: "PlayStation",
    role: "Software Developer Intern",
    period: "Jan–Apr 2022 · Sep–Dec 2022",
    location: "Remote",
    current: false,
    bullets: [
      "Designed and built a now-patented PS5 calendar feature in React Native; expanded Python test automation on PS4 to catch **16+** critical bugs before they shipped to a **40M+** user platform.",
      "Shipped tier-based subscription UI across PS5 (React Native) and PS4 (Vanilla JS) for the PS Plus redesign; coordinated with backend and design teams on API contracts and content flows, part of a launch generating **$600M+** annual revenue.",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />

      <main className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Hero */}
        <section className="pb-8 pt-24">
          <div className="animate-fade-up flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Image
              src="/pfp.png"
              alt="Saad Mukhtar"
              width={80}
              height={80}
              className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
                  Saad Mukhtar
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] px-2.5 py-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Open to new roles
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
                Software Engineer · Distributed Systems · Infrastructure
              </p>
            </div>
            <a
              href="mailto:saadmukhtar01@gmail.com"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black transition-opacity hover:opacity-75"
            >
              Get in Touch →
            </a>
          </div>
        </section>

        <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Experience */}
        <section className="py-8">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Work
          </p>
          <div className="space-y-5">
            {experience.map((job, i) => (
              <div key={`${job.company}-${i}`}>
                <div className="mb-1.5 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    {job.current && (
                      <span className="h-1.5 w-1.5 shrink-0 self-center animate-pulse rounded-full bg-emerald-500" />
                    )}
                    <span className="font-medium text-black dark:text-white">{job.company}</span>
                    {job.subtitle && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">· {job.subtitle}</span>
                    )}
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">— {job.role}</span>
                  </div>
                  <p className="shrink-0 text-xs text-neutral-500 sm:text-right dark:text-neutral-400">
                    {job.period} · {job.location}
                  </p>
                </div>
                <ul className="space-y-1 border-l border-black/[0.06] pl-4 dark:border-white/[0.06]">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {boldify(bullet)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Projects */}
        <section id="projects" className="py-8">
          <div className="mb-5 flex items-baseline justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Building
            </p>
            <Link
              href="/projects"
              className="text-sm text-neutral-600 dark:text-neutral-300 transition-colors hover:text-black dark:hover:text-white"
            >
              See all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="space-y-3">
            {featuredProjects.map((project) => (
              <div
                key={project.name}
                className="border border-black/[0.10] dark:border-white/[0.10] p-4"
              >
                <div className="mb-1 flex items-start justify-between gap-4">
                  <h3 className="font-medium text-black dark:text-white">
                    {project.name}
                    <span className="ml-2 font-mono text-xs font-normal text-neutral-500">{project.niche}</span>
                  </h3>
                  {project.status === "building" ? (
                    <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      building
                    </span>
                  ) : (
                    <span className="mt-0.5 shrink-0 text-xs text-black/20 dark:text-white/20">
                      planned
                    </span>
                  )}
                </div>
                <p className="mb-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Education + Stack */}
        <section className="grid gap-6 py-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Education
            </p>
            <span className="font-medium text-black dark:text-white">University of Waterloo</span>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">BCS Computer Science · 2020–2025</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Stack
            </p>
            <p className="font-mono text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Go · Python · TypeScript · Kafka · ClickHouse · OpenTelemetry · Kubernetes · AWS
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
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
