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

## Teaching Design

`repo-docs` produces a sustainable project-understanding layer that stays readable as the code changes. A good output first lets a newcomer answer the important questions in about 15 minutes: what the repo does, what one real run looks like, which plain concepts matter, where source evidence lives, where exact contracts can be looked up, and what is risky to touch. The reading experience should preserve a comprehension gradient: start from behavior the reader can recognize, build a plain mental model, walk through a real example, then reveal source locators, reference contracts, and safe change paths.

Keep stable knowledge in the guide. Handle transient run state, one-off debugging notes, and chat history in chat unless the user explicitly asks to preserve them. Each sync may delete, merge, or shorten docs when that reduces cognitive load.

Design the guide from the reader's missing model and the repo's real concepts. The documentation should gradually replace uncertainty with usable structure:

```text
User intent
  -> Project question
  -> Plain model
  -> Observable behavior
  -> Worked example
  -> Concept explanation
  -> Source locators
  -> Reference contracts
  -> Change/debug decisions
  -> Caveats and unknowns
```

Each page is a teaching unit. It should answer one durable reader question, such as "how does a task become an evaluated result?" or "where does policy enforcement actually happen?" Pages that mainly catalog files, fields, commands, or classes belong under `references/`; project documentation pages carry a teaching purpose. For non-Seed repos, the first teaching unit should be a real walkthrough in `walkthroughs/one-real-run.md`.

Use course-design discipline while keeping the guide a living project document:

| Teaching move | How repo-docs should use it |
| --- | --- |
| Start from the reader's question | Begin with the problem, prior gap, command, request, artifact, log failure, API call, or workflow before internals. |
| Reconstruct the idea | Explain the failure mode, design pressure, and likely reasoning that make the solution feel natural. |
| Explain "why should I care" | State the maintenance or debugging decision the page enables. |
| Pair code with translation | Show what the code receives, changes, returns, or protects. |
| Test understanding through application | Prefer change/debug scenarios over recall-style questions. |
| Keep a page brief | Know the reader question, key insight, source evidence, and example before writing the page. |

The main document should orient the reader enough to choose the next useful page. Keep quizzes, slides, animations, lesson screens, and visual layout rules for explicit course artifacts. Use Markdown repo docs for durable repo understanding.

## Writing Style

The style target is textured but plain. Write as if a careful maintainer is explaining the repo to a capable newcomer who has limited time and deserves the real shape of the system. Aim for the clean, concrete feel of strong technical teaching: human cadence, exact claims, no filler.

Use this order at page and section level:

1. Conclusion: what the reader should understand.
2. Reason: why this part exists or why the reader should care.
3. Reconstructed thinking: what prior context, failure mode, or design pressure makes the idea natural.
4. Path: the actual code/data/config flow that proves it.
5. Implication: where to change it, how to verify it, or what can break.
6. Caveat: what is inferred, unknown, or intentionally out of scope.

For narrative pages, use paper-explanation prose rather than checklist prose. A good paragraph should have a local point, a reason, and a transition into evidence. It should sound like a careful maintainer explaining how an idea became a system: first the pressure, then the intuition, then the implementation proof. Use bullets and tables for comparison, evidence, and lookup; use paragraphs for reasoning.

Reading experience rules:

- Make every sentence carry a concrete claim, caveat, observation, or transition.
- Prefer accurate small claims over broad claims such as "this is important" or "the system is robust".
- Keep prose fluent. Avoid overusing dashes, quotation marks, parenthetical asides, and decorative emphasis.
- Avoid formulaic contrast patterns such as "not X but Y" and "not only X but also Y"; state the positive claim directly.
- Use source-backed examples when a concept would otherwise feel abstract.
- Let the paragraph explain why the reader should care before introducing dense names.

Polished writing stays concrete. Replace inflated language with:

- claims about importance, impact, or "the evolving landscape" that the repo itself supports
- precise adjectives tied to a source-backed constraint or behavior
- direct verbs such as "is", "reads", "writes", "checks", and "computes"
- lists that separate real concepts, states, or reader jobs
- paragraph endings that give a concrete next step or caveat
- headings followed by substance that advances the explanation
- current-state narration in current-state docs
- narrative transitions that carry reasoning: "this leaves one gap", "a natural next design is", "the current code confirms this by"

Prefer:

- exact actors and verbs: script reads config, runner builds session, evaluator computes denominator
- source-backed caveats: "Unknown: no test currently covers this branch"
- compact examples tied to real code or data
- one short paragraph before a table when the table needs context
- fewer headings when the prose already carries the reader

Good repo docs can have flow and texture while remaining inspectable. Trace elegant sentences to source evidence or mark them as inference.

