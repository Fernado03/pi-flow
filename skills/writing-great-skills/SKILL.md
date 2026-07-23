---
name: writing-great-skills
description: Reference for writing and editing predictable, maintainable skills.
disable-model-invocation: true
---

# Writing Great Skills

A skill exists to wrangle determinism out of a stochastic system. **Predictability** — the model taking the same _process_ every run, not producing the same output — is the root virtue; every lever below serves it.

**Bold terms** are defined in [`GLOSSARY.md`](GLOSSARY.md); read that file when you need the full definition.

## Invocation

Two choices trade different costs:

- A **model-invoked** skill keeps a concise trigger **description**, so the model can invoke it autonomously and other skills can reach it. It contributes **context load** because the description is visible in the baseline prompt. Omit `disable-model-invocation` and write a model-facing description with distinct trigger phrasing.
- A **user-invoked** skill sets `disable-model-invocation: true`, keeping its metadata out of the baseline prompt. Only the user invokes it directly, which eliminates context load but spends **cognitive load**: the user must remember it exists. Its description is a one-line human-facing summary without trigger lists.

Choose model invocation only when the model must reach the skill on its own or another skill must. If it only runs by hand, make it user-invoked.

When user-invoked skills multiply beyond what users can remember, add one user-invoked router skill that names the others and when to use them.

## Writing the description

A model-invoked **description** states what the skill is and names its triggering **branches**. Every word adds **context load**, so prune it harder than the body:

- Front-load the skill's leading word.
- Keep one trigger per branch; collapse synonyms that name the same branch.
- Keep identity already explained in the body out of the description.

## Information hierarchy

A skill contains **steps** and **reference**. Place each by how immediately the model needs it:

1. **In-skill step** — an ordered action in `SKILL.md`. End each step with a checkable, suitably exhaustive **completion criterion**.
2. **In-skill reference** — a definition, rule, or fact consulted on demand. A flat peer set is valid when the skill is all reference.
3. **External reference** — reference in a separate file, reached through a **context pointer** only when needed. A sibling `GLOSSARY.md` is disclosed reference.

Demanding completion criteria drive thorough **legwork**, including in reference-only skills.

**Progressive disclosure** moves reference from `SKILL.md` to a linked, descriptively named file. Inline what every branch needs; disclose material needed by only some branches. A context pointer's wording determines whether and when the model reads its target.

Use **co-location** within each level: keep a concept's definition, rules, and caveats together.

## When to split

**Granularity** spends one of two loads, so every split must earn its cost:

- **By invocation** — create a model-invoked skill only for a distinct leading word the model must recognize independently, or when another skill must reach it.
- **By sequence** — split steps only when visible later steps cause observed **premature completion** despite a sharpened completion criterion.

## Pruning

Give every meaning a **single source of truth**.

Check every line for **relevance**. Then apply the no-op test sentence by sentence: if it does not change model behavior, delete it rather than merely trimming it.

## Leading words

A **leading word** is a compact, pretrained concept that anchors behavior in few tokens, such as _lesson_, _fog of war_, or _tracer bullets_. It guides execution in the body and invocation in the description.

Refactor repeated ideas into leading words where the word is clearer than repeated prose. For example:

- “fast, deterministic, low-overhead” → _tight_
- “a loop you believe in” → _red_

Use leading words to reduce tokens and make the intended behavior easier to retrieve.

## Failure modes

- **Premature completion** — ending a step before it is genuinely done. Sharpen the completion criterion first; hide later steps only after observing that a sharp criterion cannot stop the rush.
- **Duplication** — the same meaning in multiple places. It costs maintenance, tokens, and correct information hierarchy.
- **Sediment** — stale layers that accumulate because adding feels safer than removing.
- **Sprawl** — a skill too long even when every line is live and unique. Disclose reference and split only by genuine branch or sequence boundaries.
- **No-op** — a line the model already obeys by default. Replace weak leading words with stronger ones or delete the line.
- **Negation** — steering by naming the behavior to avoid. State the positive target instead; retain a prohibition only for an irreducible guardrail, paired with the desired behavior.