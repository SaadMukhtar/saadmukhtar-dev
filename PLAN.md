# Site Plan — saadmukhtar-dev

## Goal
One repo, two faces: public portfolio for the world, private dashboard for personal tracking. Replaces the interview-prep markdown repo entirely.

---

## Phase 1 — Public Site

### Done
- [x] Next.js 16, TypeScript, Tailwind, App Router scaffolded
- [x] Landing page — hero, projects grid, work history
- [x] x.ai-inspired design — dark/light mode, dot grid, fade-up animations, hairline borders
- [x] Deployed on Vercel (auto-deploys on push to main)

### High-ROI content fixes (do before building new pages)
These are recruiter/staff-engineer signal improvements to the landing page itself:

- [ ] **Work experience — add impact bullets** — Each company needs 2–3 lines with real scope and numbers. "Founding SWE at Capital One" alone says nothing. The telemetry platform description, scale, and decisions need to be here. Highest ROI change on the whole site.
- [ ] **Fix the projects section** — 5 of 6 projects say "planned" with no links. Remove the label entirely or add a GitHub repo link per project (even a README-only repo is better than nothing). Staff engineers see "planned" as vaporware.
- [ ] **Add education** — One line: `University of Waterloo · BCS Computer Science`. Currently invisible.
- [ ] **Add skills line** — Not a tag cloud. One curated sentence: `Go · Python · TypeScript · Kafka · ClickHouse · OpenTelemetry · Kubernetes · AWS`
- [ ] **Add resume download** — "Resume ↓" button in the nav. Every Stripe/Google recruiter will ask for it.
- [ ] **Sharpen the hero** — Add what kind of role you're targeting: `Infrastructure · Distributed Systems · ML Systems` so recruiters pattern-match faster.

### Remaining pages
- [ ] Connect custom domain (saadmukhtar.dev recommended — ~$12/yr on Cloudflare)
- [ ] Projects detail pages — `/projects/[slug]` with full writeup per project
- [ ] About page — `/about` with background, UWaterloo, skills deep-dive
- [ ] Writing/blog section — `/writing` for technical posts — **highest signal for Anthropic/OpenAI**
  - First post idea: "Designing a distributed telemetry pipeline: what changes between 1M and 10M metrics/day" (real Capital One learnings, repackaged)
  - System design posts reframed from interview prep material also work here

### Analytics / Telemetry
- [ ] **Quick path**: Enable Vercel Analytics (free, built-in — page views, visitors, top pages, Web Vitals). Takes 2 minutes: `npm i @vercel/analytics` + add `<Analytics />` to layout.
- [ ] **Later / stretch**: Self-hosted analytics with Posthog or Plausible if you want more control. On-brand given your observability work. Could even wire your own platform here eventually.

---

## Phase 2 — Private Dashboard

Everything behind auth. Personal use only.

### Auth
- Clerk or NextAuth — simple email/password or GitHub OAuth
- Single user (you) — no multi-tenant complexity needed
- Middleware to protect all `/dashboard/*` routes

### Pages to build
- `/dashboard` — overview: recent log entries, ideas progress, quick stats
- `/dashboard/log` — daily log (port from log.md), add new entry form
- `/dashboard/ideas` — the 40-item tracker (port from ideas/README.md), checkboxes, filterable by tier + type
- `/dashboard/learn` — active learning session tracker (what's in progress, notes per item)

### Data
- Postgres (Vercel Postgres or Neon — both have free tiers)
- Prisma for ORM
- Tables: log_entries, ideas (with status/notes), learn_sessions

---

## Tech Stack
- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS
- Auth: Clerk or NextAuth
- DB: Postgres (Neon) + Prisma
- Hosting: Vercel
- Domain: TBD (saadmukhtar.dev)

---

## Build Order
1. ~~Scaffold Next.js~~ ✅
2. ~~Public landing page + design~~ ✅
3. Content fixes (work experience, projects, education, skills, resume link) ← **you are here**
4. Vercel Analytics (quick win, 10 min)
5. Connect domain
6. Projects detail pages + About page
7. Writing/blog — first technical post
8. Auth setup
9. Dashboard shell + routing
10. Log feature
11. Ideas tracker feature
12. Self-hosted analytics (optional, later)

---

## Ideas Backlog (unscheduled)

Captured here until the Phase 2 dashboard ideas tracker is live — at that point these migrate there.

- **Project discipline labels / recruiter filters** — Tag each project with a discipline (Infra, ML Systems, Backend, Distributed Systems) and add a filter bar on the public projects grid. Lets recruiters self-select into what they care about. High value before projects detail pages.
- **MCP blog post or project** — Write about building/using an MCP server, or build a public one. Timely and niche — very on-brand for Anthropic interest.
- **Claude Code on iPhone** — Use Claude Code mobile to iterate on this site. Document the workflow; could become a blog post.
- **Google Drive-style server rack on Kubernetes** — Personal cloud storage system running on K8s with custom scheduling, storage classes, and operator. Strong infra project for the portfolio.

---

## Source of Truth
- This repo replaces `/interview-prep`
- CLAUDE.md files and speaking-template.md from interview-prep are useful — port them into the dashboard or keep interview-prep as a private reference-only repo
- Interview prep material (system design, patterns) should NOT appear publicly as raw notes — repackage as blog posts instead
