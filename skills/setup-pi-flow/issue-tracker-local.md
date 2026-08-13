# Issue tracker: Local Markdown

Issues and specs live as markdown files in `.pi-flow/`.

## Conventions

- One feature per directory: `.pi-flow/<feature-slug>/`.
- The spec is `.pi-flow/<feature-slug>/spec.md`.
- Implementation tickets are one file each at `.pi-flow/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order.
- A `Status:` line near the top records triage state; see `triage-labels.md`.
- Append conversation history under `## Comments`.

## Operations

- To publish a spec or ticket, create the appropriate file under `.pi-flow/<feature-slug>/`.
- To fetch a ticket, read its referenced path.
- A wayfinding map is `.pi-flow/<effort>/map.md`; decision tickets are its numbered issue files.
- Each decision ticket has `Type:` (`research`, `prototype`, `grilling`, or `task`) and `Status:` (`claimed` or `resolved`).
- A `Blocked by:` line names required ticket numbers. The frontier is the first unclaimed, unresolved ticket whose blockers are resolved.
- Claim before work by setting `Status: claimed`. Resolve by appending `## Answer`, setting `Status: resolved`, then linking the result from the map's decisions-so-far.

`/pi-wayfinder` uses these map conventions.