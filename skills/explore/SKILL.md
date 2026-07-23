---
name: explore
description: Map an unfamiliar code area’s architecture, data flow, and call graph into focused ephemeral exploration records.
---

# Explore

Map the requested code area at a useful architectural level before planning or changing it. Use the repository's domain vocabulary from `.pi-flow/CONTEXT.md` or the relevant record named by `.pi-flow/CONTEXT-MAP.md` when it exists.

Create one ephemeral session at:

```
.scratch/explorations/<YYYY-MM-DD>/pi-explore-<slug>/
```

Write `session.md` with the user request, target area, scope, known exclusions, and any question that could not be resolved from repository evidence.

## Map deliberately

Locate entry points, symbols, and file groups before reading implementation. Read representative modules plus the interfaces, callers, and persistence or integration seams that explain the target. Read a whole file only when order or surrounding structure is material to the result.

For a large area with independent subsystems, use a single `task` batch of scoped `scout` tasks to investigate those subsystems independently. Give every task its path ownership, questions, and output format; combine findings yourself. Do not delegate a small or coherent area that can be explored directly.

## 1. Architecture

Write `architecture.md` with:

- module boundaries and responsibilities;
- dependency direction;
- integration seams and interfaces;
- relevant layers such as presentation, domain, and data.

Name concrete paths and symbols, not generic categories.

## 2. Data flow

Read `architecture.md`, then write `data-flow.md` with:

- entry points such as UI, API, worker, or command;
- important transformations and validation;
- persistence boundaries;
- external integrations and their direction.

Cross-reference architecture modules so readers can follow the path of important data.

## 3. Call graph

Read `architecture.md` and `data-flow.md`, then write `call-graph.md` with:

- key functions, methods, and their owning modules;
- important chains from entry point through core behavior to exit;
- asynchronous boundaries including events, queues, and callbacks;
- error propagation and recovery paths.

Cross-reference earlier records instead of repeating them.

## 4. Synthesize

Read all dimension records and write `synthesis.md` containing:

- a concise text diagram of the high-level structure;
- the key patterns observed;
- coupling hotspots and why they matter;
- open questions, clearly separating evidence from inference;
- the most valuable next exploration paths.

Write the exact `synthesis.md` path to `.scratch/LAST-EXPLORATION.md` so later work can locate it.

## Return

Return the synthesis path, the modules mapped, key findings, status (`complete` or `blocked` with reason), and one recommended next action.