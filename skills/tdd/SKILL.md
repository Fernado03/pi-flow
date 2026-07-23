---
name: tdd
description: Practice test-driven development with observable red-green-refactor cycles at confirmed public seams for durable behavior-focused coverage.
---

# Test-Driven Development

TDD is an observable **red → green → refactor** loop. It produces tests worth keeping only when they prove behavior at public interfaces. Read project context and local ADRs when they exist so names and interfaces use the project’s domain language.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. A good test reads like a specification, describes what callers can do, and survives internal refactors.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for boundary-mocking guidance.

## Seams — where tests go

A **seam** is the public boundary where behavior is observable without reaching into internals. Test at seams, never against implementation details.

Before writing a test, identify the seams that matter. Use `ask` to confirm them with an available user when the contract is ambiguous; otherwise state the chosen public seam explicitly and keep coverage focused there. Do not try to test every edge case by default.

## Anti-patterns

- **Implementation-coupled:** mocks internal collaborators, tests private methods, or verifies through a side channel rather than the interface.
- **Tautological:** derives the expected result with the same logic under test, so it passes by construction.
- **Horizontal slicing:** writes a bulk of imagined tests before implementation. Work in vertical slices instead: one behavior, one failing test, one minimal implementation.

## Rules of the loop

1. **Red:** write one behavior-focused test at a confirmed seam. Run it and observe the expected failure for the intended reason.
2. **Green:** write only the minimum production code that makes that one test pass. Run it and observe the passing result.
3. **Refactor:** once green, improve duplication, naming, or structure without changing behavior. Re-run the test after each meaningful refactor and keep it green.
4. Repeat one vertical slice at a time. Do not anticipate future tests or add speculative features.

A red result must be observed before green, and green must be observed before refactoring. Keep refactoring separate from feature behavior: no new behavior belongs in the refactor phase.
