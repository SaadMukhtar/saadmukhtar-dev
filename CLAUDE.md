@AGENTS.md

# Behavioral Guidelines

Tradeoff: these bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

When editing existing code:
- Don't improve adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

---

# Stack Rules — saadmukhtar-dev

## Next.js App Router

- Default to **server components**. Only add `"use client"` when you need hooks, browser APIs, or event handlers — not just because it's easier.
- Never fetch data inside a client component when a server component can do it.
- Co-locate client wrappers close to where they're needed — don't make entire pages client components.
- `suppressHydrationWarning` on `<html>` and `<body>` only — not as a general escape hatch.

## Tailwind v4

- Dark mode is configured via `@custom-variant dark (&:where(.dark, .dark *))` in CSS — not `darkMode: 'class'` in a config file.
- Config lives in `globals.css`, not `tailwind.config.js`.
- Don't add a `tailwind.config.js` unless there's a specific reason.

## TypeScript

- No `any` without a comment explaining why the type is genuinely unknowable.
- Don't cast types just to make the compiler happy without understanding why.
- Prefer explicit return types on exported functions.

## Packages

- Ask before installing a new dependency. Every package adds surface area.
- Prefer native browser APIs or Next.js built-ins over a library where practical.

## End of Task

Always end every completed task with exactly four bullets:
- **What I did**
- **Result**
- **Next step**
- **Objective / future**
