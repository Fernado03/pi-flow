---
name: improve-codebase-architecture
description: Find high-leverage opportunities to deepen a changing codebase area, visualize them in an HTML report, then explore one with the user.
disable-model-invocation: true
---

# Improve Codebase Architecture

Surface **deepening opportunities**: changes that turn shallow modules into deep ones and improve testability and AI navigability. Use these terms exactly: **module**, **interface**, **implementation**, **depth**, **seam**, **adapter**, **leverage**, and **locality**. Apply the deletion test: retain a candidate only when deleting an intermediary would concentrate complexity rather than merely move it.

Use domain terms from `.pi-flow/CONTEXT.md` when it exists. Treat applicable `.pi-flow/docs/adr/` records as decisions not to re-litigate unless observed friction justifies reopening one.

## 1. Scope, then explore

1. Keep the scan YAGNI-sized. If the user names a module, subsystem, or pain point, explore that direction only. Otherwise inspect about 20 recent commits to identify recurrent files or areas; prioritize a clear hot spot and widen only when history is scattered.
2. Read the relevant domain records and ADRs before code exploration.
3. Split independent, substantial areas into one `task` batch of read-only `scout` tasks. Each task must own a distinct directory or concern and return concrete friction with file and symbol evidence. Do not dispatch trivial or overlapping exploration; integrate findings yourself.
4. Explore candidates organically. Look for a concept that requires many-module bouncing; a module whose interface nearly equals its implementation; extracted pure functions that reduce locality; leaking seams; or behavior that is absent or difficult to test through its interface.
5. Stop at 3–5 candidates where deepening improves leverage, locality, or testability. This is a targeted review, not a codebase rewrite.

## 2. Present the report

1. Write a fresh self-contained report to the OS temporary directory as `architecture-review-<timestamp>.html`; resolve the directory from the platform temp environment. Use `write` and preserve no report artifact in the repository.
2. Follow [HTML-REPORT.md](HTML-REPORT.md). Use Tailwind and Mermaid CDNs where a relationship diagram helps; draw the remaining visuals with static HTML, CSS, or SVG.
3. Each candidate needs its files/modules, observed problem, proposed deepening, locality/leverage/testing benefits, a before/after visual, recommendation strength (`Strong`, `Worth exploring`, or `Speculative`), and an ADR warning only for a real conflict. End with one top recommendation.
4. Open the report using the platform-appropriate shell action through `bash`, give the user its absolute path, and ask: **Which of these would you like to explore?** Do not propose interfaces yet.

## 3. Explore a selection

Walk the selected candidate through its decision tree with the user: constraints, dependencies, deepened-module shape, what belongs behind the seam, and which tests survive. Update `.pi-flow/CONTEXT.md` when a term becomes durable; create it only when needed. For a load-bearing rejection, offer an ADR only when it would prevent a future review from repeating the same suggestion. If interface alternatives are requested, compare two concrete designs before choosing one.
