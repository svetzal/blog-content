# Example Analysis: blog-image-generator Skill

Annotated walkthrough of the `blog-image-generator` skill at `.claude/skills/blog-image-generator/`, showing patterns worth emulating.

## File Structure

```
blog-image-generator/
├── SKILL.md                    # ~470 lines — core instructions
├── baselines/
│   ├── scene.schema.json       # JSON Schema for scene specifications
│   ├── banner.json             # Default config for 16:9 banner images
│   ├── callout.json            # Default config for 1:1 callout images
│   └── diagram.json            # Default config for 9:16 diagram images
├── scripts/
│   ├── generate-image.mjs      # Image generation script (calls OpenAI API)
│   └── package.json            # Script dependencies
└── assets/                     # (at repo root) Character reference images
```

## Pattern: Clear Frontmatter with Trigger Phrases

```yaml
name: blog-image-generator
description: >
  Generate cyberpunk-styled images for blog posts including banners (16:9),
  callouts (1:1), and diagrams (9:16). Use this skill when creating new blog
  posts, when asked to generate images, or when updating visuals for existing
  posts.
```

**What works well:**
- The description names all three image types with their aspect ratios
- Includes explicit trigger scenarios ("when creating new blog posts", "when asked to generate images")
- Specific enough to avoid false triggers on unrelated image tasks

## Pattern: Progressive Disclosure via Baselines

The SKILL.md body contains the complete scene JSON structure inline (~100 lines of example JSON). But actual default values live in `baselines/*.json` files.

**How this works:**
1. Agent reads SKILL.md and understands the JSON structure
2. When creating an image, agent reads the appropriate baseline file to get default Character, Style, and PromptKeywords
3. Agent customizes only the Situation and ArticleContext sections

**Why this is effective:** The agent doesn't need to memorize default values — it reads them fresh from baselines each time. The SKILL.md explains the structure; the baselines provide the data.

## Pattern: Scripts for Deterministic Operations

Image generation is inherently deterministic (API call with specific parameters), so it's handled by a script rather than being left to the LLM:

```bash
node .claude/skills/blog-image-generator/scripts/generate-image.mjs \
  posts/YYYY/images/scene-name.json \
  posts/YYYY/images/scene-name.png
```

**What the script handles:**
- Reading the scene JSON and constructing the API prompt
- Loading character reference images
- Calling the OpenAI image API with correct parameters
- Saving the output file

**What the LLM handles:**
- Analyzing the article to determine mood, themes, and props
- Designing the scene composition (creative judgment)
- Writing the scene JSON (structured creative output)
- Choosing the right image type for the context

This division follows the principle: LLMs for judgment and creativity, scripts for precision and API calls.

## Pattern: Structured Data as Configuration

Scene specifications are JSON files, not freeform text. The schema (`scene.schema.json`) defines exactly what fields exist and what values are valid.

**Benefits:**
- The agent can validate its output against the schema
- Scripts can parse the JSON reliably
- Examples in SKILL.md show the exact structure expected
- Baseline files serve as copy-ready starting points

## Pattern: Inline Examples in SKILL.md

The SKILL.md includes four complete examples covering different scenarios:
1. Optimistic problem-solving banner (warm mood)
2. Frustrated bureaucracy banner (harsh mood)
3. Character-focused callout (with `--with-character` flag)
4. Prop-focused callout (no character)

**What makes these examples effective:**
- Each maps to a different mood/type combination
- They show only the Situation section (assumes baselines for the rest)
- Each includes the exact command to generate the image
- Props include `SymbolicMeaning` fields connecting visuals to article themes

## Pattern: Clear Procedure with Numbered Steps

The procedure has 6 steps, each with a clear action:
1. Analyze the Article (read and identify themes)
2. Choose Props (categorized by type)
3. Design the Situation (mood-to-visual mapping tables)
4. Create the Scene JSON (write the file)
5. Generate the Image (run the script)
6. Update Article Frontmatter (connect image to post)

Each step produces a concrete artifact or decision, and the agent knows when it's done.

## Lessons for New Skills

1. **Name your image types, output formats, or modes upfront** — the table in "Image Types" lets the agent quickly choose the right path
2. **Categorize inputs** — props are split into Character/Article/Environment, making it clear where each comes from
3. **Map moods to visual decisions** — the mood tables (optimistic, analytical, frustrated, contemplative) turn subjective judgment into structured choices
4. **Show the exact command** — every example includes the literal bash command to run
5. **Keep baselines separate from instructions** — the SKILL.md is readable because default JSON values aren't inline
6. **Include a Troubleshooting section** — common errors with clear fixes prevent the agent from getting stuck