Avoid these low-information patterns:

- starting a narrative page with a file list
- stating the project contribution before explaining the pressure that makes it plausible
- using "not X but Y" or "not only X, but also Y" as the main explanation
- turning the reconstructed thinking path into a claim that the original author definitely had that thought
- using vague praise such as "powerful", "important", "robust", or "novel" without code, data, test, artifact, or prior-work evidence

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
| `Confirmed` / `已确认` | Existing source, config, test, data, artifact, or command proves it. | `Confirmed: README.md exists and defines the project goal.` |
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

For seed projects, verification may be "docs scaffold created" or "decision recorded"; do not claim implementation verification when no implementation exists.

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

## Markdown Teaching Display Protocol

Markdown is the teaching interface. Use it to control reading rhythm and reduce cognitive load.

| Element | Use for | Avoid |
| --- | --- | --- |
| Learning-state headings | `What You Are Looking At`, `Plain Model`, `What To Notice`, `Source Locator`, `Verification` | Generic headings that hide the reader's job |
| Blockquotes | Short teaching cues: `> **Notice:** ...` | Long explanations or critical source facts |
| Tables | Comparisons, before/after state, risk maps, field lookup | Replacing all narrative with grids |
| Fenced code blocks | Commands, expected output, schemas, config, exact snippets | Long unintroduced code dumps |
| Mermaid | Multi-path, multi-stage, state, or output relationships | A substitute for prose explanation |
| `<details>` | Long source details, full tables, long outputs | Main teaching steps or required context |

When a page feels dense, first ask whether the reader needs a better heading, a notice cue, one small table, or a source detail folded into `<details>`. Do not add visual structure for decoration.

## Specialized Repo Notes

For benchmark, evaluation, safety, data-heavy, or research repositories, make sure stable docs cover the relevant project facts without pretending every project is a paper. Simple tools and CRUD projects can skip research framing and explain the real design pressure directly.

| Specialized concept | Typical location |
| --- | --- |
| Project question and motivation | `README.md` or project overview |
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
| Audit many claim/evidence/confidence rows | `evidence-ledger.md` |
| Preserve durable doc/project history | `change-log.md` |

The canonical non-Seed shape is defined in [SKILL.md](SKILL.md); this section governs which reader job each page serves and when triggered pages appear.

Additional walkthroughs, module pages, reference pages, `flows.md`, and `evidence-ledger.md` are governed by reader-problem triggers: multiple workflows, multiple runtime phases, state transitions, policy cases, failure modes, or cross-page claim auditing. Use trigger language rather than file-count language.

Merge pages when they teach the same reader concept. Do not merge merely to reduce file count.

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

This is the same teaching path with fewer pages, not a different contract. Validate it with `python scripts/validate_repo_docs.py <path> --lite`. Promote to the full structure the moment the repo grows a concept worth its own page or a contract worth a reference table.

## Large And Monorepo Scope

A large repository or a monorepo with several independent services does not need one package that documents everything. Scope the work before writing.

- Pick the target: the subsystem the user asked about, or the highest-traffic real workflow. Document that first; do not try to cover every package in one pass.
- Use one walkthrough per independent surface, named by behavior (`checkout-request.md`, `ingest-to-index.md`), not by service or module.
- Allow partial coverage. Record what is intentionally not yet documented in `change-map.md` or a short coverage note, with `Planned` or `Unknown` status, so the gap is visible instead of implied complete.
- For a monorepo, prefer one `repo-docs/` per independently developed package when packages have separate readers and lifecycles; use a single shared package only when one team reads across all of them.
- Stop when the reader can trace the targeted workflow end to end. Reading the whole tree is not the goal; a usable model of the chosen path is.

## Teaching Pass

Use the teaching pass after the main walkthrough exists and before considering modules/references complete. The purpose is to keep the docs useful for a human reader, not to prove that every source area has a page.

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
- Every walkthrough step should tell the reader what to notice before moving to source details.
- Every exact field, command, schema, tool parameter, metric, artifact, task catalog, or config contract belongs in `references/`.
- `modules/` pages should exist only when they make a concept easier to understand than leaving it inside the walkthrough. They are reader-facing explanation pages built around one concept, one example, a few source locators, change risk, and verification.
- Modules and references are not generated by count. They are generated when they lower cognitive load or make exact lookup easier.
- During sync, add missing pages when a stable concept or lookup job lacks a readable home; merge pages that teach the same concept.

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

