---
title: "The Spec for the Work Isn't the Spec for the Thing"
date: "2026-08-16"
published: true
description: "I looked at GitHub's spec-kit when it launched a year ago, found it incomplete, and carried on with my own line of work. Coming back to it, I can finally name what was missing: it builds a project spec, and I keep wanting a product spec."
tags:
  - GenAI
  - Software Engineering
  - Agentic Development
  - Intent
image: images/spec-for-the-work-banner.png
imageAlt: "A silver-haired woman in a dark blazer braces at the base of a vast dark machine wall, one hand pressed on a glowing tool seated in the single narrow lit band of the structure, the other holding an amber lamp up into the darkness above where its beam falls short — obsolete drafting instruments and cracked panels lie half-buried in dust around her"
---

There's a moment I've had a few thousand times in 35 years of writing software. I'm reading a function, often one I wrote myself, and I hit a number.

```python
for attempt in range(3):
    ... do something ...
```

And I can't tell what it means.

Not what it *does*. That part's obvious — it retries three times. I can't tell whether the 3 is load-bearing. Is it a contract with somebody's rate limiter? Is it a number that showed up on a Tuesday afternoon because two felt stingy and four felt greedy? The code is perfectly clear about what happens. It is completely silent about whether I'm allowed to change it.

## Where the refactoring runs out

There's a name for that 3. Anyone who has done technical coaching has said it out loud a few hundred times: it's a **magic number**. A bare literal doing real work, with nothing to explain it — not even a name. Hoisting it out is one of the first refactorings I teach. It's small, it's safe, and the payoff shows up immediately.

```python
MAX_RETRIES = 3

def fetch_rate(currency):
    for attempt in range(MAX_RETRIES):
        ...
```

Magic number gone. That's Beck's second rule of simple design earning its keep — *reveals intent*. A moment ago the 3 told you nothing. Now it tells you something.

Look closely at what, though. `MAX_RETRIES` describes our side of the exchange: how many times this code will try before it gives up. It says nothing about why three. And the why lives on the far side of a network boundary, in somebody else's system.

```python
MAX_RETRIES_BEFORE_RATE_LIMIT = 3
```

That name is better, and it's better in a specific way. It stopped describing only our behaviour and started describing the relationship. A reader now knows the 3 isn't ours to pick freely. There's a counterparty, and they have a limit. Part of the obligation now sits in the identifier, in plain view of anyone who opens the file.

So I don't want any of this read as source code being a poor medium for intent. It isn't. We just don't push it very hard. In the middle of wiring up an algorithm, expressiveness reads as overhead. What could have been a named type stops short as a string. What could have been a value object stops short as an int. What could have been a state machine stops short as a chain of ifs. We stop there because the plainer form looks computationally cheaper, and often it isn't even that. Most codebases I've worked in, mine included, could carry far more meaning than they do. Most of us stop at `MAX_RETRIES` and call it named.

So the first answer is always to put more into the code. Push the naming, push the types, push the structure, until the code says everything code can say.

Then look at what the better name still doesn't tell you. Whose rate limit? What is it exactly — is three the ceiling, or three with headroom under a ceiling of four? What happens when you cross it: a rejected call, or a fifteen-minute ban? When was that last confirmed, and with whom? Did somebody already try exponential backoff and find it useless, because the window counts calls rather than seconds?

None of that fits in an identifier, and no refactoring will put it there. *Reveals intent* is still the right rule. I've taught it more times than I can count and I'd teach it again tomorrow. The rule has a horizon, and this is where you can see it.

Do the code work first, and less is left over than you would expect. What remains is real.

I've been circling that remainder for a while now. [Code is knowledge](/2026/2026-04-09-code-is-knowledge), and [every codebase is an uncompiled knowledge base](/2026/2026-04-10-every-codebase-is-an-uncompiled-knowledge-base). But only some of that knowledge makes it into the code. The rest evaporates on contact with the keyboard.

## Why I passed on spec-kit the first time

GitHub released spec-kit almost exactly a year ago — first commit August 21st, 2025. I read it carefully when it landed. Familiar territory, I thought, and incomplete for what I wanted, so I didn't adopt it.

