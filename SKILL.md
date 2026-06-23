---
name: repo-docs
description: Use when a user asks to understand a repo, reduce the gap between the user and vibe-coded code, generate or maintain repo docs, answer repo-architecture questions, seed docs for a new or empty project, update docs after code/data/config/test changes, sync docs after a milestone, or keep repo docs current.
---

# Repo-Docs

## Core Idea

`repo-docs` exists to reduce the understanding gap between a user and a project that is changing through vibe coding. Vibe coding can make code move faster than the user's explanation of the project. This skill keeps the explanation close to the code by building a teaching path: start from one real observable workflow, walk through the code/data/state changes that make it happen, then explain the module boundaries and references behind it.

Treat documentation as the alignment layer between the user and the project. Favor walkthrough-led understanding, coherent project explanation, durable maintenance guidance, and source-backed examples over file inventories, giant reports, chat transcripts, or decorative overview pages.

## First principles

1. **The user is trying to keep up with a moving project.** Explain the problem, vocabulary, design pressure, and project-specific choices before expecting file names to make sense.
2. **Understanding should feel continuous.** Each page should carry the reader from "what I can observe or do" to "why the system is shaped this way" to "where the code proves it."
3. **Source truth wins.** Code, tests, config, data, scripts, artifacts, and current project docs beat memory or older docs. Mark unverified claims as `Unknown` or `未确认`.
4. **Structure follows understanding.** Add, merge, shorten, or delete pages based on whether they help the reader choose, run, modify, debug, or evaluate the repo.
5. **Style serves evidence.** Use pyramid writing with a calm, human voice: conclusion first, then reason, path, implication, and caveat. Good prose stays traceable to source evidence.

## When to Use

Use this skill for four modes:

| Mode | Trigger | What to do |
| --- | --- | --- |
| Seed | User is starting a new project, the repo has no substantive source/runtime files, or the repo only has planning/readme/agent files. | Create a lightweight project brief and living docs scaffold from stated goals, decisions, and current unknowns. Do not present planned behavior as implemented. |
| Build | User asks to understand a repo, generate docs, or onboard readers. | Create focused repo docs from source evidence. For non-Seed repos, first choose one representative real workflow/task/request and build the docs around a walkthrough of that path. |
| Sync | User says docs are stale, asks to tidy/sync, finishes a milestone, or code/data/config/scripts/tests changed in a repo that already has repo docs. | Reconcile existing repo docs with current source truth. |
| Question refinement | User asks a non-trivial repo-specific question and repo docs exist. | Read the relevant docs and source, patch stable gaps, then answer. |

Keep trivial chat, transient run status, and one-off debugging notes as chat answers. When the user asks to sync, tidy, reconcile, hand off, finish a milestone, refresh memory, or make docs ready for the next reader, run the built-in documentation content sync alignment strategy.

## Mental Model Test

Before choosing files or headings, decide what understanding the reader must gain. For each topic, answer these questions:

| Question | Why it matters |
| --- | --- |
| What problem is this part of the repo solving? | Prevents file summaries from replacing explanation. |
| Why is the design shaped this way? | Exposes constraints, tradeoffs, and project intent. |
| Which real code/data/config path proves it? | Keeps claims source-backed. |
| What example would make it concrete? | Turns abstract contracts into usable understanding. |
| What can a maintainer safely change after reading this? | Connects docs to action. |
| What remains inferred or unknown? | Keeps confidence honest. |

A repo-docs page should answer these questions before it remains in the docs package; otherwise revise its scope, merge it into the owning page, or remove it.

## Learning Arc

Make `repo-docs/` feel like one coherent teaching path, even when it spans multiple files:

```text
Observable behavior -> Why it matters -> Real path -> Code evidence -> Change scenario
```

Use this arc across the docs package and inside major pages. Start from something the reader can recognize: a command they run, a UI/API request, a task entering the system, a generated artifact, a failure in logs, or a user workflow. Then show why the project exists, how the mainline moves, which boundaries keep it sane, and how a maintainer would safely change it.

For any non-Seed repo, include at least one end-to-end walkthrough before module/reference material. The default walkthrough is `repo-docs/walkthroughs/one-real-run.md`; it should trace a real command, request, task, or failure through input/data, runtime path, state changes, key decisions, output/artifact, change risk, and verification.

Every substantial page should carry a quiet "module brief" in its design, rendered as a separate section only when useful:

- **Reader question:** the durable question this page answers.
- **Key insight:** the one idea the reader should carry away.
- **Behavior path:** the real command/request/input/output path that makes the idea concrete.
- **Source evidence:** the code, data, tests, config, or artifact proving the claim.
- **Maintenance scenario:** a realistic change/debug decision the page prepares the reader to make.

This is inspired by course design, while `repo-docs` remains a living Markdown docs package. Keep the default artifact as stable Markdown documentation. Add quizzes, lessons, screens, or course scaffolding only when the user asks for a course.

## Repo Docs Design

Default path:

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md      # required for non-Seed repos
  glossary.md
  flows.md              # optional cross-workflow/state map
  change-map.md
  change-log.md
  modules/
  references/
```

This shape is a starting vocabulary. Use fewer files for small repos. Add a page when it gives the reader a distinct concept, behavior path, contract, or maintenance decision that would make `repo-docs/README.md` too dense.

Design pages by responsibility:

- `README.md`: the repo thesis, learning path, first walkthrough link, reader paths, module map, and caveats. Do not spend the opening explaining what repo-docs itself is.
- `walkthroughs/`: behavior-first teaching paths. Split by real workflows, tasks, requests, failures, or policy boundaries, not by modules.
- `glossary.md`: repeated terms, overloaded names, and project-specific meanings.
- `flows.md` or `flows/`: optional cross-workflow, phase, or state maps when the repo has more than one meaningful path. Do not duplicate the main walkthrough as a second flow page.
- `modules/`: responsibility boundaries, representative inputs/outputs, state ownership, change points, risks, and one compact example when useful. Each module page should start from the reader confusion and where the module appears in a walkthrough.
- `references/`: exact catalogs, schemas, metrics, commands, artifacts, tool parameters, exhaustive tables, and other lookup material that would interrupt the teaching narrative.
- `change-map.md`: future change goals mapped to files, risks, and verification.
- `change-log.md`: durable recent changes to code, docs, data, experiments, or project understanding.

Fold the teaching narrative into every generated page. Each page should teach its own topic from problem to design to code path to example. Avoid file-index prose in narrative pages, such as `src/a.py does A; src/b.py does B`. If a file catalog is useful, put it in `references/` and keep README, walkthroughs, and module pages behavior-first.

## Seed Project Mode

Use Seed mode when the repository is empty or nearly empty: no substantive source files, no real runtime entrypoint, no tests, and no generated artifacts beyond initial project files such as `README.md`, `.gitignore`, license files, root agent instructions, planning notes, or empty directories.

In Seed mode, the source of truth is narrower:

- the user's stated project goal and constraints in the current conversation
- existing README, planning notes, issue text, design sketches, or agent instructions
- explicit decisions already made by the user
- repository facts that can be observed directly, such as file presence, chosen language, or empty state

Seed mode output should establish a project memory baseline, not pretend implementation exists. Use status labels consistently:

| Status | Meaning |
| --- | --- |
| `Implemented` | Confirmed by existing code, config, tests, data, or artifacts. |
| `Decided` | Explicitly chosen by the user or current project docs, but not necessarily implemented. |
| `Planned` | Intended next work, architecture, workflow, or contract that still needs implementation. |
| `Unknown` / `未确认` | Not yet decided or not verified. |

For an empty project, prefer a small scaffold:

- `repo-docs/README.md`: project brief, goals, non-goals if known, current empty-state caveat, planned first workflow, and reader paths.
- `repo-docs/change-map.md`: next implementation steps mapped to likely files, risks, and verification checks.
- `repo-docs/change-log.md`: timestamped initialization entry and meaningful user decisions.
- `repo-docs/glossary.md`: only if repeated project terms already exist.
- `repo-docs/references/decisions.md`: optional, for explicit design decisions that would clutter `repo-docs/README.md`.
- Root `AGENTS.md` / `CLAUDE.md`: short rule telling future agents to update `repo-docs/` as planned items become implemented facts.

Avoid creating module docs, detailed flow docs, API references, or metric references until there is enough code, config, data, or explicit architecture to support them. If the user has provided a planned architecture, document it as `Planned` and include the verification needed to promote it to `Implemented`.

If the project goal is unclear and cannot be inferred from local files or the current conversation, ask the user for the project thesis before writing seed docs.

## Evidence Discovery

Read enough of the repo to support the mental model:

- Project instructions and existing context: `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, `README*`, current docs.
- Runtime contracts: scripts, CLIs, package metadata, entrypoints, request handlers, runners, controllers.
- Behavior sources: schemas, config, data files, stores, tools, policies, evaluators, output writers.
- Tests and artifacts: tests that encode behavior, sample outputs, logs, generated artifacts.

