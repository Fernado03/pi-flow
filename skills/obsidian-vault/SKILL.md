---
name: obsidian-vault
description: Search, create, and organize linked Obsidian notes using the vault's naming and index conventions.
disable-model-invocation: true
---

Manage the Obsidian vault at `/mnt/d/Obsidian Vault/AI Research/`.

## Conventions

- Keep notes mostly flat at the vault root; organize through links and index notes rather than folders.
- Use Title Case filenames.
- Use `[[Note Title]]` wikilinks. Put related notes or dependencies at the end.
- Use index notes such as `Skills Index.md` as plain lists of wikilinks.

## Workflows

**Search:** use `glob` for filenames and `grep` for note content. Find backlinks by searching for the exact wikilink. Find indexes with a filename glob containing `Index`.

**Create:** inspect related notes first. Write one coherent unit of learning, link its relevant notes, and add it to the appropriate existing index when one exists. Use `ask` before choosing between competing index relationships or canonical names.

**Organize:** preserve content and links unless the user requests a semantic change. Prefer adding or repairing links and index entries over moving notes.
