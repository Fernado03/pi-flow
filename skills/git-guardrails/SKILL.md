---
name: git-guardrails
description: Configure and use a bundled checker to stop dangerous git command lines before execution, including push, hard reset, clean, and destructive branch removal.
disable-model-invocation: true
---

# Git Guardrails

Use the bundled checker at [scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh) to reject command lines containing these destructive operations:

- `git push`, including forced pushes
- `git reset --hard`
- forced `git clean`
- `git branch -D`
- `git checkout .` and `git restore .`

The checker exits `2` and writes a `BLOCKED` message to stderr when it finds a protected operation. It exits `0` otherwise.

## Setup

1. Ask whether protection is needed for this repository or for the user's shell environment. Explain that this static package supplies a checker; it cannot itself intercept later `bash` calls.
2. Copy the bundled script to a stable, user-controlled location. Do not overwrite an existing guardrail without reading it and presenting the merge or replacement choice.
3. Integrate the script with the user's command-policy or shell pre-execution mechanism, if they have one. Pass the complete command line as the script's arguments. Keep existing policy rules intact.
4. Review the blocked patterns with the user. Add a pattern only when its false-positive cost is understood; remove a pattern only after the user accepts the corresponding risk.
5. Verify the installed copy with `bash`:

```bash
bash path/to/block-dangerous-git.sh "git push origin main"
```

It must exit `2` and print `BLOCKED`. Also check a safe command such as `git status`, which must exit `0`.

## Safety boundary

Do not bypass the checker with aliases, alternate spellings, or a different execution path. When a protected operation is genuinely required, stop and obtain explicit user authorization for that exact command, target, and expected consequence. Never turn off the guardrail broadly just to complete one operation.