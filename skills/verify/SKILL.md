---
name: verify
description: Run the smallest useful checks for a change and report only observed pass, fail, partial, or blocked results.
disable-model-invocation: true
---

# Verify

Answer what checks actually prove. Never call a change verified unless the relevant command or interaction ran and passed.

1. Identify the project's verification conventions from the affected area and relevant build, test, lint, or type configuration. Inspect changed and staged paths with `bash` using `git status --short`, `git diff --stat`, and, when needed, targeted diffs.
2. Choose the narrowest useful evidence: an exercised changed path or targeted test first; then related checks, typecheck, lint, build, or a broader suite only when warranted. Prefer an explicit user-provided command unless unsafe.
3. If several materially different check sets are reasonable, use `ask` to choose. Do not run expensive or unrelated checks by default.
4. Run the selected checks with `bash`, retain concise pass/fail evidence, and distinguish failures caused by the change from environmental blockers.
5. Write the full report to `.pi-flow/verify/<YYYY-MM-DD>/pi-verify-<slug>.md`, preserving any established project convention. Do not stage the report unless the user explicitly selects it for a commit.

## Report

```markdown
## Verification result

Status: pass | fail | partial | blocked

## Commands run

- `<command>` — pass/fail

## Evidence

Short, relevant observed output or interaction result.

## Remaining risk

What was not checked and why.

## Recommended next step

none | /pi-tweak | /pi-fix | /pi-commit-and-document
```

If no useful command or real interaction exists, report `blocked` and state why. Do not auto-launch the recommendation.

## Completion

Report the saved path, status, commands actually run, remaining risk, and recommended next Pi Flow action.