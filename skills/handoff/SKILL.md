---
name: handoff
description: Compact the current conversation into a handoff document for another session to continue.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

# Handoff

Use `write` to save a handoff document in the user's OS temporary directory, not the current workspace, so a fresh session can continue the work.

Include a `## Suggested skills` section that names skills the next session should use.

Do not duplicate material already captured in specifications, plans, ADRs, issues, commits, or diffs; reference it by path or URL instead.

Redact sensitive information, including API keys, passwords, and personally identifiable information.

If the user supplied arguments, treat them as the next session's focus and tailor the handoff to it.