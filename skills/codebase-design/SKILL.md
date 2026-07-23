---
name: codebase-design
description: Design deep modules with small interfaces, clean seams, leverage for callers, and local change.
---

# Codebase Design

Design **deep modules**: substantial behavior behind a small interface, placed at a clean seam, and tested through that interface. The goal is leverage for callers and locality for maintainers.

## Glossary

Use these terms consistently.

- **Module** — anything with an interface and implementation: function, class, package, or tier-spanning slice. Avoid: unit, component, service.
- **Interface** — everything a caller must know to use a module: types, invariants, ordering, error modes, configuration, and performance characteristics. It is broader than a type signature or public-method list.
- **Implementation** — the code inside a module. Use **adapter** when discussing a role at a seam instead.
- **Depth** — leverage at the interface: behavior a caller or test can exercise per unit of interface it must learn. Deep means substantial behavior behind a simple interface; shallow means interface complexity approaches implementation complexity.
- **Seam** — the place where behavior can change without editing the caller; the location of an interface. Avoid **boundary**, which is overloaded in domain design.
- **Adapter** — a concrete implementation that satisfies an interface at a seam.
- **Leverage** — capability callers gain from a deep module.
- **Locality** — concentration of change, bugs, knowledge, and verification in one place.

## Design principles

- Depth belongs to the interface, not implementation size. Internal seams may support tests without becoming public surface.
- Apply the deletion test: if deleting the module merely exposes the same complexity across callers, it earned its place; if complexity disappears, it was a pass-through.
- The interface is the test surface. Tests that must reach past it indicate the module is shaped incorrectly.
- One adapter is a hypothetical seam. Introduce an external seam only when two justified adapters exist.
- Deepen by reducing entry points and parameter complexity while hiding coherent behavior, not by making internals cleverer.

## Designing for testability

- Accept dependencies rather than constructing them inside the module.
- Return observable results rather than relying solely on side effects.
- Keep the surface area small: fewer methods and parameters yield simpler caller and test setup.
- Test outcomes through the module interface. Delete obsolete shallow-module tests once deeper interface coverage replaces them.

## Relationships

A module has one interface; its interface lives at a seam. Adapters satisfy the interface at that seam. Depth produces leverage and locality.

## Avoid these framings

- Do not measure depth as implementation lines divided by interface lines; it rewards padded implementations.
- Do not equate interface with a language keyword or a class's public methods.
- Do not use boundary when seam or interface is the intended concept.

## Further work

- For safe deepening given dependencies, use [DEEPENING.md](./DEEPENING.md).
- To compare genuinely different interfaces before choosing one, use [DESIGN-IT-TWICE.md](./DESIGN-IT-TWICE.md).