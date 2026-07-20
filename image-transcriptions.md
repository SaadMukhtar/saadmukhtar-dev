# Full Transcription — All 12 Images (IMG_0038–IMG_0049)

---

## IMG_0038 — RESUME_FULL_INVENTORY_AND_EXTERNAL.md

### CONTRIBUTED (Smaller role, but shows breadth)

| # | Accomplishment | Your Role |
|---|---|---|
| 31 | Snowflake dataplane enablement | Validated queries, tested in QA |
| 32 | Multi-dataplane aggregation testing | Tested 2-TCB and 3-TCB scenarios |
| 33 | Helm chart updates for airgap deployment | PR reviews, validation |
| 34 | Cross-team data contract alignment with Databolt | Created reference doc |
| 35 | Insomnia collection for PMQS endpoints | Created and maintained |

### EXTERNAL RESUME — Final Bullets (Top 1% Framing)

Selection Criteria:
- Maximum technical complexity
- Largest quantifiable blast radius
- Defensible in a 30-min technical screen
- Co-owned work framed as "drove/co-architected/designed strategy for"

Bullets:
1. Identified and resolved a platform-wide data integrity failure in a distributed OLAP system (ClickHouse, 4.9B+ rows) that was silently misreporting 92.5% of transaction metrics across all tenants; authored 680-line root-cause analysis and led remediation across 20+ cross-functional sessions with Principal Engineers — restoring data accuracy for enterprise contract reporting.
2. Co-architected a 4-phase query performance overhaul on a 4.9B-row ClickHouse cluster that reduced API latency from 11 seconds to under 500ms (20x+ improvement) — implementing monthly partitioning, parallel query execution in Go, materialized columns to eliminate runtime JSON parsing, and hash-based GROUP BY optimization.
3. Designed and built an automated end-to-end regression pipeline (Playwright + Python + Jenkins, 700+ lines) validating an 8-service data path from ingestion to UI, eliminating 60 minutes of manual verification per release and enabling continuous delivery for the platform.
4. Drove a 3-phase cloud infrastructure cost optimization across a multi-region ClickHouse cluster (IOPS 30K→5K, io1→gp3 volume migration, EC2 right-sizing from c5.12xlarge to c5.9xlarge) — validated across 4 environments with zero performance degradation.
5. Shipped 25,700+ lines of production code across 12 services in 6 months (Go, Python, TypeScript, Helm/K8s) while performing 66 code reviews as the team's primary quality gatekeeper — catching correctness regressions, test logic errors, and potential data accuracy failures before merge.
6. Designed a windowed counter calculation algorithm for OpenTelemetry cumulative metrics that correctly handles mid-window counter initialization and pod restarts — resolving an edge case where the standard MIN/MAX approach silently undercounts new time series.

---

## IMG_0039 — RESUME_FULL_INVENTORY_AND_EXTERNAL.md (continued)

### Interview Prep Notes (ownership/defensibility table)

| Bullet | STAR Story | Defensible Framing |
|---|---|---|
| 92.5% data integrity | "I discovered it, investigated it, wrote the analysis, led the rooms, shipped the fix" | 100% yours |
| 20x latency (4-phase) | "I co-designed the strategy, validated each phase, caught bugs, provided go/no-go" | Say "co-architected" — you drove validation and quality |
| E2E pipeline | "I designed and built this solo" | 100% yours |
| Cost optimization | "I co-owned the rollout — tracked, validated, ensured no perf degradation" | Say "drove validation" if pressed |
| 25.7k lines + 66 reviews | Raw numbers, irrefutable | GitHub metrics |
| COALESCE window fix | "Naveena and I designed this together — I consulted on the approach and validated" | Say "designed" — you contributed intellectually |
| SME ramp | Narrative about learning velocity | Verifiable by anyone on the team |

### FINAL RESUME BULLETS — Polished (Top 1% SWE)

Prompt used: "Write 6 resume bullets for a Senior SWE targeting FAANG/top-tier. Format: [Strong verb] + [system-level technical action] + [quantified impact in under 20 words]. Max 2 lines per bullet. No line counts, no internal jargon. Let scale and complexity speak. Include $291K infrastructure savings."

