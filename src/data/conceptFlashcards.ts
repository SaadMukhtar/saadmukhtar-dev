export type ConceptFlashcard = {
  id: string;
  term: string;
  prompt: string;
  answer: string;
  category: string;
  relatedScenarioSlug?: string;
};

export const conceptFlashcards: ConceptFlashcard[] = [
  // Fundamentals
  {
    id: "p99-latency",
    term: "p99 latency",
    prompt: "What does p99 latency mean, and why do engineers care about it more than average latency?",
    answer:
      "p99 latency is the response time below which 99% of requests complete — the slowest 1% are worse than this value. Averages hide tail behavior: a service can have a 50ms average while 1% of requests take 5 seconds, invisible in the mean but very real to users (and disproportionately to your heaviest users, who make more requests and are more likely to hit the tail). At scale, a 'rare' 1% event happens constantly — 1% of 10,000 req/sec is 100 requests per second experiencing bad latency.",
    category: "Fundamentals",
  },
  {
    id: "throughput-vs-latency",
    term: "Throughput vs latency",
    prompt: "What's the difference between throughput and latency, and why can optimizing one hurt the other?",
    answer:
      "Latency is how long a single request takes end-to-end; throughput is how many requests the system completes per unit time. A system can have low latency but low throughput (one request at a time, each fast), or high throughput but high latency (batching many requests together, at the cost of each one waiting longer in the batch). Batching, queuing, and buffering are classic throughput-for-latency trades — they raise total capacity by making individual requests wait, which is why systems that need both (e.g. real-time bidding) have to be careful about where batching gets introduced.",
    category: "Fundamentals",
  },
  {
    id: "vertical-vs-horizontal-scaling",
    term: "Vertical vs horizontal scaling",
    prompt: "What's the difference between vertical and horizontal scaling, and what's the practical ceiling on each?",
    answer:
      "Vertical scaling means making a single machine bigger — more CPU, RAM, faster disks. It's simple (no distributed-systems complexity) but has a hard ceiling: there's a biggest machine you can buy, and a single machine is always a single point of failure. Horizontal scaling means adding more machines and distributing load across them — it scales much further and adds redundancy, but introduces real complexity: load balancing, data partitioning, and consistency concerns that don't exist on one box. Most systems scale vertically first (cheap, fast) and horizontally once they hit that ceiling or need redundancy.",
    category: "Fundamentals",
  },
  {
    id: "availability-nines",
    term: "Availability (\"the nines\")",
    prompt: "What does '99.99% availability' actually mean in terms of downtime, and why does each additional 9 get dramatically harder?",
    answer:
      "99.99% ('four nines') means about 52 minutes of downtime per year, while 99.9% ('three nines') allows about 8.7 hours per year — a 10x jump in allowed downtime for one fewer nine. Each additional nine gets disproportionately harder because it means eliminating a whole category of failure mode previously considered acceptable: three nines tolerates occasional slow deploys and manual failover; four nines requires automated failover and zero-downtime deploys; five nines requires eliminating single points of failure almost entirely, including in your deployment and monitoring tooling itself.",
    category: "Fundamentals",
  },
  {
    id: "single-point-of-failure",
    term: "Single point of failure (SPOF)",
    prompt: "What is a single point of failure, and what's a subtle way systems reintroduce one after removing an obvious one?",
    answer:
      "A single point of failure is any one component whose failure takes down the whole system, even if everything else is redundant. The obvious form is an un-replicated database or a single application server. The subtle form: teams replicate a service but route all traffic through one load balancer, or replicate a database but have every replica depend on one shared config service, secrets store, or DNS provider — redundancy at one layer undone by a shared dependency at another. Finding SPOFs means tracing every dependency of every 'redundant' component, not just counting instances.",
    category: "Fundamentals",
  },

  // Networking
  {
    id: "dns-resolution",
    term: "DNS resolution",
    prompt: "Walk through what happens, at a high level, when a browser resolves a domain name to an IP address.",
    answer:
      "The browser checks its local cache, then the OS cache; if not found, it queries a recursive resolver (often the ISP's or a public one like 8.8.8.8). The recursive resolver walks the DNS hierarchy: asks a root server which TLD server to use (e.g. for '.com'), asks that TLD server which authoritative name server owns the domain, then asks that authoritative server for the actual IP (A/AAAA record). The result is cached at multiple levels according to the record's TTL, which is why DNS changes take time to propagate — everyone holding a cached copy waits for their TTL to expire.",
    category: "Networking",
  },
  {
    id: "tcp-vs-udp",
    term: "TCP vs UDP",
    prompt: "What's the core tradeoff between TCP and UDP, and when would you choose UDP despite it not guaranteeing delivery?",
    answer:
      "TCP guarantees ordered, reliable delivery via handshakes, acknowledgments, and retransmission, but that reliability costs latency and overhead — every lost packet triggers a wait-and-retransmit cycle. UDP sends packets with no delivery guarantee, no ordering, and no connection setup, making it much lower-latency. You choose UDP when a late or missing packet is worse than a lost one — live video/audio calls, multiplayer game state, or DNS queries, where retransmitting a stale frame after the moment has passed is pointless, and the application layer can tolerate the loss or recover faster on its own.",
    category: "Networking",
  },
  {
    id: "load-balancer-l4-vs-l7",
    term: "L4 vs L7 load balancing",
    prompt: "What's the difference between a Layer 4 and a Layer 7 load balancer, and what can an L7 balancer do that an L4 one can't?",
    answer:
      "An L4 (transport-layer) load balancer routes based on IP address and port alone — it doesn't look inside the packet, so it's very fast but content-blind. An L7 (application-layer) load balancer terminates the connection and reads the actual HTTP request — headers, cookies, URL path — so it can route '/api/*' to one service and '/static/*' to another, terminate TLS in one place, or make sticky-session decisions from a cookie. The tradeoff is L7 costs more CPU (parsing, often decrypting the request) and adds latency, but it's what makes content-based routing decisions possible at the load balancer instead of pushing that logic further downstream.",
    category: "Networking",
  },
  {
    id: "cdn",
    term: "CDN (Content Delivery Network)",
    prompt: "What problem does a CDN solve, and why doesn't it work well for highly personalized or frequently changing content?",
    answer:
      "A CDN caches content on edge servers geographically close to users, so requests are served nearby instead of round-tripping to one origin — cutting latency and offloading origin traffic. It works best for content that's the same for everyone and changes rarely: static assets, images, video segments. It works poorly for personalized responses (a user's own dashboard, real-time data) because there's nothing to cache — every response is a cache miss anyway, so you pay the CDN hop's overhead with none of the benefit, which is why personalized API responses typically bypass the CDN and hit the origin directly.",
    category: "Networking",
  },
  {
    id: "websockets-vs-polling",
    term: "WebSockets vs polling vs long-polling",
    prompt: "Compare polling, long-polling, and WebSockets for delivering real-time updates to a client — what does each actually cost?",
    answer:
      "Polling: the client repeatedly asks 'anything new?' on a fixed interval — simple, but wastes requests when nothing's changed and adds latency up to the polling interval. Long-polling: the client's request is held open by the server until there's new data or a timeout, then immediately re-requested — lower latency with fewer wasted round-trips, but still pays full HTTP overhead per update and ties up a connection while waiting. WebSockets: a single persistent, full-duplex connection stays open and the server pushes updates instantly with no per-message HTTP overhead — best latency and efficiency, at the cost of managing long-lived stateful connections, which changes how you load-balance the server tier since a client is now pinned to whichever server holds its socket.",
    category: "Networking",
  },

  // API Design
  {
    id: "idempotency-key",
    term: "Idempotency key",
    prompt: "What is an idempotency key, and what problem does it solve for APIs like payments?",
    answer:
      "A client-generated unique token attached to a request that lets a server recognize retries of the same logical operation. Networks are unreliable — a client might send a 'charge $50' request, the server processes it, but the response is lost, so the client retries. Without an idempotency key, that retry becomes a second charge. With one, the server stores the result keyed by that token and, on seeing it again, returns the original result instead of re-executing the operation — converting a non-idempotent operation into one that's safe to retry.",
    category: "API Design",
  },
  {
    id: "rest-vs-rpc-vs-graphql",
    term: "REST vs RPC vs GraphQL",
    prompt: "What's the core philosophical difference between REST, RPC, and GraphQL API styles?",
    answer:
      "REST models the API around resources and standard HTTP verbs (GET /users/123, POST /orders) — a convention that works well when your domain maps cleanly onto nouns. RPC (e.g. gRPC) models the API around actions you call directly (CreateOrder(), GetUser()), fitting imperative operations that don't map well onto resources, typically with a strict schema (protobuf) for strong typing and efficient serialization. GraphQL flips control to the client: instead of fixed endpoints, the client specifies exactly which fields it wants in one query, avoiding both REST's over-fetching and the multiple round-trips needed to assemble one view — at the cost of more server-side complexity resolving arbitrary queries efficiently.",
    category: "API Design",
  },
  {
    id: "pagination-offset-vs-cursor",
    term: "Offset vs cursor-based pagination",
    prompt: "What breaks with offset-based pagination at scale, and how does cursor-based pagination fix it?",
    answer:
      "Offset pagination (LIMIT 20 OFFSET 1000) asks the database to skip the first 1000 rows every time, getting slower as the offset grows since it still has to scan through the skipped rows. It also has a correctness bug: if rows are inserted or deleted while a user pages through, the offset shifts underneath them, skipping or duplicating results. Cursor-based pagination instead uses a pointer — typically the last-seen row's sort key/ID — and asks for 'the next 20 rows after this cursor,' which the database can satisfy with an index seek instead of a scan, and which stays correct even as new rows are added elsewhere, since the cursor is anchored to a specific row, not a position count.",
    category: "API Design",
  },
  {
    id: "api-versioning",
    term: "API versioning",
    prompt: "What are the main strategies for versioning a public API, and what's the real cost of maintaining old versions?",
    answer:
      "Common strategies: versioning in the URL path (/v1/users), in a request header, or making changes fully additive/backward-compatible (only adding optional fields, never removing or repurposing existing ones) to avoid needing a version bump at all. URL versioning is the most visible and easiest for clients to reason about, but also the easiest to abuse into maintaining many parallel API surfaces indefinitely. The real cost isn't writing v2 — every old version must keep working, so bug fixes, security patches, and infra changes all have to be tested against every still-supported version, and deprecating one means coordinating with every client depending on it, which for a public API can take years.",
    category: "API Design",
  },
  {
    id: "rate-limit-response-contract",
    term: "Rate-limit response contract",
    prompt: "What should an API actually return to a client that's been rate-limited, beyond just an error code?",
    answer:
      "A bare '429 Too Many Requests' with no other information forces the client to guess when to retry, usually leading to it hammering the API again immediately or retrying far too conservatively. A well-designed rate-limit response includes a Retry-After header telling the client exactly how long to wait, plus ideally the current limit, remaining quota, and reset time (X-RateLimit-Limit / X-RateLimit-Remaining / X-RateLimit-Reset), so well-behaved clients can throttle themselves proactively instead of only reacting after being rejected.",
    category: "API Design",
  },

  // Databases
  {
    id: "replication-lag",
    term: "Replication lag",
    prompt: "What is replication lag, and what's a concrete bug it can cause if you route reads to replicas naively?",
    answer:
      "The delay between a write landing on the primary database and that write propagating to its read replicas. If you write on the primary and immediately read from a replica, the replica may not have applied that write yet, so you see stale data — a user updates their profile, gets redirected to a page reading from a replica, and sees their old data, looking like the save failed. Fixes include read-your-writes consistency: route a user's own reads to the primary for a short window after they write, or track a version/timestamp and wait for the replica to catch up.",
    category: "Databases",
  },
  {
    id: "sql-vs-nosql",
    term: "SQL vs NoSQL",
    prompt: "What's the actual decision criterion for choosing a NoSQL database over a relational one — not just 'NoSQL scales better'?",
    answer:
      "The real criterion is your data's structure and access pattern, not raw scale — modern relational databases scale to enormous size too. Relational databases enforce a fixed schema and relational integrity (foreign keys, joins, transactions across tables), valuable when your data is genuinely relational and needs multi-row transactional guarantees. NoSQL stores trade that structure away for flexible data and horizontal partitioning that's simpler because there are no cross-shard joins or foreign keys to maintain — a good fit when your access pattern is mostly 'fetch this one document/key by ID.' Choosing NoSQL purely for 'scale' while still needing relational joins usually means re-implementing those features badly in application code.",
    category: "Databases",
  },
  {
    id: "indexing",
    term: "Database indexing",
    prompt: "How does a B-tree index actually speed up a query, and what's the cost of having one?",
    answer:
      "Without an index, finding a row means scanning every row in the table (O(n)). A B-tree index maintains a sorted tree structure mapping column values to row locations, so a lookup becomes O(log n) — a handful of comparisons instead of a full scan. The cost: every index has to be updated on every insert/update/delete to the indexed column, slowing writes, and every index consumes storage. This is why you index columns you actually filter/sort/join on frequently, not every column — an over-indexed table can have write throughput dominated by index maintenance rather than the actual data writes.",
    category: "Databases",
  },
  {
    id: "acid-vs-base",
    term: "ACID vs BASE",
    prompt: "What do ACID and BASE stand for, and what's the underlying tradeoff between them?",
    answer:
      "ACID (Atomicity, Consistency, Isolation, Durability) describes traditional relational guarantees: a transaction either fully happens or fully doesn't, the database stays valid, concurrent transactions don't interfere, and committed data survives a crash. BASE (Basically Available, Soft state, Eventual consistency) describes the looser guarantees many distributed/NoSQL systems offer instead: the system stays available during partial failures, state may be in flux, and replicas converge eventually rather than immediately. It's the same tradeoff CAP theorem describes — ACID prioritizes strict correctness at the cost of availability during faults; BASE prioritizes staying available at the cost of temporarily stale reads.",
    category: "Databases",
  },
  {
    id: "sharding",
    term: "Database sharding",
    prompt: "What is database sharding, and what's the hardest part of choosing a shard key?",
    answer:
      "Sharding splits one logical dataset across multiple independent database instances (shards), each holding a subset of the rows, so no single machine stores or serves the entire dataset. The hardest part is choosing the shard key: pick it wrong and you get 'hot shards' where one key value (an enormous customer, a viral post) concentrates disproportionate traffic on a single shard while others sit idle, or you end up needing cross-shard queries the sharding was supposed to avoid. A good shard key aligns with your actual query pattern and distributes load evenly in real-world data, not just in theory.",
    category: "Databases",
  },
  {
    id: "tweet-sharding-recall",
    term: "Sharding tweet storage",
    prompt: "What's the core problem with sharding tweet storage by tweet ID alone?",
    answer:
      "Sharding by tweet ID (or a random hash of it) distributes writes evenly, but scatters a single user's tweets randomly across every shard — so fetching 'this user's own tweets' requires querying every shard and merging results (a scatter-gather read), instead of a single fast lookup. The fix is sharding by user ID instead, so a user's tweets stay co-located on one shard.",
    category: "Databases",
    relatedScenarioSlug: "shard-tweet-storage",
  },
  {
    id: "like-counter-recall",
    term: "Viral post like counter",
    prompt: "Why can't you just increment a single database row for every like on a viral post?",
    answer:
      "A single counter column on one row can only handle one write at a time — every increment serializes on that row's lock, so at very high concurrent write rates the row itself becomes the bottleneck, not the database as a whole. The fix is to buffer like events (in memory, a queue, or Redis) and periodically flush aggregated increments to the durable counter, accepting slight read-staleness for much higher write throughput.",
    category: "Databases",
    relatedScenarioSlug: "viral-post-like-counter",
  },
  {
    id: "id-generator-recall",
    term: "Distributed ID generation",
    prompt: "Why does a simple auto-increment ID break once you have multiple independent database shards?",
    answer:
      "Each shard's auto-increment counter only knows about writes on that shard — two shards would independently generate the same next ID, causing collisions once IDs need to be globally unique. The standard fix (Snowflake-style IDs) composes an ID from a timestamp, a machine/shard ID, and a per-millisecond sequence, so every node generates unique, roughly time-ordered IDs entirely on its own, with no coordination needed.",
    category: "Databases",
    relatedScenarioSlug: "distributed-id-generator",
  },

  // Distributed Systems & Consistency
  {
    id: "cap-theorem",
    term: "CAP theorem",
    prompt: "State the CAP theorem and explain what it actually forces you to choose between in practice.",
    answer:
      "A distributed data store can only guarantee two of Consistency, Availability, and Partition tolerance at once. In practice, network partitions will happen, so partition tolerance isn't really optional — the real choice is between consistency and availability during a partition: reject/delay requests until nodes agree (CP, e.g. traditional RDBMS clusters, ZooKeeper), or serve possibly-stale data to stay available (AP, e.g. Cassandra, DynamoDB). Outside a partition, most systems can be both consistent and available — CAP only bites when nodes can't talk to each other.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "consistent-hashing",
    term: "Consistent hashing",
    prompt: "What problem does consistent hashing solve, and how does it work at a high level?",
    answer:
      "Naive hashing (key % N servers) means adding or removing a server reshuffles almost every key's assignment, causing a cache stampede or mass data migration. Consistent hashing maps both servers and keys onto a hash ring; each key is owned by the next server clockwise from its hash position. Adding or removing one server only remaps the keys between it and its neighbor — roughly 1/N of keys, not nearly all of them. Virtual nodes (each physical server gets many points on the ring) keep load balanced despite an uneven ring.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "fanout-strategies",
    term: "Fanout-on-write vs fanout-on-read",
    prompt: "In a social feed system, what's the difference between fanout-on-write and fanout-on-read, and when would you pick each?",
    answer:
      "Fanout-on-write (push): when a user posts, you immediately write that post into every follower's precomputed feed. Reads are fast, but writes get worse the more followers a user has — a celebrity with 50M followers triggers 50M writes per post. Fanout-on-read (pull): posts are stored once, and a follower's feed is assembled at read time by merging posts from everyone they follow. Writes stay cheap, but reads get expensive for users who follow many people. Most real systems use a hybrid: fanout-on-write for normal users, fanout-on-read for high-follower accounts, merged at read time.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "consensus-algorithms",
    term: "Consensus algorithms (Paxos/Raft)",
    prompt: "What problem do consensus algorithms like Paxos or Raft actually solve, in one sentence, and why is it hard?",
    answer:
      "They let a group of distributed nodes agree on a single value or ordering of operations even when some nodes are slow, crash, or messages are delayed or lost — for example, agreeing which node is the current leader, or the order log entries were committed in. It's hard because in an asynchronous network you can't reliably distinguish a slow node from a dead one, so a naive majority vote can produce split-brain (two nodes both think they're the leader) unless the protocol carefully handles term numbers, quorums, and message ordering — exactly what Raft's leader-election-with-terms and log-replication (or Paxos's proposal/promise rounds) is built to guarantee.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "eventual-consistency",
    term: "Eventual consistency",
    prompt: "What does 'eventual consistency' actually guarantee (and not guarantee)?",
    answer:
      "It guarantees that if no new writes occur, all replicas will eventually converge to the same value — it does not guarantee when that happens, nor that reads in the meantime see any particular intermediate value (you might read old data, or see values arrive out of the order they were written, depending on the system). It's a much weaker guarantee than strong consistency, chosen to keep a system available and low-latency during normal operation and network partitions — the tradeoff only makes sense when your application can tolerate temporarily stale reads (a like count) rather than needing them (an account balance).",
    category: "Distributed Systems & Consistency",
  },

  // Caching & Performance
  {
    id: "cache-strategies",
    term: "Cache-aside vs write-through vs write-back",
    prompt: "Compare cache-aside, write-through, and write-back caching strategies — what does each optimize for?",
    answer:
      "Cache-aside: the application checks the cache first, and on a miss reads from the database and populates the cache itself — simple and resilient (cache failure just means more DB reads), but can stay stale until the next miss triggers a refresh. Write-through: every write goes to the cache and the database synchronously together, so the cache is never stale, but every write pays the latency of both — no throughput win on writes. Write-back: writes go to the cache immediately and are asynchronously flushed to the database later, giving the fastest write latency, but with real risk of data loss if the cache fails before the flush happens — trading durability for write speed.",
    category: "Caching & Performance",
  },
  {
    id: "cache-invalidation",
    term: "Cache invalidation",
    prompt: "Why is cache invalidation considered one of the two genuinely hard problems in computer science?",
    answer:
      "Because there's no generically correct answer to 'when is this cached value stale enough to remove' — invalidate too aggressively and you lose most of the caching benefit (constant misses); invalidate too lazily and users see stale data with no clear bound on how stale. Doing it correctly requires either tracking every place that could change the underlying data and explicitly evicting/updating the cache entry at write time (correct but easy to miss a code path), or accepting a TTL-based expiry (simple but always wrong for some window after every underlying change) — there's no free option, only different downsides.",
    category: "Caching & Performance",
  },
  {
    id: "cache-stampede",
    term: "Cache stampede (thundering herd)",
    prompt: "What is a cache stampede, and what's a simple way to prevent one?",
    answer:
      "A cache stampede happens when a popular cached value expires and many concurrent requests all miss the cache at the same instant, all falling through to the database simultaneously to recompute the same value — which can overwhelm the database the cache was supposed to protect. A simple mitigation: only the first request that misses actually recomputes the value (using a lock or a 'currently being refreshed' marker), while other concurrent requests either wait briefly for that result or serve the slightly-stale value until the refresh completes, instead of every request racing to hit the database independently.",
    category: "Caching & Performance",
  },
  {
    id: "lru-vs-lfu",
    term: "LRU vs LFU eviction",
    prompt: "What's the difference between LRU and LFU cache eviction, and when does LRU get it wrong?",
    answer:
      "LRU (Least Recently Used) evicts whichever entry hasn't been accessed in the longest time; LFU (Least Frequently Used) evicts whichever entry has been accessed the fewest total times. LRU gets it wrong for something accessed very frequently but with an occasional gap — a burst of unrelated one-off requests can evict a genuinely hot item just because it hasn't been touched in the last few seconds. LFU handles that better since frequency is a longer memory than recency, but has its own failure mode: an item that was extremely popular once but is no longer relevant can stay stuck in the cache indefinitely on historical count, crowding out newly-popular items.",
    category: "Caching & Performance",
  },

  // Reliability & Scaling
  {
    id: "token-vs-leaky-bucket",
    term: "Token bucket vs leaky bucket",
    prompt: "Compare the token bucket and leaky bucket rate-limiting algorithms — what's the practical difference in the traffic pattern each allows?",
    answer:
      "Both cap average throughput, but differ on bursts. Token bucket: tokens refill at a fixed rate up to a max capacity; a request consumes a token, and if tokens accumulated during quiet traffic, a client can burst up to the bucket's capacity all at once. Leaky bucket: requests enter a queue and are processed at a strictly fixed rate regardless of arrival pattern, smoothing bursts into constant output. Token bucket is generally preferred for APIs because it tolerates legitimate bursty usage; leaky bucket is preferred when you need strictly smoothed output to protect a downstream system that can't handle bursts at all.",
    category: "Reliability & Scaling",
  },
  {
    id: "backpressure",
    term: "Backpressure",
    prompt: "What is backpressure in a distributed system, and what happens if a system doesn't have any?",
    answer:
      "A mechanism for a slower downstream component to signal an upstream producer to slow down or stop, instead of silently accepting everything and falling further behind. Without it, a fast producer overwhelms a slow consumer — requests pile up in unbounded queues, memory grows until the consumer runs out of memory, or latency spirals as the queue grows, and the failure often cascades upstream as retries pile on an already-overloaded system. Concrete mechanisms: bounded queues that reject/block when full, TCP flow control, HTTP 429 responses paired with client-side backoff, or pull-based reactive-streams consumption.",
    category: "Reliability & Scaling",
  },
  {
    id: "circuit-breaker",
    term: "Circuit breaker pattern",
    prompt: "What does a circuit breaker do in a distributed system, and what problem does it prevent that a plain timeout doesn't?",
    answer:
      "A circuit breaker wraps calls to a dependency and tracks its recent failure rate; once failures cross a threshold, it 'trips open' and immediately fails subsequent calls locally (without attempting the network call) for a cooldown period, before letting a few trial requests through to check for recovery. A plain timeout still means every caller pays the full timeout on every failed call and keeps hammering the dependency with retries — at scale that can be enough load to prevent it from ever recovering, and ties up caller resources waiting on doomed requests. The circuit breaker stops calling a known-broken dependency altogether for a while, protecting the caller and giving the dependency room to recover.",
    category: "Reliability & Scaling",
  },
  {
    id: "graceful-degradation",
    term: "Graceful degradation",
    prompt: "What is graceful degradation, and what's a concrete example of a system doing it well?",
    answer:
      "A system keeps serving a reduced but still useful experience when a dependency fails, instead of failing the entire request. Concrete example: an e-commerce product page whose 'related products' section depends on a recommendation service — if that service is down or slow, a well-designed page serves the core product info (price, add-to-cart) immediately and simply omits the recommendations section, rather than failing the whole page load because one non-critical dependency timed out. Doing this well requires explicitly identifying which parts of a response are essential versus optional ahead of time, not discovering it during an incident.",
    category: "Reliability & Scaling",
  },
  {
    id: "retry-backoff-jitter",
    term: "Exponential backoff with jitter",
    prompt: "Why do retries need exponential backoff, and why does backoff alone still cause problems without jitter?",
    answer:
      "If a client retries a failed request immediately, and the failure was caused by the dependency being overloaded, an immediate retry just adds to the load that caused the failure — exponential backoff (waiting 1s, then 2s, then 4s, etc.) gives the dependency increasing room to recover. But if many clients all failed at the same moment and all back off on the same schedule, they all retry again at the exact same instant, recreating a synchronized load spike — jitter (adding a small random amount to each wait) spreads retries out over time instead of letting them re-synchronize into another thundering herd.",
    category: "Reliability & Scaling",
  },
  {
    id: "rate-limiter-recall",
    term: "Rate limiter window boundaries",
    prompt: "Why do naive fixed-window rate limiters have a burst problem at window boundaries?",
    answer:
      "A fixed window (e.g. 'max 100 requests per minute, reset every :00') resets its counter at a hard boundary, so a client can send 100 requests in the last second of one window and another 100 in the first second of the next — 200 requests in about 2 seconds, well above the intended rate, while technically staying within each window's individual limit. Sliding-window or token-bucket approaches avoid this since they have no hard reset point a client can exploit.",
    category: "Reliability & Scaling",
    relatedScenarioSlug: "public-api-rate-limiter",
  },
];
