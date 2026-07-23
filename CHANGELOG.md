# Changelog

## 0.2.1 — 2026-07-23

### Fixed

- `/pi-flow on` now inherits into OMP task subagents through process-local session state without writing entries into child sessions.
- Pi Flow preference injection now appends to and preserves the existing parent/subagent system prompt, with duplicate suppression.
- Unrelated headless sessions remain isolated, and interactive session switches reset inherited state from their own persisted branch.

## 0.2.0 — 2026-07-23

### Added

- **Session toggle extension** (`extensions/index.ts`): `/pi-flow on|off|status` opts the current session in or out of Pi Flow workflow preference.
  - While on, `before_agent_start` appends one short preference block per turn (~60 tokens): prefer the smallest suitable Pi Flow skill, skip ceremony for trivial requests, verify observable behavior.
  - While off (default), nothing is injected — Pi Flow stays purely on-demand, keeping baseline token cost unchanged from 0.1.0.
  - State persists via `pi.appendEntry("pi-flow-mode", ...)` across session resume/branch; a status-line chip shows `Pi Flow: on|off`.
  - Extension is optional runtime wiring; skills, commands, and rules remain statically discovered and unchanged.
- Manifest gains `omp.extensions: ["./extensions/index.ts"]`; package `files` adds `extensions`.

## 0.1.0 — 2026-07-23

- Derived from the latest `mattpocock/skills` through `ed37663` (2026-07-21).
- Latest implemented semantics include decision-ticket wayfinder/research, scoped architecture scans, generalized grilling, trimmed to-tickets, batch-grill-me, and to-questionnaire.
- Compatibility verified against OMP `7504d4c` (2026-07-23).
- Transformed to flat skills, `skill://` loading, native task/ask, and no runtime extension.

## 0.1.0-compat — 2026-07-23

- **Original Pi compatibility export** (`compat/pi/`) generated from canonical `@fernado03/pi-flow@0.1.0`.
- Records compatibility against original Pi **badlogic/pi-mono@9b3a205 (2026-07-22)**.
- Original Pi manifest supports `pi.skills` and `pi.prompts`; prompt args use `$ARGUMENTS`; built-in tools: read/bash/edit/write; **no** OMP plugin install/link, **no** rules system, **no** built-in task agents.
- Translation boundaries documented:
  - `task`/`Task` → direct/sequential work; subagents require original Pi's optional subagent extension (not bundled).
  - `ask` → conversational question.
  - `lsp` → language-aware navigation/compiler checks or targeted read/bash.
  - `todo` → markdown checklist.
  - `glob`/`grep` → targeted glob/grep/bash search.
  - `browser` → installed browser extension or manual scenario.
  - `skill://` → load named installed skill (canonical body).
  - `$ARGUMENTS` → preserved in prompt adapters (`pi.prompts`).
- **No duplication**: generated `pi.skills` adapters `skill://` canonical skill bodies from `@fernado03/pi-flow`; `pi.prompts` wrappers delegate via `skill://` with `$ARGUMENTS`.
- **Generator & check behavior** (deterministic, checkable):
  - Generator reads canonical `skills/<name>/SKILL.md` and `commands/*.md`, emits `pi.skills/<name>/SKILL.md` adapters and `pi.prompts/pi-*.md` wrappers.
  - Check verifies every adapter's `skill://` target exists in canonical package, every wrapper's target skill exists, and manifest matches canonical skill/command set.
  - Fails on drift (added/removed/renamed skills or commands without regeneration).
- **No unsupported claims**: does not claim original Pi has OMP plugin install/link, rules, or built-in task agents.
