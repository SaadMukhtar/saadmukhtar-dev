export type ScenarioStage =
  | "Requirements & Scope"
  | "Core Entities"
  | "API / System Interface"
  | "Back-of-Envelope Estimation"
  | "Data Flow"
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
      "The prescriptive 6-phase template — exactly what to SAY, WRITE, DEFINE, SKIP, and how to signal seniority in each phase of a ~45-minute system design interview.",
    category: "Fundamentals",
    template: true,
    status: "real",
    sections: [
      {
        stage: "Requirements & Scope",
        content:
          "**Time:** ~5 minutes.\n\n**SAY (aloud):**\n- \"Before I design anything, let me clarify what we're building.\"\n- Ask 2–3 pointed questions: \"Does the system need X? Y? Should I assume Z?\"\n- \"Any compliance or regulatory constraints (GDPR, PCI, SOC2) I should design around?\"\n\n**WRITE — Functional requirements:**\nBulleted \"Users should be able to…\" statements. **Cap at 3 core features.** Prioritize ruthlessly.\n- Example (Twitter): \"1. Users can post tweets. 2. Users can view their timeline. 3. Users can follow other users.\"\n\n**WRITE — Non-functional requirements (quantified):**\n- **Latency:** \"p99 read < 200ms\" (never \"fast\"; never averages)\n- **Availability:** \"99.99% uptime\" (four nines ≈ 52 min downtime/year)\n- **Read:write ratio:** \"~100:1 read-heavy\" (drives cache and DB choice)\n- **Consistency:** \"eventual OK for feed; strong for follow relationships\"\n- **Scale:** peak QPS, DAU/MAU if relevant\n\n**DEFINE (know these cold):**\n- **DAU / MAU** — daily / monthly active users\n- **QPS / RPS / TPS** — queries / requests / transactions per second\n- **p50 / p95 / p99** — percentile latencies; always target p99, not averages\n- **read:write ratio** — determines cache strategy and DB choice\n\n**SKIP if:** the interviewer says \"don't worry about numbers yet.\" Move on and revisit during estimation.\n\n**GOTCHA:** Don't list every feature you can think of. Interviewers punish scope bloat. Pick 3, defend the choice.\n\n**SIGNAL of seniority:** you quantify NFRs unprompted (\"I'll assume p99 < 200ms — sound right?\"). You reject fuzzy words like \"fast\" or \"at scale.\" You explicitly ask about compliance.",
      },
      {
        stage: "Core Entities",
        content:
          "**Time:** ~2 minutes.\n\n**SAY (aloud):**\n- \"Here are the core entities I'm starting with — this is a first draft, I'll refine as we design.\"\n\n**WRITE:**\nA bulleted list of 3–5 central resources (nouns).\n- Example (Twitter): `User`, `Tweet`, `Follow`\n- Example (URL shortener): `Link`, `ClickEvent`\n- Example (Uber): `Rider`, `Driver`, `Ride`, `Location`\n\n**DEFINE:**\n- **Entity** = the core resource with an identity (has an ID and a lifecycle). Almost always maps to a DB row/document.\n- **Relationship** = how entities connect (User `follows` User → many-to-many).\n\n**GOTCHA:**\n- Don't overload — 3–5 max. If you write 8 entities, the interviewer knows you haven't prioritized.\n- Don't confuse entities (things with IDs) with actions (verbs like \"post\", \"login\").\n\n**SIGNAL of seniority:** you keep it minimal and explicitly say \"this will evolve.\" You don't over-model up front. You call out relationships briefly (\"User–Follow–User is many-to-many\").",
      },
      {
        stage: "API / System Interface",
        content:
          "**Time:** ~5 minutes.\n\n**SAY (aloud):**\n- \"I'll use REST as the default — happy to swap to gRPC or GraphQL if you'd prefer.\"\n- \"The current user is derived from the auth token, not the request body — that's a security boundary.\"\n- Walk each endpoint: \"This handles functional requirement #1…\"\n\n**WRITE:**\nOne endpoint per functional requirement, using **plural resource names**.\n- `POST /v1/tweets` (body: `{ text }`)  → `Tweet`\n- `GET /v1/feed?cursor=X&limit=20` → `{ tweets: Tweet[], nextCursor }`\n- `POST /v1/users/:id/follow` → `204`\n\n**DEFINE:**\n- **REST vs gRPC vs GraphQL** — REST for standard CRUD, gRPC for internal high-throughput RPC, GraphQL when clients need flexible field selection.\n- **Idempotency key** — client-provided token so retries don't duplicate writes (payments, order creation).\n- **Cursor pagination** — for infinite scroll; never offset pagination at scale (deep offsets are slow).\n\n**GOTCHA:**\n- **Never** put `user_id` in the request body for authenticated endpoints. Auth token is the source of truth.\n- Don't hand-wave versioning — put `/v1/` in the URL from day one.\n\n**SIGNAL of seniority:** you specify request/response shapes, not just paths. You surface security boundaries (auth-derived identity). You choose REST vs gRPC deliberately with a reason.",
      },
      {
        stage: "Back-of-Envelope Estimation",
        content:
          "**Time:** ~3–5 minutes. Do this **only if** it changes design decisions. Skip generic ceremony.\n\n**SAY (aloud):**\n- \"Let me size this before choosing storage/cache.\"\n- Narrate the math out loud so the interviewer can catch errors.\n\n**COMPUTE (round to orders of magnitude):**\n- **QPS** = DAU × requests-per-user / 86,400 seconds. Show **peak (2–3x average)**.\n- **Storage** = per-object bytes × total objects × retention (5 years for durability).\n- **Bandwidth** = QPS × avg payload size.\n\n**Example (10M DAU, 10 reqs/day/user):**\n- 100M req/day ÷ 86,400 = ~1,200 QPS avg, ~3,000 QPS peak.\n- 100M × 1 KB × 5 yr = **180 TB** → can't fit on one node → **must shard**.\n\n**DEFINE (numbers to know):**\n- **RAM read** ~100 ns\n- **SSD read** ~100 µs\n- **Round-trip within a datacenter** ~500 µs\n- **US ↔ EU round-trip** ~150 ms\n- **Single mid-tier server** ~10,000 QPS\n- **Single Redis instance** ~100,000 ops/sec\n- **Kafka partition** ~10 MB/sec sustained\n\n**SKIP if:** the interviewer says \"don't focus on numbers.\" Skip the math but keep the intuition.\n\n**GOTCHA:** Don't do calculations disconnected from design. Every number should force a decision (\"180 TB → shard,\" \"3,000 QPS peak → single origin is fine with cache\").\n\n**SIGNAL of seniority:** you call out the surprising number — \"that's 10 TB/year, single-node is dead\" — and let it drive the next step.",
      },
      {
        stage: "Data Flow",
        content:
          "**Time:** ~5 minutes. **Optional** — include only if the system has a natural multi-step pipeline.\n\n**INCLUDE if:** web crawler, video ingestion, ad-click pipeline, batch analytics, log/metrics pipeline.\n**SKIP if:** simple CRUD (Twitter, URL shortener, payments API).\n\n**SAY (aloud):**\n- \"Here's the sequence of actions the system performs, end to end.\"\n\n**WRITE:**\nA numbered pipeline.\n- Example (web crawler): `1. Fetch URL → 2. Parse HTML → 3. Extract links → 4. Store content → 5. Enqueue new URLs`\n\n**GOTCHA:** Don't confuse Data Flow (pipeline stages) with High-Level Design (system topology). Data Flow is the *steps*; HLD is the *boxes*.\n\n**SIGNAL of seniority:** you name where the pipeline can fail and how each stage is idempotent / retryable.",
      },
      {
        stage: "High-Level Design",
        content:
          "**Time:** ~10–15 minutes.\n\n**SAY (aloud):**\n- \"I'll build this up endpoint by endpoint — write path first, then read.\"\n- Narrate: \"When a POST arrives, LB routes to an app server, which writes to Postgres. On the read side, we hit the cache first, then Postgres on miss.\"\n- When you notice complexity: \"I could add a cache here, but let me finish the core design first.\"\n\n**WRITE (draw):**\nBoxes and arrows for every major component:\n- Client → CDN → Load Balancer → App Servers → Cache → Database\n- Async paths → Queue → Workers → Sinks (DB, analytics store, search index)\n- **Label every arrow** with what data flows on it.\n- **Data model** written next to each database (only the columns/fields that matter).\n\n**DEFINE:**\n- **Load balancer (L4 vs L7)** — L4 = TCP-level, fast; L7 = HTTP-aware, can route by path/header.\n- **CDN** — edge cache for static content; sometimes serves dynamic (edge functions).\n- **Cache** — Redis (rich types, persistence) vs Memcached (pure KV, simpler).\n- **Queue** — Kafka (durable, replay) vs SQS (managed, simple).\n\n**GOTCHA:**\n- Don't go deep on any one box before the full system is drawn.\n- Don't name-drop tech (\"I'll use Cassandra\") without a reason (\"…because writes exceed 100K/sec and I can trade off consistency\").\n\n**SIGNAL of seniority:** you draw a **complete working system** in ~10 minutes before optimizing. You narrate as you draw. You defer optimizations explicitly (\"cache is coming, let me get the flow first\").",
      },
      {
        stage: "Deep Dive & Bottlenecks",
        content:
          "**Time:** ~10 minutes. **This is where the interview is decided.**\n\n**SAY (aloud):**\n- \"Let me identify where this won't scale.\"\n- Proactively surface bottlenecks: \"The feed fetch is O(followers) on read — for a celebrity user with 100M followers, that's 100M rows per request.\"\n- Propose 2 solutions with tradeoffs: \"Fanout-on-write pre-computes each user's feed; fanout-on-read scatter-gathers on demand. Hybrid = fanout-on-write for normal users, fanout-on-read for celebrities.\"\n\n**REVISE the diagram:**\n- Add cache tiers, sharding, replication, queues, workers as needed.\n- Show explicitly: \"I'm adding a Redis-backed feed cache here; on write, we push to followers' caches; celebrities skip this and are queried on read.\"\n\n**COMMON deep-dive topics (know one solid answer for each):**\n- Sharding strategy (hash by user_id? consistent hashing?)\n- Cache invalidation (TTL vs write-through vs pub/sub)\n- Hot-key mitigation (celebrity users, viral links, Super Bowl traffic)\n- Consistency choice (linearizable vs eventual per operation)\n- Failure modes (what if the DB goes down? what if a partition happens?)\n- Bootstrapping / cold start\n\n**DEFINE:**\n- **Fanout-on-write vs fanout-on-read** — feed materialization tradeoff.\n- **Consistent hashing** — arrange servers + keys on a ring; adding/removing a server moves only 1/N of keys.\n- **Cache stampede** — when a hot key expires and all requests hit origin at once; solved by request coalescing or probabilistic early refresh.\n\n**GOTCHA:**\n- Don't present a solution as free. Every deep-dive answer should include \"the tradeoff is X, and we accept it because Y.\"\n- Don't only respond to interviewer prompts. Senior candidates **lead** here.\n\n**SIGNAL of seniority:** you surface bottlenecks the interviewer didn't ask about. You have 2 competing solutions ready and choose one with a defended reason. You revise the diagram in real time.",
      },
      {
        stage: "Trade-offs & Alternatives",
        content:
          "**Time:** ~3–5 minutes. Recap the 2–3 biggest design decisions and the alternatives you didn't pick.\n\n**SAY (aloud):**\n- \"Let me recap the biggest tradeoffs.\"\n- For each: \"I chose X over Y because Z. The cost of this is W.\"\n\n**Example script:**\n- \"I chose Cassandra over Postgres because writes exceed 100K/sec and we can tolerate eventual consistency. The tradeoff is losing SQL joins, which we handle by denormalization.\"\n- \"I put the analytics queue *off* the redirect path so analytics failures don't degrade the user-facing service. Cost: some data loss on the trailing edge if the pipeline is down.\"\n\n**Close with what's NOT covered:**\n- \"I didn't cover monitoring, disaster recovery, GDPR data deletion, or the sharding rebalance. Happy to go into any of those.\"\n\n**GOTCHA:** Don't pretend your design is free of tradeoffs. Nothing signals junior like \"there are no downsides.\"\n\n**SIGNAL of seniority:** you volunteer what's NOT covered. You acknowledge the ugly parts of your own design before the interviewer asks.",
      },
    ],
    strongAnswerIncludes: [
      "Quantifies non-functional requirements unprompted (p99 latency, availability nines, read:write ratio)",
      "Defines core entities and API before drawing the system diagram",
      "Puts auth-derived identity (not user_id in body) in the API design",
      "Every estimation number forces a design decision (storage → sharding; QPS → cache)",
      "Draws the full system before going deep on any one component",
      "Proactively identifies bottlenecks and names two competing solutions with tradeoffs",
      "Ends by explicitly listing what wasn't covered — monitoring, DR, migration, compliance",
    ],
    weakAnswerMisses: [
      "Jumps to boxes-and-arrows without clarifying functional or non-functional requirements",
      "Uses fuzzy words like 'fast', 'at scale', 'highly available' without quantifying",
      "Puts user_id in the request body of authenticated endpoints",
      "Does estimation as a ritual disconnected from any design decision",
      "Goes deep on one component before the full system is drawn",
      "Presents solutions as if they have no downsides; hides tradeoffs behind vague claims",
      "Never mentions what's out of scope — no monitoring, DR, or compliance discussion",
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

  // Stub scenarios — placeholder shells matching HelloInterview's problem breakdowns.
  // Fill in as I study each one; reference `bitly-url-shortener` for the completed format.
  ...(
    [
      { slug: "dropbox-file-sync", system: "Dropbox / File Sync", prompt: "Cross-device file storage and sync — delta uploads, block-level dedup, conflict resolution across offline edits.", category: "Company Architectures", company: "Dropbox" },
      { slug: "yelp-local-discovery", system: "Yelp / Local Business Discovery", prompt: "Search local businesses by proximity, category, and rating with reviews and photos.", category: "Company Architectures", company: "Yelp" },
      { slug: "local-delivery-service", system: "Local Delivery Service", prompt: "On-demand delivery matching (couriers ↔ orders ↔ restaurants) with live ETA and route optimization.", category: "Company Architectures" },
      { slug: "ticketmaster-event-tickets", system: "Ticketmaster / Event Ticketing", prompt: "Handle massive concurrent demand for high-demand event tickets — reservations, queue management, seat selection.", category: "Company Architectures", company: "Ticketmaster" },
      { slug: "instagram-photo-sharing", system: "Instagram / Photo Sharing", prompt: "Photo sharing at scale — upload, feed generation, stories, discovery, notifications.", category: "Company Architectures", company: "Instagram" },
      { slug: "facebook-news-feed", system: "Facebook News Feed", prompt: "Personalized ranked feed for billions of users — fanout, ranking, real-time updates.", category: "Company Architectures", company: "Facebook" },
      { slug: "tinder-matching", system: "Tinder / Dating & Matching", prompt: "Swipe-based matching with geospatial filtering, mutual-match detection, and messaging.", category: "Company Architectures", company: "Tinder" },
      { slug: "leetcode-coding-platform", system: "LeetCode / Coding Interview Platform", prompt: "Sandboxed code execution at scale with test suites, submissions, contests, and leaderboards.", category: "Company Architectures", company: "LeetCode" },
      { slug: "whatsapp-messaging", system: "WhatsApp / Real-time Messaging", prompt: "End-to-end encrypted messaging at billions-of-users scale — presence, delivery receipts, media, group chats.", category: "Company Architectures", company: "WhatsApp" },
      { slug: "strava-fitness-tracking", system: "Strava / Fitness Activity Tracking", prompt: "GPS activity uploads, segment leaderboards, social feed, and route heatmaps at scale.", category: "Company Architectures", company: "Strava" },
      { slug: "distributed-cache", system: "Distributed Cache", prompt: "Design a distributed in-memory cache like Redis Cluster — consistent hashing, replication, eviction, cache stampede handling.", category: "Caching & Performance" },
      { slug: "rate-limiter", system: "Rate Limiter", prompt: "Design a distributed rate limiter — token bucket, sliding window, per-user vs global limits, low-latency check at every request.", category: "Reliability & Scaling" },
      { slug: "online-auction", system: "Online Auction", prompt: "Real-time bidding platform — atomic bid updates, hot-item contention, closing-second surge handling.", category: "Distributed Systems & Consistency" },
      { slug: "youtube-video-streaming", system: "YouTube / Video Streaming", prompt: "Upload, transcode, and stream video at billions-of-hours-per-day scale — CDN, adaptive bitrate, recommendations.", category: "Company Architectures", company: "YouTube" },
      { slug: "job-scheduler", system: "Distributed Job Scheduler", prompt: "Cron-at-scale — schedule, dispatch, and execute jobs across a worker fleet with retries, dedup, and observability.", category: "Distributed Systems & Consistency" },
      { slug: "facebook-live-comments", system: "Facebook Live Comments", prompt: "Real-time comment fanout for live video broadcasts with thousands to millions of concurrent viewers.", category: "Company Architectures", company: "Facebook" },
      { slug: "news-aggregator", system: "News Aggregator", prompt: "Ingest, dedupe, categorize, and rank news articles from thousands of sources with real-time delivery.", category: "Data Pipelines" },
      { slug: "price-tracking-service", system: "Price Tracking Service", prompt: "Monitor e-commerce prices at scale — periodic scraping, change detection, alert delivery.", category: "Data Pipelines" },
      { slug: "youtube-top-k", system: "YouTube Top K (Trending)", prompt: "Compute top-K trending videos in real time across billions of view events — heavy hitters, approximate counting.", category: "Advanced Topics", company: "YouTube" },
      { slug: "uber-ride-hailing", system: "Uber / Ride-Hailing", prompt: "Real-time driver-rider matching with geospatial indexing, dynamic pricing, and route optimization.", category: "Company Architectures", company: "Uber" },
      { slug: "robinhood-trading", system: "Robinhood / Trading Platform", prompt: "Real-time trading and portfolio management — order matching, price streaming, transactional consistency for balances.", category: "Company Architectures", company: "Robinhood" },
      { slug: "google-docs-collab", system: "Google Docs / Collaborative Editing", prompt: "Real-time collaborative document editing — operational transforms or CRDTs, presence, conflict-free convergence.", category: "Distributed Systems & Consistency", company: "Google" },
      { slug: "web-crawler", system: "Distributed Web Crawler", prompt: "Politely crawl billions of URLs — frontier queue, robots.txt, deduplication, adaptive rate limiting per domain.", category: "Data Pipelines" },
      { slug: "ad-click-aggregator", system: "Ad Click Aggregator", prompt: "Ingest and aggregate billions of ad-click events with exactly-once counting, fraud detection, and near-real-time reporting.", category: "Data Pipelines" },
      { slug: "facebook-post-search", system: "Facebook Post Search", prompt: "Full-text search over billions of social posts with recency, relevance, and per-user access controls.", category: "Advanced Topics", company: "Facebook" },
      { slug: "payment-system", system: "Payment System", prompt: "Design a payment platform like Stripe — idempotent charges, ledger consistency, chargebacks, and multi-currency settlement.", category: "Company Architectures", company: "Stripe" },
      { slug: "metrics-monitoring", system: "Metrics & Monitoring Platform", prompt: "Design an observability platform — high-cardinality ingestion, downsampling, alerting, SLI/SLO tracking, and query at scale.", category: "Observability" },
      { slug: "online-chess", system: "Online Chess (Real-time Multiplayer)", prompt: "Real-time turn-based multiplayer with matchmaking, ELO ranking, live spectating, and anti-cheat.", category: "Common Patterns" },
      { slug: "chatgpt-llm-platform", system: "ChatGPT / LLM Chat Platform", prompt: "Design a conversational LLM platform — request queuing, GPU orchestration, token streaming, safety filtering, cost accounting.", category: "AI Systems", company: "OpenAI" },
    ] as const
  ).map((meta) => ({
    slug: meta.slug,
    system: meta.system,
    prompt: meta.prompt,
    category: meta.category,
    company: "company" in meta ? meta.company : undefined,
    status: "stub" as const,
    sections: [
      {
        stage: "Requirements & Scope" as const,
        content:
          "**Coming soon — this scenario is queued in the pipeline.**\n\nFor the format used across every scenario, see The System Design Interview Model. For a fully-worked reference walkthrough, see Design bit.ly.\n\nAs I go through this problem I'll fill in Requirements & Scope, Core Entities, API, Estimation, HLD (with a Mermaid diagram), Deep Dive (with interviewer/candidate dialog), and Trade-offs.",
      },
    ],
    strongAnswerIncludes: [],
    weakAnswerMisses: [],
  })),
];
