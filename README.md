<p align="center">
  <img src="assets/logo.svg" width="128" alt="Repo Docs logo" />
</p>

<h1 align="center">Repo Docs</h1>

<p align="center">
  <strong>Keep project understanding alive while agents keep coding.</strong>
</p>

<p align="center">
  Turn coding-agent conversations into living docs, progress logs, change maps,
  and handoff-ready project memory.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#example-prompts">Example Prompts</a> ·
  <a href="#what-it-produces">What It Produces</a> ·
  <a href="#quality-bar">Quality Bar</a>
</p>

---

`repo-docs` is a Codex/agent skill for maintaining project understanding while
the project is being built. As users ask questions, change code, finish
milestones, or hand work to another agent, `repo-docs` keeps the project guide,
progress log, change map, and agent instructions aligned with the actual repo.

If your coding-agent workflow often loses project context between sessions,
star this repo to support better living-doc workflows for agent-built software.

## Why Repo Docs

Vibe coding accelerates implementation, but it also widens the understanding
gap around a project:

| Without `repo-docs` | With `repo-docs` |
| --- | --- |
| Decisions stay buried in chat | Decisions land in project docs |
| New agents re-read the repo from zero | New agents start from the guide |
| Progress is remembered informally | Milestones are recorded in `change-log.md` |
| Planned work mixes with implemented facts | `Planned`, `Decided`, `Implemented`, and `Unknown` stay separate |
| Handoffs depend on personal memory | Handoffs use docs, `AGENTS.md`, and current source evidence |

`repo-docs` turns user-agent interaction into a living project record. The
result is not a one-time repo summary. It is a source-backed guide that stays
updated as the project changes: what exists, why it exists, what changed, what
is risky, and what should be verified next.

## Core Capabilities

| Capability | What it keeps current |
| --- | --- |
| Live project memory | The current project thesis, workflow, contracts, and caveats |
| Progress log | Meaningful work, decisions, verification, and outcomes in `change-log.md` |
| Change map | Future edits, likely files, risks, and checks in `change-map.md` |
| Agent continuity | Repo-specific rules and guide policy in `AGENTS.md` / `CLAUDE.md` |
| Seed project support | Goals, decisions, planned work, and unknowns before code exists |
| Chinese guide support | Natural Chinese docs through `repo-docs-zh`, with source identifiers preserved |

## Workflow

```mermaid
flowchart LR
  A["User asks or agent changes repo"] --> B["Inspect source truth"]
  B --> C["Update project guide"]
  B --> D["Update change-log"]
  B --> E["Update change-map"]
  B --> F["Update AGENTS.md / CLAUDE.md"]
  C --> G["Next human or agent continues"]
  D --> G
  E --> G
  F --> G
```

Every meaningful interaction either updates the right document or stays out of
the docs because it is transient.

## Modes

| Mode | Use it when | Output focus |
| --- | --- | --- |
| Seed | The project is new or nearly empty | Goals, decisions, planned work, unknowns |
| Build | The repo needs its first guide | Main workflow, module map, contracts |
| Sync | Code, docs, data, scripts, or experiments changed | Current docs aligned with source truth |
| Question refinement | A repo question reveals missing knowledge | Patch the guide, then answer from evidence |

## Quick Start

There are two common ways to install the skill.

### Natural-language install

Give this project link to your coding agent and ask it to install the skill for
your agent runtime:

```text
Install the repo-docs skill from this project:
<project link>

Make both repo-docs and repo-docs-zh available in my agent skill directory.
```

### Command install

From this project directory, copy the skill files into a Codex-style skill
directory:

```bash
mkdir -p ~/.agents/skills/repo-docs
cp SKILL.md REFERENCE.md EXAMPLES.md ~/.agents/skills/repo-docs/
mkdir -p ~/.agents/skills/repo-docs-zh
cp repo-docs-zh/SKILL.md ~/.agents/skills/repo-docs-zh/SKILL.md
```

After installation, invoke it naturally:

```text
Use repo-docs-zh to rebuild this repo's project guide.
```

## Example Prompts

```text
Use repo-docs to create a project guide for this repository.
```

```text
Use repo-docs for this empty project. Create a seed guide that separates
Implemented, Decided, Planned, and Unknown items.
```

```text
Use repo-docs-zh. Read the current docs and source, then update the guide after
this refactor. Record what changed in change-log.md.
```

```text
Answer this architecture question from source evidence. If the guide is missing
the answer, patch the relevant docs before replying.
```

```text
Prepare this repo for handoff. Sync README.md, docs/project-guide/, AGENTS.md,
and memory pointers so the next agent can continue.
```

## What It Produces

The default output is a Markdown guide under:

```text
docs/project-guide/
  README.md
  glossary.md
  flows.md
  change-map.md
  change-log.md
  modules/
  references/
```

For seed projects, the guide stays smaller:

```text
docs/project-guide/
  README.md
  change-map.md
  change-log.md
  glossary.md                 # optional
  references/
    decisions.md              # optional
```

After a milestone, `repo-docs` can leave behind:

- `docs/project-guide/README.md`: current project mental model
- `docs/project-guide/change-log.md`: what changed and how it was verified
- `docs/project-guide/change-map.md`: next edits, risks, and checks
- `AGENTS.md` / `CLAUDE.md`: rules for the next coding agent

## Built For

- researchers iterating on benchmark, eval, and experiment repos
- engineers using Codex, Claude Code, Cursor, or other coding agents daily
- teams that need handoffs between humans and agents
- projects where prompts, scripts, configs, data, and results change together
- new projects that need a project memory baseline before code exists
- maintainers who want docs updated as work happens, not after everyone forgets

## Documentation Sync Model

`repo-docs` keeps three project-knowledge layers aligned during normal work:

| Layer | Audience | Responsibility |
| --- | --- | --- |
| `README.md` and `docs/` | Human teammates, downstream users, future agents | Architecture, onboarding, operations, examples, contracts, references |
| Root `AGENTS.md` / `CLAUDE.md` | Future agents inside the repo | Hard boundaries, commands, environment rules, red lines, guide policy |
| Agent memory, when available | The agent across sessions | User preferences, recent lessons, cross-project pointers |

Docs become the authority for current project understanding. Memory stays thin
and pointer-oriented.

## What's Included

```text
repo-docs/
├── README.md
├── SKILL.md
├── REFERENCE.md
├── EXAMPLES.md
└── repo-docs-zh/
    └── SKILL.md
```

| File | Purpose |
| --- | --- |
| `SKILL.md` | Main skill entrypoint: triggers, modes, guide shape, writing standard, and verification checklist. |
| `REFERENCE.md` | Detailed standards for evidence discovery, seed projects, document types, sync strategy, and quality checks. |
| `EXAMPLES.md` | Lightweight output skeletons for a project guide, module doc, and follow-up behavior. |
| `repo-docs-zh/SKILL.md` | Chinese-language overlay for project guides written in Chinese. |

## Quality Bar

A good `repo-docs` guide is useful after the chat ends. A newcomer should be
able to read it and explain the repo in their own words, reproduce one real
workflow, identify the important contracts, and know where to make a safe
change.

Important claims should be marked by confidence:

- `Confirmed`: backed by code, tests, config, data, docs, or artifacts
- `Inferred`: reasoned from nearby evidence and named as inference
- `Unknown` / `未确认`: awaiting verification

For seed projects, planned work must stay visibly separate from implemented
facts.

## Support

If `repo-docs` helps your agent sessions leave cleaner project knowledge behind,
star the repo. It is the simplest signal that this workflow is worth improving.
