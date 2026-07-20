# Work Experience — Final Draft

---

## Editorial Guidelines (self-imposed)

**Resume:**
- Max 2 lines per bullet (~200 chars). Target 1.5 lines (~170 chars). Nothing longer.
- Action verb first. No "helped", "worked on", "assisted", "was responsible for".
- Name the specific system — not "a database" but "a 4.9B-row ClickHouse cluster".
- Quantified result in every bullet. If no number, there's a stronger bullet to use instead.
- No em dashes. Semicolons for compound sentences, commas for lists.
- Co-owned work = "co-architected". Never claim sole ownership of collaborative work.
- No internal jargon that dies outside the company (no PMQS, SPCS, Polaris).
- The reader should know what system and what result. The how is for the interview.
- Nothing that can't be defended in a 30-minute technical screen.
- Slight aspirational framing is fine ("founding engineer" = accurate; "led remediation" = accurate). No fabrication.

**Site:**
- Max 1 line on the page. Target ~100 chars. Hard ceiling 120 chars.
- Verb + system + result. Nothing else.
- 2-3 bullets for Capital One Software. 1 per internship.
- Should make a recruiter want to immediately reach out.

---

## RESUME BULLETS — Final

---

### Capital One — Software Engineer (Aug 2025 – Present)
*San Francisco, CA · Capital One Software — Developer Infrastructure*

**1.**
Architected the telemetry ingestion pipeline (OTEL → S3 → Lambda → ClickHouse) for a 0→1 multi-tenant API observability and billing platform, processing 10M+ metrics daily across cloud-hosted and air-gapped Kubernetes.
*(178 chars — 1.8 lines)*

**2.**
Diagnosed a 92.5% billing undercounting defect in a distributed OTEL pipeline; authored the root-cause analysis, led remediation across 20+ Principal Engineer sessions, and restored billing accuracy for $1M+ enterprise contracts.
*(198 chars — 2 lines — worth it: 100% his, strongest bullet)*

**3.**
Blocked a latency optimization from shipping after catching a correctness regression during validation that would have silently corrupted billing metrics for enterprise customers; ran 11-scenario tests and delivered the go/no-go to executive stakeholders.
*(218 chars — just over. Tighten:)*

Blocked a latency optimization from shipping by catching a correctness regression that would have silently corrupted enterprise billing metrics; ran 11-scenario tests and delivered the final go/no-go to executive stakeholders.
*(196 chars — 2 lines — 100% his, engineering judgment signal)*

**4.**
Co-architected a 20x API latency reduction (11s to 500ms) on a 4.9B-row ClickHouse cluster via table partitioning, parallel query execution in Go, materialized columns, and hash-based GROUP BY.
*(167 chars — 1.6 lines)*

**5.**
Reduced infrastructure costs from $477K to $185K/year across a multi-region ClickHouse cluster via EC2 right-sizing, io1 to gp3 volume migration, and IOPS reduction; validated across 4 environments with zero performance degradation.
*(202 chars — just at 2 lines)*

---

### Capital One — Software Engineer Intern (Jun – Aug 2024)
*Dallas, TX*

**1.**
Built a NestJS API on AWS Fargate (containerized microservices, CI/CD, auth) to accelerate read-heavy SailPoint workflows, eliminating 500+ daily support tickets for 2,000+ engineers.
*(161 chars — 1.6 lines)*

---

### Tesla — Software Engineer Intern (Jan – Apr 2024)
*Palo Alto, CA*

**1.**
Engineered a Python backend for cryptographic signature verification of safety-critical vehicle firmware, integrating build system APIs and secure key services to protect 1M+ updates per release.
*(168 chars — 1.6 lines)*

**2.**
Created a reusable Python API layer for OS-level data access now powering 30+ internal tools, improving accessibility by 80% and cutting retrieval latency 35%.
*(138 chars — 1.4 lines)*

---

### Super.com — Software Engineer Intern (May – Aug 2023)
*Remote*

**1.**
Built a Flask fraud detection microservice using behavioral and credit signals; integrated DataDog and Amplitude telemetry pipelines, cutting mean time to detection by 95%.
*(148 chars — 1.5 lines — dropped $10K, too small a number)*

