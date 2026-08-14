---
title: "What Happened When I Started Testing My Agent Guidance"
date: "2026-08-14"
published: false
description: "My AGENTS.md files shape every line my agents write, and I had never tested one. Here's what I found when I turned my engineering principles into falsifiable records and measured whether they changed the work."
tags:
  - GenAI
  - Software Engineering
  - Principles
  - Craft
  - Agentic Development
---

A few weeks ago I added a line to an AGENTS.md file. I don't remember which line.

That bothered me more the longer I sat with it. I've been carrying agent guidance files for over a year, and mine have only ever grown. Every line costs context on every session, forever. Adding one is cheap and feels responsible. Removing one is a guess.

There's advice going around that when a new model drops, you throw your guidance away and rebuild only what you still need. I understand the instinct, and I think it's directionally right — new model, new defaults, old scaffolding possibly obsolete. When I tried to apply it to my own files, though, I couldn't work out which parts I still needed. I had no way to tell. Throwing it all out was the only move available to me, and that felt less like a decision than like a lack of one.

So I went looking for an instrument. What I found on the first run surprised me — and it only became findable because of a decision I'd made months earlier for completely unrelated reasons.

## Prose Doesn't Decompose

I maintain a repository of craftsperson agents — sixteen of them, one per language and framework stack I work in. Python, Rust, Elixir, Swift, Kotlin, Go, and so on. Each started life as a hand-written markdown file full of advice about quality gates, test discipline, functional core and imperative shell, idiomatic patterns.

They worked. They also got long.

And there was a question I couldn't ask of any paragraph in them: is this still earning its context? Does this section change what the model produces, or is it describing something the model already does? Prose doesn't decompose. I couldn't select half a paragraph, couldn't version one idea inside it, and certainly couldn't test whether one clause had changed anyone's behaviour.

I wrote a while back about [knowing your principles](/2026/2026-02-20-know-your-principles) — that the gap I keep running into isn't between code and understanding, it's between understanding and *articulation*. I still believe that. Articulation turns out to be the first step rather than the last one, though. Writing a principle down in prose makes it communicable. It doesn't yet make it testable.

So I broke the sixteen agent files apart into 989 intent records.

## What an Intent Record Looks Like

Here's a real one, unedited, from the corpus:

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

Six fields carry the argument, and each is doing specific work.

**Capability** is what becomes possible. **Threat** is the failure it prevents. Most of what I'd written before gave one or the other, and separating them showed me how much weaker each is alone — a capability with no threat reads as a preference, and a threat with no capability reads as fear.

**Strategy** is the only field an agent strictly needs. It's the instruction. Everything around it exists so a human can argue with it.

**Evidence** is how you'd know it was followed. It's typed — `gate`, `review`, `static-analysis`, `test`. A principle whose evidence type is `review` is one I'm trusting a human to notice. A principle whose evidence is a `gate` can be automated. Filling in this field forced me to admit which kind I actually had, and I was wrong about several.

**Tradeoff** is the field I'd fight hardest to keep. A principle with no stated cost is a slogan. Look at that one: colocated specs mean production package directories fill up with test modules, and packaging config has to deal with it. That's a real cost, written down by the person advocating the practice. When somebody pushes back on the convention six months from now, they aren't discovering a hidden flaw. They're reading the receipt.

**Expectation** is the field that makes the whole thing falsifiable. "The package hierarchy will grow and be reorganized over time." That's a testable belief about the world. If a project's structure is frozen — a small library, a finished tool — the expectation doesn't hold, and the strategy resting on it doesn't apply. The principle isn't wrong. It's out of scope. Those are different things, and the prose version of this guidance never distinguished them.

## Where Team Agreement Lives

Something I didn't anticipate: separating those fields changed how disagreements go.

In the convention arguments I've been part of, two engineers are often disputing different fields. One disputes the strategy — they'd solve it differently. Another disputes the tradeoff — they think the cost is higher than stated. A third disputes the expectation — they don't believe that's true of *this* codebase. Those are three different conversations, and in a prose style guide they collapse into "I don't like this rule."

Once the fields are separate, a disagreement has an address. You can accept a capability and reject a strategy. You can agree entirely and still say the expectation doesn't hold here. That's what turned this from my taste with a document wrapped around it into something a team can actually hold jointly.

The `status` and `confidence` fields do similar work. `status = "hypothesized"` is an admission built into the schema: we think this is right, nobody has proven it. A team can hold a principle at low confidence and still act on it — which is what I do anyway, I just hadn't been writing it down.

## Compiling a Slice

989 records is far more than I'd hand an agent. That's the point. The corpus isn't the artifact; a slice of it is.

A profile names what a particular agent needs:

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

[content]
include = ["guidance", "rationale", "evidence"]
```

That compiles to an AGENTS.md. The record above becomes one line:

```text
- Preserve: Maintainers can immediately find a module's tests and see when a
  module lacks specification coverage. Because a distant tests hierarchy lets
  code and tests drift and obscures missing module-level coverage. Expect: The
  package hierarchy will grow and be reorganized over time. Prefer: Place one
  `module_spec.py` beside each `module.py` and configure pytest to discover
  `*_spec.py` files. Require: Pytest collection recognizes the configured
  `*_spec.py` convention and every production module requiring tests has a
  colocated spec file. Accept: Production package directories contain test
  modules, which can clutter navigation and packaging configuration.