I carried on with what I was already doing: hand-tuning my own agent guidance, and working through the [CRAFT ideas](https://github.com/svetzal/context-mixer/blob/main/THEORY.md) I'd been sketching in context-mixer. Chunk knowledge into small domain-coherent units, keep them from contaminating each other, fit a selection to the task in front of you. Those ideas eventually spun out into tools of their own: [Epilogue Tracker](https://vetzal.ca/epilogue-tracker/guide/philosophy.html) for product intent, [Alloy](https://vetzal.ca/alloy/) for engineering intent, and a [compiler](https://github.com/svetzal/context-mixer2) that turns intent records into agent guidance.

"Incomplete" was as precise as I could be at the time. It nagged at me, because a vague objection isn't much use to anyone, including me.

Spec-kit is getting a lot of attention now in circles I'm connected to. So I cloned it again this week and read the whole thing — the manifesto, every command prompt, the templates, the docs on persistence and complexity. A year of building along my own line turns out to be a good way to see what a tool does and doesn't do. I can name it now.

What I found isn't a flaw. It's a category difference, and I think it's the same one a lot of people are bumping into without a word for it.

Credit where it's due first, because the craft in there is real. The `[NEEDS CLARIFICATION]` marker forces a model to flag an unknown instead of quietly filling it with something plausible. That's the failure mode that worries me most about generative tooling, and they built a direct countermeasure for it. The user-story template insists each story be independently testable and deliver a viable slice on its own. That's vertical slicing, hard-won practice that a lot of teams never picked up. Success criteria have to be measurable and technology-agnostic. I've coached teams who would have been better off for exactly that discipline.

## Two kinds of spec

A **project spec** describes a change. It's true at a moment. Here's what we're about to build, here's the plan, here are the tasks. Once the change ships, its job is done.

A **product spec** describes the system. It's true *now*. Here's what this thing is, who it's for, what it owes them, which parts are load-bearing. It doesn't expire when a feature ships, because it was never about a feature.

Spec-kit builds an excellent project spec. The whole workflow is shaped for it — specify, plan, tasks, implement — all scoped to one feature directory, all pointed at one change.

The clearest evidence sits in the repo itself, in a document called `spec-persistence.md`. It asks what should happen to these files after the code ships. It offers three answers: discard them, freeze them as history, or keep them as the living contract. Then it says plainly that none is the default and none is required. I found that genuinely honest, and completely diagnostic. A durable artifact doesn't need three competing theories about whether it survives contact with production. The question only comes up because the artifact was built for a change, and the change is over.

So if you arrived wanting a product spec, you get something well-made that answers a different question. That's a disorienting feeling, and I don't think it has a name in most people's heads yet. It certainly didn't in mine a year ago.

## Coherence is not correspondence

The second thing I found changed how I think about this whole category of tool, including my own.

Every quality check in spec-kit compares the documents to each other. Does the plan match the spec? Do the tasks cover the requirements? Any placeholders left, any terminology drift, any conflict with the project's constitution? The metrics it reports back are coverage percentage, ambiguity count, duplication count.

All of those measure **coherence** — whether the documents agree among themselves.

None of them measure **correspondence** — whether the documents agree with the world.

For a project spec, coherence is the right check. You have three artifacts and you want them consistent before you turn an agent loose. But it means the green checkmarks can't separate a spec that captured what the business needed from a spec that faithfully encoded a misunderstanding. A document set can be flawlessly self-consistent and wrong, and the numbers come out identical.

That isn't a knock. It's the question I now ask of any spec framework, and I asked it of my own first. What do the checks actually range over? If the answer is "the other documents," you have a coherence engine. Your correspondence has to come from somewhere else — usually a person who knows something the documents don't.

I built a [behavioural benchmark for my own guidance](/2026/2026-08-14-modelling-engineering-intent-made-my-guidance-measurable) last week, and this is what I was most careful about. I don't ask a model whether it complied. I don't read the agent's transcript. The acceptance suite runs against a real local HTTP server and never inspects module layout, because I wanted a check that could disagree with me. What an agent says it did isn't evidence that it did. What a document says about itself isn't evidence either.

These tools also drift, and I say that as somebody who spent years inside enterprise process, including a stretch doing SAFe. Spec-kit's community catalog now carries 31 presets and 152 extensions. A dozen have "governance" in the name. Three cover requirements intake alone — authoring, review, and sequencing, as separate stages. One maps tasks into Jira epics and stories. One imports the arc42 architecture document set.

Nobody's doing anything wrong there. I read it as a signal about the tool's shape. Phase gates, a constitution, compliance checks, hand-offs between named stages — that's a channel, and enterprise process flows into a channel the way water does. Intent isn't required.

## What the missing artifact has to carry

I should be straight about my own gaps here, because I've built for part of this and not the part I'm describing.

Engineering judgement I have covered. [Alloy](https://vetzal.ca/alloy/) models one judgement as a six-field record: capability, threat, expectation, strategy, evidence, tradeoff. The **expectation** field states the belief about the world that the choice rests on. The **tradeoff** field names what the choice costs, written by the person arguing for it. Between them you can tell a contract from a convenience. There are [989 of those records](https://vetzal.ca/guidelines/) now.

Product intent I model too, in [Epilogue Tracker](https://vetzal.ca/epilogue-tracker/guide/philosophy.html) — actors, goals, journeys. But it lives in a tracker, off to one side of the code. Alloy's records ride into the repo as compiled agent guidance. That's right for engineering judgement and wrong for "who is this for, and what does it owe them."

So the gap has a tight shape. Product intent, in the repository, versioned with the code, updated by the same commit that changes behaviour. And it carries only what the source cannot carry:

- Rejected alternatives.
- Who is owed this behaviour, and under what obligation.
- Constraints you already satisfied. These leave no trace, because the code simply lacks whatever would have broken them.
- Deliberate behaviour that reads as a bug. Every codebase has a few, and somebody eventually "fixes" one before finding out why it was there.

Everything else is restatement, and restatement is what kills living documentation. A second description of behaviour that no compiler checks and no test covers will drift away from the thing it describes. Anything you can derive from the source stays out.

## Why I think it's tractable now

Living documentation has failed the same way for forty years, and it was never a discipline problem. The doc isn't on the critical path of any change, so nobody updates it, so it goes wrong, so people stop trusting it, so nobody reads it, so nobody notices it's wrong. That's a broken feedback loop. You can't exhort your way out of one, and I've watched good teams try.

Two things changed the arithmetic. Neither is that we all got more disciplined.

Agents read this material constantly. Human-facing docs rot in silence because nobody opens them. Context an agent loads every session gets exercised every session, and a wrong statement produces a visibly wrong action inside the hour.

The maintenance cost can also come off the human's critical path — as long as you're precise about which half you automate. An agent can compare a claim against the code and tell you the claim has become suspect. It cannot tell you what you meant. Detection is mechanical; intent is not. Get that backwards, ask a model to write intent from a diff, and it will hand you a fluent restatement of the function. That's the one thing the artifact was supposed to exclude.

Alloy's `evidence` field drew the same line for me, and it held when I built checks against it. Some things a machine can confirm. Some need a person. Being wrong about which is where the effort goes to die.

So I want a tripwire, not an author. Something that notices `MAX_RETRIES_BEFORE_RATE_LIMIT` went from 3 to 5 while the record still explains why it's 3, and asks me about it. The constant has a good name by then. It's the obligation that drifted, and I'm the only one who can say whether it still holds.

Spec-kit wasn't a new idea to me when it landed. I'd been working the same ground for years, which is exactly why I could tell on one read that something was missing — and why "incomplete" was as far as I could get. Knowing a thing is incomplete and being able to say what it lacks turn out to be separated by a great deal of building.

That gap took years to close, on both sides of that first read. CRAFT, the guidance files, two intent models, a benchmark built to disagree with me. Somewhere in there the distinction got sharp enough to say out loud: the spec for the work isn't the spec for the thing. Both are real artifacts. Only one of them is still load-bearing on Friday.

I never waited for the answer, and there's no reason to. I shipped the whole way through — hand-tuned guidance, prose files I knew had grown too long, records I wasn't sure would pay for themselves. Shipping is how the gap became visible at all. You don't find the shape of a missing thing by thinking about it. You find it by building across the space where it should be, and noticing your foot go through.

So use spec-kit. By choice, or because somebody told you to. It builds a good project spec, and a good project spec is worth having. Just know which one you're holding. When the feature ships and the artifact goes quiet, that isn't the tool failing you — that's the tool finishing the job it was built for, and the other job starting.

The other job doesn't have a tool yet. That's not a reason to slow down. It's the part of the field still open, and it will get worked out the way these things always do: by people shipping systems, and noticing what they had to carry in their heads the whole time.
