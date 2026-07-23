---
name: migrate-to-shoehorn
description: Replace appropriate TypeScript test assertions with @total-typescript/shoehorn helpers while keeping production code and test intent intact.
disable-model-invocation: true
---

# Migrate To Shoehorn

Use `@total-typescript/shoehorn` in test code only. Never add it to production code or replace assertions whose purpose is unrelated to fixture construction.

## Helpers

| Helper | Use when |
| --- | --- |
| `fromPartial()` | A fixture intentionally supplies only properties needed by the test and those supplied values are type-correct. |
| `fromAny()` | A test intentionally supplies invalid data to exercise validation or error handling. |
| `fromExact()` | A test must initially construct a complete value and may later relax it deliberately. |

## Safe transformations

```ts
// Before
getUser({ body: { id: "123" } } as Request);

// After
import { fromPartial } from "@total-typescript/shoehorn";
getUser(fromPartial({ body: { id: "123" } }));
```

```ts
// Before: invalid id is intentional
getUser({ body: { id: 123 } } as unknown as Request);

// After
import { fromAny } from "@total-typescript/shoehorn";
getUser(fromAny({ body: { id: 123 } }));
```

## Workflow

1. Identify test files with `glob` and `grep`; inspect each candidate assertion and its receiving function with `read` before changing it.
2. Classify each assertion. Replace partial, type-correct fixtures with `fromPartial`; replace deliberately invalid fixtures with `fromAny`. Leave `as const`, production assertions, narrowing assertions, and assertions needed for unrelated language semantics unchanged.
3. Check the project lockfile and `package.json`. If the dependency is absent, explain the proposed dev dependency and get approval before adding it with the project's package manager.
4. Add the smallest needed named imports. Reuse existing shoehorn imports and avoid duplicate imports.
5. Use `edit` for the narrow migration. Preserve assertions, test names, inputs, expected outputs, and error expectations.
6. Run the existing focused test and type-check path with `bash` when available. Confirm that invalid-data tests still reach their intended error path rather than becoming type-correct by accident.

Do not use broad search-and-replace: `as` assertions have different meanings and must be reviewed individually.