import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saad Mukhtar",
  description: "Software Engineer — distributed systems, observability, infrastructure",
};

type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "building" | "planned";
  href?: string;
};

const projects: Project[] = [
  {
    name: "Observability Platform",
    description:
      "End-to-end telemetry — metrics, logs, traces — at high write throughput with a query engine and dashboard",
    stack: ["Go", "Kafka", "ClickHouse", "OpenTelemetry"],
    status: "building",
  },
  {
    name: "Kubernetes Operator",
    description:
      "Custom operator managing the full lifecycle of a stateful application via CRDs and controller reconciliation",
    stack: ["Go", "kubebuilder", "controller-runtime"],
    status: "planned",
  },
  {
    name: "LLM Inference Server",
    description:
      "From-scratch inference server with continuous batching, KV cache management, and quantization",
    stack: ["Python", "PyTorch", "CUDA"],
    status: "planned",
  },
  {
    name: "RAG Pipeline with Evals",
    description:
      "Retrieval-augmented generation pipeline with a built-in harness measuring retrieval precision and faithfulness",
    stack: ["Python", "pgvector", "RAGAS"],
    status: "planned",
  },
  {
    name: "Distributed Load Balancer",
    description:
      "L7 load balancer with consistent hashing, circuit breaking, and live config reloading without downtime",
    stack: ["Go", "etcd", "Prometheus"],
    status: "planned",
  },
  {
    name: "Voice Agent",
    description:
      "Real-time voice AI agent with sub-500ms perceived latency, streaming tool use, and barge-in handling",
    stack: ["Python", "Claude API", "WebSockets"],
    status: "planned",
  },
];

const experience = [
  { company: "Capital One", role: "Founding Software Engineer" },
  { company: "Tesla", role: "Software Engineer" },
  { company: "PlayStation", role: "Software Engineer" },
  { company: "Super.com", role: "Software Engineer" },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-zinc-100">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <span className="font-medium text-zinc-100">Saad Mukhtar</span>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a
              href="https://github.com/saadmukhtar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-100"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/saadmukhtar"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-100"
            >
              LinkedIn
            </a>
            <a
              href="mailto:saadmukhtar01@gmail.com"
              className="transition-colors hover:text-zinc-100"
            >
              Email
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6">
        {/* Hero */}
        <section className="py-24">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight text-zinc-100">
            Saad Mukhtar
          </h1>
          <p className="mb-8 text-lg text-zinc-500">Software Engineer</p>
          <p className="max-w-lg text-base leading-relaxed text-zinc-400">
            Building distributed systems at Capital One — telemetry platform
            ingesting 10M+ metrics/day. Previously Tesla, PlayStation, Super.com.
            UWaterloo CS.
          </p>
        </section>

        <hr className="border-zinc-800" />

        {/* Projects */}
        <section className="py-16">
          <h2 className="mb-10 text-xs font-medium uppercase tracking-widest text-zinc-600">
            Building
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-medium text-zinc-100">{project.name}</h3>
                  <span
                    className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      project.status === "building"
                        ? "bg-emerald-950 text-emerald-400"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-zinc-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-zinc-800" />

        {/* Experience */}
        <section className="py-16">
          <h2 className="mb-10 text-xs font-medium uppercase tracking-widest text-zinc-600">
            Work
          </h2>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.company} className="flex items-baseline justify-between gap-4">
                <span className="font-medium text-zinc-200">{job.company}</span>
                <span className="text-sm text-zinc-500">{job.role}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <p className="text-sm text-zinc-600">Built with Next.js · Tailwind</p>
        </div>
      </footer>
    </div>
  );
}
