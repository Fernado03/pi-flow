---
name: diagnosing-bugs
description: Diagnose hard bugs and performance regressions with a tight, red-capable feedback loop before forming or testing root-cause hypotheses.
---

# Diagnosing Bugs

A discipline for hard bugs. Skip a phase only with an explicit justification. Read project context and local ADRs when they exist so the diagnosis uses the codebase’s domain language.

## Redact

This skill has you show commands, outputs and captured artifacts. **Redact every secret first** — write `<REDACTED>` in its place. Build loops against env vars, so the credential stays in the environment rather than in what you show. Captured artifacts carry auth headers: quote only the lines that carry the signal.

If the redacted output is not enough to diagnose the bug, say so and ask the user.

## Phase 1 — Build a feedback loop

**This is the skill.** A tight pass/fail signal that goes red on the reported bug makes bisection, hypothesis testing, and instrumentation useful. Without one, do not speculate from code.

Try these, roughly in order:

1. A failing test at the seam that reaches the bug.
2. A `curl` or HTTP script against a running development server.
3. A CLI invocation with fixture input and a known-good output assertion.
4. A headless browser scenario that asserts DOM, console, or network behavior.
5. Replay of a captured request, payload, trace, or event log.
6. A throwaway harness that exercises the narrow path with one call.
7. A property or fuzz loop for intermittent wrong output.
8. A bisection harness when the regression range is known.
9. A differential loop comparing versions or configurations.
10. The human-in-the-loop template at [scripts/hitl-loop.template.sh](scripts/hitl-loop.template.sh), only when a person must click.

Treat the loop as a product: make it faster, assert the precise symptom, and eliminate nondeterminism by pinning time, seeding randomness, isolating files, and freezing network inputs. For flaky failures, raise the reproduction rate with repeated runs, stress, or narrowed timing windows.

If no loop is possible, state what was tried and request one of: access to the reproducing environment, a redacted captured artifact (HAR, logs, core dump, timestamped recording), or permission for temporary production instrumentation. Do not proceed to hypotheses without a loop.

Phase 1 is complete only after running one OMP-runnable command at least once and recording its invocation and output, redacted. It must be red-capable for the user’s exact symptom, deterministic (or reproduce at a high enough rate), and fast.

## Phase 2 — Reproduce and minimise

Run the loop until it goes red. Confirm it demonstrates the reported failure, repeats reliably enough to debug, and captures the exact error, wrong output, or timing.

Then remove inputs, callers, configuration, data, and steps one at a time, rerunning after every removal. Keep only elements whose removal makes the failure disappear. Do not proceed until the repro is minimal.

## Phase 3 — Hypothesise

Generate 3–5 ranked, falsifiable hypotheses before testing any. Each must state a prediction:

> If `<X>` is the cause, then changing `<Y>` will make the bug disappear or changing `<Z>` will make it worse.

Use `ask` to show the ranking to an available user, who may have domain knowledge that reorders it. If they are unavailable, proceed with the visible ranking.

## Phase 4 — Instrument

Map each probe to one Phase 3 prediction and change one variable at a time. Prefer debugger inspection, then targeted logs at boundaries that distinguish hypotheses; do not log everything.

Prefix temporary logs uniquely, such as `[DEBUG-a4f2]`, so they can be removed completely. For performance regressions, establish a measurement baseline first, then profile or bisect; measure before fixing.

## Phase 5 — Fix and regression test

If a correct seam exists, turn the minimised repro into a failing regression test before the repair. It must exercise the real call pattern, not a too-shallow approximation. Observe it fail, make the smallest source fix, observe it pass, then rerun the original unminimised feedback loop.

If no correct seam exists, document that architectural finding rather than adding a misleading test.

## Phase 6 — Cleanup and post-mortem

Before declaring success, re-run the original loop; confirm the regression test passes or document the missing seam; remove every `[DEBUG-...]` probe; and delete or clearly relocate throwaway harnesses. State the confirmed hypothesis in the change summary.

Then identify what would have prevented the defect. If the answer is architectural, hand off the evidence to `/pi-improve-architecture` after the repair is verified.
