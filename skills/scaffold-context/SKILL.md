---
name: scaffold-context
description: Create or tighten concise project context in .pi-flow from repository evidence when shared orientation is missing or stale.
disable-model-invocation: true
---

# Scaffold Context

Maintain only the context that helps future work begin accurately.

1. Check for `.pi-flow/CONTEXT.md` with `glob`. If it is already concise, current, and useful for the requested work, leave it unchanged.
2. When it is missing, thin, or stale, inspect representative entry points, configuration, public interfaces, and nearby documentation with `glob`, `grep`, and focused `read` calls.
3. Create or surgically update `.pi-flow/CONTEXT.md` with verified facts only: purpose and scope, essential domain terms, decisive architecture choices, conventions that affect changes, and important paths. Prefer links or paths over duplicated explanations.
4. Preserve correct existing material, remove contradicted claims, and omit generic advice, transient task notes, and speculative detail.
5. Use a `task` batch only when independently researching substantial subsystems; consolidate only evidence you verified.

## Observed verification

Re-read `.pi-flow/CONTEXT.md`, inspect every path and claim against the evidence gathered, and confirm it is concise enough to guide the next relevant change. Finish only after that review is observed; report whether the file was created, updated, or intentionally unchanged.
