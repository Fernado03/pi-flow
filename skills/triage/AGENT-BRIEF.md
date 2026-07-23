# Implementation Briefs

An implementation brief is the authoritative tracker comment for `ready-for-agent`. For an issue, it says what to build; for a pull request, it says what remains on the existing diff.

## Rules

- Describe durable behavior, interfaces, types, and configuration shapes.
- State what must happen, not file paths, line numbers, or a prescribed implementation.
- Include testable acceptance criteria and explicit out-of-scope boundaries.
- Reject a brief that omits category, current behavior, desired behavior, criteria, or scope.

## Template

```markdown
## Implementation Brief

**Category:** bug / enhancement
**Summary:** one-line description

**Current behavior:**
What happens now.

**Desired behavior:**
What should happen, including relevant edge and error cases.

**Key interfaces:**
- `TypeName` — required contract change
- `functionName()` — current versus desired result
- Configuration — new or changed options

**Acceptance criteria:**
- [ ] Specific criterion
- [ ] Specific criterion
- [ ] Specific criterion

**Out of scope:**
- Excluded adjacent work
- Another excluded concern
```

## Pull-request brief example

```markdown
## Implementation Brief

**Category:** enhancement
**Summary:** Complete the contributor's `--json` output flag for `triage list`

**Current behavior:**
The pull request serializes successful issue lists as JSON. Errors still use human text, and the new flag has no coverage.

**Desired behavior:**
With `--json`, every result, including errors, is valid JSON on stdout. Exit codes stay unchanged and default output is unchanged when the flag is absent.

**Key interfaces:**
- Error result: `{ "error": string }` under `--json`
- Existing serializer: reuse it rather than introducing another

**Acceptance criteria:**
- [ ] Success and error output are valid JSON with `--json`
- [ ] Exit codes match the default mode
- [ ] Coverage exercises success and one error case
- [ ] Default output is unchanged

**Out of scope:**
- Adding `--json` to other commands
- Changing the successful JSON shape
```