# Changelog

## 0.2.8 — 2026-08-17

### Aligned

- Synced with upstream mattpocock/skills v1.2.3.

### Changed

- `writing-for-agents`: now model-invoked — removed `disable-model-invocation: true` from frontmatter so the model reaches it autonomously; updated `agents/openai.yaml` metadata (`display_name`, `short_description`) and dropped stale `allow_implicit_invocation: false`.
- `wizard`: removed time-estimate plumbing — dropped `TOTAL_MINUTES` and `_MINUTES_ELAPSED` from `template.sh`; `stage` now takes a name only; banner shows stages-count only; SKILL.md wording matches.
- `diagnosing-bugs`: added **Redact** section; Phase 1 completion criterion and "no loop" artifact request now specify redacted captured artifact; `scripts/hitl-loop.template.sh` notes that `capture` prints its value back to the terminal.
- `code-review`, `codebase-design`, `improve-codebase-architecture`: dispatch instructions already OMP-native (`task`/`scout`/`reviewer`); no Claude Code tool or agent-type names remain.

### Generated

- Regenerated all compatibility exports (45 skill adapters, 31 prompt wrappers) in `compat/pi/`.

## 0.2.7 — 2026-08-13

### Fixed

- `scripts/build-pi-compat.js` now compares generated compatibility files using a normalized line-ending representation, so a Windows checkout that converts LF to CRLF no longer reports identical generated files as stale in `npm run build:pi-compat -- --check` and `npm run check`.

### Added

- Regression test covering line-ending normalization and genuine generated-file drift detection.

## 0.2.6 — 2026-08-13

### Changed

- `npm test` now runs dependency-free under Bun (the runtime Oh My Pi already ships) via `scripts/test.js`, which reports a clear error when Bun is missing or older than 1.x.

### Fixed

- Persisted `pi-flow-mode` state is validated with an exported `isPiFlowState` runtime guard so malformed or foreign entries cannot crash the extension or flip the bridge.
- `compat/pi/README.md` corrected: `pi.skills` adapters reference canonical skill bodies by package-relative path (not `skill://`), and the documented check commands now name the real `npm run build:pi-compat -- --check` and `npm run check`.

### Added

- Cross-platform smoke tests (extension lifecycle, published-file existence, portable compat metadata) and a `checkOutputPaths()` check preventing reintroduction of obsolete `.scratch/`/`.out-of-scope/` paths.
- GitHub Actions CI matrix (Ubuntu/Windows/macOS) running `npm test`, `npm run check`, and `npm run pack:check`.

## 0.2.5 — 2026-08-13

### Changed

- Consolidated all Pi Flow output folders under `.pi-flow/`: the `.scratch/` tree (review sessions, exploration sessions, local tickets, wayfinding maps) and the `.out-of-scope/` tree (rejected-enhancement records) now live under `.pi-flow/` as `reviews/`, `explorations/`, per-feature directories, and `out-of-scope/`.

## 0.2.4 — 2026-08-08

### Added

- `/pi-update` command and `self-update` skill: update the installed Pi Flow package to the latest published version, verify with `omp plugin list` and `omp plugin doctor`, and resolve registry blockers (`ConnectionRefused` from dead `registry=` overrides in `.npmrc`/`bunfig.toml`).
- README `## Update` section and commands-table entry for `/pi-update`.
- Regenerated all compatibility exports (45 skill adapters, 31 prompt wrappers) in `compat/pi/`.

### Fixed

- `scripts/check.js` version pin updated to match the manifest (was left at `0.2.2` by the 0.2.3 bump, failing `npm run check`).
- README commands table: `Practice and design` row now renders as a table row instead of a list item.

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