```

Selection is the payoff. Same corpus, different profiles, different budgets — a Rust project never sees the Python records, and a small script never sees the enterprise-scale ones.

I built benchmarks for this. They scored selection precision, how much of each record survived rendering, byte size, vocabulary overlap against the hand-written agent the slice replaced. My best run: 0.9896 precision, 15,907 approximate tokens, every strategy retained exactly.

Every one of those numbers is a property of a document. Not one of them tells me whether an agent handed that document builds anything differently.

I had built a very precise instrument for measuring the wrong thing.

## Measuring the Work Instead

So, the harness. Give an agent a real coding task twice — once with the compiled AGENTS.md, once without. Hold everything else constant. The difference between the runs is the measurement.

The task needs care. I wrote a small settlement package: fetch a currency rate over HTTP, convert an invoice, apply a tiered fee, round to the currency's minor units, fail in two distinguishable ways. Ordinary work. I chose it because doing it *at all* forces every one of those eight decisions — you can't complete it without deciding where tests live, whether models are frozen, whether the HTTP call sits behind a boundary.

The starting skeleton is deliberately barren: no tests, no domain models, no gateway, default pytest configuration. That part matters more than it sounds. If the skeleton demonstrates the conventions, a competent agent copies them in *both* arms, and I'd be measuring imitation rather than guidance.

Then two measurements, kept separate.

**Does the software work?** A hidden acceptance suite the agent never sees, copied in afterward and run against a real local HTTP server. It drives the public contract and inspects no module layout at all, so any structure can pass it. This guards against the failure mode that worries me most: guidance that improves style while breaking the software.

**Did each principle land?** Measured by parsing the finished code. I set myself two rules here. I don't ask a model whether it complied. And I don't read the agent's transcript — what an agent says it did isn't evidence that it did.

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

That's the whole check. It reads the pytest configuration, finds spec files sitting beside the module they specify, and fails if the tests ended up in a separate hierarchy. Boring, deterministic, and it can't be talked into a favourable answer.

## Calibrating Before I Trusted It

Before running a single agent, I wrote a reference solution — a complete implementation satisfying every acceptance check and exhibiting all eight intents. Then I ran the harness against it, and against the untouched skeleton.

Reference: 10 of 10 acceptance, 8 of 8 adherence. Skeleton: 0 and 0.

I nearly skipped this step, and I'd have regretted it. A check that can't fail measures nothing, and a target I'd never hit is more likely a bug in the target than a hard problem. Mine had both. The reference immediately caught a broken method in my fake HTTP server. Then a real agent run caught something better: my gateway check only recognized class-shaped gateways, and the agent had written a module of functions instead. Python wraps external calls in a module at least as often as in an object. The agent was right and my scorer was wrong.

That's what a calibrated instrument buys. It tells you when *it* is broken, not only when its subject is.

## What the First Run Showed

One trial per arm, so what follows is an anecdote rather than a finding. I want to be precise about that, because the number is interesting enough to get misused.

Both arms shipped working code — 10 of 10 acceptance either way. The guidance broke nothing.

Without guidance, the model followed **6 of the 8 intents on its own**. With guidance, 8.

The two that moved were the two most specific to how I work. Unguided, the agent produced what I'd have predicted:

```json
"tests_in_test_directory": [
  "tests/__init__.py", "tests/conftest.py",
  "tests/test_rates.py", "tests/test_settle.py"
],
"describe_classes": [],
"should_methods": []
```

Guided, it produced `src/fxsettle/rates_gateway_spec.py` sitting beside `rates_gateway.py`, with `Describe` classes and `should_` methods inside, and the pytest configuration updated so they'd actually be collected.

The other six — frozen models, modern type syntax, plain assertions, named domain errors, an owned gateway, a pure core — the model already did unprompted. Not partially. Cleanly.

If that holds up across more trials and more models, six of those eight records are paying rent in my context window every session to tell a model something it already knows.

## What This Path Made Possible

I want to name the pieces, because no one of them gets you here alone.

**Principles as data rather than prose.** This is the load-bearing decision, and I made it for organizational reasons — so disagreements would have an address — long before I knew it would enable measurement. Structure is what let me compile slices, and structure is what gave me a unit small enough to score.

**Falsifiable by construction.** The `expectation` and `evidence` fields aren't documentation. They're what let me ask whether a principle still applies and whether it can be observed at all. A principle I can't falsify is a preference I've quietly made load-bearing.

**Compiled per context rather than accumulated.** The corpus grows; the delivered artifact doesn't have to. That inverts the economics of the AGENTS.md file, which otherwise only ratchets one way.

**Behaviour rather than lexicon.** My old benchmark measured how much of the source document survived into the output. The new one measures what an agent built. Those turn out to be nearly unrelated questions, and I spent months on the first one.

**Per-intent resolution.** This is the one that changes what I can do on a Tuesday. When a new model drops, I don't have to choose between keeping everything and rebuilding from nothing. I can ask, one record at a time, whether it still changes anything, and retire the ones that don't while keeping the ones that do.

None of this makes my guidance correct. A record scoring 1.0 in both arms might still be worth keeping — as documentation of an agreement, as a hedge against model drift, as something a *human* should read. Measurement doesn't decide what to keep. It means I'm deciding with evidence rather than a hunch.

## The Diagnosis I Wanted

My guidance files got longer and never shorter. I'd add a line whenever an agent did something I didn't want, and I never took one out, because taking one out meant guessing which of them was load-bearing.

Throw it all out and rebuild is a reasonable response to that, and for a while it was the only one I had. It's also blunt — an amputation where what I wanted was a diagnosis.

I've got 989 records and a way to ask, per record, whether it still earns its place. Most of them I've never tested. I've tested eight, once, against one model, on one task. That's barely a beginning.

But it's a beginning that produces a number, and I didn't have one of those last week. When the next model lands, I don't want to throw the file away. I want to run it and find out which lines stopped mattering.
