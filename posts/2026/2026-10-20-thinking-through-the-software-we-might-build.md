---
title: "Thinking through the software we might build"
date: "2026-10-20"
published: true
image: images/thinking-through-software-banner.png
imageAlt: "A silver-haired woman adjusts a glowing amber thread in a tapestry connecting a customer signup journey to the system's underlying rules and services."
description: "Exploring customer journeys and their supporting capabilities together, while keeping a speculative system coherent."
tags:
  - software-design
  - product-development
  - agentic-development
---

I'm looking at taking one of my experimental projects, [Epilogue Tracker](https://epiloguetracker.ca/), to the next step. I'm exploring what offering it as a paid service would involve, and I want people to be able to try it before deciding whether to pay. That means adding signup and a trial period. It also means deciding when to ask for payment information.

Do I collect it upfront? Or do I lower the barrier to entry, let someone experience the product, and ask for payment details later?

I haven't settled that yet. I'm working through the customer's journey to examine the decision and the capabilities it would require. With agentic software assembly, I can explore the screens and their supporting behaviour together, keeping both provisional while I check how they fit the system.

## When the form makes us think

"Add a signup form" sounds like a reasonably complete request. We can picture some fields and a button. We've all used one.

But put that form into a journey and we have to become more specific. What does someone know about the product when they arrive? What are we asking them to commit to? What does the wording lead them to expect?

If I put payment fields on that screen, I'm asking for a commitment before someone has experienced the product's value. If I leave them off, I need to think through how that person eventually becomes a paying customer.

When does the trial begin? What happens when it ends? What happens to the work they've put into the product if they don't subscribe?

Putting words on the screen forces me to say what I'm offering. If the form promises a trial without a credit card, the rest of the journey has to support that promise. I can't resolve the signup experience without thinking about what follows it.

I've seen feature requests acquire considerable certainty inside organizations before anyone has examined them this closely. An idea can feel complete in someone's head, and organizational authority can carry it a long way toward implementation. The customer's experience may still contain gaps that nobody has had to confront.

A concrete journey gives us something shared to examine. We can question whether a customer has the information they need at each step, and whether the next step delivers what we've led them to expect.

## Why I've been cautious about polished mockups

I've often been cautious about high-fidelity mockups. We could put substantial effort into producing them and still have most of the implementation ahead of us.

Someone could then look at a convincing screen and reasonably struggle to understand why the capability wasn't almost finished. The visible part looked done, even when we hadn't established how its behaviour would fit the actual system.

I'm currently breaking down and rebuilding application screens in [Storybook](https://storybook.js.org/), using [atomic design](https://atomicdesign.bradfrost.com/chapter-2/) to assemble larger parts of the interface from smaller, reusable components. I'm doing this to produce sequences of screenshots with enough visual integrity that someone can partially experience a proposed customer journey.

Those components connect the visual design to how we'd construct the interface. Agentic assembly lets us explore the behaviour underneath it too. A proposed interaction can have a provisional implementation that we examine alongside the screen, rather than leaving all of its implications for a later handoff.

## Keeping the speculative system coherent

A proposed screen implies interactions. Those interactions imply rules, data, and services. Some of the supporting capabilities may already exist. Others are proposals about what the system would need to do.

An agent can help hold these relationships together as we explore. A change to the experience can be traced through the proposed rules and services. A constraint in an existing service can lead us to reconsider the experience. Neither end needs to be treated as settled while we're working through the other.

In the waterfall environments I've worked in, isolated roles made this difficult. Business requirements informed design. Design informed implementation. Each group could think its concern through carefully and then reconcile it with the work of the group next to it.

That reconciliation often travelled only one or two steps. A constraint discovered during implementation might produce a local accommodation without reopening the original business assumption. By the time the conflict became visible, several groups might have developed work around assumptions that no longer agreed.

When I talk about a system of intents, I mean resolving the system as a whole. Epilogue Tracker represents that intent through actors, their goals, the interactions that support those goals, and journeys that put the interactions in sequence. Those relationships let us trace an implementation question back to the person we're trying to help.

An agent needs access to that intent and the system's constraints to help reconcile the layers. We still need to examine its reasoning. The useful capability is being able to carry a consequence across those boundaries and reconsider all the affected parts together.

Suppose I explore a trial that requires no payment information upfront. I can remove the payment fields and adjust the wording. I also need to work through how someone moves from trial access to a paid subscription, and what happens to their access and their work if they don't subscribe.

If that proposed behaviour conflicts with how access currently works, I need to bring the conflict back into the journey. Should I change the access rules? Revise what the trial offers? Explain the transition differently? These are possibilities to examine while the experience and its supporting implementation are still speculative.

The proposed screen now has connections we can inspect all the way through to the capabilities that would support it. Revising an access rule may change what we need to say on the signup screen. We can follow that consequence back up without waiting for an implementation handoff to expose it.

## The certainty trap

There's still a certainty trap here. A polished, internally coherent proposal can feel more established than it is, especially when we can demonstrate some of its behaviour.

We still need to test the implementation and learn whether customers find the experience useful. I can work through a signup journey until its rules agree and still be wrong about whether asking for payment upfront discourages the people I want to reach.

Calling this "cheap to change" also leaves out a dimension I care about. Agentic tools can reduce the effort of producing an edit while leaving substantial risk in its consequences. Changing trial access to make one journey work could break access elsewhere. The screen may be easy to assemble; the change still has to fit the whole system.

Coherence needs to constrain the speculative work itself. As we explore, we need to check that the proposed behaviour has a credible implementation path, and identify where it requires the wider system to change.

I'm considering how Epilogue Tracker could support this kind of exploration directly: connecting its actors, goals, interactions, and journeys to concrete illustrations built from reusable design elements. My own signup decision gives me a practical place to work through what that would require.

For my trial, that means examining the signup screen, the promise it makes, and the rules that would fulfil that promise together. If they conflict, I need to be able to revise any of them, including the original product decision. Faster assembly gives me more room to do that reconciliation before I ask a customer to rely on the result.

