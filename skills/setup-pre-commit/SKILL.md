---
name: setup-pre-commit
description: Set up Husky pre-commit checks with lint-staged, Prettier, existing type checks, and existing tests in the current repository.
disable-model-invocation: true
---

# Setup Pre-Commit

Set up commit-time checks without replacing existing package, hook, formatter, or script configuration.

1. Use `glob` to identify lockfiles and existing formatting, lint-staged, and hook configuration. Use `read` on `package.json` and every configuration file that will change.
2. Choose the package manager from the lockfile: npm (`package-lock.json`), pnpm (`pnpm-lock.yaml`), Yarn (`yarn.lock`), or Bun (`bun.lock` or `bun.lockb`). If several lockfiles exist or none exists, ask the user rather than guessing.
3. Inspect `scripts`. Plan to run `lint-staged`, then the existing `typecheck` script if present, then the existing `test` script if present. Do not invent missing scripts.
4. Show the files and dev dependencies to add: `husky`, `lint-staged`, and `prettier`. Get approval before installing dependencies or changing commit behavior.
5. Install the approved packages with the selected package manager. Initialize Husky. If it would replace an existing `prepare` script or hook, preserve the existing behavior and merge only after explaining the resulting command.
6. Create or merge the lint-staged configuration. Format staged files with `prettier --ignore-unknown --write`; retain existing file-specific rules unless the user asks to replace them.
7. Create a Prettier configuration only when none exists. Use the repository's established style when it has one; otherwise use conservative defaults: two spaces, 80 columns, semicolons, double quotes, ES5 trailing commas, and parentheses around arrow parameters.
8. Write the pre-commit hook without a shebang for current Husky versions. Run the selected package-manager command for `lint-staged`, followed by existing `typecheck` and `test` scripts only when present.
9. Verify with focused `bash` commands: inspect the hook and configuration, then run lint-staged and each enabled script. Fix failures caused by the setup; report unrelated existing failures separately.

Do not stage, commit, or alter unrelated files unless the user explicitly asks.