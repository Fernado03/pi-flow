# Skill Mechanics

The vocabulary and mechanics for writing skills well — how skills are structured, invoked, and maintained. This is disclosed reference for [`writing-for-agents`](SKILL.md).

## Leading words

A **leading word** is a compact, pretrained concept that anchors behavior in few tokens:

- It guides execution in the skill body
- It appears in invocation descriptions as trigger phrasing

Examples: _lesson_, _fog of war_, _tracer bullets_, _seam_, _prototype_

Leading words reduce tokens and make intended behavior easier to retrieve than repeated prose.

## Invocation model

Skills split on one axis: who can invoke them?

### User-invoked skills

Set `disable-model-invocation: true` in frontmatter.

- Only humans type them explicitly (e.g., `/grill-me`)
- Their metadata is hidden from the model's baseline context
- Users must remember they exist; cost is cognitive load

Add a router skill when user-invoked skills multiply beyond what users can remember.

### Model-invoked skills

Omit `disable-model-invocation`. The model sees their description in the baseline context.

- The model can invoke them autonomously when the task fits
- Other skills can reach them
- They contribute context load because the description is visible

Write model-facing descriptions with distinct trigger phrasing that names branches clearly.

## Description writing

Every model-invoked skill has a **description**. Prune harder than you think necessary:

1. Front-load the skill's leading word
2. Keep one trigger per branch; collapse synonyms
3. Keep identity already explained in the body out of the description

## Structure

Skills contain **steps** and **reference**. Place each by how immediately the model needs it:

1. **In-skill step** — an ordered action in `SKILL.md`. End each step with a checkable, suitably exhaustive **completion criterion**.
2. **In-skill reference** — a definition, rule, or fact consulted on demand. A flat peer set is valid when the skill is all reference.
3. **External reference** — reference in a separate file, reached through a **context pointer** only when needed.

Use **co-location**: keep a concept's definition, rules, and caveats together.

## Progressive disclosure

Move reference from `SKILL.md` to a linked, descriptively named file:

- Inline what every branch needs
- Disclose material needed by only some branches
- A context pointer's wording determines whether and when the model reads its target

When `SKILL.md` becomes too long, disclose reference rather than growing the main body.

## Granularity

Create new skills only when they earn the split cost:

- **By invocation** — distinct leading word the model must recognize independently, or another skill must reach it
- **By sequence** — visible later steps cause observed premature completion despite sharpened criteria

Avoid splitting purely for organization if it adds token cost without reducing errors.

## Single source of truth

Give every meaning exactly one home. Check every line for relevance, then apply the no-op test: if it does not change model behavior, delete it.

## Failure modes

- **Premature completion** — ending a step before it is genuinely done. Sharpen the completion criterion first; hide later steps only after observing that a sharp criterion cannot stop the rush.
- **Duplication** — same meaning in multiple places. It costs maintenance, tokens, and correct information hierarchy.
- **Sediment** — stale layers accumulate because adding feels safer than removing. Apply pruning regularly.
- **Sprawl** — a skill too long even when every line is live and unique. Disclose reference and split only by genuine branch or sequence boundaries.
- **No-op** — a line the model already obeys by default. Replace weak leading words with stronger ones or delete the line.
- **Negation** — steering by naming the behavior to avoid. State the positive target instead; retain a prohibition only for an irreducible guardrail, paired with the desired behavior.
- **Negative space** — blindness to the steering done by what you leave _out_. Every decision a skill declines is delegated to the agent's priors rather than left neutral, so decide each omission deliberately (fill it, or leave it open as a real **branch**).

## Maintenance rules

Whenever you add, rename, or remove a skill — or change the flow — re-check:

- Router skills for missing routes
- Docs pages for accurate links
- Plugin JSON entries for promoted skills

Automate this where possible so it never gets stale.
