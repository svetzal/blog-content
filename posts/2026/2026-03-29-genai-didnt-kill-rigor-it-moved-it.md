---
title: "GenAI Didn't Kill Rigor — It Moved It"
date: "2026-03-29"
published: true
description: "The old bottleneck was implementation. The new bottleneck is ambiguity. And the rigor that used to live in coordination now needs to live in specification, context, and evaluation."
tags:
  - GenAI
  - Software Engineering
  - Agile
  - Craft
  - Leadership
image: images/genai-rigor-banner.png
imageAlt: "Silver-haired woman in a dark blazer standing at a threshold between two spaces — behind her, a cluttered wall of holographic Kanban boards and floating ticket stubs in cool blue light; ahead, a clean workspace with a single behavioral specification display glowing in warm amber"
---

When I first started trying to cost projects in my consultancy back in the late '90s, I broke everything down along technology boundaries. Build this class. Write that web page. Style the CSS. My technologist brain saw decomposition opportunities everywhere — separation of concerns was gospel, and the CSS Zen Garden had me convinced that keeping markup apart from styling was the pinnacle of good thinking.

I was wrong about where the boundaries mattered. And it took me a decade to figure that out.

Those early projects were stressful. I was on the hook for constant overages. We'd get anxious toward the end because budget was running thin and the project never seemed quite ready to ship. We had a solid team of really good people, but we'd always find ourselves frustrated trying to pull off the final deliverable. I framed the underlying tension as an honesty problem: do I be honest about the realities of the work, or pad things out and overcharge to the point where some customers subsidize our mistakes on other projects?

Around 2007-2008 I found a different operational model. More time-for-money, with responsibility for coherent success criteria shared between us and the client — before, that had fallen almost entirely on us. We did OK before the shift, but we did much better after. For years we delivered dozens of projects that way, and while we didn't get rich, we had a respectable operation. It was, in my mind, more honest. More fair.

That transition was when techniques like BDD first started to land in how I thought about decomposing work. Not along technology boundaries, but along business and use-case boundaries. It's when I finally digested Ivar Jacobson's use-case oriented design from '94. Tiny, incomprehensible technical tasks became larger stories that clients could actually relate to. The "stories per day" metric went down, but the domain focus made everything else go up. Customer meetings went more smoothly when we weren't struggling to translate tech-talk to project results on the fly during demos.

Time around the whiteboard was better spent figuring out what needed to be true to close the project and get paid, rather than drawing UML diagrams. Technology became the landscape in which we worked, rather than the work itself.

So why does this matter now?

## The Machinery We Built

We didn't invent issue trackers, PRDs, approval chains, handoffs, and sprint ceremonies because we loved bureaucracy. We invented them because turning many people's intent into working software was expensive, fragile, and slow.

In my ten-person consultancy, we could sit with the customer face-to-face every week. The purpose of what we were building was always top of mind. But in larger organizations, it's different. You're more distant from customers. Design, architecture, and code get separated by people and departments. There's less trust. It's easier to get distracted by the technology — to get stuck admiring our own concerns while the mistrust grows.

The work we do and the way we break it down becomes less and less comprehensible to the business and our customers. Those tiny slices of concern, broken down in their own containers, just don't align with each other. Breaking down testing concerns leads to different pieces of work than breaking down coding concerns or data modelling, and none of those pieces fit together. The "backlog" becomes a mess of seemingly irreconcilable differences. So we invent new roles to try and assemble that jigsaw puzzle, and now we have meta-concerns and another silo of thinking.

Organizing all of this by outcomes feels awkward because optimizing for value delivery actively makes individual concerns less efficient — and that's heresy in organizations that worship "efficiency" without asking *efficient at what?*

