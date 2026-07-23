---
name: domain-modeling
description: Maintain precise domain language and durable architectural decisions while designing a project.
---

# Domain Modeling

Actively sharpen the domain model while designing. Challenge conflicting terms, use concrete edge cases to test relationships, and record resolved language or durable decisions immediately. Reading existing vocabulary is not domain modeling; use this skill when changing the model.

## Records

Keep durable domain records under `.pi-flow/`.

- Single context: `.pi-flow/CONTEXT.md` and `.pi-flow/docs/adr/`.
- Multiple contexts: `.pi-flow/CONTEXT-MAP.md` identifies each context record; system-wide decisions remain in `.pi-flow/docs/adr/`, while a context may keep `.pi-flow/docs/adr/` beneath its own root when the map says so.

Create a record only when it has content. If no context record exists, create one when the first term is resolved. Create an ADR directory only for the first qualifying decision.

## During design

### Check the established language

Read the applicable context record before naming a domain concept. When the user's term conflicts with it, identify the conflict and ask which meaning is intended. Keep one canonical term for one concept; list rejected synonyms in the glossary.

### Make vague concepts precise

For overloaded language, offer the smallest precise distinction. For example, distinguish a Customer from a User rather than treating both as an account. Define terms by what they are, not by implementation details.

### Test relationships with scenarios

Use concrete edge cases to force boundaries into view: partial cancellation versus whole-order cancellation, a returned item after settlement, or a person acting for two organizations. State the scenario and the ambiguity it exposes.

### Cross-check implementation

When a user describes behavior, inspect the relevant code. Surface any mismatch between code and the stated model rather than silently choosing one. Resolve the contradiction before encoding it into persistent records.

### Record settled terms inline

Update the applicable `.pi-flow/CONTEXT.md` as soon as a term is settled; do not batch vocabulary decisions. Follow [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md). A context record is a glossary, never a specification, scratchpad, or implementation log.

### Record only consequential decisions

Offer an ADR only when the decision is all of:

1. hard to reverse;
2. surprising without its rationale; and
3. chosen after a real trade-off.

Otherwise, do not create one. For a qualifying decision, use [ADR-FORMAT.md](./ADR-FORMAT.md).