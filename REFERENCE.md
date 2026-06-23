# Repo-Docs Reference

## Positioning

`repo-docs` has a focused documentation contract:

| Area | repo-docs | repo-tour |
| --- | --- | --- |
| Default output | Markdown documentation pack | Full HTML knowledge pack |
| Graph | Optional when it helps the reader | Required for code architecture facts |
| Goal | Maintainable human docs | Complete interactive tour |
| Iteration | User Q&A continuously improves docs | Regenerate or patch a tour artifact |
| Best for | Onboarding, project understanding, living notes | Deep review, visual architecture tour, archival artifact |

## Design Goal

`repo-docs` produces a sustainable project-understanding layer that can grow into a complete knowledge base when completeness remains navigable and useful. A good output first lets a newcomer answer the important questions in about 15 minutes: why the repo exists, how one real run or request works, how modules divide responsibility, where to change things, and what is risky to touch. The reading experience should feel like a guided code reading session: start from behavior the reader can recognize, walk through a real path end to end, then reveal the module design and references behind it.

Keep stable knowledge in the guide. Handle transient run state, one-off debugging notes, and chat history in chat unless the user explicitly asks to preserve them. Each sync may delete, merge, or shorten docs when that reduces cognitive load.

## Mental Model Design

Design the guide from the reader's missing model and the repo's real concepts. The documentation should gradually replace uncertainty with usable structure:

```text
Observable behavior
  -> Problem
  -> Design pressure
  -> Real behavior path
  -> Responsibility boundaries
  -> Contracts and examples
  -> Change/debug decisions
  -> Caveats and unknowns
```

Each page is a teaching unit. It should answer one durable reader question, such as "how does a task become an evaluated result?" or "where does policy enforcement actually happen?" Pages that mainly catalog files, fields, commands, or classes belong under `references/`; project documentation pages carry a teaching purpose. For non-Seed repos, the first teaching unit should be a real walkthrough in `walkthroughs/one-real-run.md`.

Use course-design discipline while keeping the guide a living project document:

| Teaching move | How repo-docs should use it |
| --- | --- |
| Start from a learner-visible behavior | Begin with a command, request, artifact, log failure, API call, or workflow before internals. |
| Explain "why should I care" | State the maintenance or debugging decision the page enables. |
| Pair code with translation | Show what the code receives, changes, returns, or protects. |
| Test understanding through application | Prefer change/debug scenarios over recall-style questions. |
| Keep a module brief | Know the reader question, key insight, source evidence, and example before writing the page. |

Keep quizzes, slides, animations, lesson screens, and visual layout rules for explicit course artifacts. Use Markdown repo docs for durable repo understanding.

## Pyramid Structure

A good `repo-docs/` package uses a top-down shape:

```text
Main answer
  -> Why the repo exists
  -> How one real workflow moves
  -> What modules own the workflow
  -> What data/contracts hold it together
  -> Where to change or debug it
  -> What caveats matter locally
```

The main document should orient the reader enough to choose the next detail doc. Details belong in the main guide when they help the reader choose, run, modify, debug, or evaluate the repo.

## Writing Style

The style target is textured but plain. Write as if a maintainer is explaining the repo to a capable newcomer who has limited time and deserves the real shape of the system.

Use this order at page and section level:

1. Conclusion: what the reader should understand.
2. Reason: why this part exists or why the boundary matters.
3. Path: the actual code/data/config flow that proves it.
4. Implication: where to change it, how to verify it, or what can break.
5. Caveat: what is inferred, unknown, or intentionally out of scope.

Polished writing stays concrete. Replace inflated language with:

- claims about importance, impact, or "the evolving landscape" that the repo itself supports
- precise adjectives tied to a source-backed constraint or behavior
- direct verbs such as "is", "reads", "writes", "checks", and "computes"
- lists that separate real concepts, states, or responsibilities
- paragraph endings that give a concrete next step or caveat
- headings followed by substance that advances the explanation
- current-state narration in current-state docs

Prefer:

- exact actors and verbs: script reads config, runner builds session, evaluator computes denominator
- source-backed caveats: "Unknown: no test currently covers this branch"
- compact examples tied to real code or data
- one short paragraph before a table when the table needs context
- fewer headings when the prose already carries the reader

Good repo docs can have flow and texture while remaining inspectable. Trace elegant sentences to source evidence or mark them as inference.

## Evidence Discovery

Use repo evidence to answer the mental-model questions. These are common evidence sources:

