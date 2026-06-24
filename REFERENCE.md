# Repo-Docs Reference

## Positioning

`repo-docs` has a focused documentation contract:

| Area | repo-docs | repo-tour |
| --- | --- | --- |
| Default output | Markdown documentation pack | Full HTML knowledge pack |
| Graph | Available when it helps the reader | Required for code architecture facts |
| Goal | Maintainable human docs | Complete interactive tour |
| Iteration | User Q&A continuously improves docs | Regenerate or patch a tour artifact |
| Best for | Onboarding, project understanding, living notes | Deep review, visual architecture tour, archival artifact |

## Explanation Design

`repo-docs` should feel like a capable engineer explaining the repo at a whiteboard, then pointing to the exact code. The first job is understanding. The second job is verification.

Reader outcome, package layers, narrative beats, and prose rhythm are canonical in [SKILL.md](SKILL.md) Content Organization. Page shapes and ownership are in [SKILL.md](SKILL.md) Page Design.

A good guide lets a newcomer answer in about 15 minutes: what the repo is for, what one real run looks like, which ideas matter, where exact contracts live, what is risky to touch, and how to check a change.

The style target is plain, alive, and technically sharp. Use Andrej Karpathy and Kaiming He as references for the feel: simple words, real mechanism, no pomp, no fake certainty, no long preamble. Explain the idea first. Then show the code.

OpenAI's Codex writing and Claude Code's best-practice docs show the pattern to copy. The opening says what changed in the work. The next section explains how the system actually runs. Verification is not decorative: logs, tests, citations, screenshots, and command output are how the reader knows what happened. Claude's docs also keep returning to one practical constraint at a time: give the agent a check, explore before coding, provide specific context, keep persistent instructions short. Use the same style here.

Anthropic's harness writeup is the closest model for long-form flow. It does not begin by cataloging components. It begins with a real problem, names the failure modes that kept showing up, introduces one mechanism to address them, reports what happened in runs, then admits where the mechanism still cost too much or missed bugs. Use that shape for repo docs whenever the reader needs to understand a system rather than look up a fact.

Keep stable knowledge in the guide. Keep transient run state, one-off debugging notes, and chat history in chat unless the user explicitly asks to preserve them. Each sync may delete, merge, or shorten docs when that makes the reader's model cleaner.

Each page is an explanation unit answering one durable reader question. Pages that mainly catalog files, fields, commands, or classes belong under `references/`. Narrative pages carry connected prose split by story beats. For non-Seed repos, the first explanation unit is `walkthroughs/one-real-run.md`.

Use the discipline of a good engineering note while keeping the guide a living project document:

| Explanation move | How repo-docs should use it |
| --- | --- |
| Start with the thing the reader recognizes | Begin with a user action, command, request, artifact, failure, or data record. |
| Give the simple model | Say what is happening in normal technical language before using source names. |
| Show why it exists | Explain the design reason, constraint, tradeoff, or bug it avoids. Do not pretend you know the author's private intent. |
| Point to code only after the model lands | Source locators should confirm the explanation, not replace it. |
| End with action | Say what to inspect, what can break, and how to verify. |

When a section feels vague, rewrite it around one concrete design reason:

| Weak center | Better center |
| --- | --- |
| "Architecture overview" | "How a request becomes a scored result." |
| "Module responsibilities" | "Where the handoff happens and what can break." |
| "Robust system design" | "What check catches a wrong output." |
| "Configuration surface" | "Which knob changes runtime behavior." |

The main document should orient the reader enough to choose the next useful page. Use Markdown as a clear technical note, not as a course UI or a compliance form.

## Page Design

Canonical rules for continuity, headings, content ownership, default page shapes, and narrative beats live in [SKILL.md](SKILL.md) Content Organization and Page Design. The subsections below add page-type specifics only.

## Writing Style

Write like a real person who understands the code.

The tone should be direct and calm. Short sentences are fine. A little rhythm is good. The page should sound like a maintainer saying, "Here is the idea; here is where it happens; here is what can go wrong." It should not sound like an LLM trying to sound comprehensive.

"娓娓道来" means the explanation unfolds one reason at a time. It is not looseness, and it is not extra preamble. A strong section can often follow this path: observable situation, design reason, choice, concrete behavior, verification, limitation. If a section starts with a list of modules, it usually skipped the situation and reason.

Use this order at page and section level:

1. Conclusion: what the reader should understand.
2. Reason: why this part exists or why the reader should care.
3. Mechanism: what receives input, changes state, returns output, or protects an invariant.
4. Path: the actual code/data/config flow that proves it.
5. Implication: where to change it, how to verify it, or what can break.
6. Caveat: what is inferred, unknown, or intentionally out of scope.

For narrative pages, use paragraphs for reasoning. A good paragraph has one point, one reason, and a concrete hook into behavior or source. Use bullets and tables for comparison or lookup. Do not build the whole page out of bullets. Do not turn every walkthrough step into the same stack of `###` reader-state headings when prose and inline locator labels would keep continuity.

