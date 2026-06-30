# Repo-Docs Sync Rules

## Sync Scenario Map

Use the smallest scenario that matches the turn. When a trigger appears, run the relevant sync check before the final response. The agent must judge stable project knowledge during ordinary conversation, including knowledge the user asked about because they did not know it. The user does not need to explicitly ask for memory sync. Do not run widened content sync just because a normal repo question or code edit happened.

| Scenario | Trigger | Goal | Scope |
| --- | --- | --- | --- |
| Per-turn Understanding Sync | A repo question, architecture/onboarding answer, user correction, user uncertainty, or behavior-bearing source/config/data/test change touches guide-covered knowledge. | Prevent the current guide from misleading the next reader. | Relevant guide page, current source evidence, and `change-log.md` only when the patch is meaningful. |
| Conversation / Memory Promotion Sync | Stable project knowledge surfaces, is discovered, or is clarified in conversation; the agent is about to write or update memory; or the user asks to preserve/sync handoff knowledge. | Make `repo-docs/` the source of truth before leaving only a chat or memory pointer. | Compare each durable fact with `repo-docs/`; patch the smallest owning guide page; use root agent files only for future-agent operating rules. |
| Widened Docs Sync | The user explicitly asks to sync, tidy, clean up docs, update memory, prepare a handoff, finish a milestone, repair stale docs, or make the repo ready for a newcomer. | Align the whole knowledge system with current code and decisions. | Inventory memory when available, root agent files, README, `repo-docs/`, nearby docs, and affected cross-project docs. |

Store facts by ownership:

- Project behavior, architecture, operations, APIs, data, and current decisions -> `repo-docs/` or README.
- Future-agent operating constraints and routing rules -> `AGENTS.md` / `CLAUDE.md`.
- Meaningful guide changes and historical sync anchors -> `repo-docs/change-log.md`.
- Personal preferences and cross-project reminders -> agent memory when available.
- One-off debug state, temporary run output, and local quirks -> chat unless the user asks to preserve them.

## Follow-up Question Loop

