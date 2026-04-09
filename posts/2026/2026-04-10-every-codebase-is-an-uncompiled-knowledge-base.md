---
title: "Every Codebase Is an Uncompiled Knowledge Base"
date: "2026-04-10"
published: true
description: "Karpathy's LLM Knowledge Base architecture is a powerful contribution, but it draws a false boundary between code and knowledge. Your codebase is the largest uncompiled knowledge base in your organization — and agents can now extract what's inside it."
tags:
  - GenAI
  - Software Engineering
  - Knowledge Work
  - ai
image: images/uncompiled-knowledge-base-banner.png
imageAlt: "Silver-haired woman resting one hand on a weathered legacy server rack as translucent holographic knowledge structures rise from it into warm amber light, golden motes drifting upward like embers"
---

Andrej Karpathy's [recent tweet](https://x.com/karpathy/status/2039805659525644595) about LLM knowledge bases hit over 16 million views, and I think the reason is that he named something a lot of us have been circling around without quite landing on: the tedious part of maintaining a knowledge base isn't the reading or the thinking. It's the bookkeeping. And LLMs are exceptionally good at bookkeeping.

His [architecture](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) is elegant in its simplicity. A `raw/` directory of immutable source documents. A `wiki/` of LLM-generated markdown — summaries, entity pages, concept pages, interlinked and continuously updated. A schema that tells the agent how to structure everything. Three operations: ingest new sources and update the wiki, query with synthesized answers and citations, and lint for contradictions, stale claims, and gaps. His argument against RAG is pointed: RAG produces answers but doesn't build lasting knowledge. Each query starts from scratch. The wiki is a persistent, compounding artifact.

The community response confirms that this idea is resonating. Lex Fridman extends the pattern with dynamic visualizations and focused mini-knowledge-bases he loads into voice mode for interactive discussions. Others have converged on the `.brain` folder — a directory at the root of a project that acts as persistent agent memory across sessions. Vamshi Reddy nailed the business angle: "Every business has a `raw/` directory. Nobody's ever compiled it. That's the product." Karpathy agreed, calling it an incredible new product category.

All of this energy is real, and it deserves credit. But there's a gap in the framing that I think matters.

## The False Boundary

Karpathy describes his shift as moving from manipulating code to manipulating knowledge. It's an interesting framing — and it creates a boundary that doesn't hold up.

Code *is* knowledge. It's knowledge expressed in a formal language rather than a natural one, but the distance between those forms of expression is shorter than we tend to assume. I wrote about this in [my previous post](/2026/2026-04-09-code-is-knowledge) — a codebase encodes how an organization thinks about its customers, its domain, its risks, and its trade-offs. The naming reveals domain models. The architecture reveals organizational assumptions. The error handling reveals risk judgments. The test suite reveals what the business considers important enough to verify.

So when Karpathy talks about every business having a `raw/` directory that nobody's compiled — he's right, but the scope is larger than he's framing it. Every legacy system sitting in your organization right now is an uncompiled knowledge base. Nobody has ever pointed an agent at it and asked what it knows.

## A Third Category

The community's `.brain` folder and Karpathy's wiki are both valuable patterns, but they sit at two points on a spectrum and miss a third.

The `.brain` folder is ephemeral project memory. It helps an agent be effective within a codebase, but it doesn't generate new understanding. It's a cache — forward-looking: *what do I need to know to work here?*

Karpathy's wiki is a synthesis engine. It takes raw material and compiles it into a persistent, interconnected knowledge structure, finding connections between sources that no single source contains on its own. It's synthesizing: *what do all these sources tell us?*

What I'm describing is different from both. Extracted knowledge is archaeology — reading a system that already exists and making explicit what is embedded in it but was never written down. It's retrospective: *what has this system already learned?*

These three aren't competing patterns. They're stages in a knowledge lifecycle.

## The Compounding Cycle

An agent extracts knowledge from a codebase — archaeology. That extracted knowledge becomes source material in a Karpathy-style wiki alongside research papers and industry articles — synthesis. The synthesized wiki informs a `.brain` folder in a new project that builds on those insights — application.

Extraction feeds synthesis feeds application. The cycle compounds.

We're already doing a version of this with the Screenplay Pattern. When we point an agent at a running legacy application and have it infer actors, goals, and interactions, we're performing extraction — making product intent explicit from an existing system. The agent examines what each user type can see and do, traces workflows, and builds a structured model of who the system serves and how. But product intent is just one lens. The same approach generalizes to architecture, data modelling, operational patterns, code design — each lens revealing a different dimension of organizational knowledge that was always embedded in the code but never surfaced.

The important thing isn't any one extraction. It's that the extractions feed forward. What you learn from archaeology becomes source material for synthesis, and what you synthesize informs the next round of building. Each pass through the cycle makes the next one richer.

## Point an Agent at Your Codebase

If you're building LLM knowledge bases in Karpathy's style — and the core architecture is sound enough that you probably should be — your codebase is source material. Don't skip it. Point an agent at it. Ask it what the code says about your domain model, your organizational assumptions, your risk appetite.

What it extracts will tell you things about your organization that no amount of documentation review will surface. The naming will reveal domain models that have drifted from what your support team actually talks about. The architecture will reveal organizational boundaries that no longer match business reality. The error handling will reveal risk judgments that nobody remembers making.

And where the extraction is uncertain — where the agent can read the code but can't confidently infer the intent — that uncertainty is itself a signal. It's pointing at the places where knowledge has been lost, where the domain has shifted underneath the code, or where organizational distance has introduced drift between what developers built and what customers need.

The largest uncompiled knowledge base in most organizations is already sitting in version control. Karpathy gave us the architecture for what to do with knowledge once we have it. The missing step is recognizing that the richest `raw/` directory most companies will ever have is the one they've been committing to every day for years.

## Try It Yourself

If you want to see what this looks like in practice, I've published a [Screenplay Pattern Extraction prompt](https://gist.github.com/svetzal/716b963c631a3af1c0ebbe60b14cb32a) as a GitHub gist. It's a Claude Code agent prompt that reads one or more codebases and produces a navigable wiki of interlinked markdown documents — actors, goals, interactions, and journeys — using the Screenplay Pattern.

To try it against one of your own codebases:

1. Create a working directory and drop the prompt into a `CLAUDE.md` file:

```bash
mkdir -p my-extraction/sources
mkdir -p my-extraction/extraction/{actors,goals,interactions,journeys}
```

2. Copy the prompt from the gist into `my-extraction/CLAUDE.md`.

3. Open the directory in your preferred coding agent — Claude Code, OpenCode, GitHub Copilot, or any agent that can read files and follow a prompt — and tell it where your codebase lives:

```
Extract the screenplay pattern from /path/to/my/codebase
```

The agent will read your code — routes, models, permissions, test descriptions, error messages, naming conventions — and produce entity documents with confidence ratings and cross-links. It won't modify your codebase or copy code into the extraction project.

If you have supplementary sources — support ticket exports, persona documents, analytics reports, customer research — drop them into the `sources/` subdirectories. The agent will cross-reference them against what it finds in the code, and the places where they disagree will show up in a drift report. Those disagreements are often the most interesting findings.

Start with a codebase you know well. You'll be surprised by what the extraction surfaces — not because the agent knows something you don't, but because it reads everything at once and holds the connections that no single person walks manually. The places where it's uncertain are usually the places where knowledge has been lost. And the drift between what the code says and what the support tickets say? That's the map you didn't know you needed.
