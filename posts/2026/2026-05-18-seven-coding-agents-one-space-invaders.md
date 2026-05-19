---
title: "Seven Coding Agents, One Space Invaders Clone"
date: "2026-05-18"
published: true
description: "Anthropic is splitting their subscription on June 15, and unattended Claude Code is off my menu. I ran the same Bevy build through seven coding-agent profiles to see what could replace it. Three of them produced playable games. Four shipped binaries that crash on launch. The cost spread between the working ones is six-to-one, and the gameplay is indistinguishable."
tags:
  - GenAI
  - ai
  - Software Engineering
  - Tools
image: images/seven-agents-banner.png
imageAlt: "Silver-haired woman at a 1978-era Space Invaders arcade cabinet, hands on the joystick and fire button, CRT phosphor glow lighting her focused half-smile while the alien formation marches mid-game on screen and a hazy retro arcade hall recedes behind her"
---

On June 15, the Claude subscription I've been using for unattended coding work splits into three. I can keep the chat. I can keep Claude Code at the keyboard. I can't keep using Claude Code as a background worker — the agentic-loop billing moves to its own tier, and the math on running it the way I've been running it stops working for me.

That deadline is under four weeks out, and it's forcing me to examine practices I've been letting run on autopilot. I have a small fleet of long-running engineering tasks that have been quietly handled by Claude Code via [hopper](https://github.com/svetzal/hopper) and [foundry](https://github.com/svetzal/foundry) — plan, execute, validate, commit, move on. I need to know which other coding agents and which other model families can hold up the same kind of work. Not in principle. In practice. On real Rust against a real framework I picked because I knew the API had drifted recently and wouldn't be sitting comfortably in anyone's training data.

There's a second motivation tangled up with the first. I've been wanting to figure out where local models can usefully sit in real engineering workflows — not as a hobbyist exercise, but as a serious component of how I get work done. Local means zero marginal cost, full privacy, and no exposure to someone else's billing change. It also means I'm responsible for every layer the cloud providers were quietly absorbing for me. The bake-off was a chance to test both questions on the same task.

So I ran one. Same prompt — build an authentic Space Invaders clone in Rust + Bevy, from an empty repo, autonomously, through hopper's standard phases. Seven profiles. Six model families across two runners (claude and opencode). One worker, one item at a time, so each profile ran in isolation. I committed to playing every binary that compiled. This is the first writeup in what's going to be a series.

Here's the cohort and the result, as a single picture before I dig in:

| Profile | Runner | Models | Cost | Playable game? |
|---|---|---|---:|---|
| anthropic | claude | Opus 4.7 (plan/validate), Sonnet 4.6 (execute) | $5.91 | ✓ |
| glm | opencode | Z.AI GLM-5.1 (all phases, via OpenRouter) | $2.36 | ✓ |
| openai | opencode | GPT-5.5 (plan/validate), GPT-5.4 (execute) | $0¹ | ✓ |
| qwen | opencode | Qwen3.6 Max Preview / Plus / Flash (OpenRouter) | $1.81 | ✗ crashes at launch |
| qwen-coding | opencode | Qwen3.6 27B / 35B-A3B (OpenRouter) | $1.24 | ✗ crashes at launch |
| ollama (run 1) | opencode | Qwen3.6 27b-coding / 35b-a3b (local) | $0² | ✗ no code shipped |
| ollama (run 2) | opencode | Qwen3.6 27b-coding / 35b-a3b (local) | $0² | ✗ crashes at launch |

¹ Routed via OAuth subscription, which reports zero in the audit stream — real token consumption was substantial.
² Local hosting on an M4 Max, no marginal API cost; roughly 2.5–3 hours of GPU time per run.

## What I Was Actually Measuring

The headline number everyone wants is cost. I'll get there. But cost was never the only question, and it turned out not to be the most interesting one.

What I really wanted to know:

- Can the agent loop *finish* unattended? No babysitting, no human nudge.
- Does "validate passed" actually mean the artefact works, or does it mean "the gates the agent chose to run said yes"?
- Where does the model fall down — at the planning layer, the execution layer, or the protocol layer between the model and the harness?

Those are different questions, and the bake-off pulled them apart in ways I wasn't expecting.

## Compile-Green Is Not Done

Three of the seven profiles produced authentic, playable Space Invaders: anthropic (Claude Opus 4.7 / Sonnet 4.6), glm (Z.AI GLM-5.1 via opencode), and openai (GPT-5.4/5.5 via opencode). I hand-played each one. Marching aliens, speed-up, bunkers eroding cell by cell, the UFO mystery ship, lives and high score, R to restart. Gameplay-indistinguishable across the three.

Four profiles produced binaries that crash on launch. Both qwen runs through OpenRouter, both ollama runs locally — every member of the Qwen3.6 family, across the full size range from the 27B coding tune to the ~1T frontier Max Preview, across two completely different hosting setups. All of them passed `cargo build --release`. None of them ran.

The crashes group into two well-known Bevy gotchas, both runtime-only. B0001, where two ECS systems want overlapping mutable access to the same component and Bevy panics at schedule start. And the missing-`StatesPlugin` trap, where you call `init_state` before `DefaultPlugins` and the state-transition schedule isn't registered yet. Both are catchable in under five seconds with a smoke launch — start the binary, sleep three, kill it, check the exit. The only profile that did this as part of validate was anthropic. Everyone else trusted compile-success as a proxy for "it works."

Which is the actual finding hiding in this experiment. The model matters, but so does the validate contract you wrap around it. A willing model with a weak contract ships broken work that *passes its own gates*. A more careful contract — even paired with a cheaper model — catches it.

## The Cost Spread, and What It Doesn't Buy

Among the three working profiles, the cost spread is roughly six-to-one. Anthropic ran $5.91 for the full plan-execute-validate cycle. GLM ran $2.36 (after fixing a hopper bug that was silently dropping the execute-phase cost — turned out to be an unrelated win the bake-off shook loose). OpenAI ran on flat-rate subscription so my marginal cost was zero, though the real token consumption was substantial.

Here's what "the full plan-execute-validate cycle" actually looks like for the anthropic profile — which model gets invoked at which phase, and which step is the harness doing on its own:

![Vertical diagram of hopper's four-phase pipeline — Plan, Execute, Validate, Commit — stacked top to bottom with the anthropic profile's model assignments labeled in amber: Claude Opus 4.7 on Plan and Validate, Claude Sonnet 4.6 on Execute, and Commit as a harness-only step with no model invocation. A dashed loop on the right edge returns to Plan for the next queued item.](images/seven-agents-hopper-phases.png)

The cost premium on anthropic doesn't buy a better game. It buys defence-in-depth at the validate layer — the fmt-plus-clippy-plus-smoke-launch suite that would have caught the four qwen-family runtime crashes if they'd been wired up the same way. It also buys more, smaller modules — twelve files versus nine versus one — which matters for legibility but doesn't change what the player sees.

So when I look at this purely as a "replace my unattended worker" decision, GLM at $2.36 a run becomes interesting in a way I wasn't expecting. The deliverable is just as good. The validate suite is thinner, but that's something I can fix in the harness, not something I have to pay the model premium to get.

## The Layer Where Things Actually Broke

The qwen failures weren't model-stupidity in the obvious sense. Plans were detailed. Risk registers named the right things. Code compiled. What broke was the model's ability to reason end-to-end about Bevy's ECS scheduler and plugin-ordering rules — the runtime invariants that live in the *spaces between* the code you've written. Every system looks fine in isolation. The conflict only shows up when they're wired together and the schedule starts running.

The ollama local-hosting story is its own lesson. First run hung for three hours and produced nothing — the model went into a 33,000-token monologue with no tool calls, then the agent loop deadlocked. I dug into it. Root cause: ollama defaults flash attention to off. At 256K context, regular attention drifts numerically enough to corrupt the special tokens the qwen3 chat template uses to delimit tool calls from prose. The model loses its protocol mid-execute and starts generating free-form text it thinks is a tool call. After flipping `OLLAMA_FLASH_ATTENTION=1` and re-running, the agent loop ran clean — though the model still shipped a binary that crashes at launch, same as its OpenRouter-hosted siblings.

Two findings stacked there. The qwen3.6 family appears to have a real ceiling on shipping runnable Rust+Bevy, independent of hosting. And local LLMs aren't actually free — you trade dollar cost for an obligation to harden every layer the cloud providers were quietly absorbing for you.

## What I'm Doing About It

This is the first post in what'll be a series, so I'm not making a final call yet. But the direction is clearer than I expected going in.

For my unattended workload after June 15, GLM via opencode is the candidate I'm taking seriously next. The cost-and-capability fit was the bake-off's most pleasant surprise, and I want to push it harder — find where it actually struggles, not just where it happened to succeed on a fresh-repo Bevy build. The first move there is wiring a smoke-launch gate into hopper's default validate scaffold, because the bake-off told me the validate contract matters at least as much as the model.

The local-model thread is the other one I'm not letting drop. The qwen3.6 ceiling on greenfield framework code is real, but greenfield framework code isn't the only shape of work I do. A local model that runs cleanly through plan-execute-validate is itself useful infrastructure — the question is which workflows actually fit inside the ceiling I observed. Code review against an existing codebase. Doc generation. Refactor proposals a human verifies. Anywhere the model isn't being asked to hold an entire architecture in its head at once. That's a separate experiment I want to run, and I'd rather find out where local can carry real load than write it off because it stumbled on the hardest possible task I could hand it.

What I'm not going to do is treat one bake-off as the answer. Seven profiles, one task, one afternoon of hand-playing the deliverables — that's a beginning. The interesting numbers come from running this shape of experiment enough times that the patterns start to repeat or break. I'll keep writing them up as I go.

Compile-green is not done. The four qwen-family runs all cleared the bar that most teams would call "ready to ship." None of them actually were. The next time I size up an agent — or a model, or a runner — the first question I'm going to ask isn't *can it pass the gates*. It's *what's missing from the gates themselves*.
