# Out-of-Scope Knowledge Base

The project `.out-of-scope/` directory stores durable records of rejected enhancement requests. It preserves the decision and prevents the same request from being re-litigated as new.

Use one readable Markdown file per concept, not per request. Keep the reason substantive enough for a maintainer who has not seen the original discussion.

## File format

```markdown
# Concept Name

Decision summary.

## Why this is out of scope

Durable reason based on project scope, technical constraints, or strategy. Include examples or code when they clarify the decision.

## Prior requests

- #42 — "Issue title"
```

## Writing records

- Use short, recognizable kebab-case names such as `dark-mode.md` or `plugin-system.md`.
- Group related requests by concept similarity, not keywords.
- Explain the durable rationale; never record temporary capacity as a rejection.
- Reference architectural constraints, scope, or an intentional alternative where relevant.
- Only rejected `wontfix` enhancements belong here, including rejected pull requests.
- Bugs never belong here.
- An already-implemented `wontfix` never belongs here; link to the implementation instead.

## Triage flow

1. Read existing `.out-of-scope/*.md` records during context gathering.
2. Surface conceptually similar records to the maintainer with their rationale.
3. If the maintainer confirms the match, append the request under **Prior requests**, post the approved explanation, apply `wontfix`, and close it.
4. If the maintainer reconsiders the decision, update or delete the record before continuing normal triage. Historical requests remain closed unless the maintainer separately decides otherwise.
5. If the request is distinct, continue normal triage.

## New rejection flow

1. Confirm with the maintainer that an enhancement is rejected.
2. Check for a matching concept record.
3. Append the request when one exists; otherwise create a new record with the decision, reason, and first request.
4. Post the approved explanation that links the record, then apply `wontfix` and close the request.