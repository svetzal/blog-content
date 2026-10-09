---
title: "The four rules were always about intent"
date: "2026-10-09"
published: false
description: "Tests are an alternate expression of intent, and that's not quite enough. Beck's four rules of simple design remodel cleanly around one word, and the remodel changed where I let documentation live."
tags:
  - Software Engineering
  - Craft
  - Intent
  - Agentic Development
  - Simple Design
---

A colleague and I were trading notes this week on what tests are for. My answer has been the same for twenty years: tests are an alternate expression of intent. They say why the code is shaped the way it is, in a form that can be run. That's interesting empirical evidence about what we meant.

It's also still missing the mark, and I've only recently been able to say why.

## One rule ate the other three

Kent Beck's four rules of simple design, in the order I learned them: passes the tests, reveals intent, no duplication, fewest elements. I taught them for years in [an eight-week program I ran under Coding Culture](/2026/2026-05-23-when-intent-moves-faster-than-code/). The internet has argued about the order of the middle two for a decade. I thought I knew them.

Over the past year the second rule quietly ate the other three.

In the current world, where an agent can produce code faster than I can read it, *reveals intent* stopped being one rule among four and became the thing I spend most of my day on. Not writing code. Saying what I mean clearly enough that the code can be built from it, and checked against it, by something that has never met me.

So I tried an experiment. What happens if you rewrite all four rules with intent as the subject?

1. **Validate intent continuously.** Not "passes the tests" but "keeps checking that what we built still matches what we meant." The tests are one way to do that. They are not the only way, and on their own they're the narrowest.
2. **Express intent everywhere possible.** And if it isn't possible somewhere, invent a way. A function name. A type. A record in a registry. A sentence a stakeholder can read.
3. **Don't duplicate your expressions of intent.** Every second copy is an invitation to diverge, and divergence is how a codebase stops meaning anything in particular.
4. **Express intent with the smallest footprint you can manage.** Every word you spend on it is a word someone, or something, has to read.

Read that list back and the original four rules are still there. Nothing got dropped. But the subject changed from *the code* to *the thing the code is for*, and that shift does more work than one word should.

## Duplication was never about code

Rule three is the one that reorganized my week.

We've always treated "no duplication" as a statement about code. Two functions that do the same thing. The same literal in six places. Copy-paste with the variable names changed. We're good at spotting that kind, and the tools are better than we are.

The duplication that rots a project is the other kind. The README that explains how the config loader works, next to the config loader. The architecture decision record that says "we chose Postgres because," next to a migration that says something slightly different. The comment above the function that no longer describes the function. Each of those is a second expression of the same intent, and the moment there are two, one of them is wrong. You just don't know which yet.

I've been building [Alloy](https://vetzal.ca/alloy/) and the [intent corpus behind my agent guidance](https://vetzal.ca/guidelines/) for most of this year, and that's the lens that work gave me. Once you model intent as a thing with a home, a record with an address, the duplicates become visible. The same judgement stated in a prose guide, restated in a comment, restated again in a test description. Three expressions. Three chances to drift.

So lately the work has been subtraction. An intent exists in the code, or it exists in the documentation, but not both. If the code can carry it, with a name, a type, a test that reads as a sentence, the documentation doesn't repeat it. If the code can't carry it, because it's a tradeoff or an expectation about the world, it goes in a record, and the code doesn't try to paraphrase it.

## Documentation becomes a derivative

That subtraction leads somewhere I wouldn't have gone a year ago.

Documentation is becoming a purely derivative artifact. Not unimportant. Derivative, in the way a compiled binary is derivative of its source. You don't hand-edit the binary. You fix the source and build again.

Last week I shipped [a plugin](https://github.com/svetzal/guidelines/tree/main/plugins/product-atlas) that works exactly this way for product documentation. It reads the code and whatever intent the product owner has recorded, and writes the stakeholder-facing docs from those two sources. When they disagree, it doesn't guess. It files a question, and the goal is an empty questions folder. Intent stays as the lasting statement of purpose. The documentation is regenerated from it.

The same thing happens on the engineering side. My agent guidance files aren't written anymore. A profile names which intent records an agent needs, and [a compiler](https://github.com/svetzal/context-mixer2) emits the AGENTS.md. If I want the guidance to change, I don't edit the guidance. I edit the record it came from.

Is that a loss? I spent a long time believing documentation was a craft of its own, and I still think the writing matters. What changed is what gets written by hand. The intent gets written by hand, once, carefully. Everything downstream of it gets derived, and if the derivation is wrong, the fix goes upstream.

## Back to the tests

Which brings me back to where my colleague and I started. Tests as an alternate expression of intent.

The word doing the damage in that sentence is *alternate*. An alternate expression is a second one. If the tests are where intent lives, then the code is the duplicate, and the two will drift. If the code is where intent lives, then the tests are the duplicate, and they'll drift the other way. Either way I've got two expressions of the same thing and a rule that says I shouldn't.

What I want from a test now is narrower and more useful. I want it to validate, continuously, that the code still does what the intent says. Rule one. The intent itself lives somewhere with an address, and the test points at it rather than restating it.

Dijkstra said tests can only show that something doesn't work, never that it does. He was right, and the four rules were quietly agreeing with him the whole time. The tests were never the intent. They were the first way we found to check it. Now that I have other ways, I'd rather the test do that one job well than carry a second copy of a thing that already has a home.
