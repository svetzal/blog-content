---
title: "Code review changes the team"
date: "2026-11-03"
published: false
image: images/code-review-changes-the-team.png
imageAlt: "A silver-haired woman and two colleagues discuss a shared diagram, with another team collaborating in the office behind them."
description: "As AI takes on more review, how do we preserve the learning that helps people reason together about software's effects?"
tags:
  - Software Engineering
  - Agentic Development
  - Collaboration
  - Learning
---

In ["What are you hiring code reviews to do?"](/2026/2026-10-20-what-are-you-hiring-code-reviews-to-do/),
I asked where review's different jobs go as agents take on more of the work.
One of those jobs deserves a closer look: how working through a change together
changes the team itself.

Anthropic's [AI-native SDLC playbook](https://claude.com/resources/articles/the-ai-native-sdlc-playbook)
starts with "Code is no longer the bottleneck." It proposes accelerating the
activities around coding as well. That opens a useful question about the time
we spend together. Which parts are waiting, and which parts help us become
better at the next problem?

I view software development as a social system. People work together to make
something useful for other people, and learn from what happens when those
people use it. That learning includes the effects on their lives and work,
well beyond whether our code behaves as specified.

In [the Claude Code team's account of review](https://claude.dev/blog/solving-code-review-at-anthropic/),
Anthropic explicitly identifies both finding defects and building shared
understanding as purposes. Its response to the second includes asking Claude for
explanations of the relevant code and collaborating in open Slack channels.
The authors also acknowledge, "We don't have a formal process for this."

Access to an explanation and shared understanding are different achievements. We can each receive an accurate
explanation without discovering that we disagree about what the software should
do, or why.

Imagine a review of a refund feature. The code correctly enforces a thirty-day
limit. A colleague asks what happens when a customer reported the problem on
day twenty-nine but support couldn't respond until day thirty-one. The team
now has to examine what the deadline means and who bears the cost of it.

An agent might raise that question too. What matters is that the people
responsible work through it and carry the resulting understanding into future
decisions. Approving the implementation doesn't tell us whether that happened.

[Carol Lee and Cat Hicks](#carol-lee-and-cat-hicks)'s research on code review anxiety
examines how anxiety relates to avoidance and disengagement. A review can be
completed while people withdraw from the participation that makes it useful.
Their study doesn't test AI replacing reviewers. It does give us reason to
examine the experience of participating, alongside the time a review takes.

[Jessica Kerr](#jessica-kerr) describes software teams as mutually learning systems,
including people, running software, and tools. We learn from each other and
from the software's behaviour in the world. Our ability to respond depends on
those relationships as well as the information available to each of us.

That makes the team changed by a review part of its outcome. Who understands
an unfamiliar corner now? Who learned that a colleague knows the history behind
a strange constraint? Who became more willing to question a decision?

[Kent Beck](#kent-beck) gives a concrete example in "The Story of A." A developer's
structural changes were languishing in review. Beck describes how questioning
the design, considering teammates' needs, and making smaller changes helped
the developer become someone colleagues sought out. Reviews became quicker
as the way they worked together improved. That account makes me wary of
treating a review queue as a problem we can understand from the queue alone.

We don't need to preserve every review ceremony to preserve those outcomes.
[Martin Fowler](#martin-fowler)'s refinement code review
describes the continuing work of improving code as the team understands more
and its context changes. Review can happen throughout that work. A pull-request
gate is one possible mechanism.

Kerr also [advocates automating recurring review checks](https://jessitron.com/2026/04/06/adding-correctness-conditions-to-code-changes/).
In her example, a missing documentation update becomes a check on future changes.
We can automate that work and use the time for conversations that require judgment.
The time saved gives us an opportunity to do that work together; the conversations
still need a place in how we work.

Anthropic closes its [review account](https://claude.dev/blog/solving-code-review-at-anthropic/)
with a goal of "less human time per change,
and no more reverts than before." Those measures can tell us something useful
about delivery. They don't tell us whether we're becoming more capable of
reasoning together about the software's effects.

Alongside delivery measures, I want to examine whether people can challenge the
purpose of a change and change direction together when its consequences surprise
us. In that refund example, success includes colleagues recognizing whose
experience the rule overlooked, then carrying that understanding into the next
policy decision. That's an outcome worth designing into an AI SDLC.

---

## Voices in this post

<a id="carol-lee-and-cat-hicks"></a>**Carol Lee and Cat Hicks** bring clinical and
psychological research to software work. Their [2024 study of code review anxiety](https://link.springer.com/article/10.1007/s10664-024-10550-9)
examines participation and an intervention to reduce anxiety. It helps distinguish
completing a review from engaging in one; it does not evaluate AI replacing people.

<a id="jessica-kerr"></a>**Jessica Kerr** is a software developer and systems
thinker. Her [account of symmathesy](https://jessitron.com/2018/10/25/symmathecist-n/)
connects learning among people, tools, and running software to their wider world.
Her [example of automating correctness checks](https://jessitron.com/2026/04/06/adding-correctness-conditions-to-code-changes/)
also shows how that perspective can guide automation.

<a id="martin-fowler"></a>**Martin Fowler** writes about software design,
refactoring, and development practices. His [refinement code review essay](https://martinfowler.com/bliki/RefinementCodeReview.html)
describes ongoing review through the team's work on changing software, giving us
ways to preserve review beyond a pre-integration gate.

<a id="kent-beck"></a>**Kent Beck** writes about software design as an exercise
in human relationships. In ["The Story of A"](https://newsletter.kentbeck.com/p/the-story-of-a),
he describes coaching a developer through stalled structural changes. The account
connects design choices and review delays to how colleagues work together.
