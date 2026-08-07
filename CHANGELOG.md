# Changelog

## 0.2.3 — 2026-08-07

### Aligned

- Synced with upstream mattpocock/skills v1.2.x: renamed `writing-great-skills` → `writing-for-agents`, removed deprecated skills (`caveman`, `edit-article`, `obsidian-vault`), added `wait-what` skill
- Regenerated all compatibility exports (44 skill adapters, 30 prompt wrappers) in `compat/pi/`
- Updated all references throughout package to reflect upstream changes

## 0.2.2 — 2026-07-26

### Fixed

- `/pi-flow` invoked with no arguments no longer risks a crash when OMP passes `undefined` command args; the handler now normalizes args before trimming (`registerCommand` handlers receive `string | undefined`).
- Root README compat sections updated to describe the package-root locator used by `pi.prompts` wrappers and the relative-path references used by `pi.skills` adapters, instead of `skill://` delegation.

## 0.2.2-compat — 2026-07-26

### Fixed

- Compat prompt wrappers (`compat/pi/prompts/pi-*.md`) no longer reference `skill://`, which does not exist in original Pi and left the wrapper as a dead reference — the adapter skills they targeted are also hidden from Pi's `<available_skills>` by `disable-model-invocation: true`, so nothing outside the wrapper's own text could resolve it either.
- `generatePromptWrapper` in `scripts/build-pi-compat.js` now emits a deterministic locator: find the installed `@fernado03/pi-flow` package root (`~/.pi/agent/npm/node_modules/@fernado03/pi-flow`, then `.pi/npm/node_modules/@fernado03/pi-flow`, then wherever installed or linked), read `compat/pi/skills/<name>/SKILL.md` inside it, and apply that skill to `$ARGUMENTS`.
- Regenerated all 31 `compat/pi/prompts/pi-*.md` wrappers; none reference `skill://`. `scripts/check.js` no longer duplicates a separate `skill://` template assertion—the byte-exact drift check (`build-pi-compat.js --check`) already covers wrapper content from the same generator function.
- `compat/pi/README.md` prompt-adapter sections rewritten to describe the locator mechanism instead of `skill://` delegation.

## 0.2.1 — 2026-07-23

### Fixed

- `/pi-flow on` now inherits into OMP task subagents through process-local session state without writing entries into child sessions.
- `/pi-flow status` reliably reports current mode within subagent context trees.
- Extension is fully optional; core discovery remains unchanged.

## 0.2.0 — 2026-07-23

### Added

- Compatibility export for original Pi (`compat/pi/`) generates `pi.skills` adapters and `pi.prompts` wrappers from canonical OMP package body via package-root locators.
- Generator & checker (`npm run build:pi-compat`, `npm run check`) ensure determinism and detect drift (added/removed/renamed skills or commands).
- Original Pi manifest supports `pi.skills` and `pi.prompts`; prompt args use `$ARGUMENTS`; built-in tools: read/bash/edit/write; no OMP plugin install/link, no rules system, no built-in task agents.

### Changed

- Transformed to flat skills, `skill://` loading, native task/ask, and no runtime extension.

## 0.1.0 — 2026-07-23

- Derived from the latest `mattpocock/skills` through `ed37663` (2026-07-21).
- Latest implemented semantics include decision-ticket wayfinder/research, scoped architecture scans, generalized grilling, trimmed to-tickets, batch-grill-me, and to-questionnaire.
- Compatibility verified against OMP `7504d4c` (2026-07-23).
- Transformed to flat skills, `skill://` loading, native task/ask, and no runtime extension.

## 0.1.0-compat — 2026-07-23

- Records compatibility against original Pi **badlogic/pi-mono@9b3a205 (2026-07-22)**.
- Original Pi manifest supports `pi.skills` and `pi.prompts`; prompt args use `$ARGUMENTS`; built-in tools: read/bash/edit/write; **no** OMP plugin install/link, **no** rules system, **no** built-in task agents.
- Translation boundaries documented:
  - `task`/`Task` → direct/sequential work; subagents require original Pi's optional subagent extension (not bundled).
  - `ask` → conversational question.
  - `skill://` → generated adapters load canonical bodies from `@fernado03/pi-flow` package root.
  - Commands via `pi.prompts` use `$ARGUMENTS`; OMP skills receive arguments via `skill://` call convention.
- **No duplication**: generated `pi.skills` adapters reference canonical skill bodies from `@fernado03/pi-flow`; `pi.prompts` wrappers delegate via skill references resolved at runtime.
- **Generator & check behavior** (deterministic, checkable):
  - Generator reads canonical `skills/<name>/SKILL.md` and `commands/*.md`, emits `pi.skills/<name>/SKILL.md` adapters and `pi.prompts/pi-*.md` wrappers.
  - Check verifies every adapter's target skill exists in canonical package, every wrapper's target skill exists, and manifest matches canonical skill/command set.
  - Fails on drift (added/removed/renamed skills or commands without regeneration).
- **No unsupported claims**: does not claim original Pi has OMP plugin install/link, rules, or built-in task agents.
