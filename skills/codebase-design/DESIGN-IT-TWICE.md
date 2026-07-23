# Design It Twice

Use this workflow when the user wants alternatives for a selected deepening candidate. The first workable interface is rarely the strongest. Use the vocabulary in [SKILL.md](./SKILL.md): module, interface, seam, adapter, leverage, and locality.

## 1. Frame the problem

Before delegating, state:

- constraints the new interface must satisfy;
- each dependency and its category from [DEEPENING.md](./DEEPENING.md);
- a small illustrative code sketch that makes the constraints concrete without proposing a solution.

## 2. Generate independent designs

For a substantive design question, use one `task` batch with at least three independent `task` agents. Give every task the same file paths, coupling facts, dependency categories, domain vocabulary from `.pi-flow/CONTEXT.md` when present, and what belongs behind the seam. Assign distinct constraints:

1. minimize the interface to one to three entry points and maximize leverage per entry point;
2. maximize justified flexibility for several known use cases;
3. optimize the dominant caller so the default path is trivial;
4. when cross-seam dependencies exist, design around ports and adapters.

Do not delegate a trivial design decision. Each task must return:

1. interface: types, entry points, parameters, invariants, ordering, and errors;
2. a caller usage example;
3. behavior hidden behind the seam;
4. dependency and adapter strategy;
5. trade-offs in leverage, locality, and seam placement.

## 3. Compare and recommend

Present each design separately, then compare depth, locality, and seam placement. Recommend the strongest option plainly; propose a hybrid only when it preserves a smaller, more coherent interface rather than combining features indiscriminately.