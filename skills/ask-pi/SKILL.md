---
name: ask-pi
description: Route a situation to the right Pi Flow command and explain the next step.
disable-model-invocation: true
---

# Ask Pi

Choose the shortest flow that makes the requested outcome reliable.

## Build a feature

1. Start with **`/pi-grill-with-docs`** when the idea needs decisions and belongs to a repository. It interviews, maintains `.pi-flow/CONTEXT.md`, and records only hard-to-reverse decisions in `.pi-flow/docs/adr/`.
2. If a question needs runnable evidence, use **`/pi-prototype`**; use **`/pi-handoff`** before moving that evidence to a fresh session.
3. For work spanning sessions, use **`/pi-to-spec`**, then **`/pi-to-tickets`**. Work an unblocked ticket with **`/pi-implement`**. For a small, well-understood change, use **`/pi-implement`** directly.
4. Use **`/pi-tdd`** for a focused behavior and **`/pi-code-review`** to review a completed change against its requirements.

## Start elsewhere

- Incoming bugs or feature requests need **`/pi-triage`**. Tickets created by `/pi-to-tickets` are already ready to work.
- A difficult regression, flake, or unexplained failure needs **`/pi-diagnose`**.
- A large effort with unresolved architectural choices needs **`/pi-wayfinder`**; when its map is clear, continue with `/pi-to-spec`.
- A codebase-health improvement needs **`/pi-improve-architecture`**.
- An idea without a repository needs **`/pi-grill`**.
- Source-backed investigation needs **`/pi-research`**.
- Learning over several sessions needs **`/pi-teach`**.

## First use

Run **`/pi-setup`** before an engineering flow that must publish specs or tickets. It stores the tracker, triage vocabulary, and domain-document conventions under `.pi-flow/`.

## Response

Name the recommended command, why it fits, and the immediate next action. If the request could take more than one route, state the decisive trade-off.