---
name: to-spec
description: Synthesize the current conversation into a delivery spec and publish it through the configured project tracker without re-interviewing.
disable-model-invocation: true
---

# To Spec

Turn the current conversation and repository understanding into a delivery spec. Do not re-interview the user; synthesize what is already established.

## Process

1. If needed, inspect the relevant repository area. Use `.pi-flow/CONTEXT.md` vocabulary and honor relevant `.pi-flow/docs/adr/` decisions when present.
2. Identify the highest useful behavior-level verification seam. Prefer existing seams; if a new seam is necessary, state it and confirm it with the user before publishing.
3. Write and publish the spec through the tracker configured in `.pi-flow/issue-tracker.md`. Apply the mapped `ready-for-agent` label from `.pi-flow/triage-labels.md` when that record exists.

Use this structure:

```markdown
## Problem statement

The user-visible problem.

## Solution

The user-visible outcome.

## User stories

A complete numbered list: "As a <actor>, I want <feature>, so that <benefit>."

## Implementation decisions

Durable technical decisions: modules or interfaces affected, architectural choices, schema or API contracts, and specific interactions. Avoid file paths and code snippets unless a prototype's decision-bearing shape is more precise than prose.

## Testing decisions

Behavior to verify, the highest seams, existing prior art, and why the tests defend external behavior rather than implementation detail.

## Out of scope

Explicit exclusions.

## Further notes

Constraints, risks, and unresolved follow-up.
```

## Done

Report the published spec location, status, and `/pi-to-tickets` as the next command.