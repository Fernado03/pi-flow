---
name: batch-grill-me
description: Interview a design round by round, asking every currently decidable question at once.
disable-model-invocation: true
---

Interview until a shared design has no unresolved branches. Model it as a design tree: each decision unlocks the decisions that depend on it.

Work in rounds. The **frontier** contains every unsettled decision whose prerequisites are settled. In each round:

1. Recompute the frontier from all answers and discovered facts.
2. Ask the whole frontier at once with `ask`: number each question and include a recommended answer.
3. Wait for the user's decisions before opening the next round. A question that depends on another open question belongs to a later round.

Facts are the assistant's responsibility. When a frontier question needs an environment fact, use a `task` batch with the appropriate read-only role (normally `scout`) to discover it; do not ask the user for information available from the workspace or tools. Do not block the rest of the frontier: treat the running fact check as an unsettled prerequisite, ask independent decisions now, and defer only questions downstream of it.

Finish only when the recomputed frontier is empty: every branch has been visited and nothing is silently assumed. Do not implement the design until the user confirms the shared understanding.
