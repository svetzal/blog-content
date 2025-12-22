---
title: "Did You Get the Memo?"
date: 2025-12-22
published: false
description: "Part two of four on Russell Ackoff's problem treatments. Today: resolution, or why your organization keeps adding process instead of fixing problems."
tags:
  - systems-thinking
  - leadership
  - organizational-design
---

Peter forgot the cover sheet on his TPS report.

If you've seen [Office Space](https://www.imdb.com/title/tt0151804/), you know what happens next. His boss, Bill Lumbergh, swings by to remind him. Then another manager stops by. Then another. Each one mentions the memo. The memo about the new cover sheets. Did Peter get the memo?

By the end of the scene, Peter has been reminded about this cover sheet by no fewer than four different people. Each interaction follows the same script: awkward pause, passive-aggressive phrasing, reference to the memo, suggestion that Peter should really have the cover sheet next time.

Here's what doesn't happen: nobody asks *why* TPS reports need cover sheets. Nobody asks what a TPS report even *is*, or who reads them, or whether anyone would notice if they stopped entirely. The organizational response to "someone forgot a cover sheet" is more memos, more reminders, more managers making sure you know about the memo.

That's resolution in action.

## The Good-Enough Trap

Last time, I talked about absolution — the art of hoping problems wander off on their own. But most of us can't quite commit to that level of magical thinking. We need to feel like we're *doing something*.

Enter resolution: taking action that reduces the immediate symptoms without changing anything fundamental.

Russell Ackoff described resolution as finding a "good enough" response. Not optimal. Not transformative. Just... sufficient to make the problem feel handled. The pressure drops. The complaint stops. We can move on to the next fire.

The TPS cover sheet situation is a perfect example. Somewhere, at some point, someone decided reports needed cover sheets. There was probably a reason. Maybe it made sense once. But now the cover sheet has become the point — and when cover sheets get forgotten, the organization doesn't question the process. It doubles down on enforcement.

More memos. More reminders. More managers stopping by your desk.

## Why We Do This

I want to be generous here, because resolution isn't laziness. It's often the pragmatic response to impossible constraints.

Think about what it would take to actually *solve* the TPS report problem at Initech. You'd need to ask fundamental questions: What are these reports for? Who uses them? What decisions do they inform? Are they even necessary anymore?

Those questions are scary. They imply that maybe the process is pointless. That maybe a lot of people's jobs involve pointless work. That maybe the whole system needs rethinking.

Resolution lets us avoid all of that. We patch the symptom. We add a reminder. We send another memo. The immediate friction goes away, and we can pretend we've handled it.

I've done this. (Yes, more than once.) You're exhausted. You're juggling twelve things. Someone surfaces a problem and you just need it to *stop being a problem right now*. So you apply the fix that makes the noise go away, knowing full well you're not addressing the root cause.

Sometimes that's the right call. Triage is real. Not everything can be a systemic overhaul.

But resolution becomes dangerous when it's the *only* move we know.

## The Process Accretion Problem

Here's how resolution tends to compound:

Someone forgets a step. We add a checklist. Someone skips the checklist. We add a sign-off. Someone rubber-stamps the sign-off. (Don't pretend you haven't seen this.) We add an audit. The audits get ignored. We add a meeting to review the audits.

Each layer makes sense in isolation. (And each one probably has a champion who'll defend it to the death.) Each one is a reasonable response to an observed failure. But zoom out and you've got bureaucratic sediment — layers of process built on top of process, each one a monument to a problem that was never actually solved.

I worked with an organization once that had accumulated an astonishing number of gates between "code complete" and "running in production." When I started counting with them, we got to fourteen. Fourteen. And most of them didn't *look* like approvals — which is how they'd accumulated without anyone noticing.

Let's count together. A simple feature needed:

1. Code review approval (two reviewers, because someone once merged bad code)
2. CI pipeline passing (unit tests, integration tests, security scan)
3. QA sign-off that the feature was "done" (because devs once shipped without testing)
4. UX review for UI changes (added after a branding incident)
5. Deployment to dev environment (manual approval, because automation once broke things)
6. Deployment to QA environment (separate approval, different team owns it)
7. Deployment to staging (requires a ticket, because someone skipped it once)
8. Product owner sign-off (because features once shipped that nobody asked for)
9. Architecture review board approval for anything "significant" (loosely defined)
10. Change Advisory Board slot (weekly meeting, two-week backlog)
11. Production deployment window approval (only Tuesdays and Thursdays)
12. Production deployment execution (different team, separate handoff)
13. Post-deployment verification sign-off (because rollbacks were once missed)
14. Documentation update confirmation (compliance added this one)

Every single one of these was added for a reason. Someone, somewhere, had a bad day, and the organizational response was: *add a gate*. Resolution upon resolution, stacked like geological strata.

And here's the part that makes it truly exhausting: while all these gates were accumulating, nobody slowed down the demand side. The sprint commitments stayed the same. The quarterly roadmap didn't shrink. Someone was still asking why features were taking so long, still tracking velocity, still wondering why the "resources" weren't being fully utilized.

So developers learned to work around the system. They'd batch changes to amortize the approval overhead. They'd start the CAB paperwork before the code was finished. They'd quietly skip the steps that seemed optional. The process became a game to be gamed — which, of course, led to more incidents, which led to more gates.

The deployments took weeks. The developers were demoralized. And the defects kept coming anyway — because the real problems (unclear requirements, insufficient automated testing, poor feedback loops) were never addressed. They just kept adding more gates while demanding more output.

That's the TPS cover sheet pattern at scale.

What happened next? We started asking "what decision does this gate enable?" — and discovered most of them enabled nothing. We shook out the pointless steps (ARB had nothing to add, the work had been pre-ordained, approvals just sat in a box). We replaced manual handoffs with automation that had real audit points. We invested in fast-rollback strategies so that deployments didn't need to be perfect, just recoverable. We got the right people into the room during "sprint review."

Fourteen gates became five. Deployments went from weeks to days. And the defect rate actually dropped — because developers could finally iterate fast enough to learn from their mistakes.

But that wasn't resolution. That was solution. We'll get there.

## Resolution vs. Solution

Resolution asks: *How do we make this symptom go away?*

Solution asks: *What's actually causing this, and what's the best response given our constraints?*

Subtle distinction. Changes everything.

Resolution focuses on the visible friction. Solution focuses on the underlying system. At Initech, resolution looks like memos and reminders and managers stopping by desks. Solution looks like asking what TPS reports accomplish, who needs them, and whether cover sheets add any value whatsoever.

But solution requires curiosity. It requires admitting we might not understand the problem yet. It requires the possibility that our current approach is wrong. Resolution is safer — it lets us act without questioning.

That's why we default to it. Resolution is the comfortable middle ground between ignoring problems and actually fixing them. But sometimes — when we've got the clarity to think it through — we can do better.

So here's my question for you: the next time someone proposes a new gate, a new checklist, a new sign-off — try asking: *What problem are we resolving here, and is there any way we could address it more directly, right here and now?*

You might be surprised how often the answer is yes.

---

*This is part two of a four-part series on Ackoff's problem treatments. Next up: solution, and the underrated skill of finding "optimal enough."*
