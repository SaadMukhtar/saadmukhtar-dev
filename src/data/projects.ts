export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "building" | "planned";
  niche: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Observability Platform",
    description:
      "End-to-end telemetry — metrics, logs, traces — at high write throughput with a query engine and dashboard",
    stack: ["Go", "Kafka", "ClickHouse", "OpenTelemetry"],
    status: "building",
    niche: "observability",
    featured: true,
  },
  {
    name: "LLM Observability Platform",
    description:
      "Token accounting, prompt tracing, cost/latency percentiles, and quality regression detection for LLM apps",
    stack: ["Go", "ClickHouse", "OpenTelemetry", "Claude API"],
    status: "planned",
    niche: "ai-observability",
    featured: true,
  },
  {
    name: "Kubernetes Operator",
    description:
      "Custom controller for a domain-specific resource with reconciliation loops, CRDs, and admission webhooks",
    stack: ["Go", "kubebuilder", "controller-runtime"],
    status: "planned",
    niche: "k8s",
  },
  {
    name: "LLM Inference Server",
    description:
      "Serving layer with continuous batching, KV-cache reuse, and vLLM-style paged attention for high-throughput inference",
    stack: ["Python", "PyTorch", "CUDA"],
    status: "planned",
    niche: "ml-inference",
  },
  {
    name: "RAG Pipeline with Evals",
    description:
      "Retrieval-augmented generation pipeline with faithfulness scoring, retrieval recall, and quality gates via RAGAS",
    stack: ["Python", "Claude API", "pgvector", "RAGAS"],
    status: "planned",
    niche: "rag",
  },
  {
    name: "Consensus + Distributed KV Store",
    description:
      "Raft implementation with leader election, log replication, and linearizable reads across a multi-node cluster",
    stack: ["Go", "Raft", "gRPC"],
    status: "planned",
    niche: "distributed-systems",
  },
  {
    name: "Small Transformer from Scratch",
    description:
      "Decoder-only transformer built from PyTorch primitives — self-attention, positional encoding, trained on a real dataset",
    stack: ["Python", "PyTorch"],
    status: "planned",
    niche: "ml-foundations",
  },
  {
    name: "Distributed Load Testing Platform",
    description:
      "Coordinated load generation across container workers with autoscaling, real-time metrics, and multi-region test runs",
    stack: ["Go", "Kubernetes", "Prometheus", "Docker"],
    status: "planned",
    niche: "load-testing",
  },
  {
    name: "Video Processing Pipeline",
    description:
      "Ingestion pipeline — upload, chunking, transcode, async workers, object storage, and queue-driven fan-out",
    stack: ["Go", "S3", "Kafka", "FFmpeg"],
    status: "planned",
    niche: "data-pipeline",
  },
  {
    name: "Job Queue",
    description:
      "Production-grade distributed job queue from scratch — DLQ, retry policies, autoscaling workers, async concurrency control",
    stack: ["Go", "Redis", "PostgreSQL"],
    status: "planned",
    niche: "queues",
  },
  {
    name: "Distributed Load Balancer",
    description:
      "L7 load balancer with consistent hashing, dynamic backend registration via etcd, and Prometheus metrics",
    stack: ["Go", "etcd", "Prometheus"],
    status: "planned",
    niche: "networking",
  },
  {
    name: "Voice Agent",
    description:
      "Real-time voice conversational agent with streaming ASR, LLM turns, and low-latency TTS via WebSockets",
    stack: ["Python", "Claude API", "WebSockets", "Deepgram", "ElevenLabs"],
    status: "planned",
    niche: "ai-agents",
  },
  {
    name: "Vector Database from Scratch",
    description:
      "Purpose-built vector store with HNSW indexing, IVF partitioning, and a custom on-disk format for large embeddings",
    stack: ["Go", "HNSW", "IVF"],
    status: "planned",
    niche: "vector-db",
  },
];
