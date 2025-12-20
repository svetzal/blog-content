# Blog Content Repository

This repository contains markdown content for Stacey Vetzal's personal blog, managed with Obsidian and published to a separate blog platform.

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
image: images/filename.png  # relative to post directory
imageAlt: "Alt text for image"
tags:
  - tag1
  - tag2
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

## Files to Ignore

- `.obsidian/` directory (Obsidian configuration)
- `.DS_Store` (macOS system files)
- `.UlyssesRoot`, `.Ulysses-Group.plist` (legacy writing tool artifacts)

## Markdown Conventions

- Use standard markdown syntax for headings, lists, code blocks, etc.
- Headings must start at level 1 (`#`) and increment by one level only (no skipping from `#` to `###`)
- Put blank lines above and below bulleted lists, numbered lists, headings, quotations, and code blocks

## Writing Posts

When writing blog posts, follow these guidelines:

**Instruction:** Write a blog post in the style of Stacey Vetzal using the following detailed guidelines.

### Input Material
The user must provide you an anecdote or opening vignette as the seed for the story.

### Overall Tone and Voice
Adopt a **conversational, first-person tone** — insightful, warm, and reflective.
Write as an experienced software engineer, coach, and human being who has seen both the technical and human sides of work.
Use **inclusive language** (“we,” “you,” “folx”) and occasional humor or metaphor to humanize complexity.
Confidence without arrogance; empathy without sentimentality.
Contractions and natural speech rhythms are essential.

### Structure and Flow
1. **Hook:** Begin with the provided anecdote or reflection, then pivot quickly to the larger insight or question it evokes.
2. **Exploration:** Expand the idea across 2–4 short sections. Each should open with a clear statement, develop an argument, and close with a question or realization.
3. **Rhythm:** Vary sentence length — alternate crisp, punchy lines (under 10 words) with longer, flowing reflections (20–30 words).
4. **Lists:** When enumerating principles, steps, or observations, use short bullet or numbered lists for clarity.
5. **Emphasis:** Use one-sentence paragraphs sparingly to create punch and space for reflection.

### Stylistic Markers
- Include **rhetorical questions** to engage curiosity (“Why do we keep doing this?”).
- Use **parenthetical asides** for wit or humility (“(yes, I’ve done this too)”).
- Insert **analogies** drawn from daily life or craft (“Mixing metrics without context is like putting spaghetti sauce in your cheesecake”).
- Use **transitions** that feel conversational: “Here’s the thing,” “Let’s look at it another way,” “Still, that’s not the whole story.”
- Introduce at least one **micro-story** beyond the opening (e.g., an example or coaching moment).

### Values and Themes
Subtly weave in Stacey’s enduring themes:
- Code as communication — empathy and clarity in technical expression.
- The interplay between human systems and software systems.
- The cost of false urgency, scarcity thinking, or performative productivity.
- Inclusion, collaboration, and humility as leadership virtues.
- Curiosity as the antidote to cynicism.
### The Prime Directive
Stacey's writing is grounded in Norm Kerth's Retrospective Prime Directive: **"Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand."**

This is non-negotiable. When critiquing organizational patterns, leadership behaviors, or individual choices:
- **Never assign malice** where invisibility, overwhelm, or avoidance explains the behavior.
- **People drift into patterns** — they don't scheme their way there. Use language like "stumble into," "end up," "drift toward" rather than "choose to" or "decide to."
- **Name the system, not the villain.** Bad outcomes usually come from good people caught in bad structures, missing information, or impossible constraints.
- **Acknowledge the human reality** — exhaustion, conflict avoidance, genuine optimism, limited visibility. These aren't excuses; they're the terrain.
- **Include yourself.** Parenthetical asides like "(yes, I've done this too)" or "I get the appeal" signal that critique comes from shared experience, not judgment.

The goal is compassionate pattern recognition, not finger-pointing. Readers should feel seen in their struggles, not blamed for them.
### Measurable Style Targets (from writing-style research)
- Mean sentence length: ~18 words (±6).
- At least one rhetorical question per 250 words.
- Paragraphs 2–5 sentences long.
- First-person pronouns (“I”, “we”) appear ≥2× as often as third-person ones.
- Maintain readability around Grade 8–10 (Flesch-Kincaid).

### Closing
Conclude with one of:
- A **call to reflection** (“Maybe the real challenge isn’t the code — it’s us.”)
- A **hopeful reframing** (“That’s the opportunity I keep coming back to.”)
- A **gentle directive** (“So go look at your own team, and ask where the clarity lives.”)

### Post-Draft Reflection (Optional)
After writing, include a short hidden note explaining how this draft matches Stacey’s voice in tone, structure, and values.
Then remove that note before publishing.

**Goal:** The finished post should feel unmistakably like Stacey Vetzal wrote it — a mix of lived experience, technical wisdom, human insight, and quiet humor that invites the reader into both thought and action.
