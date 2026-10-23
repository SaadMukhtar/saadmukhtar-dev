export type LadderStatus = "next" | "planned" | "building" | "shipped";

export type LadderLevel = {
  level: number;
  name: string;
  skill: string;
  goal: string;
  build: string;
  metrics: string[];
  time: string;
  status: LadderStatus;
};

export const ladder: LadderLevel[] = [
  {
    level: 0,
    name: "Claude API basics",
    skill: "API fluency",
    goal: "Get fluent with the building blocks every agent uses.",
    build: "Small scripts for tool use, streaming, prompt caching, and token cost tracking.",
    metrics: ["cost per call", "cache hit rate"],
    time: "2–3 evenings",
    status: "next",
  },
  {
    level: 1,
    name: "Agent from scratch",
    skill: "How agents work",
    goal: "Understand the agent loop by writing it without a framework.",
    build: "A tool-calling agent that triages GitHub issues: reads, labels, and drafts replies.",
    metrics: ["task success rate", "steps per task", "cost per task"],
    time: "1 weekend",
    status: "planned",
  },
  {
    level: 2,
    name: "RAG pipeline + evals",
    skill: "Retrieval, measured",
    goal: "Ground answers in real documents and prove retrieval works.",
    build: "Search over a doc set, answers with citations, automatic check for made-up citations.",
    metrics: ["recall@k", "citation accuracy"],
    time: "1–2 weekends",
    status: "planned",
  },
  {
    level: 3,
    name: "Public MCP server",
    skill: "Tool integration",
    goal: "Ship an open-source tool other developers install.",
    build: "An MCP server wrapping a real API, published with docs.",
    metrics: ["installs", "p95 tool latency"],
    time: "1 weekend",
    status: "planned",
  },
  {
    level: 4,
    name: "Eval framework",
    skill: "Agent reliability",
    goal: "Catch agent regressions before they ship.",
    build: "Golden set, LLM judge checked against my labels, CI gate that fails the PR on a drop. Runs on L1–L3.",
    metrics: ["pass rate", "judge–human agreement"],
    time: "2 weekends",
    status: "planned",
  },
  {
    level: 5,
    name: "Inference gateway (Go)",
    skill: "AI infra",
    goal: "Bring backend strength to AI infra.",
    build: "Routes requests across models by cost and latency, with fallback and caching.",
    metrics: ["p95 latency", "cost saved", "fallback success rate"],
    time: "2–3 weekends",
    status: "planned",
  },
  {
    level: 6,
    name: "Durable agent runtime",
    skill: "Agents + infra",
    goal: "Flagship: run long agent tasks reliably in production.",
    build: "Long-running agents with retries, human approval steps, and eval gates, running behind the L5 gateway.",
    metrics: ["task completion rate", "recovery after failure", "cost per task"],
    time: "3–4 weekends",
    status: "planned",
  },
];
