# Repo-Docs Page Rules

## Reader Paths

The main guide should support three paths:

| Reader goal | What the guide should show |
| --- | --- |
| Understand quickly | thesis, why it exists, main workflow, and major concepts |
| Reproduce or run | commands, config, expected outputs, artifact locations |
| Verify understanding | walkthrough verify command, tests named in prose |

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
- Write onward links as natural in-prose links whose label names what the reader gains, not the filename and not the act of clicking. Prefer `see how the request becomes a result in modules/result-flow.md` over `see modules/result-flow.md` or `click here`.
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
- For Chinese docs, apply the `repo-docs-zh` overlay: Chinese carries the reader's mental model, while English source terms locate the code, fields, commands, and metrics.
- Prefer a single primary language because it is easier to keep synchronized.
- If bilingual docs are requested, define the structure explicitly, such as one bilingual page, `README.zh.md`/`README.md`, or a language-specific docs folder.

## Markdown Display Protocol

Markdown is the reading interface. Use it to control rhythm and reduce cognitive load.

| Element | Use for |
| --- | --- |
| Step headings (`##`) | Real behavior beats: `Step 1: input becomes a record` |
| Inline labels | Rare disambiguation only; prefer paths and checks woven into prose |
| Reader-state `###` headings | Long walkthroughs or one dense phase only |
| Blockquotes | Pull quotes from external docs when needed |
| Tables | Comparisons, before/after state, field lookup, phase relationships |
| Fenced code blocks | Commands, expected output, schemas, config, exact snippets |
| Mermaid / flowchart | Phase order, branches, state handoffs, or multi-path relationships—**when understanding needs a visual anchor**, always paired with prose |
| `<details>` | Long source details, full tables, long outputs |

When a page feels dense, first ask whether the reader needs a better heading, one small table, or a source detail folded into `<details>`. Do not add visual structure for decoration.

## Canonical Output Rule

Do not frame output as a file-count exercise. Use this rule:

```text
project spine -> real trace -> readable concept pages -> references -> glossary -> change log
```

The first-read route for most non-Seed repos should be:

```text
README.md
-> walkthroughs/one-real-run.md
-> modules
-> references
-> glossary.md
```

Each named page serves a durable reader job. The output should feel concise because reader jobs are clear, not because files were skipped.

| Reader job | Preferred home |
| --- | --- |
| Understand the project idea and reading route | `README.md` |
| Understand the project model | `README.md` and `walkthroughs/one-real-run.md` |
| Replay one real behavior | `walkthroughs/one-real-run.md` |
| Understand a concept introduced by the walkthrough | `modules/<concept>.md` |
| Look up exact fields, commands, schemas, tools, metrics, or artifacts | `references/<lookup-job>.md` |
| Resolve project terminology | `glossary.md` |
| Compare several workflows or phases | `flows.md` |
| Keep many statement/evidence/confidence rows out of the explanation path | `evidence-ledger.md` |
| Preserve durable doc/project history | `change-log.md` |

The canonical non-Seed shape is defined in [SKILL.md](SKILL.md); this section governs which reader job each page serves and when triggered pages appear.

Additional walkthroughs, module pages, reference pages, `flows.md`, and `evidence-ledger.md` are governed by reader-problem triggers: multiple workflows, multiple runtime phases, state transitions, rule cases, failure modes, or evidence tables that would otherwise clutter the explanation path. Use trigger language rather than file-count language.

Merge pages when they explain the same reader concept. Do not merge merely to reduce file count.

`change-log.md` is part of the standard package and should stay compact: record meaningful changes to code, docs, data, experiments, or project understanding.

### Lite shape

For a small or single-purpose repo with few durable concepts and no dense lookup tables, the package can be smaller than the standard shape. Drop `modules/`, `references/`, and `glossary.md` until a concept needs its own page or a lookup table appears:

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md
  change-log.md
