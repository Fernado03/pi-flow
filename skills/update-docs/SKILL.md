---
name: update-docs
description: Reconcile public documentation with current code through small evidence-backed edits and public-surface verification.
disable-model-invocation: true
---

# Update Docs

Make documentation describe the code that users and maintainers actually reach.

1. Locate the document that owns the requested topic with `glob` and `grep`. Prefer an existing public document; ask which document should own genuinely ambiguous new content rather than inventing a location.
2. Read the target section and related documentation, then inspect the corresponding public entry points, interfaces, configuration, errors, and user-visible flows with focused `read` calls.
3. Make surgical `edit` changes that preserve the document's structure, terminology, and detail level. Remove claims contradicted by code; mark unresolved facts as open questions instead of asserting them.
4. Check links, commands, paths, option names, examples, prerequisites, and error behavior that form the documented public surface. Create a new document only when its owner and purpose are explicit.
5. Use a `task` batch only for independent, substantial code-to-document investigations. Integrate the findings into one coherent source of truth.

## Observed verification

Re-read the edited documentation and trace each material public-surface claim to inspected code or an existing authoritative document. Finish only after observing that references resolve and no checked claim contradicts the current interface; report the files and evidence reviewed.
