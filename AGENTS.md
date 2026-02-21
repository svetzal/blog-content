# Blog Content Repository - AI Agent Instructions

## Work Logging

**Client Code:** `personal`

When logging work for this blog, always use `--client personal`:

```bash
# Log work activity
uv run evt log work --client personal --activity "Wrote blog post on cognitive biases" --hours 1.5
```

This repository contains markdown content for Stacey Vetzal's personal blog ("Stacey on Software"), managed with Obsidian and published via Gatsby to [stacey.vetzal.com](https://stacey.vetzal.com).

## Folder Structure and Deployment Architecture

This content repo is embedded as a **git submodule** inside the site repo:

```
~/Work/Projects/Personal/stacey-blog/     # Parent: git@github.com:svetzal/stacey.vetzal.com.git
├── content/                               # THIS REPO (submodule → https://github.com/svetzal/blog-content.git)
│   ├── posts/YYYY/                        # Blog posts by year
│   ├── assets/                            # Shared assets
│   ├── presentations/                     # Slidev presentations
│   ├── .claude/skills/                    # Claude Code skills (image generation, presentations, etc.)
│   └── AGENTS.md                          # This file
├── src/                                   # Gatsby theme customizations
├── gatsby-config.js                       # Site config
├── amplify.yml                            # AWS Amplify build spec
└── publish.sh                             # Publish script
```

**Claude Code should be launched in the `content/` directory** for content authoring work. This ensures CLAUDE.md, AGENTS.md, skills, and all content conventions are picked up correctly.

## Publishing

After content work is complete, publishing is done from the **parent repo** (`stacey-blog/`):

```bash
cd ~/Work/Projects/Personal/stacey-blog
./publish.sh                          # Default commit message
./publish.sh "New post on TDD"        # Custom commit message
```

The publish script:

1. Commits and pushes any pending changes in this content repo
2. Updates the submodule ref in the parent repo
3. Commits and pushes the parent repo, triggering an AWS Amplify deploy

**Do not push the parent repo manually** — always use `publish.sh` to ensure the submodule ref stays in sync.

## Content Organization

### Blog Posts (`posts/`)
- Posts are organized by year in `posts/YYYY/` directories (e.g., `posts/2025/`, `posts/2024/`)
- Post filenames follow the pattern: `YYYY-MM-DD-slug.md`
- Each YYYY directory may have an associated `images/` subdirectory for post-specific images (e.g., `posts/2024/images/`)

## Frontmatter Conventions

### Published Blog Posts
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"  # or date: YYYY-MM-DD (without quotes)
published: true
description: "Optional description"
tags:
  - tag1
  - tag2
image: images/filename.png  # relative to post directory
imageAlt: "Alt text for image"
---
```

### Draft Posts and Knowledge Base Notes
```yaml
---
date: "YYYY-MM-DD"
published: false
---
```

**Key Patterns:**
- `published: true` indicates ready-to-publish blog posts
- `published: false` or missing `published` field indicates drafts/notes
- Dates can be quoted strings or unquoted (both formats exist in the codebase)
- Tags are optional and use YAML list format
- Knowledge base notes typically have minimal frontmatter

## Content Conventions

### Obsidian-Specific Syntax
- Wiki-style links: `[[Page Name]]` or `[[filename]]`
- Image embeds: `![[image-filename.jpeg]]`
- These links work in Obsidian but may need transformation for the blog platform

### Images
- Blog post images stored in `posts/YYYY/images/` subdirectories
- Generic assets in `assets/` (e.g., `assets/avatar.jpg`, `assets/gatsby-icon.png`)
- Some images referenced with full paths, others with relative paths

## Topic Focus

This blog covers software development, agile practices, design thinking, and cognitive biases:
- **Technical content**: TDD, software design, development practices
- **Process/Methodology**: Agile coaching, project estimation, team dynamics
- **Thinking**: Cognitive biases, problem-solving approaches
- **Personal**: Retro computing, professional reflections

## When Creating/Editing Content

1. **New blog posts**: Create in `posts/YYYY/` using the filename pattern `YYYY-MM-DD-descriptive-slug.md`
2. **Draft posts**: Set `published: false` in frontmatter
3. **Knowledge base notes**: Place in root directory with minimal frontmatter
4. **Links between notes**: Use `[[wiki-style]]` links for Obsidian compatibility
5. **Images for posts**: Store in corresponding `posts/YYYY/images/` directory
6. **Publishing**: Set `published: true` and ensure all required frontmatter fields are present

## Image Generation

Blog posts use a consistent visual system featuring a silver-haired woman systems thinker in a cyberpunk style. A Claude Code Skill at `.claude/skills/blog-image-generator/` handles image generation.

**Character Variant:** This blog exclusively uses the `cyberpunk` character variant from `.claude/skills/blog-image-generator/character-variants/cyberpunk.json`. Do not use other character variants.

**Scene Variants:** Scene style variants are available in `.claude/skills/blog-image-generator/scene-variants/`. The default is `cyberpunk.json`.

### Image Types

| Type | Aspect Ratio | Size | Purpose |
|------|--------------|------|---------|
| `banner` | 16:9 | 1536x1024 | Hero image at top of article |
| `callout` | 1:1 | 1024x1024 | Inline illustration within article |
| `diagram` | 9:16 | 1024x1536 | Tall infographic or process diagram |

### Procedure for New Articles

1. **Read baseline specs** in `.claude/skills/blog-image-generator/baselines/`:
   - `banner.json`, `callout.json`, `diagram.json` — image type templates
   - `scene.schema.json` — full schema reference

2. **Create scene JSON** in `posts/YYYY/images/` with same base filename as image:
   - Article: `posts/2025/2025-12-29-my-article.md`
   - Banner spec: `posts/2025/images/my-banner.json`
   - Banner image: `posts/2025/images/my-banner.png`

3. **Design props by category**:
   - **Character props**: Wardrobe items (blazer, glasses, leather coat)
   - **Article props**: Objects from article content with symbolic meaning
   - **Environment props**: Setting elements (furniture, architecture)

4. **Match mood to content**:
   - Optimistic: warm lighting, collaborative scenes, slight smile
   - Analytical: cool blue tones, focused expression, clean environment
   - Frustrated: harsh contrasts, exasperated expression, chaotic elements
   - Contemplative: soft diffused lighting, distant gaze, quiet setting

5. **Generate image**:

```bash
# First time setup
cd .claude/skills/blog-image-generator/scripts
npm install
cd ../../../..

