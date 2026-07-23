# Learning Record Format

Learning records live in `learning-records/` and use sequential filenames: `0001-slug.md`, `0002-slug.md`, and so on. Create the directory only when writing the first record.

They are teaching equivalents of ADRs: they capture non-obvious lessons, key insights, and stated prior knowledge that shape future sessions and the zone of proximal development.

## Template

```md
# {Short title of what was learned or established}

{1–3 sentences: what was learned or established, and why it matters for future sessions.}
```

A record can be a single paragraph. Record what is now known and why it changes future teaching; do not add empty sections.

## Optional sections

Use only when they add value:

- **Status** frontmatter (`active | superseded by LR-NNNN`) when an earlier understanding is replaced.
- **Evidence** for the demonstration, answer, exercise, or prior experience supporting a claim that may need revisiting.
- **Implications** for non-obvious effects on future teaching.

## Numbering

Read `learning-records/`, find the highest existing number, and increment it.

## When to write a learning record

Write a record when the user:

1. Demonstrates genuine understanding of something non-trivial.
2. Discloses prior knowledge, including its claimed depth.
3. Corrects a misconception.
4. Changes the mission in response to learning; cross-link to `MISSION.md` and update it.

Do not record material that was merely covered, a concise definition already in `GLOSSARY.md`, or session-by-session activity logs.

## Supersession

When a later record contradicts an earlier one, mark the old record `Status: superseded by LR-NNNN` rather than deleting it. The history of changed understanding is useful signal.