Use `evidence-ledger.md` when important claims need explicit evidence classification and the table would clutter the owning page. This is especially useful for benchmark, safety, evaluation, data-heavy, or research repos with many claims, but it is not a default first-read page.

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
| "I understand the behavior, but this concept is still fuzzy." | Plain explanation, example, source locator, risk, and verification. | `modules/*.md` |
| "I know what I need to change." | Goal -> place to inspect -> risk -> test. | `change-map.md` |
| "I need exact names." | Fields, commands, schemas, tools, metrics, artifacts. | `references/*.md` |

Every page should provide information scent for the next useful page. If the reader may be lost, tell them where to restart.

The full package should preserve the comprehension gradient defined in Teaching Design. Do not skip from user intent directly to source paths. Do not force a reader to cross the whole source tree before they have a concept model.

### Main guide: `README.md`

Use this to lower the first 15 minutes of confusion. It should include conclusion, map, route, and links.

README first screen guidance: the first screen should be understandable without knowing the codebase. Use this order:

1. What the project does.
2. What behavior or user problem it exists to study.
3. What one real example will teach the reader.
4. Where to go next by reader goal.

Avoid starting with file paths, class names, data schemas, function names, or long metric tables. Link to the walkthrough and references instead.

README should make the first path obvious:

- If you are new, read the main walkthrough.
- If you are modifying behavior, read `change-map.md`.
- If you are looking up exact names, use `references/`.
- If you are unsure where you are, return to the first walkthrough.

For seed projects, use it as a project brief. Keep it honest about the empty state and make the next implementation decisions easy to find.

### Walkthroughs: `walkthroughs/`

Use walkthroughs to teach the repo through real behavior, not through module order. A walkthrough follows a command, request, task, user action, failure, policy case, or data record from the moment a reader can observe it to the resulting state, output, or score. For non-Seed repos, create `walkthroughs/one-real-run.md` before writing deep module/reference pages. If the repo has no real observable path yet, use Seed mode and record the path as `Planned` in `README.md` or `change-map.md`; do not present it as `one-real-run.md`.

The default `one-real-run.md` should use this shape:

```text
What You Are Looking At
-> Plain Model
-> What To Notice
-> one real example, step by step
-> What Changes
-> Source Locator
-> Change Risk
-> Verification
```

Each step should answer four questions in this order:

| Layer | Question |
| --- | --- |
| What You Are Looking At | What is happening without code names? |
| Plain Model | What stable concept should the reader remember? |
| What To Notice | What observation, state change, decision, or output matters here? |
| Source Locator | Which file, function, field, command, or test proves it? |

Write the walkthrough with real project names: commands, files, functions, config keys, data records, test names, artifacts, routes, or UI actions. For each step, say what it receives, what it changes, and what downstream code relies on. A Mermaid diagram can help, but it must be paired with prose that explains the path.

Walkthrough count rules:

| Repo shape | Default walkthroughs | Add more when |
| --- | --- | --- |
| Small repo | 1: `one-real-run.md` | A second workflow is materially different. |
| Medium repo | 2-3 | There are distinct user paths, failure modes, data paths, or policy cases. |
| Large repo | Several focused walkthroughs | Each one teaches a real behavior, not a module. |

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

Prefer 6-10 steps per flow. Use Mermaid when a visual makes the sequence easier to understand. Keep each Mermaid diagram small, source-backed, and paired with plain-language prose. Keep `flows.md` as a map of relationships between walkthroughs, phases, states, or outputs; if it grows past roughly 120 lines, split detailed flows into `flows/<topic>.md` and link to them.

For seed projects, write flow content only as a planned flow with `Planned` / `计划中` status and verification checks beside the flow.

### Change map: `change-map.md`

Use this for future maintenance paths:

| Goal | Files to inspect | Safe change path | Risk |
| --- | --- | --- | --- |

Keep it stable, prospective, and action-oriented.

Write goals as user-facing or maintainer-facing intentions before file paths. Prefer "change how delayed feedback reaches memory" over "edit `observation_delivery.py`".

### Change log: `change-log.md`

Use this for past project work:

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |

Use `YYYY-MM-DD HH:MM TZ` rather than date-only headings. This keeps repeated same-day documentation changes distinguishable.

Record meaningful user requests and execution results when they change code, docs, data, experiments, or project understanding. Keep trivial chat in chat. Keep `change-log.md` recent and readable; when it grows past roughly 8 entries or 120 lines, move older entries to `references/history.md` and link to the archive.

To make later syncs incremental, record the commit each sync covered, for example a `Synced through <commit-sha>` note in the latest entry. The next sync can scope its impact audit with `git diff <last-sha>..HEAD` instead of re-reading the whole repository.

### Module docs

Create one module doc when a concept needs more explanation than the walkthrough can carry without becoming dense. A module page is a reader-facing concept page. It should start from the reader confusion it resolves and where that concept appears in a walkthrough, then explain the concept in plain language before naming files.

