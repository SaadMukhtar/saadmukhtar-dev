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
  {
    id: "cpu-bound-vs-io-bound",
    term: "CPU-bound vs I/O-bound",
    prompt: "What's the difference between a CPU-bound and an I/O-bound workload, and why does adding more threads only help one of them?",
    answer:
      "A CPU-bound workload spends most of its time doing actual computation — it's limited by how many cores are available, so more threads than cores just adds context-switching overhead without more throughput. An I/O-bound workload spends most of its time waiting on something external (disk, network, a database) — the CPU is idle during that wait, so more threads (or async I/O) let you overlap many waits at once, dramatically increasing throughput even on a single core. Misidentifying which one you have leads to the wrong fix: throwing threads at a CPU-bound problem, or CPU cores at an I/O-bound one.",
    category: "Fundamentals",
  },
  {
    id: "concurrency-vs-parallelism",
    term: "Concurrency vs parallelism",
    prompt: "What's the difference between concurrency and parallelism?",
    answer:
      "Concurrency is structuring a program to handle multiple tasks in progress at once, making progress by interleaving — on a single core, this means switching between tasks, not literally running them simultaneously. Parallelism is actually executing multiple tasks at the exact same instant, which requires multiple cores or machines. You can have concurrency without parallelism (a single-threaded event loop juggling many I/O-bound tasks), and parallelism without much concurrency (one tight computation split across cores). Concurrency is about program structure and correctness (avoiding races); parallelism is purely about throughput.",
    category: "Fundamentals",
  },
  {
    id: "stateless-services",
    term: "Stateless services",
    prompt: "Why are stateless application servers so much easier to scale horizontally than stateful ones?",
    answer:
      "A stateless service keeps no client-specific data in memory between requests — any instance can handle any request, so a load balancer can route freely and you can add or remove instances without losing anything. A stateful service (e.g. holding a session or WebSocket connection in memory) ties a client to one instance, complicating load balancing (needs sticky sessions) and making scaling riskier (removing an instance drops its state). The usual fix is pushing state out of the app server into a shared store (Redis, a database) so the app tier itself stays stateless.",
    category: "Fundamentals",
  },
  {
    id: "monolith-vs-microservices",
    term: "Monolith vs microservices",
    prompt: "What's the real tradeoff between a monolith and microservices — not just 'microservices scale better'?",
    answer:
      "A monolith is simpler to develop, test, and deploy as one unit — no network calls between components — but it forces every part of the system to scale, deploy, and use the same stack together, even if only one piece needs to. Microservices let each service scale and deploy independently, but every call that used to be a local function call becomes a network call, introducing latency, partial-failure modes, and real operational complexity (service discovery, distributed tracing, versioning between services). It's a trade of development simplicity for independent scalability — worth it when parts of the system have genuinely different load/team needs, costly when they don't.",
    category: "Fundamentals",
  },
  {
    id: "functional-partitioning",
    term: "Functional partitioning",
    prompt: "What is functional partitioning, and how is it different from sharding a database?",
    answer:
      "Functional partitioning splits a system by responsibility — the orders service, the payments service, the search service each on their own infrastructure with their own database — so different functions scale and fail independently. Sharding splits one function's data (e.g. one big orders table) across multiple identical machines by a key like user ID, purely to spread volume, not responsibility. Large systems typically do both: functional partitioning first to separate concerns into services, then sharding within a service if it individually outgrows a single database.",
    category: "Fundamentals",
  },
  {
    id: "queue-based-load-leveling",
    term: "Queue-based load leveling",
    prompt: "What problem does putting a queue between a producer and a consumer solve?",
    answer:
      "Without a queue, a burst of incoming work has to be handled the instant it arrives, forcing the consumer to be provisioned for peak load at all times. A queue absorbs the burst — producers write to it quickly and move on, while consumers pull at a sustainable, steady rate, smoothing a spiky arrival pattern into level, predictable processing. The tradeoff is added latency (work waits in the queue instead of being processed immediately) and the need to monitor the backlog, since an ever-growing queue means you're falling behind, not that the problem is solved.",
    category: "Fundamentals",
  },
  {
    id: "liveness-vs-readiness-probes",
    term: "Liveness vs readiness probes",
    prompt: "What's the difference between a liveness probe and a readiness probe, and what goes wrong if you only have one?",
    answer:
      "A liveness probe answers 'is this process still running correctly, or should it be restarted' (e.g. hasn't deadlocked). A readiness probe answers 'is this instance able to handle traffic right now' (e.g. still warming up, or a dependency is temporarily unreachable). With only a liveness check, an instance that's alive but not ready keeps receiving traffic it can't serve, causing errors. With only a readiness check, a genuinely hung process that never recovers just sits marked 'not ready' forever instead of being restarted.",
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
  {
    id: "http1-vs-http2-vs-http3",
    term: "HTTP/1.1 vs HTTP/2 vs HTTP/3",
    prompt: "What's the key improvement each of HTTP/2 and HTTP/3 made over its predecessor?",
    answer:
      "HTTP/1.1 opens one request per connection at a time (or several parallel connections as a workaround), so many small assets mean many round-trips. HTTP/2 introduced multiplexing — many requests share a single TCP connection concurrently, cutting overhead. HTTP/3 replaces TCP with QUIC (built on UDP), solving head-of-line blocking at the transport level: in HTTP/2, one lost packet stalls every multiplexed stream on that TCP connection until retransmitted, while QUIC's independent streams mean a lost packet only stalls the one stream it belongs to.",
    category: "Networking",
  },
  {
    id: "tls-handshake",
    term: "TLS handshake",
    prompt: "At a high level, what happens during a TLS handshake, and why does it add latency before any actual data is sent?",
    answer:
      "The client and server exchange supported cipher suites, the server presents its certificate (verified against a certificate authority), and both sides perform a key exchange to agree on a shared symmetric key for the session — all before a single byte of application data is sent. This costs at least one extra round-trip (TLS 1.3 reduced it to one; TLS 1.2 needed two), which is why connection reuse (keep-alive) and session resumption matter so much — paying the handshake cost once and reusing the connection avoids repeating it on every request.",
    category: "Networking",
  },
  {
    id: "reverse-proxy-vs-forward-proxy",
    term: "Reverse proxy vs forward proxy",
    prompt: "What's the difference between a forward proxy and a reverse proxy?",
    answer:
      "A forward proxy sits in front of clients and makes requests on their behalf to the wider internet — it hides the client's identity from the server (e.g. a corporate proxy, or a VPN). A reverse proxy sits in front of servers and receives requests on their behalf from clients — it hides the server's identity and internal topology, and is what load balancers, API gateways, and CDNs typically are: from the client's point of view, the reverse proxy IS the server, even though it's routing to one of many backend instances.",
    category: "Networking",
  },
  {
    id: "anycast-routing",
    term: "Anycast routing",
    prompt: "What is anycast routing, and how does it help CDNs and public DNS resolvers?",
    answer:
      "Anycast lets multiple physically distinct servers around the world share the same IP address; the network routing layer (BGP) automatically sends a client's request to whichever announced location is 'closest' by network topology, with no application-level logic involved. This is how public DNS resolvers and CDN edge networks serve a single IP globally while actually routing each user to a nearby data center — a networking-layer trick that makes 'route to the nearest server' essentially free, instead of requiring client-side geolocation logic.",
    category: "Networking",
  },
  {
    id: "nat",
    term: "NAT (Network Address Translation)",
    prompt: "What does NAT do, and why does it complicate direct peer-to-peer connections?",
    answer:
      "NAT lets many devices on a private network share a single public IP address, translating between private addresses and the one public address at the router. It complicates peer-to-peer connections because a device behind NAT has no publicly reachable address of its own — an outside peer can't simply connect to it, since incoming connections need the NAT to already have an outbound mapping to route through. This is why peer-to-peer systems (video calls, some game networking) rely on techniques like STUN/TURN or hole-punching to establish a connection through NAT, or fall back to relaying traffic through a public server entirely.",
    category: "Networking",
  },
  {
    id: "service-mesh",
    term: "Service mesh / sidecar proxy",
    prompt: "What problem does a service mesh (like Istio, using Envoy sidecars) solve for microservices?",
    answer:
      "Every service in a microservices system needs the same cross-cutting concerns — retries, timeouts, TLS between services, load balancing, observability — and implementing that consistently inside every service's own code is repetitive and easy to get inconsistent. A service mesh runs a small proxy ('sidecar') alongside each service instance that intercepts all its network traffic and handles those concerns uniformly and transparently, so individual services don't implement retry logic or mutual TLS themselves — the mesh enforces it consistently fleet-wide and gives centralized visibility into traffic between every service.",
    category: "Networking",
  },
  {
    id: "connection-pooling",
    term: "Connection pooling",
    prompt: "Why does reusing a pool of open connections matter more than it might seem?",
    answer:
      "Establishing a new TCP connection (and for HTTPS, a TLS handshake on top) has real latency and CPU cost — doing it fresh for every single request adds that overhead to every request's latency and burns server resources setting up and tearing down connections constantly. A connection pool keeps a set of already-established connections open and reuses them across requests, paying the setup cost once instead of per-request — this matters enormously for calls to databases and other backend services made very frequently, where connection setup overhead can otherwise dominate the actual request cost.",
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
  {
    id: "webhook-vs-polling",
    term: "Webhooks vs polling",
    prompt: "When integrating two systems, what's the tradeoff between having one system poll the other versus using a webhook?",
    answer:
      "Polling means the consumer repeatedly asks 'anything new?' on an interval — simple to implement on both sides, but wastes requests when nothing's changed and adds latency up to the poll interval. A webhook flips the direction: the producer calls the consumer's URL the instant an event happens, giving near-instant delivery with no wasted requests, but it requires the consumer to expose a reliably available public endpoint, and the producer now has to handle delivery failures (retries, ordering, duplicate delivery) since it's pushing rather than being asked.",
    category: "API Design",
  },
  {
    id: "hateoas",
    term: "HATEOAS",
    prompt: "What is HATEOAS, and why do most APIs that call themselves 'RESTful' actually skip it?",
    answer:
      "HATEOAS (Hypermedia as the Engine of Application State) means API responses include links describing what actions/resources are available next, so a client can navigate the API dynamically without hardcoding URL structures — similar to how a person browses a website by following links rather than memorizing URLs. Most real-world 'REST' APIs skip it because it adds real complexity (every response needs to compute and embed valid next-action links) for a benefit that mostly matters when clients are generic/unknown in advance; most API clients are written against fixed documentation anyway, so the dynamic-discovery benefit rarely justifies the cost.",
    category: "API Design",
  },
  {
    id: "bulk-batch-endpoints",
    term: "Bulk/batch endpoints",
    prompt: "Why would you add a batch endpoint (e.g. POST /users/batch) instead of just calling the single-resource endpoint many times?",
    answer:
      "Each API call pays fixed overhead — a network round-trip, TLS/connection cost, authentication checks — independent of how much actual work it does. Calling a single-item endpoint 1,000 times pays that overhead 1,000 times; a batch endpoint that accepts 1,000 items in one request pays it once, which matters enormously for clients doing bulk operations. The tradeoff is batch endpoints need their own error-handling model — deciding whether a batch is all-or-nothing or reports per-item success/failure — which is more complex than a single endpoint's simple success/fail response.",
    category: "API Design",
  },
  {
    id: "api-gateway",
    term: "API gateway",
    prompt: "What does an API gateway centralize that would otherwise be duplicated across every backend service?",
    answer:
      "An API gateway sits in front of a system's services and handles concerns that are the same for every request regardless of which backend service ultimately handles it: authentication, rate limiting, request logging, TLS termination, and routing to the correct backend service. Without a gateway, every individual service would need to implement its own auth checks and rate limiting consistently, which is repetitive and risky if one service gets it slightly wrong. The gateway is also where client-facing API versioning gets handled, decoupling the public API surface from however the backend services are actually organized internally.",
    category: "API Design",
  },
  {
    id: "optimistic-locking-etags",
    term: "Optimistic locking / ETags",
    prompt: "How does optimistic locking (e.g. via an ETag or version number) prevent two clients from silently overwriting each other's updates?",
    answer:
      "Each resource carries a version identifier (a version number or an ETag hash) that changes every time it's updated. A client that wants to update the resource must include the version it last read; the server only applies the update if that version still matches the current one, and rejects it (usually with a 409 Conflict) if someone else updated the resource in between. This lets clients read and edit concurrently without an explicit lock ('optimistic' — assuming conflicts are rare), at the cost of the client needing to handle a rejected update by re-fetching the latest version and retrying, rather than the server blocking one client while another edits.",
    category: "API Design",
  },
  {
    id: "schema-evolution",
    term: "Backward-compatible schema evolution",
    prompt: "What makes a change to an API's data schema (e.g. a protobuf message) backward-compatible versus breaking?",
    answer:
      "Adding a new optional field is backward-compatible — old clients simply ignore a field they don't know about, and new clients treat its absence as a sensible default. Removing a field, renaming it, or changing its type or meaning is breaking — old clients either fail to parse the new data or, worse, silently misinterpret it. The practical rule most schema systems (protobuf, Avro) enforce: only ever add new optional fields, never remove, rename, or repurpose an existing field, and if a field is truly obsolete, stop populating it rather than deleting its definition.",
    category: "API Design",
  },
  {
    id: "long-running-operations",
    term: "Long-running operations pattern (202 + polling)",
    prompt: "How should an API handle a request that takes minutes to complete (e.g. generating a large report), instead of holding the HTTP connection open the whole time?",
    answer:
      "Instead of blocking the request until the work finishes (risking client/proxy timeouts and tying up a connection for minutes), the API immediately returns 202 Accepted with a status URL for the operation, and the client polls that URL (or the server notifies via webhook) until it reports completion, at which point the result is fetched separately. This decouples request latency from actual work duration entirely, and survives the client disconnecting and reconnecting later, since the operation's state lives server-side, not in the original HTTP connection.",
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
  {
    id: "read-replicas-vs-write-scaling",
    term: "Read replicas vs write scaling",
    prompt: "Why don't read replicas help you scale write throughput, even though you can add as many of them as you want?",
    answer:
      "A read replica is a copy that receives and applies the same writes as the primary — it doesn't do any of the actual write work independently, it just re-executes what the primary already did. Adding more replicas adds more read capacity, but every replica still has to apply every single write, so the primary (and each replica) is still bottlenecked by however many writes per second one machine can apply. Scaling write throughput requires a fundamentally different approach — sharding the writes across multiple independent primaries, not adding more copies of one primary's data.",
    category: "Databases",
  },
  {
    id: "mvcc",
    term: "MVCC (Multi-Version Concurrency Control)",
    prompt: "What problem does MVCC solve, and how does it let readers and writers avoid blocking each other?",
    answer:
      "Without MVCC, a reader and a writer touching the same row typically need locks to avoid seeing a half-written update, which means readers can block on writers and vice versa. MVCC instead keeps multiple versions of a row: a writer creates a new version rather than overwriting the old one in place, and a reader that started before the write simply keeps seeing the version that existed at the start of its transaction. This lets reads never block writes and writes never block reads (though writers can still conflict with other writers), at the cost of needing to periodically clean up old row versions no active transaction still needs (e.g. Postgres's VACUUM).",
    category: "Databases",
  },
  {
    id: "write-ahead-log",
    term: "Write-ahead log (WAL)",
    prompt: "What is a write-ahead log, and why does writing to it before updating the actual data make the database more durable?",
    answer:
      "Before applying a change to the actual data files, the database first appends a record of that change to an append-only log on disk. If the database crashes mid-write, it can replay the WAL on restart to redo any committed changes that hadn't yet been fully applied, guaranteeing no committed transaction is lost. Appending to a sequential log is also much faster than writing to scattered locations in the main data files, so WAL is both a durability mechanism and a performance one — the durable, sequential log write can be acknowledged quickly, while the slower, random-access data-file updates happen afterward.",
    category: "Databases",
  },
  {
    id: "denormalization",
    term: "Denormalization",
    prompt: "What is denormalization, and what does it trade away in exchange for faster reads?",
    answer:
      "Normalization organizes data to avoid duplication (e.g. storing a user's name once, referenced by ID everywhere). Denormalization deliberately duplicates some of that data (e.g. storing a copy of the author's name directly on every post, instead of joining to a users table every time) to make reads faster — no join needed. The cost is write complexity and consistency risk: if a user changes their name, every duplicated copy needs updating too, and missing one silently goes stale. It's a deliberate tradeoff made when reads vastly outnumber writes and join cost is a real bottleneck, not a default choice.",
    category: "Databases",
  },
  {
    id: "composite-index-order",
    term: "Composite index column order",
    prompt: "Why does the order of columns in a composite (multi-column) index matter?",
    answer:
      "A composite index on (A, B) is physically sorted first by A, then by B within each A value — so it can efficiently serve queries filtering on A alone, or on A and B together, but not a query filtering on B alone, since B's values aren't sorted globally, only within each A group. This is why the most selective or most commonly-filtered-alone column usually goes first in a composite index, and why simply having 'an index on the right columns' isn't enough — the order has to match how the columns are actually queried.",
    category: "Databases",
  },
  {
    id: "two-phase-commit",
    term: "Two-phase commit (2PC)",
    prompt: "What problem does two-phase commit solve, and what's its biggest practical weakness?",
    answer:
      "2PC coordinates a transaction across multiple independent databases/services so that either all of them commit or all of them roll back. In the 'prepare' phase, a coordinator asks every participant to lock in and confirm it can commit; only if everyone agrees does the coordinator tell everyone to actually commit. Its biggest weakness: if the coordinator crashes after participants have prepared but before being told to commit, every participant is stuck holding locks indefinitely, unable to independently decide whether to commit or abort — exactly why many distributed systems avoid 2PC in favor of eventual consistency or saga-style compensating transactions instead.",
    category: "Databases",
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
      "They let a group of distributed nodes agree on a single value or ordering of operations even when some nodes are slow, crash, or messages are delayed or lost — for example, agreeing which node is the current leader, or the order log entries were committed in. It's hard because in an asynchronous network you can't reliably distinguish a slow node from a dead one, so a naive majority vote can produce split-brain unless the protocol carefully handles term numbers, quorums, and message ordering — exactly what Raft's leader-election-with-terms and log-replication (or Paxos's proposal/promise rounds) is built to guarantee.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "eventual-consistency",
    term: "Eventual consistency",
    prompt: "What does 'eventual consistency' actually guarantee (and not guarantee)?",
    answer:
      "It guarantees that if no new writes occur, all replicas will eventually converge to the same value — it does not guarantee when that happens, nor that reads in the meantime see any particular intermediate value. It's a much weaker guarantee than strong consistency, chosen to keep a system available and low-latency during normal operation and network partitions — the tradeoff only makes sense when your application can tolerate temporarily stale reads (a like count) rather than needing them (an account balance).",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "vector-clocks",
    term: "Vector clocks",
    prompt: "What problem do vector clocks solve when there's no single global clock to order events across machines?",
    answer:
      "Physical clocks on different machines drift and can't be perfectly synchronized, so you can't just compare timestamps to know which of two events on different machines happened first. A vector clock is a per-node counter vector that each node increments on its own events and merges with counters received from other nodes' messages, letting the system determine whether one event definitely happened before another (causally), or whether they're concurrent — without ever needing synchronized physical time. This is the mechanism many distributed databases use to detect conflicting concurrent writes rather than guessing based on wall-clock timestamps.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "gossip-protocol",
    term: "Gossip protocol",
    prompt: "How does a gossip protocol spread information (like cluster membership) across a large number of nodes without a central coordinator?",
    answer:
      "Each node periodically picks a few random peers and shares what it currently knows (e.g. which nodes are alive, recent updates); those peers do the same with their own random peers, and so on. Information spreads exponentially — like a rumor — reaching the whole cluster in only a few rounds, without any single node needing to talk to everyone or a central coordinator being involved at all. This makes gossip resilient (no single point of failure, tolerates nodes coming and going) at the cost of only eventual, not immediate, convergence.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "quorum-reads-writes",
    term: "Quorum reads/writes",
    prompt: "What does it mean for a distributed data store to require a 'quorum,' and how does R + W > N guarantee strong-ish consistency?",
    answer:
      "With N total replicas, a write is only acknowledged once it succeeds on W of them, and a read only returns once it's collected responses from R of them. If R + W > N, any read quorum and any write quorum must overlap on at least one replica, guaranteeing a read will always see the most recent acknowledged write somewhere in the replicas it consults, even without every replica being up-to-date immediately. This is a tunable middle ground between full consistency and eventual consistency — trading write latency against read latency by adjusting how W and R are split, as long as their sum still exceeds N.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "split-brain",
    term: "Split-brain",
    prompt: "What is split-brain in a distributed system, and how does a properly-designed consensus protocol prevent it?",
    answer:
      "Split-brain happens when a network partition causes two disjoint groups of nodes to each believe they're the legitimate leader/primary and both independently accept writes, leading to diverging, conflicting state. A properly-designed consensus protocol (Raft, Paxos) prevents this by requiring a leader to be confirmed by a strict majority quorum of all nodes — since two disjoint groups can't both contain a majority of the same total node count, at most one side can ever have a legitimate leader, and the minority side is forced to stop accepting writes rather than proceeding independently.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "leader-election",
    term: "Leader election",
    prompt: "Why do many distributed systems need a single elected leader, and what happens when the leader fails?",
    answer:
      "A single leader gives the system one authoritative place to make ordering decisions without needing every node to coordinate on every operation, far simpler and faster than requiring consensus for every single request. When the leader fails, the remaining nodes detect it (typically via missed heartbeats) and run an election — using a protocol like Raft — to agree on a new leader, usually preferring whichever surviving node has the most up-to-date log, so no already-committed data is lost in the handover.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "distributed-locks",
    term: "Distributed locks",
    prompt: "Why are distributed locks (e.g. using Redis) considered risky, and what specifically can go wrong?",
    answer:
      "A distributed lock is meant to guarantee only one process can hold a resource at a time, but the guarantee is only as strong as the assumptions behind it — if a process holding the lock pauses unexpectedly (a long GC pause, a slow disk write) past the lock's expiry, the lock can be released and re-acquired by another process while the first is still running and believes it holds the lock, leading to two processes both acting with exclusive access. This is why naive distributed locking is considered unsafe for correctness-critical operations without safeguards like fencing tokens, which let the resource itself reject stale operations from a process that no longer legitimately holds the lock.",
    category: "Distributed Systems & Consistency",
  },
  {
    id: "saga-pattern",
    term: "Saga pattern",
    prompt: "How does the saga pattern handle a transaction that spans multiple independent microservices, without using a distributed transaction like 2PC?",
    answer:
      "Instead of one atomic transaction across services, a saga breaks the operation into a sequence of local transactions, each in one service, with each step publishing an event that triggers the next. If a step partway through fails, the saga doesn't roll back atomically — it runs compensating transactions that explicitly undo the effects of steps that already succeeded (e.g. a 'cancel reservation' step to undo an earlier 'reserve inventory' step). This avoids 2PC's coordinator/locking problems, at the cost of needing the system designed around eventual consistency and well-defined compensating actions for every step.",
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
  {
    id: "read-through-cache",
    term: "Read-through cache",
    prompt: "How is a read-through cache different from cache-aside, and what does it simplify for the application?",
    answer:
      "In cache-aside, the application itself checks the cache, and on a miss, queries the database and writes the result back into the cache. In a read-through cache, the cache sits transparently in front of the database and handles that miss-then-populate logic itself — the application only ever talks to the cache. This simplifies application code (no manual cache-population logic scattered everywhere) at the cost of needing a cache layer smart enough to know how to fetch from the underlying store on a miss, rather than a plain key-value cache.",
    category: "Caching & Performance",
  },
  {
    id: "ttl-vs-explicit-invalidation",
    term: "TTL vs explicit invalidation",
    prompt: "What's the tradeoff between expiring cached data with a TTL versus explicitly invalidating it when the underlying data changes?",
    answer:
      "A TTL is simple to implement — set an expiry and forget it — but it means the cache is guaranteed to be wrong for some window after every underlying change, since nothing tells it to update early. Explicit invalidation keeps the cache accurate immediately, but requires finding and correctly triggering invalidation at every single code path that can change that data, which is easy to miss in a large codebase. Many systems use both together: explicit invalidation for the common, known write paths, with a TTL as a safety net that bounds how stale the cache can ever get even if an invalidation is missed.",
    category: "Caching & Performance",
  },
  {
    id: "cache-warming",
    term: "Cache warming",
    prompt: "What is cache warming, and why might a freshly deployed or restarted service need it?",
    answer:
      "A cold cache (empty, right after a restart or deploy) means the first requests for any given key all miss and fall through to the database, which can cause a painful latency/load spike right when a service comes back up. Cache warming proactively populates the cache with commonly-needed data before real traffic arrives (e.g. replaying recent popular keys, or pre-loading a known hot dataset), so the service starts serving at a reasonable hit rate immediately instead of ramping up from zero under live production load.",
    category: "Caching & Performance",
  },
  {
    id: "negative-caching",
    term: "Negative caching",
    prompt: "What is negative caching, and why is it necessary even though there's technically nothing to cache?",
    answer:
      "Negative caching means caching the fact that a lookup returned 'not found,' not just caching successful results. Without it, a request for something that doesn't exist falls through to the database on every single request, since a cache normally only stores hits — a flood of requests for non-existent keys can hammer the database just as hard as if there were no cache at all. Caching the negative result for a short TTL protects the database from that pattern, at the cost of a newly-created resource potentially appearing 'not found' for a brief window if it was checked right before it was created.",
    category: "Caching & Performance",
  },
  {
    id: "cache-control-headers",
    term: "Cache-Control headers (max-age, stale-while-revalidate)",
    prompt: "What do the max-age and stale-while-revalidate HTTP caching directives each control?",
    answer:
      "max-age tells a cache (browser or CDN) how long a response can be served directly from cache before it's considered stale and must be revalidated with the origin. stale-while-revalidate allows the cache to keep serving the stale response immediately while it revalidates in the background, rather than making the user wait for a fresh response — trading a small chance of showing slightly outdated content for consistently fast responses, since the user never has to wait on the revalidation request itself.",
    category: "Caching & Performance",
  },
  {
    id: "local-vs-distributed-cache",
    term: "In-memory (local) cache vs distributed cache",
    prompt: "What's the tradeoff between a local, in-process cache and a distributed cache like Redis shared across instances?",
    answer:
      "A local cache (just a map in application memory) is extremely fast — no network hop — but every instance has its own separate copy, so a value cached on one instance is invisible to (and can be inconsistent with) the same key on another instance, and it's wiped whenever that instance restarts. A distributed cache is shared across all instances (one consistent view, survives restarts) but costs a network round-trip per access. Many high-performance systems layer both: a small, very fast local cache in front of a shared distributed cache, accepting a bit of inter-instance staleness in exchange for avoiding the network hop on the hottest keys.",
    category: "Caching & Performance",
  },
  {
    id: "bloom-filter",
    term: "Bloom filter",
    prompt: "What is a Bloom filter, and why would a system use one before checking a cache or database?",
    answer:
      "A Bloom filter is a compact, probabilistic data structure that can tell you 'definitely not present' or 'possibly present' for a given key, using far less memory than storing the actual keys — at the cost of allowing false positives (rarely saying 'possibly present' for something that isn't) but never false negatives. Systems use one as a cheap pre-check before a more expensive lookup: if the Bloom filter says 'definitely not present,' you can skip the expensive lookup entirely, a big win when most lookups are for things that don't exist (checking whether a username is taken, or a key exists before hitting a slow on-disk index).",
    category: "Caching & Performance",
  },
  {
    id: "write-coalescing",
    term: "Write coalescing",
    prompt: "What is write coalescing, and how does it reduce load on a downstream system?",
    answer:
      "Instead of writing every single update to a value through to the downstream store immediately, write coalescing buffers rapid successive updates to the same key over a short window and only writes the final (or periodically aggregated) value downstream, collapsing many writes into one. This is the same idea behind why a viral post's like counter doesn't write to the database on every single like — many rapid updates to the same key get merged into far fewer actual writes, trading a small write-visibility delay for a large reduction in downstream write load.",
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
  {
    id: "bulkhead-pattern",
    term: "Bulkhead pattern",
    prompt: "What is the bulkhead pattern, named after ship design, and what failure does it prevent?",
    answer:
      "Just as a ship's hull is divided into separate watertight compartments so a breach in one doesn't sink the whole ship, the bulkhead pattern isolates resources (thread pools, connection pools) per dependency, so one slow or failing dependency can't exhaust resources shared across the entire application. Without bulkheads, if every outgoing call shares one thread pool, a single slow downstream dependency can occupy every thread waiting on it, starving unrelated requests to healthy dependencies of any threads at all — one bad dependency effectively takes down the whole service, not just the calls that depend on it.",
    category: "Reliability & Scaling",
  },
  {
    id: "chaos-engineering",
    term: "Chaos engineering",
    prompt: "What is chaos engineering, and why deliberately cause failures in a system that's already working?",
    answer:
      "Chaos engineering is the practice of deliberately injecting failures (killing instances, adding network latency, cutting off a dependency) into a system, often in production, to verify that the redundancy and failure-handling you believe you've built actually works under real conditions. Failure-handling code runs least often and is hardest to test realistically — a failover mechanism that's never actually been triggered by a real failure is a hypothesis, not a verified fact, and chaos engineering turns that hypothesis into evidence before a real, unplanned outage does it for you at the worst possible time.",
    category: "Reliability & Scaling",
  },
  {
    id: "blue-green-vs-canary",
    term: "Blue-green vs canary deployments",
    prompt: "What's the difference between a blue-green deployment and a canary deployment, and what does each optimize for?",
    answer:
      "Blue-green keeps two full production environments (blue = current, green = new version); once verified, traffic is switched over all at once (or instantly reverted if something's wrong) — very fast, clean rollback, but a bug only shows up once 100% of traffic hits it. Canary deployments instead route a small percentage of real traffic to the new version while most stays on the old one, gradually increasing as confidence grows — this limits the blast radius of a bad deploy to a small slice of users, at the cost of running two versions simultaneously for longer and needing traffic-splitting infrastructure.",
    category: "Reliability & Scaling",
  },
  {
    id: "health-check-autoscaling",
    term: "Health-check-based autoscaling",
    prompt: "Why is it risky to base autoscaling decisions purely on a metric like CPU usage, without factoring in health checks?",
    answer:
      "CPU usage alone can't distinguish 'healthy and legitimately busy' from 'stuck/degraded and spinning' — a service deadlocked in a retry loop might show high CPU and get scaled up, adding more broken instances instead of fixing the problem, or a service that's healthy but genuinely CPU-light under a different bottleneck might not scale up when it actually needs to. Combining health checks with load-based metrics means unhealthy instances get removed from rotation rather than counted as 'capacity,' and scaling decisions are based on whether instances can actually serve traffic, not just a proxy metric that can mislead in exactly the failure scenarios that matter most.",
    category: "Reliability & Scaling",
  },
  {
    id: "dead-letter-queue",
    term: "Dead letter queue",
    prompt: "What is a dead letter queue, and what problem does it solve for message processing systems?",
    answer:
      "When a consumer repeatedly fails to process a message (a malformed payload, a bug triggered by that specific message), naively retrying forever either blocks the queue behind that one poison message or burns resources retrying something that will never succeed. A dead letter queue is a separate holding queue that a message gets moved to after exceeding a retry limit, letting the main queue keep processing everything else unblocked, while the failed message is preserved for a human or a separate process to inspect later.",
    category: "Reliability & Scaling",
  },
  {
    id: "delivery-guarantees",
    term: "At-least-once vs exactly-once vs at-most-once delivery",
    prompt: "What do at-least-once, at-most-once, and exactly-once delivery guarantees actually mean, and which is hardest to achieve?",
    answer:
      "At-most-once means a message is delivered zero or one times — never retried, so simple but can silently lose messages on failure. At-least-once means a message is guaranteed delivered one or more times — achieved via retries, but consumers might see duplicates and must handle them (typically via idempotency). Exactly-once — delivered precisely once, no duplicates, no loss — is hardest to actually achieve in a distributed system, and in practice most systems that claim 'exactly-once' are really doing at-least-once delivery plus idempotent processing, producing the same observable effect without solving the harder underlying problem directly.",
    category: "Reliability & Scaling",
  },
  {
    id: "timeout-budgets",
    term: "Timeout budgets",
    prompt: "If a request calls through three services in sequence, why can't each one just use the same, say, 5-second timeout?",
    answer:
      "If service A calls B which calls C, and all three use a 5-second timeout independently, A might wait up to 5 seconds for B, which itself might wait up to 5 seconds for C — A's actual worst-case latency is closer to 10-15 seconds, not 5, and A's own caller (if it also has a 5-second timeout) would time out and give up long before A gets a response. A timeout budget fixes the total time allowed for the whole request chain up front, and each hop is given a shrinking fraction of whatever budget remains, so no downstream call can ever cause the whole chain to blow past the original caller's actual patience.",
    category: "Reliability & Scaling",
  },

  // Observability
  {
    id: "metrics-logs-traces",
    term: "Metrics vs logs vs traces",
    prompt: "What are the three pillars of observability, and what does each answer that the others can't?",
    answer:
      "Metrics are numeric time-series aggregated over dimensions — cheap to store, great for dashboards and alerting on trends like 'p99 latency spiked'. Logs are discrete events with rich context — expensive per event but capture the 'what happened here' detail metrics can't. Traces are causally-linked spans across services showing a single request's path — the only thing that answers 'why is THIS request slow' when the bottleneck is 3 hops away. Mature systems use all three: metrics to detect, traces to localize, logs to explain.",
    category: "Observability",
  },
  {
    id: "sli-slo-sla",
    term: "SLI vs SLO vs SLA",
    prompt: "What's the difference between an SLI, an SLO, and an SLA, and why do they get confused?",
    answer:
      "An SLI (Service Level Indicator) is a measurement — the raw signal, like 'p99 latency' or 'error rate'. An SLO (Service Level Objective) is an internal goal set on that indicator — 'p99 latency < 200ms 99.9% of the time over a rolling 30-day window'. An SLA (Service Level Agreement) is a customer-facing contract with financial or business consequences if violated — almost always looser than the internal SLO on purpose (SLO=99.9%, SLA=99.5%) so you have headroom before contract penalties trigger. They get confused because engineers say 'SLA' when they mean 'SLO', which erodes the distinction between 'we try to' and 'we owe you money if we don't'.",
    category: "Observability",
  },
  {
    id: "cardinality-cost",
    term: "High cardinality and its cost",
    prompt: "Why is 'high cardinality' the thing observability engineers most fear, and where does it usually sneak in?",
    answer:
      "Cardinality is the number of unique combinations of label/tag values on a metric. A metric with 5 labels each having 100 possible values has 100^5 = 10 billion possible series — most metric stores allocate memory and index space per unique series, so cost scales roughly linearly with cardinality. It sneaks in via user IDs, request IDs, URLs with dynamic path segments, error messages with embedded values, or 'just add this one label' decisions that combinatorially explode. The mitigation is aggressive up-front label design: bounded enum-like values as labels (region, status_code, tier), and unbounded values (user_id, url) as log/trace fields, not metric labels.",
    category: "Observability",
  },
  {
    id: "otel-identity",
    term: "OpenTelemetry metric identity",
    prompt: "In OpenTelemetry, what actually defines the 'identity' of a metric time-series, and why does getting this wrong break billing and dashboards?",
    answer:
      "A single OTel metric series is uniquely identified by the tuple of (metric name + attributes + resource attributes + instrumentation scope). If any dimension is missing from a downstream aggregation (like GROUP BY name only), points from different services or different attribute sets get collapsed into the wrong bucket — the total looks 'correct' but attribution is wrong, so billing per-tenant or per-team charts silently double-count or under-count. Correct handling means grouping over every identity dimension when aggregating, even the ones that seem 'obviously the same'.",
    category: "Observability",
  },
  {
    id: "trace-context-propagation",
    term: "Trace context propagation",
    prompt: "In distributed tracing, what actually gets passed between services, and what happens if one service drops it?",
    answer:
      "A trace context (in W3C traceparent form: version-traceId-spanId-flags) travels in HTTP headers, gRPC metadata, or message queue attributes across every hop. Each service reads the incoming context, creates a child span pointing to the parent, and forwards its own new context downstream. If any service drops or fails to propagate the context, the trace splits into two disconnected trees — you'll see the upstream half and the downstream half in your UI, but you can't answer 'what happened to this specific request' end-to-end. That gap is often the exact service you most needed to see.",
    category: "Observability",
  },

  // AI Systems
  {
    id: "continuous-batching",
    term: "Continuous batching",
    prompt: "What is continuous batching in LLM serving, and why is it dramatically better than static batching?",
    answer:
      "Static batching waits for a full batch of requests to arrive, runs them together, and returns responses once the whole batch finishes — so a fast request gets stuck behind slow ones and GPU utilization drops between batches. Continuous batching (also called iteration-level batching or in-flight batching) treats each generation step as the batching unit: as soon as one sequence in the batch finishes, its slot is filled by a new incoming request mid-batch, keeping the GPU near-100% utilized. It's the difference between shipping a bus only when full and running a bus that swaps passengers at every stop. vLLM's throughput advantage vs. naive PyTorch serving is largely from this.",
    category: "AI Systems",
  },
  {
    id: "kv-cache-paged-attention",
    term: "KV cache and paged attention",
    prompt: "What is the KV cache in LLM inference, and what problem does paged attention (vLLM) solve about it?",
    answer:
      "During autoregressive generation, each new token needs to attend to all previous tokens — recomputing key/value tensors for the whole prefix on every step is wasteful, so they're cached (the KV cache). At scale the cache dominates GPU memory. Naive allocation reserves the maximum sequence length up front per request, wasting most of it and capping concurrent request count. Paged attention (from vLLM) borrows the OS virtual-memory trick: allocate the KV cache in small fixed-size 'pages' on demand, with a mapping table per sequence. This eliminates internal fragmentation and lets you fit 2-4x more concurrent requests on the same GPU.",
    category: "AI Systems",
  },
  {
    id: "rag-chunking",
    term: "RAG chunking strategies",
    prompt: "In a RAG pipeline, what are the main ways to chunk source documents, and what's the tradeoff each is optimizing for?",
    answer:
      "Fixed-size chunks (e.g. 512 tokens with 50-token overlap) are simple and predictable but often split sentences or ideas mid-thought, hurting retrieval quality. Semantic chunking splits on paragraph or sentence boundaries — better coherence but variable chunk sizes make embedding cost harder to predict. Recursive chunking splits hierarchically (chapter → section → paragraph) preserving structure but is only useful when the source has real hierarchy. Late-chunking (embed the whole doc once, then chunk the token-level embeddings) preserves cross-chunk context but doubles compute. The right choice depends on document structure and retrieval eval — most teams start with fixed-size + overlap and only get fancier if recall metrics demand it.",
    category: "AI Systems",
  },
  {
    id: "vector-similarity-metrics",
    term: "Cosine vs dot product vs L2 for vector similarity",
    prompt: "For vector search in a RAG pipeline, when do you use cosine similarity vs dot product vs Euclidean (L2) distance?",
    answer:
      "Cosine similarity measures angle only, ignoring magnitude — best when embedding magnitudes are noisy or unrelated to semantic strength (typical for OpenAI/Anthropic embeddings). Dot product includes magnitude — faster (no normalization) and effectively identical to cosine if all vectors are pre-normalized to unit length, which most modern embedding models produce by default. L2 (Euclidean) distance is rarely used for text embeddings but appropriate when magnitude is semantically meaningful (e.g. some image embeddings). The practical answer for most LLM apps: pre-normalize once, then use dot product for speed.",
    category: "AI Systems",
  },
  {
    id: "prompt-caching",
    term: "Prompt caching",
    prompt: "What is prompt caching in an LLM API, and why does it matter for both cost and latency at scale?",
    answer:
      "Prompt caching stores the KV-cache computation of a stable prompt prefix (system prompt, few-shot examples, tool definitions) on the server side, keyed to a hash of that prefix. On subsequent requests with the same prefix, the server skips recomputing it and only processes the new user turn — cutting time-to-first-token by 50-90% on long system prompts, and reducing input token costs by up to 90% for the cached portion. The design lesson: put stable content (system prompt, few-shot, tool schemas) at the top of the prompt, and volatile content (user input, dynamic context) at the bottom — otherwise the cache never hits.",
    category: "AI Systems",
  },

  // ML Infra
  {
    id: "parallelism-types",
    term: "Data vs tensor vs pipeline parallelism",
    prompt: "In distributed training, what are data, tensor, and pipeline parallelism, and when do you use each?",
    answer:
      "Data parallelism replicates the full model on each GPU and splits the batch — simplest, works when the model fits on a single GPU, and the main scaling bottleneck is the all-reduce of gradients. Tensor parallelism splits each layer's weights across GPUs (e.g. attention heads on different devices) — needed when the model itself is too big to fit on one GPU, at the cost of heavy inter-GPU communication per layer. Pipeline parallelism splits the model by layer across GPUs, with each GPU running a stage — reduces per-GPU memory but introduces pipeline bubbles unless micro-batched. Frontier training combines all three (3D parallelism): tensor within a node, pipeline across nodes, data across whole replicas.",
    category: "ML Infra",
  },
  {
    id: "fsdp",
    term: "FSDP (Fully Sharded Data Parallel)",
    prompt: "What is FSDP, and how is it different from standard data-parallel training?",
    answer:
      "In standard data parallelism (DDP), each GPU holds a full copy of the model parameters, gradients, and optimizer state — so GPU memory caps the model size. FSDP shards all three (parameters, gradients, optimizer states) across the data-parallel group and gathers only the shards a given GPU needs for the current forward or backward step, freeing them afterward. Effect: memory per GPU drops from O(model_size) to O(model_size / N), letting you train much larger models with the same hardware. Cost: extra communication for the all-gathers, partially hidden by overlapping with compute. It's the default choice for training multi-billion parameter models on commodity GPUs.",
    category: "ML Infra",
  },
  {
    id: "mixed-precision",
    term: "Mixed precision training (fp16, bf16)",
    prompt: "What is mixed-precision training, and what's the practical difference between fp16 and bf16?",
    answer:
      "Mixed-precision keeps a master copy of weights in fp32 for numerical stability but does the forward and backward passes in a lower-precision format (fp16 or bf16) — roughly 2x throughput on modern GPUs and half the memory for activations. fp16 has more mantissa bits (higher precision) but a smaller dynamic range, requiring loss scaling to prevent gradient underflow. bf16 has the same range as fp32 but less precision — no loss scaling needed, so it's easier to train stably, at the cost of noisier gradients on very small values. Modern training on A100/H100/TPUs is almost always bf16 by default.",
    category: "ML Infra",
  },
  {
    id: "gradient-checkpointing",
    term: "Gradient checkpointing (activation recomputation)",
    prompt: "What is gradient checkpointing, and what's the tradeoff it makes to enable training larger models?",
    answer:
      "During backpropagation, computing gradients requires the activations from every layer of the forward pass — normally these are all stored in memory, which for deep models dominates GPU memory usage. Gradient checkpointing discards most intermediate activations after the forward pass and recomputes them from a small set of saved 'checkpoint' activations when the backward pass reaches them. The tradeoff is compute for memory: you pay one extra forward pass in exchange for using O(sqrt(N)) memory instead of O(N) for a model with N layers. Typical cost: ~30% slower training in exchange for fitting a 2-3x larger model on the same GPU.",
    category: "ML Infra",
  },
  {
    id: "sft-rlhf-dpo",
    term: "SFT vs RLHF vs DPO",
    prompt: "What are SFT, RLHF, and DPO, and how do they fit together in modern LLM post-training?",
    answer:
      "SFT (Supervised Fine-Tuning) trains the base model on high-quality (prompt, ideal response) pairs — cheap and effective for teaching style, format, and basic instruction-following, but limited by the quality and coverage of the labeled dataset. RLHF (Reinforcement Learning from Human Feedback) uses a reward model trained on human preference comparisons to further steer the SFT model via PPO — powerful for nuanced preferences but complex, unstable, and expensive to run. DPO (Direct Preference Optimization) mathematically bypasses the reward model and PPO loop, optimizing the same objective directly on preference pairs — simpler, more stable, and increasingly the default choice for post-training. A typical pipeline today: pretrain → SFT → DPO (or RLHF variant).",
    category: "ML Infra",
  },

  // Company Architectures
  {
    id: "bitly-architecture-overview",
    term: "URL shortener at scale (bit.ly)",
    prompt: "What's the core architecture of a URL shortener at scale, and what's the single biggest design decision?",
    answer:
      "The core pipeline is: user submits a long URL → service generates a short code (typically 6-7 characters, base62-encoded from a globally-unique ID or hash) → stored in a KV or wide-column DB keyed by short code → on read, short code is looked up (heavily cache-fronted, since the read:write ratio is ~100:1) and returned as a 301/302 redirect. The single biggest design decision is how you generate the short code: hash of the long URL (idempotent but collision-prone at scale) vs. distributed unique ID generator like Snowflake (guaranteed unique, base62 for short representation, but same URL produces different codes on repeat submissions). Most production systems pick the ID-generator route and deduplicate long-URL → short-code separately.",
    category: "Company Architectures",
    relatedScenarioSlug: "bitly-url-shortener",
  },
];
