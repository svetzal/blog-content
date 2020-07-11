---
title: "Four Things Impeding Your Software Teams"
date: "2017-08-21"
published: true
---

In the beginning, teams tend to be able to deliver working software with little friction. In fact, developers tend to love “green field” projects in which they get to start again with a blank slate.

Then over time, things take longer and longer to accomplish, to the point that folks urge again for a “rewrite.”

Why is that?

## 1\. Technical Debt

Over time, under the pressures to “deliver,” you will see compromises made. Here are just a few scenarios:

- We know that we should do "thing A" but don't have time, so we do suboptimal "thing B" instead, and A is pushed into the icebox as a “clean-up later.”
- A developer begins "thing A", and realizes that what she just did can simplify many areas of the codebase. Her current story doesn’t touch on those areas, and that “extra” work wasn’t in the estimate. Disempowered to do the work, the “refactor” hits the icebox as a “clean-up later.”
- A large task is divided between developers, some remote, some local. When everyone’s done, there were four different approaches taken to the same problem. Nobody noticed and now each new developer on the project finds a different “guideline” on how to do the same kind of work.

Culture is a series of concentric bubbles, most far beyond your influence. Sometimes even if there isn’t direct time pressure from management, there’s an external cultural pressure to cut these corners.

Your developer culture is created by how each developer interacts with the people around them, both online and offline. Online sources of culture are pervasive and uncontrollable, like Google and Stack Overflow. Every teacher, professor or boot camp instructor that had an impact on a developer. Their peers that work elsewhere in the industry.

Even when you urge your teams to “do the right thing” these voices can work against you. And, even more insidiously, how do you or they know and agree upon what “the right thing” even is?

You must together decide what "the right thing" is, and ensure that it has the loudest voice in the room.

## 2\. Tight Coupling

In our rush to be “relevant” developers will often track new technologies in the software space. We’ll look at that fancy new web framework or database technology with envy, dreaming of all the ways our lives would be easier if we could just adopt it.

Laudably, we’ll seek to avoid “re-inventing the wheel” and find third-party libraries that will help us avoid tricky problems or large volumes of work.

When we integrate these things, the prescriptive approach is most often to start scattering references to that fancy web framework or helpful new library all through our code.

When the day comes when the library is no longer appropriate, and it will, we will have hundreds of references to it scattered throughout our codebase. The work and risk involved in its removal pressure you to leave it in place. It becomes more and more obsolete; the world discovers security vulnerabilities.

Oh, and it's not just third-party libraries. Choosing when to couple portions of your own system together should be a conscious decision.

Each tight coupling is like another pin, holding us down, limiting our flexibility.

As a team, we can reach out and find the strategies that protect ourselves from tight coupling and the risk in those unpredictable outside and business forces. We can agree on what strategies to use, and decide how to apply them.

## 3\. Weak Cohesion

A developer is not a constant. She is a person on a life journey. The way she solves problems today is different than the way she did last year and will be different than her approach next year.

People don’t have a perfect memory, and all come to the table with their personal history of experience.

Sometimes even when we’re talking to each other, we can be solving the same problem and not realizing it. It’s not that we’re not intelligent, we just don't often feel comfortable stepping outside our focus. After all, we're burning precious estimated time on our own to-do.

So the same ideas are repeated, in different ways, scattered around our code.

Another factor is the way novices write code, or even more experienced folks when they're feeling unpracticed. We begin looking for something like what we need that’s already in the code. Then, we replicate that and adapt it to our specific need. On the surface, it sounds efficient. A quick way to get something done.

The problem with this is entropy. It scatters bad ideas back through the code after we work so hard to remove them.

We must work hard to limit the proliferation of the things we don't want and promote the things we do want.

But first, we need to agree as a team on what those things are.

## 4\. Incidental Complexity

Mark Twain wrote, “I didn’t have time to write you a short letter, so I wrote you a long one instead.”

It is hard to make things concise, to protect ourselves from the external influence of those third-party frameworks, to come up with the creative, elegant solution.

Incidental complexity gathers around us while we don’t have these things under control.

We didn’t set out to make things complicated, but it was the easier path.

As human beings, we have a limited capacity for dealing with complexity. Psychological studies show us that on average we can only hold five to seven things in our heads for a couple of minutes at a time.

So the more complex a piece of code is, the longer it’s going to take people to reason about it, the longer it’s going to take to change it, and the more likely there will be unintended consequences after doing so.

So if over time, the chaos naturally pushes the code to be more complex, then over time, it will take longer to do things, and there will be more bugs produced by doing them.

## The Good News

We have tools to deal with these situations.

It takes an effort to control the chaos, time to find and empower your technical leaders, and courage to move forward.

Your team has the leadership, the courage, and the energy. We just have to find it, inspire it, and activate it.
