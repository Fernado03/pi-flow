# Glossary — Building Great Skills

The domain model for what makes a skill great. A skill exists to wrangle determinism out of a stochastic system; the root virtue is **Predictability**, and every term below is a lever on it. This is the disclosed reference for [`writing-great-skills`](SKILL.md).

The terms are grouped by axis: **Invocation** (how a skill is reached), **Information Hierarchy** (how its content is arranged), **Steering** (how model runtime behavior is shaped), and **Pruning** (how it is kept lean). Each **failure mode** lives beside the lever that cures it, tagged _failure mode_.

**Bold terms** in any definition are themselves defined in this glossary; find them by their heading.

## Predictability

The degree to which a skill makes the model behave the same _way_ on every run — the same process, not the same output. A brainstorming skill should _predictably_ diverge; its tokens vary, its behavior does not. This is the root virtue every other term serves.

_Avoid_: consistency, reliability, robustness, output-determinism

## Invocation

How a skill is reached and the two loads it pays.

### Model-Invoked

A skill with a **description** that the model can invoke autonomously; the human can still invoke it directly. It pays permanent **context load** for discoverability. Choose it only when the model or another skill must reach it; otherwise remove the description and make it user-invoked.

_Avoid_: ability, tool, capability

### User-Invoked

A skill with `disable-model-invocation: true`, hidden from the baseline prompt and invoked directly by the user. It trades discoverability for zero **context load** and spends **cognitive load**: the user must remember it.

_Avoid_: procedure, workflow, command

### Description

A model-invoked skill's concise trigger text and its top-level **context pointer**. It determines autonomous reach and is the source of **context load**.

_Avoid_: frontmatter, summary

### Context Pointer

A reference in context that names material outside the current context and states when to read it. Its wording determines whether and when the model reads the target. Sharpen a weak pointer before moving required material inline.

_Avoid_: link, reference, import

### Context Load

The baseline-prompt cost of a model-invoked skill's description. It spends tokens and attention, and constrains unnecessary model-invoked splits.

_Avoid_: token cost, context bloat

### Cognitive Load

The cost of remembering which user-invoked skills exist and when to use them. It is the price of human agency, not a cost to minimize blindly.

_Avoid_: human index, burden, overhead

### Router Skill

A user-invoked skill that tells the user which other user-invoked skills to choose and when. It reduces **cognitive load** but cannot invoke hidden skills itself.

_Avoid_: dispatcher, menu, registry, index, router procedure

### Granularity

How finely skills are divided. More model-invoked skills spend **context load**; more user-invoked skills spend **cognitive load**. Split by **invocation** only for a distinct leading word the model must recognize independently, or by **sequence** only when later steps need hiding to prevent premature completion.

_Avoid_: chunking, modularity

## Information Hierarchy

How a skill's content is arranged by immediacy.

### Information Hierarchy

A single ladder with three rungs:

- **Steps** — in-file, primary
- **Reference**, in-file — secondary
- **Reference**, disclosed — behind a **context pointer**

A reference-only skill legitimately uses only the bottom two rungs. For a skill with steps, disclose reference that does not serve every path so its steps stay legible.

_Avoid_: structure, organization, layout

### Steps

Ordered actions the model performs. Every step ends with a **completion criterion** that is clear enough to distinguish done from not done.

_Avoid_: workflow, instructions, choreography

### Reference

Definitions, rules, facts, examples, or conditional instructions consulted on demand. It is the primary candidate for **progressive disclosure**.

_Avoid_: supporting material, docs, background

### External Reference

Reference outside the skill system: a plain, non-invocable file that any skill can point to. It is the only shared home for reference needed by multiple user-invoked skills.

_Avoid_: doc, resource, knowledge base

### Progressive Disclosure

Moving reference out of `SKILL.md` behind a **context pointer** so steps remain legible. Inline what every branch needs and disclose material reached by only some branches.

_Avoid_: lazy loading, chunking

### Co-location

Keeping a concept's definition, rules, and caveats together, so reading one part brings the required neighboring material with it. It complements the information hierarchy: hierarchy decides depth, co-location decides proximity.

_Avoid_: grouping, clustering, cohesion

### Sprawl

_Failure mode._ A skill that is too long even when its content is live and unique. Cure it through the information hierarchy: disclose reference and split only by genuine branch or sequence boundaries.

_Avoid_: bloat, length, size, verbosity

## Steering

Levers that shape runtime behavior toward **Predictability**.

### Branch

A distinct way a skill is used, so different runs take different paths through it.

_Avoid_: path, case, fork

### Leading Word

A compact concept already present in model pretraining that anchors behavior in few tokens, such as _lesson_, _fog of war_, or _tracer bullets_. Use it in the body to guide execution and in the description to guide invocation.

_Avoid_: keyword, term, motif

### Completion Criterion

The condition that tells the model a unit of work is done. Its clarity resists **premature completion**; its demand sets **legwork**. The strongest criteria are both checkable and exhaustive.

_Avoid_: done condition, exit condition, stopping rule

### Legwork

The work done within a step: reading files, exploring code, making changes, or acquiring needed facts instead of asking the user for available information. It is raised by a demanding **completion criterion** and can be thin even without premature completion.

_Avoid_: scope, effort, diligence, coverage

### Post-Completion Steps

Steps after the current step. When visible, they can pull attention toward **premature completion**; a true context boundary can hide them.

_Avoid_: horizon, fog of war, lookahead

### Premature Completion

_Failure mode._ Ending a step before it is genuinely done because attention moves to the next step. Sharpen its completion criterion first. Only after observing that an irreducibly fuzzy criterion still causes a rush should a genuine context boundary hide later steps.

_Avoid_: premature closure, the rush, rushing, shortcutting

### Negation

_Failure mode._ Steering by naming behavior to avoid, which can make it more available. State the positive target instead. Retain a prohibition only for an irreducible guardrail and pair it with the desired behavior.

_Avoid_: ironic rebound, don't-prompting, the pink elephant

## Pruning

Keeping a skill lean.

### Single Source of Truth

The state where each meaning has one authoritative home, so behavioral changes require one edit. **Duplication** violates it.

_Avoid_: home, canonical location

### Duplication

_Failure mode._ The same meaning in more than one authoritative place. It costs maintenance and tokens and incorrectly increases that meaning's prominence.

_Avoid_: repetition, redundancy

### Relevance

Whether a line still bears on the skill. A line loses relevance by being stale or by describing a branch that should be disclosed.

_Avoid_: load-bearing, staleness, freshness

### Sediment

_Failure mode._ Stale, irrelevant layers accumulated because adding felt safer than removing.

_Avoid_: accretion, bloat, cruft, rot

### No-Op

_Failure mode._ An instruction the model already follows by default. Test each line: does it change behavior? A weak leading word is a no-op; strengthen it or delete it.

_Avoid_: redundant instruction, restating the obvious, belaboring
