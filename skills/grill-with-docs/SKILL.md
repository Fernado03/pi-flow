---
name: grill-with-docs
description: Interview a repository-backed idea until its decisions are clear, maintaining a glossary and ADR record only when needed.
disable-model-invocation: true
---

# Grill With Docs

Sharpen an idea through a focused interview while maintaining its durable domain record.

## Before the interview

Read `.pi-flow/CONTEXT.md` and relevant `.pi-flow/docs/adr/` entries when present. If absent, proceed silently. Inspect the relevant code only when it can answer a decision.

## Interview

Ask one decision-making question at a time. Prefer questions that expose user outcome, constraints, terminology, boundaries, failure behavior, and how the result will be verified. Use the answer to narrow the next question; do not repeat settled ground or turn a clear small change into a long interview.

When an answer needs runnable evidence, recommend `/pi-prototype`. When the effort is too large to understand in one thread, recommend `/pi-wayfinder`.

## Maintain records lazily

- Update `.pi-flow/CONTEXT.md` only for stable domain vocabulary, explicit meanings, and bounded-context relationships. Preserve its existing structure and reject ambiguous synonyms.
- Add an ADR under `.pi-flow/docs/adr/` only for a material, hard-to-reverse decision. Record context, decision, consequences, and any rejected alternative that matters.
- Surface a conflict with an existing ADR instead of quietly overwriting it.

Do not create records merely because this skill ran.

## Hand off

Once the idea is clear, summarize the decisions, open questions, durable-record updates, and recommended next command: `/pi-to-spec` for multi-session delivery or `/pi-implement` for a small, ready change.