| Evidence source | What it can prove |
| --- | --- |
| `AGENTS.md`, `CLAUDE.md`, `README*`, `CONTEXT.md` | Project contract, conventions, and current documentation policy. |
| Scripts, CLIs, package metadata, entrypoints | How a real run starts and what knobs are user-facing. |
| Runners, controllers, request handlers, sessions | Runtime flow, state lifecycle, and responsibility boundaries. |
| Schemas, config, data files | Stable contracts, valid shapes, and behavior-defining inputs. |
| Tools, stores, policy/evaluator code, output writers | Side effects, scoring, persistence, and produced artifacts. |
| Tests, sample outputs, logs, generated artifacts | Expected behavior, edge cases, and verification signals. |
| Existing docs and reports | Intent and historical caveats that still need source verification. |

Begin with the repo's purpose and one real execution path, then pull evidence where it explains that path or a reader decision.

## Seed Project Mode

Use Seed Project Mode when the repo is new, empty, or only contains planning files. This mode exists so `repo-docs` can start maintaining project understanding before implementation exists.

### Detection

Treat a project as seed-stage when most of these are true:

- no substantive source files
- no runtime entrypoint, script, package manifest, or runnable command
- no tests, generated artifacts, schemas, or data contracts
- only README, license, `.gitignore`, root agent instructions, planning notes, or empty directories exist
- the user is asking to start, plan, initialize, or hand off a project before implementation

If the repo has a small amount of code but no stable workflow yet, use mixed mode: document implemented facts as `Implemented`, planned behavior as `Planned`, and uncertain design as `Unknown` / `未确认`.

### Evidence and status labels

Seed docs must separate intent from implementation:

| Label | Use when | Example wording |
| --- | --- | --- |
| `Implemented` | Existing source, config, test, data, artifact, or command proves it. | `Implemented: README.md exists and defines the project goal.` |
| `Decided` | The user or current docs explicitly chose it. | `Decided: the first version will target agent-compatible skills.` |
| `Planned` | It is a proposed workflow, module, contract, or next step. | `Planned: add an installer script after the skill layout stabilizes.` |
| `Unknown` / `未确认` | The project has not decided or verified it. | `Unknown: no test strategy has been chosen yet.` |

Do not convert chat intent into current-state facts. A user saying "we should add a CLI" is `Planned` unless a CLI exists.

### Seed guide shape

For an empty project, prefer this small pack:

```text
repo-docs/
  README.md
  change-map.md
  change-log.md
  glossary.md                 # optional
  references/
    decisions.md              # optional
```

Create `glossary.md` only when the project already has repeated terms. Create `references/decisions.md` only when there are enough explicit decisions to keep out of the main guide.

Avoid `modules/`, detailed `flows/`, API references, schema references, and metrics references until there is code, config, data, or an explicit architecture to support them. If the user asks for a planned architecture, mark every unimplemented module or flow as `Planned`.

### Seed main guide

For seed projects, `repo-docs/README.md` should answer:

1. What is the project trying to become?
2. What is already present in the repo?
3. What has been explicitly decided?
4. What is the planned first workflow?
5. What are the next implementation steps?
6. What is unknown or waiting for verification?

Good seed README sections:

- Project brief
- Current repo state
- Decided constraints
- Planned first workflow
- Next implementation steps
- Unknowns and verification checks

### Seed change map

`change-map.md` is the most important seed-stage document. Use it to turn intent into actionable next work:

| Goal | Likely files | Safe path | Verification |
| --- | --- | --- | --- |

`Likely files` can include planned paths, but mark them as planned when they do not exist. Verification should name the future command, test, review, or artifact that will prove the work.

### Seed change log

`change-log.md` should record project initialization and explicit user decisions:

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |

For seed projects, verification may be "docs scaffold created" or "decision recorded"; do not claim implementation verification when no implementation exists.

### Promotion rule

As code appears, promote seed content:

- `Planned` module -> module doc only after files or explicit architecture exist.
- `Planned` workflow -> flow doc only after an entrypoint, script, or detailed accepted design exists.
- `Unknown` -> `Decided` when the user chooses a direction.
- `Decided` -> `Implemented` only when repo evidence proves it.

## Reader Paths

The main guide should support three paths:

| Reader goal | What the guide should show |
| --- | --- |
| Understand quickly | thesis, why it exists, main workflow, module map |
| Reproduce or run | commands, config, expected outputs, artifact locations |
| Modify safely | change map, owning modules/files, risks, tests |

## Language Mode

`repo-docs` can write repo docs in Chinese or English. Treat language as a pack-level documentation contract.

