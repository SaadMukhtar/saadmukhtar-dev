export type InterviewStage =
  | "Requirements & Scope"
  | "Back-of-Envelope Estimation"
  | "High-Level Design"
  | "Deep Dive & Bottlenecks"
  | "Trade-offs & Scaling";

export type EstimationStep = {
  id: string;
  stage: InterviewStage;
  question: string;
  whenAsked: string;
  buzzwords: string[];
  unit: string;
  expectedExponentRange: [number, number];
  derivation: string;
  explanation: string;
};

export type EstimationDrill = {
  slug: string;
  system: string;
  description: string;
  steps: EstimationStep[];
};

export const estimationDrills: EstimationDrill[] = [
  {
    slug: "instagram-photo-uploads",
    system: "Instagram photo uploads",
    description: "Derive daily volume, average QPS, peak QPS, and daily storage from scratch.",
    steps: [
      {
        id: "dau-to-photos",
        stage: "Back-of-Envelope Estimation",
        question:
          "Instagram has roughly 500M daily active users, and about 20% of them upload at least one photo per day. Roughly how many photos are uploaded per day?",
        whenAsked:
          "Usually the very first calculation in the interview — right after requirements are nailed down, before any design discussion starts.",
        buzzwords: ["DAU", "back-of-envelope", "order of magnitude"],
        unit: "photos/day",
        expectedExponentRange: [7, 9],
        derivation: "500M DAU × 20% upload rate ≈ 100M photos/day (~10^8)",
        explanation:
          "This is your baseline daily volume — everything downstream (QPS, storage) scales off this number.",
      },
      {
        id: "photos-to-avg-qps",
        stage: "Back-of-Envelope Estimation",
        question:
          "Spread evenly across a day, what's the average upload rate in photos per second?",
        whenAsked:
          "Comes right after the daily-volume number — interviewers expect you to convert a daily figure into a per-second rate without being prompted.",
        buzzwords: ["average QPS", "throughput"],
        unit: "photos/sec (avg)",
        expectedExponentRange: [2, 4],
        derivation: "100M photos ÷ 86,400 sec/day ≈ 1,160 photos/sec (~10^3)",
        explanation:
          "Average QPS tells you baseline throughput, but real traffic isn't flat — you need a peak multiplier next.",
      },
      {
        id: "avg-to-peak-qps",
        stage: "Back-of-Envelope Estimation",
        question:
          "Real traffic isn't flat — peak hours typically run 2-3x the daily average. What's the peak upload QPS?",
        whenAsked:
          "Asked immediately after average QPS — stopping at the average without adjusting for peak is a common red flag interviewers watch for.",
        buzzwords: ["peak-to-average ratio", "traffic skew", "provisioning for peak"],
        unit: "photos/sec (peak)",
        expectedExponentRange: [3, 4],
        derivation: "~1,160 avg × 2.5x peak factor ≈ 2,900 photos/sec (~10^3)",
        explanation:
          "This is the number your ingestion tier (load balancers, upload servers) actually has to be provisioned for — not the average.",
      },
      {
        id: "daily-storage",
        stage: "Back-of-Envelope Estimation",
        question:
          "Each uploaded photo averages 2MB including thumbnails/variants, and you replicate data 3x for durability. How much raw storage do you need per day, in bytes?",
        whenAsked:
          "Still part of the opening estimation block, but shifts from throughput to storage — shows you can reason about both axes of scale.",
        buzzwords: ["replication factor", "durability", "storage footprint"],
        unit: "bytes/day",
        expectedExponentRange: [13, 15],
        derivation: "100M photos × 2MB avg × 3x replication ≈ 600TB/day (~6×10^14 bytes)",
        explanation:
          "Multiply by 365 and you're deciding on cold-storage tiering within the first year — this is why photo apps push old content to cheaper storage classes.",
      },
      {
        id: "servers-needed",
        stage: "Deep Dive & Bottlenecks",
        question:
          "If each upload server can sustain about 500 requests/sec, how many upload servers do you need to handle peak load?",
        whenAsked:
          "Comes up mid-interview once you're sketching the ingestion tier — the interviewer wants to see you turn your earlier QPS number into a concrete capacity decision.",
        buzzwords: ["horizontal scaling", "capacity planning", "N+1 redundancy"],
        unit: "servers",
        expectedExponentRange: [0, 1],
        derivation:
          "2,900 peak req/sec ÷ 500 req/sec per server ≈ 6 servers (plus headroom for redundancy)",
        explanation:
          "This is the moment estimation numbers become an actual infrastructure decision — round up and add redundancy, never provision exactly at the line.",
      },
    ],
  },
  {
    slug: "url-shortener",
    system: "URL shortener",
    description: "Derive read:write skew, keyspace size, and long-term row growth from scratch.",
    steps: [
      {
        id: "write-to-read-qps",
        stage: "Back-of-Envelope Estimation",
        question:
          "A URL shortener handles 1,000 new links created per second at peak, and every short link is read (redirected) roughly 100x more often than it's created. Roughly how many redirect reads happen per second at peak?",
        whenAsked:
          "First calculation after requirements — interviewers want to see you immediately notice read:write skew, since it drives every design decision that follows.",
        buzzwords: ["read-heavy workload", "read:write ratio", "QPS"],
        unit: "reads/sec (peak)",
        expectedExponentRange: [4, 6],
        derivation: "1,000 writes/sec × 100x read:write ratio ≈ 100,000 reads/sec (~10^5)",
        explanation:
          "Read-heavy skew like this is why URL shorteners lean hard on caching — the read path, not the write path, is what you scale for.",
      },
      {
        id: "keyspace-size",
        stage: "Back-of-Envelope Estimation",
        question:
          "If each short code is 7 base62 characters (a-z, A-Z, 0-9), roughly how many unique codes are possible?",
        whenAsked:
          "A quick sanity-check right after volume estimates, before moving into schema design.",
        buzzwords: ["keyspace", "base62 encoding", "collision probability"],
        unit: "possible codes",
        expectedExponentRange: [11, 13],
        derivation: "62^7 ≈ 3.5 trillion possible codes (~3.5×10^12)",
        explanation:
          "Far more than you'll ever need — random or counter-based code generation won't realistically collide if you check for uniqueness before insert.",
      },
      {
        id: "five-year-rows",
        stage: "Back-of-Envelope Estimation",
        question:
          "At a sustained 1,000 new links/sec, roughly how many rows accumulate in the URL mapping table after 5 years?",
        whenAsked:
          "Closes out the estimation block — projecting forward in time is what tips the interviewer into asking about storage architecture next.",
        buzzwords: ["data growth projection", "table growth", "long-term scale"],
        unit: "total rows",
        expectedExponentRange: [10, 12],
        derivation: "1,000/sec × 86,400 sec/day × 365 days × 5 years ≈ 1.6×10^11 rows",
        explanation:
          "At that scale a single relational table won't hold it comfortably — now you're deciding between sharding by short-code hash or a key-value store, not whether you need one.",
      },
      {
        id: "cache-nodes-needed",
        stage: "Deep Dive & Bottlenecks",
        question:
          "Given ~100,000 peak reads/sec, if a single cache node can serve 20,000 reads/sec, how many cache nodes do you need to absorb peak read traffic?",
        whenAsked:
          "Comes up once you've proposed caching as the fix for the read-heavy skew — the interviewer wants a concrete cache tier size, not just 'add a cache'.",
        buzzwords: ["cache tier", "horizontal scaling", "cache hit ratio"],
        unit: "cache nodes",
        expectedExponentRange: [0, 1],
        derivation: "100,000 peak reads/sec ÷ 20,000 reads/sec per cache node ≈ 5 nodes (plus headroom)",
        explanation:
          "Naming an actual node count is what separates 'I'd add a cache' from a real capacity plan — always tie it back to the peak number, not the average.",
      },
    ],
  },
  {
    slug: "chat-app-fanout",
    system: "Chat app message fanout",
    description: "Derive daily message volume, average throughput, and storage from scratch.",
    steps: [
      {
        id: "dau-to-messages",
        stage: "Back-of-Envelope Estimation",
        question:
          "A messaging app has 200M daily active users, each sending an average of 40 messages per day. Roughly how many messages are sent per day?",
        whenAsked:
          "First estimation question, immediately after clarifying requirements — the interviewer is checking that you start with scale before design.",
        buzzwords: ["DAU", "message volume", "back-of-envelope"],
        unit: "messages/day",
        expectedExponentRange: [9, 10],
        derivation: "200M DAU × 40 messages/day ≈ 8 billion messages/day (~8×10^9)",
        explanation:
          "This is the write volume your message-ingestion pipeline has to sustain, before fanning out to recipients.",
      },
      {
        id: "messages-to-avg-qps",
        stage: "Back-of-Envelope Estimation",
        question: "Convert that daily volume into an average messages-per-second write rate.",
        whenAsked: "Follows directly from the daily volume — expected without prompting.",
        buzzwords: ["average QPS", "write throughput"],
        unit: "messages/sec (avg)",
        expectedExponentRange: [4, 5],
        derivation: "8B messages ÷ 86,400 sec/day ≈ 92,600 messages/sec (~9×10^4)",
        explanation:
          "Peak traffic (holidays, viral moments) can spike well above this average — provision with headroom, don't size for the mean.",
      },
      {
        id: "message-storage",
        stage: "Back-of-Envelope Estimation",
        question:
          "If the average message is 100 bytes and you store 3 copies total (sender + recipient inbox + backup replica), how much storage do you need per day, in bytes?",
        whenAsked:
          "Wraps up the opening estimation block by shifting from throughput to storage, same as in most messaging/social-feed interviews.",
        buzzwords: ["storage footprint", "replication", "per-message overhead"],
        unit: "bytes/day",
        expectedExponentRange: [11, 13],
        derivation: "8B messages × 100 bytes × 3x storage/replication ≈ 2.4×10^12 bytes/day (~2.4TB)",
        explanation:
          "Text is cheap at this scale — the real storage pressure in messaging apps comes from media attachments, not text messages.",
      },
      {
        id: "fanout-write-amplification",
        stage: "Deep Dive & Bottlenecks",
        question:
          "Given an average of 92,600 messages/sec, and each message fans out to 2 recipients on average (1:1 chats plus small group chats), roughly how many total inbox-write operations per second does the fanout layer need to sustain?",
        whenAsked:
          "Comes up once you've decided on fanout-on-write for delivering messages — the interviewer wants the write amplification made explicit, not hand-waved.",
        buzzwords: ["fanout-on-write", "write amplification", "inbox model"],
        unit: "inbox writes/sec",
        expectedExponentRange: [4, 6],
        derivation: "92,600 messages/sec × 2 recipients avg ≈ 185,000 inbox writes/sec (~1.85×10^5)",
        explanation:
          "This is exactly why high-fanout systems (group chats, social feeds) need write amplification called out explicitly — the real write load is a multiple of the raw message rate, not equal to it.",
      },
    ],
  },
  {
    slug: "video-streaming-platform",
    system: "Video streaming platform",
    description: "Derive upload storage, egress bandwidth, and sustained CDN throughput from scratch.",
    steps: [
      {
        id: "upload-storage",
        stage: "Back-of-Envelope Estimation",
        question:
          "A video platform ingests 2M hours of video uploaded per day, at an average encoded bitrate of 5 Mbps across all renditions combined. Roughly how many bytes of video are stored per day?",
        whenAsked:
          "Opening estimation question for any media platform — establishes the storage half of scale before bandwidth comes up.",
        buzzwords: ["ingest volume", "encoded bitrate", "storage footprint"],
        unit: "bytes/day",
        expectedExponentRange: [14, 16],
        derivation:
          "2M hours × 3,600 sec/hour × 5 Mbps ÷ 8 bits/byte ≈ 4.5×10^15 bytes/day (~4.5 PB/day)",
        explanation:
          "This is why video platforms invest heavily in transcoding to multiple bitrates/resolutions and aggressive cold-storage tiering for older content.",
      },
      {
        id: "egress-bandwidth",
        stage: "Back-of-Envelope Estimation",
        question:
          "If the platform serves 5 billion video views per day, each averaging 8 minutes at a streamed bitrate of 3 Mbps, roughly how much egress bandwidth (in bytes/day) does that require?",
        whenAsked:
          "Follows storage — interviewers specifically watch for candidates to separate storage scale from serving/egress scale, since they're solved by completely different systems.",
        buzzwords: ["egress bandwidth", "read-heavy", "CDN"],
        unit: "bytes/day",
        expectedExponentRange: [16, 18],
        derivation:
          "5B views × 480 sec avg × 3 Mbps ÷ 8 bits/byte ≈ 9×10^17 bytes/day (~900 PB/day)",
        explanation:
          "Egress at this scale is why video platforms rely on CDNs — serving this directly from origin storage would be both impossibly expensive and slow.",
      },
      {
        id: "sustained-cdn-throughput",
        stage: "Back-of-Envelope Estimation",
        question:
          "Given that scale of egress, roughly what average bitrate does the CDN network need to sustain continuously, in bits per second?",
        whenAsked:
          "Closes the estimation block by converting the daily egress figure into a sustained rate — the last step before design discussion begins.",
        buzzwords: ["sustained throughput", "aggregate bandwidth"],
        unit: "bits/sec",
        expectedExponentRange: [12, 14],
        derivation:
          "9×10^17 bytes/day × 8 bits/byte ÷ 86,400 sec/day ≈ 8.3×10^13 bits/sec (~83 Tbps sustained)",
        explanation:
          "That's an aggregate figure spread across hundreds of CDN edge locations worldwide — no single data center serves this alone.",
      },
      {
        id: "cdn-edge-servers",
        stage: "Trade-offs & Scaling",
        question:
          "If a single CDN edge server can sustain about 40 Gbps of egress, roughly how many edge servers (across all regions combined) does the CDN need to absorb ~83 Tbps of sustained egress?",
        whenAsked:
          "Asked once you've named the CDN as the fix for egress scale — the interviewer wants a sense of how many physical edge locations that number implies, not just the word 'CDN'.",
        buzzwords: ["edge servers", "horizontal scaling", "multi-region"],
        unit: "CDN edge servers",
        expectedExponentRange: [3, 4],
        derivation: "83,000 Gbps ÷ 40 Gbps per edge server ≈ 2,075 edge servers (spread across regions)",
        explanation:
          "This number is why only a handful of companies operate their own CDN — for everyone else, this calculation is exactly what justifies buying CDN capacity from a provider instead of building it.",
      },
    ],
  },
];
