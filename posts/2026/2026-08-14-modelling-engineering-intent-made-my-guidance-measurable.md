---
title: "Modelling Engineering Intent Made My Guidance Measurable"
date: "2026-08-14"
published: false
description: "I'd been trying to test my agent guidance for a couple of years, and every attempt died in the same place. What changed wasn't the harness — it was modelling engineering intent as structured records, which made the guidance specific enough to measure at all."
tags:
  - GenAI
  - Software Engineering
  - Principles
  - Craft
  - Agentic Development
  - Intent
image: images/modelling-engineering-intent-banner.png
imageAlt: "Silver-haired woman in a dark blazer standing before a vast holographic wall, its left half a blurred fog of unstructured prose and its right half a crisp lattice of six-field intent records, holding a chrome caliper closed precisely around one glowing row"
---

I've been trying to test my agent guidance for a couple of years. Different approaches, different projects — swap the prompt and eyeball the diff, keep a scratch file of things the agent got wrong, ask a second model whether the first one followed the rules.

Every attempt died in the same place. Not for lack of a harness. I could never say precisely enough what I was testing *for*.

Here's the shape of it. A guidance file of mine said, in effect, write good tests. Fine advice. Now build a test for it. What does the checker look for? You reach for a model to grade the output, which is asking the thing under test to mark its own homework. Or you read the diff yourself and form an impression, which is real information but isn't repeatable and doesn't accumulate. Two years of that.

What changed this summer wasn't the measurement. It was that I finally had something specific enough to measure — and it came from somewhere I wasn't expecting.

## Two Kinds of Intent

I'd already been doing intent modelling for a while, but on the product side. [Epilogue Tracker](https://vetzal.ca/epilogue-tracker/guide/philosophy.html) models *product intent* using the [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/): actors, their goals, the interactions that serve those goals, and the journeys that carry someone through. It's user-centred design made structural — instead of a backlog of tasks, you hold a model of who benefits and why, and work descends from that. Its philosophy page puts the test bluntly: work matters when it helps real people achieve their goals.

That worked well enough that the gap on the other side started to bother me. Product intent tells you what the software should do for people. It says nothing about the engineering judgement that keeps the codebase able to keep doing it — the capabilities I'm protecting, the failure modes I've already been bitten by, the strategies I reach for and, crucially, when they stop paying off.

That judgement lived where it usually lives: in my head, and in prose files that had grown long enough that I no longer knew which parts were load-bearing.