| Situation | Language choice |
| --- | --- |
| User asks for Chinese | Write Chinese docs. |
| User asks for English | Write English docs. |
| Existing `repo-docs/` guide exists | Keep its primary language; convert when requested. |
| New guide, no explicit request | Use the user's current language. |
| Repo has established docs in one language | Prefer the repo convention if it helps future maintainers. |

Language quality rules:

- Preserve source terms exactly: paths, commands, config keys, API names, class/function names, metrics, error messages, and protocol fields.
- Translate surrounding explanation and reader guidance.
- Add parenthetical source terms only when helpful, such as `执行入口 (entrypoint)`.
- Prefer a single primary language because it is easier to keep synchronized.
- If bilingual docs are requested, define the structure explicitly, such as one bilingual page, `README.zh.md`/`README.md`, or a language-specific docs folder.

## Research Codebase Coverage

For research repositories, make sure stable docs cover:

| Research concept | Typical location |
| --- | --- |
| Research question and motivation | `README.md` or research overview |
| Method / benchmark design | main guide, module docs, design reference |
| Experiment entrypoints | main guide, optional `flows.md`, entrypoint module |
| Metrics and evaluation protocol | evaluation module, metrics reference |
| Data/task/schema contracts | data module, schema/task references |
| Reproduction path | main guide, scripts/reference docs |
| Baselines / ablations / compared methods | method or experiment references |
| Output artifacts | artifacts reference |


## Document Types

### Main guide: `README.md`

Use this to lower the first 15 minutes of confusion. It should include conclusion, map, route, and links.

For seed projects, use it as a project brief. Keep it honest about the empty state and make the next implementation decisions easy to find.

### Walkthroughs: `walkthroughs/`

Use walkthroughs to teach the repo through real behavior, not through module order. A walkthrough follows a command, request, task, user action, failure, policy boundary, or data record from the moment a reader can observe it to the resulting state, output, or score. For non-Seed repos, create `walkthroughs/one-real-run.md` before writing deep module/reference pages. If the repo has no real observable path yet, use Seed mode and record the path as `Planned` in `README.md` or `change-map.md`; do not present it as `one-real-run.md`.

The default `one-real-run.md` should use this shape:

```text
observable entry
-> input/data/request
-> runtime path
-> state changes
-> key decision/policy/evaluation
-> output/artifact
-> change risk
-> verification
```

Write the walkthrough with real project names: commands, files, functions, config keys, data records, test names, artifacts, routes, or UI actions. For each step, say what it receives, what it changes, and what downstream code relies on. A Mermaid diagram can help, but it must be paired with prose that explains the path.

Walkthrough count rules:

| Repo shape | Default walkthroughs | Add more when |
| --- | --- | --- |
| Small repo | 1: `one-real-run.md` | A second workflow is materially different. |
| Medium repo | 2-3 | There are distinct user paths, failure modes, data paths, or policy boundaries. |
| Large repo | Several focused walkthroughs | Each one teaches a real behavior, not a module. |

Common names include `one-real-run.md`, `first-request.md`, `failure-case.md`, `policy-boundary.md`, and `data-to-output.md`. Choose names from behavior, not architecture.

### Glossary: `glossary.md`

Use this for names the reader will see repeatedly. Include:

| Term | Plain meaning | In code | Common confusion |
| --- | --- | --- | --- |

### Flows: optional `flows.md`

Every `repo-docs/` package must explain at least one real workflow. For non-Seed repos, the workflow normally lives in `walkthroughs/one-real-run.md`; `flows.md` is an optional map when a separate sequence overview lowers cognitive load better than the main guide and walkthrough alone. Do not create `flows.md` just to retell the same path as `one-real-run.md`. Use it especially when the repo has several meaningful workflows, runtime phases, state transitions, or output/evaluation paths. Use it for sequences:

- startup flow
- request/task flow
- data mutation flow
- evaluation or output flow
- error/debug flow

Prefer 6-10 steps per flow. Use Mermaid when a visual makes the sequence easier to understand. Keep each Mermaid diagram small, source-backed, and paired with plain-language prose. When `flows.md` exists, keep it as a map of relationships between walkthroughs, phases, states, or outputs; if it grows past roughly 120 lines, split detailed flows into `flows/<topic>.md` and link to them. If the repo has only one simple workflow that the walkthrough already explains well, omit `flows.md`. Omission is acceptable only when the main guide still points readers to the real workflow clearly.

For seed projects, omit `flows.md` unless the user has explicitly decided a planned workflow. If included, title it as planned and keep verification checks beside the flow.