Start from the repo's purpose and one real execution path, then pull file evidence where it explains that mainline or a reader decision. For Build mode on a non-Seed repo, the first stable artifact after README planning should be `walkthroughs/one-real-run.md`; module and reference pages should grow out of that path.

If no real execution path exists yet, switch to Seed mode. Start from the project thesis, current decisions, planned first workflow, and unknowns. Mark planned content explicitly and record the checks needed to verify it once implementation starts. Do not create `walkthroughs/one-real-run.md` for a planned path unless the page title and status make clear that it is planned, not current behavior.

See [REFERENCE.md](REFERENCE.md) for detailed writing standards, document types, and sync checklists. See [EXAMPLES.md](EXAMPLES.md) for expected output shapes.

## Repo Docs README Contract

`README.md` should be short and pyramidal:

1. One-paragraph answer.
2. Why the repo exists.
3. Reader paths: understand quickly, reproduce/run, modify safely.
4. The first walkthrough to read, usually `walkthroughs/one-real-run.md`.
5. Module map with links.
6. Current scope, caveats, and source-backed confidence.

For research repos, also cover the research question, method or benchmark design, experiment entrypoints, metrics and denominators, data/task/schema contracts, baselines or compared methods, and output artifacts.

For seed projects, `README.md` should be a project brief rather than an implementation guide. It should state the goal, current repo state, decided constraints, planned first workflow, immediate next steps, and unknowns. Do not include module maps, runtime paths, commands, metrics, or artifact claims unless they are already implemented or explicitly marked `Planned`. Seed projects do not require `walkthroughs/one-real-run.md` unless a planned workflow is explicit enough to document as `Planned`.

## Living docs rules

- `walkthroughs/*.md` are teaching paths through real behavior. Non-Seed repos should have `walkthroughs/one-real-run.md` before module/reference docs are considered complete.
- `modules/*.md` are current contracts for responsibilities, inputs/outputs, state boundaries, change points, and risks. They should point back to where the module appears in a walkthrough.
- `change-map.md` is prospective: future change goal -> files -> risks -> tests.
- `change-log.md` is retrospective: meaningful user request -> actions -> result -> verification. Keep it recent; archive older entries when it grows past roughly 8 entries or 120 lines.
- Repo-root `AGENTS.md` or `CLAUDE.md` should contain a short project documentation strategy when `repo-docs/` exists or is created.
- Treat nested vendor/reference repos such as `materials/`, `reference/`, dependency snapshots, or copied benchmark repos as external context. Update them when the user is documenting that nested repo itself.

## Documentation Content Sync Alignment

When the user asks for sync, tidy, cleanup, handoff, milestone closeout, memory refresh, stale-doc repair, or "新人能直接上手", act as a knowledge-base editor. Reconcile project docs, root agent instructions, and agent memory against current code and data so stable knowledge has one clean home.

Use three audience layers:

| Layer | Audience | Responsibility |
| --- | --- | --- |
| Agent memory, when available | The agent across sessions | User preferences, cross-project pointers, recent lessons, and compact reminders. |
| Root `AGENTS.md` / `CLAUDE.md` | Future agents in this repo | Hard boundaries, commands, environment rules, red lines, routing tables, and repo-docs maintenance policy. |
| `README.md` and `repo-docs/` | Human teammates, downstream users, and future agents | Architecture, onboarding, operations, integration, API/reference material, and repo-docs pages. |

Promote stable knowledge upward. A memory item graduates into docs or root agent instructions when the same lesson repeats, when it explains how the system works, or when it records a now-current project fact. Keep memory as a thin layer of pointers and recent lessons.

Before editing, inspect size and scope: line counts for root agent files, repo-docs pages, and memory indexes; docs should remain the thick authority layer while memory stays thin. Then inventory relevant files, map each code/data/config/test change to the docs it affects, edit current facts in place, merge duplicate pages, remove stale pages, and record durable changes in `change-log.md`.

Sync order:

1. Update `repo-docs/` and `README.md` for external readers.
2. Update `AGENTS.md` / `CLAUDE.md` with operational rules and repo-docs policy.
3. Update or shrink agent memory when the platform supports it.
4. Verify local links, paths, commands, environment variables, dates, and stale relative-time language.

