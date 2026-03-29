# Blog Content Repository - AI Agent Instructions

## Work Logging

**Client Code:** `personal`

When logging work for this blog, always use `--client personal`:

```bash
# Log work activity
uv run evt log work --client personal --activity "Wrote blog post on cognitive biases" --hours 1.5
```

This repository contains markdown content for Stacey Vetzal's personal blog ("Stacey on Software"), managed with Obsidian and published via Astro to [stacey.vetzal.com](https://stacey.vetzal.com).

## Folder Structure and Deployment Architecture

This content repo is embedded as a **git submodule** inside the site repo:

```
~/Work/Projects/Personal/stacey-blog/     # Parent: git@github.com:svetzal/stacey.vetzal.com.git
├── content/                               # THIS REPO (submodule → https://github.com/svetzal/blog-content.git)
│   ├── posts/YYYY/                        # Blog posts by year
│   ├── assets/                            # Shared assets
│   ├── presentations/                     # Slidev presentations
│   ├── .claude/                           # Claude Code configuration
│   └── AGENTS.md                          # This file
├── src/                                   # Astro components, layouts, pages
├── astro.config.mjs                       # Site config
├── amplify.yml                            # AWS Amplify build spec
└── publish.sh                             # Publish script
```

All work is done from the parent `stacey-blog/` directory. This content repo's AGENTS.md is picked up automatically as a submodule.

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

Blog posts use a consistent visual system featuring a silver-haired woman systems thinker in a cyberpunk style. A Claude Code Skill at `~/.claude/skills/blog-image-generator/` handles image generation.

**Character Variant:** This blog exclusively uses the `cyberpunk` character variant from `~/.claude/skills/blog-image-generator/character-variants/cyberpunk.json`. Do not use other character variants.

**Scene Variants:** Scene style variants are available in `~/.claude/skills/blog-image-generator/scene-variants/`. The default is `cyberpunk.json`.

### Image Types

| Type | Aspect Ratio | Size | Purpose |
|------|--------------|------|---------|
| `banner` | 16:9 | 1536x1024 | Hero image at top of article |
| `callout` | 1:1 | 1024x1024 | Inline illustration within article |
| `diagram` | 9:16 | 1024x1536 | Tall infographic or process diagram |

### Procedure for New Articles

1. **Read baseline specs** in `~/.claude/skills/blog-image-generator/baselines/`:
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
# First time setup (only needed once)
cd ~/.claude/skills/blog-image-generator/scripts && npm install && cd -

# Generate image (run from the content/ directory)
node ~/.claude/skills/blog-image-generator/scripts/generate-image.mjs \
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

The skill documentation (`~/.claude/skills/blog-image-generator/SKILL.md`) contains full examples and detailed instructions.

## Presentation Generation

Blog content can be converted to Slidev markdown presentations, or talks can be created from scratch. A Claude Code Skill at `~/.claude/skills/slidev-presentation/` handles presentation creation.

### Presentation Types

| Type | Slides | Template | Best For |
|------|--------|----------|----------|
| Conference talk | 20-40 | `talk-from-scratch.md` | Full-length presentations |
| Blog conversion | 10-25 | `blog-post-conversion.md` | Turning articles into talks |
| Technical demo | 10-20 | `technical-demo.md` | Code-heavy walkthroughs |
| Lightning talk | 7-10 | `lightning-talk.md` | 5-minute rapid talks |

### Procedure for New Presentations

1. **Determine type** — conference talk, blog conversion, technical demo, or lightning talk
2. **Read SKILL.md** at `~/.claude/skills/slidev-presentation/SKILL.md` for the full procedure
3. **Select template** from `~/.claude/skills/slidev-presentation/templates/`
4. **Create output** in `presentations/<talk-slug>/slides.md`

### Procedure for Blog Post Conversion

1. **Read the source post** and identify sections, quotes, code blocks, and key insights
2. **Read the blog conversion template** at `~/.claude/skills/slidev-presentation/templates/blog-post-conversion.md`
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

The skill documentation (`~/.claude/skills/slidev-presentation/SKILL.md`) contains full syntax reference, design principles, and detailed instructions.

### Presentation Images

Custom images for presentations (cover art, concept illustrations, section breaks, backgrounds) are generated by a separate skill at `~/.claude/skills/presentation-image-generator/`. This skill uses an abstract-first approach (character OFF by default) and supports multiple visual styles via scene variants (`clean-tech`, `abstract-data`, `cyberpunk`, `organic`, `architectural`). See `~/.claude/skills/presentation-image-generator/SKILL.md` for the full procedure.

## Citing External Voices

When a blog post draws on ideas from specific people (podcast guests, authors, analysts), follow this pattern:

1. **Create person documents** in the vault at `~/Work/HostedVault/4-Reference/People/@Person Name.md` with their bio, career background, key ideas, and links. These are reference documents for future use across posts.

2. **Link names to a "Voices in This Post" section** at the end of the article. Use anchor links so readers can choose whether to break their reading flow:
   - In-text: `[Henry Garner](#henry-garner) argues that...`
   - End section: `<a id="henry-garner"></a>**Henry Garner** is CTO of JUXT...`

3. **The "Voices in This Post" section** goes after the closing paragraph, separated by `---`. For each person, include:
   - Who they are and why their experience gives weight to their claims
   - The specific source being cited (with links to videos, podcasts, or articles)
   - Why their perspective matters for *this particular post*

4. **Keep the body text clean** — don't load credential lines into the argument. The reader gets the name and the idea; the end section has the context if they want it.

## Obsidian Vault (Source Material)

Stacey's Obsidian vault is located at `~/Work/HostedVault/`. It contains research notes, drafts, outlines, and reference material used to gather ideas for blog writing. When Stacey references documents that aren't in this repo, look for them there.

### Vault Structure for Blog Work

- **`Notes/`** — Blog series outlines and planning docs (e.g., `blog-series-1-genai-didnt-kill-rigor-it-moved-it.md`)
- **`Transcripts/`** — Cleaned transcripts of videos and podcasts used as source material
- **`4-Reference/People/`** — Biographical reference documents for cited people (e.g., `@Henry Garner.md`)
- Use the `researcher` CLI tool (or `researcher-find` skill) to search vault content semantically

## Files to Ignore

- `.obsidian/` directory (Obsidian configuration)
- `.DS_Store` (macOS system files)

## Markdown Conventions

- Use standard markdown syntax for headings, lists, code blocks, etc.
- **Do not include H1 (`#`) titles in blog post content** — the publishing platform generates the H1 from the frontmatter `title` field
- Blog post body headings should start at H2 (`##`) and increment by one level only (no skipping from `##` to `####`)
- Put blank lines above and below bulleted lists, numbered lists, headings, quotations, and code blocks

## Voice and Style

Stacey's writing and presenting voice are defined in standalone skills, installed globally via `cmx`:

- **`writing-stacey-voice`** — Blog post writing style: conversational first-person tone, structure, stylistic markers, values, measurable targets, and closing patterns.
- **`presentation-stacey-voice`** — Presenter voice: passionate thinking-out-loud tone, signature rhetorical moves, structure, engagement patterns, and content approach.
