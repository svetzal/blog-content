---
title: "A Leaf on the Wind, at Machine Speed"
date: "2026-07-10"
published: true
description: "Agents have changed the economics of producing and repairing software. They haven't changed the physics of entropy."
tags:
  - ai
  - agentic-engineering
  - software-development
  - technical-debt
  - craft
image: images/leaf-on-the-wind-machine-speed-banner.png
imageAlt: "Silver-haired woman operating an industrial wind tunnel as chaotic leaves and glowing code fragments pass through containment gates and emerge in an orderly stream"
---

I've been helping a friend bring a troubled codebase back under control.

A few years ago, I wouldn't have touched it. Not because the problems were impossible to solve, but because the labour required to solve them responsibly would have been impossible to justify. We would have called it technical debt bankruptcy, gathered whatever knowledge we could from the wreckage, and started talking about a rewrite.

Refactoring was always an option in theory. In practice, someone had to pay for all those careful hours.

Agents have changed that calculation.

This hasn't been purely an act of charity. On February 1, 2026, I made the first commit to [Hone](https://vetzal.com/hone-cli/), a CLI that improves a codebase one engineering principle at a time. Hone is where I first tuned and refined the iteration workflow: assess the code, identify the most violated principle, plan one correction, execute it, and independently run the project's quality gates before accepting the result.

But I couldn't simply drop that workflow onto my friend's codebase. The loop can be general. The meaning of *better* is not. Before I could trust an agent to change anything, I had to do the pre-work: understand the project, articulate the principles that should govern it, and establish guardrails capable of distinguishing recovery from another layer of confident damage.

Then I could stress-test the larger idea. Could a sufficiently strong agent harness pull a software system back from a place we would previously have considered lost? Could it help us recover understanding, establish boundaries, characterize behaviour, and gradually make the code safe to change?

Or would it just help us make the fire bigger?

## The Keystrokes Aren't Ours Anymore

Nine years ago, I wrote a post called ["A Leaf on the Wind"](/2017/2017-04-25-a-leaf-on-the-wind). It came from a Monday morning talk I gave to my small software team about entropy.

The world creeps towards chaos, I told them. Leaves scatter across the lawn. Dishes collect beside the sink. Half-finished ideas accumulate in a codebase until nobody can quite remember which direction was deliberate.

Our job as software professionals was to spend every keystroke taming that chaos.

I still believe that.

The keystrokes aren't ours anymore.

An agent can add thousands of lines of code in the time it takes me to make a cup of tea. It can confidently introduce a new abstraction, repeat it four different ways, work around a misunderstanding of the domain, and give me a tidy summary assuring me that all the tests pass.

That doesn't make agents uniquely bad at software development. Humans have been doing all of those things for decades. Agents have simply removed the natural rate limiter.

The chaos used to creep in.

Now it can arrive before the kettle boils.

## You Can't Inspect Quality Into a Product

Every time I see an inspection task following some agentic burst, I come back to an old truth: you can't inspect quality into a product.

You can't review chaos out of a codebase after an agent has produced it either.

We seem to believe that if an agent writes the code and a human inspects the change before committing it, we've preserved human judgment. Technically, perhaps. But there is a point where the volume of work makes meaningful inspection impossible. The larger the burst, the more pressure we feel to accept it, and the less capable we are of building a coherent mental model of what changed.

The inspection becomes theatre.

