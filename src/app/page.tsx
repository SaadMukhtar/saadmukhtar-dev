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
  description: "Software Engineer — distributed systems, observability, infrastructure",
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
        <section className="relative pb-32 pt-48">
          {/* Radial glow behind hero */}
          <div className="pointer-events-none absolute -top-16 left-0 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl dark:bg-white/[0.04]" />

          {/* Availability badge */}
          <div className="animate-fade-up mb-10 inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.04] dark:bg-white/[0.04] px-3.5 py-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Available · Open to new roles
          </div>

          {/* Photo + name block */}
          <div className="animate-fade-up anim-delay-1 mb-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Image
              src="/pfp.png"
              alt="Saad Mukhtar"
              width={120}
              height={120}
              className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-[120px] sm:w-[120px]"
            />
            <div className="min-w-0">
              <h1 className="mb-3 text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
                Saad Mukhtar.
              </h1>
              <p className="mb-2 text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
                Software Engineer · Distributed Systems · Infrastructure
              </p>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
                Capital One Software · Tesla · PlayStation · Super.com · UWaterloo CS
              </p>
            </div>
          </div>

          <div className="animate-fade-up anim-delay-2 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-black dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-black transition-opacity hover:opacity-75"
            >
              View Projects
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 1v10M1 6l5 5 5-5" />
              </svg>
            </a>
            <a
              href="mailto:saadmukhtar01@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 dark:border-white/15 px-5 py-2.5 text-sm text-black dark:text-white transition-colors hover:border-black/35 dark:hover:border-white/35"
            >
              Get in Touch →
            </a>
          </div>
        </section>

        <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Projects */}
        <section id="projects" className="py-24">
          <p className="scroll-reveal mb-12 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Building
          </p>
          <div className="grid sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.name}
                className="scroll-reveal group border border-black/[0.10] dark:border-white/[0.10] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              >
                <p className="mb-1 font-mono text-xs text-neutral-500 dark:text-neutral-500">
                  {project.niche}
                </p>
                <div className="mb-2 flex items-start justify-between gap-4">
                  <h3 className="font-medium text-black dark:text-white">{project.name}</h3>
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
                <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
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
          <div className="scroll-reveal mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-300 transition-colors hover:text-black dark:hover:text-white"
            >
              See all projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Experience */}
        <section className="py-24">
          <p className="scroll-reveal mb-12 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Work
          </p>
          <div className="space-y-10">
            {experience.map((job, i) => (
              <div
                key={`${job.company}-${i}`}
                className="scroll-reveal"
              >
                <div className="flex items-start justify-between gap-6 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {job.current && (
                        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                      )}
                      <span className="font-medium text-black dark:text-white">{job.company}</span>
                      {job.subtitle && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">· {job.subtitle}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300">{job.role}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{job.period}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-4 border-l border-black/[0.06] dark:border-white/[0.06]">
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

        {/* Education */}
        <section className="py-24">
          <p className="scroll-reveal mb-12 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Education
          </p>
          <div className="scroll-reveal flex items-start justify-between gap-6">
            <div>
              <span className="font-medium text-black dark:text-white">University of Waterloo</span>
              <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300">BCS Computer Science</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">2020–2025</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Waterloo, ON</p>
            </div>
          </div>
        </section>

        <div className="border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Skills */}
        <section className="py-24">
          <p className="scroll-reveal mb-12 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Stack
          </p>
          <p className="scroll-reveal font-mono text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Go · Python · TypeScript · Kafka · ClickHouse · OpenTelemetry · Kubernetes · AWS
          </p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-black/[0.06] dark:border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex items-center justify-between">
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
