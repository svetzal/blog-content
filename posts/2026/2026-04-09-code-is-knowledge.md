---
title: "Code Is Knowledge"
date: "2026-04-09"
published: true
description: "Code isn't just instructions for machines. It's a record of how an organization thinks — about customers, domains, risks, and trade-offs. We've always known this. Now we have tools that can make it explicit."
tags:
  - GenAI
  - Software Engineering
  - Knowledge Work
  - Craft
image: images/code-is-knowledge-banner.png
imageAlt: "Silver-haired woman in dark blazer studying a massive holographic graph wall of interconnected nodes and edges, one hand raised to trace a connection, a leather journal open on the desk beside her"
---

I've walked into a lot of codebases cold. Consultancy work will do that to you — manufacturing, telecom, waste management, hospitality, dental training software. Every engagement starts the same way: someone walks you through the architecture, explains what the system does, tells you what's working and what isn't.

And then you read the code. And the code tells you something different.

Not wrong, exactly. But different. The code tells you things the people either can't articulate or won't say out loud. It shows you what the organization considers dangerous — look at the error handling. It shows you what they consider important — look at where the tests are, and where they aren't. The naming conventions reveal a domain model that may or may not match the one on the whiteboard. The architecture reveals organizational boundaries that may or may not match the org chart.

I've been doing this for over thirty years, and I'm only now finding language for what I've always been doing. When I sit down with a new codebase, I'm not just reading instructions for a machine. I'm reading a record of how an organization thinks — about its customers, its domain, its risks, and its trade-offs.

Code is knowledge. We've always known this implicitly. Now we have tools that can make it explicit.

## An Old Thread

This isn't a new insight. It's a thread that runs through decades of thinking about what programming actually is, and we keep rediscovering it.

Michael Polanyi argued in 1966 that "we know more than we can tell." His concept of tacit knowledge — the understanding we carry but can't easily articulate — describes exactly what lives inside a codebase. Developers make thousands of decisions based on understanding they never write down. When they leave, that understanding goes with them. Only what they encoded in the code survives.

