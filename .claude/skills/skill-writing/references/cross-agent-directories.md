# Cross-Agent Directory Reference

Skill directory paths for each supported agent platform.

## Directory Paths

| Agent | Project-Level Path | User/Global Path |
|-------|-------------------|-----------------|
| Claude Code | `.claude/skills/<skill-name>/` | `~/.claude/skills/<skill-name>/` |
| GitHub Copilot | `.github/skills/<skill-name>/` | `~/.copilot/skills/<skill-name>/` |
| Cursor | `.cursor/skills/<skill-name>/` | `~/.cursor/skills/<skill-name>/` |
| Windsurf (Codeium) | `.windsurf/skills/<skill-name>/` | `~/.codeium/windsurf/skills/<skill-name>/` |
| Gemini CLI | `.gemini/skills/<skill-name>/` | `~/.gemini/skills/<skill-name>/` |

## Scope Behavior

- **Project-level skills** are available to all users working in that repository. Store these in version control.
- **User-level skills** are personal and available across all projects. Store these in your home directory.
- When both exist with the same name, behavior varies by agent — most prioritize project-level over user-level.

## Multi-Agent Deployment Strategies

### Strategy 1: Single Location with Symlinks

Keep the canonical skill in one location and create symlinks for other agents:

```bash
# Canonical location
.claude/skills/my-skill/

# Symlinks for other agents
ln -s ../../.claude/skills/my-skill .github/skills/my-skill
ln -s ../../.claude/skills/my-skill .cursor/skills/my-skill
```

**Pros:** Single source of truth, no drift between copies.
**Cons:** Symlinks may not work on all OS/filesystem combinations. Some agents may not follow symlinks.

### Strategy 2: Copies in Each Directory

Duplicate the skill folder into each agent's directory:

```bash
cp -r .claude/skills/my-skill .github/skills/my-skill
cp -r .claude/skills/my-skill .cursor/skills/my-skill
```

**Pros:** Universal compatibility, no symlink issues.
**Cons:** Must keep copies in sync manually. Risk of drift.

### Strategy 3: Single Canonical Location

Place the skill in the most widely-supported directory and document it:

```
.claude/skills/my-skill/   # Primary location
```

Add a note in project documentation pointing other agent users to copy it into their preferred path.

**Pros:** Simplest maintenance, no duplication.
**Cons:** Only works natively with one agent. Other agents need manual setup.

## Recommendations

- For **team projects**: Use Strategy 1 (symlinks) or Strategy 2 (copies) to support all agents your team uses.
- For **personal skills**: Use Strategy 3 with your primary agent's user-level directory.
- For **open-source skills**: Use Strategy 2 and include all major agent directories in the repo.