### Change map: `change-map.md`

Use this for future maintenance paths:

| Goal | Files to inspect | Safe change path | Risk |
| --- | --- | --- | --- |

Keep it stable, prospective, and action-oriented.

### Change log: `change-log.md`

Use this for past project work:

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |

Use `YYYY-MM-DD HH:MM TZ` rather than date-only headings. This keeps repeated same-day documentation changes distinguishable.

Record meaningful user requests and execution results when they change code, docs, data, experiments, or project understanding. Keep trivial chat in chat. Keep `change-log.md` recent and readable; when it grows past roughly 8 entries or 120 lines, move older entries to `references/history.md` and link to the archive.

### Module docs

Create one module doc when the module has a clear responsibility and the reader benefits from a separate page. Each module doc must start from the reader confusion it resolves and where this module appears in a walkthrough, then explain responsibility boundaries. Group files by responsibility. During sync, merge tiny, overlapping, stale, or one-question module docs, and delete docs when the corresponding responsibility disappeared or moved.

For seed projects, avoid module docs by default. Planned modules usually belong in `change-map.md` or an optional `references/decisions.md` until files, interfaces, or explicit accepted architecture exist.

Write module docs as explanations of responsibility. A reader should understand why the boundary exists, what inputs cross it, what outputs or state it owns, what code path demonstrates it, and what breaks when the boundary is changed. Keep module examples representative rather than exhaustive; full field tables, command catalogs, task lists, and artifact inventories belong in `references/`.

Before writing a module doc, hold this brief in mind:

| Brief field | Question |
| --- | --- |
| Reader question | What real confusion or decision brings the reader here? |
| Key insight | What should the reader understand after one minute? |
| Where this appears in a walkthrough | Which real command/request/task/failure makes this module visible? |
| Inputs / state / outputs | What does this module receive, change, persist, return, or protect? |
| Code evidence | Which source path proves the responsibility and boundary? |
| Maintenance scenario | If this changes, what should the reader inspect and test? |

Module docs should include examples when the module owns a behavior boundary, contract, or transformation. Use examples for:

- rule or permission boundaries: allowed vs denied cases
- calculations or scoring: inputs, denominator/base, and resulting value
- data contracts: valid vs invalid payloads
- public interfaces: realistic call/input and observable effect
- transformations: input -> output, before -> after, or raw -> normalized
- state and lifecycle: state before, triggering event, state after
- retrieval, ranking, routing, or selection: query/context -> chosen result and non-result
- failure modes: what fails, how it is surfaced, and what remains unchanged

Prefer one compact table or snippet over long prose. Examples must be source-backed and project-native. Use real names or realistic local data when safe. Use neutral placeholders when they preserve the real contract and protect sensitive or benchmark-internal content.

### Agent instruction files

Use repo-root `AGENTS.md` or `CLAUDE.md` to preserve the `repo-docs/` guide update policy for future agents. Keep this short and operational:

- Where the living guide lives.
- Which repo-specific questions should refine it.
- Which docs to update before answering when guide content is missing or stale.
- Which changes deserve `change-log.md` entries.

Update existing root files. Create `AGENTS.md` when the repo has no root agent instruction file and a new `repo-docs/` package is being created.

### References

Use `references/` for stable details that would clutter the main guide: schemas, metrics, tool parameters, task catalogs, scripts, output artifacts, baseline methods. References are lookup material, not the main teaching path. If a reference grows a long explanation of why or how behavior works, move that explanation into a walkthrough or module page and keep the reference as a table/catalog. If a module page accumulates exhaustive tables, move those tables down into a reference page and leave only the responsibility, representative example, risk, and verification path in the module page.

## Evidence Standard

Each important claim should be one of:

- **Confirmed:** linked to code, tests, config, data, docs, or output.
- **Inferred:** reasoned from nearby evidence and marked as inference.
- **Unknown:** awaiting verification.

Use source links when possible. Include exact line links when available; otherwise link to the file path and say what to search for.

## Follow-up Question Loop

When the user asks a new question:

1. Read `repo-docs/README.md`, the main walkthrough, and any relevant module/reference docs.
2. Inspect the source-of-truth code, data, config, tests, or artifacts behind the answer.
3. Decide whether the question reveals stable missing context. For transient run state, one-off debugging, or personal preference, answer in chat; record it in the guide when the user asks.
4. Patch the smallest relevant doc section when stable guide content is missing or stale.
5. If the question reveals a missing concept, add it to `glossary.md`, optional `flows.md`, or a relevant reference only when that concept will recur.
6. If it reveals an unresolved issue, add a short caveat beside the affected topic. Create a separate questions/risks file only when the list is large enough to reduce clarity.
7. Answer the user with the conclusion and link to the updated doc.