# Generate image
node .claude/skills/blog-image-generator/scripts/generate-image.mjs \
  posts/YYYY/images/scene-name.json \
  posts/YYYY/images/scene-name.png
```

Requires `OPENAI_API_KEY` environment variable.

6. **Update article frontmatter**:

```yaml
image: images/scene-name.png
imageAlt: "Description of the scene for accessibility"
```

### File Organization

```
posts/2025/images/
├── article-banner.png        # Generated banner
├── article-banner.json       # Banner specification
├── article-callout-1.png     # Inline callout
├── article-callout-1.json    # Callout specification
└── article-diagram.png       # Process diagram
```

The skill documentation (`.claude/skills/blog-image-generator/SKILL.md`) contains full examples and detailed instructions.

## Presentation Generation

Blog content can be converted to Slidev markdown presentations, or talks can be created from scratch. A Claude Code Skill at `.claude/skills/slidev-presentation/` handles presentation creation.

### Presentation Types

| Type | Slides | Template | Best For |
|------|--------|----------|----------|
| Conference talk | 20-40 | `talk-from-scratch.md` | Full-length presentations |
| Blog conversion | 10-25 | `blog-post-conversion.md` | Turning articles into talks |
| Technical demo | 10-20 | `technical-demo.md` | Code-heavy walkthroughs |
| Lightning talk | 7-10 | `lightning-talk.md` | 5-minute rapid talks |

### Procedure for New Presentations

1. **Determine type** — conference talk, blog conversion, technical demo, or lightning talk
2. **Read SKILL.md** at `.claude/skills/slidev-presentation/SKILL.md` for the full procedure
3. **Select template** from `.claude/skills/slidev-presentation/templates/`
4. **Create output** in `presentations/<talk-slug>/slides.md`

### Procedure for Blog Post Conversion

1. **Read the source post** and identify sections, quotes, code blocks, and key insights
2. **Read the blog conversion template** at `.claude/skills/slidev-presentation/templates/blog-post-conversion.md`
3. **Map post structure to slides** — one concept per slide, distill paragraphs to bullets
4. **Write slides** with speaker notes containing the deeper context from the original post
5. **Output** to `presentations/<talk-slug>/slides.md`

### Running Presentations

The `presentations/` directory has a shared `package.json` with Slidev dependencies. First-time setup:

```bash
cd presentations
npm install
```

Then run from within any presentation folder:

```bash
cd presentations/talk-slug
npm run dev -- slides.md          # Development server (opens browser)
npm run build -- slides.md        # Build for production
npm run export -- slides.md       # Export to PDF
```

**Do NOT use `npx slidev`** — it fails to install the theme non-interactively. Always use the npm scripts from the shared `presentations/package.json`.

The skill documentation (`.claude/skills/slidev-presentation/SKILL.md`) contains full syntax reference, design principles, and detailed instructions.

### Presentation Images

Custom images for presentations (cover art, concept illustrations, section breaks, backgrounds) are generated by a separate skill at `.claude/skills/presentation-image-generator/`. This skill uses an abstract-first approach (character OFF by default) and supports multiple visual styles via scene variants (`clean-tech`, `abstract-data`, `cyberpunk`, `organic`, `architectural`). See `.claude/skills/presentation-image-generator/SKILL.md` for the full procedure.

## Files to Ignore

- `.obsidian/` directory (Obsidian configuration)
- `.DS_Store` (macOS system files)

## Markdown Conventions

- Use standard markdown syntax for headings, lists, code blocks, etc.
- **Do not include H1 (`#`) titles in blog post content** — the publishing platform generates the H1 from the frontmatter `title` field
- Blog post body headings should start at H2 (`##`) and increment by one level only (no skipping from `##` to `####`)
- Put blank lines above and below bulleted lists, numbered lists, headings, quotations, and code blocks

