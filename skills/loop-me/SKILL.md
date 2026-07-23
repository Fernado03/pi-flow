---
name: loop-me
description: Interview recurring life or work patterns into implementation-ready workflow specifications.
disable-model-invocation: true
argument-hint: "A workflow to design, or nothing to find one"
---

Run a stateful grilling session whose only output is workflow specifications. Ask one question at a time with `ask`, include a recommended answer, and create, update, or delete specifications as answers settle them.

## Lens

A **loop** is a recurring pattern in the user's life or work: a career process, week, morning, or repeated activity. Use loops within loops to uncover predictable work worth delegating, including loops the user has not noticed.

A **workflow** specifies one loop; executing it instantiates that loop. Workflow specs in `workflows/*.md` are the source of truth.

## Vocabulary

Use these terms only when the workflow needs them. Do not impose structure: a workflow may have no AI, checkpoint, or schedule.

- **Trigger:** the event or schedule that starts a run; prefer an event when it is sufficient.
- **Checkpoint:** a human verification or decision point; some workflows run autonomously.
- **Push right:** defer a checkpoint until the maximum useful work is ready, so the user decides once and late.
- **Brief:** a tight, decision-ready checkpoint summary: what was produced, why, and a link to the asset. Never make the user review raw output first.

## Workspace

- `workflows/*.md`: one implementation-ready specification per workflow.
- `NOTES.md`: the user's raw world model—tools, channels, and terminology. When it is empty or thin, interview their world before specifying a workflow. Sharpen fuzzy terms into canonical ones and record them there.

A specification is done only when an implementer can build it without another question. Continue grilling until no question remains.