## Project Change Sync

Use this when code, data, config, scripts, tests, docs, or project architecture changed after `repo-docs/` was written. If the current turn made those changes and `repo-docs/` exists, run this check before final response; follow the user's explicit scope when they ask to leave docs untouched.

This is an impact audit. Use it to ask "which reader understanding changed?" before touching files.

## Documentation Content Sync Alignment

Use this strategy when the user asks to sync, tidy, clean up docs, update memory, prepare a handoff, finish a milestone, repair stale docs, or make the repo ready for a newcomer. Act as a knowledge-base editor: audit the whole knowledge system, merge repeated facts, correct stale facts, remove obsolete notes, and keep every reader-facing layer aligned with current code.

### Knowledge layers

Different layers serve different readers:

| Layer | Audience | Responsibility | Healthy shape |
| --- | --- | --- | --- |
| Agent memory, when available | The agent across sessions | Personal preferences, cross-project references, recent lessons, and compact reminders. | Thin, current, pointer-heavy. |
| Root `AGENTS.md` / `CLAUDE.md` | Future agents working inside this repo | Hard boundaries, commands, environment rules, red lines, routing tables, and guide maintenance policy. | Short, operational, rule-oriented. |
| `README.md` and `repo-docs/` | Human teammates, downstream users, and future agents | Onboarding, architecture, operations, integration, APIs, repo docs, and references. | Thick authority layer with current facts. |

Root agent files are rule manuals. Put details in `repo-docs/`; keep root instructions for facts that prevent future agents from breaking project boundaries. Put historical narratives in `change-log.md`, `references/history.md`, git history, or a project changelog.

### Promotion rule

Agent memory often grows by appending. Docs converge by editing current facts in place. Use promotion to keep memory thin:

| Memory item | Destination |
| --- | --- |
| Same lesson appears repeatedly | Owning guide page, module doc, or root rule. |
| Item explains how the system works | `repo-docs/`, with memory reduced to a pointer if useful. |
| Item records a project fact that is now current | Current-state docs plus `change-log.md` when the change is meaningful. |
| Item is a personal or cross-project preference | Agent memory. |

The deciding question: will the next maintainer, teammate, downstream integrator, or future agent need this knowledge to understand or operate the project? If yes, make docs the source of truth.

### Size and freshness audit

Run size checks before content sync:

| File or area | Target | Action when large |
| --- | --- | --- |
| `AGENTS.md` / `CLAUDE.md` | About 300 lines or 15KB | Compress to rules, command tables, red lines, and doc pointers. Move detailed mechanisms into docs. |
| Memory index, when present | At most 200 lines and 25KB | Promote stable knowledge into docs; leave compact pointers and recent lessons. |
| Single memory file | About 100 lines | Split recent lessons or promote stable mechanism content. |
| Single docs page | About 1500 lines | Split by concept, workflow, module, or reference type; add an index page. |

Also compare memory size against docs size when memory exists. Healthy projects have docs as the heavier authority layer and memory as the lighter routing layer.

### Inventory pass

Before deciding what to change, enumerate the knowledge surface:

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
| New feature crossing several modules | README, repo docs, architecture, module docs, runbook, change log, handoff notes. |
| Cross-project contract change | Upstream and downstream docs, SDK/API references, integration examples. |
| Completed plan or replaced decision | Current docs updated in place; durable history recorded in `change-log.md` or archive. |
| Terminology or policy change | Glossary, affected module docs, references, root rules when it changes agent behavior. |

For a new capability, cover four reader questions: how to use it, how it works, how to operate it, and how to know it shipped.

### Editing principles

- Prefer reducing, merging, and editing current facts in place.
- Add new text where it changes a reader decision or prevents a future mistake.
- Keep root agent files operational: boundaries, commands, environment, permissions, routing, red lines, and guide policy.
- Keep docs reader-facing: onboarding, architecture, operations, integration, examples, contracts, and references.
- Use absolute dates such as `2026-06-23`.
- Keep API tables, environment tables, glossary entries, and command references current.
- For memory, promote stable knowledge into docs and leave compact pointers when useful.
- For cross-project changes, run the inventory and impact mapping for each affected project.

### Sync checklist