Use first-person only when the repo or project history actually supports it. Otherwise write from the project: "the runner does this because", "the current check catches", "this leaves". The style should feel human without inventing an authorial diary.

Do not let source confidence labels become the prose rhythm. Default evidence status belongs at the **end** of narrative pages (see [SKILL.md](SKILL.md) Evidence Rules). Use local labels only where confidence changes or where a statement would be surprising without explicit evidence.

Concrete engineering prose is the default. This is the expression strategy behind the Anthropic harness post: it uses everyday engineering verbs, attaches judgments to observations, introduces terms after the reader has a concrete problem in mind, and keeps uncertainty visible. Apply that at sentence level:

| Weak expression | Better expression |
| --- | --- |
| "The system improves robustness." | "The parser rejects a missing `task_id` before the runner starts, so the scorer never sees a half-built session." |
| "This module handles orchestration." | "This module starts the run, waits for each step to finish, and writes the artifact path that later checks read." |
| "The architecture is extensible." | "A new checker only needs to implement the same input and result shape; the runner already loops over that list." |
| "The project uses an evaluator." | "The generator writes the output. A separate evaluator opens it, runs the checks, and records the bugs it found." |

Use this as a sincerity test: after a paragraph, ask what the reader can now see, run, inspect, or doubt more precisely. If the answer is "they know the project is important", rewrite it.

Reading experience rules:

- Make every sentence carry a concrete point, caveat, observation, or transition.
- Prefer accurate small statements over broad statements such as "this is important" or "the system is robust".
- Replace abstract nouns with the action that happens in the repo when possible.
- When a sentence contains a value judgment, attach a visible reason or remove the judgment.
- Keep prose fluent. Avoid overusing dashes, quotation marks, parenthetical asides, and decorative emphasis.
- Avoid formulaic contrast patterns such as "not X but Y" and "not only X but also Y"; state the positive claim directly.
- Use examples from inspected source when a concept would otherwise feel abstract.
- Let the paragraph explain why the reader should care before introducing dense names.
- Prefer human words over framework words: say "what changes" before "state transition", say "where it starts" before "entrypoint architecture", say "what can break" before "risk surface".

Polished writing stays concrete. Replace inflated language with:

- statements about importance, impact, or "the evolving landscape" that the repo itself supports
- precise adjectives tied to an inspected constraint or behavior
- direct verbs such as "is", "reads", "writes", "checks", and "computes"
- lists that separate real concepts, states, or reader jobs
- paragraph endings that give a concrete next step or caveat
- headings followed by substance that advances the explanation
- current-state narration in current-state docs
- narrative transitions that carry reasoning: "this leaves one gap", "a natural next design is", "the current code confirms this by"

Prefer:

- exact actors and verbs: script reads config, runner builds session, evaluator computes denominator
- grounded caveats: "Unknown: no test currently covers this branch"
- compact examples tied to real code or data
- one short paragraph before a table when the table needs context
- fewer headings when the prose already carries the reader—but add a heading when it marks a real transition the reader needs
- one default evidence note per page or section, with local labels only for confidence changes
- a runnable check or inspectable artifact whenever the page asks the reader to trust a behavior

Good repo docs can have flow and texture while remaining inspectable. Trace elegant sentences to source evidence or mark them as inference.

Avoid these low-information patterns:

- starting a narrative page with a file list
- stating the project contribution before explaining the design reason that makes it plausible
- using "not X but Y" or "not only X, but also Y" as the main explanation
- turning a likely design reason into a statement that the original author definitely had that thought
- using vague praise such as "powerful", "important", "robust", or "novel" without code, data, test, artifact, or prior-work evidence
- repeating the same reader-state `###` subheadings under every walkthrough step when one `##` phase heading and connected prose would read better
- ending a walkthrough with separate `What changes`, `Change risk`, and `Verification` sections that repeat what the steps already said

## Evidence Discovery

Use repo evidence to answer the mental-model questions. These are common evidence sources:

| Evidence source | What it can prove |
| --- | --- |
| `AGENTS.md`, `CLAUDE.md`, `README*`, `CONTEXT.md` | Project contract, conventions, and current documentation policy. |
| Scripts, CLIs, package metadata, entrypoints | How a real run starts and what knobs are user-facing. |
| Runners, controllers, request handlers, sessions | Runtime flow, state lifecycle, and source paths that prove behavior. |
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

If the repo has a small amount of code but no stable workflow yet, use mixed mode: document implemented facts as `Confirmed`, planned behavior as `Planned`, and uncertain design as `Unknown` / `未确认`.

### Evidence and status labels

Seed docs use the same status family as the rest of the package (see Evidence Standard). They must separate intent from implementation:

| Label | Use when | Example wording |
| --- | --- | --- |
| `Confirmed` / `已确认` | Existing source, config, test, data, artifact, or command proves it. | `Evidence status: Confirmed. README.md exists and defines the project goal.` |
| `Planned` / `计划中` | A decided direction, proposed workflow, module, contract, or next step that is not implemented yet. | `Planned: the first version will target agent-compatible skills.` |
| `Unknown` / `未确认` | The project has not decided or verified it. | `Unknown: no test strategy has been chosen yet.` |

