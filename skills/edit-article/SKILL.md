---
name: edit-article
description: Restructure an article and tighten its prose while preserving the argument's dependency order.
disable-model-invocation: true
---

Edit an article with the user, not around them.

1. Read the full draft and split it by headings. For each section, state its claim, supporting material, and prerequisites. Arrange sections so readers encounter each prerequisite before the claim that needs it.
2. Use `ask` to confirm the proposed outline before rewriting. Resolve a structural ambiguity before changing prose.
3. Rewrite one confirmed section at a time for clarity, coherence, and flow. Keep each paragraph at 240 characters or fewer. Preserve the author's claims, evidence, and intended audience unless the user changes them.
4. After each section, present the revision and use `ask` before proceeding when the edit changes meaning, emphasis, or scope.
5. Finish with a complete revised article and a short list of substantive structural or meaning-level changes.
