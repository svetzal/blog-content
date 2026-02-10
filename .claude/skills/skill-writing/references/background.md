# Background: Agent Skills Design Principles

Deep reference on skill design philosophy and cross-agent compatibility, with citations from the Anthropic engineering blog, Claude Code documentation, and community resources.

## The Agent Skills Standard

Agent Skills are an open standard for packaging AI agent capabilities into reusable modules. A skill is a folder containing a `SKILL.md` file with optional supporting resources. The standard was pioneered in Claude Code and adopted by GitHub Copilot, Cursor, Windsurf, and Gemini CLI [[1]](https://github.com/hoodini/ai-agents-skills) [[2]](https://github.com/VoltAgent/awesome-claude-skills).

The standard defines:
- A required `SKILL.md` file with YAML frontmatter (`name` and `description`)
- Optional supporting files (references, templates, scripts)
- Convention-based directory placement per agent platform
- Automatic discovery and activation based on description matching

## Progressive Disclosure

Skills use a two-phase loading strategy to manage context efficiently:

1. **Discovery phase:** The agent sees only the skill's name and description in its system prompt [[3]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
2. **Activation phase:** When the agent decides a skill is relevant, it loads the full `SKILL.md` body [[3]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
3. **On-demand reading:** Supporting files are only read when the agent decides it needs them [[4]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).

This means bulky reference material in supporting files doesn't consume context tokens unless actually needed. The SKILL.md body should contain everything needed for the common case, with supporting files handling edge cases and detailed specs [[5]](https://code.claude.com/docs/en/skills).

**Key implication:** If a supporting file exists but isn't mentioned in `SKILL.md`, the agent won't know to read it. Every file must be referenced with guidance on when to read it [[5]](https://code.claude.com/docs/en/skills).

## Scripts vs. Prompts

LLMs are stochastic — they generate different output each time and can make errors in deterministic tasks like math, data parsing, or format conversion. Scripts provide deterministic reliability for operations that require exactness [[6]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).

**Use scripts for:**
- Data parsing and extraction (PDF, CSV, JSON transformation)
- API calls with specific authentication or formatting requirements
- File generation with exact structure (images, binaries)
- Validation and verification steps
- Any operation where "close enough" isn't acceptable

**Use prompts (SKILL.md instructions) for:**
- Decision-making and judgment calls
- Natural language generation
- Code review and analysis
- Creative tasks
- Orchestrating between multiple steps

The most effective skills combine both: the LLM handles orchestration and judgment while scripts handle deterministic operations [[7]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).

**Script guidelines:**
- Scripts must be non-interactive — agents can't respond to prompts
- Use command-line arguments, environment variables, or file-based input
- Include usage comments at the top of each script
- Make scripts self-contained with clear error messages
- Prefer cross-platform runtimes (Node.js, Python, Bash)

## Security Considerations

Skills give agents new capabilities, which can include running arbitrary code. Security implications [[8]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills):

- **Review third-party skills** before installing them, especially those containing scripts
- **Scripts execute on your system** with the same permissions as the agent
- **Don't include secrets** in skill files — use environment variables
- **Limit tool access** where possible (Claude Code's `allowed-tools` frontmatter field restricts what the agent can do during skill execution)
- **Project-level skills are shared** — anyone who clones the repo gets the skill
- Some enterprise environments restrict skill usage for safety

## Discovery and Invocation

How agents find and activate skills:

1. **Automatic discovery:** Agents scan skill directories on startup and register name + description [[3]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
2. **Description matching:** When a user makes a request, the agent checks if any skill's description matches the intent [[9]](https://github.com/hoodini/ai-agents-skills).
3. **Full loading:** If matched, the agent loads the complete SKILL.md body into context.
4. **Manual invocation:** Some agents support explicit slash commands (e.g., `/skill-name`) for direct activation [[5]](https://code.claude.com/docs/en/skills).

**Tuning activation:**
- Too many false triggers → make the description more specific
- Not triggering when it should → add more trigger phrases to the description
- Use `disable-model-invocation: true` (Claude Code) to prevent auto-triggering entirely

## Testing Across Agents

The same skill should work across all compatible agents, but behavioral differences exist:

- **Model differences:** Different agents use different LLMs. A prompt that works well with Claude may need adjustment for GPT-based agents.
- **Tool availability:** Not all agents support running scripts. Some are read-only.
- **Context limits:** Different models have different context windows. A skill that fits in one may overflow another.
- **Activation sensitivity:** Description matching heuristics vary by agent. Test trigger phrases in each environment.

**Testing checklist:**
1. Install the skill in the target agent's directory
2. Verify it appears in the skill list (if the agent has one)
3. Test automatic triggering with natural language requests
4. Test manual invocation via slash command (if supported)
5. Verify supporting files are read when needed
6. Verify scripts execute correctly (if applicable)
7. Check that the output matches expectations

## Sources

- [[1]](https://github.com/hoodini/ai-agents-skills) AI Agent Skills Repository — community skill collection
- [[2]](https://github.com/VoltAgent/awesome-claude-skills) Awesome Claude Skills — curated skill examples
- [[3]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) Anthropic Engineering Blog — "Equipping agents for the real world with Agent Skills"
- [[4]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) Anthropic Engineering Blog — progressive disclosure and supporting files
- [[5]](https://code.claude.com/docs/en/skills) Claude Code Documentation — skill structure and frontmatter
- [[6]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) Anthropic Engineering Blog — LLMs are stochastic, scripts provide determinism
- [[7]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) Anthropic Engineering Blog — combining prompts and scripts
- [[8]](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) Anthropic Engineering Blog — security implications
- [[9]](https://github.com/hoodini/ai-agents-skills) AI Agent Skills Repository — discovery and invocation
- [Gemini CLI Skills Documentation](https://geminicli.com/docs/cli/skills/)
