---
name: implement
description: Implement work from an approved specification or tickets, exercising the requested behavior before review and delivery.
disable-model-invocation: true
---

# Implement

Implement the work described by the supplied specification or tickets.

1. Read the full specification, tickets, applicable `.pi-flow/CONTEXT.md`, ADRs, and linked decisions. Locate the affected entry points, callers, and existing tests with `glob`, `grep`, and focused `read` calls.
2. Keep the accepted ticket order and blocking edges. Work in the smallest coherent vertical slice; do not add behavior that a ticket or specification does not require.
3. At an agreed public seam, use `skill://tdd` where it fits. Otherwise make the narrowest production change that satisfies the stated acceptance criterion and follows local conventions.
4. Exercise the changed behavior as each slice lands: run focused type checks or tests when the project provides them, then run the smallest real acceptance path. Inspect errors, public entry points, and changed call sites before continuing.
5. When every ticket is complete, run the project’s required final verification, use `skill://code-review` to review the completed change, and resolve real findings.
6. Commit the coherent completed work on the current branch.
