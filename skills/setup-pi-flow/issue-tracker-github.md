# Issue tracker: GitHub

Issues and specs live as GitHub issues. Use `gh` for tracker operations.

## Conventions

- Create: `gh issue create --title "..." --body "..."`.
- Read: `gh issue view <number> --comments`.
- List: `gh issue list --state open --json number,title,body,labels,comments` with the needed filters.
- Comment: `gh issue comment <number> --body "..."`.
- Label: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close: `gh issue close <number> --comment "..."`.

Infer the repository from the current checkout.

## Pull requests as a triage surface

**PRs as a request surface: no.** Set this to `yes` only when external PRs are treated as incoming requests.

When enabled, use `gh pr` equivalents. A bare `#42` may be an issue or PR; resolve it with `gh pr view 42`, then fall back to `gh issue view 42`.

## Wayfinding

`/pi-wayfinder` stores its map in one issue labelled `wayfinder:map` and creates child decision issues. Use native GitHub sub-issues when available; otherwise add the child to the map task list and put `Part of #<map>` in the child body. Label children `wayfinder:<type>`.

Represent a blocking edge with GitHub issue dependencies when available:

`gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`

The blocker value is the issue database id, retrieved with `gh api repos/<owner>/<repo>/issues/<number> --jq .id`. If dependencies are unavailable, write `Blocked by: #<n>` at the top of the child body. The frontier is the first open, unassigned child with no open blockers. Claim by assigning yourself; resolve by commenting, closing, and linking the result from the map.