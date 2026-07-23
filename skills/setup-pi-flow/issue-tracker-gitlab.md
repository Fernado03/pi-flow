# Issue tracker: GitLab

Issues and specs live as GitLab issues. Use `glab` for tracker operations.

## Conventions

- Create: `glab issue create --title "..." --description "..."`.
- Read: `glab issue view <number> --comments`.
- List: `glab issue list -F json` with needed label filters.
- Comment: `glab issue note <number> --message "..."`.
- Label: `glab issue update <number> --label "..."` or `--unlabel "..."`.
- Close: comment first when needed, then `glab issue close <number>`.

Infer the project from the current checkout.

## Merge requests as a triage surface

**MRs as a request surface: no.** Set this to `yes` only when external merge requests are treated as incoming requests. When enabled, use the matching `glab mr` operations.

## Wayfinding

`/pi-wayfinder` stores its map in one issue labelled `wayfinder:map`; each child decision issue starts with `Part of #<map>` and has a `wayfinder:<type>` label.

Add a native blocker with a `/blocked_by #<n>` quick action posted through `glab issue note`. If native links are unavailable, put `Blocked by: #<n>` at the top of the description. The frontier is the first open, unassigned child with no open blockers. Claim by assigning yourself; resolve by posting the answer, closing the issue, and linking the result from the map.