For seed projects, do not write current-state module docs without source evidence. Planned concepts belong in `change-map.md` or `references/decisions.md` until files, interfaces, or explicit accepted architecture exist.

Write module docs as concept teaching pages. A reader should understand the concept, the real example that makes it concrete, the few source paths that prove it, and what to inspect before changing related code. Keep examples representative rather than exhaustive; full field tables, command catalogs, task lists, and artifact inventories belong in `references/`.

Use this section order unless the page is very short:

1. `Reader Question`: the confusion this page resolves.
2. `Plain Model`: the concept without code names.
3. `Where You Saw This`: the walkthrough moment that makes this concept visible.
4. `One Concrete Example`: one source-backed example that makes the concept usable.
5. `What To Notice`: the observation that prevents the reader from missing the point.
6. `Source Locator`: files, functions, fields, and tests to inspect.
7. `Change Risk`: what commonly breaks when changing related code.
8. `Verification`: focused checks.

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

Prefer one compact table or snippet over long prose. Examples must be source-backed and project-native. Use real project evidence when safe. If privacy, benchmark integrity, or access limits prevent showing actual values, use neutral placeholders and label them as placeholders; do not present them as real observations.

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

Use `references/` for stable details that would clutter the main guide: schemas, metrics, tool parameters, task catalogs, scripts, output artifacts, baseline methods. References are lookup material, not the main teaching path. If a reference grows a long explanation of why or how behavior works, move that explanation into a walkthrough or module page and keep the reference as a table/catalog. If a module page accumulates exhaustive tables, move those tables down into a reference page and leave only the plain explanation, representative example, source locator, risk, and verification path in the module page.

Start each reference page with a one-sentence warning such as:

> This is lookup material. Read the walkthrough first if you do not yet understand the behavior.

References should optimize for certainty and scan speed, not teaching flow.

## Evidence Standard

Use one status family for every claim on every page (README, walkthroughs, modules, references, change map, Seed memory):

- **Confirmed / 已确认:** current repo evidence (code, tests, config, data, command output, artifacts) directly shows it.
- **Inferred / 推断:** reasonable inference from inspected evidence, not directly asserted or tested.
- **Planned / 计划中:** accepted or decided future work or design that is not implemented yet.
- **Unknown / 未确认:** plausible, disputed, or awaiting verification.

Confidence and source are orthogonal. When support comes from outside the repo (external papers, docs, design notes), keep the confidence label and add an inline source note such as `Inferred (prior work: ...)`. This replaces a separate "prior work" status, which conflated source with confidence.

Use source links when possible. Include exact line links when available; otherwise link to the file path and say what to search for. For example, "the code evaluates this condition" is `Confirmed`; "this design pressure likely explains the benchmark shape" is `Inferred (prior work: ...)` when it leans on external context.

Code and data claims require extra discipline:

- Treat current source, tests, config, data, command output, and artifacts as the truth for implemented behavior.
- Treat README files, older docs, memory, papers, and user descriptions as context until runtime evidence confirms them.
- Do not present an uninspected file, field, command, artifact, metric, tool parameter, or test as proof.
- Do not invent sample rows, task ids, function names, output files, metric denominators, or schema fields. Use real evidence or label the item as a neutral example.
- Do not upgrade `Planned` or `Inferred` content to `Confirmed` because it sounds plausible.
- If code and data disagree with old docs or memory, trust current code/data and put a caveat beside the affected topic.
- If verification is cheap, run or inspect it before writing the claim. If verification is not run, say what command or check would confirm it.
- Keep evidence labels local to the claim when mixing statuses on one page; a page can contain confirmed current behavior, inferred explanation, planned next work, and unknown caveats, but the reader must be able to tell which is which.
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

This is an impact audit. Use it to ask "which reader understanding changed?" before touching files.

When the repo is under git and a prior `change-log.md` recorded the last synced commit, start from `git diff <last-synced-sha>..HEAD`: the changed paths tell you which walkthroughs, concept pages, and references can be stale. Fall back to a full re-read only when no synced-commit marker exists.

## Documentation Content Sync Alignment

Use this strategy when the user asks to sync, tidy, clean up docs, update memory, prepare a handoff, finish a milestone, repair stale docs, or make the repo ready for a newcomer. Act as a knowledge-base editor: audit the whole knowledge system, merge repeated facts, correct stale facts, remove obsolete notes, and keep every reader-facing layer aligned with current code.

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
- [ ] Walkthroughs use real project names and explain inputs, state changes, outputs, risks, and verification.
- [ ] Module docs explain where the concept appears in a walkthrough before listing source details.
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
