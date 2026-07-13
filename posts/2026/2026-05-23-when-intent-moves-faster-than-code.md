---
title: "When Intent Moves Faster Than Code"
date: "2026-05-23"
published: true
description: "Agents build code so fast that intent has become the bottleneck. And in a large codebase, the friction between fluid intent and rigid structure becomes the thing that actually limits how fast you can move."
tags:
  - GenAI
  - ai
  - agentic
  - software design
---

Lately I've been noticing a rhythm. On a small codebase — small enough that the code, the specification, and my evolving intent all fit comfortably in an agent's context window — the work moves. Iteration after iteration, decisions land and the system reshapes around them. Switch to a larger codebase and the rhythm collapses. Same agent. Same model. Same hands. The work gets slow and careful and full of pauses.

The difference isn't me. It isn't the agent. It's what fits.

## What Fits Determines What Moves

On a 1M-token model, I find I can keep maybe 100-200K tokens of code, specification, and active intent in play before things start to fray. On a 200K-token model, closer to 50-100K. Past that threshold, you stop collaborating with a coherent tool. You start stitching together fragments, each one seeing a slice of the truth and missing the rest.

Small enough to hold in a single context is the new threshold of speed.

![A wide editorial diagram: a rounded rectangle labeled CONTEXT WINDOW sits on a thin floor line in the right half of the frame, holding three labeled shapes — sage-green CODE, dusty rose SPEC, amber INTENT — with comfortable whitespace around them. The floor to the left of the container is empty.](images/intent-faster-fits.png)

Cohesion has always been economic — the maintenance costs were real, the coupling tax was real, the slow grind of poorly-organized code through every future change was real. We just couldn't see it cleanly. It showed up as velocity decay over quarters, as the senior engineer who "just knows where things are," as the refactor that kept getting deferred. Now the cost is visible in minutes. A codebase whose related code lives close together, whose concerns don't bleed sideways through eight files across four modules, fits. You can hand it whole to the agent — intent and all — and watch it move. A codebase that's grown by accretion, dragging its concerns through unrelated layers because nobody had time to put them where they belonged, doesn't fit. So you slow down. You summarize. You coordinate. You build scaffolding around the work because the work itself can no longer be held in one view.

![The same CONTEXT WINDOW container in the same position on the same floor, but now crammed full of shapes with extras breaking out through its left wall — falling and piling onto the floor across the left half of the frame, labeled CONFIG, TESTS, DOCS, HISTORY, SCAFFOLDING, DEPS — some shapes clipped at the left edge as the spill continues out of view](images/intent-faster-overflow.png)

What changed isn't the cost. What changed is the feedback loop.

## The Agent Will "Help" You Outgrow Your Context

Those same agents that thrive in small, cohesive codebases are remarkably good at growing those codebases past the point where they still fit. Generate this helper. Add that abstraction. Build a config layer. Sketch a test harness. Each suggestion is reasonable in isolation. In aggregate, you've turned 30K tokens of code into 120K in an afternoon, and the rhythm that felt magical starts to stutter.

Agents have no instinct for restraint. They produce code as fast as you accept it, and the bias runs toward addition — new file beats modified file, new class beats reused class, new scaffolding beats deleted scaffolding. Without a human enforcing a deletion habit and a cohesion habit, the codebase grows itself out of the zone where it works best. The tool that gave you speed will, if you let it, build you a system the tool can no longer work with.

## We Already Trained for This

There's a quiet vindication in this for anyone who spent the last two decades on the technical practices side of agile. Test-driven development. Simple design. Refactoring as a daily habit, not an occasional cleanup. Kent Beck's four rules — passes the tests, reveals intent, no duplication, fewest elements. The whole point of those practices was always to build code that could withstand a sustained pace of change. Not change in spite of structure — change *through* structure deliberately shaped to absorb it.

The developers who internalized those practices — whether through formal training or years of hard-won pain that taught the same lessons in a different accent — are the most important people in our field right now. They built the muscles agentic development requires. They know how to keep code small. They know how to keep concerns where they belong. They know when to delete. Those are the skills that determine whether your agent keeps moving or grinds to a halt against the codebase you let grow.

I built an eight week program in CodingCulture.io (since dismantled) that coached people through exactly this — Beck's four rules, testing in legacy systems, design through testing, coupling and cohesion. At the time it felt like keeping a quiet flame lit for craft. Now it feels like the curriculum nobody knew they were going to need.

## Intent Became the Bottleneck

Because agents can produce code so quickly, I now spend most of my time *before* they start typing. Resolving ambiguity. Reconciling conflicting intents. Asking "what do you actually want this to do, and why, and what happens at the edges?" until the answer is clear enough that construction is almost mechanical.

Code used to be the bottleneck. Intent is the bottleneck now.

And intent is messier work than construction ever was. Slower. More conversational. More iterative. You can't unit-test it. You can't compile it. You hold it up to the light and squint and ask whether it actually says what you think it says — and most of the time it doesn't, not yet, not fully. That's the real work now. Building was the easy part. We just couldn't see it, because building used to take so long that it disguised itself as the hard part.

## What Are We Even Measuring?

This is the part that frustrates people. Progress used to be visible because the unit was the feature: planned, scoped, built, shipped. You could line them up on a board and watch them move. With agentic work, the feature is fluid. It shifts to best represent the intent underneath it, because the construction is cheap and the construction was never the point.

So what do you measure?

If you're used to the long latency between a BRD and the code that implements it — that comfortable months-long gap where the document sits still while engineers translate it — this new way looks like nothing is happening. The document changed three times this week. The code keeps re-shaping itself. Nobody is "done" with anything. And yet the actual movement — the convergence on what to build and why — is faster and deeper than it's ever been. The visible artifacts just don't sit still long enough to count.

When I was developing training materials on agentic development practices at RBC, this was one of the hardest things to convey. The old shape of progress had a satisfying *thunk* to it. Story moved. Card crossed the lane. Done. The new shape doesn't. It looks like a lot of conversation that suddenly resolves into working software. From outside the loop, it can look like meandering — until the moment it doesn't.

## The Tension Nobody Warned You About

Now drop that fluid intent into a large codebase and watch the tension form. Intent wants to move fast — it's exploring, settling, adjusting, finding the right shape. The code wants to move slow — it's load-bearing, depended-on, surgical-by-necessity. You can't rebuild the third module from scratch every time the intent shifts; other things depend on its shape, on its contract, on the assumptions it quietly enforces for the rest of the system.

So intent and code start moving at different speeds, and the friction is real.

Cohesion is what reduces that friction. Not because it's pretty. Because cohesive code is small enough to re-shape when the intent changes — without taking out the rest of the system on the way. Sprawl makes intent expensive. Cohesion makes intent cheap. The gap between those two cost curves, in an agentic world, is the gap between teams that ship and teams that build elaborate processes to compensate for the fact that they can't.

If your code is so entangled that the agent can't see all the pieces it needs to change in order to honour a single shift in intent, the agent isn't your bottleneck. Your code organization is.

That's a harder conversation than "we need better tooling." But it's the real one.

## What This Adds Up To

The codebases that fit will move. The ones that don't will keep building scaffolding to compensate, and call it progress.

Cohesion is no longer a code-quality concern. It's the rate-limiter on every conversation we're trying to have with our own systems.
