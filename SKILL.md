---
name: repo-docs
description: Use when a user asks to understand a repo, reduce the gap between the user and fast-changing or vibe-coded code, generate or maintain repo docs, answer repo-architecture questions, seed docs for a new or empty project, update docs after code/data/config/test changes, sync docs after a milestone, delete generated repo docs, or keep repo docs current.
---

# Repo-Docs

## Core Contract

`repo-docs` builds a human-readable mental model for a repository. It moves a reader from user-level intent to code-level confidence through project purpose, one real behavior path, plain concepts, source locators, reference contracts, and safe change paths.

It is not a source index, a code summary, or a file-count exercise. Start from behavior the reader can recognize, then introduce code names only when they help locate, verify, or change something.

Keep the stable artifact as Markdown under `repo-docs/`. Use source evidence over memory, chat history, or older docs. Mark unverified claims locally instead of smoothing over gaps.

## Teaching Philosophy

Treat every docs package as a code-understanding lesson. The reader should move from concept to code, not from file tree to concept:

```text
user goal -> project question -> plain model -> real path -> concept explanation -> source locator -> reference lookup -> safe change
```

Each page serves one reader learning state. Each code name should follow an already-understood concept. `modules/` pages are concept pages: they explain one durable idea with one real example, source locators, risk, and verification.

## Modes

| Mode | Trigger | Action |
| --- | --- | --- |
| Seed | The repo has no substantive source/runtime files, tests, data contracts, or artifacts. | Create status-labeled project memory from stated goals, decisions, plans, and unknowns. Do not present planned behavior as implemented. |
| Build | The user asks to understand a repo, generate docs, or onboard readers. | Build docs from source evidence around one representative real workflow/task/request. |
| Sync | Docs are stale, a milestone ended, or code/data/config/scripts/tests changed. | Reconcile existing repo docs with current source truth and record meaningful changes. |
| Cleanup / removal | The user asks to delete generated repo docs or stop using repo-docs. | Remove the docs package and stale root pointers; do not recreate docs in the same turn unless explicitly requested. |
| Question refinement | A non-trivial repo question reveals a stable documentation gap. | Read the owning docs and source, patch reusable gaps, then answer from evidence. Do not patch docs for one-off status/debug questions. |

Read [REFERENCE.md](REFERENCE.md) for detailed writing standards and [EXAMPLES.md](EXAMPLES.md) for templates when the task requires more than this core workflow.

## Build Order

For non-Seed repos:

1. Read project instructions, README, scripts/CLIs, tests, schemas, config, data, artifacts, and existing docs.
2. Choose one representative real workflow/task/request/failure that proves the project shape.
3. Write `README.md` and `walkthroughs/one-real-run.md` before deep module/reference pages.
4. Run the teaching pass below to decide module and reference pages.
5. Write `modules/`, `references/`, `glossary.md`, `change-map.md`, and `change-log.md`.
6. Verify links, source claims, required files, and readability.

For a large repo or monorepo, scope first: document one target subsystem or workflow, name walkthroughs by behavior, and record uncovered areas in `change-map.md`. See [REFERENCE.md](REFERENCE.md).

For Seed repos, write only status-labeled project memory: `README.md`, `change-map.md`, `change-log.md`, `glossary.md`, and `references/decisions.md`. Planned workflows stay in README or change-map until real runtime evidence exists.

## Canonical Output

This is the operational structure. README.md keeps a human-facing copy of the same tree; keep the two in sync.

Non-Seed structure:

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md
  modules/
  references/
  glossary.md
  change-map.md
  change-log.md
