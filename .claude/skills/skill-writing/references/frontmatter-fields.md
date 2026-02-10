# Frontmatter Fields Reference

Complete reference of all known SKILL.md frontmatter fields across agent platforms.

## Required Fields (All Platforms)

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique skill identifier. Lowercase, hyphens for spaces. Becomes the slash command name (e.g., `/my-skill`). |
| `description` | string | What the skill does and when to use it. Include trigger phrases. The agent uses this to decide whether to activate the skill. |

## Optional Fields (Claude Code)

These fields are recognized by Claude Code. Other agents silently ignore unrecognized fields, so including them is safe for cross-agent compatibility.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `disable-model-invocation` | boolean | `false` | When `true`, the skill only activates via explicit slash command (`/skill-name`), never automatically. Use for skills that should only run on direct user request. |
| `user-invocable` | boolean | `true` | When `false`, hides the skill from the slash command menu. The skill can still be triggered automatically by description matching. Use for skills that are supporting modules, not standalone commands. |
| `allowed-tools` | list of strings | all tools | Restricts which tools the agent can use while executing this skill. Example: `allowed-tools: Read, Grep, Glob` limits the skill to read-only operations. |
| `model` | string | (current model) | Forces a specific model for skill execution. Example: `model: haiku` for fast, simple skills. |
| `context` | string | (inline) | Set to `fork` to run the skill in a separate sub-agent context. The skill gets its own conversation context, and results are returned to the main conversation. Useful for complex skills that might pollute the main context. |
| `agent` | string | (none) | Specifies a sub-agent type for skill execution. Used with `context: fork`. |
| `argument-hint` | string | (none) | Hint text shown after the slash command name, indicating expected arguments. Example: `argument-hint: <file-path>` shows as `/my-skill <file-path>`. |
| `hooks` | object | (none) | Shell commands that execute in response to skill lifecycle events. |

## Frontmatter Examples

### Minimal (cross-agent compatible)

```yaml
---
name: code-style
description: Enforces team code style guidelines. Use when reviewing code or writing new functions.
---
```

### With auto-trigger disabled

```yaml
---
name: deploy
description: Runs the deployment workflow for staging or production.
disable-model-invocation: true
---
```

### With tool restrictions

```yaml
---
name: audit
description: Reviews code for security vulnerabilities. Read-only analysis.
allowed-tools: Read, Grep, Glob, Task
---
```

### With forked context and model override

```yaml
---
name: research
description: Deep research on a technical topic. Use when asked to investigate or survey.
context: fork
model: sonnet
---
```

### Multi-line description

```yaml
---
name: explain-code
description: >
  Explains code using analogies, diagrams, and step-by-step walkthroughs.
  Use when the user asks "how does this work?", "explain this code",
  or "what does this function do?".
---
```

## Cross-Agent Compatibility Notes

- **Only `name` and `description` are universally required.** All other fields are platform-specific extensions.
- **Unknown fields are ignored**, not rejected. Including Claude Code-specific fields won't break the skill on Copilot or Cursor.
- **Don't rely on optional fields for core behavior.** A skill that only works when `context: fork` is set will fail on agents that don't support forking.
- **Description quality matters most.** Across all platforms, the description is the primary mechanism for skill discovery and activation.
