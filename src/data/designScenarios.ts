export type ScenarioStage =
  | "Requirements & Scope"
  | "Back-of-Envelope Estimation"
  | "High-Level Design"
  | "Deep Dive & Bottlenecks"
  | "Trade-offs & Alternatives";

export type ScenarioSection = {
  stage: ScenarioStage;
  content: string;
};

export type DesignScenario = {
  slug: string;
  system: string;
  prompt: string;
  category: string;
  sections: ScenarioSection[];
  strongAnswerIncludes: string[];
  weakAnswerMisses: string[];
};

export const designScenarios: DesignScenario[] = [
  {
    slug: "shard-tweet-storage",
    system: "Sharding Tweet Storage",
    prompt: "How would you shard tweet storage for a Twitter-like service?",
    category: "Databases",
    sections: [
      {
        stage: "High-Level Design",
        content:
          "The naive approach — sharding by tweet ID using a simple hash or modulo — distributes writes evenly but breaks the most common read pattern: fetching a user's own timeline requires querying every shard, since a user's tweets are scattered randomly across all of them.\n\nA better approach shards by user ID: all of a given user's tweets live on the same shard (or a small deterministic set of shards), so 'get user's tweets' is a single-shard query.",
      },
      {
        stage: "Deep Dive & Bottlenecks",
        content:
          "The tradeoff is that very high-volume users (celebrities) can create hot shards, since their write volume is concentrated to one place.\n\nWithin a user's shard, tweets should still be indexed by a monotonically increasing, time-ordered ID (e.g. a Snowflake-style ID combining timestamp + shard + sequence) so that recent-tweets queries are a simple range scan, not a full table scan or an external sort.",
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "The 'read your following's tweets' (home timeline) problem is largely separate from sharding tweet storage itself — that's usually solved by fanout-on-write/fanout-on-read into a separate feed store, not by sharding tweet storage differently.",
      },
    ],
    strongAnswerIncludes: [
      "Explicitly rejects sharding by tweet ID alone, and explains why (scatter-gather reads)",
      "Chooses to shard by user ID (or a hash of user ID) so a user's tweets stay co-located",
      "Names the celebrity/hot-shard problem as a real tradeoff of user-based sharding, not just a footnote",
      "Uses a sortable, time-ordered ID scheme so recent tweets are a range scan",
      "Distinguishes 'storing tweets' from 'building the home timeline' as separate concerns",
    ],
    weakAnswerMisses: [
      "Shards purely by tweet ID or a random UUID with no mention of the read pattern it breaks",
      "Never considers what happens to a single very-high-follower account's write load",
      "Assumes an auto-increment integer ID without addressing multi-shard uniqueness or sortability",
      "Conflates 'sharding tweet storage' with 'building the news feed', treating them as the same problem",
    ],
  },
  {
    slug: "public-api-rate-limiter",
    system: "Public API Rate Limiter",
    prompt: "How would you design a rate limiter for a public API used by thousands of client accounts?",
    category: "Reliability & Scaling",
    sections: [
      {
        stage: "Requirements & Scope",
        content:
          "Rate limits need to be tracked per key (e.g. per API token or per user), not globally, so the natural building block is a counter keyed by (client_id, time_window) stored in a fast shared store like Redis.",
      },
      {
        stage: "High-Level Design",
        content:
          "Token bucket or sliding-window counters are the standard algorithm choices. Token bucket permits legitimate bursts — a client that was quiet then makes several calls. Fixed windows are simpler but have a boundary problem: a client can burst near the edge of two adjacent windows and effectively get 2x their limit in a short span. Sliding-window log/counter avoids that at some extra memory cost.",
      },
      {
        stage: "Deep Dive & Bottlenecks",
        content:
          "At scale, a single Redis instance becomes a bottleneck and single point of failure, so the counter store itself needs to be sharded or replicated, and you accept slightly approximate limiting (e.g. via local counters with periodic sync, or consistent hashing to route a given client's checks to the same node) rather than perfectly exact global counting.",
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "The limiter needs to fail open or closed deliberately: if the rate-limiting store is down, decide explicitly whether requests are allowed through (fail open, protects availability) or rejected (fail closed, protects the backend) — this is a product decision, not just an implementation detail.",
      },
    ],
    strongAnswerIncludes: [
      "Keys the limit per client/token, not globally",
      "Names a specific algorithm (token bucket or sliding window) and explains the fixed-window boundary-burst problem",
      "Addresses the shared-counter-store-as-bottleneck problem at scale, not just the single-node algorithm",
      "Explicitly states a fail-open vs fail-closed decision for when the rate-limit store itself is unavailable",
    ],
    weakAnswerMisses: [
      "Describes only a single-node in-memory counter with no mention of shared state across multiple API servers",
      "Picks 'fixed window' without noticing or mentioning the edge-of-window burst problem",
      "Never addresses what happens when the rate-limiting infrastructure itself fails",
      "Talks about rate limiting in the abstract without saying what happens to a rejected request",
    ],
  },
  {
    slug: "viral-post-like-counter",
    system: "Viral Post Like Counter",
    prompt: "How would you design the 'like' counter for a post that can receive millions of likes?",
    category: "Databases",
    sections: [
      {
        stage: "Requirements & Scope",
        content:
          "The core problem is a hot-row write bottleneck: incrementing a single counter column on a single database row can't sustain very high concurrent write rates, because every write serializes on that row's lock.",
      },
      {
        stage: "High-Level Design",
        content:
          "The standard fix is to not increment the row directly on every like — instead, buffer like events (e.g. into a queue or an in-memory/Redis counter) and periodically flush aggregated increments to the durable counter, trading a small amount of read-staleness for much higher write throughput.",
      },
      {
        stage: "Deep Dive & Bottlenecks",
        content:
          "You still need an underlying source of truth for whether a specific user has liked a specific post (to toggle the like button correctly and prevent double-counting) — that's a separate per-(user, post) existence check, typically a unique-constrained table or set, not derived from the aggregate counter.",
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "For the read side, the displayed count doesn't need to be perfectly real-time — showing an approximate, slightly-delayed count (refreshed every few seconds) is an acceptable and common tradeoff, since exact real-time accuracy isn't actually valuable to the end user for a vanity metric like this.",
      },
    ],
    strongAnswerIncludes: [
      "Identifies the hot-row/lock-contention problem as the actual bottleneck, not just 'it's a lot of writes'",
      "Proposes batching/buffering increments rather than writing every single like directly to the counter row",
      "Explicitly accepts eventual consistency or slight staleness on the displayed count as an intentional tradeoff",
      "Separates 'has this user liked this post' (exact, per-user state) from 'total like count' (approximate, aggregate)",
    ],
    weakAnswerMisses: [
      "Suggests 'just add a database index' as if that solves a write-contention problem",
      "Assumes the count must always be exact and real-time with no discussion of the cost of that",
      "Never separates the per-user like/unlike state from the aggregate count, risking double-counting",
      "Proposes a solution with no mention of what happens under high concurrent write load specifically",
    ],
  },
  {
    slug: "distributed-id-generator",
    system: "Distributed ID Generator",
    prompt:
      "How would you design a globally unique ID generator for a distributed system (e.g. order IDs across multiple database shards)?",
    category: "Databases",
    sections: [
      {
        stage: "Requirements & Scope",
        content:
          "A single auto-increment counter doesn't work across multiple independent database shards or nodes, since each would generate overlapping ID sequences independently.",
      },
      {
        stage: "High-Level Design",
        content:
          "The standard approach — Twitter's Snowflake being the canonical example — composes an ID from multiple parts packed into a single integer: a timestamp (so IDs are roughly time-sortable), a fixed machine/shard/worker ID (so different nodes never collide), and a per-millisecond sequence counter (so a single node can issue multiple IDs within the same millisecond without colliding with itself).",
      },
      {
        stage: "Deep Dive & Bottlenecks",
        content:
          "This makes ID generation fully local to each node — no coordination or round-trip to a central service is needed for the common case, which is what makes it scale linearly with the number of nodes.",
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "The main operational risk is clock issues: if a node's system clock moves backward (e.g. an NTP correction), it can generate a duplicate or out-of-order ID. Production implementations detect this and either wait or refuse to generate IDs until the clock catches up.",
      },
    ],
    strongAnswerIncludes: [
      "Explains why simple auto-increment breaks across multiple independent nodes/shards",
      "Describes composing the ID from timestamp + machine/worker ID + sequence number (or names Snowflake-style IDs)",
      "Notes that generation is local and uncoordinated per node, which is why it scales",
      "Raises the clock-skew / clock-moving-backward risk as a real failure mode",
    ],
    weakAnswerMisses: [
      "Proposes a central 'ID service' every node calls for the next ID, without addressing the single point of contention it reintroduces",
      "Uses random UUIDs without noting the loss of time-ordering/sortability a monotonic scheme provides",
      "Never explains how uniqueness is guaranteed across multiple machines specifically",
      "Doesn't mention clock-related edge cases at all",
    ],
  },
];
