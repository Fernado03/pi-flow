# Logic Prototype

Use a tiny interactive terminal app to drive a state model by hand. This shape answers questions about **business logic, state transitions, or data shape** that look plausible on paper but become questionable under real cases.

Use it for questions such as:

- “Does this state machine handle X then Y?”
- “Can this data model represent this case?”
- “What should this API feel like before implementation?”

For appearance questions, use [UI.md](UI.md).

## Process

### 1. State the question

Before coding, write one paragraph in a prototype README or at the top of the source: the state model being explored and the precise question it must settle.

### 2. Pick the language

Use the host project’s runtime and existing tooling. If the project has no obvious runtime, use `ask`. Do not introduce a package manager or runtime solely for the prototype.

### 3. Isolate portable logic

Put the logic being explored behind a small, pure interface that can be lifted into production later. The terminal shell is throwaway; the logic should not be.

Choose the shape that fits the question:

- A pure reducer, `(state, action) => state`, for discrete events over one state value.
- An explicit state machine when action legality is part of the question.
- A few pure functions over plain data when there is no implicit current state.
- A class or module with a clear method surface only when it genuinely owns continuing internal state.

Keep logic free of I/O and terminal rendering. The terminal shell imports the logic; nothing flows back into it.

### 4. Build the smallest state-exposing TUI

On each tick, clear the screen and render one complete frame. The frame contains, in order:

1. **Current state**, formatted for inspection and diffing, with one field per line or formatted JSON. Use native ANSI bold and dim styles when helpful; do not add a styling dependency for this.
2. **Keyboard shortcuts**, such as `[a] add user  [d] delete user  [t] tick clock  [q] quit`.

Initialize one in-memory state object, render immediately, read one keystroke or line, dispatch it, rerender the whole frame, and continue until quit. Keep the frame to one screen.

### 5. Make it runnable in one command

Add a task through the project’s existing runner, such as `pnpm run <prototype-name>`. If there is no task runner, put the command at the top of the prototype README.

### 6. Hand it over

Give the user the command. Add actions as new questions emerge; surprising state transitions are evidence that the idea needs revision.

### 7. Capture the answer

Once it settles the question, lift the validated reducer, machine, or function set into real code. Preserve the terminal shell with the prototype on the throwaway branch as described in [SKILL.md](SKILL.md).

## Anti-patterns

- Adding tests: a prototype that needs tests is no longer a prototype.
- Wiring to the production database unless persistence is the exact question.
- Generalizing for hypothetical future use.
- Mixing portable logic with prompts, terminal escape codes, or output.
- Shipping the terminal shell to production.
