---
name: feature
description: Implement a feature by mapping its fit, making the smallest coherent change, and proving the requested flow works.
disable-model-invocation: true
---

# Feature

Implement the requested behavior end to end; understand the affected flow before changing it.

1. Locate the relevant entry points, callers, data boundaries, and nearby tests with `glob`, `grep`, and focused `read` calls. Reuse the local patterns that own the behavior.
2. State the observable acceptance path and choose the smallest design that satisfies it. Resolve only ambiguities that tools and repository evidence cannot answer.
3. Split work with a `task` batch only when there are genuinely independent, substantial slices with distinct file ownership. Give each slice its contract and integrate the results yourself; otherwise work directly.
4. Make the production change with `edit` or `write`. Update existing coverage, or add focused coverage when the feature creates a new observable contract, following repository conventions.
5. Inspect every changed call site and public entry point for incomplete wiring, errors, and incompatible defaults.

## Observed verification

Run the narrowest real feature path that exercises the requested behavior, then inspect its output or state. Finish only after observing the acceptance path succeed; report the command or interaction and what was observed.