```

This is the same explanation path with fewer pages, not a different contract. Validate it with `python scripts/validate_repo_docs.py <path> --lite`. Promote to the full structure the moment the repo grows a concept worth its own page or a contract worth a reference table.

## Large And Monorepo Scope

A large repository or a monorepo with several independent services does not need one package that documents everything. Scope the work before writing.

- Pick the target: the subsystem the user asked about, or the highest-traffic real workflow. Document that first; do not try to cover every package in one pass.
- Use one walkthrough per independent surface, named by behavior (`checkout-request.md`, `ingest-to-index.md`), not by service or module.
- Allow partial coverage. Record what is intentionally not yet documented in a short `README.md` coverage note with `Planned` or `Unknown` status, so the gap is visible instead of implied complete.
- For a monorepo, prefer one `repo-docs/` per independently developed package when packages have separate readers and lifecycles; use a single shared package only when one team reads across all of them.
- Stop when the reader can trace the targeted workflow end to end. Reading the whole tree is not the goal; a usable model of the chosen path is.

## Explanation Pass

Use the explanation pass after the main walkthrough exists and before considering modules/references complete. The purpose is to keep the docs useful for a human reader, not to prove that every source area has a page.

Reader understanding:

```text
observable behavior -> plain concept -> why it matters -> source locator -> verification
```

Rules:

- Every narrative page should be readable before the reader knows function names, field names, or file layout.
- Every important walkthrough step should translate code behavior into plain language before giving a source locator.
- Every walkthrough step carries cause, effect, and the observation that matters before source details—in connected prose.
- Lower code-name density by order of explanation: behavior first, plain concept next, source names only when they prove or locate the point. Dense lookup belongs in references.
- Every exact field, command, schema, tool parameter, metric, artifact, task catalog, or config contract belongs in `references/`.
- Evidence status stays visible but quiet: one page-level default at the **end** of narrative pages; local labels only where confidence differs.
- `modules/` pages should exist only when they make a concept easier to understand than leaving it inside the walkthrough. They are reader-facing explanation pages built around one concept, one code model example, source locators woven into prose, and—when useful—a short caveat or verify command that confirms understanding.
- Modules and references are not generated by count. They are generated when they lower cognitive load or make exact lookup easier.
- During sync, add missing pages when a stable concept or lookup job lacks a readable home; merge pages that explain the same concept.

## Project Model

Do not create a separate project-understanding page by default. Put the project model where the reader naturally needs it: a short first model in README, then concrete explanation inside the main walkthrough and concept pages.

A readable project model answers only what helps the reader move forward:

- What problem or workflow does this repo make easier?
- What real behavior proves the current shape?
- What concept should the reader remember before seeing code names?
- Which source path proves the behavior when they need to verify understanding?
- What caveat matters for the mental model?

Keep this explanation short. If it starts to look like a paper summary, fold it back into the walkthrough or concept page that needs it.

## Evidence Ledger

Use `evidence-ledger.md` when important statements need explicit evidence classification and the table would clutter the owning page. This is especially useful for benchmark, safety, evaluation, data-heavy, or research repos with many evidence-heavy statements, but it is not a default first-read page.

Default table:

| Claim | Type | Evidence | Confidence | Caveat / verification |
| --- | --- | --- | --- | --- |

Use the standard status family for the `Type` column (`Confirmed` / `Inferred` / `Planned` / `Unknown`; see Evidence Standard). When a row leans on material outside the repo, add an inline source note in the evidence cell such as `prior work: ...`, rather than a separate status.

Do not let `evidence-ledger.md` become the main explanation. It is a citation table for the narrative in README, walkthroughs, and modules.

## Document Types

Design document types by reader state, not by source-tree structure:

| Reader state | Reader needs | Default page |
| --- | --- | --- |
| "I do not understand this project yet." | Natural first model and next step. | `README.md` |
| "I want to understand the project idea." | A plain model of the problem, main behavior, and caveats. | README and the main walkthrough |
| "Show me one real thing working." | A worked example with observable behavior and state changes. | `walkthroughs/one-real-run.md` |
| "I understand the behavior, but this concept is still fuzzy." | Plain model, code model, and where to read next. | `modules/*.md` |
| "I need exact names." | Fields, commands, schemas, tools, metrics, artifacts. | `references/*.md` |
| "These project terms blur together." | Plain meaning for this project, with little or no code. | `glossary.md` |

Every page should provide information scent for the next useful page. If the reader may be lost, tell them where to restart.

The full package should preserve the explanation order defined above. Do not skip from user intent directly to source paths. Do not force a reader to cross the whole source tree before they have a concept model.

### Main guide: `README.md`

Use this to lower the first 15 minutes of confusion. Follow [SKILL.md](SKILL.md) Page Design for shape.

Opening prose (under the title) should cover, in order:

1. What the project does.
2. What behavior or user problem it exists to study.
3. What one real example will show the reader, with a link to the walkthrough.
4. In-text routes: where to go to understand, verify, or look up names.

Add `## Reader Routes` as a table only when the package has several walkthroughs or many reader goals. Small repos can keep all routing in the opening paragraph.

Put caveats in a short closing note—not a separate long `Current Scope` essay when a few bullets suffice.

Reader paths should be obvious from the opening prose or table:

- New readers follow the main walkthrough.
- Exact names live in `references/`.
- Repeated terms live in `glossary.md`.

For seed projects, use it as a project brief. Keep it honest about the empty state and make the next implementation decisions easy to find.

### Walkthroughs: `walkthroughs/`

Use walkthroughs to explain the repo through real behavior, not through module order. A walkthrough follows a command, request, task, user action, failure, rule case, or data record from the moment a reader can observe it to the resulting state, output, or result value. For non-Seed repos, create `walkthroughs/one-real-run.md` before writing deep module/reference pages. If the repo has no real observable path yet, use Seed mode and record the path as `Planned` in `README.md`; do not present it as `one-real-run.md`.

The default `one-real-run.md` should read as one continuous explanation split into numbered steps. Shape, beats, and ownership: [SKILL.md](SKILL.md) Content Organization and Page Design.

```text
title + opening prose (what you follow + plain model + optional onward links)
-> ## Step 1: [behavior name]
-> ## Step 2: [behavior name]
-> ...
-> closing (end state + one verify command + onward links + evidence status)
```

Each `## Step N: ...` section carries plain model and mechanism in connected prose. Weave paths, functions, and checks into sentences. Link to the matching `modules/<concept>.md` in the step where that concept appears. Put **one** page-level verification block at the end unless a step needs a different check. Route to `references/` at the opening, closing, or when exact names first become necessary—not as repeated boilerplate under every step.

See [EXAMPLES.md](EXAMPLES.md) for the default flat walkthrough and the optional expanded shape for long pages.

Write the walkthrough with real project names: commands, files, functions, config keys, data records, test names, artifacts, routes, or UI actions. For each step, say what it receives, what it changes, and what downstream code relies on. When several branches or handoffs are hard to hold in prose alone, add a small Mermaid or ASCII flowchart after the plain-model sentence for that step—see [SKILL.md](SKILL.md) Flowcharts when understanding needs them. The diagram teaches the shape; prose still carries why and how to verify.

Optionally, on the newcomer walkthrough only, note one path a reader might expect but the code does not take, and why. This makes the design reasoning visible. Use it sparingly: dead-end narration adds reading load, so keep it to one line and never put it on reference or fast-path pages where an expert would only be slowed by it.

Walkthrough count rules:

| Repo shape | Default walkthroughs | Add more when |
| --- | --- | --- |
| Small repo | 1: `one-real-run.md` | A second workflow is materially different. |
| Medium repo | 2-3 | There are distinct user paths, failure modes, data paths, or rule cases. |
| Large repo | Several focused walkthroughs | Each one explains a real behavior, not a module. |

Common names include `one-real-run.md`, `first-request.md`, `failure-case.md`, `rule-case.md`, and `data-to-output.md`. Choose names from behavior, not architecture.

### Glossary: `glossary.md`

Use this for names the reader will see repeatedly. Three columns only:

| Term | Plain meaning | Further reading |

**Plain meaning** carries the project-specific meaning in reader language. It can mention what the term is often confused with, but it should not become a code mapping. **Further reading** is optional: one inferred external URL for large generic concepts, or `—`.

Rules (see [SKILL.md](SKILL.md) Glossary entries):

- Plain meaning must let the reader continue the guide without opening **Further reading**.
- At most one URL per row; mark `Inferred` / `推断（外部来源：…）`.
- Mechanism depth belongs in `modules/<concept>.md`; exact paths, fields, commands, and schemas belong in `references/`.
- Do not turn glossary into a link farm or duplicate `references/`.

### Flows: `flows.md`

Every non-Seed `repo-docs/` package must explain at least one real workflow. The worked example lives in `walkthroughs/one-real-run.md`; `flows.md` is the map for relationships between several meaningful workflows, runtime phases, state transitions, or output/evaluation paths. Do not create `flows.md` just to retell the same path as `one-real-run.md`. Use it for sequences:

- startup flow
- request/task flow
- data mutation flow
- evaluation or output flow
- error/debug flow

Prefer 6-10 steps per flow. Use Mermaid when a visual makes the sequence easier to understand. Keep each Mermaid diagram small, grounded in inspected source, and paired with plain-language prose. Keep `flows.md` as a map of relationships between walkthroughs, phases, states, or outputs; if it grows past roughly 120 lines, split detailed flows into `flows/<topic>.md` and link to them.

For seed projects, write flow content only as a planned flow with `Planned` / `计划中` status and verification checks beside the flow.

### Change log: `change-log.md`

Use this for past project work:

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |

Use `YYYY-MM-DD HH:MM TZ` rather than date-only headings. This keeps repeated same-day documentation changes distinguishable.

Record meaningful user requests and execution results when they change code, docs, data, experiments, or project understanding. Keep trivial chat in chat. Keep `change-log.md` recent and readable; when it grows past roughly 8 entries or 120 lines, move older entries to `references/history.md` and link to the archive.

To make later syncs incremental, every sync or material question-driven patch should record **`Synced through <commit-sha>`** (or `同步至 <commit-sha>`) in the latest entry. The next sync scopes with `git diff <last-sha>..HEAD` instead of re-reading the whole repository. The validator warns when `change-log.md` has substance but no sync anchor, and when cited source paths changed after the last anchor (`--repo-root`).

### Module docs

Create one module doc when a concept needs more explanation than the walkthrough can carry without becoming dense. The default module page has exactly three sections: `## Plain model`, `## Code model`, and `## Read next`.

For seed projects, planned concepts belong in `README.md` or `references/decisions.md` until source evidence exists.

Use the sections this way:

1. `## Plain model`: the reader question and the concept in human terms, before code names.
2. `## Code model`: how this repo represents and uses the concept, with structure, API explanation, source locators, and a short inspected example when useful.
3. `## Read next`: where this concept appears in the walkthrough, which reference page holds exact names, and which related concept to read next.

Full field tables and command catalogs belong in `references/`.

Before writing a module doc, hold this brief in mind:

| Brief field | Question |
| --- | --- |
| Reader question | What real confusion or decision brings the reader here? |
| Key insight | What should the reader understand after one minute? |
| Where this appears in a walkthrough | Which real command/request/task/failure makes this concept visible? |
| Concrete example | What one example makes the concept easy to remember? |
| Source locator | Which source path proves the behavior? |
| Verification hook | What command, test, or observation confirms the reader understood the mechanism? |

Module docs should include examples when a concept would otherwise stay abstract. Use examples for:

- rule or permission concepts: allowed vs denied cases
- calculations or result values: inputs, denominator/base, and resulting value
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

Canonical rule: [SKILL.md](SKILL.md) Root agent files. When `repo-docs/` is created or materially updated, ensure the repository root has an agent instruction file. If none exists, **create `AGENTS.md`**.

Keep the block short and operational:

- Where the living guide lives.
- Which repo-specific questions should refine it.
- Which docs to update before answering when guide content is missing or stale.
- Which changes deserve `change-log.md` entries.

Update an existing root file in place. Do not duplicate the guide into `AGENTS.md`.

### References

Use `references/` for stable details that would clutter the main guide: schemas, metrics, tool parameters, task catalogs, scripts, output artifacts, baseline methods. References are lookup material, not the main explanation path. If a reference grows a long explanation of why or how behavior works, move that explanation into a walkthrough or module page and keep the reference as a table/catalog. If a module page accumulates exhaustive tables, move those tables down into a reference page and leave only the plain explanation, representative example, source locator, and understanding caveats in the module page.

Start each reference page with a one-sentence warning such as:

> This is lookup material. Read the walkthrough first if you do not yet understand the behavior.

References should optimize for certainty and scan speed, not explanation flow.
