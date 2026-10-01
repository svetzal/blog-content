# What did we learn that changes the plan?

A standalone Reveal.js presentation, following the HTML format used for the
CoCo LLM talk. The deck has 31 illustrated speaking slides and two reference
slides. Its timing budget is 38 minutes 55 seconds, including participation.

## Present

Open [index.html](index.html) in a browser. The deck, illustrations, and speaker
view work offline. There is no build step and no external font or image request.
External source links need a network connection.

For a local web preview, run this command from this directory:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/>. Use a separate browser window for speaker view.

| Control | Action |
| --- | --- |
| Right arrow or Space | Advance a reveal or slide |
| Left arrow | Step backward, including reveals |
| O or Escape | Slide overview |
| S | Speaker view with notes, next slide, and timings |
| F | Full screen |
| B | Blank the presentation |

The buttons at the bottom provide the same main controls. On touch screens,
use the arrow buttons. Slide URLs retain the current slide's readable identifier.

## Speaking shape

| Approximate time | Slides | Question |
| --- | --- | --- |
| 0:00-5:30 | 1-5 | What does doing the work let us learn? |
| 5:30-13:45 | 6-12 | How do alternatives help reveal the problem? |
| 13:45-18:25 | 13-16 | How does protecting an alternative change the design? |
| 18:25-28:25 | 17-24 | What did the checker campaign learn? |
| 28:25-33:30 | 25-28 | What can go wrong in the learning loop itself? |
| 33:30-36:30 | 29 | Pair exercise using a real goal |
| 36:30-38:55 | 30-31 | What evidence connects the next step to the mission? |

Audience participation includes an opening recollection, a brief invitation to
suggest evidence for the checker, and a three-minute pair exercise. Speaker
notes contain cues and factual boundaries, rather than a script to read aloud.

For a shorter delivery, skip slides 8, 10, 14, 16, 18, 24, and 28. Reduce the
opening exchange to 45 seconds. This keeps both real cases and the pair exercise
and brings the budget to about 30 minutes. The longer outline remains a source
of explanation, not a second script to fit into this timing.

## Edit

- `slides.js` holds slide copy, notes, source links, accessible descriptions,
  and per-slide timings.
- `figures.js` holds the editable SVG illustrations and their staged reveals.
- `theme.css` holds the paper, ink, teal, and rust visual treatment.
- `deck.js` renders the slides and initializes navigation and speaker view.
- `vendor/reveal/` holds Reveal.js 6.0.2, its MIT license, and npm provenance.

Each main slide has one question or idea and one illustration. The charts and
bands are conceptual. Their shapes and widths do not encode measured values.
The service-design example is invented; the two campaign cases are sourced.

## Sources and limits

Kent Beck's talk is linked on the relevant slides. These are conceptual
adaptations, not screenshots of his diagrams. The local source note is a
timestamped summary, not a verbatim transcript.

The Weinberg connection is paraphrased. The remembered wording of the
three-solutions rule has not been verified. The deck does not present it as a
direct quote.

Foundry's cases have implementation links in the slides and a private evidence
dossier in Operations. Raw operational logs are not bundled here. The earlier
stale-state incident was found in a human-led review. These cases do not measure
the relative effectiveness of development methods. Foundry does not currently
generate three alternatives at every campaign cycle.

This folder is a local draft. It is not connected to the blog's published routes.
It can later be copied to a stable public path and linked from a talk page.
