---
name: scaffold-exercises
description: Create numbered exercise sections with complete problem, solution, or explainer folders and non-empty readmes from a course plan.
disable-model-invocation: true
---

# Scaffold Exercises

Create only the exercise structure requested by the plan. Inspect nearby exercises with `glob` and focused `read` calls before choosing names or files.

## Naming

- A section is `XX-section-name/` inside `exercises/`.
- An exercise is `XX.YY-exercise-name/` inside its section.
- Use zero-padded numbers and lowercase dash-case names.
- Keep the requested numbering; do not renumber neighboring exercises unless explicitly asked.

## Variants

Each exercise needs at least one of:

- `problem/` — student workspace containing the intended TODOs.
- `solution/` — reference implementation.
- `explainer/` — conceptual material with no TODOs.

For an unspecified stub, create `explainer/` only. Do not add a problem or solution speculatively.

## Required content

Every created variant needs a non-empty `readme.md` with a title and useful description. A readme-only stub is valid. Add `main.ts` only when that variant needs code; it must contain a real, runnable starting point or reference implementation, not an empty placeholder.

## Workflow

1. Parse the plan into section number/name, exercise number/name, and requested variants. Ask about genuinely missing variant or numbering decisions.
2. Compare adjacent paths and readmes to match local conventions and prevent collisions.
3. Create the requested directories and files with `write`. Keep each title, description, TODO, and code sample specific to its exercise.
4. Use `glob` and `read` to confirm every requested path exists, each readme is non-empty, and links point to real local targets.
5. When moving or renumbering tracked exercises, use `bash` with `git mv` so history follows the directory. Update internal links and inspect the moved paths afterward.
6. Run a repository-provided exercise validator only when one is already documented or requested. Do not invent a validation command.

Never add `.gitkeep`, speaker notes, broken links, or unrelated course content.