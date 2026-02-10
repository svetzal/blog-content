---
name: skill-writing
description: >
  Create new AI agent skills with proper structure, frontmatter, and cross-agent compatibility.
  Use when asked to "create a skill", "write a SKILL.md", "scaffold a skill directory",
  "make a new skill", or "set up a skill for [capability]". Guides the full process from
  requirements gathering through file creation and validation.
---

# Skill Writing

This skill guides the creation of well-structured AI agent skills that follow the Agent Skills open standard. Skills created with this guide work across Claude Code, GitHub Copilot, Cursor, Windsurf, Gemini CLI, and other compatible agents.

## When to Use This Skill

- User asks to create, write, or scaffold a new skill
- User wants to package knowledge, procedures, or tooling as a reusable skill
- User needs help structuring an existing SKILL.md
- User wants to make a skill work across multiple agent platforms
- User asks "how do I make a skill?" or similar

## Skill Types

There are two fundamental types of skills. Choose the right one before designing the structure.

| Aspect | Reference Skill | Task Skill |
|--------|----------------|------------|
| **Purpose** | Provides knowledge, guidelines, or standards | Executes a procedure or workflow |
| **Trigger** | "How should I...", "What are the rules for..." | "Do X", "Generate Y", "Set up Z" |
| **Body style** | Guidelines, principles, tables, examples | Numbered steps, inputs/outputs, commands |
| **Supporting files** | Lookup tables, examples, glossaries | Scripts, templates, baselines, config |
| **Typical length** | 100-300 lines | 200-500 lines |
| **Example** | Code style guide, API conventions | Image generator, deployment workflow |

See `templates/reference-skill.md` for a Reference skill template.
See `templates/task-skill.md` for a Task skill template.

## Procedure

### Step 1: Gather Requirements

Ask the user (or determine from context):

1. **What does the skill do?** — One sentence describing the capability.
2. **What type is it?** — Reference (knowledge/guidelines) or Task (procedure/workflow)?
3. **What triggers it?** — What phrases or situations should activate it?
4. **What platforms?** — Which agents need to use it? (Default: all compatible agents.)
5. **Does it need scripts?** — Are there deterministic operations that code handles better than the LLM?
6. **Where does it live?** — Project-level (`.claude/skills/`) or user-level (`~/.claude/skills/`)?

### Step 2: Design the File Structure

Every skill needs at minimum a directory containing `SKILL.md`. Most non-trivial skills benefit from supporting files organized by purpose.

**Structure rules:**

- Keep `SKILL.md` under 500 lines — this is the hard limit
- Group supporting files into subdirectories by type (e.g., `references/`, `templates/`, `scripts/`, `examples/`, `baselines/`)
- Name files descriptively — the agent sees filenames when browsing the directory
- Every supporting file MUST be referenced from `SKILL.md` with guidance on when to read it

**Typical layouts:**

```
# Minimal skill
my-skill/
└── SKILL.md

# Reference skill with examples
my-skill/
├── SKILL.md
├── references/
│   └── detailed-specs.md
└── examples/
    └── good-and-bad.md

# Task skill with scripts and config
my-skill/
├── SKILL.md
├── scripts/
│   └── process.mjs
├── baselines/
│   └── default-config.json
└── templates/
    └── output-format.md
```

**Progressive disclosure:** The agent only loads `SKILL.md` initially. Supporting files are read on demand when the agent decides it needs them. This keeps context usage efficient. Structure your skill so that `SKILL.md` contains everything needed for the common case, with supporting files for edge cases, detailed reference, or verbose examples.

### Step 3: Write the Frontmatter

The frontmatter is YAML between `---` delimiters at the top of `SKILL.md`. Two fields are required; others are optional.

**Required fields:**

```yaml
---
name: my-skill-name
description: >
  What this skill does and when to use it. Include trigger phrases
  that match how users ask for this capability.
---
```

**Writing a good description:**

- Include the skill's purpose AND trigger conditions
- Use natural language phrases users would actually say
- Keep it under 3 sentences
- The description is how agents decide whether to activate the skill — make it specific enough to avoid false triggers, broad enough to catch legitimate requests

For the complete list of optional frontmatter fields (including `disable-model-invocation`, `allowed-tools`, `model`, `context`, `agent`, `argument-hint`, and `hooks`), see `references/frontmatter-fields.md`.

### Step 4: Write the SKILL.md Body

The body is Markdown below the frontmatter. Structure it based on skill type:

**For Reference skills:**
1. Brief overview (2-3 sentences)
2. "When to Use This Skill" — trigger scenarios
3. Core guidelines or knowledge (the main content)
4. Examples (inline or referenced)
5. "Supporting Files" — list with when-to-read guidance
6. "Common Mistakes" — brief list of pitfalls

**For Task skills:**
1. Brief overview (2-3 sentences)
2. "When to Use This Skill" — trigger scenarios
3. Key context (inputs, outputs, prerequisites)
4. "Procedure" — numbered steps with clear instructions
5. Examples (inline or referenced)
6. "Supporting Files" — list with when-to-read guidance
7. "Troubleshooting" — common errors and fixes

