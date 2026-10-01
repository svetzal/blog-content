/* Slide copy stays small. Notes are cues for the person in the room. */
window.TALK_SLIDES = [
  {
    id:'start', chapter:'Learning toward a goal', seconds:45, layout:'hero',
    title:'What did we learn that changes the plan?', kicker:'A little room to change our minds',
    byline:'Stacey Vetzal · October 2026', figure:'routes',
    alt:'A chosen route crosses a field of possible routes, changes direction, and reaches a new decision.',
    notes:['Set the human tone. This is an idea I am working through while building tools with AI agents.', 'The room already knows a lot about learning together. Invite that experience into the talk.']
  },
  {
    id:'changed-your-mind', chapter:'What experience teaches us', seconds:90,
    title:'When did doing the work change your mind?', kicker:'Start with your own experience', figure:'changeMind',
    caption:'A fact you could only discover by trying.',
    alt:'A straight plan meets new evidence. A revealed route bends around it toward a different next step.',
    notes:['Give the room 15 seconds to remember a specific moment.', 'Take two brief responses. What became visible only after starting?', 'Click to reveal the new route. Keep one response to return to at the end.']
  },
  {
    id:'spec-harder', chapter:'What experience teaches us', seconds:60,
    title:'When something fails, what do we question?', figure:'fixedPlan',
    caption:'A perfect spec can become an explanation for every failure.',
    alt:'Specify, build, deliver. A backward arrow blames the specification when delivery fails.',
    notes:['Describe the pattern I am seeing at work. Be generous about the desire for clarity.', 'Click: failure sends us back to write a more detailed spec. What if the work revealed something we could not have specified yet?', 'Avoid making colleagues the villains. The belief about certainty is what I want to examine.']
  },
  {
    id:'feedback', chapter:'What experience teaches us', seconds:70,
    title:'What can the next step teach us?', figure:'feedback',
    caption:'A result is allowed to change the question.',
    alt:'Belief leads to a trial and an observed result. Feedback returns to revise the belief.',
    notes:['A plan starts with what I believe. Trying it puts that belief in contact with the world.', 'Click the return path. The next step can change because my understanding changed.', 'Ask whether the loop in their work can change the question, or only the answer.']
  },
  {
    id:'useful-spec', chapter:'What experience teaches us', seconds:65,
    title:'What is a spec good for?', figure:'spec',
    caption:'Make our current understanding discussable.',
    alt:'A specification records purpose, boundaries, and evidence. A curved route still leads toward a goal.',
    notes:['Purpose, boundaries, evidence. Those are useful things to make explicit.', 'A spec can be precise and still rest on a mistaken assumption. What would let us find out?', 'Transition: how much room does our design leave for that discovery?']
  },
  {
    id:'futures', chapter:'Keeping room to learn', seconds:75,
    title:'What are we spending when we add a feature?', figure:'beck',
    caption:'Some choices make the next change harder.',
    source:'Conceptual sketch adapted from <a href="https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=1200s">Kent Beck, Prodacity 2026</a>. Qualitative axes; no measured values.',
    alt:'A qualitative curve falls as delivered features accumulate and options for change are consumed.',
    notes:['Credit Kent Beck. His features and futures framing gives me language for this.', 'Talk through one choice becoming entangled with others. The curve is a sketch, not a measured law.', 'What possibilities did our last feature make more expensive?']
  },
  {
    id:'recover-options', chapter:'Keeping room to learn', seconds:75,
    title:'Can we put some room back?', figure:'beck', variant:'restore',
    caption:'Reshaping the system can make another move practical.',
    source:'Conceptual adaptation of <a href="https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=1440s">Beck on consolidation and futures</a>. Shapes are illustrative.',
    alt:'A second path periodically regains options through consolidation instead of continuing to lose them.',
    notes:['Click to add the second path. Stop adding for a moment and reshape what is there.', 'This has a cost. What future change becomes cheaper or safer because we did it?', 'Room to change is something I can work on deliberately.']
  },
  {
    id:'option-band', chapter:'Keeping room to learn', seconds:75,
    title:'How much room do we still have to move?', figure:'band',
    caption:'Protect the alternatives that help us investigate uncertainty.',
    source:'Illustrative bands, not a count of options or a forecast.',
    alt:'One band narrows around a fixed path. Another repeatedly widens as the design is reshaped.',
    notes:['The band is the set of moves that remain practical. No units; do not read its width as a metric.', 'Some options should close. Keeping every possibility alive would be exhausting.', 'Which important uncertainty do I still need the freedom to explore?']
  },
  {
    id:'weinberg', chapter:'Alternatives help us see', seconds:70,
    title:'Can you see the problem from another approach?', figure:'lenses',
    caption:'An alternative exposes assumptions the first solution hides.',
    source:'Inspired by Gerald Weinberg\'s problem-definition work. Paraphrase, not a quotation.',
    alt:'Three possible approaches view the same problem from different positions.',
    notes:['Credit Jerry Weinberg and the invitation to find several ways of solving a problem.', 'The remembered three-solutions wording is unverified. Do not recite it as a sourced quotation.', 'Click twice. Each approach gives me another way to notice what I have assumed.']
  },
  {
    id:'one-explanation', chapter:'Alternatives help us see', seconds:70,
    title:'Why are people abandoning this form?', figure:'options',
    caption:'"Make it shorter" already contains a theory.',
    source:'Illustrative example.',
    alt:'A shorter form suggests effort is the problem. Other explanations have not yet been considered.',
    notes:['A familiar problem outside software too: people do not finish joining something.', 'I jump to a shorter form. I have quietly decided that effort is the problem.', 'What else could be happening? Take one quick suggestion, then advance.']
  },
  {
    id:'more-explanations', chapter:'Alternatives help us see', seconds:75,
    title:'What do the other approaches let us notice?', figure:'options', variant:'all',
    caption:'Effort, uncertainty, and timing suggest different experiments.',
    source:'Illustrative example. These are hypotheses to investigate.',
    alt:'A shorter form questions effort, a guided start questions unclear choices, and later checks question timing.',
    notes:['Click: a guided start assumes people need help understanding a choice.', 'Click: checking later assumes we are asking too much too soon.', 'Three different interventions expose three different beliefs. We still need evidence. Which small experiment would separate them?']
  },
  {
    id:'central-idea', chapter:'Alternatives help us see', seconds:55,
    title:'Reveal the problem better using optionality as a design constraint.', figure:'thesis',
    caption:'Keep another meaningful approach practical to try.',
    alt:'One path opens into alternatives, which converge into a better question.',
    notes:['Let the sentence sit. This is the claim I want to explore.', 'If another approach is impractical, I may never discover what it would have shown me.', 'What changes in the design when I take that seriously?']
  },
  {
    id:'coupled-system', chapter:'What optionality changes', seconds:75,
    title:'Where has one assumption spread?', figure:'system', variant:'coupled',
    caption:'One regional rule shapes the whole service.',
    source:'Illustrative system, not a Foundry incident.',
    alt:'Apply, check, notify, and support all depend directly on one regional rule.',
    notes:['Stay with the joining-service example. We built it around one regional rule.', 'Walk the lines. The same assumption has spread through applying, checking, notifications, and support.', 'How expensive would it be to try a different rule now?']
  },
  {
    id:'another-region', chapter:'What optionality changes', seconds:65,
    title:'What would trying another region reveal?', figure:'system', variant:'question',
    caption:'The alternative shows us where the assumption is embedded.',
    source:'Illustrative system.',
    alt:'Considering another region highlights dependencies on the existing regional rule.',
    notes:['Click the new region. Before implementing it, follow the consequences through the current service.', 'The alternative is a probe. It reveals which parts of the system I have tied together.', 'We may decide against expanding. The design knowledge is still useful.']
  },
  {
    id:'make-a-boundary', chapter:'What optionality changes', seconds:75,
    title:'What can we reshape to make that practical?', figure:'system', variant:'boundary',
    caption:'Give the uncertain rule a boundary of its own.',
    source:'Illustrative design choice, not a universal architecture prescription.',
    alt:'A policy boundary separates variable regional rules from the rest of the service.',
    notes:['Move the regional policy behind one clear boundary. The rest of the service uses its answer.', 'There is work here. I would need evidence that this boundary earns its cost.', 'Which change can now stay local? Which uncertainty is still unresolved?']
  },
  {
    id:'try-another-rule', chapter:'What optionality changes', seconds:65,
    title:'What can we try without rebuilding everything?', figure:'system', variant:'try',
    caption:'The design now supports a different question.',
    source:'Illustrative system. Both paths need appropriate checks.',
    alt:'The existing rule remains available while another rule can be tried through the shared policy boundary.',
    notes:['Now a new rule can be tried while the existing one remains available.', 'We have changed the cost of asking a question. Is that an opportunity?', 'Transition to real examples: how can an agent workflow leave room for discoveries to change its next objective?']
  },
  {
    id:'campaign', chapter:'Learning in actual work', seconds:80,
    title:'What if the goal outlives the current plan?', figure:'loop',
    caption:'Foundry campaigns choose the next objective from current evidence.',
    source:'Foundry campaign model; evidence and implementation links in the reference slides.',
    alt:'A mission guides a cycle of assessment, choosing an objective, implementation, and new evidence.',
    notes:['Introduce Foundry simply: my tool for coordinating engineering work with agents.', 'A campaign holds a mission, constraints, and evidence for completion. One cycle chooses and attempts a bounded objective.', 'Afterward, assess the remaining mission again. Foundry does not currently promise three alternatives per cycle; that is a design discipline I am exploring here.']
  },
  {
    id:'reassess', chapter:'Learning in actual work', seconds:75,
    title:'What is true now?', figure:'reassess',
    caption:'The whole mission gets another look.',
    alt:'Assessment considers what exists, what failed, current constraints, and what remains unknown.',
    notes:['A task can succeed while the mission remains unfinished.', 'Current implementation and evidence matter. The next objective cannot be copied blindly from the previous plan.', 'Introduce the checker: a real campaign on my Mac. What does the checker actually have to prove?']
  },
  {
    id:'checker-goal', chapter:'The checker that stopped checking', seconds:60,
    title:'Did the checker actually check everything?', figure:'validator',
    caption:'A useful report must tell us where the problems are.',
    source:'Mac · context-mixer2 Atlas contract campaign · September 30, 2026. Four records are illustrative.',
    alt:'Four representative records await inspection. The mission requires every record, precise locations, and no modification.',
    notes:['A repository contains structured records. I need a checker that inspects them and reports useful errors without changing the repository.', 'Translate the goal for the room: checking documents for errors, then telling someone exactly what to fix.', 'Four records here stand in for the input set; this is not a count from the incident.']
  },
  {
    id:'first-failure', chapter:'The checker that stopped checking', seconds:80,
    title:'It found an error. Had it done the job?', figure:'validator', variant:'first',
    caption:'The first malformed record stopped the inspection.',
    source:'Campaign cycle 1 · preserved as a defect.',
    alt:'The checker finds the first malformed record and stops, leaving the remaining records unchecked.',
    notes:['The first attempt stopped on the first malformed record. One true error report concealed an incomplete inspection.', 'Other gaps included corrupted filenames from parsing formatted errors, and a test using the wrong input schema.', 'The implementation made the weakness concrete. What would convince us the next attempt had solved it?']
  },
  {
    id:'convincing-evidence', chapter:'The checker that stopped checking', seconds:90,
    title:'What evidence would change your mind?', figure:'evidence',
    caption:'Take 20 seconds. What would you deliberately make go wrong?',
    alt:'Three questions ask about multiple failures, exact file and field locations, and whether anything was modified.',
    notes:['Pause for 20 seconds. Invite two brief answers.', 'Look for multiple bad records, exact locations, and proof the checker did not change anything.', 'Connect audience answers to the actual correction. We need examples that distinguish an adequate checker from this particular inadequate one.']
  },
  {
    id:'keep-checking', chapter:'The checker that stopped checking', seconds:65,
    title:'Can it find the second problem too?', figure:'validator', variant:'all',
    caption:'Make the failure visible, then keep inspecting.',
    source:'Conceptual illustration of the repaired behavior. Records and error locations are illustrative.',
    alt:'The checker inspects all four representative records and reports errors in the first and third.',
    notes:['Show how the required behavior differs. A malformed record is something to report; the remaining records still need inspection.', 'Precise filenames and fields make those reports actionable. Broken-then-corrected examples challenge the behavior in both directions.', 'What changed? We can now explain what the checker must do when part of its input is wrong.']
  },
  {
    id:'three-cycles', chapter:'The checker that stopped checking', seconds:80,
    title:'What did each attempt leave us knowing?', figure:'cycles',
    caption:'The next objective came from the remaining gap.',
    source:'3 cycles; 2 landed. <a href="https://github.com/svetzal/context-mixer2/commit/903d98f47e2da2a738162af4cb4467da19ed665e">Final diagnostic and manifest correction</a>.',
    alt:'Cycle one preserves a defect, cycle two lands useful work with gaps, and an authorized third cycle completes the mission.',
    notes:['Cycle 1: defect preserved. Cycle 2: useful work lands; diagnostics still have explicit gaps.', 'The two-cycle limit stopped further work. Owner authorization allowed cycle 3 to close the remaining diagnostics and manifest-target checks.', 'Tests checked exact file and field, broken then corrected input, and that validation did not run unintended execution. Completion came from assessing the mission.']
  },
  {
    id:'useful-remainder', chapter:'Learning in actual work', seconds:70,
    title:'Can useful work land while the goal stays open?', figure:'partial',
    caption:'Keep the progress. Make the remainder visible.',
    alt:'Some work is integrated while explicit gaps guide the next objective. Task completion differs from mission completion.',
    notes:['Return to cycle 2. The work was useful enough to land, but it did not close the mission.', 'A remainder is information for the next assessment. Hiding it would make progress look better and the next decision worse.', 'What would your workflow do with useful but incomplete work?']
  },
  {
    id:'unrecorded-work', chapter:'A boundary we had to change', seconds:80,
    title:'What if work starts but its record cannot be saved?', figure:'admission', variant:'bad',
    caption:'The system could report success after an event write failed.',
    source:'ops-01 · Foundry work-settlement campaign · cycle 3 finding.',
    alt:'A resume request attempts to save events. The save fails, yet work starts anyway.',
    notes:['Second real example, on the ops host. Foundry itself is the system under examination.', 'An event writer swallowed persistence errors and could broadcast anyway. Resume could appear successful and start work despite failure to record the required events.', 'Existing tests failed the ledger save. They had not failed the event writes. Where should the decision to start work live?']
  },
  {
    id:'durable-admission', chapter:'A boundary we had to change', seconds:75,
    title:'Where does the decision to start belong?', figure:'admission', variant:'gate',
    caption:'Required records must persist before work starts.',
    source:'ops-01 · cycles 4-5 · <a href="https://github.com/svetzal/foundry/commit/c86c5563ff6f31eae1783b2e62a1ef96e0f1556a">Admission-boundary correction</a>.',
    alt:'The corrected boundary prevents work from starting when required admission records fail to persist.',
    notes:['The correction put the gate at actual admission to work. Persistence failure must reach the caller.', 'Cycle 4 landed the correction with a documentation gap. Cycle 5 corrected the contract description.', 'Precision matters: successfully persisted events or a staged failed child can remain. The guarantee is that failed admission does not start work, not that failure erases every trace.']
  },
  {
    id:'stale-state', chapter:'The loop needs scrutiny too', seconds:85,
    title:'Can a learning loop keep looking at the wrong thing?', figure:'stale',
    caption:'Reassessment only helps if it can see what changed.',
    source:'Human-led Foundry effectiveness review · July 22, 2026. Historical incident, not a current performance measure.',
    alt:'Assessment reads old state while implementation has new work. It repeatedly reports something missing that was already implemented.',
    notes:['In an earlier operational review, formation read main while execution progressed on preserved branches.', 'Click: assessment could keep asking for work that already existed. Nine repeated objectives were documented.', 'A human-led review found this failure of the engine. Visibility into accumulated state and landing green remainders changed afterward. Do not present this as autonomous self-repair.', 'What does your review process fail to see?']
  },
  {
    id:'owner-decision', chapter:'The loop needs scrutiny too', seconds:65,
    title:'Who decides when the limits need to change?', figure:'human',
    caption:'Evidence can justify another cycle. Authorization still belongs to someone.',
    alt:'The campaign reaches its authorized limit. An owner must decide whether to permit another step.',
    notes:['Return to the checker: the third cycle needed owner authorization.', 'A goal does not authorize unlimited work. Constraints are part of the current state too.', 'The ops campaign also hit a required sync that its executor was forbidden to perform. The owner handled that boundary. Keep this detail for questions if time is tight.']
  },
  {
    id:'your-experiment', chapter:'Try it with your own work', seconds:180,
    title:'What would another approach help you notice?', figure:'exercise',
    caption:'Pairs · 3 minutes · A goal you are working toward this week.',
    alt:'A real goal branches into different approaches, their assumptions, and one small experiment.',
    notes:['First minute: one person offers a real goal. Together, find three meaningfully different approaches.', 'Second minute: name what each approach assumes. What did comparing them reveal about the problem?', 'Last minute: choose one small experiment and name the design choice that would keep another approach practical.', 'At 150 seconds invite one short response. What changed in how you saw the problem? Three is a prompt to stretch, not a compliance target.']
  },
  {
    id:'mission', chapter:'What progress would mean', seconds:80,
    title:'What would tell us the goal is closer?', figure:'mission',
    caption:'A finished task is evidence about an output. Keep looking outward.',
    source:'Adapted from <a href="https://www.youtube.com/watch?v=F8fBgDCf2Y4&t=2610s">Kent Beck on effort, output, outcome, and mission</a>.',
    alt:'Effort produces outputs that may change outcomes and advance a mission. Each connection requires evidence.',
    notes:['Credit Kent again. Walk outward: effort, output, outcome, mission. The arrows are questions, not guarantees.', 'Return to the checker. Running it is activity; a useful report is output; people reliably finding and fixing the right problems is closer to an outcome.', 'What evidence would connect what you delivered to the purpose you started with?']
  },
  {
    id:'choose-again', chapter:'Take a question with you', seconds:65,
    title:'What did we learn that changes the plan?', figure:'closing',
    caption:'Keep enough room to ask a better question.',
    alt:'Trying and learning change the route. The next decision still has several possible paths.',
    notes:['Return to an opening audience example. Their experience already contains this move.', 'Offer the experiment: at the next planning conversation, name one alternative and what it lets you see.', 'Leave the question hanging. Point people to Kent and Weinberg in the reference slides. Invite conversation.']
  },
  {
    id:'influences', chapter:'References', seconds:0,
    title:'Ideas to keep exploring',
    body:'<ul class="sources-list"><li><a href="https://www.youtube.com/watch?v=F8fBgDCf2Y4">Kent Beck · Prodacity 2026</a><small>Features and futures, consolidation, learning, and mission. See roughly 20:00-29:00, 31:30, 35:00, and 43:30.</small></li><li><a href="https://secretsofconsulting.blogspot.com/2011/07/">Gerald Weinberg · A Universal Starting Point for Problem-Solving</a><small>July 29, 2011. Problem definition and proposed solutions. The remembered three-solutions wording has not been verified.</small></li><li>Stacey Vetzal · Optionality as a design constraint<small>The connection developed here is my interpretation. It is not a claim that Beck or Weinberg described or endorsed Foundry.</small></li></ul>',
    notes:['Reference slide; outside the timed talk.', 'Kent source note is a timestamped summary, not a verbatim transcript. The diagrams here are original conceptual adaptations.']
  },
  {
    id:'case-sources', chapter:'References', seconds:0,
    title:'The implementation evidence',
    body:'<ul class="sources-list"><li><a href="https://github.com/svetzal/context-mixer2/commit/903d98f47e2da2a738162af4cb4467da19ed665e">Mac · precise diagnostics and manifest checks</a><small>context-mixer2 Atlas campaign. Three cycles; two landed; the third required authorization.</small></li><li><a href="https://github.com/svetzal/foundry/commit/c86c5563ff6f31eae1783b2e62a1ef96e0f1556a">ops-01 · durable work admission</a><small>Required event-persistence failures must stop admission to work.</small></li><li><a href="https://github.com/svetzal/foundry/commit/baf17e14d4f6e895692df5525d6f3f2b25180b11">ops-01 · repository synchronization boundary</a><small>Additional technical example: fetch side effects, then a sync step outside executor authority. No live deployment was claimed.</small></li></ul>',
    notes:['Selected implementation links. Private campaign events and the historical effectiveness review are retained in the Operations research dossier.', 'These are case accounts. They do not establish a comparative success rate for development methods.']
  }
];
