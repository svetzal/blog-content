# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **content-only repository** containing Markdown blog posts for Stacey Vetzal's personal blog. It is managed with Obsidian and consumed as a Git submodule by separate site implementations (Gatsby, Astro). **Never add site code, build configs, or dependencies here.**

## Content Organization

### Blog Posts (`posts/`)
- Organized by year: `posts/YYYY/` (2007-2025)
- Filename pattern: `YYYY-MM-DD-slug.md`
- Images stored in `posts/YYYY/images/` subdirectories

### LinkedIn Data (`linked-in/`)
- Contains exported LinkedIn data (CSVs) for mining blog post ideas
- `Shares.csv`, `Comments.csv` - source material for content ideation
- `Post Ideas*.md` - aggregated blog post ideas by year

### Prompts (`.github/prompts/`)
- `post_ideas_from_linkedin.prompt.md` - Extract blog ideas from LinkedIn shares by year
- `post_ideas_from_comments.prompt.md` - Aggregate ideas from comments across years

## Frontmatter Format

### Published Posts
```yaml
---
title: "Post Title"
date: YYYY-MM-DD
published: true
tags:
  - tag1
  - tag2
image: images/filename.png
imageAlt: "Alt text for image"
---
```

### Drafts
```yaml
---
date: YYYY-MM-DD
published: false
---
```

**Notes:**
- Dates can be quoted or unquoted
- `published: false` or missing `published` field = draft
- Tags use YAML list format

## Obsidian Syntax

- Wiki-style links: `[[Page Name]]`
- Image embeds: `![[image-filename.jpeg]]`
- These need transformation for blog platforms

## Writing Blog Posts

When creating posts, follow Stacey's voice:

**Tone:** Conversational, first-person, insightful, warm, reflective. Use contractions, inclusive language ("we," "you," "folx"), occasional humor and metaphor.

**Structure:**
1. **Hook** - Open with anecdote, pivot to larger insight
2. **Exploration** - 2-4 short sections, each with clear statement, argument, closing question
3. **Rhythm** - Vary sentence length (crisp <10 words mixed with flowing 20-30 word reflections)
4. **Close** - Call to reflection, hopeful reframing, or gentle directive

**Stylistic Elements:**
- Rhetorical questions ("Why do we keep doing this?")
- Parenthetical asides ("(yes, I've done this too)")
- Analogies from daily life
- Conversational transitions ("Here's the thing," "Let's look at it another way")
- At least one micro-story beyond the opening

**Themes:**
- Code as communication and empathy
- Human systems interacting with software systems
- False urgency and scarcity thinking costs
- Inclusion, collaboration, humility as leadership
- Curiosity as antidote to cynicism

**Targets:**
- Mean sentence length ~18 words (±6)
- Paragraphs 2-5 sentences
- Readability: Grade 8-10 (Flesch-Kincaid)
- First-person pronouns ≥2× more than third-person

## Markdown Conventions

- Headings start at level 1 (`#`) and increment by one only
- Blank lines above/below lists, headings, quotations, code blocks
- Standard markdown for code blocks, lists, etc.

## Topics Covered

- **Technical:** TDD, software design, development practices
- **Process:** Agile coaching, estimation, team dynamics
- **Thinking:** Cognitive biases, problem-solving
- **Personal:** Retro computing, professional reflections
