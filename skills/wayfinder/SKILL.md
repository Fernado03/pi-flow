---
name: wayfinder
description: Chart a large, foggy effort as a shared map of decision tickets, resolving the route one decision at a time.
disable-model-invocation: true
---

# Wayfinder

Use Wayfinder for an effort too large and uncertain for one working context. It charts the route to a **destination** as a shared map of **decision tickets**—questions whose resolution is a decision, not slices of a build—then resolves those tickets until the route is clear.

Wayfinder plans by default. Produce decisions, not deliverables, unless the map's Notes explicitly extend it into execution. When the route clears, hand off to `/pi-to-spec`, then `/pi-to-tickets`; go directly to `/pi-implement` only when the effort proved genuinely small.

## Map contract

The configured tracker holds one map, labelled `wayfinder:map`, and child decision tickets. The map is a low-resolution index: each detailed decision lives only in its resolved ticket. Refer to maps and tickets by linked title, never an unadorned identifier.

Read the tracker's **Wayfinding operations** in `.pi-flow/issue-tracker.md` to create maps and children, query the frontier, represent dependencies, claim work, and record resolutions. If no tracker record exists, use `skill://setup-pi-flow`; do not invent a second tracker convention. Use the configured local-markdown tracker only when its record selects it.

```markdown
## Destination

<one or two lines describing the spec, decision, or change this map must make clear>

## Notes

<domain, skills to consult, and standing preferences>

## Decisions so far

- [<closed ticket title>](link) — <one-line gist; the ticket holds the detail>

## Not yet specified

<in-scope questions that are not sharp enough to ticket yet>

## Out of scope

<work deliberately beyond this destination>
```

A decision-ticket body contains only its exact `## Question`, sized to one fresh working context. It has one `wayfinder:<type>` label: `research`, `prototype`, `grilling`, or `task`. Claim a ticket in the configured tracker **before** investigating it. A ticket is frontier work only when it is open, unblocked, and unclaimed.

Use the tracker's native dependency relationship whenever available. Fall back to the configured body convention only when the tracker lacks native blocking. Record the answer as a resolution comment or the local equivalent, close the ticket, and append its linked one-line context pointer to **Decisions so far**. Link assets from the ticket; never paste their contents into the map.

## Ticket types

- **Research** (AFK): establish a fact outside the working directory. Resolve through `skill://research`; it uses a `task` batch with read-only `scout` work unless a report must be written. Link the cited report or returned findings from the ticket.
- **Prototype** (HITL): make a cheap artifact to improve a live discussion. Use `/pi-prototype`; link the artifact.
- **Grilling** (HITL): use `ask` to work through one question at a time with the person who owns the decision. The agent must not answer their side of the conversation.
- **Task** (HITL or AFK): work that must complete before a decision can be made, such as provisioning access or moving data to reveal its shape. It exists only to unblock a decision. Resolve it with the completed work and resulting facts.

## Fog and scope

Keep the map deliberately incomplete. **Not yet specified** holds in-scope fog: a suspected decision that cannot yet be phrased precisely. Graduate a patch to tickets only once its question is sharp, whether or not it is currently blocked. Do not pre-slice fog into speculative tickets.

**Out of scope** is different: it is work beyond the destination, never fog and never a future frontier item. If a created ticket is found to be out of scope, close it and add one linked line explaining why to **Out of scope**, not **Decisions so far**. It returns only if the destination is redrawn as a fresh effort.

## Invocation

Resolve no more than one non-research ticket per session. Research tickets may run in parallel.

### Chart a map

1. Name the destination through a live exchange using `skill://grilling` and `skill://domain-modeling`; settle scope before listing tickets.
2. Map the known frontier breadth-first. Surface takeable decisions and coarse future fog across the whole space, rather than diving into one thread.
3. **No-fog exit:** if this reveals no fog and the route is already clear within one context, do not create a map. Ask the user how they want to proceed.
4. Create the map with its destination and Notes, an empty Decisions-so-far index, the remaining fog, and declared out-of-scope work.
5. Create every currently precise child ticket first; wire dependency edges only after all have real identities. Leave everything else in **Not yet specified**.
6. For all new independent research tickets, dispatch one `task` batch through `skill://research`. Each read-only investigation uses a `scout` task. Only when a report is required, assign a worker with `isolated: true` and `apply: true` to write that report, then link it as the ticket's context pointer. Do not dispatch workers for trivial research.
7. Stop. Charting creates the route; it does not resolve a hand-worked ticket.

### Work through a map

1. Load only the map's low-resolution index. If the user did not name a ticket, choose the first frontier ticket in tracker order.
2. Claim that ticket before work. Read related and closed tickets only as the question requires, and use the skills named in the map's Notes.
3. Resolve the decision or perform the unblocking work. For research tickets, use `skill://research` and its `task` semantics.
4. Record the answer, close the ticket, and append a linked one-line pointer to **Decisions so far**.
5. Create newly sharp tickets, then wire their blocking edges. Remove each graduated patch from **Not yet specified**. Update or delete invalidated tickets and close any ticket now beyond the destination as out of scope.

Other sessions may claim separate frontier tickets, so treat tracker changes as concurrent work.