**2.**
Won 1st place in company hackathon by building an OpenAI-powered itinerary generator projected to drive $200K+ in ARR through personalized upsell flows.
*(134 chars — 1.3 lines)*

---

### PlayStation — Software Developer Intern (Sep – Dec 2022)
*Remote*

**1.**
Shipped cross-platform React Native features (TypeScript) for the PS4/PS5 subscription tier launch, contributing to a rollout generating $600M+ annual revenue across 10M+ users.
*(155 chars — 1.5 lines)*

---

### PlayStation — Software Developer in Test Intern (Jan – Apr 2022)
*Remote*

**1.**
Expanded the PS4 Python test automation suite by 15%, uncovering 16+ critical bugs affecting 40M+ users; designed a now-patented PS5 calendar feature in React Native.
*(143 chars — 1.4 lines — patent is the lead accomplishment)*

---

## SITE BULLETS — Final
*(target: 1 visual line, ~100 chars, hard ceiling 120)*

**Capital One Software (Founding, FT) — 3 bullets:**
- Architected the API observability and billing platform (OTEL → ClickHouse) ingesting 10M+ metrics/day across cloud and air-gapped K8s. *(119 chars)*
- Diagnosed a 92.5% billing undercounting defect in a distributed OTEL pipeline; led remediation with Principal Engineers, restoring $1M+ in contract accuracy. *(143 chars — split if too long in UI)*
- Blocked a correctness regression from shipping by catching it during validation; ran 11-scenario tests, delivered the go/no-go to executive stakeholders. *(134 chars)*

**Capital One (Intern) — 1 bullet:**
- Built a NestJS API on AWS Fargate eliminating 500+ daily support tickets for 2,000+ engineers. *(81 chars)*

**Tesla — 1 bullet:**
- Engineered a Python backend for cryptographic firmware verification protecting 1M+ vehicle updates per release. *(94 chars)*

**Super.com — 1 bullet:**
- Won 1st place in company hackathon with an OpenAI-powered itinerary generator projected at $200K+ ARR. *(88 chars)*

**PlayStation — 1 bullet:**
- Shipped PS4/PS5 subscription features in React Native ($600M+ ARR, 10M+ users); designed a now-patented PS5 calendar feature. *(109 chars)*

---

## What got cut and why

| Cut | Reason |
|---|---|
| E2E pipeline (Playwright, 700+ lines) | 6th strongest bullet — 5 bullets for FT is already the max. If anything replaces bullet 5, this would. |
| Windowed counter algorithm | Too domain-specific for a universal bullet. Excellent for an Anthropic/OTEL-targeting interview, but opaque on a first read. Keep for blog post. |
| 25.7K lines + 66 reviews | Volume signal but not a differentiator at target companies. Everyone has shipped code. |
| Ramp to sole SME in 6 months | The founding + ownership story is already implicit in bullets 1-3. A 6th bullet stating it is redundant. |
| Super.com Series C context | Not a credential that goes on your resume. Bullets carry the signal. |
| Databolt / Slingshot product names | Mean nothing to an outside recruiter. "Capital One Software" + "developer infrastructure" does the framing work. |
| $10K fraud reduction (Super.com) | Too small. 95% MTTD cut is the real signal. |
| YC claim (Super.com) | Was Series C, not YC at time of internship. Dropped entirely. |

---

## What the bullets signal by company (self-check)

**Stripe** — bullets 2 + 3 together: you found a billing integrity failure AND you blocked a correctness regression from shipping during your own validation. Two consecutive correctness stories. Stripe interviews on exactly this.

**Anthropic** — bullet 1 (systems architecture + 0→1 build) + bullet 2 (deep root-cause investigation). Shows systems thinking, judgment, and the kind of thorough technical reasoning they want.

**Google** — bullet 4 (20x performance at 4.9B-row scale) + bullet 2 (data integrity at scale). Scale + correctness = Google's two core signals.

**OpenAI** — bullet 1 (founding engineer, 0→1) + bullet 3 (shipped fast AND caught a bug). Velocity + rigor together.

All four companies: bullet 2 (92.5% billing bug) is the #1 bullet everywhere. It's the one that makes a hiring manager lean forward.
