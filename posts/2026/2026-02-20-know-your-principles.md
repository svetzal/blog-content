---
title: "Know Your Principles"
date: "2026-02-20"
published: true
description: "Comprehension debt isn't just about AI-generated code you don't understand. It's about not being able to articulate the principles that make your codebase navigable in the first place."
tags:
  - GenAI
  - Software Engineering
  - Principles
  - Craft
image: images/know-your-principles-banner.png
imageAlt: "Silver-haired woman in cyberpunk workshop gesturing toward a holographic system map while resting her hand on a well-worn leather journal of principles"
---

I was pair-programming with a junior developer a few years ago. We were trying to figure out where a piece of validation logic lived in a codebase I'd built a couple of years prior. I remember saying, "it should be over here." And there it was.

She looked at me like I'd performed a magic trick.

It wasn't magic. That moment came to mind this morning and made me think of all the times I'd done something similar. I realized I hadn't *remembered* where I put it. I'd *predicted* where it would be, by running my own design principles forward and arriving at the same conclusion I'd reached when I first wrote it. The code is organized the way I think, so I can navigate it without a map — the principles in my head *are* the map. Peter Naur called this "the theory of the program" back in 1985: the idea that a working program lives not just in source code but in the mental model carried by the people who built it. My principles aren't just guidelines I follow. They're the theory I carry.

And here's something else: when I asked her what principles *she* was using to reason about the code, she froze. Not because she thought she didn't have any — she did, she just couldn't name them yet.

## The Articulation Gap

There's a bit of conversation right now about "comprehension debt" — the accumulated gap between what a software system does and what the team actually understands about it. Research is piling up showing that AI-assisted development can widen this gap fast, because developers accept generated code without building the mental model that would have come from writing it themselves.

That's a real problem. But I think the conversation is missing something deeper.

Comprehension debt doesn't start with AI. It starts with developers who can't articulate the principles they're already using.

Think about it. Every developer — junior, intermediate, senior — operates on principles. Some are inherited from mentors. Some are absorbed from codebases. Some are hard-won through spectacular failures at 2 AM. But most developers, if you ask them "what are your design principles?", will stare at you for a beat too long before saying something vague about clean code.

That's the real gap. Not between code and understanding — between understanding and *articulation*.

## Principles at Every Stage

Here's where I think we get this wrong: we treat principles as something you earn after twenty years of battle scars. Senior developer wisdom. The kind of thing you nod sagely about in architecture reviews.

But junior developers have principles too. They're just different.

A junior might be working with "always write a test before I call something done" — not because they've deeply internalized why, but because a mentor told them to and it keeps catching their mistakes. That's a principle. It's borrowed, sure. It's maybe not fully understood yet. But it's guiding decisions, and that makes it real.

An intermediate developer might be operating on "keep business logic out of controllers" — something they've seen violated enough times to feel in their bones, even if they'd struggle to give you a precise rationale beyond "it gets messy."

A senior developer has principles so deeply embedded they've become invisible. "State changes flow in one direction." "When in doubt, make it explicit." "If it touches money, it gets its own test suite." They don't even think of these as principles anymore. They're just how things are done. Which is exactly the problem.

Because tacit principles — principles you can't name — are principles you can't teach, can't evaluate against, and can't encode into the systems that increasingly need them.

## Why This Matters Now

Here's the thing: when you write code yourself, your principles get woven into the work automatically. Every micro-decision — where to put this function, what to name that variable, how to structure this module — reflects your thinking. The code becomes a physical expression of your mental model.

When AI generates code, that weaving doesn't happen. The code might be fine. It might even be good. But it wasn't shaped by *your* principles, so it doesn't reinforce your mental model, and it might not match the reasoning framework that makes the rest of your codebase navigable.

Research from Anthropic found that developers using AI scored 17% lower on comprehension of concepts they'd just used. A Microsoft study found that higher confidence in AI output correlates with less critical thinking. And a randomized trial on experienced open-source maintainers found AI tools actually *increased* completion time by 19% in mature repos — despite developers believing they were faster.

The pattern is consistent: when we stop doing the cognitive work of creation, we lose the understanding that comes with it. And we don't even notice, because the *feeling* of understanding persists long after the reality has faded.

But developers who can articulate their principles have an anchor. When AI suggests something, they can ask: "does this align with how we think?" That question is only possible if you know how you think.

## Borrowed Principles Are Still Principles

I want to come back to that junior developer, because I think she represents something important.

After our pairing session, I asked her to write down the principles she'd been taught — even the ones she wasn't sure she agreed with yet. She came back with a short list:

- Write a test for the behavior you expect before you write the code.
- Don't repeat yourself — if you've written it twice, extract it.
- Ask why before asking how.

Were these *her* principles? Not entirely. She'd borrowed them from her bootcamp, from her mentor, from a book. She couldn't defend all of them rigorously. She suspected the second one might be wrong sometimes (and she's right — it is).

But she could *name* them. And naming them meant she could evaluate code against them, have conversations about them, and — crucially — start to notice when her experience was telling her something different than what she'd been taught.

That's how principles evolve. You adopt them, you use them, you bump into their edges, and eventually you refine them into something that's genuinely yours. But you can't refine what you can't articulate. The journey from borrowed principle to earned conviction requires you to hold the principle up to the light and examine it — and you can't do that if it's invisible.

## The Uncomfortable Exercise

So here's my challenge, regardless of where you are in your career.

Write down your principles. Not your team's architecture decisions. Not your company's coding standards. *Your* principles — the ones you actually use to make decisions when you're alone with the code.

If you're junior, they might be things your mentor told you. Great. Write them down anyway. Watch how it changes your relationship to them — from things you follow to things you *choose* to follow. That's a meaningful shift.

If you're intermediate, you probably have a mix of inherited and earned principles. Some of them conflict with each other. (Welcome to the messy middle.) Writing them down will surface those contradictions, and that's where growth lives.

If you're senior, this might be the hardest exercise of all. You've been operating on instinct for so long that your principles have dissolved into "just how I do things." Pulling them back out into words feels clumsy, maybe even reductive. Do it anyway. Because every principle that stays tacit is a principle that dies when you leave the team.

## The Bridge We Actually Need

Comprehension debt is real, and it's accelerating. AI can generate code faster than teams can build understanding of it. The research is clear on that.

But the solution isn't just better documentation or more rigorous code review — though both help. The deeper solution is a team of developers who can articulate the principles that make their codebase coherent. Principles that a new hire can learn. Principles that an AI tool can be measured against. Principles that survive when the person who wrote the code moves on.

The code is an artifact. The principles are the theory. And right now, at whatever stage you're at, the most valuable thing you can do is learn to say out loud what you already know in your bones.

Because "it should be over here" only works if you can explain *why*.
