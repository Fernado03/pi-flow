# Deepening

Safely deepen a cluster of shallow modules using the vocabulary in [SKILL.md](./SKILL.md): module, interface, seam, and adapter.

## Dependency categories

Classify dependencies before choosing the seam; the category determines how to test the deepened module.

1. **In-process** — pure computation or in-memory state. Merge the modules and test the new interface directly; no adapter is needed.
2. **Local-substitutable** — a dependency with a local stand-in, such as an in-memory filesystem or PGLite. Deepen only when the stand-in exists; run it in tests. Keep that seam internal rather than exposing a port at the module interface.
3. **Remote but owned** — an internal network service. Define a port at the seam, inject a transport adapter, and use an in-memory adapter in tests. Production may provide an HTTP, gRPC, or queue adapter.
4. **True external** — a third-party service. Accept it through an injected port and test with a mock adapter.

## Seam discipline

- A seam becomes real when at least two justified adapters exist, commonly production and test. A single-adapter port is indirection.
- Do not expose internal test seams through the external interface.

## Replace, do not layer

When deeper interface tests cover the intended behavior, remove old tests aimed at shallow internal modules. Assert observable outcomes through the new interface, not internal state, so tests survive implementation refactors.