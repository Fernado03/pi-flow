---
name: setup-pi-flow
description: Configure the issue tracker, triage labels, and durable domain-record layout used by Pi Flow engineering flows.
disable-model-invocation: true
---

# Setup Pi Flow

Configure the repository once before a flow needs to publish a spec or tickets. Keep all Pi Flow configuration under `.pi-flow/`.

## 1. Explore

Inspect only what exists:

- the repository remote and any existing tracker convention;
- `.pi-flow/issue-tracker.md`, `.pi-flow/triage-labels.md`, `.pi-flow/CONTEXT.md`, and `.pi-flow/docs/adr/`;
- `.scratch/` for an established local-ticket convention;
- whether the triage skill is available;
- monorepo signals: a workspace manifest or populated packages with source directories.

## 2. Decide with the user

Present findings, then settle these in order:

1. **Issue tracker.** Recommend GitHub for a GitHub remote, GitLab for a GitLab remote, and local markdown otherwise. Also accept another tracker when the user describes its workflow.
2. **Triage labels.** Ask only if triage is available. Recommend the canonical labels unless the repository already uses different ones.
3. **Domain records.** Use one `.pi-flow/CONTEXT.md` and `.pi-flow/docs/adr/` by default. For a genuine monorepo, offer a `.pi-flow/CONTEXT-MAP.md` that points to context-specific records.

Show drafts before writing. Preserve user edits in existing Pi Flow records.

## 3. Write

Create or update only the records required by the decisions:

- `.pi-flow/issue-tracker.md`, using the matching seed: [GitHub](./issue-tracker-github.md), [GitLab](./issue-tracker-gitlab.md), or [local markdown](./issue-tracker-local.md). For another tracker, write the user's workflow directly.
- `.pi-flow/triage-labels.md` from [triage-labels.md](./triage-labels.md) only when triage is available.
- `.pi-flow/domain.md` from [domain.md](./domain.md), tailored to the selected single- or multi-context layout.
- Create `.pi-flow/CONTEXT.md`, `.pi-flow/CONTEXT-MAP.md`, and ADR directories only when the selected layout or a resolved decision requires them. Do not seed empty records.

## Done

State the records updated, configured tracker, and which Pi Flow commands now rely on them. They remain ordinary project files: edit them directly; rerun this setup only to change tracker or layout.