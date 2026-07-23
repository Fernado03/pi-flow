---
name: teach
description: Teach the user a new skill or concept through a stateful workspace.
disable-model-invocation: true
argument-hint: "What would you like to learn about?"
---

# Teach

The user intends to learn a topic across multiple sessions. Treat the current directory as their teaching workspace.

## Teaching workspace

Use these files and directories to retain learning state:

- `MISSION.md` captures why the user is learning the topic and grounds all teaching. Use [MISSION-FORMAT.md](MISSION-FORMAT.md).
- `reference/*.html` holds compressed, printable reference materials: cheat sheets, algorithms, syntax, poses, and glossaries.
- `RESOURCES.md` lists resources for knowledge and wisdom. Use [RESOURCES-FORMAT.md](RESOURCES-FORMAT.md).
- `learning-records/*.md` records demonstrated learning, prior knowledge, corrected misconceptions, and mission changes. Number files `0001-<dash-case-name>.md` in sequence. Use [LEARNING-RECORD-FORMAT.md](LEARNING-RECORD-FORMAT.md).
- `lessons/*.html` holds self-contained lessons. A lesson is the primary teaching unit.
- `assets/` holds reusable lesson components. See [Assets](#assets).
- `NOTES.md` records teaching preferences and working notes.

## Philosophy

Deep learning combines:

- **Knowledge** from high-quality, high-trust resources
- **Skills** from relevant interactive lessons based on that knowledge
- **Wisdom** from interaction with other learners and practitioners

Build `RESOURCES.md` with high-quality sources before relying on claims that need external grounding. Some topics need more knowledge; others need more practice.

### Fluency and storage strength

Distinguish:

- **Fluency strength**: in-the-moment retrieval
- **Storage strength**: long-term retention

Favor storage strength through desirable difficulty: retrieval practice, spacing, and interleaving related skill practice.

## Lessons

Create one short, self-contained HTML lesson in `lessons/`, named `0001-<dash-case-name>.html` with the next available number. Each lesson gives one tangible win, ties to the mission, and fits the user's zone of proximal development.

Make lessons clean, readable, and useful for later review. Link by HTML anchors to related lessons and references. Cite the best primary source the user can read or watch, and invite follow-up questions. Use `browser` to open the lesson when useful.

## Assets

Build lessons from reusable components in `assets/`: stylesheets, quiz widgets, simulators, or diagram helpers. Read existing assets before authoring a lesson. Extract a component only when another lesson can reuse it; link it rather than duplicating it inline.

The first reusable component should be a shared stylesheet so lessons feel like one course.

## The mission

Tie every lesson to the user's concrete reason for learning. If `MISSION.md` is absent, empty, or vague, use `ask` to learn why the user wants this skill before teaching. Use [MISSION-FORMAT.md](MISSION-FORMAT.md).

When reality changes the mission, use `ask` to confirm the new mission, update `MISSION.md`, and add a learning record.

## Zone of proximal development

Challenge the user just enough. If they do not name a lesson, read learning records, ground the next lesson in the mission, and teach the most relevant attainable next skill.

## Knowledge

Design lessons around a skill the user will acquire. Include only the knowledge necessary for that skill, then guide practice through an interactive feedback loop.

Gather factual knowledge from trusted resources, record them in `RESOURCES.md`, and cite claims in lessons. Keep acquisition explanations easy enough to preserve working memory.

## Skills

Use desirable difficulty to build durable, flexible skill. Create interactive quizzes, light browser tasks, or guided real-world actions with immediate feedback where possible.

For quizzes, use answers of equal word count and, where possible, equal character count so formatting does not reveal the answer.

## Acquiring wisdom

Wisdom comes from real-world practice. Answer what you can, then connect the user to a reputable community where they can test their skills: an online forum, local class, or interest group. Respect a user's preference not to join communities.

## Reference documents

Create reference documents alongside lessons when a compressed unit of knowledge will help later: code syntax, algorithms, flows, poses, routines, or a glossary. Reference documents should be concise and easy to scan.

When a topic glossary exists, adhere to it in every lesson. Use [GLOSSARY-FORMAT.md](GLOSSARY-FORMAT.md) when creating or revising one.

## Notes

Record the user's teaching preferences and durable working notes in `NOTES.md`.