## Writing Posts - Stacey Vetzal's Style Guide

When writing blog posts, follow these guidelines:

### Input Material
The user must provide an anecdote or opening vignette as the seed for the story.

### Overall Tone and Voice
Adopt a **conversational, first-person tone** — insightful, warm, and reflective.
Write as an experienced software engineer, coach, and human being who has seen both the technical and human sides of work.
Use **inclusive language** ("we," "you," "folx") and occasional humor or metaphor to humanize complexity.
Confidence without arrogance; empathy without sentimentality.
Contractions and natural speech rhythms are essential.

### Structure and Flow
1. **Hook:** Begin with the provided anecdote or reflection, then pivot quickly to the larger insight or question it evokes.
2. **Exploration:** Expand the idea across 2–4 short sections. Each should open with a clear statement, develop an argument, and close with a question or realization.
3. **Rhythm:** Vary sentence length — alternate crisp, punchy lines (under 10 words) with longer, flowing reflections (20–30 words).
4. **Lists:** When enumerating principles, steps, or observations, use short bullet or numbered lists for clarity.
5. **Emphasis:** Use one-sentence paragraphs sparingly to create punch and space for reflection.

### Stylistic Markers
- Include **rhetorical questions** to engage curiosity ("Why do we keep doing this?").
- Use **parenthetical asides** for wit or humility ("(yes, I've done this too)").
- Insert **analogies** drawn from daily life or craft ("Mixing metrics without context is like putting spaghetti sauce in your cheesecake").
- Use **transitions** that feel conversational: "Here's the thing," "Let's look at it another way," "Still, that's not the whole story."
- Introduce at least one **micro-story** beyond the opening (e.g., an example or coaching moment).

### Values and Themes
Subtly weave in Stacey's enduring themes:
- Code as communication — empathy and clarity in technical expression.
- The interplay between human systems and software systems.
- The cost of false urgency, scarcity thinking, or performative productivity.
- Inclusion, collaboration, and humility as leadership virtues.
- Curiosity as the antidote to cynicism.

### Measurable Style Targets (from writing-style research)
- Mean sentence length: ~18 words (±6).
- At least one rhetorical question per 250 words.
- Paragraphs 2–5 sentences long.
- First-person pronouns ("I", "we") appear ≥2× as often as third-person ones.
- Maintain readability around Grade 8–10 (Flesch-Kincaid).

### Closing
Conclude with one of:
- A **call to reflection** ("Maybe the real challenge isn't the code — it's us.")
- A **hopeful reframing** ("That's the opportunity I keep coming back to.")
- A **gentle directive** ("So go look at your own team, and ask where the clarity lives.")

### Post-Draft Reflection (Optional)
After writing, include a short hidden note explaining how this draft matches Stacey's voice in tone, structure, and values.
Then remove that note before publishing.

**Goal:** The finished post should feel unmistakably like Stacey Vetzal wrote it — a mix of lived experience, technical wisdom, human insight, and quiet humor that invites the reader into both thought and action.

## Presenting - Stacey Vetzal's Presentation Style Guide

When writing speaker notes, slide content, or presentation scripts, follow these guidelines to capture Stacey's presenter voice. This voice is intentionally less polished than the writing voice — it's passionate, exploratory, and unapologetically human.

### Overall Delivery Voice
Adopt a **passionate, unscripted, thinking-out-loud tone** — the audience should feel like they're watching someone reason through ideas in real time, not recite a prepared speech.
Confidence comes from experience, not from polish. Self-deprecating humor and open uncertainty are features, not bugs.
The presenter is a practitioner who has done the work, not a theorist lecturing from above.

### Signature Rhetorical Moves