Bullets (partially cut off at bottom):
1. Identified and shipped a fix for a platform-wide data integrity failure (92.5% metric undercounting across all tenants on a 4.9B-row ClickHouse cluster) — restoring accuracy for enterprise contract reporting.
2. Co-architected a 4-phase query performance overhaul reducing API latency from 11s to <500ms (20x+) via partitioning, parallel execution, materialized columns, and hash-based GROUP BY on a multi-region ClickHouse deployment.
3. Drove a 3-phase cloud optimization across a multi-analytics cluster (IOPS reduction, io1→gp3 migration, EC2 right-sizing) — saving $291K/year (81% infrastructure cost reduction) with zero performance degradation.
4. Designed and built an automated end-to-end regression pipeline (Playwright, Python, Jenkins) validating an 8-service data path from ingestion to UI — eliminating 60 min of manual verification per release.
5. Shipped 25.7K+ lines across 12 services in 6 months (Go, Python, TypeScript, K8s) while performing 66 code reviews as primary quality gatekeeper — catching correctness regressions before merge.
(6th bullet visible but cut off — "Ramped to sole technical owner of a multi-region observability platform...")

---

## IMG_0040 — RESUME_FULL_INVENTORY_AND_EXTERNAL.md (continued)

Continuation of the Final Resume Bullets section. Shows all 6 bullets fully:

6. Ramped to sole technical owner of a multi-region observability platform (ClickHouse, K8s, OpenTelemetry, Lambda) in under 6 months — becoming the escalation point for 4+ cross-functional teams.

### Why These 6 Win (table)

| # | Signal | What Recruiter Thinks |
|---|---|---|
| 1 | "Found a bug affecting all tenants at billion-row scale" | This person finds problems others miss |
| 2 | "20x latency improvement" | Performance engineering at scale |
| 3 | "$291K/year saved" | Business impact, not just code |
| 4 | "Built E2E pipeline" | Creates systems, not just features |
| 5 | "25.7K lines + 66 reviews" | High velocity AND elevates team |
| 6 | "Sole owner in 6 months" | Ramps fast, takes ownership |

### Interview Defensibility (partially visible)

---

## IMG_0041 — RESUME_FULL_INVENTORY_AND_EXTERNAL.md (continued)

Same 6 bullets repeated at top, then:

### Why These 6 Win (continued/repeated)

### Interview Defensibility (full table)

| Bullet | If Pressed |
|---|---|
| $291K savings | "I co-owned the rollout — wrote the tracker, validated across all 4 environments, confirmed zero perf degradation. The cost analysis doc was a team effort I contributed to." |
| 20x latency | "I co-designed the strategy with our DE, validated each phase, and caught a correctness bug mid-rollout that would have shipped bad data." |
| Everything else | Fully yours — no risk |

---

## IMG_0042 — RESUME_CAPITAL_ONE_VARIANTS.md

### Resume Bullets — Capital One (Aug 2025 – Present) — Organized by Role Target

### MAIN RESUME (Top 5 — Universal SWE)
"These work for any SWE role. Maximum impact, broadest appeal."

1. Identified and resolved a platform-wide data integrity failure (92.5% metric undercounting) across a 4.9B-row ClickHouse cluster serving enterprise contracts — led remediation with Principal Engineers and shipped fix to production.
2. Co-architected a 4-phase query performance overhaul reducing API latency from 11s to <500ms (20x improvement) via partitioning, parallel execution in Go, materialized columns, and hash-based GROUP BY on a multi-region deployment.
3. Drove a 3-phase cloud cost optimization (IOPS reduction, io1→gp3, EC2 right-sizing) across a multi-region ClickHouse cluster — saving $291K/year (61% reduction) with zero performance degradation.
4. Designed and built an automated E2E regression pipeline (Playwright, Python, Jenkins) validating an 8-service data path from ingestion to UI, eliminating 60 min of manual verification per release.
5. Shipped 25.7K+ lines across 12 services in 6 months (Go, Python, TypeScript, K8s) while performing 66 code reviews as primary quality gatekeeper.

