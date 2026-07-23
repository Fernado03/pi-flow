---
name: refactor
description: Improve code structure without changing behavior, using a measured baseline and an observed equivalence check.
disable-model-invocation: true
---

# Refactor

Change structure, not externally observable behavior.

1. Map the target code, its callers, public surface, and current verification path with `glob`, `grep`, and focused `read` calls. Identify the specific structural problem and the behavior that must remain unchanged.
2. Establish a narrow baseline by running a real path or existing focused coverage and record the observable result.
3. Choose the smallest structural change that removes the problem. Keep names, inputs, outputs, errors, ordering, and side effects stable unless the request explicitly changes one.
4. Apply the refactor with `edit` or `write`. Migrate every affected caller in the same change; do not leave compatibility aliases or parallel paths without a concrete need.
5. Use a `task` batch only for independent, substantial file-disjoint slices. Integrate the slices and review their shared boundaries before verification.

## Observed verification

Run the same baseline path after the refactor and compare the observed result with the recorded baseline. Finish only after behavior is observed to match while the targeted structural problem is removed; report both observations.
