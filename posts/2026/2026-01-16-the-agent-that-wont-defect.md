---
title: "The Agent That Won't Defect"
date: 2026-01-16
published: true
description: "Why agentic coding might be our best defense against the social dynamics that create tech debt"
tags:
  - ai
  - agentic-coding
  - software-development
  - tech-debt
image: images/agent-genie-banner.png
imageAlt: "A silver-haired woman in cyberpunk attire holds a glowing futuristic lamp, looking up at a digital genie made of flowing code and holographic light floating above her in a developer workspace"
---

Kent Beck called it "wishcraft" today. I laughed, then winced. It's too accurate.

We're all making wishes now. "Build me a feature." "Refactor this module." "Fix the tests." And like every genie story ever written, the results are... complicated. The genie grants your wish, technically. But genies in folklore aren't benevolent helpers — they're lawyers looking for loopholes, insurance adjusters dodging a payout. You asked for a working function? Here's one. You didn't specify it should be maintainable.

## The Slot Machine in Your Editor

Here's the thing about agentic coding right now: it's addictive by design.

Variable rewards. B.F. Skinner figured this out decades ago with pigeons and pellets. Unpredictable payoffs create compulsive behavior far more effectively than consistent ones. Sometimes the agent nails it on the first try and you feel like a wizard. Sometimes it hallucinates an API that doesn't exist. Sometimes it produces something almost right that takes you an hour to debug.

That intermittent reinforcement? That's not a bug. (Well, it is, but not just that.) It's the business model. Get us hooked before the AI companies have to charge what this actually costs. We're all in the casino right now, playing with house money, and the house knows exactly what it's doing.

## The Prisoner's Dilemma, Committed to Main

But let's set aside the dopamine hits for a moment. There's a deeper pattern here, one I keep seeing in every team I've ever worked with.

Code rots. Not because code is fragile, but because people are human.

The prisoner's dilemma plays out in every standup, every PR, every "I'll clean this up later." Individual performance metrics encourage defection: ship fast, look productive, leave the cleanup for someone else. The social dynamics of most teams make cooperation feel risky. If I spend an extra day refactoring while you're shipping features, who looks better in the next review cycle?

Everyone defects. Everyone's code gets worse. The cruft accumulates. And then we call it "tech debt" as if it were some inevitable force of nature rather than the predictable outcome of misaligned incentives.

(Yes, I've done this too. We all have.)

## What If the Agent Always Cooperates?

Here's where my pessimism flips.

An agent doesn't feel social pressure. It doesn't worry about looking slow. It doesn't have a performance review next quarter.

An agent can be prompted — instructed, really — to always cooperate. To treat every piece of code as if it's going to be read and modified by someone else. To refuse the quick hack when a clean solution exists. To leave the campsite better than it found it, every single time.

Think about that for a moment. What happens when one player in a prisoner's dilemma *always* cooperates, reliably, predictably?

Game theory tells us: it changes everything.

When you know your pair will cooperate, defection becomes less attractive. The dynamic shifts. Trust becomes possible. And in iterated games — which is exactly what software development is — consistent cooperation tends to breed more cooperation.

## Tuning for the Long Game

I'm not naive about this. Agents can write terrible code. They hallucinate. They make choices that optimize for the immediate request while ignoring everything else. Left to their own devices, with careless prompting, they're just as capable of creating cruft as any burned-out developer trying to hit a deadline.

But here's the opportunity: we get to tune them.

We get to encode values into our agents that are hard to encode into performance review systems. We can tell them — explicitly, in their system prompts — to prioritize readability over cleverness. To add tests. To consider the humans who'll maintain this code next year. To cooperate.

And they'll do it. Not because they want a promotion, but because that's what we asked for.

## The Real Wishcraft

Maybe "wishcraft" isn't such a cynical term after all. The craft isn't in making wishes. It's in learning how to wish *well*.

The genie can't read your mind. But unlike the genies in stories, this one can be taught. It can learn your codebase, your patterns, your values. It can be prompted toward cooperation even when the humans around it are feeling the pressure to defect.

Will AI coding tools live up to the hype? Probably not in the ways the marketing suggests. Will they create as many problems as they solve? Almost certainly, at least in the short term.

But if we're intentional about it — if we encode cooperation into our agents instead of just speed — we might find ourselves with something genuinely new: a teammate who never feels the temptation to cut corners just because everyone else is.

That's not magic. That's just good system design.

And maybe, for once, we'll all come out ahead.