**Writing quality checklist:**

- [ ] Instructions are imperative and direct ("Run the script", not "You might want to run the script")
- [ ] Steps are numbered and sequential where order matters
- [ ] Each step has a clear completion state — the agent knows when it's done
- [ ] Tables are used for structured comparisons
- [ ] Code blocks include the language identifier
- [ ] File paths are relative to the skill directory
- [ ] No platform-specific assumptions in core instructions (keep those in optional sections or supporting files)
- [ ] Every supporting file is mentioned with context on when to read it

### Step 5: Create Supporting Files

Create each supporting file referenced in `SKILL.md`:

**Reference files** (`.md`) — Detailed documentation the agent reads on demand:
- Keep focused on one topic per file
- Use headings, tables, and lists for scannability
- Include the source/citation for factual claims

**Templates** (`.md`, `.json`, etc.) — Starter content the agent copies and modifies:
- Include placeholder values with clear labels (e.g., `SKILL_NAME_HERE`)
- Add inline comments explaining each section
- Keep templates minimal — only required structure, not optional extras

**Scripts** (`.mjs`, `.py`, `.sh`, etc.) — Executable code for deterministic operations:
- Make scripts self-contained with clear input/output
- Include usage comments at the top
- Don't require interactive input — agents can't respond to prompts
- Document required environment variables or dependencies
- Prefer widely-available runtimes (Node.js, Python, Bash)

**Baselines/Config** (`.json`, `.yaml`) — Structured data the agent reads or passes to scripts:
- Use JSON Schema where validation matters
- Include sensible defaults
- Document each field's purpose

### Step 6: Ensure Cross-Agent Compatibility

The Agent Skills standard is supported by multiple platforms, but each has its own directory conventions and minor behavioral differences.

**Core compatibility rules:**

1. Use only the standard `SKILL.md` filename (not `skill.md` or `SKILLS.md`)
2. Keep required frontmatter to `name` and `description` only
3. Put platform-specific frontmatter fields as optional additions — agents ignore fields they don't recognize
4. Don't rely on platform-specific features for the skill's core function
5. Reference supporting files with relative paths from the skill directory
6. If including scripts, use cross-platform runtimes where possible

For the full directory path reference across all supported platforms, see `references/cross-agent-directories.md`.

**Multi-agent deployment strategies:**

- **Single location:** Keep the skill in one agent's directory and symlink to others
- **Copy:** Duplicate the skill folder into each agent's skill directory
- **Repo-level:** Place in the most widely-supported directory (e.g., `.claude/skills/`) and document alternate paths

### Step 7: Validate the Skill

Run through this checklist before considering the skill complete:

- [ ] `SKILL.md` exists with valid YAML frontmatter
- [ ] `name` field is lowercase with hyphens, no spaces
- [ ] `description` field includes trigger phrases matching user intent
- [ ] `SKILL.md` body is under 500 lines
- [ ] All supporting files are referenced from `SKILL.md` with when-to-read guidance
- [ ] No orphan files (every file in the directory is referenced)
- [ ] Instructions are clear enough for an agent with no prior context
- [ ] No hardcoded absolute paths or platform-specific assumptions in core instructions
- [ ] Scripts (if any) are executable and self-contained
- [ ] File structure uses descriptive directory and file names

**Quick smoke test:** Read only the frontmatter description. Can you tell exactly what this skill does and when to use it? If not, revise.

### Step 8: Document for Humans

If the skill will be shared with other developers or used across teams:

- Add a brief comment in the project's `CLAUDE.md` (or equivalent) noting the skill exists
- If the skill has scripts with dependencies, document the setup steps in the procedure
- Consider adding an `examples/` directory with annotated walkthroughs

## Supporting Files

This skill includes the following supporting files. Read them when indicated:

| File | Read when... |
|------|-------------|
| `references/frontmatter-fields.md` | You need the complete list of frontmatter fields and their options |
| `references/cross-agent-directories.md` | You need exact directory paths for a specific agent platform |
| `references/background.md` | You want deep background on skill design principles, with citations |
| `templates/reference-skill.md` | You're creating a Reference-type skill and need a starting template |
| `templates/task-skill.md` | You're creating a Task-type skill and need a starting template |
| `examples/blog-image-generator-analysis.md` | You want to see an annotated real-world skill example |

## Common Pitfalls

- **Overstuffing SKILL.md** — Move detailed reference material to supporting files. The agent loads SKILL.md fully; keep it focused.
- **Vague descriptions** — "Helps with coding" won't trigger correctly. Include specific phrases users say.
- **Missing file references** — If a supporting file exists but SKILL.md doesn't mention it, the agent won't know to read it.
- **Platform lock-in** — Using Claude Code-specific frontmatter fields as required behavior makes the skill break on other agents.
- **Scripts requiring interaction** — Agents can't answer prompts. Scripts must accept all input via arguments, environment variables, or files.
- **Monolithic structure** — A 600-line SKILL.md with everything inline wastes context and is harder to maintain. Split into focused files.
- **Skipping validation** — An untested skill with a typo in the frontmatter or a broken file reference fails silently.
