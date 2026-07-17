export type CategoryStatus = "real" | "stub";

export type Category = {
  slug: string;
  name: string;
  description: string;
  status: CategoryStatus;
  topics: Topic[];
};

export type Topic = {
  name: string;
  covered: boolean;
};

// Category names match the keys in categoryStyles.ts for color lookup.
export const categories: Category[] = [
  {
    slug: "fundamentals",
    name: "Fundamentals",
    description:
      "Core distributed systems vocabulary — latency, throughput, availability, capacity math",
    status: "real",
    topics: [
      { name: "p99 latency and tail behavior", covered: true },
      { name: "Throughput vs latency tradeoffs", covered: true },
      { name: "Vertical vs horizontal scaling", covered: true },
      { name: "Availability nines and downtime math", covered: true },
      { name: "Single points of failure (SPOFs)", covered: true },
      { name: "Back-of-envelope estimation", covered: true },
      { name: "Amdahl's law and diminishing returns", covered: false },
      { name: "Little's law and queuing basics", covered: false },
    ],
  },
  {
    slug: "networking",
    name: "Networking",
    description: "TCP/IP, TLS, HTTP protocols, DNS, CDN, load balancing",
    status: "real",
    topics: [
      { name: "TCP vs UDP", covered: true },
      { name: "HTTP/1.1 vs HTTP/2 vs HTTP/3", covered: true },
      { name: "TLS handshake basics", covered: true },
      { name: "DNS resolution and TTLs", covered: true },
      { name: "CDN architecture and cache hierarchy", covered: true },
      { name: "Load balancing algorithms (L4 vs L7)", covered: true },
      { name: "Consistent hashing", covered: false },
      { name: "Anycast and BGP", covered: false },
    ],
  },
  {
    slug: "databases",
    name: "Databases",
    description: "SQL, NoSQL, indexes, transactions, replication, sharding",
    status: "real",
    topics: [
      { name: "SQL vs NoSQL tradeoffs", covered: true },
      { name: "B-tree vs LSM tree indexes", covered: true },
      { name: "ACID and isolation levels", covered: true },
      { name: "MVCC and snapshot isolation", covered: true },
      { name: "Read replicas and replication lag", covered: true },
      { name: "Sharding strategies", covered: true },
      { name: "Two-phase commit and its limits", covered: false },
      { name: "Change data capture (CDC)", covered: false },
    ],
  },
  {
    slug: "distributed-systems",
    name: "Distributed Systems & Consistency",
    description: "CAP, consensus, replication, consistency models",
    status: "real",
    topics: [
      { name: "CAP theorem and PACELC", covered: true },
      { name: "Consensus (Raft, Paxos)", covered: true },
      { name: "Leader election patterns", covered: true },
      { name: "Consistency models (linearizable, eventual)", covered: true },
      { name: "Vector clocks and logical time", covered: false },
      { name: "Quorum reads/writes", covered: false },
      { name: "Anti-entropy and gossip protocols", covered: false },
    ],
  },
  {
    slug: "caching-performance",
    name: "Caching & Performance",
    description: "Cache strategies, invalidation, eviction, hot keys",
    status: "real",
    topics: [
      { name: "Write-through vs write-back", covered: true },
      { name: "Eviction policies (LRU, LFU, TTL)", covered: true },
      { name: "Cache invalidation strategies", covered: true },
      { name: "Cache stampede and thundering herd", covered: true },
      { name: "CDN edge caching", covered: false },
      { name: "Content-hash caching for immutable assets", covered: false },
    ],
  },
  {
    slug: "reliability-scaling",
    name: "Reliability & Scaling",
    description: "Circuit breakers, backpressure, rate limiting, blast radius",
    status: "real",
    topics: [
      { name: "Circuit breaker pattern", covered: true },
      { name: "Backpressure and load shedding", covered: true },
      { name: "Rate limiting algorithms", covered: true },
      { name: "Retries with exponential backoff and jitter", covered: true },
      { name: "Blast radius and cell-based architecture", covered: true },
      { name: "Chaos engineering fundamentals", covered: false },
    ],
  },
  {
    slug: "api-design",
    name: "API Design",
    description: "REST, gRPC, idempotency, versioning, pagination",
    status: "real",
    topics: [
      { name: "REST vs gRPC vs GraphQL", covered: true },
      { name: "Idempotency and request keys", covered: true },
      { name: "API versioning strategies", covered: true },
      { name: "Cursor vs offset pagination", covered: true },
      { name: "Webhook design and delivery guarantees", covered: false },
    ],
  },
  {
    slug: "observability",
    name: "Observability",
    description:
      "Metrics, logs, traces, cardinality, SLOs — the three pillars and how they compose",
    status: "real",
    topics: [
      { name: "Metrics vs logs vs traces", covered: true },
      { name: "SLI vs SLO vs SLA", covered: true },
      { name: "High cardinality and its cost", covered: true },
      { name: "OpenTelemetry identity model", covered: true },
      { name: "Distributed tracing and span context propagation", covered: true },
      { name: "Error budgets and burn rate", covered: false },
      { name: "Structured logging patterns", covered: false },
    ],
  },
  {
    slug: "ai-systems",
    name: "AI Systems",
    description:
      "LLM serving, RAG, vector search, prompt caching, agent architectures",
    status: "real",
    topics: [
      { name: "Continuous batching in LLM serving", covered: true },
      { name: "KV cache and paged attention", covered: true },
      { name: "RAG architecture and chunking strategies", covered: true },
      { name: "Vector similarity metrics (cosine, dot, L2)", covered: true },
      { name: "Prompt caching and cache-aware serving", covered: true },
      { name: "Agent tool use patterns (ReAct, planning)", covered: false },
      { name: "Speculative decoding", covered: false },
    ],
  },
  {
    slug: "ml-infra",
    name: "ML Infra",
    description:
      "Training pipelines, distributed training, GPU orchestration, post-training",
    status: "real",
    topics: [
      { name: "Data parallelism vs tensor parallelism vs pipeline parallelism", covered: true },
      { name: "FSDP (Fully Sharded Data Parallel)", covered: true },
      { name: "Mixed precision training (fp16, bf16)", covered: true },
      { name: "Gradient checkpointing (activation recomputation)", covered: true },
      { name: "SFT vs RLHF vs DPO", covered: true },
      { name: "NCCL and collective operations", covered: false },
      { name: "Checkpoint sharding and restart", covered: false },
    ],
  },
  {
    slug: "infrastructure-devops",
    name: "Infrastructure & DevOps",
    description: "Containers, K8s, CI/CD, canary deploys, feature flags",
    status: "stub",
    topics: [
      { name: "Container fundamentals (namespaces, cgroups)", covered: false },
      { name: "K8s core objects (Pod, Deployment, Service)", covered: false },
      { name: "K8s scheduler and HPA", covered: false },
      { name: "GitOps and declarative deploys", covered: false },
      { name: "Canary and blue-green deployment", covered: false },
      { name: "Feature flags for gradual rollout", covered: false },
    ],
  },
  {
    slug: "data-pipelines",
    name: "Data Pipelines",
    description: "Batch vs stream, exactly-once, Kafka, ETL patterns",
    status: "stub",
    topics: [
      { name: "Batch vs stream vs micro-batch", covered: false },
      { name: "Kafka partitions, consumer groups, offsets", covered: false },
      { name: "Exactly-once semantics", covered: false },
      { name: "Watermarks and event-time processing", covered: false },
      { name: "ETL vs ELT", covered: false },
    ],
  },
  {
    slug: "security",
    name: "Security",
    description: "Authentication, authorization, TLS, secrets, encryption",
    status: "stub",
    topics: [
      { name: "OAuth 2.0 and OIDC flows", covered: false },
      { name: "JWT vs opaque tokens", covered: false },
      { name: "TLS 1.3 handshake and 0-RTT", covered: false },
      { name: "Secrets management (Vault, AWS SM)", covered: false },
      { name: "Encryption at rest vs in transit", covered: false },
    ],
  },
  {
    slug: "company-architectures",
    name: "Company Architectures",
    description:
      "How real companies build their systems — reference architectures for classic products",
    status: "stub",
    topics: [
      { name: "bit.ly / URL shortener at scale", covered: true },
      { name: "Stripe payments architecture", covered: false },
      { name: "Uber ride-matching", covered: false },
      { name: "Anthropic API infrastructure", covered: false },
      { name: "Twitter timeline fanout", covered: false },
      { name: "Netflix streaming and CDN", covered: false },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name === name);
}
