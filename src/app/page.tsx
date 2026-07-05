import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Saad Mukhtar",
  description: "Software Engineer — distributed systems, observability, infrastructure",
};

type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "building" | "planned";
};

const projects: Project[] = [
  {
    name: "Observability Platform",
    description:
      "End-to-end telemetry — metrics, logs, traces — at high write throughput with a query engine and dashboard",
    stack: ["Go", "Kafka", "ClickHouse", "OpenTelemetry"],
    status: "building",
  },
];

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
      "Diagnosed a 92.5% billing undercounting defect in a distributed OpenTelemetry pipeline; authored the root-cause analysis, led remediation across 20+ sessions with Principal Engineers, and restored metric accuracy, recovering $1M+ in enterprise contract billing.",
      "Co-architected the telemetry pipeline (OpenTelemetry → S3 → Lambda → ClickHouse) for a multi-tenant observability and billing platform, ingesting 10M+ metrics/day across cloud-hosted and air-gapped Kubernetes.",
    ],
  },
  {
    company: "Capital One",
    role: "Software Engineer Intern",
    period: "Jun–Aug 2024",
    location: "Dallas, TX",
    current: false,
    bullets: [
      "Built a NestJS API on AWS Fargate (containerized microservices, CI/CD, auth) to accelerate read-heavy SailPoint workflows, eliminating 500+ daily support tickets for 2,000+ engineers.",
    ],
  },
  {
    company: "Tesla",
    role: "Software Engineer Intern",
    period: "Jan–Apr 2024",
    location: "Palo Alto, CA",
    current: false,
    bullets: [
      "Engineered a Python backend for cryptographic signature verification of safety-critical vehicle firmware, integrating build system APIs and secure key services to protect 1M+ updates per release.",
    ],
  },
  {
    company: "Super.com",
    role: "Software Engineer Intern",
    period: "May–Aug 2023",
    location: "Remote",
    current: false,
    bullets: [
      "Won 1st place in company hackathon by building an OpenAI-powered itinerary generator projected to drive $200K+ in ARR through personalized booking recommendations.",
    ],
  },
  {
    company: "PlayStation",
    role: "Software Developer Intern",
    period: "Sep–Dec 2022",
    location: "Remote",
    current: false,
    bullets: [
      "Shipped cross-platform React Native features (TypeScript) for the PS4/PS5 subscription tier launch, contributing to a rollout generating $600M+ annual revenue across 10M+ users.",
    ],
  },
  {
    company: "PlayStation",
    role: "Software Developer in Test Intern",
    period: "Jan–Apr 2022",
    location: "Remote",
    current: false,
    bullets: [
      "Designed and built a now-patented PS5 calendar feature in React Native; uncovered 16+ critical bugs affecting 40M+ users through PS4 Python test automation expansion.",
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
          <div className="animate-fade-up anim-delay-1 flex items-center gap-8 mb-10">
            <Image
              src="/pfp.png"
              alt="Saad Mukhtar"
              width={120}
              height={120}
              className="shrink-0 rounded-full object-cover"
            />
            <div>
              <h1 className="mb-3 text-5xl font-semibold tracking-tight text-black dark:text-white md:text-6xl">
                Saad Mukhtar.
              </h1>
              <p className="mb-2 text-lg text-neutral-600 dark:text-neutral-300">
                Software Engineer · Distributed Systems · Infrastructure
              </p>
              <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
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
            {projects.map((project) => (
              <div
                key={project.name}
                className="scroll-reveal group border border-black/[0.10] dark:border-white/[0.10] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              >
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
                      {bullet}
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
