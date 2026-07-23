---
name: implement
description: Implement work from an approved specification or tickets, exercising the requested behavior before review and delivery.
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

Canonical skill: `../../../../skills/implement/SKILL.md`

Read the canonical skill file for the complete skill definition. This adapter only provides the translation layer for original Pi compatibility.
