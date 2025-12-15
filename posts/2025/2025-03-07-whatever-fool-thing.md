---
tags:
  - ai
  - machine-learning
  - learning
  - coding
  - software-development
  - team
imageAlt: A woman at a computer, using her phone and keyboard
image: images/boundaries.png
published: true
date: 2025-03-07
title: It Will Do Whatever Fool Thing You Ask It
---

A group of us sat down to do the Bowling Kata the other day, to see if we could get the GenAI to do the implementation as we wrote the spec for it.

We started with using Visual Studio Code with the Github CoPilot plugin, in Edit mode, and using the GPT-4o model.

We got it to scaffold out the project, the simplest of Typescript code bases, from an empty folder.

The first tests went well, a gutter ball, certain pins knocked down, we wrote the spec, and it started building a workable implementation.

About 5 tests in, when we started scoring a spare frame and subsequent frame, GPT-4o stopped being able to keep all the tests passing.

A quick switch to the o3-mini model, and while it failed the first attempt, at the second attempt it got all the tests passing and we could continue.

After the session, we realized we were putting incorrect scores in the spec for scenarios in which the user rolled spares.

It was a nice ping-pong pair exercise with the LLM, we learned o3-mini and Claude-3.5 are far stronger than GPT-4o for coding tasks beyond the trivial single request.

But, damn, it'll do whatever fool thing you ask it.

Keep your critical thinking hat on!
