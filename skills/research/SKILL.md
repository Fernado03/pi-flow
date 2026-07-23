---
name: research
description: Investigate a question with primary sources, returning cited findings or a durable report when the work needs a repository artifact.
---

# Research

Use a `task` batch to investigate questions outside the working directory while the primary flow continues.

## Source standard

Prefer the source that owns the claim: official documentation, specifications, source code, first-party APIs, or authoritative project records. Treat secondary material as a lead, then trace each material claim to its primary source. Distinguish observed facts from inferences.

## Dispatch

1. Scope the exact question, decision it supports, and required deliverable before dispatching. Do not delegate a question answerable by a focused local read.
2. For read-only findings, dispatch one `task` item with `agent: scout`. Give it the question, source boundaries, required claims, and acceptance criteria. Require concise cited findings returned to the parent; it must not edit the repository.
3. When several independent questions exist, dispatch them together in one `task` batch. Keep each task source-disjoint where practical and synthesize their findings in the parent flow.
4. When the research must persist as a report, dispatch a `task` worker with an explicit destination path and report contract, with `isolated: true` and `apply: true`. Set neither option for read-only research. Match the repository's established research-note location, or choose a clear project location and state it.

## Report contract

A durable report is one Markdown file. State the question, direct answer, evidence grouped by claim, source links or paths, uncertainties, and implications for the decision. Cite every material claim. Link the report from the decision ticket or handoff rather than copying its contents into a tracker index.
