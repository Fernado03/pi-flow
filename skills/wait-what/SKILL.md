---
name: wait-what
description: One-word corrective for verbosity. Re-pitch the message with context, ASD-STE100, and DOMAIN terms.
disable-model-invocation: true
---

# Wait What

A one-word corrective when a message doesn't land. The agent re-pitches it with less jargon, more context, and clearer structure.

## Invocation

Type `/wait-what` immediately after any message that feels dense, off-key, or unclear. No setup needed—just use it to repair one message.

## Purpose

Concision skills fail by growing—a long instruction leaves the model verbose anyway. `wait-what` works because it's a single precise leading word plus nothing else. Naming the listener's state (`wait-what`) instead of the output (`/tldr`, `/no-fluff`) asks for both fewer words _and_ the missing context at once.

It reuses tokens from your global [`CLAUDE.md`](CLAUDE.md) and each project's [`CONTEXT.md`](CONTEXT.md), so the skill, baseline instructions, and domain docs reach for the same leading words.

## Behavior

When invoked:

1. Show a short context header (one line naming what you're building).
2. Rewrite the prior message using:
   - [ASD-STE100 Simplified Technical English](https://www.ste.com/) principles: short sentences, common words, active voice.
   - Domain terms from [`CONTEXT.md`](CONTEXT.md): prefer established vocabulary over jargon.
3. Structure as: **context**, **restatement**, **ask**. End with a simple question.

## When not to use

This repairs one message; it doesn't prevent the next. The cure for recurring jargon is shared language built upfront with `/grill-with-docs`. Reach for `/wait-what` when you don't have that yet.
