# Domain documentation

How Pi Flow skills consume the repository's durable domain record.

## Read before work

If present, read:

- `.pi-flow/CONTEXT.md` for the project's glossary and bounded-context notes.
- `.pi-flow/docs/adr/` entries relevant to the work.

If either is absent, proceed silently. Do not create it merely because it is absent. `/pi-grill-with-docs` records terminology and decisions only when the work establishes them.

## Layout

```
.pi-flow/
├── CONTEXT.md
└── docs/
    └── adr/
        ├── 0001-event-sourced-orders.md
        └── 0002-postgres-for-write-model.md
```

## Rules

- Use glossary terms in issue titles, designs, hypotheses, and tests. Do not replace a term with a synonym the glossary rejects.
- If a needed concept is absent, reconsider the wording or record it through `/pi-grill-with-docs` when it is genuinely a domain gap.
- Surface an ADR conflict explicitly instead of silently contradicting it.