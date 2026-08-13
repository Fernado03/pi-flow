---
name: code-review
description: Review changes from a fixed point against repository standards and the originating specification in separate evidence-based axes.
---

# Code Review

Review the change between `HEAD` and a user-supplied fixed point on two independent axes:

- **Standards** — whether the change follows documented repository standards and sound maintainability practice.
- **Spec** — whether the change faithfully implements its issue, PRD, or stated requirements.

Keep the axes separate so a pass on one cannot conceal failure on the other.

## Safety

This is read-only for application source. Never stage, commit, push, stash, delete, or patch source while reviewing. Report findings; leave fixes to the implementation flow. You may write only review working notes under `.pi-flow/` and review documents explicitly requested by the user.

## 1. Pin the target

Use the fixed point the user supplies: a commit, branch, tag, `main`, or equivalent. If it is absent, ask for one concise clarification. Confirm it resolves and that its three-dot comparison to `HEAD` is non-empty before reviewing it. Capture the comparison and commit list once, then use targeted per-file diffs rather than repeatedly reading the whole change.

## 2. Locate relevant evidence

Find the originating specification in this order:

1. issue references in commit messages, using the repository's `.pi-flow/issue-tracker.md` workflow when present;
2. a path supplied by the user;
3. a matching document in `docs/`, `specs/`, or `.pi-flow/`.

If no specification exists, state that the Spec axis is unavailable rather than inventing one.

Find standards that govern changed code: contributor guidance, coding standards, architecture records, security requirements, and local conventions. Read only sources that apply to the changed area.

Apply this smell baseline unless a documented repository standard overrides it; each is a judgment call, not an automatic violation, and tooling-enforced rules do not need duplicate findings:

- **Mysterious Name** — a name does not reveal its purpose or value; rename or clarify the design.
- **Duplicated Code** — repeated logic shape; extract the shared behavior when the duplication is real.
- **Feature Envy** — behavior reaches into another object's data more than its own; move it toward that data.
- **Data Clumps** — fields or parameters travel together; consider a domain type.
- **Primitive Obsession** — primitives represent a meaningful domain concept; introduce a small type when warranted.
- **Repeated Switches** — the same case analysis recurs; centralize it or use a fitting polymorphic shape.
- **Shotgun Surgery** — one logical change scatters across unrelated locations; gather change behind a module.
- **Divergent Change** — a module changes for unrelated reasons; separate the reasons.
- **Speculative Generality** — unsupported hooks, abstraction, or configuration; remove it until demand is real.
- **Message Chains** — callers navigate long object chains; hide the traversal behind an appropriate method.
- **Middle Man** — code mostly delegates; remove it when it adds no policy or isolation.
- **Refused Bequest** — inheritance is mostly rejected; prefer composition.

## 3. Review independently

Create `.pi-flow/reviews/<YYYY-MM-DD>/review-<slug>/session.md` with target, fixed point, scope, comparison, commits, evidence sources, and exclusions.

For a non-trivial review with both axes available, make one `task` batch containing independent work:

- a `reviewer` task for **Standards**: inspect the diff against the applicable standards and baseline smells; report each finding by path and line or symbol, cite the governing rule or label the smell as judgment, quote relevant change evidence, and keep the report concise;
- a `task` task for **Spec**: compare the diff with the source requirements; identify missing or partial requirements, unrequested behavior, and behavior that appears implemented incorrectly; cite each requirement and changed location.

Give each task the fixed comparison, commit list, changed-file scope, applicable evidence paths, and its complete axis brief. Do not send tasks for a trivial review; inspect it directly. If the specification is unavailable, run only the Standards review and record why the Spec axis was skipped.

Write task results or direct analysis separately to `standards.md` and `spec.md`. Do not let one axis revise the other.

## 4. Findings and result

Read both axis reports and write `synthesis.md` in the session directory. Within each axis, order findings by **Blocker**, **High**, **Medium**, **Low**, then **Nit**. Every finding must include:

- path and line or symbol where possible;
- problem and evidence;
- why it matters;
- a concrete suggested fix.

Present `## Standards` and `## Spec` separately. Do not merge findings or choose a winner between axes. End with one summary line stating the finding count and worst issue for each available axis.

Conclude with exactly one result line:

- `Review result: approve`
- `Review result: approve with nits`
- `Review result: changes requested`
- `Review result: blocked`

Return the synthesis path, result line, and one recommended next action. Do not start implementation automatically.