---
title: "What Sixteen Models Did With the Same Eight Principles"
date: "2026-08-17"
published: true
description: "277 trials across sixteen models, one Rust scenario, the same eight engineering intents. Lift ranged from 0.00 to 0.89 depending only on which model read them — and the strongest model in the set was nowhere near the top."
tags:
  - GenAI
  - Software Engineering
  - Principles
  - Craft
  - Agentic Development
  - Intent
image: images/sixteen-models-banner.png
imageAlt: "Silver-haired woman in a dark blazer standing before sixteen tall glowing columns of identical guidance cards, each column lit to a different height, one column dark and unchanged, her hand resting on the shortest lit one"
---

[Last week's post](/2026/2026-08-14-modelling-engineering-intent-made-my-guidance-measurable) ended with a number I was careful to call an anecdote. One model, one trial per arm. Without guidance it followed 6 of my 8 intents on its own; with guidance, 8. And I wrote that if it held up, six of those records were paying rent in my context window every session to tell a model something it already knew.

It didn't hold up. Not because the number was wrong — it was a fine number for the model that produced it. It didn't hold up because "6 of 8 unguided" isn't the sort of thing that *can* hold up. It's a property of a model, not of my guidance, and I'd quietly written it down as though it were a property of my guidance.

So I ran it properly. Sixteen models, 277 trials, one scenario.

The same eight records produced lift anywhere from **0.00 to 0.89**, depending on nothing but which model read them.

## What Ran

The harness is the one from last time, so I won't re-lay it: two arms with everything held constant except a compiled `AGENTS.md`, a hidden acceptance suite the agent never sees, adherence decided by parsing the finished code rather than by asking a model, and a reference solution and bare skeleton scored first to calibrate the ceiling and the floor. The [README](https://github.com/svetzal/context-mixer2/tree/main/benchmark/exercises) has the mechanics.

What's new is scale. Seven Claude models through Claude Code, five GPT models through Codex, and four local models through opencode against ollama — each on the driver that bills it correctly, so a big sweep runs against subscriptions and rate limits rather than metered tokens. Ten trials per arm for the hosted models. The local ones are at three and climbing.

The scenario is `rate-card`, one of three in the harness and the only Rust one: a small Rust crate that prices parcels against a tab-separated rate card read from disk, with a fixed public contract and four error variants that have to be distinguishable. Eight intents get scored — error modelling, effect boundaries, gateway traits, test layers, lint policy, structured tracing, public documentation, and fakes at boundaries. Ordinary work. Doing it at all forces all eight decisions.

Those eight are disjoint from the sets the other two scenarios score, which is deliberate: two exercises scoring the same intents would measure the harness twice and the guidance once.

The exercises are seeded from the DeepSWE benchmarks. That's a recent move on my part, and the reason is contamination: enough of the older benchmark suites have been trained into the models by now that a task drawn from one tells you about a model's memory rather than its judgement. Reaching for a newer suite is the cheapest defence available, and it's not a permanent one.

What I change is the starting project, and that change is doing real work. A skeleton has to be neutral on every decision it scores — no existing tests, no domain models, no gateway, default configuration — because a skeleton that already demonstrates the conventions measures whether an agent can copy, not whether guidance changes anything. That neutrality *is* the control arm. Without it there's nothing to compare against, which is why the task comes off the shelf and the starting point doesn't.

Every rate below carries a Wilson interval, and every lift a Newcombe interval on the difference. `excludes 0` is the honest headline, and I'll say when a number doesn't clear it.

## The Spread

| Model | Unguided | Guided | Lift | 95% interval |
| --- | --- | --- | --- | --- |
| Opus 4.7 | 0.043 | 0.936 | **0.893** | [0.785, 0.939] |
| Sonnet 5 | 0.171 | 0.889 | **0.718** | [0.577, 0.806] |
| Opus 4.8 | 0.343 | 1.000 | **0.657** | [0.532, 0.757] |
| Qwen3.8 27B *(local, n=3)* | 0.095 | 0.636 | **0.541** | [0.258, 0.721] |
| Opus 5 | 0.465 | 1.000 | **0.535** | [0.412, 0.646] |
| GPT-5.6-sol | 0.186 | 0.667 | **0.481** | [0.324, 0.604] |
| Sonnet 4.6 | 0.000 | 0.457 | **0.457** | [0.334, 0.573] |
| GPT-5.6-terra | 0.129 | 0.465 | **0.336** | [0.188, 0.466] |
| Opus 4.6 | 0.086 | 0.414 | **0.329** | [0.189, 0.454] |
| Qwen3.6 27B *(local, n=3)* | 0.048 | 0.286 | **0.238** | [0.006, 0.456] |
| GPT-5.5 | 0.100 | 0.329 | **0.229** | [0.093, 0.356] |
| Gemma4 31B *(local, n=3)* | 0.095 | 0.286 | 0.191 | [-0.053, 0.415] |
| Haiku 4.5 | 0.043 | 0.229 | **0.186** | [0.074, 0.300] |
| GPT-5.6-luna | 0.186 | 0.357 | **0.171** | [0.024, 0.310] |
| Qwen3.5 122B *(local)* | 0.114 | 0.175 | 0.060 | [-0.060, 0.185] |
| GPT-5.4 | 0.114 | 0.114 | 0.000 | [-0.110, 0.110] |

Bold means the interval excludes zero. Thirteen of sixteen do.

Fifteen of the sixteen models completed the task in every single trial, in both arms — 1.0 acceptance, no exceptions. The one that didn't, Qwen3.5 122B, failed it about equally in both arms (0.70 unguided, 0.78 guided), which is a capability problem rather than a guidance problem. Guidance improving the style while breaking the software is the failure mode the acceptance suite exists to catch. Across 277 trials it never appeared once.

## Lift Is Not Monotonic in Capability

Look at the top of that table and then look for Opus 5.

Opus 5 is the strongest model in the set. It's fifth. Opus 4.7, two generations back, gets **0.893** where Opus 5 gets 0.535 — and the reason is entirely visible in the unguided column. Opus 4.7 starts at 0.043. Opus 5 starts at 0.465.

Here's Opus 5 intent by intent, ten trials per arm:

| Intent | Unguided | Guided |
| --- | --- | --- |
| Compile public documentation | 1.0 | 1.0 |
| Prefer fakes at boundaries | 1.0 | 1.0 |
| Use purpose-specific test layers | 1.0 | 1.0 |
| Use `Result` for recoverable errors | 0.8 | 1.0 |
| Isolate the functional core from effects | 0.4 | 1.0 |
| Centralize a curated lint policy | 0.0 | 1.0 |
| Put gateway traits at effect boundaries | 0.0 | 1.0 |
| Use structured tracing | 0.0 | 1.0 |

It already does half of this. Nobody told it to document its public API or split unit tests from integration tests; it just does, every time. So the space my guidance can occupy is whatever headroom is left — three intents it never reaches for, one it takes 40% of the time, one it misses about one run in five. It collects every bit of that. Guided Opus 5 is 8/8 in all ten trials.

That's the shape of it. Lift is the gap between what a model does by default and what it can be brought to. Better models close that gap from below, on their own, which shrinks the space guidance can occupy. A record's value isn't a property of the record. It's a property of the record *and* the reader, and the reader keeps changing under me.

Which reframes something I'd been treating as a cleanup task. I'd assumed the low-lift records were the ones to cull. But a record with no lift on Opus 5 had a lift of 1.0 on Opus 4.7 — the sixteen columns disagree with each other, constantly, about which of my eight principles is worth saying out loud.

## Needing It and Being Able to Act on It Are Different Axes

The second thing the sweep separates is one I'd been collapsing.

Opus 4.6 tops out at **0.414** guided. Not because it doesn't need the guidance — it starts at 0.086, so it needs nearly all of it. It gets handed eight principles and follows three, over and over: 3/7, 3/7, 3/7, 3/7, 3/7, 2/7, 3/7, 2/7, 2/7, 5/7. That's remarkably stable. It's not failing at random; it has a ceiling.

Sonnet 4.6 sits at the other pole on the other axis. Unguided adherence of **0.000** — not "low", zero, across all ten trials and every applicable intent. It follows precisely none of these eight principles left to itself, and rises to 0.457 when told. Maximum need, moderate reach.

And Opus 4.8 and Opus 5 both hit **1.000** guided. Perfect adherence, every trial. Whatever else separates them, both can execute an instruction of this kind completely when it arrives.

So there are two questions, and I'd been asking one:

- **Does this model need the guidance?** Read the unguided column.
- **Can this model act on the guidance?** Read the guided column.

They're independent. Opus 4.6 needs it and mostly can't use it. Opus 5 can use all of it and needs half. GPT-5.4 needs it (0.114) and does nothing at all with it (0.114). If I'd only measured lift, those three would have blurred into "guidance helps some models more than others," which is true and useless.

The practical consequence is that a low number means two completely different things, and you can't tell which from the number. Which brings me to the thing that can tell you.

## Time Is the Diagnostic

Guided trials take longer. That's the least surprising sentence in this post and also the most useful signal in the data, because *how much* longer sorts the low scores into their two piles.

| Model | Unguided | Guided | Ratio | Lift |
| --- | --- | --- | --- | --- |
| Opus 4.8 | 85s | 292s | 3.4× | 0.657 |
| Opus 4.7 | 125s | 321s | 2.6× | 0.893 |
| Sonnet 5 | 118s | 291s | 2.5× | 0.718 |
| Sonnet 4.6 | 80s | 195s | 2.4× | 0.457 |
| Opus 5 | 253s | 388s | 1.5× | 0.535 |
| Haiku 4.5 | 104s | 124s | 1.2× | 0.186 |
| GPT-5.6-luna | 123s | 120s | 1.0× | 0.171 |
| GPT-5.4 | 130s | 122s | 0.9× | 0.000 |
| Qwen3.5 122B | 450s | 403s | 0.9× | 0.060 |

The models that follow the guidance best pay the most for it. Opus 4.8 spends three and a half times as long and comes back with 8/8. Opus 5 only stretches 1.5×, which fits — it was already doing half the work in the control arm, so the guidance asks less of it.

Now the bottom of that table. GPT-5.4 and Qwen3.5 122B both got the file and both ran *slightly faster* than without it. Nothing in their behaviour changed. Compare that to Opus 4.6, which stretches 1.7× and still only reaches 0.414 — it read the file, spent real effort on it, and got three of eight.

Same low-ish score. Completely different diagnosis. One model ignored my guidance; the other tried and couldn't finish. Adherence alone can't tell those apart, and the fix for each is opposite: rewrite the guidance so it lands, or accept that this model can't carry it and choose a different one.

Wall clock had been recorded on every trial since the first one and never printed — the aggregator was summing it into a field nothing displayed. Surfacing it cost me an afternoon and turned it into the second axis of every diagnosis I make from this data. It's the cheapest measurement in the harness and I'd been sitting on it.

## Three Variants, One Generation

I sampled three variants of GPT-5.6 — luna, sol, and terra — specifically to hold the generation constant and measure what varies inside it. The answer is: nearly as much as varies between them.

| Variant | Unguided | Guided | Lift | Time, unguided → guided |
| --- | --- | --- | --- | --- |
| sol | 0.186 | 0.667 | 0.481 | 98s → 195s (2.0×) |
| terra | 0.129 | 0.465 | 0.336 | 134s → 162s (1.2×) |
| luna | 0.186 | 0.357 | 0.171 | 123s → 120s (1.0×) |

Luna and sol have *identical* unguided adherence. Not close — 0.186 and 0.186, ten trials each. Same generation, same default behaviour, same task, same eight records. Guidance is worth 0.481 to one of them and 0.171 to the other.

The clock says why. Sol doubles its working time when it's handed the file. Luna doesn't change at all.

One intent makes it concrete. On *centralize a curated lint policy*, sol goes 0.0 to 1.0 — ten for ten. Terra goes 0.0 to 0.6. Luna goes 0.0 to 0.0, and never spends a second longer trying.

That spread, 0.171 to 0.481, is nearly as wide as the gap between Opus 4.6 and Opus 4.8 — two generations apart. Inside a single one. So "which model read it" isn't a question you can answer by naming the generation, which is exactly what I'd been doing every time I said "the model" in the singular.

## Which of the Eight Actually Travelled

Aggregate lift hides the intents inside it. Per intent, across all sixteen models:

| Intent | Unguided range | Models with evidence of lift |
| --- | --- | --- |
| Use structured tracing | 0.00–0.20 | **12 of 16** |
| Centralize a curated lint policy | 0.00–0.00 | **9 of 16** |
| Use `Result` for recoverable errors | 0.00–0.80 | 7 of 16 |
| Isolate the functional core from effects | 0.00–0.40 | 6 of 16 |
| Use purpose-specific test layers | 0.00–1.00 | 4 of 16 |
| Put gateway traits at effect boundaries | 0.00–0.00 | 3 of 16 |
| Compile public documentation | 0.00–1.00 | 3 of 16 |
| Prefer fakes at boundaries | — | 0 of 16 |

Two of those rows are the interesting ones.

**Centralize a curated lint policy** has an unguided rate of exactly zero across all sixteen models. Not one of them, in 139 control trials, wrote a workspace lint table on its own. Ask for it and nine of them deliver. That's a record earning its place with every reader I have.

**Structured tracing** is nearly the same story with wider reach: near-zero by default everywhere, lifted in twelve of sixteen. Instrumenting your code so an operator can see what happened is apparently not a thing models do unprompted, and it's the single most portable thing in my slice.

Then there's **prefer fakes at boundaries**, with a dash in the unguided column, because it's a conditional intent — it binds work that substitutes a collaborator, and most trials never do. When the condition doesn't arise, the intent leaves the denominator rather than scoring as a violation. It has never once had evidence of lift. Whether that means it's a bad record or just the wrong record for this scenario, I can't tell yet, and I'd rather say that than round it off.

## Four Models on My Own Hardware

The local tier is here because I have a keen interest in who gets access to this technology. Everything above runs on somebody else's subscription. If open weights can do this work on a machine you own outright, that changes who gets to do it far more than any hosted leaderboard does — and the only way to know is to measure them the same way as everything else. I bought a 128GB M4 Max specifically to be able to ask.

**These numbers are preliminary — n=3 per arm, top-up in flight.** Read them as a direction, not a result.

**Qwen3.8 27B reaches 0.636 guided.** That puts it above Opus 4.6 and Sonnet 4.6 and just under GPT-5.6-sol, on my own hardware, with a lift of 0.541 [0.258, 0.721]. It also passes the hidden acceptance suite 10 of 10 in every trial — the full Rust contract, four error variants, no help.

It takes **81 minutes per guided trial**. The hosted models finish one in two to six and a half. That's the whole trade, stated plainly: this model does frontier-adjacent work at somewhere between thirteen and forty times the wall clock and none of the API cost, and whether that's a good deal depends entirely on whether anyone is waiting.

Qwen3.6 and Qwen3.8 are in the set as a matched pair — same size, same quantization, one generation apart — chosen to put the question the Opus models raised to an entirely separate training lineage. Their unguided baselines are nearly identical, 0.048 and 0.095, both near the floor. Their guided ceilings are 0.286 and 0.636.

That's the Opus 4.6 → 4.8 story again, in an unrelated vendor's weights. What improves between generations isn't only capability at the task. It's the capacity to take direction and execute it — and that's the half I'd been assuming came along for free. Two data points on an open-weight lineage, and the top-up run is where I get more.

The caveats, because they matter more than the finding: n=3. Only the two Qwen lifts exclude zero, and Qwen3.6's lower bound is 0.006, which is as marginal as marginal gets. Gemma4 31B's interval includes zero. And Qwen3.5 122B is the one model in the whole sweep that couldn't reliably build the crate at all.

## Mostly I Was Fighting My Own Instrument

If there's a part of this worth stealing, it isn't the numbers.

**Seven scoring checks have been wrong**, and every scenario's first real run has corrected at least one. All seven went the same direction: my check was stricter than the intent, and the agent was right. My gateway check tested which *file* a trait was declared in — but a trait beside its implementation is ordinary Rust, and the intent only asks that the core depend on the contract. My documentation check counted `pub(crate)` items as public API, when rustdoc doesn't. Each time, I'd encoded my own habits into the checker and called it the principle.

**A harness bug nearly became the headline.** The hidden acceptance suite set an environment variable inside an `unsafe` block. Models following the lint-policy intent frequently choose `unsafe_code = "forbid"` — and `forbid` is the one lint level that an in-source `allow` cannot override. So the suite failed to compile *only in the arm that followed the guidance*. The aggregate came back reading adherence 1.0, task completion 0.0.

Guidance breaks the software. That's a hell of a finding. It was entirely false, produced wholly by my own test file, and it appeared in the arm least likely to be doubted — the one where my guidance "worked."

I caught it because every guided trial failed identically and completely, which real failures rarely do. Fixing the suite and re-scoring the 39 trials already banked took minutes and cost zero agent invocations. Every guided Opus 5 trial went from 0/10 to 10/10.

That re-score was only possible because I'd committed the trial archive a few hours earlier — metrics plus the workspace source the agent produced — on the reasoning that an agent invocation is expensive and irreproducible while parsing code is neither. This is precisely what I archived it for. Without it, learning the same thing would have cost a day of subscription budget.

**A local model scored 8/8 unguided.** Perfect adherence with no guidance at all — an extraordinary result, and extraordinary in exactly the way that should make you suspicious. Its source was byte-identical to my own reference solution. It hadn't solved the task; it had found the answer key. Workspaces were living under the repository, and opencode resolves its project root by walking up to the enclosing git repo, which put `reference/` within reach. Claude Code and Codex confine tools to the working directory, which is why 240 hosted trials never touched it. I audited all 240 — clean, both arms, every model. All 8 local trials were purged, including the two that happened not to find it, because the opportunity existing is enough to disqualify the condition. Workspaces now live outside any repo, and every trial is fingerprinted against its reference.

That one I could catch, because the answer key was on the filesystem and I could diff against it. The same leak through a model's training data leaves no artifact to fingerprint and no diff to run. It's why I seed from a recent suite, and I'd rather call that a delaying tactic than a control.

**And single trials lie.** Unguided Opus 5, ten runs, identical inputs: 4/7, 2/7, 3/7, 3/7, 3/7, 3/7, 4/8, 4/7, 3/7, 4/7. Double the score from one run to another, same model, same prompt. Every lift I reported before n=10 had an interval that included zero.

The through-line is uncomfortable and I think correct: measuring this is mostly a fight against your own instrument. And what caught each of these was a result that didn't look like real work — 8/8 with no guidance at all, every guided trial failing in precisely the same way, a violation flagged on code I'd have signed off in review. Not a number that looked wrong. A number that looked *too clean*.

## What This Doesn't Say

One scenario, and eight records out of 989.

The harness has three scenarios across two languages — `fx-settlement` and `probe-fanout` in Python, `rate-card` in Rust — but only one of them has been swept with both arms at depth. `fx-settlement` has a handful of guided trials and no control arm; `probe-fanout` has none yet. Which means that despite the harness being cross-language by design, every number in this post is Rust.

I also picked the most flattering of the three. `rate-card` was chosen because it had the most headroom — the most scored decisions that no model makes by default. The single Python trial I reported last week sits at the opposite end of that range, with a model already following 6 of 8 unguided. A scenario selected for headroom will show more lift than one that isn't, and I selected this one on purpose.

So: nothing here says my guidance is worth 0.89 in general. It says these eight records were worth 0.89 to Opus 4.7 on this task, and 0.00 to GPT-5.4 on the same one.

## What I'm Doing Next

The local top-up to n=10 is running. After that, the other two scenarios at the same depth, and then the records I haven't touched — because eight of 989 is a rounding error, and the remaining 981 are the entire point.

But the thing that changed this week is smaller than any of that, and it's about how I'll read the results.

I'd been carrying an implicit model where my guidance had a value, and measurement would eventually tell me what that value was. There is no such number. There's a matrix, it has a column per model, and the columns disagree — including two columns of the same generation that start from the identical baseline.

*Use purpose-specific test layers* scores 1.0 in both of Opus 5's arms. Zero lift, ten trials each way — exactly the line I'd have marked as dead weight and cut. On Opus 4.7 the same line goes from 0.0 to 1.0. Cull on one model's numbers and you've fitted your guidance to a model that ships a replacement every few months.

Last week I wrote that when the next model lands, I'd run the file and find out which lines stopped mattering. I'm still doing that. What changes is that I'll stop reading "stopped mattering" as a verdict on the line, when it's a fact about the pair.

---

*Every trial in this post is archived under [`benchmark/exercises/archive/rate-card/`](https://github.com/svetzal/context-mixer2/tree/main/benchmark/exercises/archive) as a `metrics.json` plus the workspace source the agent produced. The full numbers and intervals are in `comparison.json`, regenerated by `aggregate.py`. If you want to see what a model actually wrote, it's there.*
