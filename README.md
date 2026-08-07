# Pi Flow

Pi Flow is a dependency-free workflow package for [Oh My Pi](https://github.com/can1357/oh-my-pi). It packages focused engineering disciplines, command wrappers, and one tiny toggle extension (`/pi-flow on|off|status`) that lets you opt in or out of Pi Flow workflow preference per session.

## Canonical Package

This repository root (`@fernado03/pi-flow`) is the **canonical OMP package**. It is installed via OMP and discovered statically (skills, commands, rules) plus one small runtime extension for the session toggle. There is no install hook and no executable.

> **Original Pi compatibility export**: A separate generated export of the original Pi (badlogic/pi-mono@9b3a205, 2026-07-22) lives in [`compat/pi/`](compat/pi/README.md). It installs via `pi install npm:@fernado03/pi-flow`, `pi install <path>`, or `pi -e <path>` (original Pi CLI), provides `pi.skills` adapters and `pi.prompts` `/pi-*` wrappers, and records compatibility against badlogic/pi-mono@9b3a205. **It is not the canonical package.** See [`compat/pi/README.md`](compat/pi/README.md) for boundaries, translation limits, and generator behavior.

## Install (Canonical OMP Package)

Install the published package:

```sh
omp plugin install @fernado03/pi-flow
```

For local development, link the package directory:

```sh
omp plugin link <path>
```

For example: `omp plugin link C:/Users/Fernado/Desktop/Projects/Code/pi-flow`.

Then reload discovered plugins in the current OMP session:

```text
/reload-plugins
```

## Static OMP Discovery

OMP discovers this package directly from its conventional roots:

- `skills/<name>/SKILL.md` contains one flat skill per directory.
- `commands/*.md` provides slash-command wrappers.
- `rules/` contains small always-loaded guidance.
- `extensions/index.ts` registers `/pi-flow on|off|status`.

There is no install hook or executable. After installing or linking, update the package files and run `/reload-plugins` to refresh discovery.

## Session Toggle

Pi Flow is a preference, not an override. The bundled extension registers one command:

```text
/pi-flow on      Prefer the smallest suitable Pi Flow workflow this session
/pi-flow off     Return to normal OMP skill selection
/pi-flow status  Show the current mode
```

While on, the extension appends a short per-turn preference (~60 tokens): choose at most one matching Pi Flow skill, skip ceremony for trivial requests, and verify observable behavior. OMP task subagents created from the session inherit the active preference while preserving their own system prompt; unrelated headless sessions do not. While off (the default), nothing is injected and Pi Flow stays purely on-demand. The state persists across session resume/branch. A status-line chip (`Pi Flow: on|off`) shows the current mode.

## Commands

Use a wrapper in chat, for example `/pi-research` to investigate a decision, `/pi-fix` to diagnose and repair a defect, or `/pi-code-review` to review a focused change. The available wrappers are:

| Workflow | Wrappers |
| --- | --- |
| Investigate and decide | `/pi-ask`, `/pi-research`, `/pi-wayfinder`, `/pi-explore`, `/pi-questionnaire`, `/pi-to-spec`, `/pi-to-tickets` |
| Build and improve | `/pi-feature`, `/pi-fix`, `/pi-implement`, `/pi-prototype`, `/pi-refactor`, `/pi-tdd`, `/pi-tweak` |
| Review and verify | `/pi-code-review`, `/pi-grill`, `/pi-batch-grill`, `/pi-grill-with-docs`, `/pi-verify`, `/pi-triage`, `/pi-diagnose` |
- Practice and design | `/pi-improve-architecture`, `/pi-teach`, `/pi-writing-for-agents` |

Each wrapper routes to exactly one skill. Read a skill directly when you need its full procedure through `skill://<skill-name>`.

## Token Strategy

The baseline prompt receives only the tiny rule content and visible skill metadata. Full skill bodies load on demand through `skill://` references. User-invoked workflows set `disable-model-invocation: true`, keeping their metadata out of the baseline; reusable model-invoked disciplines remain visible. When `/pi-flow on` is active, one short preference block (~60 tokens) is appended per turn; when off, nothing is injected. This keeps ordinary turns small without discarding the detailed procedure when it is needed.

## Package Checks

```sh
npm run check
npm run pack:check
```

`check` validates the static package shape, metadata budgets, command-to-skill references, and unsupported platform terminology. `pack:check` previews the npm tarball without publishing.

## License


## Original Pi Compatibility Export

This repository also publishes a **compatibility export** of the original Pi (badlogic/pi-mono@9b3a205, 2026-07-22) under `compat/pi/`. It is **not** the canonical OMP package.

- **Canonical OMP package**: `@fernado03/pi-flow` (this repository root). Install with `omp plugin install @fernado03/pi-flow`.
- **Compatibility export**: `compat/pi/` — generated adapters/wrappers for original Pi. Install with `pi install npm:@fernado03/pi-flow`, `pi install <path>`, or `pi -e <path>` (original Pi CLI).

### What the compat export provides

- `pi.skills/` — Generated adapters that reference the canonical skill bodies from `@fernado03/pi-flow` by relative path. No skill bodies are duplicated.
- `pi.prompts/` — `/pi-*` slash-command wrappers that locate the installed package root and read the matching skill adapter, using original Pi's `$ARGUMENTS` convention.
- **No runtime extension**, no install hook, no executable — same static OMP package model as the canonical package.

### What the compat export does NOT provide

- **Not original Pi** — Original Pi has no OMP plugin install/link, no rules system, no built-in task agents, and no `skill://` loader.
- **No bundled subagents** — Original Pi's optional subagent extension is not included. Subagent-style work runs directly/sequentially unless you install that extension separately.
- **No duplication** — Adapters reference canonical bodies; no sync drift.

### Translation boundaries

| Original Pi concept | Compat export translation |
|---------------------|---------------------------|
| `task` / `Task` (subagent) | Direct/sequential work; subagents require original Pi's optional subagent extension (not bundled) |
| `ask` | Conversational question |
| `lsp` | Language-aware navigation/compiler checks or targeted read/bash |
| `todo` | Markdown checklist |
| `glob` / `grep` | Targeted glob/grep/bash search |
| `browser` | Installed browser extension or manual scenario |
| `skill://<name>` | Load named installed skill (canonical body) |
| `$ARGUMENTS` (prompt args) | Preserved in `pi.prompts` wrappers |

### Generator & check behavior (deterministic, checkable)

- Generator reads canonical `skills/<name>/SKILL.md` and `commands/*.md`, emits `pi.skills/<name>/SKILL.md` adapters and `pi.prompts/pi-*.md` wrappers.
- Check verifies every adapter's canonical-skill target exists, every wrapper's target skill exists, and manifest matches canonical skill/command set.
- Fails on drift (added/removed/renamed skills or commands without regeneration).

See [`compat/pi/README.md`](compat/pi/README.md) for full details and [`CHANGELOG.md`](CHANGELOG.md#010-compat---2026-07-23) for the compatibility record against badlogic/pi-mono@9b3a205.
[MIT](LICENSE) © Fernado