Do not convert chat intent into current-state facts. A user saying "we should add a CLI" is `Planned` unless a CLI exists. When a direction is explicitly locked in, mark it `Planned` and say "decided:" in prose; keep `Planned` until code proves it.

### Seed guide shape

For an empty project, use this status-labeled pack:

```text
repo-docs/
  README.md
  change-map.md
  change-log.md
  glossary.md
  references/
    decisions.md
```

`glossary.md` records confirmed terms or states that no project-specific terms are confirmed yet. `references/decisions.md` records explicit user or project decisions, or states that no durable decisions are confirmed yet.

Do not write current-state `modules/`, detailed `flows/`, API references, schema references, or metrics references until there is code, config, data, or an explicit accepted architecture to support them. If the user asks for a planned architecture, mark every unimplemented module or flow as `Planned`.

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

For seed projects, verification may be "docs scaffold created" or "decision recorded"; do not imply implementation verification when no implementation exists.

### Promotion rule

As code appears, promote seed content:

- `Planned` module -> module doc only after files or explicit architecture exist.
- `Planned` workflow -> current-state walkthrough or flow doc only after an entrypoint, script, or detailed accepted design exists. Until then, keep it in `README.md` or `change-map.md` as `Planned`.
- `Unknown` -> `Planned` when the user chooses a direction.
- `Planned` -> `Confirmed` only when repo evidence proves it.

## Reader Paths

The main guide should support three paths:

| Reader goal | What the guide should show |
| --- | --- |
| Understand quickly | thesis, why it exists, main workflow, and major concepts |
| Reproduce or run | commands, config, expected outputs, artifact locations |
| Modify safely | change map, concepts to understand, files to inspect, risks, tests |

Readers also arrive with different expertise, and scaffolding that helps a newcomer slows an expert who already holds the model. Treat plain-model and concept pages as skippable, not mandatory, and let the reading order match expertise:

| Reader | Entry point | Guidance level |
| --- | --- | --- |
| Newcomer | `walkthroughs/one-real-run.md` | connected narrative; plain model before code names |
| Intermediate | `modules/<concept>.md` | mixed: concept plus source locators |
| Expert | `references/` and source locators | minimal: contracts and exact names, scaffold skipped |

Offer this as a route in `README.md` only, not as repeated per-page banners. A short newcomer path and an expert fast-path that names its payoff (for example, `Know the domain already? Jump to the request contract in references/`) let a reader skip pages they do not need.

## Navigation Scent

Readers move through the package by following scent: at each link they judge, from the visible label and heading alone, whether the next page is worth the click. The label, not the destination, drives the decision, so a weak label sends readers down the wrong path or makes them give up.

- Every content page (`README.md`, walkthroughs, modules) should route the reader onward to the genuinely next-most-useful page. A page with no onward route is a dead end.
- Write onward links as natural in-prose links whose label names what the reader gains, not the filename and not the act of clicking. Prefer `see how scoring picks a winner in modules/scoring.md` over `see modules/scoring.md` or `click here`.
- Scent is a property of how links are written, not a widget. Do not stamp a "Next" footer on every page; place the onward link where the reader actually needs it.
- The validator enforces this from the author side: it warns on content pages with no onward link and on low-scent labels (a bare filename or words like `here`, `this`, `see`). These checks add no text to the docs.

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

## Markdown Display Protocol

Markdown is the reading interface. Use it to control rhythm and reduce cognitive load.

| Element | Use for |
| --- | --- |
| Phase headings (`##`) | Real behavior beats: `Step 1: a message becomes an event` |
| Inline labels | Rare disambiguation only; prefer paths and checks woven into prose |
| Reader-state `###` headings | Long walkthroughs or one dense phase only |
| Blockquotes | Pull quotes from external docs when needed |
| Tables | Comparisons, before/after state, risk maps, field lookup |
| Fenced code blocks | Commands, expected output, schemas, config, exact snippets |
| Mermaid | Multi-path, multi-stage, state, or output relationships, paired with prose |
| `<details>` | Long source details, full tables, long outputs |

When a page feels dense, first ask whether the reader needs a better heading, one small table, or a source detail folded into `<details>`. Do not add visual structure for decoration.

## Specialized Repo Notes

For benchmark, evaluation, safety, data-heavy, or research repositories, make sure stable docs cover the relevant project facts without pretending every project is a paper. Simple tools and CRUD projects can skip research framing and explain the real design idea directly.

| Specialized concept | Typical location |
| --- | --- |
| Project question and motivation | `README.md` or main guide |
| Method / benchmark design | main guide, module docs, design reference |
| Experiment entrypoints | main guide, `flows.md` for multi-phase runs, entrypoint module |
| Metrics and evaluation protocol | evaluation module, metrics reference |
| Data/task/schema contracts | data module, schema/task references |
| Reproduction path | main guide, scripts/reference docs |
| Baselines / ablations / compared methods | method or experiment references |
| Output artifacts | artifacts reference |


