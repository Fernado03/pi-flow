# HTML Report Format

Render an architectural review as one self-contained HTML file in the operating system temporary directory. Tailwind and Mermaid come from CDNs. Use Mermaid for graph-shaped relationships and hand-built HTML, CSS, or inline SVG for editorial visuals. Mix them; do not make every diagram identical.

## Scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Architecture review — {{repo name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
    <style>
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #dc2626; }
      .deep { background: linear-gradient(135deg, #0f172a, #1e293b); }
    </style>
  </head>
  <body class="bg-stone-50 text-slate-900 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>
      <section id="candidates" class="space-y-10">...</section>
      <section id="top-recommendation">...</section>
    </main>
  </body>
</html>
```

## Structure

The header contains the repository name, date, and a compact legend: solid box = module, dashed line = seam, red arrow = leakage, thick dark box = deep module. Start directly with candidates; do not add an introduction.

Each candidate is one `<article>` with:

- a short title that names the deepening;
- a badge for `Strong`, `Worth exploring`, or `Speculative`, plus the dependency category;
- the files in a monospaced list;
- a before/after visual as the center of the card;
- one sentence each for the observed problem and proposed solution;
- concise wins naming locality, leverage, tests, or interface depth; and
- an ADR callout only when applicable.

End with a larger top-recommendation card naming the candidate, one sentence explaining why, and an anchor link to its card.

## Diagram choices

Use a Mermaid graph or sequence when the point is a call graph, dependency graph, or sequence. Wrap it in a styled card. Use hand-built boxes and SVG arrows when the diagram needs a deep module to visually absorb faded internal details. A layered cross-section works for several thin steps becoming one deep module; a mass diagram works when the interface nearly matches the implementation; and a call-graph collapse works when many exposed calls become internal detail.

Keep diagrams about 320px tall. Use generous whitespace, a restrained palette, and one accent in addition to red leakage and amber warnings. Use `text-xs uppercase tracking-wider` for schematic module labels. The report stays static except for Tailwind and Mermaid.

## Vocabulary and tone

Use `skill://codebase-design` vocabulary exactly: module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality. For example: “Order intake module is shallow — interface nearly matches the implementation.” Prefer domain vocabulary from `.pi-flow/CONTEXT.md` over implementation names.

Keep prose sparse and direct. A candidate should make its point in the visual and short supporting lines; do not replace an unclear diagram with a paragraph.
