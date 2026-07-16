export type ConceptFlashcard = {
  id: string;
  term: string;
  prompt: string;
  answer: string;
  category: string;
};

export const conceptFlashcards: ConceptFlashcard[] = [
  {
    id: "p99-latency",
    term: "p99 latency",
    prompt: "What does p99 latency mean, and why do engineers care about it more than average latency?",
    answer:
      "p99 latency is the response time below which 99% of requests complete — the slowest 1% are worse than this value. Averages hide tail behavior: a service can have a 50ms average while 1% of requests take 5 seconds, invisible in the mean but very real to users (and disproportionately to your heaviest users, who make more requests and are more likely to hit the tail). At scale, a 'rare' 1% event happens constantly — 1% of 10,000 req/sec is 100 requests per second experiencing bad latency.",
    category: "latency",
  },
  {
    id: "cap-theorem",
    term: "CAP theorem",
    prompt: "State the CAP theorem and explain what it actually forces you to choose between in practice.",
    answer:
      "A distributed data store can only guarantee two of Consistency, Availability, and Partition tolerance at once. In practice, network partitions will happen, so partition tolerance isn't really optional — the real choice is between consistency and availability during a partition: reject/delay requests until nodes agree (CP, e.g. traditional RDBMS clusters, ZooKeeper), or serve possibly-stale data to stay available (AP, e.g. Cassandra, DynamoDB). Outside a partition, most systems can be both consistent and available — CAP only bites when nodes can't talk to each other.",
    category: "consistency",
  },
  {
    id: "consistent-hashing",
    term: "Consistent hashing",
    prompt: "What problem does consistent hashing solve, and how does it work at a high level?",
    answer:
      "Naive hashing (key % N servers) means adding or removing a server reshuffles almost every key's assignment, causing a cache stampede or mass data migration. Consistent hashing maps both servers and keys onto a hash ring; each key is owned by the next server clockwise from its hash position. Adding or removing one server only remaps the keys between it and its neighbor — roughly 1/N of keys, not nearly all of them. Virtual nodes (each physical server gets many points on the ring) keep load balanced despite an uneven ring.",
    category: "scaling",
  },
  {
    id: "fanout-strategies",
    term: "Fanout-on-write vs fanout-on-read",
    prompt: "In a social feed system, what's the difference between fanout-on-write and fanout-on-read, and when would you pick each?",
    answer:
      "Fanout-on-write (push): when a user posts, you immediately write that post into every follower's precomputed feed. Reads are fast, but writes get worse the more followers a user has — a celebrity with 50M followers triggers 50M writes per post. Fanout-on-read (pull): posts are stored once, and a follower's feed is assembled at read time by merging posts from everyone they follow. Writes stay cheap, but reads get expensive for users who follow many people. Most real systems use a hybrid: fanout-on-write for normal users, fanout-on-read for high-follower accounts, merged at read time.",
    category: "fanout",
  },
  {
    id: "idempotency-key",
    term: "Idempotency key",
    prompt: "What is an idempotency key, and what problem does it solve for APIs like payments?",
    answer:
      "A client-generated unique token attached to a request that lets a server recognize retries of the same logical operation. Networks are unreliable — a client might send a 'charge $50' request, the server processes it, but the response is lost, so the client retries. Without an idempotency key, that retry becomes a second charge. With one, the server stores the result keyed by that token and, on seeing it again, returns the original result instead of re-executing the operation — converting a non-idempotent operation into one that's safe to retry.",
    category: "reliability",
  },
  {
    id: "replication-lag",
    term: "Replication lag",
    prompt: "What is replication lag, and what's a concrete bug it can cause if you route reads to replicas naively?",
    answer:
      "The delay between a write landing on the primary database and that write propagating to its read replicas. If you write on the primary and immediately read from a replica, the replica may not have applied that write yet, so you see stale data — a user updates their profile, gets redirected to a page reading from a replica, and sees their old data, looking like the save failed. Fixes include read-your-writes consistency: route a user's own reads to the primary for a short window after they write, or track a version/timestamp and wait for the replica to catch up.",
    category: "consistency",
  },
  {
    id: "token-vs-leaky-bucket",
    term: "Token bucket vs leaky bucket",
    prompt: "Compare the token bucket and leaky bucket rate-limiting algorithms — what's the practical difference in the traffic pattern each allows?",
    answer:
      "Both cap average throughput, but differ on bursts. Token bucket: tokens refill at a fixed rate up to a max capacity; a request consumes a token, and if tokens accumulated during quiet traffic, a client can burst up to the bucket's capacity all at once. Leaky bucket: requests enter a queue and are processed at a strictly fixed rate regardless of arrival pattern, smoothing bursts into constant output. Token bucket is generally preferred for APIs because it tolerates legitimate bursty usage; leaky bucket is preferred when you need strictly smoothed output to protect a downstream system that can't handle bursts at all.",
    category: "reliability",
  },
  {
    id: "backpressure",
    term: "Backpressure",
    prompt: "What is backpressure in a distributed system, and what happens if a system doesn't have any?",
    answer:
      "A mechanism for a slower downstream component to signal an upstream producer to slow down or stop, instead of silently accepting everything and falling further behind. Without it, a fast producer overwhelms a slow consumer — requests pile up in unbounded queues, memory grows until the consumer runs out of memory, or latency spirals as the queue grows, and the failure often cascades upstream as retries pile on an already-overloaded system. Concrete mechanisms: bounded queues that reject/block when full, TCP flow control, HTTP 429 responses paired with client-side backoff, or pull-based reactive-streams consumption.",
    category: "reliability",
  },
];