So earlier this summer I started [Alloy](https://vetzal.ca/alloy/) ([source](https://github.com/svetzal/alloy)), to do for engineering intent what Epilogue Tracker does for product intent. Its charter puts the goal plainly: *make a team's engineering judgement explicit enough that agents can act on it*. Same modelling discipline, different domain — and deliberately a separate one, because engineering concerns that get filed as product backlog items either distort the backlog or quietly vanish from it.

## The Six-Field Record

Alloy models one engineering judgement as a record with six fields. The whole thing reads as a single sentence:

> We need to preserve this **capability** because this **threat** matters under this **expectation**, so we prefer this **strategy**, require this **evidence**, and accept this **tradeoff**.

Here's a [real record](https://github.com/svetzal/guidelines/blob/main/intents/craftsperson/python/colocated-module-specifications.toml), unedited:

```toml
id = "guidelines.intent.colocated-module-specifications"
title = "Keep each module's executable specification beside it"
category = "testing"
tags = ["python", "testing", "coverage", "risk", "critical-paths"]
relations = [
  { type = "specializes", target = "craftsperson/use-coverage-as-a-risk-signal" },
]
status = "hypothesized"
confidence = 1.0
capability = "Maintainers can immediately find a module's tests and see when a module lacks specification coverage."
threat = "A distant tests hierarchy lets code and tests drift and obscures missing module-level coverage."
expectation = "The package hierarchy will grow and be reorganized over time."
strategy = "Place one `module_spec.py` beside each `module.py` and configure pytest to discover `*_spec.py` files."
evidence = [{ type = "gate", description = "Pytest collection recognizes the configured `*_spec.py` convention and every production module requiring tests has a colocated spec file.", required = true }]
tradeoff = "Production package directories contain test modules, which can clutter navigation and packaging configuration."
```

Compare that to "write good tests." The **strategy** field is specific enough that two people would implement it the same way. The **expectation** field states a belief about the world that could turn out false — if a project's structure is frozen, the expectation doesn't hold and the strategy resting on it doesn't apply. That's not the principle being wrong; that's it being out of scope, and prose almost never separates those.

And the **tradeoff** field is the one Alloy's own docs are most insistent about, for a reason I've come to appreciate: without it, you collect truisms. People accept truisms because they sound correct, and agents then over-apply them everywhere by reflex. A record saying "prefer gateway abstractions" is weak. A record saying "prefer gateway abstractions for volatile external providers, accepting that premature abstraction hurts for stable internal modules" tells an agent where the strategy *stops* paying off.

Look at the tradeoff above: colocated specs mean production directories fill with test modules and packaging config has to cope. That's a real cost, written down by the person advocating the practice. When someone pushes back six months from now, they aren't uncovering a hidden flaw. They're reading the receipt.

## Where Team Agreement Lives

A side effect I didn't design for: separating the fields changed how disagreements go.

In the convention arguments I've been part of, two engineers are often disputing different fields entirely. One disputes the strategy — they'd solve it differently. One disputes the tradeoff — they think the cost is higher than stated. One disputes the expectation — they don't believe that's true of *this* codebase. Three different conversations, and in a prose style guide they collapse into "I don't like this rule."

Once the fields are separate, a disagreement has an address. You can accept a capability and reject a strategy. You can agree completely and still say the expectation doesn't hold here. That's what turned this from my taste with a document wrapped around it into something a team can hold jointly.

`status` and `confidence` do similar work. `status = "hypothesized"` is an admission built into the schema: we think this is right, nobody has proven it. A team can hold a principle at low confidence and still act on it — which is what I do anyway. I just hadn't been writing it down.

## From Model to Corpus

Alloy's intent model landed in June. In July I turned it on my own guidance: sixteen hand-written [craftsperson agent files](https://github.com/svetzal/guidelines) — Python, Rust, Elixir, Swift, Kotlin, Go and the rest — decomposed into [989 records](https://github.com/svetzal/guidelines/tree/main/intents) in that six-field shape. They're browsable as the [Craftsperson Intent Atlas](https://vetzal.ca/guidelines/) if you'd rather read them than clone them.

That decomposition is the thing prose couldn't give me. I can now select a subset, version one idea independently of its neighbours, and ask of any single record whether it still earns its place. A profile names what a particular agent needs, and a [compiler](https://github.com/svetzal/context-mixer2) turns it into an AGENTS.md:

```toml
id = "python-craftsperson-fx"
surface = "agent"
budget_tokens = 4000

[select]
keys = [
  "craftsperson/python/colocated-module-specifications",
  "craftsperson/python/functional-core-imperative-shell",
  "craftsperson/python/gateway-only-mocking",
  "craftsperson/python/immutable-domain-models",
  "craftsperson/python/native-modern-type-syntax",
  "craftsperson/python/native-pytest-assertions",
  "craftsperson/python/readable-bdd-specifications",
  "craftsperson/python/specific-domain-errors",
]
```

989 records is far more than I'd hand an agent, and that's the point. The corpus isn't the artifact. A compiled slice is.

## The Evidence Field Was the Test Spec All Along

Here's where it turned into something I hadn't planned.

I set out to build a behavioural benchmark — give an agent a real task twice, once with the compiled guidance and once without, and see what differs. The obvious hard part is deciding what to check for. That's precisely where my previous two years of attempts had stalled.

Except I didn't have to decide. The records already said.

Every intent carries an `evidence` field describing the observable proof that the strategy is working. For the record above: *"Pytest collection recognizes the configured `*_spec.py` convention and every production module requiring tests has a colocated spec file."* That's not documentation. That's a test specification, written months before I had any thought of benchmarking.

So the checker is a transcription:

```python
def check_colocated_specs(root, production, tests):
    settings = pytest_settings(root)
    patterns = as_patterns(settings.get("python_files"))
    configured = any("_spec" in pattern for pattern in patterns)

    production_directories = {module.path.parent for module in production}
    colocated = [
        module.relative
        for module in tests
        if module.is_spec_named and module.path.parent in production_directories
    ]
    in_test_directory = [m.relative for m in tests if m.in_test_directory]

    return result(colocated and not in_test_directory and configured, ...)
```

Read the evidence sentence and the function side by side. The function is what the sentence says, in Python. I didn't invent a metric for this principle; I implemented the one the record already carried.

And there's a detail I only noticed afterward, which I find genuinely striking. The evidence field is *typed* — `gate`, `static-analysis`, `test`, `review` — and the type turned out to predict how well I could automate it:

| Intent | Evidence type | What I could build |
| --- | --- | --- |
| colocated-module-specifications | `gate` | exact transcription |
| readable-bdd-specifications | `gate` | exact transcription |
| native-modern-type-syntax | `static-analysis` | exact transcription |
| immutable-domain-models | `test` | most of it |
| native-pytest-assertions | `review` | a proxy |
| functional-core-imperative-shell | `review` | a proxy |
| gateway-only-mocking | `review` | a proxy |
| specific-domain-errors | `review` | a proxy |

The three mechanically-typed records I transcribed exactly. The `review`-typed ones I could only approximate — and the check I got *wrong* on first run was one of them. My gateway check recognized only class-shaped gateways; a real agent wrote a module of functions instead, which is at least as idiomatic in Python, and my scorer marked a good solution non-compliant. The agent was right and I was wrong.

Nobody was thinking about benchmarks when they chose `review` for that record. The evidence type was recording something true about the principle — that confirming it takes judgement — and that fact showed up months later as the boundary of what I could mechanize. Modelling well told me something about the world I hadn't asked it.

## The Rest of the Harness

The [measurement itself](https://github.com/svetzal/context-mixer2/tree/main/benchmark/exercises) is straightforward once the checks exist. Two arms, everything held constant except the compiled AGENTS.md. The task is a small settlement package: fetch a currency rate over HTTP, convert an invoice, apply a tiered fee, round to minor units, fail in two distinguishable ways. Ordinary work, chosen because doing it at all forces all eight decisions.

The starting skeleton is deliberately barren — no tests, no domain models, no gateway, default pytest config. If the skeleton demonstrates the conventions, a competent agent copies them in *both* arms and I'd be measuring imitation rather than guidance.

Two things get measured, kept separate. Whether the software works, via a hidden acceptance suite the agent never sees, running against a real local HTTP server and inspecting no module layout at all — that guards against the failure mode that worries me most, guidance that improves style while breaking the software. And whether each principle landed, by parsing the finished code. I don't ask a model whether it complied, and I don't read the agent's transcript. What an agent says it did isn't evidence that it did.

Before running any agent I wrote a reference solution and scored it, along with the untouched skeleton. Reference: 10 of 10 acceptance, 8 of 8 adherence. Skeleton: 0 and 0. I nearly skipped that step and I'd have regretted it — a check that can't fail measures nothing, and a target I've never hit is more likely a bug in the target than a hard problem. Mine had both, and calibrating found them.

## What the First Run Showed

One trial per arm, so this is an anecdote rather than a finding. I want to be precise about that, because the number is interesting enough to get misused.

Both arms shipped working code — 10 of 10 acceptance either way. The guidance broke nothing.

Without guidance, the model followed **6 of the 8 intents on its own**. With guidance, 8.

The two that moved were the two most specific to how I work. Unguided, the agent produced exactly what you'd predict — `tests/test_rates.py`, `tests/test_settle.py`, no `Describe` classes, no `should_` methods. Guided, it produced `rates_gateway_spec.py` sitting beside `rates_gateway.py`, with `Describe` classes and `should_` methods inside, and the pytest config updated so they'd actually be collected.

The other six — frozen models, modern type syntax, plain assertions, named domain errors, an owned gateway, a pure core — the model already did unprompted. Not partially. Cleanly.

If that holds up across more trials and models, six of those eight records are paying rent in my context window every session to tell a model something it already knows.

## The Inflection Point

I want to be careful about what I'm claiming, because the useful part isn't the benchmark.

I built the intent model for reasons that had nothing to do with measurement. I wanted tacit engineering judgement written down. I wanted disagreements to have an address. I wanted [Foundry](https://github.com/svetzal/foundry) to run autonomous work against something more durable than a prompt string. Measurability was not on the list.

But structure that's specific enough to act on turns out to be specific enough to check. The `strategy` field has to be concrete or an agent can't follow it. The `evidence` field has to be observable or a human can't confirm it. Those two constraints, imposed for entirely practical reasons, are also exactly the constraints a measurable claim has to satisfy. The measurement fell out of the modelling.

That's the part I hadn't seen coming, and it's why this attempt worked where the previous two years of attempts didn't. I wasn't missing a harness. I was missing a unit.

It doesn't make my guidance correct. A record scoring 1.0 in both arms might still be worth keeping — as a record of an agreement, as a hedge against model drift, as something a *human* should read. Measurement doesn't decide what to keep. It means I'm deciding with evidence rather than a hunch.

## What I'd Rather Do Next Time

My guidance files got longer and never shorter. I'd add a line whenever an agent did something I didn't want, and never take one out, because taking one out meant guessing which was load-bearing.

There's advice going around that when a new model drops, you throw the whole file away and rebuild only what you still need. I understand the instinct and I think it's directionally right. It was also, for two years, the only move I had — and it's blunt. An amputation where what I wanted was a diagnosis.

I've got 989 records now, and a way to ask of any one of them whether it still changes what an agent builds. Most of them I've never tested. I've tested eight, once, against one model, on one task. That's barely a beginning.

But it's a beginning that produces a number, and the number exists because I stopped writing principles as prose and started modelling them as intent. When the next model lands, I don't want to throw the file away. I want to run it and find out which lines stopped mattering.