- [ ] Size checks ran for root agent files, docs pages, and memory indexes when present.
- [ ] Stable memory knowledge graduated into docs or root rules.
- [ ] Root agent instructions contain operational rules and guide policy.
- [ ] README and docs teach external readers how to understand, run, integrate, and operate the project.
- [ ] Changed APIs/routes appear in integration and architecture docs.
- [ ] Changed environment variables appear in setup/runbook docs and root instructions.
- [ ] Changed data models or schemas appear in architecture and reference docs.
- [ ] Cross-project effects are reflected in every affected project.
- [ ] Relative-time language such as today, yesterday, recently, 今天, 昨天, 最近 has been replaced with absolute dates.
- [ ] Local links, paths, commands, tool names, and environment variables resolve against the current repo.
- [ ] The final summary lists actual changed files and any unresolved item.

### Closeout summary

After edits, summarize by changed layer:

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
| New or renamed entrypoint/script | `README.md`, relevant walkthrough, optional `flows.md`, `change-map.md`, relevant module doc |
| Runtime/session/control-flow change | relevant walkthrough, optional `flows.md`, optional `flows/<topic>.md`, `modules/*runtime*.md`, `README.md` module map |
| New tool or changed tool args | `references/tools.md`, tools module doc, `change-map.md`, glossary if term changed |
| Data/schema/task/config change | data/task module doc, relevant reference doc, local caveat if uncertainty remains, `change-log.md` when user-facing |
| Policy or metric change | policy/evaluation module doc, metrics reference, main guide confidence/summary |
| Memory method change | memory module doc, method reference docs, artifacts reference if outputs changed |
| Output/log artifact change | logging/artifacts module doc, artifacts reference, run/debug sections |
| Module moved/deleted/merged | corresponding `modules/*.md`, main guide module map, links from other docs, `change-log.md` |
| Terminology changed | `glossary.md`, main guide, affected module/reference docs |
| User-facing docs generated or reorganized | `README.md`, affected docs, repo-root agent instruction files, `change-log.md`, `references/history.md` if archiving |
| Research experiment or baseline change | research overview/main guide, entrypoint docs, metrics reference, artifacts reference, reproduction path |

### Sync checklist

- [ ] If `repo-docs/` exists and source/data/config/test behavior changed, sync was considered before final response.
- [ ] Every changed source area maps to a current doc or a local caveat beside the affected topic.
- [ ] Module docs point to current modules.
- [ ] Main guide includes quick understanding, reproduce/run, and modify-safely reader paths.
- [ ] Non-Seed repos include `walkthroughs/one-real-run.md`, linked from README.
- [ ] Walkthroughs use real project names and explain inputs, state changes, outputs, risks, and verification.
- [ ] Module docs explain where the module appears in a walkthrough before listing responsibility details.
- [ ] Main guide module map matches the `modules/` directory.
- [ ] Repo-root agent instruction files mention `repo-docs/` guide synchronization when they exist.
- [ ] `change-map.md` is prospective and `change-log.md` is retrospective.
- [ ] `change-log.md` entries use precise local timestamps with date, time, and timezone.
- [ ] `change-log.md` is recent enough to scan; older entries are archived when needed.
- [ ] If `flows.md` exists, it maps relationships between multiple paths, phases, states, or outputs instead of duplicating the main walkthrough; detailed flows live under `flows/<topic>.md` when useful.
- [ ] Reference docs contain stable catalogs and exhaustive tables; module docs contain responsibilities, contracts, representative examples, risks, and verification for behavior boundaries, transformations, lifecycle, and failure modes.
- [ ] Local Markdown links resolve.
- [ ] Current facts are edited in place; historical notes are used for durable history.
- [ ] Documentation content sync alignment ran when the user asked for sync, tidy, handoff, milestone closeout, memory refresh, or stale-doc repair.

## Quality Bar

The docs are good when a newcomer can answer these in about 15 minutes using the guide alone:

1. What is the repo trying to accomplish?
2. What is the shortest path to understand one real run?
3. How do I reproduce or run the main experiment/workflow?
4. What are the 5-10 major modules and why do they exist?
5. What data contracts or schemas are dangerous to break?
6. Where would I change tasks, tools, prompts, metrics, outputs, or methods?
7. For research repos: what is the research question, method, metric, data contract, and baseline/ablation story?
8. What caveats matter for the topic I am reading right now?
9. For any important rule, contract, transformation, or lifecycle step, what is one concrete example that works and one boundary case that fails?
10. Can a newcomer trace one real workflow from observable entry to output/artifact without opening source code first?