Canonical pipeline: [Understanding sync](SKILL.md#understanding-sync) — **interaction-driven**, not a post-hoc doc sprint.

During the user ↔ coding agent conversation, when a repo question appears and `repo-docs/` is relevant:

1. Read `repo-docs/README.md`, the main walkthrough, and any relevant module/reference/glossary pages.
2. Inspect the source-of-truth code, data, config, tests, or artifacts behind the answer.
3. Ask whether the question means the guide should already have covered this, whether the user's uncertainty reveals a missing explanation, or whether the conversation surfaced stable project knowledge that belongs there; apply the stable-gap vs chat-only table.
4. If stable: patch the smallest narrative home **in this turn**; record meaningful work in `change-log.md` with `Synced through <sha>` when git is available.
5. Answer with the conclusion and a link to the updated section (or to the existing section if no patch was needed).

## Project Change Sync

Canonical pipeline: [Understanding sync](SKILL.md#understanding-sync) — judged **per turn** while coding with the user.

If this conversation changed code, data, config, scripts, tests, or architecture and `repo-docs/` exists, compare the change with the guide before the final response unless the user asked to leave docs untouched. Patch only when the changed behavior is covered by the guide or would otherwise mislead the next reader. Do not defer guide fixes to a later "sync session" when the thread already shows which reader model broke.

## Documentation Content Sync Alignment

Use this **widened-scope** strategy only when the user explicitly asks to sync, tidy, clean up docs, update memory, prepare a handoff, finish a milestone, repair stale docs, or make the repo ready for a newcomer. Day-to-day guide maintenance still uses [Understanding sync](SKILL.md#understanding-sync) inside the coding conversation when a repo question or behavior-bearing edit makes the guide relevant.

Act as a knowledge-base editor: review the whole knowledge system, merge repeated facts, correct stale facts, remove obsolete notes, and keep every reader-facing layer aligned with current code.

### Knowledge layers

Different layers serve different readers:

| Layer | Audience | Responsibility | Healthy shape |
| --- | --- | --- | --- |
| Agent memory, when available | The agent across sessions | Personal preferences, cross-project references, recent lessons, and compact reminders. | Thin, current, pointer-heavy. |
| Root `AGENTS.md` / `CLAUDE.md` | Future agents working inside this repo | Hard constraints, commands, environment rules, red lines, routing tables, and guide maintenance policy. | Short, operational, rule-oriented. |
| `README.md` and `repo-docs/` | Human teammates, downstream users, and future agents | Onboarding, architecture, operations, integration, APIs, repo docs, and references. | Thick authority layer with current facts. |

Root agent files are rule manuals. Put details in `repo-docs/`; keep root instructions for facts that prevent future agents from breaking project constraints. Put historical narratives in `change-log.md`, `references/history.md`, git history, or a project changelog.

### Promotion rule

Agent memory often grows by appending. Docs converge by editing current facts in place. Use promotion to keep memory thin:

| Memory item | Destination |
| --- | --- |
| Same lesson appears repeatedly | Owning guide page, module doc, or root rule. |
| Item explains how the system works | `repo-docs/`, with memory reduced to a pointer if useful. |
| Item records a project fact that is now current | Current-state docs plus `change-log.md` when the change is meaningful. |
| Durable conversation fact, user-uncertainty answer, or source-discovered explanation missing from `repo-docs/` | Smallest owning guide page, plus `change-log.md` when the change is meaningful. |
| Item is a personal or cross-project preference | Agent memory. |

The deciding question: will the next maintainer, teammate, downstream integrator, or future agent need this knowledge to understand or operate the project? If yes, make docs the source of truth.

When stable project knowledge surfaces in conversation, is discovered while answering user uncertainty, or is about to be written to memory, compare each durable fact with `repo-docs/` even if the user did not ask for memory sync. If no current guide page owns it, add the smallest page that should own the fact before leaving only a chat answer or memory pointer. Use root `AGENTS.md` / `CLAUDE.md` only for operational rules that future agents must follow.

### Size and freshness check

Run size checks before content sync:

| File or area | Target | Action when large |
| --- | --- | --- |
| `AGENTS.md` / `CLAUDE.md` | About 300 lines or 15KB | Compress to rules, command tables, red lines, and doc pointers. Move detailed mechanisms into docs. |
| Memory index, when present | At most 200 lines and 25KB | Promote stable knowledge into docs; leave compact pointers and recent lessons. |
| Single memory file | About 100 lines | Split recent lessons or promote stable mechanism content. |
| Single docs page | About 1500 lines | Split by concept, workflow, module, or reference type; add an index page. |

Also compare memory size against docs size when memory exists. Healthy projects have docs as the heavier authority layer and memory as the lighter routing layer.

### Inventory pass

Before deciding which guide pages to update, enumerate the knowledge surface:

1. List agent memory files when the current platform has a memory layer.
2. For each project touched by the conversation, list the project root.
3. List `repo-docs/` and confirm missing guide pages explicitly.
4. Find nearby Markdown files outside `repo-docs/`, excluding dependency and git folders.
5. Read `README.md`, root `AGENTS.md` / `CLAUDE.md`, current guide pages, and relevant docs.
6. Review the current conversation for durable facts, decisions, and changed behavior.

Keep an internal file inventory with each file marked as evaluated, changed, or left current.

### Impact mapping

Think from the changed behavior outward:

| Change | Docs to align |
| --- | --- |
| New API, route, tool, or external surface | Integration guide, architecture, runbook, root command/routing table, relevant reference. |
| New or renamed environment variable | Runbook, root instructions, setup docs, integration guide when downstream users see it. |
| New data store, table, schema, task format, or artifact | Architecture/data model, schema reference, module doc, reproduction path. |
| New feature crossing several concepts | README, repo docs, architecture, concept docs, runbook, change log, handoff notes. |
| Cross-project contract change | Upstream and downstream docs, SDK/API references, integration examples. |
| Completed plan or replaced decision | Current docs updated in place; durable history recorded in `change-log.md` or archive. |
| Terminology or rule change | Glossary, affected module docs, references, root rules when it changes agent behavior. |

For a new capability, cover four reader questions: how to use it, how it works, how to operate it, and how to know it shipped.

### Editing principles

- Prefer reducing, merging, and editing current facts in place.
- Add new text where it changes a reader decision or prevents a future mistake.
- Keep root agent files operational: constraints, commands, environment, permissions, routing, red lines, and guide policy.
- Keep docs reader-facing: onboarding, architecture, operations, integration, examples, contracts, and references.
- Use absolute calendar dates, not relative phrases such as "today" or "recently".
- Keep API tables, environment tables, glossary entries, and command references current.
- For memory, promote stable knowledge into docs and leave compact pointers when useful.
- For cross-project changes, run the inventory and impact mapping for each affected project.

### Sync checklist

- [ ] The smallest matching sync scenario was chosen; widened content sync ran only when explicitly triggered.
- [ ] Size checks ran for root agent files, docs pages, and memory indexes when present.
- [ ] Stable memory or conversation knowledge missing from `repo-docs/` graduated into the smallest owning guide page or root rule.
- [ ] Root agent instructions contain operational rules and guide policy.
- [ ] README and docs explain how to understand, run, integrate, and operate the project.
- [ ] Changed APIs/routes appear in integration and architecture docs.
- [ ] Changed environment variables appear in setup/runbook docs and root instructions.
- [ ] Changed data models or schemas appear in architecture and reference docs.
- [ ] Cross-project effects are reflected in every affected project.
- [ ] Relative-time language such as today, yesterday, recently, 今天, 昨天, 最近 has been replaced with absolute dates.
- [ ] Local links, paths, commands, tool names, and environment variables resolve against the current repo.
- [ ] The final summary lists actual changed files and any unresolved item.

### Closeout summary

For **widened-scope sync**, handoff, and milestone closeouts—not first-time **Build** handoff (see [SKILL.md](SKILL.md#delivery)). After edits, summarize by changed layer:

```text
## Sync Complete

### Memory
- Updated: ...
- Added: ...
- Removed: ...

### Documentation
- <project>/README.md — ...
- <project>/repo-docs/... — ...
- <project>/AGENTS.md — ...

### Unresolved
- ...
```

### Change impact map

| Change type | Docs to check |
| --- | --- |
| New or renamed entrypoint/script | `README.md`, relevant walkthrough, `flows.md` for multi-phase changes, relevant concept page |
| Runtime/session/control-flow change | relevant walkthrough, `flows.md` or `flows/<topic>.md`, runtime concept page when needed, README route map |
| New tool or changed tool args | `references/tools.md`, tool concept page when needed, glossary if term changed |
| Data/schema/task/config change | data/task concept page when needed, relevant reference doc, local caveat if uncertainty remains, `change-log.md` when user-facing |
| Rule or metric change | rule/evaluation concept page when needed, metrics reference, main guide confidence/summary |
| Memory method change | memory concept page when needed, method reference docs, artifacts reference if outputs changed |
| Output/log artifact change | logging/artifacts concept page when needed, artifacts reference, run/debug sections |
| Concept moved/deleted/merged | corresponding `modules/*.md`, README route map, links from other docs, `change-log.md` |
| Terminology changed | `glossary.md`, main guide, affected module/reference docs |
| User-facing docs generated or reorganized | `README.md`, affected docs, repo-root agent instruction files, `change-log.md`, `references/history.md` if archiving |
| Research experiment or baseline change | research overview/main guide, entrypoint docs, metrics reference, artifacts reference, reproduction path |

### Sync checklist

- [ ] If `repo-docs/` exists and source/data/config/test behavior changed in a guide-covered or reader-visible way, guide impact was checked before final response and stale owning pages were patched.
- [ ] Every changed source area maps to a current doc or a local caveat beside the affected topic.
- [ ] Module docs explain current concepts that readers actually need.
- [ ] Main guide includes quick understanding, reproduce/run, and verify paths.
- [ ] Non-Seed repos include `walkthroughs/one-real-run.md`, linked from README.
- [ ] Walkthroughs use numbered `## Step N: [behavior]` sections and connected prose; no template `###` stack under every step; no duplicate closing sections that repeat the steps.
- [ ] README orients the reader without repeating the walkthrough's full explanation.
- [ ] Module docs deepen concepts without copying walkthrough paragraphs; link back instead.
- [ ] If module pages exist, the README route map points readers to the useful concept pages.
- [ ] Repo-root agent instruction files mention `repo-docs/` guide synchronization when they exist.
- [ ] `change-log.md` entries include `Synced through <sha>` after meaningful sync work when git is available.
- [ ] `change-log.md` entries use precise local timestamps with date, time, and timezone.
- [ ] `change-log.md` is recent enough to scan; older entries are archived when needed.
- [ ] If `flows.md` exists, it maps relationships between multiple paths, phases, states, or outputs instead of duplicating the main walkthrough; detailed flows live under `flows/<topic>.md` when useful.
- [ ] Reference docs contain stable catalogs and exhaustive tables; module docs contain reader concepts, representative examples, source locators, and short understanding caveats or verify hooks when they clarify the mechanism.
- [ ] Local Markdown links resolve.
- [ ] Current facts are edited in place; historical notes are used for durable history.
- [ ] Documentation content sync alignment ran when the user asked for sync, tidy, handoff, milestone closeout, memory refresh, or stale-doc repair.
- [ ] Cleanup/removal requests removed stale guide paths, links, and root guide-maintenance policies instead of leaving future agents pointed at missing docs.