```

Lite shape: for a small or single-purpose repo with few concepts and no dense lookup tables, drop `modules/`, `references/`, and `glossary.md` until they are needed, keeping `README.md`, `walkthroughs/one-real-run.md`, `change-map.md`, and `change-log.md`. Validate with `--lite`; [REFERENCE.md](REFERENCE.md) carries the promotion rules.

Triggered pages:

- Additional walkthroughs: distinct user behaviors, failure modes, policy cases, or data-to-output paths.
- `flows.md` or `flows/`: relationship maps for multiple workflows, runtime phases, state transitions, or output/evaluation paths. Do not use it to retell `one-real-run.md`.
- `evidence-ledger.md`: claim/evidence/confidence tables when local labels no longer keep claims auditable.

`change-log.md` is standard. Keep it compact and record meaningful changes to code, docs, data, experiments, or project understanding, not trivial chat.

## Teaching Pass

Before a non-Seed package is complete, confirm the reader can build a useful model before learning code names. Satisfy two gradients:

- Reader understanding: `observable behavior -> plain concept -> why it matters -> source locator -> verification`
- Change readiness: `future change goal -> concept to understand -> files to inspect -> risk -> verification check`

Add pages only when they lower cognitive load, never to hit a count; merge pages only when they teach the same concept. See [REFERENCE.md](REFERENCE.md) for the full teaching-pass rules.

## Markdown Teaching Display Protocol

Use Markdown as a teaching interface, not decoration: learning-state headings (`What You Are Looking At`, `Plain Model`, `What To Notice`, `Source Locator`, `Verification`), blockquotes for short cues, tables for comparison and lookup, fenced blocks for verifiable text, Mermaid only for multi-path/phase/state relationships paired with prose, and `<details>` only for long source detail. Never hide the main teaching path. Full element-by-element guidance is in [REFERENCE.md](REFERENCE.md).

## Reader Jobs

- `README.md`: project answer, scope, caveats, main walkthrough link, reader routes, and a light map of useful concept/reference pages.
- `walkthroughs/`: behavior-first worked examples using real commands, files, functions, data, tests, routes, or artifacts.
- `modules/`: readable concept pages for things the walkthrough introduces but cannot fully explain without becoming dense.
- `references/`: high-density lookup material for fields, schemas, commands, artifacts, tools, metrics, data contracts, and task catalogs.
- `glossary.md`: repeated or project-specific terms.
- `change-map.md`: future change goals mapped to files, risks, and checks.
- `change-log.md`: durable recent changes and verification results.

## Writing Standard

Follow the comprehension gradient from Teaching Philosophy across the whole package; [REFERENCE.md](REFERENCE.md) carries the full version.

Keep code-name density low in README and the opening of walkthroughs. Module pages may use moderate code names, but each name must serve an explained concept. References are the default high-density pages.

Write with a human technical voice: concrete claims, accurate caveats, fluent paragraphs, and no filler. Avoid broad praise, decorative punctuation, and formulaic contrast patterns such as `not X but Y`; state the positive claim directly and tie it to evidence.

Each substantial page should answer, explicitly or implicitly:

- Reader question: what durable confusion does this page resolve?
- Key insight: what should the reader understand after one minute?
- Behavior path: which real command/request/input/output makes the idea concrete?
- Source evidence: which code, data, test, config, doc, or artifact proves it?
- Maintenance scenario: what can the reader safely change or debug after reading?

Avoid file-index prose such as `src/a.py does A; src/b.py does B` in narrative pages. Put catalogs in references.

## Evidence Rules

Use one status family on every page: README, walkthroughs, modules, references, and change maps. Mix labels locally only when a single page carries claims at different confidence.

| Label | 中文 | Use when |
| --- | --- | --- |
| `Confirmed` | `已确认` | Current repo evidence (code, data, tests, config, command output, artifacts) directly shows it. |
| `Inferred` | `推断` | Reasonable inference from inspected evidence, not directly asserted or tested. |
| `Planned` | `计划中` | Accepted or decided future work or design that is not implemented yet. |
| `Unknown` | `未确认` | Plausible, disputed, or not yet verified. |

Confidence and source are separate. When support comes from outside the repo (external papers, docs, design notes), keep the confidence label and add an inline source note, such as `Inferred (prior work: ...)`.

Do not invent files, functions, data records, task ids, fields, commands, metrics, artifacts, tool parameters, or test names. If evidence was not inspected, do not cite it as proof.

## Source Truth Protocol

Keep code and data claims consistent with inspected evidence.

- Treat current source, tests, config, data, command output, and artifacts as the truth for implemented behavior.
- Treat README files, older docs, memory, papers, and user descriptions as context until runtime evidence confirms them.
- If code and data disagree with old docs, write the current fact and place a caveat beside the affected topic.
- Use real project names in generated docs only after inspection. Use placeholders only when explicitly labeled as placeholders.
- A `Confirmed` / `已确认` claim needs a source locator, test, command output, data row, config key, artifact, or local doc that was actually inspected.
- Keep examples from this skill as examples. Do not copy their fictional paths, fields, commands, or results into a real repo.

## Sync And Cleanup

When syncing, promote stable knowledge into `repo-docs/`, keep root `AGENTS.md` / `CLAUDE.md` operational and short, and keep memory as pointers when available. Patch current facts in place, merge duplicate pages, remove stale pages, and record meaningful updates in `change-log.md`. Record the commit each sync covers in `change-log.md`; on the next sync, scope the impact audit with `git diff <last-sha>..HEAD` instead of re-reading the whole tree.

When deleting repo docs, remove stale guide directories, stale root maintenance policies, and broken guide links. Do not recreate a replacement package in the same turn unless the user asks.

## Verification

Before finishing:

- Check required non-Seed structure, or status-labeled Seed structure.
- Check local Markdown links.
- Check `flows.md` is only a relationship map when it exists.
- Check the teaching pass: README, walkthroughs, modules, and change-map build a mental model before introducing dense code names.
- Check Markdown display choices help the learning path instead of adding decoration or hiding the main path.
- Run `python scripts/validate_repo_docs.py <path-to-repo-docs>` when the script is available.
