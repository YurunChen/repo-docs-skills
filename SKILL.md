---
name: repo-docs
description: Use when a user asks to understand a repo, reduce the gap between the user and fast-changing or vibe-coded code, generate or maintain repo docs, answer repo-architecture questions, seed docs for a new or empty project, update docs after code/data/config/test changes, sync docs after a milestone, delete generated repo docs, or keep repo docs current.
---

# Repo-Docs

## Core Idea

`repo-docs` helps a human understand a repository.

The job is not to list files. It is not to summarize every module. It is not to prove that the agent inspected a lot of code. The job is to explain the project in plain technical language, then show the source evidence only when the reader is ready for it.

Write like a strong engineer explaining the repo to another strong engineer who has not seen it yet. The style should feel close to Andrej Karpathy or Kaiming He: direct, concrete, low-ego, and grounded in the actual mechanism. Start with the idea. Use simple words. Then point to the code.

Calibrate the style against strong agent docs and technical blogs:

- Lead with the work the repo makes possible, then explain how it works.
- Name the main design idea early. A good explanation often starts from the reason a project is shaped this way: the user workflow it serves, the constraint it must respect, the failure it avoids, or the tradeoff it accepts.
- Give the reader a runnable or inspectable check. Technical trust comes from logs, tests, screenshots, artifacts, schemas, or small examples.
- Be honest about limits. A short caveat beats a confident paragraph that hides uncertainty.
- Keep persistent instructions short. If a line does not prevent a future mistake, cut it.

The prose should move like a good engineering blog post, not like an audit. Start from a concrete situation in the repo, show why the project is shaped this way, explain the design move, then show what changed and what still has limits. Do not jump from a thesis into a taxonomy. Let each paragraph advance one causal step.

Use concrete engineering prose. Realness comes from visible behavior, specific verbs, and honest evidence. Do not create sincerity by sounding personal; create it by showing what was inspected, what changed, what worked, what failed, and what is still unknown.

Keep the artifact as Markdown under `repo-docs/`. Source truth matters, but evidence is a support beam, not the shape of the prose.

## Content Organization