- **Fair warning disclaimers** to build rapport and set expectations: "Fair warning, I'm old and crusty."
- **Rhetorical questions as transitions** — questions drive the talk forward, not slide titles: "Do you write test first on your spike stories? Hmm. Is that an opportunity?"
- **The planted pause** — drop a provocative statement, then invite the audience to sit with it: "Think about that a minute."
- **Self-answering questions** — ask, then answer, creating a conversational call-and-response rhythm with herself.
- **"Is that an opportunity?"** — Stacey's signature phrase. Plants a seed of possibility rather than dictating a conclusion.
- **"Call your shot, take your shot"** — a teaching mantra for iterative, test-first thinking.
- **Generous attribution** — openly credits influences: "I totally wholeheartedly stole that from Michael Bolton and James Bach." This builds authority through intellectual honesty, not ego.
- **Reframing known concepts** — takes familiar ideas and flips them: "rejection criteria" instead of "acceptance criteria." Makes the audience see something old in a new way.

### Structure and Flow

1. **Warm-up with a disclaimer or self-deprecating aside** — set the human tone before the content begins.
2. **Question-driven progression** — the talk advances through questions, not through a rigid outline. Each section opens with a question that the audience wants answered.
3. **One sustained example as through-line** — pick a single concrete example (e.g., an elevator) and return to it throughout. Don't scatter across many competing examples.
4. **Layered reveals** — introduce an idea simply, then peel back layers across the talk. Each pass adds depth without contradicting the previous understanding.
5. **Live demonstration as centerpiece** — whenever possible, show real exploration, not polished demos. The stumbles and corrections ARE the teaching.
6. **Provocative bomb-drops** — state something controversial casually, then pause: "Writing code might be the least useful thing your developers can do for you." Let it land.
7. **Close with community** — point people to resources, communities, and thinkers. Leave them with paths to keep learning, not just a summary of what was said.

### Engagement Patterns

- **Inclusive assumptions** — "Are folks familiar with that testing quadrants diagram? Let's assume we aren't." Never alienate newcomers.
- **Invitations, not commands** — "Think about that a minute" not "You need to understand this."
- **Humble uncertainty as teaching tool** — "How do you know the right level of abstraction? I never do. Scientific method — try a thing, see if it works, iterate."
- **Pop culture and daily life references** — "The Friends episode naming convention" — ground abstract ideas in shared cultural experience.
- **Cross-domain analogies** — connect software concepts to physical engineering, everyday objects, or other disciplines to make ideas tangible.

### Content Approach

- **Concrete over abstract** — always ground ideas in a tangible, walkable example before generalizing.
- **Build from known to unknown** — start where the audience already is (stories, acceptance criteria) and walk them into new territory (testing as learning, tests before code).
- **Show the thinking, not just the conclusion** — "I'm going to call it an elevator for now. We'll see how it goes. Maybe it'll work out, maybe it won't." Model the exploratory mindset.
- **Visual micro-stories** — the fox-becomes-a-sparrow product example, the elevator weight plate — small, vivid scenarios that make a point stick.
- **Precision vs. accuracy moments** — find opportunities to distinguish things the audience conflates: testing vs. checking, rules vs. examples, precision vs. accuracy.

### Values Expressed Through Presenting

- **Honor others' skills** — "Think about the skills a tester has built up over a career of testing. Oh, my gosh."
- **Learning as the meta-message** — the talk itself models the learning process it advocates.
- **Humility as strength** — "Learning starts from a position of humility. You've got to empty the cup."
- **Community over competition** — always point to resources, people, and communities rather than positioning as the sole authority.
- **Practitioners over theorists** — "These ideas come forward from people that are doing the work. And that's the spirit of Agile."

### What to Clean Up (Toastmaster Adjustments)

When converting raw speaking into speaker notes or scripts:
- Remove filler words ("um," "you know," "like," "sort of") but preserve the **conversational rhythm** they create — replace with natural pauses or short bridging phrases.
- Keep self-corrections and mid-thought pivots when they model real thinking ("Is it an elevator? Is it a conveyance? I'm not sure.") — cut them when they're just verbal stumbles.
- Preserve incomplete sentences when they create punch: "Every line of code is a liability. It's a bug waiting to happen."
- Keep the warm, human connectors: "Here's the thing," "So," "Right?" — these are Stacey's rhythm, not filler.

### Measurable Style Targets (for Speaker Notes)

- At least one rhetorical question per slide or per 60 seconds of content.
- At least one provocative/contrarian statement per 5 minutes of content.
- No more than 3 bullet points per slide — the depth lives in the speaker notes.
- Return to the through-line example at least every 3–4 slides.
- At least one attribution/credit per 10 minutes of content.
- Include one "Is that an opportunity?" or equivalent seed-planting moment per major section.

**Goal:** The finished presentation should feel like Stacey is reasoning through ideas with the audience in real time — passionate, grounded in practice, generous with credit, unafraid of uncertainty, and always circling back to the human side of the technical work.