### VARIANT A: Observability / Telemetry Roles
Target: Datadog, Honeycomb, Grafana, Chronosphere, Observe, New Relic, Splunk

1. Identified a cumulative-to-delta counter aggregation defect in an OpenTelemetry-based metrics pipeline by tracing data across collector, S3 ingestion, and ClickHouse query layers — resolving 92.5% undercounting across all tenants.
2. Architected the telemetry ingestion pipeline (OTEL Collector → S3 → Lambda/CronJob → ClickHouse) ingesting 10M+ metrics daily across both cloud-hosted and air-gapped Kubernetes deployments.
3. Designed a windowed counter calculation algorithm for OTLP cumulative metrics that correctly handles mid-window counter initialization and pod restarts — fixing a silent undercounting edge case in the standard MIN/MAX approach.
4. Became sole SME for OpenTelemetry semantics (time series identity, resource attributes, instrumentation scope, cumulative vs delta temporality) within 6 months — go-to escalation point for 4+ teams.

---

## IMG_0043 — RESUME_CAPITAL_ONE_VARIANTS.md (continued)

Top of image continues Variant A last bullet.
Left sidebar note: "++$55++ (11s → 5s for sequential → concurrent)"

### VARIANT B: Distributed Systems / Infrastructure Roles
Target: AWS, Databricks, Snowflake, Confluent, CockroachDB, PlanetScale, Vercel

1. Operated a multi-region ClickHouse cluster (4.9B+ rows, 2-replica active-active, 4 environments) across both AWS (EC2/Lambda/CloudFormation) and self-hosted Kubernetes (StatefulSet, Helm, IRSA) deployments.
2. Co-architected monthly partitioning on a 4.9B-row table reducing query scan scope from full-table to ~400M rows per partition — achieving 10-16x query performance improvement.
3. Drove a 3-phase infrastructure cost optimization ($477K/year → $185K/year) across IOPS, volume types, and EC2 instance sizing — validated with 48-hour monitoring windows per phase, zero downtime.
4. Designed and shipped a parallel query execution pattern in Go using goroutines and connection pooling against ClickHouse, reducing comparison endpoint latency by 55% (11s → 5s for sequential → concurrent).
5. Resolved a distributed table ingestion failure (materialized view → v2 table misalignment) by tracing the write path across Lambda, MV, and replica nodes — restoring real-time data flow within hours.

### VARIANT C: Platform / Developer Experience Roles
Target: Stripe, Vercel, Railway, Render, PlanetScale, internal platform teams

1. Built an automated 4-stage E2E testing pipeline (Playwright + Python + Jenkins) with a baseline/delta verification pattern that eliminates flaky tests — enabling continuous delivery confidence for an 8-service platform.
2. Created comprehensive system documentation (architecture references, onboarding guides, API collections) that reduced new-engineer ramp time and became the team's authoritative source of truth.
3. Performed 66 code reviews in 6 months as primary quality gatekeeper — catching correctness regressions, test logic errors, and data accuracy bugs before merge.
4. Shipped 4 production hotfixes under time pressure (filtering bugs, schema migrations, ingestion failures) with zero customer-facing downtime — each requiring cross-stack diagnosis across Lambda, S3, ClickHouse, and Go API layers.

### VARIANT D: Backend / API / High-Growth Startup Roles (beginning, cut off)
Target: Series A-C startups, generalist backend roles
"Lean on velocity + breadth:"

---

## IMG_0044 — RESUME_CAPITAL_ONE_VARIANTS.md (continued)

### VARIANT D: Backend / API / High-Growth Startup Roles (full)

1. Shipped 25.7K+ lines across 12 services (Go, Python, TypeScript, Helm/K8s) in 6 months as a new hire — ramping to sole technical owner of the platform's query and observability stack.
2. Identified and fixed a 92.5% data accuracy failure affecting all tenants within first 5 months on the job — leading cross-functional remediation with senior engineering leadership.
3. Reduced API latency by 20x (11s → <500ms) through a multi-phase database optimization strategy (partitioning, parallel queries, materialized columns) on a ClickHouse OLAP backend.
4. Cut $291K/year in infrastructure costs (61% reduction) by right-sizing EC2 instances, migrating EBS volume types, and reducing over-provisioned IOPS — all validated with zero performance degradation.
5. Built the team's first automated E2E pipeline validating the full data path from ingestion to UI — eliminating manual QA cycles and unblocking continuous delivery.

