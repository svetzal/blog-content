---
title: "What are you hiring code reviews to do?"
date: "2026-10-20"
published: true
image: images/cognitive-surrender-intent-review-banner.png
imageAlt: "A silver-haired woman and two colleagues examine a cyan path branching into amber on a shared table. A colleague holds an evidence card beside the branch while a green approval check remains lit behind them."
description: "Humans cannot review code as fast as agents produce it. Intent review and guardrails can keep the organization's purposes coherent without automating the rubber stamp."
tags:
  - Software Engineering
  - Intent
  - Agentic Development
  - Collaboration
  - Testing
---

"Cognitive surrender" is a phrase that just tears at me. I wrote that on LinkedIn after reading [Mike Bowler](#mike-bowler)'s post about how we accept answers from AI. We can delegate work while continuing to reason about the result, or we can accept the result and let the reasoning go.

A few days earlier, Anthropic published [how the Claude Code team does code review](https://claude.dev/blog/solving-code-review-at-anthropic/). Their starting point is one I firmly agree with: humans can't keep up with the volume of code agents produce. Requiring someone to read every line doesn't solve that capacity problem. It creates a queue, or an incentive to approve work they haven't meaningfully examined.

I made a related point in ["Know Your Principles"](/2026/2026-02-20-know-your-principles/). Agents can generate code faster than teams can build understanding of it. The principles we use to reason about our code need to become explicit enough to teach and evaluate against. More human code review won't close that gap on its own.

I appreciate Anthropic writing about their explorations, including how they match scrutiny to risk and recover from mistakes. I hardly hold up Claude Code as a bastion of correctness. But their capacity problem is ours too, and it makes a question I use a lot more urgent.

**What are you hiring code reviews to do for you?**

## The approval isn't the work

We hire code review to find defects, mentor developers, challenge design decisions, and keep a codebase coherent. We use it to share knowledge and build trust in each other's work. Sometimes we hire it to record that somebody other than the author approved a change.

That last one can swallow the others. An organization invokes regulatory control as the reason another human must review the code. The workflow demands an approval, people are under pressure to move the work along, and an approval is what they provide. The audit trail records an approval even if nobody challenged the change.

A rubber stamp doesn't become useful because a policy requires it.

Thoughtworks explored this earlier in the year in ["Where does the rigor go?"](https://www.thoughtworks.com/en-sg/insights/blog/agile-engineering-practices/where-does-the-rigor-go), following its February retreat. The article distinguishes at least four functions: mentorship, consistency, correctness, and trust. It asks where those functions go as our development practices change.

Anthropic's post says review does two jobs: finding issues and building shared understanding. Two jobs? That leaves too much bundled together. Mentorship and architectural judgment have different needs, even if we can tuck both under shared understanding. Counting approvals won't tell us whether a junior developer is learning or a design decision received useful scrutiny.

[Cat Hicks](#cat-hicks) writes about comprehension as active work: locating useful entry points, tracing logic, and constructing understanding. Generating an explanation of the code gives us material to learn from. We still have to do the learning.

If review is where a team develops that ability, where will they practise it when agents do the reviewing? We can examine why a constraint exists, what it protects, and what evidence would justify changing it. I model those judgments in [Alloy](/2026/2026-08-14-modelling-engineering-intent-made-my-guidance-measurable/), including the assumptions and tradeoffs behind them. Working through them together gives us something to teach and build checks around.

## How would we recognize an automated rubber stamp?

The research Mike discusses exposes a risk in how we judge that learning: we can accept a fluent, confident explanation as correct even when it's wrong. The explanation can persuade me that I understand the system while giving me a false account of how it works.

A reviewer's explanation can do the same thing. An agent writes the code, another reviews it, the tests pass, and the review sounds thorough. What would let us tell whether the checks challenged the work or agreed around the same mistaken assumption?

An adversarial reviewer looks for reasons to disagree, but it may share the implementer's misunderstanding. If the code, tests, and review all follow that interpretation, another round of review can reinforce it. A group of adversarial agents examining a codebase in isolation can still spend its entire time navel-gazing.

Anthropic tests its reviewer against changes associated with known failures and checks for false positives. That's evidence about defect detection. It gives us something to examine beyond a reviewer's reassuring prose.

We can test whether our reviewer catches a plausible implementation that violates a known business constraint. But what gives us confidence in the constraint itself?

In [my post on the four rules of simple design](/2026/2026-10-09-the-four-rules-were-always-about-intent/), I reorganized the rules around intent. The first was to validate intent continuously. That includes checking our understanding of the problem, as well as checking whether the code fulfils it.

We can surrender judgment before the first line of code, when we accept a formulation of the problem without challenging it. Every check downstream may then reinforce it.

## Review the system of intents

Intent is held across an organization. Product has intentions about who we're serving and what we're offering. Design has intentions about the experience and the promises it communicates. Security, operations, and engineering bring constraints about access, recovery, and how the system can change. These intentions affect each other. A change that satisfies one role can violate another's expectations.

**Intent review** examines whether those intentions fit together, and whether their assumptions hold up against evidence from outside the codebase. **Intent guardrails** carry the agreed constraints into the work, so we can check that the system continues to honour them as agents change it.

In [today's earlier post](/2026/2026-10-20-thinking-through-the-software-we-might-build/), I worked through a trial signup journey for a service I'm exploring. A promise of a trial without payment details affects the signup screen, the subscription transition, and what happens to someone's work when the trial ends. Those parts need to agree while I'm exploring them. The original product decision remains open to revision too. Product intent can't be settled in isolation and then handed down for everyone else to accommodate.

Guardrails let us carry that agreement into implementation. If we've agreed that trial expiry must preserve someone's work, we can check that the expiry process doesn't delete it. Access rules can enforce which actions remain available. A change to the trial journey needs to be checked against those constraints, even when the agent's immediate task is only to change a screen.

We also need to challenge the product assumption externally. I can make a trial journey internally coherent and still be wrong about whether asking for payment details discourages the people I want to reach. Production traffic can show where people leave the journey or repeat a step. Support conversations and customer research can help us understand why. Those findings need to be able to change the offer as well as its implementation.

Some guardrails can be deterministic checks. Others need an agent to compare the affected intents and flag conflicts for discussion. A prompt asking an agent to remember every constraint is a weaker control than a check the workflow actually requires. We also need evidence that those checks detect the violations we care about.

This gives us work we can do without chasing every generated line: examine the constraints together, test the checks that enforce them, and investigate where use contradicts our expectations. Cognitive surrender would be treating a green result as a reason to stop examining those expectations.

## A Drift Report is an assignment

In ["Every Codebase Is an Uncompiled Knowledge Base"](/2026/2026-04-10-every-codebase-is-an-uncompiled-knowledge-base/), I published a prompt that extracts product intent from existing systems. It builds a model of the people the software serves, their goals, and their interactions.

The [sample prompt](https://gist.github.com/svetzal/716b963c631a3af1c0ebbe60b14cb32a) also takes supplementary sources: support tickets, analytics, customer research, documentation. It compares those perspectives with what it extracts from the code. Disagreements go into a **Drift Report**, with uncertainty and open questions preserved.

That report sends product folks on a mission to reconcile perspectives.

Suppose the code models an account as belonging to one person, while support tickets describe households sharing responsibility for it. It could point to an outdated domain model, a workaround, a misunderstanding in the extraction, or an audience the product team hasn't considered.

Who uses the account? What are they trying to accomplish together? Which responsibilities should remain separate? What would changing the model enable or put at risk?

Support may understand the household's needs. Engineering may know why the account was restricted. Product and design can work through what sharing responsibility should allow, and what it should prevent. We need that conversation before we ask an agent to reconcile the documents or change the code.

If we tell the agent to make those sources agree, it can erase the discrepancy before anyone investigates it. I want the Drift Report to keep that disagreement visible until the people with the relevant knowledge have worked through it.

What are we hiring code reviews to do? Whatever our answer, we need to establish where each job now happens and what evidence tells us it's being done. Intent review and guardrails let us carry our judgment into work we can't read line by line. When a check passes but support reports a conflicting experience, that conflict needs investigation. We surrender when we let the convincing answer close the question.

---

## Voices in this post

<a id="mike-bowler"></a>**Mike Bowler** writes and coaches on team dynamics, learning, and the psychology and neuroscience of software work. His [October 17 post, "How we think, expanded: System 3"](https://blog.mikebowler.ca/2026/10/17/how-we-think-expanded-system-3/), introduced me to *cognitive surrender*. He draws the term from Steven D. Shaw and Gideon Nave's research, distinguishing it from deliberate cognitive offloading.

<a id="cat-hicks"></a>**Cat Hicks** is a psychologist who studies learning and software teams. In [her writing on code comprehension](https://www.linkedin.com/posts/drcathicks_its-so-easy-to-forget-that-understanding-activity-7480330910488489984-3STp), she describes understanding as something people actively construct, including when reviewing colleagues' generated code.
