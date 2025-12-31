# Blog Content Repository - AI Agent Instructions

## Work Logging

**Client Code:** `personal`

When logging work for this blog, always use `--client personal`:

```bash
# Log work activity
uv run evt log work --client personal --activity "Wrote blog post on cognitive biases" --hours 1.5
```

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

## Files to Ignore

- `.obsidian/` directory (Obsidian configuration)
- `.DS_Store` (macOS system files)
- `.UlyssesRoot`, `.Ulysses-Group.plist` (legacy writing tool artifacts)

## Markdown Conventions

- Use standard markdown syntax for headings, lists, code blocks, etc.
- Headings must start at level 1 (`#`) and increment by one level only (no skipping from `#` to `###`)
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
