---
name: prototype
description: Build throwaway code that answers a focused UI, state-model, or logic design question before production implementation.
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Pick a branch

Identify the question from the request and surrounding code. Use `ask` only when it remains genuinely ambiguous:

- **“Does this logic or state model feel right?”** → [LOGIC.md](LOGIC.md). Build a tiny interactive terminal app that drives hard-to-reason-about state transitions.
- **“What should this look like?”** → [UI.md](UI.md). Generate several radically different UI variations on one route, switchable by a URL search parameter and a floating bottom bar.

If ambiguity remains and the user is unavailable, choose the branch that matches the nearby code (backend module → logic; page or component → UI) and state that assumption at the top of the prototype.

## Rules for both branches

1. **Mark it as throwaway from day one.** Put it near the code it explores, name it as a prototype, and follow the project’s routing conventions.
2. **One command to run.** Use the project’s existing task runner or runtime; do not add tooling for the prototype.
3. **No persistence by default.** Keep state in memory. If persistence is the question, use an explicitly disposable scratch database or local file.
4. **Skip production polish.** No tests, production-grade error handling, or abstractions beyond what makes the prototype runnable.
5. **Surface state.** After each logic action or UI variant switch, render the relevant state so the user can inspect the change.
6. **Capture the outcome.** Fold the validated decision into production code. Preserve the prototype as a primary source on a throwaway branch, outside the main branch, with a pointer from the implementation issue and the question and verdict it settled.
