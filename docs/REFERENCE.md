# Repo-Docs Reference

Read [SKILL.md](SKILL.md) first. This file only routes you to the next rule file. Do not treat it as a second policy source.

Open the smallest file that answers the current question, then return to the task.

## Routing

| Situation | Open |
| --- | --- |
| First build | [WRITING.md](WRITING.md) → [PAGE_RULES.md](PAGE_RULES.md) → [QUALITY_RULES.md](QUALITY_RULES.md) |
| Seed, large repo, monorepo, research, benchmark, or data-heavy | add [SCOPE_MODES.md](SCOPE_MODES.md) |
| Repo question or code change while coding | [SYNC_RULES.md](SYNC_RULES.md); add [PAGE_RULES.md](PAGE_RULES.md) if patching |
| Widened sync, tidy, handoff, or stale-doc repair | [SYNC_RULES.md](SYNC_RULES.md) → [QUALITY_RULES.md](QUALITY_RULES.md) |
| Root `AGENTS.md` / `CLAUDE.md` routing block | [ROOT_AGENT_RULES.md](ROOT_AGENT_RULES.md) |
| Style or tone uncertainty | [WRITING.md](WRITING.md) and [EXAMPLES.md](EXAMPLES.md) |
| Chinese docs | [repo-docs-zh/SKILL.md](../repo-docs-zh/SKILL.md), then topic files as needed |
