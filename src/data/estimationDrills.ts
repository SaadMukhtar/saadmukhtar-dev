export type EstimationStep = {
  id: string;
  question: string;
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
        question:
          "Instagram has roughly 500M daily active users, and about 20% of them upload at least one photo per day. Roughly how many photos are uploaded per day?",
        unit: "photos/day",
        expectedExponentRange: [7, 9],
        derivation: "500M DAU × 20% upload rate ≈ 100M photos/day (~10^8)",
        explanation:
          "This is your baseline daily volume — everything downstream (QPS, storage) scales off this number.",
      },
      {
        id: "photos-to-avg-qps",
        question:
          "Spread evenly across a day, what's the average upload rate in photos per second?",
        unit: "photos/sec (avg)",
        expectedExponentRange: [2, 4],
        derivation: "100M photos ÷ 86,400 sec/day ≈ 1,160 photos/sec (~10^3)",
        explanation:
          "Average QPS tells you baseline throughput, but real traffic isn't flat — you need a peak multiplier next.",
      },
      {
        id: "avg-to-peak-qps",
        question:
          "Real traffic isn't flat — peak hours typically run 2-3x the daily average. What's the peak upload QPS?",
        unit: "photos/sec (peak)",
        expectedExponentRange: [3, 4],
        derivation: "~1,160 avg × 2.5x peak factor ≈ 2,900 photos/sec (~10^3)",
        explanation:
          "This is the number your ingestion tier (load balancers, upload servers) actually has to be provisioned for — not the average.",
      },
      {
        id: "daily-storage",
        question:
          "Each uploaded photo averages 2MB including thumbnails/variants, and you replicate data 3x for durability. How much raw storage do you need per day, in bytes?",
        unit: "bytes/day",
        expectedExponentRange: [13, 15],
        derivation: "100M photos × 2MB avg × 3x replication ≈ 600TB/day (~6×10^14 bytes)",
        explanation:
          "Multiply by 365 and you're deciding on cold-storage tiering within the first year — this is why photo apps push old content to cheaper storage classes.",
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
        question:
          "A URL shortener handles 1,000 new links created per second at peak, and every short link is read (redirected) roughly 100x more often than it's created. Roughly how many redirect reads happen per second at peak?",
        unit: "reads/sec (peak)",
        expectedExponentRange: [4, 6],
        derivation: "1,000 writes/sec × 100x read:write ratio ≈ 100,000 reads/sec (~10^5)",
        explanation:
          "Read-heavy skew like this is why URL shorteners lean hard on caching — the read path, not the write path, is what you scale for.",
      },
      {
        id: "keyspace-size",
        question:
          "If each short code is 7 base62 characters (a-z, A-Z, 0-9), roughly how many unique codes are possible?",
        unit: "possible codes",
        expectedExponentRange: [11, 13],
        derivation: "62^7 ≈ 3.5 trillion possible codes (~3.5×10^12)",
        explanation:
          "Far more than you'll ever need — random or counter-based code generation won't realistically collide if you check for uniqueness before insert.",
      },
      {
        id: "five-year-rows",
        question:
          "At a sustained 1,000 new links/sec, roughly how many rows accumulate in the URL mapping table after 5 years?",
        unit: "total rows",
        expectedExponentRange: [10, 12],
        derivation: "1,000/sec × 86,400 sec/day × 365 days × 5 years ≈ 1.6×10^11 rows",
        explanation:
          "At that scale a single relational table won't hold it comfortably — now you're deciding between sharding by short-code hash or a key-value store, not whether you need one.",
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
        question:
          "A messaging app has 200M daily active users, each sending an average of 40 messages per day. Roughly how many messages are sent per day?",
        unit: "messages/day",
        expectedExponentRange: [9, 10],
        derivation: "200M DAU × 40 messages/day ≈ 8 billion messages/day (~8×10^9)",
        explanation:
          "This is the write volume your message-ingestion pipeline has to sustain, before fanning out to recipients.",
      },
      {
        id: "messages-to-avg-qps",
        question: "Convert that daily volume into an average messages-per-second write rate.",
        unit: "messages/sec (avg)",
        expectedExponentRange: [4, 5],
        derivation: "8B messages ÷ 86,400 sec/day ≈ 92,600 messages/sec (~9×10^4)",
        explanation:
          "Peak traffic (holidays, viral moments) can spike well above this average — provision with headroom, don't size for the mean.",
      },
      {
        id: "message-storage",
        question:
          "If the average message is 100 bytes and you store 3 copies total (sender + recipient inbox + backup replica), how much storage do you need per day, in bytes?",
        unit: "bytes/day",
        expectedExponentRange: [11, 13],
        derivation: "8B messages × 100 bytes × 3x storage/replication ≈ 2.4×10^12 bytes/day (~2.4TB)",
        explanation:
          "Text is cheap at this scale — the real storage pressure in messaging apps comes from media attachments, not text messages.",
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
        question:
          "A video platform ingests 2M hours of video uploaded per day, at an average encoded bitrate of 5 Mbps across all renditions combined. Roughly how many bytes of video are stored per day?",
        unit: "bytes/day",
        expectedExponentRange: [14, 16],
        derivation:
          "2M hours × 3,600 sec/hour × 5 Mbps ÷ 8 bits/byte ≈ 4.5×10^15 bytes/day (~4.5 PB/day)",
        explanation:
          "This is why video platforms invest heavily in transcoding to multiple bitrates/resolutions and aggressive cold-storage tiering for older content.",
      },
      {
        id: "egress-bandwidth",
        question:
          "If the platform serves 5 billion video views per day, each averaging 8 minutes at a streamed bitrate of 3 Mbps, roughly how much egress bandwidth (in bytes/day) does that require?",
        unit: "bytes/day",
        expectedExponentRange: [16, 18],
        derivation:
          "5B views × 480 sec avg × 3 Mbps ÷ 8 bits/byte ≈ 9×10^17 bytes/day (~900 PB/day)",
        explanation:
          "Egress at this scale is why video platforms rely on CDNs — serving this directly from origin storage would be both impossibly expensive and slow.",
      },
      {
        id: "sustained-cdn-throughput",
        question:
          "Given that scale of egress, roughly what average bitrate does the CDN network need to sustain continuously, in bits per second?",
        unit: "bits/sec",
        expectedExponentRange: [12, 14],
        derivation:
          "9×10^17 bytes/day × 8 bits/byte ÷ 86,400 sec/day ≈ 8.3×10^13 bits/sec (~83 Tbps sustained)",
        explanation:
          "That's an aggregate figure spread across hundreds of CDN edge locations worldwide — no single data center serves this alone.",
      },
    ],
  },
];
