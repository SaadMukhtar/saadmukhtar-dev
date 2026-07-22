import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { projects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects · Saad Mukhtar",
  description:
    "What I'm building and what's next — distributed systems, observability, ML infra.",
};

const building = projects.filter((p) => p.status === "building");
const planned = projects.filter((p) => p.status === "planned");

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="scroll-reveal group border border-black/[0.10] dark:border-white/[0.10] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
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
  );
}

export default function Projects() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6">
        <section className="pb-32 pt-48">
          <p className="mb-12 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Projects
          </p>

          {building.length > 0 && (
            <div className="mb-16">
              <p className="scroll-reveal mb-6 text-sm font-medium text-black dark:text-white">
                Building
              </p>
              <div className="grid sm:grid-cols-2">
                {building.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          )}

          {planned.length > 0 && (
            <div>
              <p className="scroll-reveal mb-6 text-sm font-medium text-black dark:text-white">
                Planned
              </p>
              <div className="grid sm:grid-cols-2">
                {planned.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          )}
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
