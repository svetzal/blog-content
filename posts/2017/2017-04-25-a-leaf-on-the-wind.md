---
title: "A Leaf on the Wind"
date: "2017-04-25"
published: true
---

I've been coaching other teams for over a year now (I spent 15 years coaching my own teams), but I still have a small software development shop bubbling behind me building products, where I have an apprentice and, occasionally, interns.

I can continue to manage the culture there, refine what I established with our larger consultancy in years past. Compare and contrast it to what I see in my coaching engagements. Also, unlike my coaching engagements, I can blog about it!

Last week I prefixed our Monday stand up with a talk about entropy, the essence of which I will present here. It gets a little philosophical, so grab yourself a cuppa.

## Chaos Creeps

The world creeps towards chaos and entropy. The wind blows the leaves from the trees and scatters them in a mess. Our kitchen at home accumulates garbage, dirty dishes, recycling. Our pets find a piece of cardboard and shred it on the living room floor.

It happens in our code too when we are not careful.

Think about our life as a software developer. People come to us with scattered, unformed ideas in which we seek patterns and order. The technologies we use sometimes elude our understanding (happened to us this week with some sharp corners in cross-browser CSS3 flexbox) so we wander blindly looking to understand. Writing tentative code to build that understanding.

So here we are, a codebase full of exploration, of what was asked for, of what the market might need, of what we might understand. Pulling us in too many directions. Then add a couple people to the mix and we start dealing with multiple interpretations of those directions, multiple problem solving approaches, multiple mental models of roughly the same concepts, half in someone's brain and half in the code repository.

It's a wonder anything works, right?

## The Professional On The Job

So here is the thing. As the professional on the job each of us is expected to spend each and every keystroke we make towards taming that chaos.

This involves talking to each other, while pairing and while exploring ideas with stakeholders. Using a source control system to isolate ideas and experiments. Writing tests first so that we have at least two perspectives on every line of code we write.

Sound familiar? It should. These are core activities in a modern, healthy, software development practice.

It is not your job to crank out code, it is your job to crank out the _"correct"_ code in as _small a quantity_ as possible. The "correct" code is the code that solves the _actual_ problem.

Look at how much code you wrote this week. How much did you throw out? How much is covered by automated tests?

Throw out a lot of code. Writing it helped you understand the problem you are solving, the underlying technologies, the bugs in your communication. Don't get attached to that code. **The value is not in the code.** Then, while the learning is fresh in your mind, you will write a better implementation, solving something closer to the actual problem. Code worthy of your talent, worthy of the code base, worthy in the world. Commit that to your repo. Delete the rest, and revel in what you learned from it.

## WTFs

### You do use source-control, right?

Frequently I come across freelancers who don’t use source control. It amazes me. I just can’t imagine picking apart the chaos without seeing how it evolved, lifting apart the threads, zooming in on the nugget we half missed, pulling it forward to polish it off and commit it. Maybe they think their work is mundane enough to have an immunity to chaos (note above my CSS3 flexbox surprises). Maybe they never have to maintain the code they write because it became “done”, “shipped”, abandoned.

### Surprise!

The chaos doesn’t always present itself right away, described in my “Chaos in the Matryoshka” post from years ago. Sometimes you find you were walking straight into it all along. Today I reverted 4 merges along our main branch in our current product, erasing 2 days worth of our work. It had to be done. The code was worthless. Sunk cost. What we deleted would have cost us weeks to maintain. What we learned will save us weeks knowing the bad path.

### Incomplete thoughts

Especially early in projects, your code accumulates a number of half finished patterns, things on their way towards an idea you had. Then you have a better idea and more things are on their way to the new idea. You weren’t sure it was going to work out, so you held back so you could get some screens in front of stakeholders for timely discussion. On about the 3rd or 4th pattern things click and you apply it back to the other areas, and realize you can improve it, now you’re juggling 7 or 8 things that _almost_ fit the ideal in your head, codified differently in the codebase. Then toss another person or two in that mix. Chaos, eh?

This can be one of the most insidious things to tame on a team. Alignment with each other takes time. When working remotely it takes longer. Pair programming is your single best tactic for dealing with this, and you can juggle the pairs so that the ideas spread as the pairs talk to each other. Pair and bring the threads together, between yourselves and in the code.

## Every. Single. Keystroke.

The chaos naturally creeps in, you can’t stop it. You’re writing code to solve a shifting problem, in a shifting team, in a language that’s a work-in-progress, using frameworks that are a work-in-progress, in an editor that’s a work-in-progress, on an operating system that’s a work-in-progress, on a computer that you’re likely to replace in a couple years.

You are a leaf on the wind.

Every keystroke you make _must_ tame the chaos.

The alternative is ultimately to be buried in your technical debt, all those little untied threads, those "I will fix this later"s, those "I don't have time right now"s.
