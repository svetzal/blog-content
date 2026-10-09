---
title: "The four rules were always about intent"
date: "2026-10-09"
published: true
description: "An eval showed agent-written tests add nothing, and the rule drawn from it was 'stop writing tests.' Beck's four rules of simple design, remodelled around intent, say something more useful about why."
tags:
  - Software Engineering
  - Craft
  - Intent
  - Agentic Development
  - Simple Design
  - Testing
image: images/four-rules-intent-banner.png
imageAlt: "A silver-haired woman in a dark blazer stands at a steel workbench in a dark workshop. One glowing crystalline record card with six coloured rows stands on the bench, and three thin beams of light run from it up to three translucent projected panes showing the same six rows as a document, a code file, and a text file. One hand rests beside the card; the other drops a crumpled hand-written paper copy of the same rows into a wastebasket, while a second paper copy lies on the bench."
---

[Kun Chen](#kun-chen) ran an experiment this week. On the DeepSWE eval set, he forbade an agent from writing any tests. The success rate didn't drop. It went up a hair, not significantly, while time and tokens went down, significantly. Of the thousands of tests the unrestricted arm had written, about two thirds were unit tests and a third were integration tests, and neither bucket helped at all.

His explanation is the better half of the finding. The implementation and the tests were both the agent's interpretation of the intent, so the tests couldn't be any more accurate than the code they were checking.

That's interesting empirical evidence. Then he drew the rule: tell your agents to stop writing tests. The next day [one project](https://github.com/douglasjarquin/sum/issues/287) made it a standing directive, and its agents no longer write tests at all.

The finding is right. The takeaway misses the mark, and the reason is in the four rules I teach from.

## One rule ate the other three

[Kent Beck](#kent-beck)'s four rules of simple design, in the order I learned them: passes the tests, reveals intent, no duplication, fewest elements. Beck wrote them down in the first edition of *Extreme Programming Explained*, and [Corey Haines](#corey-haines) wrote a whole book on them. I taught them for years in [an eight-week program I ran under Coding Culture](/2026/2026-05-23-when-intent-moves-faster-than-code/). Beck's own two formulations in that first edition put the middle two in different orders, and people have argued about it ever since.

*Reveals intent* is the rule I teach from. In the current world, where an agent can produce code faster than I can read it, it's also the thing I spend most of my day on. Not writing code. Saying what I mean clearly enough that the code can be built from it, and checked against it, by something that has never met me.

So today I did something I hadn't done explicitly before: rewrite all four rules with intent as the subject.

1. **Validate intent continuously.** Not "passes the tests" but "keeps checking that what we built still matches what we meant." The tests are one way to do that. They are not the only way, and on their own they're the narrowest.
2. **Express intent everywhere possible.** And if it isn't possible somewhere, invent a way. A function name. A type. A record in a registry. A sentence a stakeholder can read.
3. **Don't duplicate your expressions of intent.** Every second copy is an invitation to diverge, and divergence is how a codebase stops meaning anything in particular.
4. **Express intent with the smallest footprint you can manage.** Every word you spend on it is a word someone, or something, has to read.

The original four rules are all still in that list. But the subject changed from *the code* to *the thing the code is for*.

## What the eval actually measured

Kun Chen's result is rule three with numbers on it.

An agent reads a task description. It forms an interpretation. It writes an implementation from that interpretation, and then it writes tests from the same interpretation. Two expressions of one guess. If the guess was wrong, the tests agree with the wrong code, pass, and tell you nothing. If the guess was right, the tests agree with the right code, pass, and tell you nothing you didn't already have.

The eval measured duplication, not tests. It measured what happens when you hold two copies of the same expression of intent, and the answer is what rule three has always said: the second copy costs you something and buys you nothing.

What tests are *for* is rule one. Validate, continuously, that what we built matches what we meant. A test can only do that job if the intent it carries came from somewhere other than the code it's checking. When I write a test before the code, the intent in the test came from me, and the code has to answer to it. When a stakeholder describes a case I hadn't considered, the test that captures it is a second *source* of intent, not a second copy. Kun Chen's own caveat points at exactly this: he suspects tests still carry value when a human can say what they mean more precisely as cases than as requirements. I'd put it more strongly. That's the only time they ever did.

So "stop writing tests" is the wrong rule. The right one is older: don't let the same interpreter write both sides of a check.

## Duplication was never about code

Tests are only the most visible place rule three bites.

We've always treated "no duplication" as a statement about code. Two functions that do the same thing. The same literal in six places. Copy-paste with the variable names changed. We're good at spotting that kind, and the tools are better than we are.

The duplication that rots a project is the other kind. The README that explains how the config loader works, next to the config loader. The architecture decision record that says "we chose Postgres because," next to a migration that says something slightly different. The comment above the function that no longer describes the function. Each of those is a second expression of the same intent, and the moment there are two, one of them is wrong. You just don't know which yet.

I've been building [Alloy](https://vetzal.ca/alloy/) and the [intent corpus behind my agent guidance](https://vetzal.ca/guidelines/) for most of this year. Once you model intent as a thing with a home, a record with an address, the duplicates become visible. The same judgement stated in a prose guide, restated in a comment, restated again in a test description. Three expressions. Three chances to drift.

So lately the work has been subtraction. An intent exists in the code, or it exists in the documentation, but not both. If the code can carry it, with a name, a type, a test that reads as a sentence, the documentation doesn't repeat it. If the code can't carry it, because it's a tradeoff or an expectation about the world, it goes in a record, and the code doesn't try to paraphrase it.

## Documentation becomes a derivative

Documentation is becoming a purely derivative artifact. Derivative, in the way a compiled binary is derivative of its source. You don't hand-edit the binary. You fix the source and build again.

Last week I shipped [a plugin](https://github.com/svetzal/guidelines/tree/main/plugins/product-atlas) that works exactly this way for product documentation. It reads the code and whatever intent the product owner has recorded, and writes the stakeholder-facing docs from those two sources. When they disagree, it doesn't guess. It files a question, and the goal is an empty questions folder. Intent stays as the lasting statement of purpose. The documentation is regenerated from it.

The same thing happens on the engineering side. My agent guidance files aren't written anymore. A profile names which intent records an agent needs, and [a compiler](https://github.com/svetzal/context-mixer2) emits the AGENTS.md. If I want the guidance to change, I don't edit the guidance. I edit the record it came from.

Is that a loss? I spent a long time believing documentation was a craft of its own, and I still think the writing matters. What changed is what gets written by hand. The intent gets written by hand, once, carefully. Everything downstream of it gets derived, and if the derivation is wrong, the fix goes upstream.

## Back to the tests

Tests have always been an alternate expression of intent. That's the line I've used for twenty years, and the word doing the damage in it is *alternate*.

An alternate expression is a second one. If the tests are where intent lives, then the code is the duplicate, and the two will drift. If the code is where intent lives, then the tests are the duplicate, and they'll drift the other way. Either way I've got two expressions of the same thing and a rule that says I shouldn't. Kun Chen measured what that costs, and the number was zero gain for real spend.

What I want from a test now is narrower and more useful. I want it to validate, continuously, that the code still does what the intent says. Rule one. The intent itself lives somewhere with an address, and the test points at it rather than restating it. That means the intent has to be mine, or the stakeholder's, or the record's. Anyone's but the implementer's.

[Dijkstra](#edsger-dijkstra) said testing can show the presence of bugs, never their absence. The tests were never the intent. They were the first way we found to check it. An agent writing its own tests isn't checking anything. It's agreeing with itself.

---

## Voices in this post

<a id="kun-chen"></a>**Kun Chen** is a former principal engineer at Meta, Microsoft and Atlassian who now builds agentic development tooling, including the firstmate project, and publishes his own eval results. The experiment cited here is his [October 7, 2026 thread](https://x.com/kunchenguid/status/2108030810691629403) on a DeepSWE run with Sonnet 5.5: banning agent-written tests gave a slightly higher success rate (not statistically significant) with significantly less time and token spend, and disabling execution of existing tests on a 44-task sample didn't move the success rate either. He is careful to note the result says nothing about end-to-end tests, since the agent wrote almost none. His perspective matters here because he did the measurement, and because his explanation of the result is the one I think is right, even where I disagree with the rule people drew from it.

<a id="kent-beck"></a>**Kent Beck** created Extreme Programming and wrote the four rules of simple design into the first edition of *Extreme Programming Explained* (1999). [Martin Fowler's 2015 history of the rules](https://www.martinfowler.com/bliki/BeckDesignRules.html) is the clearest account of their origin and wording, and notes that Beck's two formulations in that edition order the middle two rules differently. The rules are the frame for this whole post, and the version I teach from.

<a id="corey-haines"></a>**Corey Haines** is a developer and coach who co-created the Code Retreat format and wrote [*Understanding the Four Rules of Simple Design*](https://leanpub.com/4rulesofsimpledesign), with forewords by Kent Beck and J.B. Rainsberger. It is the standard short treatment of the rules, built from watching thousands of pairs work the same small problem, and it's what I point people at when they ask where to start.

<a id="edsger-dijkstra"></a>**Edsger W. Dijkstra** wrote that program testing can show the presence of bugs but never their absence, in [*Notes on Structured Programming*](https://www.cs.utexas.edu/~EWD/ewd02xx/EWD249.PDF) (1970). It's the line I use when explaining what tests are for, and it's why the closing argument here treats a test as validation of intent rather than proof.
