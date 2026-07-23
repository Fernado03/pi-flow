# ADR Format

ADRs live in `.pi-flow/docs/adr/` and use sequential names such as `0001-event-sourced-orders.md`. Create the directory only when the first ADR is justified.

## Template

```md
# {Short decision title}

{One to three sentences stating the context, decision, and rationale.}
```

The record may be a single paragraph. Its value is preserving that a non-obvious decision was made and why, not filling sections.

## Optional sections

Include these only when they retain useful information:

- status frontmatter: `proposed`, `accepted`, `deprecated`, or `superseded by ADR-NNNN`;
- **Considered Options** when rejected alternatives matter later;
- **Consequences** for non-obvious downstream effects.

## Numbering

Inspect `.pi-flow/docs/adr/`, find the greatest existing numeric prefix, and increment it.

## Qualifying decisions

Record only hard-to-reverse, surprising, trade-off decisions. Typical examples include architectural shape, context integration, locked-in technology, data ownership, deliberate departures from the obvious approach, invisible constraints, and non-obvious rejected alternatives. Do not record easy-to-reverse, self-evident, or no-alternative choices.