Canonical logic for what the reader learns and where each kind of fact lives. Page shape rules are in [Page Design](#page-design). Page-type detail is in [REFERENCE.md](REFERENCE.md).

### Reader outcome

```text
what problem this repo is solving
-> one real thing it does
-> the few concepts that make it work
-> where the code lives
-> what is risky to change
-> how to verify the change
```

### Package layers

Build non-Seed docs in this order (see [Build Order](#build-order)):

| Layer | Reader job | Typical content |
| --- | --- | --- |
| `README.md` | Orient and choose a path | Thesis, plain model, in-text routes (+ optional `## Reader Routes` table) |
| `walkthroughs/one-real-run.md` | Follow one real behavior end to end | Opening plain model, `##` per phase, locators, verification |
| `modules/<concept>.md` | Deepen one concept the walkthrough named | Plain model, **code model**, source locator |
| `references/` | Look up exact names | Lookup warning + table |
| `change-map.md` | Plan a change | Goals, files, risks, checks |
| `glossary.md` | Define repeated terms | Term table |

Each durable fact has one home; other pages link. Field catalogs, command lists, and schema tables belong in `references/`, not in walkthrough or module narrative.

### Narrative beats

Coverage checklists for the author—not mandatory heading names.

**Walkthrough:** plain model → mechanism with paths and checks woven into prose → page-end verification and onward links when needed.

**Module:** reader question and plain model (key insight woven in) → code model (structure, API explanation, usage snippet) → walkthrough link → where to edit in prose. Change goals and verification live in `change-map.md`; link there instead of a default change table on the module page.

**Code model** — how the repo represents and uses the concept: structure, what key APIs do, and one short usage example from inspected source. Teaching material, not a walkthrough retelling and not an exhaustive `references/` table.

A strong code model block often runs: structure (sentence or small table) → API explanation → one fenced snippet, CLI line, or record shape from inspected source. Use a short **Code model.** label only when the page is long; otherwise weave the snippet after the plain model. Omit the code model when the concept is one obvious file and the walkthrough already showed the call pattern.

Verification: **once at the walkthrough end** unless one phase has a meaningfully different check. Change verification belongs in `change-map.md`.

### Prose rhythm

Concrete situation → design reason → mechanism → check → caveat. Weave file paths, functions, and test commands into sentences (`normalize.py` builds the event; `pytest tests/...` covers this step). Reserve bold inline labels such as **Source locator.** for rare disambiguation—not as a per-step stamp.

**Onward links:** route at the walkthrough opening or closing, or the first time a new concept appears—not under every `##` phase.

## Non-Negotiables

- Start from behavior, not from the file tree.
- Keep README and walkthrough openings low in code names.
- Use one real workflow before creating concept or reference pages.
- Explain concepts in human terms before naming functions, fields, or paths.
- Put dense names, fields, schemas, commands, artifacts, and metrics in `references/`.
- Use evidence labels quietly. A page-level status is better than many `Confirmed:` bullets.
- Mark uncertainty honestly. Do not invent files, fields, task ids, commands, metrics, or outputs.
- Add pages only when they reduce reader confusion.
- Split narrative pages by story beats, not by repeated reader-state subheadings; see [Page Design](#page-design).
- Say each durable fact once in its best home; link elsewhere instead of copying the same paragraph, table, or verify command.

## Modes

| Mode | Use when | What to do |
| --- | --- | --- |
| Seed | The repo has no real source/runtime/test/data contract yet. | Record goals, decisions, planned work, and unknowns. Do not describe plans as implemented behavior. |
| Build | The user wants first repo docs or onboarding material. | Build a guide around one representative real workflow. |
| Sync | Code, data, config, scripts, tests, or docs changed. | Update the smallest docs needed so the reader's model matches current source. |
| Cleanup / removal | The user asks to delete generated repo docs or stop using repo-docs. | Remove the docs package and stale root pointers. Do not recreate docs in the same turn unless asked. |
| Question refinement | A repo question reveals a stable docs gap. | Inspect source, patch the reusable doc gap, then answer from evidence. |

Read [REFERENCE.md](REFERENCE.md) for detailed page rules and [EXAMPLES.md](EXAMPLES.md) for default output shapes and style targets when the task needs more than this core workflow.

Document contract:

| File | Role |
| --- | --- |
| `SKILL.md` | Canonical rules: core idea, content organization, modes, build order, page design, evidence, verification |
| `REFERENCE.md` | Page-type detail, sync, seed, quality bar — points to SKILL for page design |
| `EXAMPLES.md` | Default output shapes and finished-page tone targets |
| `scripts/validate_repo_docs.py` | Structure, links, routing, template-stacking drift |
| `repo-docs-zh/SKILL.md` | Chinese language overlay only |

## Build Order

For non-Seed repos:

1. Read the project instructions, README, entrypoints, scripts, tests, schemas, config, data, artifacts, and existing docs.
2. Pick one real workflow, request, task, failure, or data path that reveals the repo's shape.
3. Write `README.md` and `walkthroughs/one-real-run.md` first. Follow [Page Design](#page-design) and the default shapes in [EXAMPLES.md](EXAMPLES.md).
4. Add `modules/` only for concepts the walkthrough cannot explain cleanly inline.
5. Add `references/` for exact lookup tables: commands, fields, schemas, artifacts, metrics, task catalogs, tool parameters.
6. Add `glossary.md`, `change-map.md`, and `change-log.md` when they help future readers or maintainers.
7. Verify structure, links, code/data statements, reading flow, and code-name density.

For large repos or monorepos, scope first. Document one subsystem or one workflow well. Record uncovered areas instead of pretending the guide covers everything.

For Seed repos, write status-labeled project memory only: `README.md`, `change-map.md`, `change-log.md`, `glossary.md`, and `references/decisions.md`.

## Output Shape

Standard non-Seed shape:

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

Lite shape for small repos:

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md
  change-map.md
  change-log.md
```

Use Lite when the repo has few durable concepts and no dense lookup tables. Promote to the full shape when a concept deserves its own explanation or a reference table becomes useful.

Triggered pages:

- Additional walkthroughs: distinct user behaviors, failure modes, policy cases, or data-to-output paths.
- `flows.md` or `flows/`: maps between several workflows, phases, states, or outputs. Do not retell `one-real-run.md`.
- `evidence-ledger.md`: evidence tables that would clutter explanation pages.

## Page Jobs

- `README.md`: tell the reader what the project is, why it exists, what to read first, and where to go by goal.
- `walkthroughs/`: follow one real behavior from observable entry to output.
- `modules/`: explain one durable concept that appears in a walkthrough.
- `references/`: hold dense exact names and lookup material.
- `glossary.md`: define repeated project terms.
- `change-map.md`: map future change goals to concepts, files, risks, and checks.
- `change-log.md`: record meaningful code, docs, data, experiment, or understanding changes.

Each narrative page should route the reader to the next useful page with link text that says what they will learn. Do not use bare filenames as navigation.

## Writing Voice

Use real human technical prose.

A narrative page should feel like someone walking the reader through the repo in the order a maintainer actually learns it. Good transitions sound like: "this leaves one problem", "the current code handles that by", "the check that matters is", and "this works, but only up to". Use that kind of connective tissue when it clarifies cause and effect. Do not add chatty filler.

Concrete expression rules:

- Use concrete verbs before abstract nouns: `reads`, `writes`, `checks`, `stores`, `normalizes`, `scores`, `retries`, `drops`, `emits`.
- Put the observation next to the judgment. If you write "more reliable", say what stopped failing or which check now catches it.
- Give the reader a handle before the term. Explain the behavior before names such as runner, evaluator, schema, adapter, orchestrator, or policy.
- Make the basis of judgment visible: source, test, artifact, log, sample data, command output, or explicit inference.
- Prefer local, inspectable detail over grand summary. A small failure example is more trustworthy than a broad claim.
- Do not invent an author voice. Use first person only for real project history; otherwise write "current code shows", "the test covers", or "this is inferred from".

Good repo-docs writing sounds like this:

- "The runner has one job: turn a task record into a session the evaluator can score."
- "The important thing is the handoff. After normalization, policy code never reads the raw message again."
- "If you change this field, the parser may still pass but the scorer will read the wrong denominator."

Bad repo-docs writing sounds like this:

- "`src/a.py` does A, `src/b.py` does B, `src/c.py` does C."
- "This robust and powerful architecture enables seamless extensibility."
- "Confirmed: ... Confirmed: ... Confirmed: ..."
- "This page provides a comprehensive overview of the repository architecture and its modular components."

Prefer short paragraphs with a point. Use tables for comparison and lookup, not as a substitute for explanation. Use diagrams only when relationships are easier to see visually. Do not hide the main explanation path in `<details>`.

## Page Design

Good repo docs are **readable, coherent, and reasonably structured**—not maximally short and not mechanically templated. The reader should follow one causal story, know where to look next, and not read the same fact twice.

Design choices, in order:

1. **Continuity** — paragraphs and transitions carry the explanation; each section advances one beat.
2. **Headings** — mark real phase changes or reader-job shifts; never stamp the same template label under every step.
3. **Ownership** — each durable fact has one best home; other pages link to it.

### Continuity and headings

Write like a strong engineering post: concrete situation → design reason → mechanism → check → caveat. Good transitions: "this leaves one problem", "the current code handles that by", "the check that matters is".

Default walkthrough flow:

```text
title + opening prose (what you follow + plain model + optional onward links)
-> ## [behavior name] (one heading per meaningful phase; no mandatory "Step N" prefix)
-> optional closing (end state + one verify command + onward links + evidence status)
```

Inside each phase: connected prose—weave paths, functions, and checks into sentences. Key observations stay in the same paragraph flow. For long pages (roughly past 120 lines) or one dense phase, use the expanded shape in [EXAMPLES.md](EXAMPLES.md).

Add a `##` when it helps the reader navigate a real transition—not to satisfy a template checklist. A complex concept module may need several sections; a simple one reads well as one prose block plus page-end evidence status.

### Content ownership

Say each item once here; link from other pages.

| Reader need | Home | Link from elsewhere; do not copy |
| --- | --- | --- |
| Project thesis and where to start | `README.md` | walkthrough, modules |
| End-to-end trace | `walkthroughs/one-real-run.md` | `flows.md` (map only, no retelling) |
| Concept depth | `modules/<concept>.md` | README, walkthrough |
| Change goals, files, risks, checks | `change-map.md` | walkthrough, modules |
| Exact fields, commands, schemas | `references/` | narrative pages |
| Term definitions | `glossary.md` | narrative pages |

### Default page shapes

Reasonable defaults—not rigid caps. Add sections when they improve clarity; merge when they only repeat another page or another section on the same page.

| Page | Typical shape |
| --- | --- |
| `README.md` | Opening prose with in-text routes (+ optional `## Reader Routes` table when many walkthroughs or goals) |
| `walkthroughs/one-real-run.md` | Opening prose + one `##` per phase + closing (verify + links + evidence status) |
| `modules/<concept>.md` | Plain model → code model (structure + API + snippet) → link to walkthrough and change-map |
| `references/*.md` | Lookup warning + table |
| `change-map.md`, `glossary.md` | Title + table |

## Code-Name Density

The reader should understand the idea before seeing many source names.

- README first screen: almost no paths, functions, fields, or schemas. Link to the walkthrough.
- Walkthrough opening: explain the behavior and plain model before source locators.
- Walkthrough steps: each `##` step should move the story forward in prose—what happens, what changes, then where the code lives—without splitting every layer into its own subheading.
- Module pages: plain model, then code model with structure, API explanation, and a short inspected usage example; change work links to `change-map.md`.
- References: high code-name density is expected.

If a paragraph needs many paths to make sense, it probably belongs in `references/` or later in the page.

## Evidence Rules

Use one confidence vocabulary across the package:

| Label | 中文 | Meaning |
| --- | --- | --- |
| `Confirmed` | `已确认` | Current repo evidence directly shows it. |
| `Inferred` | `推断` | Reasonable inference from inspected evidence. |
| `Planned` | `计划中` | Accepted future work that is not implemented. |
| `Unknown` | `未确认` | Plausible or important, but not verified. |

Use these labels quietly. On narrative pages (`README.md`, walkthroughs, `modules/`), put one page-level note at the **end** of the page so it does not interrupt the opening. English default: `Evidence status: Confirmed unless noted.` Chinese default: `证据状态：除特别标注外，本页基于当前源码已确认。` Label only the statements whose confidence differs.

On `references/` pages, put the same default after the table or at the page end.

Current source, tests, config, data, command output, and artifacts outrank README text, old docs, memory, papers, and chat history. If they disagree, write what the current source shows and add a caveat where the mismatch matters.

## Sync And Cleanup

Sync asks one question: what changed in the reader's model?

When syncing, use the last recorded commit in `change-log.md` if available, then inspect `git diff <last-sha>..HEAD`. Update only the docs affected by the changed behavior. Patch facts in place, merge duplicate pages, remove stale pages, and record meaningful sync work in `change-log.md`.

Cleanup means cleanup. If the user asks to delete repo docs, remove the docs package, stale guide links, and root maintenance rules that point at it. Do not recreate replacement docs unless asked.

## Verification

Before finishing:

- Check the required structure for Standard, Lite, or Seed mode.
- Check local Markdown links.
- Check that README and walkthrough openings are readable before source names appear.
- Check that modules explain concepts, not directory inventories.
- Check that references hold dense lookup material.
- Check page design: coherent story flow, headings that mark real beats, no duplicate facts across pages, no template `###` stacks under every walkthrough step.
- Check that uncertainty is labeled without turning the page into an audit table.
- Run `python scripts/validate_repo_docs.py <path-to-repo-docs>` when available.
