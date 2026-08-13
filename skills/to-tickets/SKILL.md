---
name: to-tickets
description: Publish tracer-bullet tickets with explicit blocking edges from a plan, spec, or conversation through the configured tracker.
disable-model-invocation: true
---

# To Tickets

Break a plan, spec, or conversation into **tracer-bullet** tickets: complete vertical slices with explicit blocking edges.

## 1. Gather context

Use the conversation. If given a spec path, issue identifier, or URL, read its full body and comments. If needed, inspect the relevant codebase area, using `.pi-flow/CONTEXT.md` vocabulary and applicable `.pi-flow/docs/adr/` decisions.

Look for prefactoring that makes the intended change easy before implementing it.

## 2. Draft the graph

Each normal ticket must:

- deliver one narrow but complete path through the necessary layers;
- be demoable or verifiable by itself;
- fit within one fresh working context;
- declare only the tickets that genuinely block it.

Tickets with no blockers form the frontier and can start immediately.

A wide mechanical refactor is the exception. When a single change has a codebase-wide blast radius and no vertical slice can stay green, use **expand–contract**:

1. **Expand:** introduce the new form beside the old form.
2. **Migrate:** move callers in blast-radius-sized batches, such as by package or directory. Every batch is blocked by expand and must preserve a green build while the old form remains.
3. **Contract:** remove the old form only after every migration batch; it is blocked by all migration tickets.

If batches cannot remain green independently, retain the sequence on one integration branch and add a final integrate-and-verify ticket blocked by every batch. The integrated branch, not each batch, is the green guarantee.

## 3. Confirm

Present a numbered graph. For every ticket include its title, blocking edges, and the end-to-end behavior it delivers. Ask whether the granularity and every edge are correct, then revise until approved.

## 4. Publish

Use `.pi-flow/issue-tracker.md`:

- **Local markdown:** create one file per ticket under `.pi-flow/<feature-slug>/issues/<NN>-<slug>.md`, in dependency order. Never combine tickets in one file.
- **Tracker:** create one issue per ticket in dependency order so blockers can use real identifiers. Use native blocking and sub-issue relationships when supported; otherwise write the blocker references in the ticket body. Apply the mapped `ready-for-agent` label when available.

Local ticket structure:

```markdown
# <NN> — <Ticket title>

**What to build:** the end-to-end behavior, not a layer list.

**Blocked by:** required ticket numbers/titles, or "None — can start immediately".

**Status:** ready-for-agent

- [ ] Acceptance criterion
- [ ] Acceptance criterion
```

Tracker ticket structure:

```markdown
## Parent

Reference the source issue when one exists.

## What to build

The end-to-end behavior.

## Acceptance criteria

- [ ] Criterion

## Blocked by

- Each blocking ticket, or "None — can start immediately".
```

Avoid file paths and code snippets that will go stale. A compact prototype-derived shape is allowed when it captures a decision better than prose.

Do not close or modify a parent issue.

## Done

Report ticket locations, the blocking-edge graph, status, and `/pi-implement` for the frontier.