---
title: "What did we learn that changes the plan?"
date: "2026-10-01"
published: false
status: "working talk outline"
author: "Stacey Vetzal"
---

<!-- markdownlint-configure-file {"MD025": {"front_matter_title": ""}} -->

# What did we learn that changes the plan?

A talk about goals, feedback, and learning with AI agents. Working draft for
October 3-4, 2026; exact event date not yet supplied.

The audience is a mix of engaged professionals, many with an agile coaching
background. Assume experience with uncertainty and collaboration, but no
familiarity with Foundry or software internals. The [HTML deck](deck/index.html)
has 31 illustrated speaking slides, two reference slides, and a 38:55 timing
budget including participation. Its [presenter guide](deck/README.md) has the
current running order and a shorter route. This outline holds the deeper material.

## The idea to leave with

"Reveal the problem better using optionality as a design constraint."

Stacey's framing, October 1. Holding different possible approaches gives us
different ways to see the problem. Each exposes assumptions that a single
favoured solution can hide. Trying an approach produces evidence that can
change our understanding of the problem as well as the next implementation.

The design constraint is to keep meaningful alternatives practical to explore
as the system evolves. Some options can close deliberately. Protect the ones
that let us investigate important uncertainty without rebuilding everything.
This is a proposed discipline for the talk, not a claim that Foundry currently
generates three alternatives at every formation.

"The goal gives us direction. What we learn changes the next step."

A specification makes intent discussable and gives us something to test. The
problem starts when we treat our current understanding as complete, then explain
every failure as insufficient specification. Implementation can reveal facts
that change the plan, the design, or our understanding of success.

Foundry campaigns give this learning an explicit place. A campaign holds a
mission, constraints, and evidence for completion. After each implementation,
it reassesses the remaining mission against what now exists, what failed, and
what the current system makes possible. The next objective is a decision.

This is Stacey's connection to Kent Beck's talk. Beck did not describe or
endorse Foundry. The examples below show specific defects being caught and
corrected; they are not a comparative study of development methods.

## Original outline running order

The HTML deck develops optionality through a longer illustrated example before
the campaign cases. Its presenter guide is the current delivery order. The
earlier outline below remains useful as an alternative arrangement.

| Time | Question | Job of this section |
| --- | --- | --- |
| 0-3 | When did doing the work change your mind? | Start with the room's experience. |
| 3-7 | What can we reasonably ask of a spec? | Separate useful intent from assumed certainty. |
| 7-12 | What are we spending when we add a feature? | Introduce Beck's futures and mission ideas. |
| 12-16 | Who decides the next step? | Explain the campaign loop in ordinary language. |
| 16-22 | Did the checker actually check everything? | Walk the Mac example; invite a next-step choice. |
| 22-26 | What if we cannot account for the work? | Show the ops-01 persistence defect and changed approach. |
| 26-31 | What would change your next step? | Pair exercise using the audience's own work. |
| 31-35 | Can a learning loop fool itself? | Show Foundry's stale-state failure and limits. |
| 35-38 | How would we know the goal moved closer? | Return to outcomes and leave a practical experiment. |

These are speaking beats, not a finished slide count. Notes below are cues.
Keep the validator as the main example and return to it when explaining the loop.

## 1. When did doing the work change your mind?

Opening line to try:

"I've been building something that makes me decide what to do next over and
over. It's software. But the interesting part is what happens when the work
changes my mind."

Ask for a show of hands: "Who has learned something halfway through a piece
of work that changed what should have been decided at the start?"

Take one brief example if the room offers it. No round-robin. Acknowledge the
specific learning, then use it as a reference later.

Cues:

- Start with their experience of learning, before mentioning agents.
- Establish that changing course can be evidence of care and competence.
- Introduce Foundry as a tool I use to coordinate agents doing software work.

## 2. What can we reasonably ask of a spec?

Cues:

- I have seen disappointing results become a demand for a more complete spec.
- Sometimes the instruction was unclear. Sometimes the work exposed something
  we did not know when we wrote it.
- Keep the useful commitments: purpose, boundaries, examples of success, and
  things we must protect. Revisit assumptions when evidence changes.

Possible spoken line:

"If the only explanation for failure is that I didn't specify hard enough,
where does the learning go?"

Use a familiar example: improving onboarding. A precise checklist can describe
the intended steps. Watching someone try to join can reveal that the problem
is elsewhere. Label this as an illustration, not a reported Foundry result.

Keep this grounded in my experience. Avoid treating every practice called
spec-driven development as identical, or assigning motives to its users.

## 3. What are we spending when we add a feature?

Credit Kent Beck's Prodacity 2026 talk, published September 29.

Explain **features** as what the system can do now and **futures** as the
options available for changing it. Draw a simple qualitative sketch. Adding
capability can make the next change harder; consolidation can restore options.
No numeric axes or suggestion that these are measured quantities.

Cues:

- Speed can get us to a difficult-to-change system sooner, too.
- Learning may tell us to repair an approach before adding more capability.
- Later decisions can change earlier ones. That feedback deserves a place in
  how we organize work.

Then introduce Beck's sequence:
**Effort → output → outcome → mission**

An agent doing work is effort. A delivered validator is output. People finding
and correcting problems with it would be an outcome. More dependable work is
the intended contribution to a mission. Those last two require evidence from
use; the campaign records alone do not establish them.

Sources: [features and futures, around 20:00](https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=1200s),
[learning, around 31:30](https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=1890s),
[specification feedback, around 35:00](https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=2100s),
and [effort to mission, around 43:30](https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=2610s).
These are paraphrases from timestamped reading notes, not verbatim quotations.

## 4. Who decides the next step?

Bridge from Beck to Jerry Weinberg: different possible approaches can expose
different understandings of the problem. Stacey recalls his rule of three in
those terms. Treat that as a paraphrase until the exact book passage is
verified. Weinberg's own [problem-definition essay](https://secretsofconsulting.blogspot.com/2011/07/)
distinguishes a proposed solution from the problem it is intended to solve.

Visual cue: begin with people leaving an onboarding process. A shorter form
raises a question about effort; guided help raises a question about uncertainty;
deferring checks raises a question about timing. Reveal each alternative and
its question. These are hypotheses to investigate, not findings from a study.

Then show a system evolving. A rule initially reaches across the workflow.
Considering a different route exposes the assumption behind that coupling.
Reshape the system so another rule is practical to try, retain the existing
route, and observe what the experiment teaches us. The ability to explore a
different explanation becomes something the design must preserve.

These two visuals replace part of the verbal loop explanation below; keep
this section within its four-minute slot. The optional band sketch can show
the resulting room to change, but the main reveal is what alternatives teach
us about the problem.

Start with a small mission: help someone find problems in their agent guidance
before they rely on it. The validator in the next story belongs to Context
Mixer, which manages that guidance.

Describe the loop:

1. Look at the goal and the evidence we have now.
2. Choose one useful next objective.
3. Implement it and examine what actually happened.
4. Reassess the whole remaining goal. Choose again, stop with evidence, or ask
   for a human decision.

The reassessment includes work already done, failed approaches, review findings,
and constraints in the current system. A reviewer's repair list is an input;
the whole mission still matters. It may be sensible to continue the previous
objective. It may be sensible to change it.

The owner supplies direction, boundaries, and a limit on autonomous cycles.
The campaign does not grant itself an unlimited mandate when things get hard.

Visual cue for later slides: draw a return arrow from observed results to
assessment. Keep the goal visible above the loop. Draw "human decision" as a
real exit with a route back after a decision.

## 5. Did the checker actually check everything?

This ran on my Mac on September 30, Toronto time.

Reveal the story in stages:

1. I wanted a checker that inspected a collection of guidance records and
   named the file and field needing attention. It must not modify the
   collection or run the commands it was inspecting.
2. The first implementation stopped at the first malformed record. Its error
   reporting could turn part of an error message into a supposed filename.
   One test also used the wrong input format.
3. Review returned a defect. The implementation was retained for repair and
   did not land as accepted work.

Pause before revealing the next objective. Ask the room:

"What evidence would you want before relying on this checker?"

Give people 20 seconds to think. Take two responses, about 60 seconds total.
Listen for several broken records, exact locations, corrected inputs, and
evidence that checking changes nothing. Other useful answers are welcome.

Then reveal:

- The next cycle repaired the existing work and delivered more of the mission.
  Review still found inaccurate diagnostics. Useful partial work landed, with
  those gaps explicitly carried forward.
- The campaign stopped at its two-cycle limit. It needed an authorized extension.
- A third cycle corrected the remaining diagnostics and test integration.
  Real command-line tests checked the exact filename and field, broken and
  corrected inputs, and that a watched command was never executed.

End state: three implementation cycles, two landed cycles, and an explicit
completion assessment. "Landed" means integrated into the main source branch;
it is not a claim about deployment or user benefit.

Landing line to try:

"We learned where our evidence was weak. That changed the next piece of work."

