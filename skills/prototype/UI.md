# UI Prototype

Generate **several radically different UI variations** on one route, switchable from a floating bottom bar. The user flips between variants in the browser, picks one (or combines parts), then discards the rest.

If the question is about logic or state rather than appearance, use [LOGIC.md](LOGIC.md).

## When this is the right shape

- “What should this page look like?”
- “I want to see a few options for this dashboard before committing.”
- “Try a different layout for the settings screen.”
- Any request that would otherwise require choosing among vague mockups in the abstract.

## Two sub-shapes — strongly prefer A

A UI prototype is easier to judge beside real headers, sidebars, data, and density. Default to an existing host page whenever plausible.

### A — Adjustment to an existing page (preferred)

Render variants on the existing route, gated by a `?variant=` URL parameter. Keep real data fetching, parameters, and authorization; change only the rendered subtree. A new section, card, or flow step that naturally belongs inside an existing page also uses this shape.

### B — New page (last resort)

Use this only when there is no sensible existing host. Create an obviously throwaway route using the project’s routing convention, with the same `?variant=` pattern. Before choosing it, confirm that embedding is genuinely impossible; an empty route can hide the design problems a populated page reveals.

Both shapes use the same switcher.

## Process

### 1. State the question and pick N

Default to **three variants**; cap at five. Record the plan in one line near the prototype or in a top-of-file comment:

> Three variants of the settings page, switchable with `?variant=`, on the existing `/settings` route.

### 2. Generate structurally different variants

Each variant must honor the page’s purpose and data, existing component library or styling system, and have a clear exported name such as `VariantA`.

They must disagree about layout, information hierarchy, and primary affordance—not merely colors or copy. If two become similar, redo one with a hard structural constraint such as “do not use a card grid.”

### 3. Wire them together

Use one route-level switcher; adapt this shape to the project’s framework:

```tsx
const variant = searchParams.get('variant') ?? 'A';
return (
  <>
    {variant === 'A' && <VariantA {...data} />}
    {variant === 'B' && <VariantB {...data} />}
    {variant === 'C' && <VariantC {...data} />}
    <PrototypeSwitcher variants={['A', 'B', 'C']} current={variant} />
  </>
);
```

For an existing page, keep data fetching above the switcher. For a new page, mount the same switcher on the throwaway route.

### 4. Build the floating switcher

Use a small fixed bottom-center bar with a previous arrow, current variant label, and next arrow. Arrows wrap around. Clicking updates the URL parameter through the project router so variants are shareable and reload-stable.

Support left and right arrow keys, but do not intercept them while an `<input>`, `<textarea>`, or `[contenteditable]` is focused. Make the bar visually distinct from the evaluated design. Hide it in production builds, and keep it in one reusable component following the project’s shared-UI convention.

### 5. Hand it over

Give the user the URL and variant keys. Feedback such as “use the header from B and sidebar from C” is the design decision the prototype should reveal.

### 6. Capture the answer and clean up

Record the winning variant and why, then capture the full prototype as described in [SKILL.md](SKILL.md):

- For an existing page, fold the winner into the page and remove losing variants and the switcher from the main branch.
- For a new page, promote the winner to its real route and remove the throwaway route and switcher from the main branch.

Keep the full variant set on the throwaway branch as a primary source. Do not leave prototype components or the switcher in the main branch.

## Anti-patterns

- Variants differing only in color or copy.
- Sharing a layout that prevents variants from disagreeing structurally.
- Wiring UI variants to real mutations; use read-only data or a stub.
- Promoting prototype code directly to production without rewriting it to production standards.