Cory Doctorow has written a whole book about this condition: [*The Reverse Centaur's Guide to Life After AI*](https://www.amazon.ca/dp/037462156X). A centaur uses a machine to extend human ability. A reverse centaur serves the machine, taking its instructions, cleaning up its output, and scrambling to make its predictions true. Instead of a human directing a powerful machine, the machine is tossing work at the human and the human is scrambling to keep up. Another diff. Another alleged vulnerability. Another urgent-looking report with seventeen findings, fourteen of which may be nonsense. Inspect. Commit. Triage. Repeat.

If you find yourself there, find some calm.

That's difficult advice to follow when a fleet of machines appears to be throwing your software around like a marionette. But anxiety does terrible things to our ability to think. More speed won't restore control. Another model won't restore control. Clearing the queue won't restore control, because the queue is not the problem.

The quality boundary was placed too late.

## The Work Before the Work

Most of the work in successful agentic engineering happens before we ask the agent to do anything.

That includes before we ask it to write a specification, if that's the current fashion. An agent can produce a beautifully structured specification for the wrong problem just as easily as it can produce beautifully structured code for the wrong problem. Moving the generation step upstream doesn't remove the need for judgment. It just changes the document we're pretending to inspect.

The real work is in shaping the environment around the task:

- defining the intent and the boundaries;
- choosing what context the agent can see;
- giving it tools that expose the right information;
- making success observable;
- constraining the size of each change;
- requiring evidence before work can advance;
- deciding when the agent must stop and ask for help.

## How Much Code Did You Throw Out?

In my consultancy, I used a five-question questionnaire as a weekly touchpoint with apprentices. One of those questions was: "How much code did you throw out?"

Not how much did you write. How much did you throw out?

People are reluctant to do this. We misattribute the value to the code because that's the visible artefact of the work. But the value was in the outcome it enabled and the understanding we gained while producing it. The second time you wrote something was invariably better, because you weren't the same developer anymore. You had learned from the first attempt.

Recognizing the future maintenance cost of a poor solution takes time and the right kind of experience. The code works today. The tests pass. The awkwardness that will tax every future change hasn't had time to reveal itself yet. Keeping the first attempt can feel prudent right up until the learning it produced becomes the burden everyone else has to carry.

While tuning the inputs to Hone, I threw out a lot of agent code. Real time and real money went into the tokens that produced it. Some of that code taught me what the workflow needed. Some exposed weaknesses in the tools or the context I had supplied. Keeping it would have given that learning an unfortunate future.

The machine makes code cheap to produce. It doesn't make poor code cheap to own.

By tuning the tools available to the agent, I eventually reduced the workflow's token cost by a factor of twenty.

Not with a cleverer prompt. Not by switching to the cheapest model I could find. I changed how the agent interacted with its environment so it could get the information it needed without wandering around, repeatedly rediscovering the same things.

You can only do that if you own the tools. You can only know to do it if you're auditing the work.

This is why I've been using the term "Full Stack AI." I mean owning enough of every layer above the language model to tune the whole system to the task. The model matters, of course, but so do the instructions, skills, tools, context assembly, validation, tracing, and the control flow that decides what happens next.

"Harness" has become a slippery word. Sometimes it means a platform such as Claude Code or Codex. Sometimes it means the collection of instructions, skills, and MCP tools bolted onto that platform. I care less about settling the definition than I do about owning the layers where containment is possible.

If the only part we control is the prompt, we don't own much.

## Two Codebases

In agentic engineering, we're always working on two codebases.

One is the product. The other is the system that produces changes to the product.

A weak production system generates cleanup work. It gives an agent broad instructions, broad access, and a distant finish line. Then it hands the resulting pile to a human and calls the final inspection a safety mechanism.

A strong production system helps the agent map uncertainty, preserve existing behaviour, make one bounded change, gather evidence, and stop when the evidence doesn't support continuing. It makes disciplined work easier than reckless production.

That second codebase is where much of the interesting engineering lives now. We tune one kind of software while it builds another kind of software on the other side. Improvements compound. A better tool, a clearer boundary, or a stronger validation step shapes every future change the agent attempts.

The opposite compounds too.

This is the danger in treating a commercial coding agent as the harness rather than one component inside it. We end up optimizing for how quickly the product can generate code instead of how effectively our system can contain change. Fast output looks like progress right up until the humans can no longer explain what the software does.

## Pulling It Out of the Fire

My friend's codebase is useful precisely because it isn't a toy problem. The disorder already exists. The decisions are already tangled together. There are places where we need to understand the current behaviour before we can decide whether that behaviour is even desirable.

You don't recover a system like that with one heroic refactor. Asking an agent to rewrite the whole thing and then reviewing the result would merely be another uncontrolled burst, with a more respectable name.

Recovery is patient work:

- inspect before changing;
- characterize existing behaviour;
- expose uncertainty instead of silently resolving it;
- establish a boundary;
- make one improvement;
- collect evidence;
- repeat.

These were always good practices. What changed is the economics.

Agents don't become bored while mapping an unfamiliar codebase. They don't resent running another experiment or tracing one more call path. They can apply the same small repair across many similar locations without deciding, halfway through, that copying and pasting would probably be fine. Properly contained, they can supply patient labour at a scale that would have been financially absurd a few years ago.

That makes some technical debt recoverable.

It doesn't make the recovery automatic. The harness has to be strong enough to keep the agent from optimizing for the appearance of completion. It must reward evidence, restraint, and improved understanding rather than lines changed. Otherwise we've attached a fire hose to the problem and congratulated ourselves on the water pressure.

## Every Change Must Tame the Chaos

Agents have changed the economics of technical debt. They haven't changed the physics of entropy.

We can now attempt recoveries that would once have been untenable. We can ask machines to patiently map systems, characterize behaviour, run experiments, and make hundreds of small repairs without becoming tired or discouraged.

We can also ask them to pour thousands of lines into a system before anyone understands the first hundred.

The difference isn't the model. It's whether we built a harness capable of containing the force we've attached to it.

Every change still has to tame the chaos. We've simply reached the point where that responsibility can no longer live in every keystroke. It has to be designed into the system that produces them.
