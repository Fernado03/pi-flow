---
name: to-spec
description: Synthesize the current conversation into a delivery spec and publish it through the configured project tracker without re-interviewing.
disable-model-invocation: true
---

# Original Pi Translation Contract

This adapter maps the canonical OMP skill to the original Pi contract (badlogic/pi-mono@9b3a205).

## Translations

- **task batch** → optional original-Pi `subagent` extension or direct/sequential work
- **ask** → normal conversational question
- **lsp** → available language-aware navigation/compiler checks or targeted read/bash
- **todo** → markdown checklist
- **glob/grep** → targeted read/bash search
- **browser** → installed browser extension or manual scenario
- **skill://** → load named installed skill

## Source

Canonical skill: `../../../../skills/to-spec/SKILL.md`

Read the canonical skill file for the complete skill definition. This adapter only provides the translation layer for original Pi compatibility.
