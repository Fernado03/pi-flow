---
name: fix
description: Diagnose and repair a defect at its root cause, then reproduce the affected behavior to prove the repair.
disable-model-invocation: true
---

# Fix

Repair the cause of the defect, not an incidental symptom.

1. Capture the reported behavior as a narrow, repeatable reproduction. Locate the relevant flow with `glob`, `grep`, and focused `read` calls; inspect callers, inputs, state transitions, and error paths.
2. Form and test a root-cause hypothesis from repository evidence. Do not change code until the reproduction and cause agree; instrument or inspect the live path when needed.
3. Select the smallest change at the shared point where the bad behavior originates. Preserve unrelated behavior and remove obsolete workaround code only when the source fix makes it unnecessary.
4. Apply the repair with `edit` or `write`. Add or update focused regression coverage when the project has a suitable convention and the defect defines an observable contract.
5. Use a `task` batch only for independent, substantial investigations or file-disjoint repairs. Keep diagnosis, integration, and final causality judgment with the primary flow.

## Observed verification

Run the original reproduction against the repaired code and inspect the result. Finish only after observing the failure no longer occurs and the intended behavior does; report the exact exercised path and observation.
