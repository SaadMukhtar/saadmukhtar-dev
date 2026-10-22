export type LadderStatus = "next" | "planned" | "building" | "shipped";

export type LadderProject = {
  level: number;
  name: string;
  description: string;
  proves: string;
  metrics: string[];
  stack: string[];
  time: string;
  status: LadderStatus;
  accent: string;
  // Optional screenshot or diagram in /public; the card falls back to generated art.
  image?: string;
  repo?: string;
};

export const ladder: LadderProject[] = [
  {
    level: 0,
    name: "Claude API Foundations",
    description:
      "Tool use for structured JSON, streaming, token cost accounting, and prompt caching. Paired with a close read of Anthropic's \"Building effective agents\".",
    proves: "The fundamentals every later level builds on",
    metrics: ["cost per call", "cache hit rate"],
    stack: ["Python", "Claude API"],
    time: "2–3 evenings",
    status: "next",
    accent: "#64748b",
  },
  {
    level: 1,
    name: "Job Tracker Agent",
    description:
      "An agent that reads my application tracker and drafts follow-ups for whoever is due, with tests around every tool call.",
    proves: "I can build an agent and test it",
    metrics: ["draft acceptance rate", "cost per task"],
    stack: ["Python", "Claude API", "Tool use"],
    time: "1 weekend",
    status: "planned",
    accent: "#0ea5e9",
  },
  {
    level: 2,
    name: "Cited RAG over Prep Docs",
    description:
      "Retrieval over my interview prep docs where every answer cites its source, and fabricated citations get caught.",
    proves: "I measure retrieval quality instead of eyeballing it",
    metrics: ["recall@k", "citation accuracy"],
    stack: ["Python", "Claude API", "pgvector"],
    time: "1–2 weekends",
    status: "planned",
    accent: "#8b5cf6",
  },
  {
    level: 3,
    name: "Tracker MCP Server",
    description:
      "An MCP server that exposes my tracker as tools and resources, used every day from Claude Code.",
    proves: "A real MCP server in daily use, not a demo",
    metrics: ["daily uses", "p95 tool latency"],
    stack: ["TypeScript", "MCP", "Claude Code"],
    time: "1 weekend",
    status: "planned",
    accent: "#10b981",
  },
  {
    level: 4,
    name: "Agent Regression Harness",
    description:
      "A golden set, an LLM judge validated against my own labels, and a CI gate that fails the PR when the pass rate drops.",
    proves: "Correctness and reliability engineering, applied to AI",
    metrics: ["pass rate", "judge–human agreement"],
    stack: ["Python", "Claude API", "GitHub Actions"],
    time: "2 weekends",
    status: "planned",
    accent: "#f59e0b",
  },
  {
    level: 5,
    name: "Billing Reconciliation Agent",
    description:
      "Runs against Stripe test mode, finds planted undercounts, and proposes fixes a human approves one by one. Writes are idempotent, and the level 4 harness gates every change in CI.",
    proves: "I found a 92.5% undercount by hand, then built an agent that finds them",
    metrics: ["detection recall", "false positive rate", "p95 latency", "cost per run"],
    stack: ["Python", "Claude API", "Stripe", "Postgres", "GitHub Actions"],
    time: "3–4 weekends",
    status: "planned",
    accent: "#f43f5e",
  },
];