## Canonical Output Rule

Do not frame output as a file-count exercise. Use this rule:

```text
project spine -> real trace -> readable concept pages -> references -> change map -> change log
```

The first-read route for most non-Seed repos should be:

```text
README.md
-> walkthroughs/one-real-run.md
-> modules
-> references
-> change-map.md
```

Each named page serves a durable reader job. The output should feel concise because reader jobs are clear, not because files were skipped.

| Reader job | Preferred home |
| --- | --- |
| Understand the project idea and reading route | `README.md` |
| Understand the project model | `README.md` and `walkthroughs/one-real-run.md` |
| Replay one real behavior | `walkthroughs/one-real-run.md` |
| Understand a concept introduced by the walkthrough | `modules/<concept>.md` |
| Decide where and how to change safely | `change-map.md` |
| Look up exact fields, commands, schemas, tools, metrics, or artifacts | `references/<lookup-job>.md` |
| Resolve project terminology | `glossary.md` |
| Compare several workflows or phases | `flows.md` |
| Keep many statement/evidence/confidence rows out of the explanation path | `evidence-ledger.md` |
| Preserve durable doc/project history | `change-log.md` |

The canonical non-Seed shape is defined in [SKILL.md](SKILL.md); this section governs which reader job each page serves and when triggered pages appear.

Additional walkthroughs, module pages, reference pages, `flows.md`, and `evidence-ledger.md` are governed by reader-problem triggers: multiple workflows, multiple runtime phases, state transitions, policy cases, failure modes, or evidence tables that would otherwise clutter the explanation path. Use trigger language rather than file-count language.

Merge pages when they explain the same reader concept. Do not merge merely to reduce file count.

`change-log.md` is part of the standard package and should stay compact: record meaningful changes to code, docs, data, experiments, or project understanding.

### Lite shape

For a small or single-purpose repo with few durable concepts and no dense lookup tables, the package can be smaller than the standard shape. Drop `modules/`, `references/`, and `glossary.md` until a concept needs its own page or a lookup table appears:

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md
  change-map.md
  change-log.md
