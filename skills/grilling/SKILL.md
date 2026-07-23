---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking or uses grill triggers.
---

# Grilling

Interview the user relentlessly about every aspect of a plan, decision, or idea until you reach a shared understanding. Walk each branch of the decision tree, resolving dependencies one by one. For every question, provide your recommended answer.

Ask exactly one question at a time with `ask`, then wait for the user's answer before continuing. Multiple questions at once are bewildering.

Find every fact available from the workspace or tools with `read`, `grep`, `glob`, or other relevant tools rather than asking the user. Decisions remain the user's: put each decision to them and wait for their answer.

After the questions are resolved, summarize the shared understanding and ask for explicit confirmation. Do not act on the plan, decision, or idea until the user confirms it.