See [REFERENCE.md](REFERENCE.md) for the full sync matrix, size checks, promotion rules, and closeout checklist.

## Language

Choose one primary language for `repo-docs/` and keep the pack consistent.

- Follow an explicit user language request.
- If `repo-docs/` already exists, keep its primary language unless conversion is requested.
- If building from scratch and no language is specified, use the user's current language.
- Preserve code identifiers, paths, commands, config keys, API names, class/function names, metrics, protocol fields, and error strings exactly.
- Prefer one primary language for repo docs so future sync work has a single source of truth.

Use `repo-docs-zh` when the user asks for Chinese docs or invokes that skill.

## Writing standard

Write like a maintainer walking a careful reader through the system. Each major page or section should move in this order:

```text
Conclusion -> Reason -> Real path -> Implication -> Caveat
```

Prefer exact actors and verbs: "the script reads `.env`, then `run_once()` builds the session." Use source-backed claims, concrete significance, plain rhetoric, restrained emphasis, and current-state narration in current-state docs. Good prose stays traceable to source evidence.

Depth standard:

- Explain why a design exists before listing files that implement it. In narrative pages, prefer behavior-first explanation over file-by-file inventory.
- Begin explanations from a recognizable behavior before dropping into internals.
- Use at least one concrete project-native example when explaining a lifecycle, policy, metric, task contract, or state transition. The main walkthrough should use real file names, functions, commands, data records, or tests.
- Pair important code paths with plain-language translation: what this code receives, what it changes, what downstream code relies on.
- Prefer applied maintenance scenarios over recall questions: "if you change X, inspect Y and verify Z."
- Add bridge paragraphs between tables and code paths. A table alone is rarely a teaching document.
- Include missing context whenever a paragraph depends on prior chat context.
- Apply this depth standard to every generated page, including README, module docs, flow docs, references, and change maps. Let every page carry its share of the teaching narrative.

Choose depth by design weight. Expand where the repo has non-obvious constraints, policy decisions, data contracts, evaluation denominators, runtime state, extension boundaries, or failure modes. Stay compact where the concept is conventional and the source path is enough.

## Question Refinement

When the user asks a non-trivial repo-specific question and `repo-docs/` exists, treat the question as a documentation-quality test:

- Read `repo-docs/README.md`, the main walkthrough, and the current repo-docs page that should answer it.
- Read the source-of-truth code, data, config, test, or artifact behind the answer.
- If the docs are missing, stale, thin, or misleading, patch the owning page before answering.
- Answer from the updated docs and source evidence.

## Quality Moves

| Goal | Move |
| --- | --- |
| Explain the mainline | Start from one real execution path and turn it into `walkthroughs/one-real-run.md`. |
| Keep ownership clear | Patch the owning page when a question fits an existing responsibility boundary. |
| Keep prose source-backed | Add evidence or mark the claim as inference. |
| Keep language synchronized | Use one primary language unless the user asks for parallel docs. |
| Teach beyond an index | Add design motivation, a concrete walkthrough, and the reasoning path from problem to code on the owning page. |
| Keep depth distributed | Fold explanations into README, walkthroughs, modules, and references, while keeping lookup tables in references. |
| Match the repo's concepts | Design repo docs around reader decisions and the repo's responsibility boundaries. |
| Keep the artifact maintainable | Use Markdown docs as the stable format; borrow learning flow, examples, and code translation from teaching practice. |
| Translate code into meaning | Explain what the snippet proves and what a maintainer can do with it. |

## Verification

Before finishing, check:

- `repo-docs/README.md` exists and links to supporting docs.
- Non-Seed repos have `repo-docs/walkthroughs/one-real-run.md`.
- Local Markdown links resolve.
- A newcomer can answer: what is this repo, how does one real run or request move, where are the major modules, and where do common changes belong?
- For seed projects, planned items are clearly separated from implemented facts, and no missing code path is described as current behavior.
- A newcomer can explain the design in their own words using repo docs alone.
- A newcomer can trace one real workflow without opening source code first, then know which source files prove each step.
- Reader paths for quick understanding, reproduction/run, and safe modification are present.
- Module docs match current code ownership; stale, duplicate, and tiny orphan docs have been merged, revised, or removed.
- `change-map.md` teaches future edits; `change-log.md` records meaningful recent work.
- Caveats are placed beside the affected topic.
- Repo-root agent instructions mention how to keep `repo-docs/` current when those files exist.
