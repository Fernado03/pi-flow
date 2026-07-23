---
name: tweak
description: Implement a small, known fix or UI update with a narrow audit and only the verification its risk warrants.
disable-model-invocation: true
---

# Tweak

Use for a small, already-understood change—not diagnosis, broad redesign, or new product definition.

1. Locate the target with `glob` and `grep`, then read the named code and nearby call sites. Expand only when the first audit reveals a dependency that affects correctness.
2. If multiple plausible targets or user-visible outcomes remain, use `ask` to resolve the material choice. Do not ask for facts the repository establishes.
3. Make the requested change with `edit` or `write`. Preserve surrounding behavior and conventions; do not refactor, add abstractions, or change adjacent logic unless the request requires it.
4. Inspect the edited flow and relevant callers for incomplete wiring, errors, and changed defaults. When an existing focused check covers the touched behavior, run it; do not add coverage unless the user requests it or the change creates an uncovered observable contract.
5. For material risk, recommend `/pi-verify`; otherwise report the observed change and offer `/pi-commit-and-document` only when the user is satisfied. Never launch a follow-up action automatically.

## Completion

Report changed paths and behavior, the exact verification run or remaining risk, any blocker, and the recommended next Pi Flow action.