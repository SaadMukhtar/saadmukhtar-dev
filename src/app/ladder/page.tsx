import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { ladder, type LadderProject, type LadderStatus } from "@/data/ladder";

// Unlisted: not linked from the nav or home page, and kept out of search results.
export const metadata: Metadata = {
  title: "Ladder · Saad Mukhtar",
  robots: { index: false, follow: false },
};

const statusLabel: Record<LadderStatus, string> = {
  next: "up next",
  planned: "planned",
  building: "building",
  shipped: "shipped",
};

// Generated art per level, drawn in the card's accent color until a real image exists.
function LevelArt({ level }: { level: number }) {
  const common = {
    viewBox: "0 0 200 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-24 w-48",
  };
  switch (level) {
    case 0: // API call: JSON in, streamed tokens out
      return (
        <svg {...common}>
          <path d="M40 25c-8 0-8 6-8 12s-4 13-10 13c6 0 10 7 10 13s0 12 8 12" />
          <path d="M80 25c8 0 8 6 8 12s4 13 10 13c-6 0-10 7-10 13s0 12-8 12" />
          <path d="M48 42h24M48 50h18M48 58h22" opacity="0.6" />
          <path d="M112 50h16" />
          <path d="M124 45l5 5-5 5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={140 + i * 10} y={44} width="6" height="12" rx="1.5" opacity={1 - i * 0.18} />
          ))}
        </svg>
      );
    case 1: // Agent reading a tracker table and drafting a message
      return (
        <svg {...common}>
          <rect x="20" y="20" width="90" height="60" rx="3" />
          <path d="M20 35h90M20 50h90M20 65h90M50 20v60" opacity="0.5" />
          <path d="M28 43l3 3 5-6" />
          <circle cx="33" cy="58" r="3" fill="currentColor" />
          <path d="M118 50h14" />
          <path d="M128 45l5 5-5 5" />
          <path d="M142 30h40v28h-24l-8 8v-8h-8z" />
          <path d="M150 40h24M150 47h16" opacity="0.6" />
        </svg>
      );
    case 2: // Retrieval: documents, query lens, cited chunks
      return (
        <svg {...common}>
          <rect x="24" y="30" width="34" height="44" rx="2" opacity="0.4" />
          <rect x="30" y="24" width="34" height="44" rx="2" opacity="0.7" />
          <rect x="36" y="18" width="34" height="44" rx="2" />
          <path d="M42 30h22M42 37h18M42 44h22" opacity="0.6" />
          <circle cx="104" cy="50" r="14" />
          <path d="M114 60l10 10" />
          <path d="M140 32h44M140 50h36M140 68h40" />
          <circle cx="190" cy="32" r="3" fill="currentColor" />
          <circle cx="182" cy="50" r="3" fill="currentColor" />
          <circle cx="186" cy="68" r="3" fill="currentColor" />
        </svg>
      );
    case 3: // MCP: client and server joined by a protocol bus
      return (
        <svg {...common}>
          <rect x="20" y="32" width="44" height="36" rx="4" />
          <path d="M30 44h24M30 52h16" opacity="0.6" />
          <rect x="136" y="32" width="44" height="36" rx="4" />
          <path d="M146 44h24M146 52h20M146 60h12" opacity="0.6" />
          <path d="M64 44h72M64 56h72" strokeDasharray="4 4" />
          <circle cx="100" cy="50" r="10" fill="currentColor" fillOpacity="0.15" />
          <path d="M96 46v8M104 46v8M94 50h12" />
        </svg>
      );
    case 4: // Pass-rate bars against a CI threshold line
      return (
        <svg {...common}>
          <path d="M20 85h160" opacity="0.5" />
          {[62, 66, 64, 70, 68, 72, 48, 71].map((h, i) => (
            <rect
              key={i}
              x={28 + i * 19}
              y={85 - h}
              width="11"
              height={h}
              rx="1.5"
              fill="currentColor"
              fillOpacity={h < 55 ? 0.9 : 0.25}
            />
          ))}
          <path d="M20 30h160" strokeDasharray="5 4" />
          <path d="M138 22l8 8M146 22l-8 8" />
        </svg>
      );
    case 5: // Ledger with a flagged undercount and an approved fix
      return (
        <svg {...common}>
          <rect x="20" y="16" width="110" height="68" rx="3" />
          <path d="M20 30h110M20 44h110M20 58h110M20 72h110M90 16v68" opacity="0.5" />
          <rect x="20" y="44" width="110" height="14" fill="currentColor" fillOpacity="0.18" stroke="none" />
          <path d="M98 51h24" />
          <path d="M138 51h16" />
          <path d="M150 46l5 5-5 5" />
          <circle cx="174" cy="51" r="14" />
          <path d="M167 51l5 5 9-10" />
        </svg>
      );
    default:
      return null;
  }
}

function LadderCard({ project }: { project: LadderProject }) {
  const flagship = project.level === ladder.length - 1;
  return (
    <article
      className={`group flex flex-col overflow-hidden border border-black/[0.10] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/[0.10] dark:bg-black ${
        flagship ? "shadow-md" : ""
      }`}
      style={{
        borderColor: flagship ? project.accent : undefined,
        borderTopColor: project.accent,
        borderTopWidth: 3,
      }}
    >
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden"
        style={{
          color: project.accent,
          backgroundColor: `${project.accent}0f`,
          backgroundImage: `linear-gradient(${project.accent}14 1px, transparent 1px), linear-gradient(90deg, ${project.accent}14 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        {project.image ? (
          <Image src={project.image} alt={project.name} fill className="object-cover" />
        ) : (
          <LevelArt level={project.level} />
        )}
        <span className="absolute left-4 top-3 font-mono text-xs font-semibold">
          L{project.level}
          {flagship && " · flagship"}
        </span>
        <span className="absolute right-4 top-3 font-mono text-xs opacity-80">{project.time}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h2 className="font-medium text-black dark:text-white">{project.name}</h2>
          <span
            className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs"
            style={{ color: project.accent, backgroundColor: `${project.accent}1a` }}
          >
            {statusLabel[project.status]}
          </span>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        <p className="mb-4 border-l-2 pl-3 text-sm italic text-black dark:text-white" style={{ borderColor: project.accent }}>
          {project.proves}
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="rounded border px-1.5 py-0.5 font-mono text-xs"
                style={{ color: project.accent, borderColor: `${project.accent}40` }}
              >
                {m}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-black/[0.04] px-1.5 py-0.5 font-mono text-xs text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-neutral-600 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
            >
              Repo →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Ladder() {
  return (
    <div className="min-h-screen font-sans text-[--foreground]">
      <Nav />
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-24">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Ladder
        </p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-white">
          What I&apos;m building next, in order
        </h1>
        <p className="mb-8 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
          Each level is a new repo built with Claude Code, shipped with a README, real eval numbers, and one write-up.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ladder.map((project) => (
            <LadderCard key={project.level} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