### TECHNICAL SKILLS (Updated)

Languages: Python, Go, TypeScript, JavaScript, SQL, C++, Java
Frameworks: FastAPI, Flask, NestJS, React, Spring Boot, GraphQL, Playwright
Infrastructure: AWS (Lambda, S3, Fargate, EC2, CloudFront, Route53), Docker, Kubernetes, Helm, ClickHouse
Tools: Git, Jenkins, OpenTelemetry, Supabase, Postman, Snowflake, DataDog, Amplitude
Concepts: Distributed Systems, System Design, Observability, OLAP, API Design, Cost Optimization

Changes from current: Added Helm, Playwright, OpenTelemetry, OLAP, Cost Optimization. Removed Supabase if you need space (weakest signal).

### HOW TO USE THIS

| Applying to... | Use |
|---|---|
| Generic SWE (FAANG, mid-size) | Main Resume (top 5) |
| Datadog, Grafana, observability startup | Main bullets 1+4 + Variant A (all 4) |
| AWS, Snowflake, Databricks, infra | Main bullets 1+3 + Variant B (all 5) |
| Stripe, Vercel, platform/DevEx | Main bullets 4+5 + Variant C (all 4) |
| Series A-C startup, move fast | Variant D (all 5) — emphasizes speed + breadth |

"Mix and match — pick 4-5 total bullets for Capital One regardless of variant. Your other internships stay the same."

---

## IMG_0045 — RESUME_CAPITAL_ONE_FINAL.md

### Resume Bullets — Capital One (FINAL)
Tagline: "Technical but concise. Name the tech, state the outcome. Let them ask how."

### MAIN RESUME (Generic SWE)

Capital One | Aug 2025 – Present | Software Engineer | San Francisco, CA

1. Diagnosed and fixed a distributed OTEL aggregation defect causing 92.5% metric undercounting across all tenants on a multi-region ClickHouse cluster — restored data accuracy for enterprise contract reporting.
2. Co-architected a 20x API latency reduction (11s → <500ms) through ClickHouse partitioning, parallel query execution in Go, materialized columns, and aggregation optimization across a 4.9B-row OLAP system.
3. Executed a 3-phase cloud cost optimization (IOPS reduction, io1→gp3 migration, EC2 right-sizing) across 4 environments — saving $291K/year (61% infrastructure reduction) with zero query degradation.
4. Built an automated E2E regression pipeline (Playwright, Python, Jenkins) validating the full data path from OTEL ingestion to customer-facing UI, replacing 60 min of manual verification per release.
5. Resolved 4 production incidents across the distributed stack (Lambda, S3, ClickHouse, Go) — ingestion failures, schema migrations, and query regressions — each with zero customer downtime.

### VARIANT A: Observability / Telemetry
Target: Datadog, Honeycomb, Grafana, Chronosphere, Observe, New Relic

1. Traced a 92.5% metric undercounting defect end-to-end through an OpenTelemetry pipeline (collector → S3 → ingestion → ClickHouse → query layer) — root-caused a cumulative counter isolation failure and shipped fix to production.
2. Architected the telemetry ingestion pipeline (OTEL Collector → S3 → Lambda/CronJob → ClickHouse) handling 10M+ data points/day across cloud-hosted and air-gapped Kubernetes deployments.
3. Designed a windowed counter calculation for OTLP cumulative metrics that correctly handles counter resets and mid-window pod initialization — resolving a silent accuracy failure in the existing MIN/MAX approach.
4. Co-architected a 20x query latency reduction on a multi-region ClickHouse cluster through partitioning, parallel execution in Go, and materialized columns eliminating runtime JSON parsing.
5. Built a full-path telemetry validation system that injects known traffic, waits for pipeline propagation, and asserts dashboard values match — deterministic E2E confidence on every release.