Peter Naur sharpened this in 1985 when he argued that programming is fundamentally theory building. The program expresses a theory about the problem domain — not just a set of instructions. When the original team disperses, the theory is partially lost. The code is what remains of it. (If you've ever inherited a system from a team that no longer exists, you know exactly what Naur was talking about. You can read every line and still feel like you're missing something. You are. You're missing the theory.)

Donald Knuth established that code communicates to humans, not just machines. Jack Reeves argued that source code is the actual design artifact — not the UML diagrams or architecture documents that preceded it. If code is the design, I'd take that one step further: it encodes the *thinking* behind the design. That thinking is knowledge.

Eric Evans showed us that naming in code reveals a domain model. Conway showed that system structure mirrors organizational structure. Nonaka and Takeuchi described how knowledge converts between tacit and explicit forms — and what I'm describing here, pointing an agent at code and getting prose back, is what they'd call "externalization." Tacit knowledge rendered into a form that humans can reason about and challenge.

All of this has been sitting there for decades. What's changed is that we now have tools capable of performing the extraction at scale — reading code in a formal language and producing prose in a natural one. The gap between those two forms of expression turns out to be smaller than we assumed.

## What Code Tells You

When I say code is knowledge, I mean something specific. A codebase doesn't just record what a system does. It records what a business *believes*.

- **Naming conventions** reveal a domain model. When your code calls someone a `PrimaryAccountHolder` and your support team calls them a "subscriber," that gap is a finding.
- **Architecture** reveals organizational assumptions. Service boundaries tend to mirror team boundaries — Conway's Law in action. When those boundaries don't match business reality, the mismatch is information.
- **Error handling** reveals risk judgments. Heavy validation around financial calculations, minimal checking on user preferences — someone made those calls, and they're encoded in the code whether anyone remembers making them or not.
- **The test suite** reveals what the business considers important enough to verify. The gaps reveal what they've decided to take on faith.

Why stop at product intent? The same extraction approach works from many angles. Visual design reveals brand assumptions, audience expectations, and the inconsistencies that accumulate when different teams make different decisions over time. Code design reveals what the team considered stable versus volatile, and where their generalization bets turned out wrong. Data modelling shows which entity relationships got first-class treatment and which were afterthoughts — and what schema evolution reveals about how the business learned. Operational patterns — monitoring, alerting, deployment config — reveal what the organization fears and, more tellingly, what it doesn't.

Each of these is a knowledge extraction operation. Taking what's implicit and making it explicit.

## Reading the Socio-Technical System

It's not just source code that encodes knowledge. While coaching at a large financial services company, I built a graph analysis practice using RDF techniques to connect disparate data points — work items, pull requests, repositories, team assignments, code structure, git history — and construct evolving meaning from the relationships between them. The idea was to take information scattered across tools that nobody was cross-referencing and render it as something the organization could actually see and reason about.

The work item graphs were one lens. I'd pull the full dependency graph for a feature — every user story, bug, PR, and repository it touched — and read the shape. The patterns were immediate and diagnostic. I catalogued eleven of them.

One I called the "omnibus maintenance feature." A single feature labeled something like "2018 Maintenance" with forty unrelated items stuffed inside — batch job failures, UI bugs, release retrofits, production monitoring, document generation fixes, on-call support. Six teams. Ten repositories. The graph looked like a hairball. What it told you was that the organization had no meaningful way to categorize maintenance work. Everything went into a junk drawer, which meant nobody could reason about maintenance load, prioritize it, or tell when it was done. The feature wasn't a plan. It was a filing cabinet.

Another pattern: the "bug swarm." A single feature with one user story — replace a trigger mechanism for generating compliance documents — that spawned thirteen bugs during integration testing. Documents generating backwards (increase letters when they should have been decrease). Cosigner flows breaking. Document holds being ignored. Each bug was a surprise, because the old mechanism had accumulated tacit knowledge about timing and sequencing that only became visible when someone tried to change it. The swarm told you exactly how much understanding was embedded in the system that nobody had written down.

Then there was "two birds one scone" — items that had been tracked separately as unrelated work, but the graph revealed they converged on the same code, the same root cause. What looked like two problems was actually one. The graph made visible a connection that the planning process had missed, because the relationship only existed in the code, not in anyone's mental model of the backlog.

Other patterns told other stories. "Whack-a-mole" showed a PR trail of fix, revert, fix, revert — someone debugging against production data without fully understanding the root cause, each attempt creating new side effects. "User stories to defer maintenance" revealed a feature containing seven identically named "Tech Debt and Refactor work" items — the organization acknowledging problems it had no intention of addressing. "Lack of cohesion" showed a dozen sibling features under one initiative, each decomposed by page area rather than by capability, all touching the same repository in ways that would inevitably collide.

But the work item graphs were only one layer. The source code told its own stories — structural analyses revealed coupling patterns, dependency tangles, and architectural assumptions that had drifted from the business reality they were meant to serve. And git history added a third layer: human-code interactions. Who touched what. How changes flowed through the system. Where knowledge concentrated in single individuals. Where teams were stepping on each other.

When you layered these together — work items, code structure, git history — you weren't just looking at a codebase or an org chart. You were looking at the socio-technical system: people on teams working on code, and the ways those three things shaped each other. The code structure revealed which teams were coupled whether they knew it or not. The git history revealed which developers carried knowledge that existed nowhere else. The work item patterns revealed how the organization's planning assumptions diverged from the reality of how work actually flowed.

Those revelations led to meaningful rewrites — not just of code, but of how teams related to the code they owned. Architecture changes that would have seemed arbitrary in isolation made obvious sense once the socio-technical picture was visible. The extraction didn't just surface knowledge. It created the conditions for the organization to act on it.

## The Drift Problem

Here's where it gets complicated. The accuracy of any knowledge you extract from code depends on something that has nothing to do with the extraction tool. It depends on organizational distance — how far removed the developers were from the people the code was meant to serve.

When developers work closely with customers — hearing their language, sitting in on support calls, understanding what frustrates them — the code tends to reflect customer reality faithfully. Naming stays close to the domain. Workflows map to what people actually do. Knowledge extracted from that codebase is reasonably trustworthy.

When developers are held at a distance — buffered by product management layers, requirements translated through multiple handoffs, process assumptions that serve the org chart more than the user — the code reflects the organization's *understanding* of the customer. Which may have diverged considerably. Naming drifts toward internal jargon. Workflows encode organizational process, not user behavior.

I saw this pattern over and over in consulting engagements. The teams closest to their customers wrote code I could read and immediately understand who it was for. The teams furthest away wrote code that made perfect sense internally but mapped to a customer that didn't quite exist — an idealized composite that had drifted from anyone real.

The greater this distance, the more cross-referencing against other sources is required — product docs, support tickets, customer research, analytics, marketing materials. Each additional source constrains the inference space. And this is exactly the kind of cross-referencing that no human will do manually. Who's going to walk the correlations between a codebase's entity model, the support team's ticket taxonomy, the product team's roadmap language, and the marketing site's persona descriptions? That volume of bookkeeping is what these tools are actually good at.

Organizational distance makes accurate extraction harder. But it makes the case for *doing* it stronger, not weaker.

## Drift as Diagnostic

Here's the part I find most useful: the drift itself is a finding.

When extracted knowledge diverges significantly from what other sources say, that divergence is diagnostic. A codebase that models three user types when the support team talks about seven is telling you something important — not about the code, but about the organization. It's revealing where the internal model has separated from customer reality.

We tend to treat these divergences as bugs to fix. They're more useful as maps. The gap between what the code believes and what the customers experience is a map of organizational blind spots — and making that gap visible is the precondition for doing anything about it.

Where the extraction itself is uncertain — where the agent can read the code but can't confidently infer what it means — the uncertainty is a signal too. It usually points at the places where knowledge has been lost: the original developers are gone, the domain has shifted, or the code was written to satisfy an organizational requirement rather than a customer need.

Code encodes the decisions that were made, not necessarily the decisions that should have been made. Making those decisions visible — and seeing clearly where they've diverged from the world they were meant to serve — is where the real work begins.
