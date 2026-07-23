---
name: resolving-merge-conflicts
description: Resolve an in-progress merge or rebase by recovering each side’s intent, preserving compatible behavior, and completing the operation safely.
---

# Resolving Merge Conflicts

1. **Inspect the current merge or rebase state.** Read the conflict markers, affected files, recent history, and the operation’s stated goal.
2. **Recover intent from primary sources.** For each conflict, understand why both changes were made by reading their commits, pull requests, issues, tickets, and nearby code.
3. **Resolve each hunk by intent.** Preserve both intents when they are compatible. When they are not, choose the result that fulfills the merge’s stated goal and record the trade-off. Do not invent new behavior. Resolve the operation; do not abandon it.
4. **Verify the integrated result.** Discover the project’s relevant automated checks and run the narrowest checks that cover the resolved behavior. Repair only problems introduced by the integration.
5. **Complete the operation.** Stage every resolved file, create the merge commit when required, and continue a rebase until every commit is applied.