---

## IMG_0046 — RESUME_CAPITAL_ONE_FINAL.md (continued)

### VARIANT B: Distributed Systems / Infrastructure
Target: AWS, Databricks, Snowflake, Confluent, CockroachDB, PlanetScale

1. Optimized a multi-region ClickHouse cluster (4.9B+ rows, active-active replication) across AWS and self-hosted Kubernetes — reduced total infrastructure cost from $477K to $185K/year through systematic right-sizing.
2. Co-architected a 20x latency improvement through table partitioning, parallel query execution in Go, and materialized columns — reducing scan scope and eliminating runtime JSON extraction on a 4.9B-row dataset.
3. Resolved a distributed ingestion failure caused by materialized view misalignment after a table migration — traced the write path across Lambda, MVs, and replicas, restored data flow with zero loss.
4. Designed a parallel query pattern in Go for ClickHouse comparison endpoints — executing concurrent time-range queries with independent error handling, reducing response time by 55%.
5. Executed IOPS right-sizing, volume type migration (io1→gp3), and EC2 downsizing across 4 environments — each phase validated per-region with 48hr monitoring, saving $291K/year.

### VARIANT C: Platform / Developer Experience
Target: Stripe, Vercel, Railway, internal platform teams

1. Built a 4-stage E2E regression system (baseline capture → traffic injection → pipeline propagation → delta assertion) that provides deterministic release confidence with zero flaky tests.
2. Designed the platform's data contract specification (accepted OTEL formats, metric naming, attribute schemas) — adopted as the authoritative interface between producer and consumer teams.
3. Co-architected a 20x API performance improvement through systematic ClickHouse optimization — directly unblocking customer-facing dashboard adoption.
4. Resolved 4 production incidents through full-stack diagnosis (Lambda, S3, ClickHouse, Go API) — each shipped with zero customer-facing downtime.
5. Drove $291K/year infrastructure savings (61% reduction) through IOPS analysis, storage migration, and compute right-sizing — validated with zero performance regression.

### VARIANT D: Backend / Startup

1. Fixed a 92.5% data accuracy failure affecting all customers by tracing a distributed aggregation defect across 5 system layers — led remediation with senior engineers and shipped to production.
2. Co-architected a 20x API latency improvement (11s → <500ms) through ClickHouse optimization and parallel query execution in Go — unblocking real-time dashboard adoption for enterprise customers.
3. Cut $291K/year in cloud costs (61% reduction) through infrastructure right-sizing across a multi-region analytics cluster — zero customer impact.
4. Built the team's first automated E2E pipeline validating the full data path from ingestion to UI — replacing manual QA and enabling continuous delivery.
5. Resolved production incidents across Lambda, S3, ClickHouse, and Go under time pressure — full-stack diagnosis with zero customer downtime.

---

## IMG_0047 — RESUME_CAPITAL_ONE_FINAL.md (continued)

Top shows continuation of Variant C/D bullets.

### TECHNICAL SKILLS

Languages: Python, Go, TypeScript, JavaScript, SQL, C++, Java
Frameworks: FastAPI, Flask, NestJS, React, Spring Boot, GraphQL, Playwright
Infrastructure: AWS (Lambda, S3, Fargate, EC2, CloudFront, Route53), Docker, Kubernetes, Helm, ClickHouse, Terraform
Tools: Git, Jenkins, OpenTelemetry, Postman, Snowflake, DataDog
Concepts: Distributed Systems, OLAP, Observability, System Design, API Design, FinOps

### THE RULE APPLIED

| Too vague (PM-speak) | Too specific (design doc) | Just right (this version) |
|---|---|---|
| "drove platform reliability" | "monthly PARTITION BY toYYYYMM(real_time) reducing 4.9B rows to 400M per partition" | "ClickHouse partitioning... across a 4.9B-row OLAP system" |
| "resolved data issues" | "missing instance_id + datapoint_attributes in GROUP BY clause" | "cumulative counter isolation failure" |
| "cost optimization" | "reduced io1 IOPS from 30K to 5K validated against CloudWatch VolumeReadOps at 300 avg" | "IOPS reduction, io1→gp3 migration, EC2 right-sizing" |

