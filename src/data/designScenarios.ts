export type ScenarioStage =
  | "Requirements & Scope"
  | "Back-of-Envelope Estimation"
  | "High-Level Design"
  | "Deep Dive & Bottlenecks"
  | "Trade-offs & Alternatives";

export type DialogTurn = {
  speaker: "interviewer" | "candidate";
  text: string;
};

export type ScenarioSection = {
  stage: ScenarioStage;
  content?: string;
  dialog?: DialogTurn[];
  diagram?: string; // Mermaid source
};

export type DesignScenario = {
  slug: string;
  system: string;
  prompt: string;
  category: string;
  company?: string; // Optional company tag (e.g. "bit.ly", "Stripe") for badge
  template?: boolean; // If true, this scenario explains the interview format itself
  status?: "real" | "stub";
  sections: ScenarioSection[];
  strongAnswerIncludes: string[];
  weakAnswerMisses: string[];
};

export const designScenarios: DesignScenario[] = [
  {
    slug: "interview-model",
    system: "The System Design Interview Model",
    prompt:
      "The 5-section template used across every scenario — what each section is for, what interviewers look for, and how to spend your ~45 minutes.",
    category: "Fundamentals",
    template: true,
    status: "real",
    sections: [
      {
        stage: "Requirements & Scope",
        content:
          "Spend ~5-7 minutes. Start by aligning with the interviewer on what problem you're actually solving. Split into two lists:\n\n**Functional requirements** — the user-visible features. Ask 'what does the system do?' Explicitly list them, then ask 'which of these are in scope for our design today?' — most interviewers deliberately overload the prompt so you have to negotiate scope.\n\n**Non-functional requirements** — the shape of the system. What's the read:write ratio? Latency target (p99, not average)? Availability target? Consistency requirements (strong vs eventual)? Geographic distribution? Estimated scale (users, requests, data)?\n\nWrite both lists on the whiteboard/screen. This is the contract for the rest of the interview.\n\n**What strong candidates do:** propose non-functional numbers even if the interviewer didn't state them ('I'll assume 100M DAU, 100:1 read:write, p99 < 200ms — sound right?'). Interviewers judge you on whether you know what numbers matter.",
      },
      {
        stage: "Back-of-Envelope Estimation",
        content:
          "Spend ~5 minutes. Derive capacity numbers from the requirements. This grounds every design decision that follows.\n\nAt minimum, compute:\n- **QPS (queries per second)** — from DAU × requests-per-user / 86400 seconds. Show peak-vs-average (usually 2-3x).\n- **Storage** — per-object size × total objects × retention.\n- **Bandwidth** — QPS × payload size.\n\nWrite the numbers. Use round approximations (10M DAU × 10 req/day = 100M req/day ≈ 1200 QPS average, ~3000 QPS peak). Interviewers don't care if it's exactly right — they care that you can order-of-magnitude reason about capacity.\n\n**What strong candidates do:** call out the surprising numbers — 'that's 10 TB of storage per year, so we can't put this on a single node.' Estimation isn't a ritual; it's what unlocks the design decisions in HLD.",
      },
      {
        stage: "High-Level Design",
        content:
          "Spend ~10-15 minutes. Draw the boxes and arrows: client, load balancer, application servers, cache, database, queues, workers. Label every arrow with what data flows on it.\n\nStart broad and coarse. Don't dive into any single box yet — the interviewer wants to see you cover the full system before going deep on any part. Draw the request path (client → LB → server → DB) and the write path if different (client → server → queue → worker → DB).\n\nName specific technologies only when they matter (e.g. 'Cassandra' vs 'a wide-column DB' — pick 'Cassandra' if you can defend it, otherwise stay generic). Interviewers punish name-dropping without justification.\n\n**What strong candidates do:** narrate the diagram as they draw — 'the read path hits the CDN first, then the application layer, then the cache, then the DB — most requests never touch the DB because the working set fits in cache.' The diagram is a communication tool, not an artifact.",
      },
      {
        stage: "Deep Dive & Bottlenecks",
        content:
          "Spend ~15 minutes. Pick 1-2 hard sub-problems from the HLD and go deep. The interviewer will steer here — 'let's talk about how you'd shard the database' or 'walk me through the write path in detail'.\n\nThis is where the interview is actually decided. Anyone can draw boxes. Strong candidates identify the real bottlenecks and propose specific, defensible solutions with tradeoffs.\n\nCommon deep-dive topics: sharding strategy, cache invalidation, consistency model choice, hot-key handling, dealing with a specific failure mode, index design, or how to bootstrap the system.\n\n**What strong candidates do:** name the tradeoff explicitly — 'the downside of this approach is X, and we accept it because Y'. Don't pretend your design is free of tradeoffs; own them.\n\n**Dialog format:** in scenarios below, this section uses an Interviewer/Candidate dialog to show how the back-and-forth actually goes.",
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "Spend ~5-7 minutes. Recap the 2-3 biggest design decisions and the alternatives you didn't pick. Show you considered them.\n\nExamples: 'I chose Cassandra over Postgres because we need horizontal write scaling and can tolerate eventual consistency on this workload. The tradeoff is losing SQL joins, which we handle by denormalizing.' Or: 'I put the queue in the write path to smooth spikes, at the cost of slightly stale reads for a few hundred ms.'\n\nEnd with what you'd do next if you had more time — 'I didn't cover monitoring, disaster recovery, or the details of the sharding rebalance — happy to go into any of those'.\n\n**What strong candidates do:** be honest about what your design does badly, not just what it does well. Nothing signals seniority like acknowledging your own tradeoffs before the interviewer asks.",
      },
    ],
    strongAnswerIncludes: [
      "Explicitly separates functional from non-functional requirements up front",
      "Derives capacity numbers before designing, not after",
      "Draws the full system before going deep on any one component",
      "Names specific tradeoffs and alternatives during deep-dive, not just the chosen path",
      "Ends by explicitly listing what wasn't covered — monitoring, DR, migration, etc.",
    ],
    weakAnswerMisses: [
      "Jumps straight to boxes-and-arrows before clarifying requirements",
      "Skips estimation entirely or does it as a token gesture disconnected from design decisions",
      "Goes too deep on one component before covering the full system",
      "Presents the design as if it has no tradeoffs, or hides tradeoffs behind vague claims",
      "Never mentions what's out of scope or what monitoring/observability would look like",
    ],
  },
  {
    slug: "bitly-url-shortener",
    system: "Design bit.ly (URL Shortener)",
    prompt:
      "Design a URL shortener at bit.ly scale — 100M new URLs/day, 10B reads/day, low-latency global redirects, 5-year retention.",
    category: "Company Architectures",
    company: "bit.ly",
    status: "real",
    sections: [
      {
        stage: "Requirements & Scope",
        content:
          "**Functional requirements:**\n- Given a long URL, return a short URL (6-7 chars).\n- Given a short URL, redirect to the original long URL (301/302).\n- Support custom aliases (`bit.ly/my-brand`).\n- Track basic analytics per link (click count, time, referrer).\n- Links expire after 5 years by default.\n\n**Explicitly out of scope for this design:**\n- User accounts, dashboards, billing (assume they exist).\n- Rich per-user analytics (aggregate only).\n- Preview pages, malware scanning.\n\n**Non-functional requirements:**\n- Read:write ratio ≈ 100:1 (a link is created once, clicked many times).\n- Redirect latency p99 < 100ms globally.\n- Availability 99.99% (redirects failing = broken web pages everywhere).\n- Eventual consistency acceptable for analytics; **strong consistency for the short-code → long-URL mapping** (otherwise a link 'randomly doesn't work').\n- 5-year retention: after 5 years, links may be reclaimed.",
      },
      {
        stage: "Back-of-Envelope Estimation",
        content:
          "**Writes:** 100M new URLs/day = ~1,200 writes/sec average, ~3,000 peak.\n\n**Reads:** 10B redirects/day = ~116,000 reads/sec average, ~250,000-350,000 peak.\n\n**Storage:**\n- 5 years × 100M/day = ~180B URLs total.\n- Each record ≈ 500 bytes (short_code + long_url + metadata + timestamps + user_id).\n- Total: 180B × 500B ≈ **90 TB** of URL records.\n- Analytics events: 10B/day × 5 years = 18T events, but only aggregated counters retained → ~5-10 TB.\n\n**Bandwidth:**\n- Reads: 116K QPS × 500B avg response ≈ 58 MB/sec globally (trivial).\n- HTTP redirect headers are small; bandwidth is not the bottleneck.\n\n**Key implications from these numbers:**\n- Single-DB storage is impossible (90 TB) → **must shard**.\n- 250K peak reads/sec on the DB is impossible → **must cache aggressively**.\n- Write rate (3K peak) is low enough that a single write-master approach works if we shard by short_code.\n- Analytics can go through an async pipeline; not on the redirect path.",
      },
      {
        stage: "High-Level Design",
        content:
          "The write path is straightforward: user submits long URL → API service generates a short code → writes to sharded KV store. The read path is aggressively cache-fronted because 99% of requests hit hot links.",
        diagram: `flowchart LR
    Client((Client))
    LB[Global Load Balancer]
    Write[Write API]
    Read[Read API]
    IDGen[ID Generator<br/>Snowflake]
    Cache[(Distributed Cache<br/>Redis)]
    DB[(Sharded KV Store<br/>Cassandra/DynamoDB)]
    Queue[[Analytics Queue<br/>Kafka]]
    Analytics[Analytics Worker]
    AnalyticsDB[(Analytics Store<br/>ClickHouse)]

    Client -->|POST /shorten| LB
    Client -->|GET /:code| LB
    LB -->|write| Write
    LB -->|read| Read
    Write -->|next_id| IDGen
    Write -->|store mapping| DB
    Read -->|lookup :code| Cache
    Cache -.miss.-> DB
    DB -.populate.-> Cache
    Read -->|emit click event| Queue
    Queue --> Analytics
    Analytics --> AnalyticsDB`,
      },
      {
        stage: "Deep Dive & Bottlenecks",
        dialog: [
          {
            speaker: "interviewer",
            text: "How are you generating the short code?",
          },
          {
            speaker: "candidate",
            text: "Two realistic options. First: hash the long URL (MD5 truncated, base62-encoded). Idempotent — same URL always maps to the same code — but has collision risk at 180B URLs, so I'd need collision detection and re-hashing which is ugly at scale.\n\nSecond: distributed unique ID generator like Snowflake, then base62-encode to 6-7 chars. Guaranteed unique by construction. Downside: same long URL submitted twice gives two different codes, so I'd need a separate dedup path (a secondary index on long_url) if the product wants that behavior.\n\nI'd go with Snowflake. Correctness beats idempotency here — and Snowflake IDs also give me time-ordered short codes which is a nice property for pagination and analytics.",
          },
          {
            speaker: "interviewer",
            text: "Fine. Let's talk about the read path. 250K QPS peak — walk me through what handles that.",
          },
          {
            speaker: "candidate",
            text: "Cache is doing 99% of the work. The read distribution is extremely long-tailed — a small percentage of links get most of the traffic (viral tweets, popular articles). I'd size the cache to hold the top ~10% of hottest links, which likely covers 95%+ of requests.\n\nCache tier is Redis clusters, geographically distributed via a global cache mesh (or use a CDN for GET redirects — Cloudflare Workers can serve 3xx responses at the edge for cached mappings, which is even better).\n\nOn cache miss: lookup in the sharded DB (shard by short_code hash), populate the cache with a short TTL (5-15 min) plus a write-through cache-population step, and return the redirect.",
          },
          {
            speaker: "interviewer",
            text: "What happens if a link goes viral and blows past your per-shard cache capacity?",
          },
          {
            speaker: "candidate",
            text: "Two things. First, the hottest links should already be in the edge cache (CDN) — they don't hit the origin at all. If it's viral enough to be a real problem, it's a cacheable static redirect and the CDN eats it.\n\nSecond, if it does reach the origin: I'd add a small in-process LRU cache on the read API servers themselves, sized for maybe 10K hottest entries. That's the tier that catches viral spikes between origin cache misses and DB queries.\n\nWhat I want to avoid is the DB shard for that specific hot key getting overwhelmed. If it's truly extreme (e.g. Super Bowl link during the ad), I'd manually replicate that key across multiple shards or promote it into a 'hot key' cache with unlimited TTL until traffic subsides.",
          },
          {
            speaker: "interviewer",
            text: "How does the analytics work?",
          },
          {
            speaker: "candidate",
            text: "Analytics is fully async — I explicitly do not want it on the redirect critical path. The read API emits a click event to Kafka after returning the redirect, with (short_code, timestamp, referrer, user_agent, country). A worker pool consumes and writes aggregated counters into a columnar store (ClickHouse or Redshift).\n\nIf the analytics pipeline is down or slow, redirects still work — we accept some data loss on the trailing edge in exchange for redirect latency stability. Analytics reads are a separate low-QPS dashboard workload against ClickHouse, not the redirect DB.",
          },
        ],
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "**Snowflake vs hash for short codes** — chose Snowflake for correctness. Cost: same URL submitted twice creates two codes unless we add a dedup index. Accepted because 99% of clients don't care.\n\n**Cassandra/DynamoDB vs Postgres for URL storage** — chose wide-column KV for horizontal write scaling and low-latency point lookups on short_code. Cost: no SQL joins, harder for ad-hoc analytics (which is why analytics has its own store). Accepted because the mapping table is a pure KV workload.\n\n**Cache TTL vs write-through** — chose short TTL (5-15 min) with cache populated on miss, rather than write-through-invalidation. Cost: brief window of stale reads if a link is deleted or updated. Accepted because URL mappings are effectively immutable — updates almost never happen.\n\n**CDN edge redirects vs origin redirects** — for the hottest tail, CDN serves 3xx responses without hitting origin at all. Cost: cache invalidation on link deletion has global latency (minutes). Accepted because it dramatically reduces origin load.\n\n**Not covered** — I didn't go into: DDoS/rate limiting on the write API, spam-URL detection, GDPR/data deletion, disaster recovery across regions, custom-alias reservation (locking a code before writing to DB to prevent race). Happy to go deeper on any.",
      },
    ],
    strongAnswerIncludes: [
      "Recognizes the 100:1 read:write ratio dictates a cache-first architecture, not just as a footnote",
      "Explicitly chooses between hash and Snowflake for short-code generation and defends the choice",
      "Names the hot-key problem for viral links and gives multi-layer mitigation (edge → in-process → shard)",
      "Puts analytics on an async pipeline off the redirect critical path",
      "Acknowledges that URL mappings are effectively immutable, which shapes cache TTL and consistency choices",
      "Lists what wasn't covered (DDoS, GDPR, DR, custom alias races) rather than pretending the design is complete",
    ],
    weakAnswerMisses: [
      "Sharding on tweet ID / random hash without addressing that read patterns dictate the shard key",
      "Puts analytics writes on the redirect critical path, adding latency and coupling failure modes",
      "No cache tier, or cache tier treated as a nice-to-have rather than the load-bearing component",
      "Ignores hot-key / viral-link problem entirely",
      "Names Cassandra, Redis, and Kafka without being able to explain why they're the right fit",
      "No mention of how custom aliases avoid collision with generated short codes",
    ],
  },
];
