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
//
// Order is the recommended learning progression:
//   1-5:   universal foundations (systems vocab, networking, DBs, caching, API design)
//   6-7:   distributed systems mastery (CAP, consensus, reliability)
//   8-9:   pattern recognition + concrete technology choices
//   10-13: production concerns (observability, infra, security, data pipelines)
//   14-15: AI/ML specialization (ML infra first: needs neural net + transformer basics)
//   16-17: applied depth (advanced algorithms, real company architectures)
export const categories: Category[] = [
  {
    slug: "sd-interview-framework",
    name: "SD Interview Framework",
    description:
      "The prescriptive 6-phase delivery framework for a system design interview: what to SAY and WRITE at each phase, with time budgets",
    status: "real",
    topics: [
      { name: "The 6-phase framework overview", covered: true },
      { name: "Phase 1: Requirements & Scope", covered: true },
      { name: "Phase 2: Core Entities", covered: true },
      { name: "Phase 3: API / System Interface", covered: true },
      { name: "Phase 4: Data Flow (optional)", covered: true },
      { name: "Phase 5: High-Level Design", covered: true },
      { name: "Phase 6: Deep Dives", covered: true },
      { name: "Phase 7: Trade-offs & Alternatives", covered: true },
    ],
  },
  {
    slug: "fundamentals",
    name: "Fundamentals",
    description:
      "Core distributed systems vocabulary: latency, throughput, availability, capacity math",
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
    slug: "common-patterns",
    name: "Common Patterns",
    description:
      "Design patterns that recur across system design interviews: realtime updates, long-running tasks, scaling reads/writes, and more",
    status: "real",
    topics: [
      { name: "Pushing realtime updates (WebSockets, SSE, long polling)", covered: true },
      { name: "Managing long-running tasks (queue + workers)", covered: true },
      { name: "Dealing with contention (locks, transactions, distributed coordination)", covered: true },
      { name: "Scaling reads (indexes, replicas, cache)", covered: true },
      { name: "Scaling writes (sharding, batching, write-behind)", covered: true },
      { name: "Handling large blobs (presigned URLs, direct-to-storage)", covered: true },
      { name: "Multi-step processes (sagas, event sourcing, workflows)", covered: true },
      { name: "Proximity-based services (geospatial indexes, geohashing)", covered: true },
    ],
  },
  {
    slug: "key-technologies",
    name: "Key Technologies",
    description:
      "The specific technologies interviewers expect you to know: databases, caches, queues, gateways, load balancers, CDNs",
    status: "real",
    topics: [
      { name: "Relational DBs (Postgres, MySQL)", covered: true },
      { name: "NoSQL DBs (DynamoDB, Cassandra, MongoDB)", covered: true },
      { name: "Search (Elasticsearch)", covered: true },
      { name: "Cache (Redis, Memcached)", covered: true },
      { name: "Streaming (Kafka, Kinesis, Flink, SQS)", covered: true },
      { name: "Coordination (ZooKeeper, etcd)", covered: true },
      { name: "API Gateway (AWS API Gateway, Kong, Apigee, NGINX)", covered: true },
      { name: "Load Balancer (ELB, HAProxy, NGINX)", covered: true },
      { name: "CDN (Cloudflare, Akamai, CloudFront)", covered: true },
      { name: "Object Storage (S3, GCS, Azure Blob)", covered: true },
    ],
  },
  {
    slug: "observability",
    name: "Observability",
    description:
      "Metrics, logs, traces, cardinality, SLOs: the three pillars and how they compose",
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
    slug: "infrastructure-devops",
    name: "Infrastructure & DevOps",
    description: "Containers, K8s, MLOps, model registries, Linux fundamentals",
    status: "real",
    topics: [
      { name: "Container fundamentals (namespaces, cgroups)", covered: true },
      { name: "K8s core objects (Pod, Deployment, Service)", covered: true },
      { name: "K8s scheduler and HPA", covered: false },
      { name: "CI/CD pipeline stages", covered: true },
      { name: "GitOps and declarative deploys", covered: true },
      { name: "Canary and blue-green deployment", covered: true },
      { name: "Feature flags for gradual rollout", covered: true },
      { name: "MLOps lifecycle", covered: true },
      { name: "MLflow (tracking + registry + models)", covered: true },
      { name: "Model registries and promotion workflow", covered: true },
      { name: "Linux + OS fundamentals", covered: true },
    ],
  },
  {
    slug: "security",
    name: "Security",
    description: "Auth, TLS, secrets, LLM guardrails, prompt-injection defense",
    status: "real",
    topics: [
      { name: "OAuth 2.0 and OIDC flows", covered: true },
      { name: "JWT (structure, pitfalls)", covered: true },
      { name: "TLS 1.3 handshake and 0-RTT", covered: false },
      { name: "Secrets management (Vault, AWS SM)", covered: true },
      { name: "Encryption at rest vs in transit", covered: true },
      { name: "LLM guardrails (input + output filtering)", covered: true },
      { name: "Prompt-injection attacks and defenses", covered: true },
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
    slug: "ml-infra",
    name: "ML Infra",
    description:
      "Training pipelines, distributed training, GPU orchestration, post-training",
    status: "real",
    topics: [
      { name: "Neural network basics (layers, weights, activations)", covered: true },
      { name: "Transformer architecture (self-attention, multi-head)", covered: true },
      { name: "Backpropagation", covered: true },
      { name: "Loss functions (cross-entropy, MSE, contrastive)", covered: true },
      { name: "Training step: SGD, Adam, AdamW", covered: true },
      { name: "PyTorch basics (autograd, nn.Module, DataLoader)", covered: true },
      { name: "GPU architecture (SMs, warps, tensor cores)", covered: true },
      { name: "GPU memory hierarchy (HBM, L2, shared, registers)", covered: true },
      { name: "CUDA programming basics", covered: true },
      { name: "CUDA profiling (Nsight)", covered: true },
      { name: "Kernel optimization (coalescing, tiling)", covered: true },
      { name: "Data / tensor / pipeline parallelism", covered: true },
      { name: "FSDP (Fully Sharded Data Parallel)", covered: true },
      { name: "DeepSpeed ZeRO stages", covered: true },
      { name: "Mixed precision training (fp16, bf16)", covered: true },
      { name: "Gradient checkpointing", covered: true },
      { name: "NCCL and collective operations", covered: true },
      { name: "InfiniBand / RDMA", covered: true },
      { name: "Multi-node inference", covered: true },
      { name: "GPU orchestration (K8s + Ray)", covered: true },
      { name: "Quantization (int8, fp8, int4)", covered: true },
      { name: "Speculative decoding", covered: true },
      { name: "LoRA and QLoRA", covered: true },
      { name: "PEFT overview", covered: true },
      { name: "Fine-tuning pipeline (end-to-end)", covered: true },
      { name: "SFT vs RLHF vs DPO", covered: true },
    ],
  },
  {
    slug: "ai-systems",
    name: "AI Systems",
    description:
      "LLM serving, RAG, vector search, prompt caching, agent architectures",
    status: "real",
    topics: [
      { name: "What is an LLM (transformer + next-token prediction)", covered: true },
      { name: "Tokens and tokenization (BPE, SentencePiece)", covered: true },
      { name: "Embeddings and vector representations", covered: true },
      { name: "Prompt engineering (system, few-shot, output structure)", covered: true },
      { name: "Chain-of-thought reasoning", covered: true },
      { name: "Continuous batching in LLM serving", covered: true },
      { name: "KV cache and paged attention", covered: true },
      { name: "RAG architecture and chunking strategies", covered: true },
      { name: "Retrieval + reranking (bi-encoder + cross-encoder)", covered: true },
      { name: "Vector similarity metrics (cosine, dot, L2)", covered: true },
      { name: "Prompt caching and cache-aware serving", covered: true },
      { name: "Semantic caching", covered: true },
      { name: "Inference cost optimization", covered: true },
      { name: "LLM evaluation frameworks", covered: true },
      { name: "Agent tool use patterns (ReAct)", covered: true },
      { name: "MCP (Model Context Protocol)", covered: true },
      { name: "Model routing and fallback", covered: true },
      { name: "Long-context handling", covered: true },
      { name: "vLLM / Triton / SGLang serving stacks", covered: true },
    ],
  },
  {
    slug: "advanced-topics",
    name: "Advanced Topics",
    description:
      "Deeper topics that show up in senior interviews: time-series, big-data structures, vector DBs, proximity search",
    status: "real",
    topics: [
      { name: "Proximity search (geohash, quadtree, R-tree)", covered: true },
      { name: "Time-series databases (Prometheus, InfluxDB, TimescaleDB)", covered: true },
      { name: "Data structures for big data (Bloom filter, HyperLogLog, Count-Min Sketch)", covered: true },
      { name: "Vector databases (HNSW, IVF, on-disk formats)", covered: true },
    ],
  },
  {
    slug: "company-architectures",
    name: "Company Architectures",
    description:
      "How real companies build their systems: reference architectures for classic products",
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
