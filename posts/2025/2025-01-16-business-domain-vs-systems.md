---
title: Business Domain vs Systems Domain
published: false
tags:
  - architecture
  - engineering
  - software-development
  - developer
  - team
  - collaboration
  - culture
  - business
  - management
date: 2025-01-16
---
I sat in a meeting yesterday that was probably the best illustration of conflict between business models and systems models that Ive seen yet.

The business domain doesn't matter, but suffice to say, as most businesses, we have trouble communicating in IT terms.

The domain of computers is strict precise and pedantic, they're really well matched to our financial models, or engineering and manufacturing, in that regard.

But the domain of business, of persuasion and relationships and trust, is not at all precise.

The moment something has to go from human as input to a process, things start to get lost. Processes that try and account for the weird human dynamics are even weirder things. It's why we stack countless policies in our Business Process Management and Decision Management systems.

There's always a moment when we're modelling new systems where we get together and start modelling out the business in some structured way (I usually just start drawing pictures on a whiteboard) where everything was nice and clean and orderly and simple, and someone says "well, that looks great, but that's not the way things happen" and starts elaborating all the exceptions to the model and processes.

And that's where the software engineers start making compromises in their once-beautiful digital domain model.

In the meeting yesterday, a business leader expressed with wonderful precision what the Behaviour Driven Design community would call a Scenario. The context was clear, the action being taken by the stakeholder was clear, and the intended result was clear.

Except, the systems didn't model themselves after the business. They have weird-looking abstractions that don't use words that make sense to the business, only to the database behind the system. So "why did you put the flag on the application and not the applicant?" got waved away, because now that's what the system looks like, counter to what the business really needed. It cost money to make that change. And we're gonna leave it be for budget reasons. "We'll make do."
