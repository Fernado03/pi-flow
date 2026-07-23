# Original Pi Compatibility Export

This package provides a **compatibility export** of the original [Pi](https://github.com/badlogic/pi-mono) (commit `9b3a205`, 2026-07-22) as an OMP-compatible package. It is **not** the canonical OMP package—see the root [README.md](../README.md) for the canonical OMP package `@fernado03/pi-flow`.

## What This Is

A generated compatibility layer that translates the original Pi (badlogic/pi-mono@9b3a205, 2026-07-22) into an OMP-compatible package:

- **`pi.skills`** — Generated adapters that load canonical skill bodies from the canonical OMP package (`@fernado03/pi-flow`) via `skill://` references. No skill bodies are duplicated.
- **`pi.prompts`** — `/pi-*` slash-command wrappers that delegate to the canonical skill bodies via `skill://` references. They use original Pi's `$ARGUMENTS` convention.
- **No runtime extension** — Like the canonical package, this is a static OMP package with no runtime extension, install hook, or executable.

## What This Is Not

- **Not the canonical OMP package** — The canonical OMP package is `@fernado03/pi-flow` at the repository root.
- **Not original Pi** — Original Pi (badlogic/pi-mono) has no OMP plugin install/link, no rules system, no built-in task agents, and no `skill://` loader. This package translates those concepts.
- **No built-in subagents** — Original Pi's optional subagent extension is not bundled. Subagent-style work runs directly/sequentially unless you install the original Pi subagent extension separately.

## Installation

### Canonical OMP Package (Recommended)

```sh
omp plugin install @fernado03/pi-flow
# or for local development
omp plugin link <path-to-pi-flow-root>
```

Then `/reload-plugins` in your OMP session.

### Original Pi Compatibility Export

```sh
# From npm (when published)
pi install npm:@fernado03/pi-flow

# From local path
pi install <path-to-pi-flow-root>

# Temporary/ephemeral (current session only)
pi -e <path-to-pi-flow-root>
```

> **Note:** The `pi` CLI above refers to the original Pi CLI (badlogic/pi-mono), not OMP's `omp` command. The canonical package installs via `omp plugin install`; this compat export installs via `pi install`.

## Translation Boundaries

This compatibility layer translates original Pi concepts to OMP equivalents. Boundaries are strict—no emulation of unsupported original Pi features.

| Original Pi | OMP / pi-flow Equivalent | Notes |
|-------------|--------------------------|-------|
| `task` / `Task` agent | `skill://` + direct/sequential work | Subagents require original Pi's optional subagent extension. Without it, work runs directly/sequentially in the current context. |
| `ask` | Conversational question | Maps to normal conversational question to the model—no tool call. |
| `lsp` | Language-aware navigation / compiler checks | Maps to LSP-backed navigation (go-to-def, references) or targeted read/bash for compiler checks. No separate LSP process. |
| `todo` | Markdown checklist | Maps to a markdown checklist in the working context. |
| `glob` / `globtool` | Targeted `glob` / `bash` search | Maps to targeted `glob` tool or `bash` search. |
| `grep` / `greptool` | Targeted `grep` / `bash` search | Maps to targeted `grep` tool or `bash` search. |
| `browser` / `browsing` | Installed browser extension or manual scenario | Maps to an installed browser extension or a manual scenario you drive. No built-in headless browser. |
| `skill://<name>` | `skill://<name>` | Canonical skill loader—loads canonical skill body from `@fernado03/pi-flow`. |
| `$ARGUMENTS` | `$ARGUMENTS` | Prompt adapters use original Pi's `$ARGUMENTS` convention; OMP skills receive arguments via `skill://` call convention. |

### Subagents

Original Pi's subagent capability is provided by an **optional extension** (not bundled with core Pi). Without that extension, subagent-style parallel work runs **directly/sequentially in the current context**. This compatibility layer does not emulate subagents; it runs work directly unless you have the original Pi subagent extension installed separately.

### Prompt Adapters (`pi.prompts`)

The `/pi-*` command wrappers in `pi.prompts`:
- Read the canonical skill body via `skill://<skill-name>` from the canonical package (`@fernado03/pi-flow`).
- Accept arguments using original Pi's `$ARGUMENTS` convention.
- Delegate execution to the canonical skill body—no duplicated logic, no sync drift.

### Skill Adapters (`pi.skills`)

Each generated adapter in `pi.skills`:
- Loads the canonical skill body via `skill://<canonical-skill-name>`.
- Adds only the thin adapter shim (metadata, argument mapping).
- **No skill body duplication**—the canonical skill body lives only in `@fernado03/pi-flow`.

## Generator & Check Behavior

This compatibility export is **generated** from the canonical package (`@fernado03/pi-flow`) by a generator script. The generator:

1. Reads canonical skills from `@fernado03/pi-flow/skills/<name>/SKILL.md`.
2. Reads canonical commands from `@fernado03/pi-flow/commands/*.md`.
3. Generates `pi.skills/<name>/SKILL.md` adapters that `skill://` the canonical body.
4. Generates `pi.prompts/pi-*.md` wrappers that delegate to `skill://` with `$ARGUMENTS`.
5. Emits a deterministic manifest so the export is reproducible and checkable.

**Check behavior** (`pi compat check` or `npm run compat:check`):
- Verifies every generated adapter's `skill://` target exists in the canonical package.
- Verifies every generated prompt wrapper's target skill exists.
- Verifies the manifest matches the canonical package's current skill/command set.
- Fails on drift—any skill/command added/removed/renamed in the canonical package without regenerating the compat export.

## Compatibility Record

| Compat Export | Original Pi (badlogic/pi-mono) | Canonical OMP Package | Generated From |
|---------------|--------------------------------|----------------------|----------------|
| `pi-flow@0.1.0-compat` | `9b3a205` (2026-07-22) | `@fernado03/pi-flow@0.1.0` | `@fernado03/pi-flow@0.1.0` |

This compatibility export is **generated from** `@fernado03/pi-flow@0.1.0` (derived from mattpocock/skills@ed37663, 2026-07-21) and records compatibility against original Pi at **badlogic/pi-mono@9b3a205 (2026-07-22)**.

## Canonical Source

The canonical OMP package is **@fernado03/pi-flow** (this repository root). This `compat/pi/` directory is a generated compatibility export—**do not edit files here directly**. Modify the canonical package and regenerate.

## License

MIT © Fernado — same as canonical package.