"The interviewer should read the bullet and know what system and what result — then ask YOU to explain the how."

---

## IMG_0048 — Resume Bullet Points — H1 2026

Syed Saad Mukhtar | Software Engineer | Token Analytics / Polaris

7 bullets (longer-form, most detailed version):

1. Discovered and remediated a critical OpenTelemetry aggregation defect causing 92.5% data undercounting across a distributed ClickHouse analytics platform; authored 680-line root-cause analysis, led 20+ technical sessions with Principal Engineers and executive stakeholders, and shipped the production fix — restoring data integrity for enterprise tokenization contracts.

2. Architected a 4-stage automated E2E testing pipeline (700+ lines) spanning Playwright, Python, and Jenkins that validates an 8-layer data path (OTEL → S3 → ClickHouse → Go API → BFF → UI) end-to-end, eliminating 30-60 minutes of manual validation per release cycle.

3. Gated a 55% API latency optimization for production release by identifying a breaking query-logic regression (PR #83) during validation, executing correctness testing across 11 scenarios, and delivering the final go/no-go decision to executive stakeholders.

4. Delivered 25,700+ lines of code across 12 repositories (Go, Python, TypeScript, Helm) including 18.8k additions to the core query service, an 1,800-line unit test remediation, and 4 critical production hotfixes — each shipped with zero customer-facing downtime.

5. Performed 66 code reviews in 6 months, serving as technical quality gatekeeper for a distributed team — catching logic errors, test assertion defects, and potential data accuracy regressions before merge.

6. Operated as primary SME for a multi-region ClickHouse + OpenTelemetry observability stack across both cloud-hosted (ECS/Lambda) and self-hosted Kubernetes deployments, ramping from zero domain knowledge to team-wide subject matter expert in under 6 months.

7. Drove cross-functional incident response for 4 production-severity issues (OTEL counter isolation, SPCS filtering, Snowflake distributed table migration, Lambda ingestion failure) — diagnosing across the full stack and deploying fixes under time pressure with zero customer impact.

---

## IMG_0049 — Resume Bullet Points — External (FAANG / Top-Tier Targeting)

Syed Saad Mukhtar | Software Engineer

5 bullets:

1. Identified and resolved a platform-wide data integrity failure in a distributed OLAP system (ClickHouse, OpenTelemetry) that was silently misreporting 92.5% of transaction volume across all customers; designed the fix, led cross-org alignment with Principal Engineers, and shipped to production — restoring accuracy for metrics serving enterprise SLA contracts.

2. Architected an end-to-end observability validation pipeline (Playwright + Python + Jenkins, 700+ lines) that automated full-stack regression testing across an 8-service data pipeline, reducing release validation time from 60 minutes to zero manual intervention and enabling continuous delivery for the platform.

3. Drove a 55% latency reduction on a customer-facing analytics API by validating and shipping a parallel query execution strategy across a multi-region ClickHouse cluster; personally caught a correctness regression during rollout that would have shipped corrupted data to production.

4. Shipped 25,700+ lines of production code across 12 services in 6 months (Go, Python, TypeScript, Helm/K8s) — including core query engine logic, infrastructure automation, and a 1,800-line test suite overhaul — while performing 66 code reviews as the team's primary quality gatekeeper.

5. Ramped to sole system owner of a multi-region analytics platform (ClickHouse, Kubernetes, OpenTelemetry, AWS Lambda, ECS) within 6 months of joining — becoming the go-to escalation point for 4+ cross-functional teams and leading 20+ incident triage and architecture sessions with senior engineering leadership.

Notes for interview prep: Each bullet maps to a STAR story.
- "Identified and resolved" = the OTEL undercounting investigation
- "Architected" = the E2E black-box pipeline
- "55% latency" = parallel query gating (PR #83)
- "25.7k lines" = raw output story
- "Sole system owner" = ramp speed + SME narrative
