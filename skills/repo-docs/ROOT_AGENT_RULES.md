# Repo-Docs Root Agent Rules

Root agent instruction Markdown is the handoff point for future coding agents. Keep it short, operational, and routed back to the guide.

## When To Patch

When Build creates or materially updates `repo-docs/`, search the project for agent instruction Markdown before creating anything new. Look for common project files such as `AGENTS.md`, `AGENTS.override.md`, `CLAUDE.md`, `GEMINI.md`, and `.cursor/rules/*.md`, plus any nearby Markdown file whose filename or heading clearly says it is for coding agents.

Patch existing agent instruction files that already govern the repo or the package being documented. Do not create extra tool-specific files just to mirror the rule. If no such file exists, create `AGENTS.md` at the project root.

For nested packages, patch the nearest project agent instruction Markdown that governs the generated `repo-docs/` package. If the guide is created at the repository root, use the root file.

## Required Content

The block should say:

- The living guide is in `repo-docs/`; start with `repo-docs/README.md`.
- The main behavior trace lives in `repo-docs/walkthroughs/one-real-run.md` when that file exists.
- Repo questions, architecture/onboarding answers, behavior-bearing edits, user uncertainty or correction about stable project behavior, stable project knowledge discovered or clarified in conversation, and knowledge about to be written to memory are repo-docs sync triggers.
- A trigger runs a foreground sync gate before the final response. The gate decides `none`, `answer-only`, `foreground patch`, or `background sync`.
- Ordinary repo questions do not automatically edit docs. Answer from the inspected guide and source when the guide is current enough.
- Patch the smallest owning guide page before the final response only when the current answer or edit would otherwise mislead, the guide says the opposite, or the missing stable knowledge is a small local patch.
- Broader durable gaps that are not answer-critical may go to a background `repo-docs` sync agent only when the platform supports a real tracked handoff.
- Record meaningful guide updates in `repo-docs/change-log.md` with verification and `Synced through <sha>` when git is available.

## Default Block

```markdown
## Repo docs

The living project guide is in `repo-docs/`. Start with `repo-docs/README.md`; when `repo-docs/walkthroughs/one-real-run.md` exists, use it as the main behavior trace.

Repo-docs sync triggers before the final response: repo questions; architecture, onboarding, or "how does this work" answers; behavior-bearing code/config/data/script/test edits; user uncertainty or correction about stable project behavior; stable project knowledge discovered or clarified in conversation; and knowledge about to be written to memory.

When a trigger happens, run a foreground repo-docs sync gate before answering: use the `repo-docs` skill in Sync mode when available, or manually read the relevant guide pages, inspect current source, and decide `none`, `answer-only`, `foreground patch`, or `background sync`. Ordinary repo questions may be `answer-only` when the guide is current enough and the answer can cite inspected guide/source evidence. Patch the smallest owning guide page before the final response only when the current answer or edit would otherwise mislead, the guide says the opposite, or the missing stable knowledge is a small local patch.

If the needed guide work is broader and not required for the current answer to be correct, delegate it to a background `repo-docs` sync agent when the platform supports a real tracked handoff. The handoff must name the trigger, durable facts or changed source areas, candidate guide pages, verification to run, and the expected `repo-docs/change-log.md` update. If no background agent is available, answer from inspected source and mention the pending docs gap when it matters.

When behavior-bearing code, config, data, scripts, or tests change, compare the change with the guide before finishing unless the user asked not to touch docs. Record meaningful guide updates in `repo-docs/change-log.md` with verification and `Synced through <sha>` when git is available.
```

Keep this root rule short. Do not copy the guide into `AGENTS.md` or `CLAUDE.md`; those files route future agents back to `repo-docs/`.
