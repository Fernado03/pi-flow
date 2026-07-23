---
name: to-questionnaire
description: Turn knowledge a user lacks into a focused questionnaire for the person who can supply it.
disable-model-invocation: true
---

Create a Markdown questionnaire for a recipient with knowledge the user lacks. Interview the **send**, not the subject.

1. Use `ask` once to establish the recipient's role, expertise, relationship to the user, and the knowledge they hold that the user lacks.
2. Use `ask` once to identify the decisions or facts the user needs back. Capture the concrete outcomes the user must be able to decide or do.
3. Draft questions that target exactly the recipient-to-user knowledge gap. Every requested outcome must have a corresponding question.
4. Write `to-questionnaire-<topic-slug>.md` in the current directory and report its path.

Use this structure:

```md
# <Questionnaire title>

**Purpose:** <decision and reason>

**From:** <user> — **To:** <recipient> — **How your answers will be used:** <destination>

## Context

<One concise paragraph that lets the recipient answer well.>

## How to answer

<Deadline and estimated effort. Invite partial answers and uncertainty.>

## <Theme>

### <One focused question>

_Why this matters: <only when needed to prevent a shallow or mistaken answer.>_

>

## Anything else?

<What should we know that was not asked?>
```

Order questions by importance, then group more than a handful under `##` themes. Keep each question to one idea, include an answer stub directly below it, and make the document useful for either asynchronous completion or a live meeting.