Every one of those coordination structures — the tickets, the syncs, the handoffs, the translation layers — was a rational adaptation to an expensive execution layer made of humans. [Nate B Jones](#nate-b-jones) put it bluntly in his analysis of the Block layoffs: pull up your calendar from last week and count the hours spent transferring information from someone who had it to someone who needed it. Status updates, sprint planning, design reviews, stand-ups. Then count the hours creating documents whose primary purpose was translating your knowledge into a form someone else could act on. PRDs, specs, decks, tickets. If your ratio looks anything like the research suggests, roughly 60% of your time went to coordination and 40% to creation.

Those aren't productivity failures. They're the cost of producing value with an execution layer made of people. But organizations routinely mistake the coordination cost for the value itself — optimizing the meetings, the handoffs, the artifacts, as if making the process smoother is the same as making the product better.

## What Changed

Today I look at GenAI, and one of those old tiny technical tasks — make this HTML template, write that Java class — gets produced in seconds by my agent. It's not even worth talking about. Seconds to process. But the overhead to organize them? Still there. The inefficiencies born of human communication and trust separated by concerns — well, they start to become irrelevant because the agent can organize and assemble the technical bits so quickly.

Implementation is now dramatically cheaper. And when implementation gets cheap, the bottleneck moves.

It moves from production to ambiguity.

In conversation with [Kris Jenkins](#kris-jenkins) on *Developer Voices*, [Henry Garner](#henry-garner) describes a shift from hands-on coding toward what he calls delegated coding: humans still own architecture, risk judgment, verification, and the definition of what the system is supposed to do, while agents increasingly handle the implementation. His bottom line is that velocity comes from clarity of intent, not from surrendering judgment.

[Kris Jenkins](#kris-jenkins) usefully distinguishes between reckless "vibe coding" and this more disciplined model of delegated coding. The important question is not whether AI writes code, but where human responsibility sits relative to the code, the architecture, and the consequences. That framing matters. It gives us language for a middle path between AI boosterism and reflexive skepticism.

So what happens to all that coordination machinery we built? The PRDs, the sprint planning, the cross-functional syncs, the design-to-engineering handoffs?

Some of it starts to feel like friction rather than protection. Process routinely outlives the constraint that justified it, and nobody notices because the process has become someone's role, someone's department, someone's identity. The coordination layer becomes self-justifying — and the constraint that made it necessary in the first place, human bandwidth and human communication limits, is shifting underneath it.

## The New Rigor

The answer is not less rigor.

The answer is new rigor. And it lives in three places.

**Specification.** The ability to describe what matters clearly enough that a machine can act on it literally. Not "build a login page" but "build a login page that handles email passwords, social OAuth via Google and GitHub, progressive disclosure of 2FA, session persistence for 30 days, and rate limiting." [Nate B Jones](#nate-b-jones) argues in his breakdown of the four disciplines that the word "prompting" is now hiding entirely different skill sets — and the one that matters most for serious work is specification engineering: writing documents that autonomous agents can execute against over extended time horizons without human intervention.

In my consultancy, I learned this lesson the slow way. When we shifted from decomposing along technology boundaries to decomposing along value boundaries, everything got easier — budgets, sales, client relationships. The specifications weren't more detailed in the traditional sense. They were more *meaningful*. They described what needed to be true, not what classes to write.

That same shift is happening again, at a different scale.

**Context.** Where reality lives. The information environment in which an agent operates — the system prompts, tool definitions, retrieved documents, project conventions, decision history. Your prompt might be 200 tokens. The context window it lands in might be a million. That other 99.98% is where the real leverage sits. People who are dramatically more effective with AI aren't writing dramatically better prompts. They're building better context infrastructure.

**Evaluation.** How we tell polished wrongness from correct output. This is the one that keeps me up at night. AI often fails in a fluent way — it sounds correct even when it isn't. [Jones](#nate-b-jones) calls evaluation and quality judgment the single most frequently cited skill in AI job postings. The discipline is resisting the urge to equate fluency with competence. Noticing not just whether the core answer looks fine, but where the edges and corner cases break. Building systems that verify output instead of merely admiring it.

When mis-specification gets expensive, these three skills become the load-bearing structure of professional work.

## Why This Changes Roles

[Rory Sutherland](#rory-sutherland), in his 2026 predictions interview with *The Drum*, warns that AI will first be sold as "the same, worse, but cheaper." He calls it the doorman fallacy: define a role too narrowly, automate that narrow slice, claim all the savings, and ignore the wider value the role created. The sharpest part of his argument is structural: the people who cut the doorman are never held accountable for the value they destroyed. The incentive system rewards visible cost savings and ignores invisible value destruction. That's not a bad instinct — it's a broken feedback loop.

I share that concern. But when the translation layers between people thin out, everybody gets closer to the product. The PM isn't writing a document that an engineer will interpret. They're shaping the actual artifact. The designer isn't producing a mock-up that approximates the final thing. They're working on the final thing. Fewer people may need to sit in translation layers. More people can work closer to the artifact itself.

That's what my consultancy discovered twenty years ago when we stopped breaking work down by technology and started breaking it down by value. We paid some technical cost, but the payback in trust and client delight was so much greater and more meaningful to our success.

Humans become more valuable — not less — in architecture, intent, risk, and correctness boundaries. [Henry Garner](#henry-garner) argues that if you can clearly specify desired behavior, agents can write more tests, explore more edge cases, and grind through tedious debugging in ways that humans often avoid because of time and attention limits. AI could increase software rigor rather than merely increase software volume. But only if we're rigorous about the right things.

## The Migration

So long ago in my consultancy, optimizing individual task efficiency wasn't just less effective — it was actively making the business worse. We were burning budget on precision estimates of the wrong things. When we stopped and organized around value instead, the rigor didn't disappear — it migrated from "estimate each technical task correctly" to "understand what needs to be true for this project to succeed."

We're in a similar migration now.

The old bottleneck was implementation. The new bottleneck is ambiguity. The rigor that used to live in coordination and translation now needs to live in specification, context, and evaluation.

We are not becoming less rigorous. We are being forced to become rigorous in different places — and if my experience is any guide, what we find on the other side is closer to the work, closer to the customer, and closer to the thing that actually matters.

---

## Voices in This Post

<a id="henry-garner"></a>**Henry Garner** is CTO of [JUXT](https://www.juxt.pro), a consultancy with about 150 senior engineers building AI platforms for tier-one banks. He studied arts at Oxford before finding his way into software engineering, co-founded a big data analytics startup, and authored *Clojure for Data Science*. He initiated the [JUXT AI Radar](https://www.juxt.pro/ai-radar/) and co-created [Allium](https://github.com/juxt/allium), a behavioral specification language. His argument that velocity comes from clarity of intent — not from surrendering judgment — comes from watching his own engineers move through the full adoption arc of AI-assisted development. His conversation with Kris Jenkins, ["What's Worth Knowing In AI Right Now?"](https://www.youtube.com/watch?v=43lsrgkhJ8c), is the source I draw on here.

<a id="kris-jenkins"></a>**Kris Jenkins** hosts [Developer Voices](https://www.developervoices.com), a podcast of long-form technical interviews with developers and technologists. He's been a CTO, a Haskell contractor, a frontend developer, and a dozen other roles across a career in software. He's currently a Lead Developer Advocate at Snowflake. I cite him here for his framing — the distinction between reckless vibe coding and disciplined delegated coding, and the observation that AI stopped feeling like hype and started feeling like a structural shift in how software gets built.

<a id="nate-b-jones"></a>**Nate B Jones** is an AI strategist and former Head of Product at Amazon Prime Video, where he led global roadmap and ML personalization for 200+ million viewers. He now publishes daily AI analysis to over 250,000 followers across [YouTube](https://www.youtube.com/channel/UC0C-17n9iuUQPylguM1d-lQ), [Substack](https://natesnewsletter.substack.com), and podcasts. I draw on three of his videos here: ["Prompting Just Split Into 4 Skills"](https://www.youtube.com/watch?v=BpibZSMGtdY) for the specification/context/evaluation framework, ["The AI Job Market Split in Two"](https://www.youtube.com/watch?v=4cuT-LKcmWs) for evaluation as the most-cited skill in AI hiring, and ["4,000 People Lost Their Jobs At Block"](https://www.youtube.com/watch?v=lbfoNxoHl2o) for the coordination-tax analysis. His Amazon product experience gives real weight to his claims about what organizations actually need.

<a id="rory-sutherland"></a>**Rory Sutherland** is Vice Chairman of Ogilvy & Mather, where he has worked since joining as a graduate trainee in 1988. He studied classics at Cambridge, rose from copywriter to creative director, and in 2012 founded Ogilvy's behavioral science practice. He served as President of the Institute of Practitioners in Advertising and is the author of *Alchemy: The Magic of Original Thinking in a World of Mind-Numbing Conformity*. His TED talks have over 6.5 million views. I cite his [2026 predictions interview with *The Drum*](https://www.youtube.com/watch?v=6SXCJhqXubU) for the doorman fallacy and the warning that AI will first be misused as a cost-cutting tool — an argument that carries weight coming from someone who has spent nearly four decades watching businesses optimize the wrong things.