```

This is the same explanation path with fewer pages, not a different contract. Validate it with `python scripts/validate_repo_docs.py <path> --lite`. Promote to the full structure the moment the repo grows a concept worth its own page or a contract worth a reference table.

## Large And Monorepo Scope

A large repository or a monorepo with several independent services does not need one package that documents everything. Scope the work before writing.

- Pick the target: the subsystem the user asked about, or the highest-traffic real workflow. Document that first; do not try to cover every package in one pass.
- Use one walkthrough per independent surface, named by behavior (`checkout-request.md`, `ingest-to-index.md`), not by service or module.
- Allow partial coverage. Record what is intentionally not yet documented in `change-map.md` or a short coverage note, with `Planned` or `Unknown` status, so the gap is visible instead of implied complete.
- For a monorepo, prefer one `repo-docs/` per independently developed package when packages have separate readers and lifecycles; use a single shared package only when one team reads across all of them.
- Stop when the reader can trace the targeted workflow end to end. Reading the whole tree is not the goal; a usable model of the chosen path is.

## Explanation Pass

Use the explanation pass after the main walkthrough exists and before considering modules/references complete. The purpose is to keep the docs useful for a human reader, not to prove that every source area has a page.

Reader understanding:

```text
observable behavior -> plain concept -> why it matters -> source locator -> verification
```

Change readiness:

```text
future change goal -> concept to understand -> files to inspect -> risk -> verification command/check
```

Rules:

- Every narrative page should be readable before the reader knows function names, field names, or file layout.
- Every important walkthrough step should translate code behavior into plain language before giving a source locator.
- Every walkthrough step carries cause, effect, and the observation that matters before source details—in connected prose.
- Every exact field, command, schema, tool parameter, metric, artifact, task catalog, or config contract belongs in `references/`.
- Evidence status stays visible but quiet: one page-level default at the **end** of narrative pages; local labels only where confidence differs.
- `modules/` pages should exist only when they make a concept easier to understand than leaving it inside the walkthrough. They are reader-facing explanation pages built around one concept, one example, a few source locators, change risk, and verification.
- Modules and references are not generated by count. They are generated when they lower cognitive load or make exact lookup easier.
- During sync, add missing pages when a stable concept or lookup job lacks a readable home; merge pages that explain the same concept.

## Project Model

Do not create a separate project-understanding page by default. Put the project model where the reader naturally needs it: a short first model in README, then concrete explanation inside the main walkthrough and concept pages.

A readable project model answers only what helps the reader move forward:

- What problem or workflow does this repo make easier?
- What real behavior proves the current shape?
- What concept should the reader remember before seeing code names?
- Which source path proves the behavior when they need to verify or change it?
- What caveat or risk should they keep in mind?

Keep this explanation short. If it starts to look like a paper summary, fold it back into the walkthrough or concept page that needs it.

## Evidence Ledger

Use `evidence-ledger.md` when important statements need explicit evidence classification and the table would clutter the owning page. This is especially useful for benchmark, safety, evaluation, data-heavy, or research repos with many evidence-heavy statements, but it is not a default first-read page.

Default table:

| Claim | Type | Evidence | Confidence | Caveat / verification |
| --- | --- | --- | --- | --- |

Use the standard status family for the `Type` column (`Confirmed` / `Inferred` / `Planned` / `Unknown`; see Evidence Standard). When a row leans on material outside the repo, add an inline source note in the evidence cell such as `prior work: ...`, rather than a separate status.

Do not let `evidence-ledger.md` become the main explanation. It is a citation table for the narrative in README, walkthroughs, modules, and change map.

## Document Types

Design document types by reader state, not by source-tree structure:

| Reader state | Reader needs | Default page |
| --- | --- | --- |
| "I do not understand this project yet." | Natural first model and next step. | `README.md` |
| "I want to understand the project idea." | A plain model of the problem, main behavior, and caveats. | README and the main walkthrough |
| "Show me one real thing working." | A worked example with observable behavior and state changes. | `walkthroughs/one-real-run.md` |
| "I understand the behavior, but this concept is still fuzzy." | Plain model, code model, source locator, optional change table. | `modules/*.md` |
| "I know what I need to change." | Goal -> place to inspect -> risk -> test. | `change-map.md` |
| "I need exact names." | Fields, commands, schemas, tools, metrics, artifacts. | `references/*.md` |

Every page should provide information scent for the next useful page. If the reader may be lost, tell them where to restart.

The full package should preserve the explanation order defined above. Do not skip from user intent directly to source paths. Do not force a reader to cross the whole source tree before they have a concept model.

### Main guide: `README.md`

Use this to lower the first 15 minutes of confusion. Follow [SKILL.md](SKILL.md) Page Design for shape.

Opening prose (under the title) should cover, in order:

1. What the project does.
2. What behavior or user problem it exists to study.
3. What one real example will show the reader, with a link to the walkthrough.
4. In-text routes: where to go to understand, change, or look up names.

Add `## Reader Routes` as a table only when the package has several walkthroughs or many reader goals. Small repos can keep all routing in the opening paragraph.

Put caveats in a short closing note—not a separate long `Current Scope` essay when a few bullets suffice.

Reader paths should be obvious from the opening prose or table:

- New readers follow the main walkthrough.
- Behavior changes start from `change-map.md`.
- Exact names live in `references/`.

For seed projects, use it as a project brief. Keep it honest about the empty state and make the next implementation decisions easy to find.

### Walkthroughs: `walkthroughs/`

Use walkthroughs to explain the repo through real behavior, not through module order. A walkthrough follows a command, request, task, user action, failure, policy case, or data record from the moment a reader can observe it to the resulting state, output, or score. For non-Seed repos, create `walkthroughs/one-real-run.md` before writing deep module/reference pages. If the repo has no real observable path yet, use Seed mode and record the path as `Planned` in `README.md` or `change-map.md`; do not present it as `one-real-run.md`.

The default `one-real-run.md` should read as one continuous explanation. Shape, beats, and ownership: [SKILL.md](SKILL.md) Content Organization and Page Design.

```text
title + opening prose (what you follow + plain model + optional onward links)
-> ## [behavior name]
-> closing (end state + one verify command + onward links + evidence status)
```

Each `##` phase carries plain model and mechanism in connected prose. Weave paths, functions, and checks into sentences. Put **one** page-level verification block at the end unless a phase needs a different check. Route to modules or references at the opening, closing, or first mention of a new concept—not under every phase.

See [EXAMPLES.md](EXAMPLES.md) for the default flat walkthrough and the optional expanded shape for long pages.

Write the walkthrough with real project names: commands, files, functions, config keys, data records, test names, artifacts, routes, or UI actions. For each step, say what it receives, what it changes, and what downstream code relies on. A Mermaid diagram can help, but it must be paired with prose that explains the path.

Optionally, on the newcomer walkthrough only, note one path a maintainer might expect but the code does not take, and why. This makes the design reasoning visible. Use it sparingly: dead-end narration adds reading load, so keep it to one line and never put it on reference or fast-path pages where an expert would only be slowed by it.

Walkthrough count rules:

| Repo shape | Default walkthroughs | Add more when |
| --- | --- | --- |
| Small repo | 1: `one-real-run.md` | A second workflow is materially different. |
| Medium repo | 2-3 | There are distinct user paths, failure modes, data paths, or policy cases. |
| Large repo | Several focused walkthroughs | Each one explains a real behavior, not a module. |

Common names include `one-real-run.md`, `first-request.md`, `failure-case.md`, `policy-case.md`, and `data-to-output.md`. Choose names from behavior, not architecture.

### Glossary: `glossary.md`

Use this for names the reader will see repeatedly. Include:

| Term | Plain meaning | In code | Common confusion |
| --- | --- | --- | --- |

### Flows: `flows.md`

Every non-Seed `repo-docs/` package must explain at least one real workflow. The worked example lives in `walkthroughs/one-real-run.md`; `flows.md` is the map for relationships between several meaningful workflows, runtime phases, state transitions, or output/evaluation paths. Do not create `flows.md` just to retell the same path as `one-real-run.md`. Use it for sequences:

- startup flow
- request/task flow
- data mutation flow
- evaluation or output flow
- error/debug flow

Prefer 6-10 steps per flow. Use Mermaid when a visual makes the sequence easier to understand. Keep each Mermaid diagram small, grounded in inspected source, and paired with plain-language prose. Keep `flows.md` as a map of relationships between walkthroughs, phases, states, or outputs; if it grows past roughly 120 lines, split detailed flows into `flows/<topic>.md` and link to them.

For seed projects, write flow content only as a planned flow with `Planned` / `计划中` status and verification checks beside the flow.

### Change map: `change-map.md`

Use this for future maintenance paths:

| Goal | Files to inspect | Safe change path | Risk |
| --- | --- | --- | --- |

Keep it stable, prospective, and action-oriented.

Write goals as user-facing or maintainer-facing intentions before file paths. Prefer "change how delayed feedback reaches memory" over "edit `observation_delivery.py`". For each goal, say in a clause why the named files are the right place to change, so the reader inherits the judgment, not just the location.

### Change log: `change-log.md`

Use this for past project work:

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |

Use `YYYY-MM-DD HH:MM TZ` rather than date-only headings. This keeps repeated same-day documentation changes distinguishable.

Record meaningful user requests and execution results when they change code, docs, data, experiments, or project understanding. Keep trivial chat in chat. Keep `change-log.md` recent and readable; when it grows past roughly 8 entries or 120 lines, move older entries to `references/history.md` and link to the archive.

To make later syncs incremental, record the commit each sync covered, for example a `Synced through <commit-sha>` note in the latest entry. The next sync can scope its impact check with `git diff <last-sha>..HEAD` instead of re-reading the whole repository.

### Module docs

Create one module doc when a concept needs more explanation than the walkthrough can carry without becoming dense. Shape and beats: [SKILL.md](SKILL.md) Content Organization and Page Design.

For seed projects, planned concepts belong in `change-map.md` or `references/decisions.md` until source evidence exists.

Cover these beats in coherent prose under the title (coverage checklist, not heading names):

1. Reader question and plain model — concept without code names; key insight woven in
2. Code model — structure, API explanation, short usage example from inspected source
3. Where the concept appears in the walkthrough
4. Where to edit in prose (paths/functions)
5. Link to `change-map.md` for change goals and verification; add `## If you change this` only when a local table is clearer than the map

Full field tables and command catalogs belong in `references/`.

Before writing a module doc, hold this brief in mind:

| Brief field | Question |
| --- | --- |
| Reader question | What real confusion or decision brings the reader here? |
| Key insight | What should the reader understand after one minute? |
| Where this appears in a walkthrough | Which real command/request/task/failure makes this concept visible? |
| Concrete example | What one example makes the concept easy to remember? |
| Source locator | Which source path proves the behavior? |
| Maintenance scenario | If this changes, what should the reader inspect and test? |

Module docs should include examples when a concept would otherwise stay abstract. Use examples for:

- rule or permission concepts: allowed vs denied cases
- calculations or scoring: inputs, denominator/base, and resulting value
- data contracts: valid vs invalid payloads
- public interfaces: realistic call/input and observable effect
- transformations: input -> output, before -> after, or raw -> normalized
- state and lifecycle: state before, triggering event, state after
- retrieval, ranking, routing, or selection: query/context -> chosen result and non-result
- failure modes: what fails, how it is surfaced, and what remains unchanged

Prefer one compact table or snippet over long prose. Examples must come from inspected project evidence. Use real project evidence when safe. If privacy, benchmark integrity, or access limits prevent showing actual values, use neutral placeholders and label them as placeholders; do not present them as real observations.

### Cleanup / removal mode

Use this mode when the user asks to delete repo docs, remove generated docs content, or stop using `repo-docs` for the current project.

Do the cleanup as a documentation-state change:

1. Remove the generated `repo-docs/` package or the user-specified subset.
2. Remove root `AGENTS.md` / `CLAUDE.md` guide-maintenance rules that still point to the deleted docs.
3. Remove stale guide links from nearby docs when they no longer resolve.
4. Do not recreate replacement repo docs in the same turn unless the user explicitly requests a new guide.
5. Verify with a scoped search that stale guide paths and policies are gone.

If the user asks to delete only one page or one section, do not remove the whole package. Clean only the requested scope and repair links that would break.

### Agent instruction files

Use repo-root `AGENTS.md` or `CLAUDE.md` to preserve the `repo-docs/` guide update policy for future agents. Keep this short and operational:

- Where the living guide lives.
- Which repo-specific questions should refine it.
- Which docs to update before answering when guide content is missing or stale.
- Which changes deserve `change-log.md` entries.

Update existing root files. Create `AGENTS.md` when the repo has no root agent instruction file and a new `repo-docs/` package is being created.

### References

Use `references/` for stable details that would clutter the main guide: schemas, metrics, tool parameters, task catalogs, scripts, output artifacts, baseline methods. References are lookup material, not the main explanation path. If a reference grows a long explanation of why or how behavior works, move that explanation into a walkthrough or module page and keep the reference as a table/catalog. If a module page accumulates exhaustive tables, move those tables down into a reference page and leave only the plain explanation, representative example, source locator, risk, and verification path in the module page.

Start each reference page with a one-sentence warning such as:

> This is lookup material. Read the walkthrough first if you do not yet understand the behavior.

References should optimize for certainty and scan speed, not explanation flow.

## Evidence Standard

Use one status family across the package (README, walkthroughs, modules, references, change map, Seed memory):

- **Confirmed / 已确认:** current repo evidence (code, tests, config, data, command output, artifacts) directly shows it.
- **Inferred / 推断:** reasonable inference from inspected evidence, not directly asserted or tested.
- **Planned / 计划中:** accepted or decided future work or design that is not implemented yet.
- **Unknown / 未确认:** plausible, disputed, or awaiting verification.

Confidence and source are orthogonal. When support comes from outside the repo (external papers, docs, design notes), keep the confidence label and add an inline source note such as `Inferred (prior work: ...)`. This replaces a separate "prior work" status, which conflated source with confidence.

Use source links when possible. Include exact line links when available; otherwise link to the file path and say what to search for. Put the page-level default at the end of the page (`Evidence status: Confirmed unless noted.` / `证据状态：除特别标注外，本页基于当前源码已确认。`); use local labels when confidence changes or when a specific statement needs extra support.

Code and data statements require extra discipline:

- Treat current source, tests, config, data, command output, and artifacts as the truth for implemented behavior.
- Treat README files, older docs, memory, papers, and user descriptions as context until runtime evidence confirms them.
- Do not present an uninspected file, field, command, artifact, metric, tool parameter, or test as proof.
- Do not invent sample rows, task ids, function names, output files, metric denominators, or schema fields. Use real evidence or label the item as a neutral example.
- Do not upgrade `Planned` or `Inferred` content to `Confirmed` because it sounds plausible.
- If code and data disagree with old docs or memory, trust current code/data and put a caveat beside the affected topic.
- If verification is cheap, run or inspect it before writing the statement. If verification is not run, say what command or check would confirm it.
- Keep evidence labels quiet when one status dominates a page; label locally only when mixing statuses or when a statement needs extra support. A page can contain confirmed current behavior, inferred explanation, planned next work, and unknown caveats, but the reader must be able to tell which is which without reading an evidence table.
- Use skill examples as style references only. Do not copy fictional paths, fields, commands, task ids, or outputs into real docs.

## Follow-up Question Loop

When the user asks a new question:

1. Read `repo-docs/README.md`, the main walkthrough, and any relevant module/reference docs.
2. Inspect the source-of-truth code, data, config, tests, or artifacts behind the answer.
3. Decide whether the question reveals stable missing context. For transient run state, one-off debugging, or personal preference, answer in chat; record it in the guide when the user asks.
4. Patch the smallest relevant doc section when stable guide content is missing or stale.
5. If the question reveals a recurring concept, add it to `glossary.md`, `flows.md`, or a relevant reference according to its reader job.
6. If it reveals an unresolved issue, add a short caveat beside the affected topic. Create a separate questions/risks file when the list is large enough to need its own owner.
7. Answer the user with the conclusion and link to the updated doc.

## Project Change Sync

Use this when code, data, config, scripts, tests, docs, or project architecture changed after `repo-docs/` was written. If the current turn made those changes and `repo-docs/` exists, run this check before final response; follow the user's explicit scope when they ask to leave docs untouched.

This is an impact check. Use it to ask "which reader understanding changed?" before touching files.

When the repo is under git and a prior `change-log.md` recorded the last synced commit, start from `git diff <last-synced-sha>..HEAD`: the changed paths tell you which walkthroughs, concept pages, and references can be stale. Fall back to a full re-read only when no synced-commit marker exists.

## Documentation Content Sync Alignment

Use this strategy when the user asks to sync, tidy, clean up docs, update memory, prepare a handoff, finish a milestone, repair stale docs, or make the repo ready for a newcomer. Act as a knowledge-base editor: review the whole knowledge system, merge repeated facts, correct stale facts, remove obsolete notes, and keep every reader-facing layer aligned with current code.

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
| Item is a personal or cross-project preference | Agent memory. |

The deciding question: will the next maintainer, teammate, downstream integrator, or future agent need this knowledge to understand or operate the project? If yes, make docs the source of truth.

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
| New feature crossing several concepts | README, repo docs, architecture, concept docs, runbook, change log, handoff notes. |
| Cross-project contract change | Upstream and downstream docs, SDK/API references, integration examples. |
| Completed plan or replaced decision | Current docs updated in place; durable history recorded in `change-log.md` or archive. |
| Terminology or policy change | Glossary, affected module docs, references, root rules when it changes agent behavior. |

For a new capability, cover four reader questions: how to use it, how it works, how to operate it, and how to know it shipped.

### Editing principles

- Prefer reducing, merging, and editing current facts in place.
- Add new text where it changes a reader decision or prevents a future mistake.
- Keep root agent files operational: constraints, commands, environment, permissions, routing, red lines, and guide policy.
- Keep docs reader-facing: onboarding, architecture, operations, integration, examples, contracts, and references.
- Use absolute dates such as `2026-06-23`.
- Keep API tables, environment tables, glossary entries, and command references current.
- For memory, promote stable knowledge into docs and leave compact pointers when useful.
- For cross-project changes, run the inventory and impact mapping for each affected project.

### Sync checklist

- [ ] Size checks ran for root agent files, docs pages, and memory indexes when present.
- [ ] Stable memory knowledge graduated into docs or root rules.
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
| New or renamed entrypoint/script | `README.md`, relevant walkthrough, `flows.md` for multi-phase changes, `change-map.md`, relevant concept page |
| Runtime/session/control-flow change | relevant walkthrough, `flows.md` or `flows/<topic>.md`, runtime concept page when needed, README route map |
| New tool or changed tool args | `references/tools.md`, tool concept page when needed, `change-map.md`, glossary if term changed |
| Data/schema/task/config change | data/task concept page when needed, relevant reference doc, local caveat if uncertainty remains, `change-log.md` when user-facing |
| Policy or metric change | policy/evaluation concept page when needed, metrics reference, main guide confidence/summary |
| Memory method change | memory concept page when needed, method reference docs, artifacts reference if outputs changed |
| Output/log artifact change | logging/artifacts concept page when needed, artifacts reference, run/debug sections |
| Concept moved/deleted/merged | corresponding `modules/*.md`, README route map, links from other docs, `change-log.md` |
| Terminology changed | `glossary.md`, main guide, affected module/reference docs |
| User-facing docs generated or reorganized | `README.md`, affected docs, repo-root agent instruction files, `change-log.md`, `references/history.md` if archiving |
| Research experiment or baseline change | research overview/main guide, entrypoint docs, metrics reference, artifacts reference, reproduction path |

### Sync checklist

- [ ] If `repo-docs/` exists and source/data/config/test behavior changed, sync was considered before final response.
- [ ] Every changed source area maps to a current doc or a local caveat beside the affected topic.
- [ ] Module docs explain current concepts that readers actually need.
- [ ] Main guide includes quick understanding, reproduce/run, and modify-safely reader paths.
- [ ] Non-Seed repos include `walkthroughs/one-real-run.md`, linked from README.
- [ ] Non-Seed repo-docs packages include `change-map.md`.
- [ ] Walkthroughs trace real behavior in connected prose; no template `###` stack under every step; no duplicate closing sections that repeat the steps.
- [ ] README orients the reader without repeating the walkthrough's full plain model.
- [ ] Module docs deepen concepts without copying walkthrough paragraphs; link back instead.
- [ ] If module pages exist, the README route map points readers to the useful concept pages.
- [ ] Repo-root agent instruction files mention `repo-docs/` guide synchronization when they exist.
- [ ] `change-map.md` is prospective and `change-log.md` is retrospective.
- [ ] `change-log.md` entries use precise local timestamps with date, time, and timezone.
- [ ] `change-log.md` is recent enough to scan; older entries are archived when needed.
- [ ] If `flows.md` exists, it maps relationships between multiple paths, phases, states, or outputs instead of duplicating the main walkthrough; detailed flows live under `flows/<topic>.md` when useful.
- [ ] Reference docs contain stable catalogs and exhaustive tables; module docs contain plain concepts, representative examples, source locators, risks, and verification for transformations, lifecycle, and failure modes.
- [ ] Local Markdown links resolve.
- [ ] Current facts are edited in place; historical notes are used for durable history.
- [ ] Documentation content sync alignment ran when the user asked for sync, tidy, handoff, milestone closeout, memory refresh, or stale-doc repair.
- [ ] Cleanup/removal requests removed stale guide paths, links, and root guide-maintenance policies instead of leaving future agents pointed at missing docs.

## Quality Bar

The docs are good when a newcomer can answer these in about 15 minutes using the guide alone:

1. What is the repo trying to accomplish?
2. What is the shortest path to understand one real run?
3. How do I reproduce or run the main experiment/workflow?
4. Which concepts remain fuzzy after the walkthrough, and which ones deserve separate module pages?
5. What data contracts or schemas are dangerous to break?
6. Where would I change tasks, tools, prompts, metrics, outputs, or methods?
7. For research repos: what is the research question, method, metric, data contract, and baseline/ablation story?
8. What caveats matter for the topic I am reading right now?
9. For any important rule, contract, transformation, or lifecycle step, what is one concrete example that works and one edge case that fails?
10. Can a newcomer trace one real workflow from observable entry to output/artifact without opening source code first?