Source: [the final correction and tests](https://github.com/svetzal/context-mixer2/commit/903d98f47e2da2a738162af4cb4467da19ed665e).
The private research companion retains the earlier review and decision records.

## 6. What if we cannot account for the work?

Move to the Linux operations host. Same learning loop, a different consequence.

Mission in ordinary language: make the work list honest, including the ability
to resume unfinished work and account for what happened.

The first resume implementation could report success and start work after
failing to save its lifecycle events. The existing event mechanism logged a
write error and kept going. Tests for a different storage failure did not
exercise this path.

Cues:

- A promise crosses several parts of a system. Each part can look reasonable
  while the promise fails between them.
- Review found the dependency on an event mechanism with the wrong failure
  behaviour for admission. The next objective changed to repairing that
  boundary, using the work already built.
- The correction made those persistence failures visible before dispatch.
  Tests used the real service with a working ledger and a failing event log.

Some successfully saved events can remain after an admission fails. The work
record must represent that honestly. A later cycle corrected documentation
that still promised no lifecycle events after a failed admission.

Return to the validator: both examples required examining the evidence at the
boundary where someone would rely on a promise. More feature output would
not have answered that concern.

Source: [admission correction and boundary tests](https://github.com/svetzal/foundry/commit/c86c5563ff6f31eae1783b2e62a1ef96e0f1556a).
This was one sequence within a larger campaign, not the whole campaign.

## 7. What would change your next step?

Five-minute exercise, including setup and debrief. Invite a neighbour
conversation; people can think or write alone if they prefer.

Ask participants to choose a real goal in their work. Offer onboarding as a
fallback. Put these prompts on one screen:

- What change are you trying to produce for someone?
- Name different approaches. What does each assume the problem is?
- What small experiment could distinguish those explanations, and what would
  you need to keep changeable to try another approach afterward?

Give pairs two minutes. Then take two examples, asking specifically what
decision the new evidence would change. If someone gives a deliverable,
ask what they hope someone will do differently because it exists.

Facilitator cue: avoid grading responses into a process template. Help each
person connect an observation to a decision. Use one example to show that a
result can justify continuing, revising, stopping, or seeking a decision.

"Is that an opportunity to make learning part of the work we authorize?"

## 8. Can a learning loop fool itself?

Yes. In July, Foundry's decision step inspected the main source branch while
the executor continued from a branch containing work that had not landed.
The decision step could not see the implementation it was supposed to learn
from. In one campaign it repeatedly called for substantially the same work
across nine cycles.

Cues:

- The loop was running. Its view of reality was wrong.
- The investigation changed the machinery so assessment could see accumulated
  work. Another change allowed useful partial work to land when required
  checks passed.
- This was found through an operational review of campaigns. Do not tell it
  as an autonomous campaign discovering and repairing its own design.

Human intervention also mattered in the recent examples: cycle extensions,
host problems, and conflicting instructions needed explicit handling. One
ops-01 correction was ready, but the owner required a Git operation that the
executor's instructions prohibited. Assessment surfaced the conflict; it did
not repeatedly dispatch the same impossible request.

Possible spoken line:

"Repeating a loop doesn't establish that we're learning. What changed in our
understanding, and what decision changed because of it?"

Keep the limits visible. These stories establish some caught defects and
changed decisions. They do not measure an overall defect rate, prove business
outcomes, or show that human judgement can be removed.

## 9. How would we know the goal moved closer?

Return to the opening audience example and Beck's effort-to-mission sequence.

The validator is now better supported by tests. We would still want to see
whether people can identify and fix real problems with it. That distinction
keeps a technically complete campaign from standing in for every kind of
success.

Invite one small experiment in the participant's next piece of work:

"Write down what you're trying to achieve, what you currently believe, and
what would make you choose differently. After you try it, compare. Give the
next decision the benefit of what you just learned."

Close by crediting Beck and the room's examples. Point to the recording and
the eventual talk page when one exists. Do not invent a published talk URL.

## Optional material and timing adjustments

For a 30-minute version, shorten Beck to three minutes, omit the separate
ops-01 story, and trim the final invitation by two minutes. Keep both
participation moments and the stale-state caution.

For a 40-minute version, use two more minutes for discussion after the pair
exercise. If there is a separate Q&A slot, hold questions that need technical
detail for it.

Technical appendix candidate: another ops-01 review found that a repository
reconciliation step could overwrite Git's shared fetch result, allowing
concurrent work to start from the wrong source commit. The correction tested
interleaved operations and preserved tags and starting commits. This is a
strong coupling example, but it needs more explanation than the main talk.
Source: [reconciliation and its regression tests](https://github.com/svetzal/foundry/commit/baf17e14d4f6e895692df5525d6f3f2b25180b11).

## Authoring home and publication path

This draft follows the existing `content/presentations/<talk-slug>/` convention
beside `finding-your-true-worth`. Slides, illustrations, and speaker notes are
in `deck/`. The deck uses standalone Reveal.js HTML, matching the CoCo LLM talk's
presentation format. Open `deck/index.html`; no build step is required.

The older `~/Work/Projects/Personal/presentations/` folder contains other decks
but is not currently a Git repository. The blog content repository gives this
talk version history and a natural home for later linking.

The site's current Astro collection loads only `content/posts/**/*.md`.
Saving this outline does not create a talk page or publish a deck. A later
publishing step can copy the deck to a stable path and add a blog post or
talk index linking to it. The title and structure here remain editable.

Private source notes and selected campaign events are in the Operations repo
at `Business/talks/2026-10-learning-toward-a-goal/`. Keep raw operational logs
and internal paths there when preparing public slides.
