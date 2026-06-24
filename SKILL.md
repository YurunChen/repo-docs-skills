---
name: repo-docs
description: Use when a user asks to understand a repo, reduce the gap between the user and fast-changing or vibe-coded code, generate or maintain repo docs, answer repo-architecture questions, seed docs for a new or empty project, keep repo docs aligned during coding conversations, delete generated repo docs, or patch the guide when interaction shows a stable understanding gap.
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
-> how to verify what you understood
```

### Package layers

Build non-Seed docs in this order (see [Build Order](#build-order)):

| Layer | Reader job | Typical content |
| --- | --- | --- |
| `README.md` | Orient and choose a path | Thesis, plain model, in-text routes (+ optional `## Reader Routes` table) |
| `walkthroughs/one-real-run.md` | Follow one real behavior end to end | Opening plain model, `##` per phase, locators, verification |
| `modules/<concept>.md` | Deepen one concept the walkthrough named | Plain model, **code model**, source locator |
| `references/` | Look up exact names | Lookup warning + table |
| `glossary.md` | Define repeated terms | `Term | Plain meaning | Further reading` — code mapping and confusion live in Plain meaning |
| `change-log.md` | Record guide evolution and sync anchors | Timestamped entries |

Each durable fact has one home; other pages link. Field catalogs, command lists, and schema tables belong in `references/`, not in walkthrough or module narrative.

### Glossary entries

`glossary.md` helps the reader **disambiguate repeated names in this project**—not restate an industry encyclopedia.

Default row—three columns only:

| Term | Plain meaning | Further reading |

- **Plain meaning** — how this project uses the term, in connected prose. Weave in where it appears in code and what readers confuse it with; do not split those into extra columns.
- **Further reading** — at most one optional URL when a generic concept is large (official spec or primary doc). Mark `Inferred` / `推断（外部来源：…）`. Use `—` when the row stands alone without external help. External material does not upgrade repo behavior to `Confirmed`.

If the reader still needs mechanism or call patterns in **this** codebase, put that in `modules/<concept>.md` and link from **Plain meaning**—do not grow the glossary into a module.

Skip **Further reading** when Plain meaning alone is enough.

### Narrative beats

Coverage checklists for the author—not mandatory heading names.

**Walkthrough:** plain model → mechanism with paths and checks woven into prose → page-end verification and onward links when needed.

**Module:** reader question and plain model (key insight woven in) → code model (structure, API explanation, usage snippet) → walkthrough link → where the concept lives in prose. When edit order or assumptions matter for understanding, weave a short caveat into the same paragraph—do not add a separate change-plan page.

**Code model** — how the repo represents and uses the concept: structure, what key APIs do, and one short usage example from inspected source. Teaching material, not a walkthrough retelling and not an exhaustive `references/` table.

A strong code model block often runs: structure (sentence or small table) → API explanation → one fenced snippet, CLI line, or record shape from inspected source. Use a short **Code model.** label only when the page is long; otherwise weave the snippet after the plain model. Omit the code model when the concept is one obvious file and the walkthrough already showed the call pattern.

Verification: **once at the walkthrough end** unless one phase has a meaningfully different check.

### Prose rhythm

Concrete situation → design reason → mechanism → check → caveat. Weave file paths, functions, and test commands into sentences (`normalize.py` builds the event; `pytest tests/...` covers this step). Reserve bold inline labels such as **Source locator.** for rare disambiguation—not as a per-step stamp.

**Onward links:** when a walkthrough phase introduces a durable concept, link to the matching `modules/<concept>.md` in that phase's prose—the link belongs **where the concept appears**, not only at page open/close. Write the label for what the reader gains (`why the event exists`, `how scoring picks a winner`). Do not stamp the same module link under every `##` phase; link when the concept first matters, or again when a later phase needs deeper context. Link to `references/` at the opening, closing, or the first moment exact names become necessary.

### Flowcharts when understanding needs them

Use a flowchart when the reader would otherwise lose the model in prose alone. **Understanding is the criterion**—not decoration, not file-count padding.

Add a small diagram (Mermaid in Markdown, or a compact ASCII flow) when it clearly helps:

| Situation | Why a diagram helps |
| --- | --- |
| Several phases or handoffs in one behavior | Shows order and what each step receives/produces |
| Branching paths | Success vs failure, policy cases, tool routing |
| State or record shape changes | Before → transform → after across components |
| Multiple related workflows | Map in `flows.md` when `one-real-run.md` is not enough |

Skip the diagram when a single linear story is already easy to follow in connected prose.

Rules:

- **Prose first or paired:** open with the plain model in words, then show the diagram, then name what to notice or verify. The paragraph still carries the reasoning; the diagram holds the shape.
- **Small and grounded:** roughly 6–10 nodes; labels use project terms from inspected source, not generic boxes.
- **One teaching job per diagram:** one behavior trace, one branch comparison, or one phase map—not an entire repo architecture poster.
- **Default homes:** walkthrough phase, concept `module`, or `flows.md`. Keep README and walkthrough openings prose-first; put dense visuals after the reader has a handle.

Do not hide the main explanation path inside `<details>` or behind a diagram with no surrounding prose.

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

`repo-docs/` is maintained **during the user ↔ coding agent conversation**, not in a separate offline pass. Each turn, use [Understanding sync](#understanding-sync) to judge whether the interaction shows a stale reader model or a stable understanding gap. Patch in the same turn when the answer is yes; otherwise answer from the current guide.

The modes below name common situations—they are not a menu of detached jobs. **Except Build, Seed, and Cleanup, the default is to run the [Understanding sync](#understanding-sync) interaction check every turn** when `repo-docs/` exists.

| Mode | Use when | What to do |
| --- | --- | --- |
| Seed | The repo has no real source/runtime/test/data contract yet. | Record goals, decisions, planned work, and unknowns. Do not describe plans as implemented behavior. |
| Build | The user wants first repo docs or onboarding material. | Build a guide around one representative real workflow; close with [Build delivery](#build-delivery). |
| Sync | The interaction or repo state shows the guide may be stale—code/data/config/tests changed this thread, the user asks to sync/tidy/hand off, or validator freshness warnings appear. | Run [Understanding sync](#understanding-sync); patch only pages whose reader model is stale. |
| Cleanup / removal | The user asks to delete generated repo docs or stop using repo-docs. | Remove the docs package and stale root pointers. Do not recreate docs in the same turn unless asked. |
| Question refinement | A repo question in the conversation shows the guide did not build the right model. | Same interaction-time pipeline: inspect source, patch the smallest home if the gap is stable, anchor in `change-log.md`, answer with a link. |

Read [REFERENCE.md](REFERENCE.md) for detailed page rules and [EXAMPLES.md](EXAMPLES.md) for default output shapes and style targets when the task needs more than this core workflow.

Document contract:

| File | Role |
| --- | --- |
| `SKILL.md` | Canonical rules: core idea, content organization, modes, build order, page design, evidence, verification |
| `REFERENCE.md` | Page-type detail, sync, seed, quality bar — points to SKILL for page design |
| `EXAMPLES.md` | Default output shapes and finished-page tone targets |
| `scripts/validate_repo_docs.py` | Structure, links, sync anchors, glossary coverage, freshness hints |
| `repo-docs-zh/SKILL.md` | Chinese language overlay only |

## Build Order

For non-Seed repos:

1. Read the project instructions, README, entrypoints, scripts, tests, schemas, config, data, artifacts, and existing docs.
2. Pick one real workflow, request, task, failure, or data path that reveals the repo's shape.
3. Write `README.md` and `walkthroughs/one-real-run.md` first. Follow [Page Design](#page-design) and the default shapes in [EXAMPLES.md](EXAMPLES.md).
4. Add `modules/` only for concepts the walkthrough cannot explain cleanly inline.
5. Add `references/` for exact lookup tables: commands, fields, schemas, artifacts, metrics, task catalogs, tool parameters.
6. Add `glossary.md` and `change-log.md` in Standard shape; Lite repos add `change-log.md` and promote `glossary.md` when repeated terms appear.
7. Wire the guide into repo-root agent instructions—see [Root agent files](#root-agent-files).
8. Verify structure, links, code/data statements, reading flow, and code-name density.

For large repos or monorepos, scope first. Document one subsystem or one workflow well. Record uncovered areas instead of pretending the guide covers everything.

For Seed repos, write status-labeled project memory only: `README.md`, `change-log.md`, `glossary.md`, and `references/decisions.md`. Apply [Root agent files](#root-agent-files) when the package is created.

## Root Agent Files

Future agents should know where the living guide is and when to update it. After creating or materially updating `repo-docs/`, check the **repository root** for agent instruction files such as `AGENTS.md`, `CLAUDE.md`, or `CONTEXT.md`.

| Repo state | Action |
| --- | --- |
| Root agent file exists | Add or update a short `repo-docs/` block there—operational rules only, not a copy of the guide. |
| No root agent file | **Create `AGENTS.md`** at the repo root with the block below. |

Use `AGENTS.md` as the default name for a new file. Match an existing filename if the repo already standardizes on `CLAUDE.md` or another root agent file. Do not create both `AGENTS.md` and `CLAUDE.md` unless the repo already uses both.

Keep the block short:

- Where the guide lives (`repo-docs/`, entry `README.md`, main walkthrough).
- When to read it before answering repo-architecture questions.
- During coding work: after behavior-changing edits or when a user question shows the guide is missing or wrong, judge whether to patch `repo-docs/` in the same turn.
- Record meaningful guide work in `repo-docs/change-log.md`.

On Sync, patch the existing root agent file when guide policy or entry paths change. On Cleanup / removal, remove guide pointers from root agent files; do not leave stale `repo-docs/` maintenance rules.

See [REFERENCE.md](REFERENCE.md) for a minimal `AGENTS.md` skeleton.

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
  change-log.md
```

Lite shape for small repos:

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md
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
- `glossary.md`: define repeated project terms; optional one inferred further-reading link per row when a generic concept is large—see [Glossary entries](#glossary-entries).
- `change-log.md`: record meaningful guide work and sync anchors.

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
- "If this field is wrong in the event record, the parser may still pass but the scorer will read the wrong denominator."

Bad repo-docs writing sounds like this:

- "`src/a.py` does A, `src/b.py` does B, `src/c.py` does C."
- "This robust and powerful architecture enables seamless extensibility."
- "Confirmed: ... Confirmed: ... Confirmed: ..."
- "This page provides a comprehensive overview of the repository architecture and its modular components."

Prefer short paragraphs with a point. Use tables for comparison and lookup, not as a substitute for explanation. When phases, branches, or state handoffs are hard to hold in prose alone, add a small flowchart—see [Flowcharts when understanding needs them](#flowcharts-when-understanding-needs-them). Do not hide the main explanation path in `<details>`.

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
| Exact fields, commands, schemas | `references/` | narrative pages |
| Term definitions | `glossary.md` | narrative pages |
| Guide history and sync anchor | `change-log.md` | root agent file |

### Default page shapes

Reasonable defaults—not rigid caps. Add sections when they improve clarity; merge when they only repeat another page or another section on the same page.

| Page | Typical shape |
| --- | --- |
| `README.md` | Opening prose with in-text routes (+ optional `## Reader Routes` table when many walkthroughs or goals) |
| `walkthroughs/one-real-run.md` | Opening prose + one `##` per phase + optional flowchart when phases/branches need a visual anchor + closing (verify + links + evidence status) |
| `modules/<concept>.md` | Plain model → code model (structure + API + snippet) → link to walkthrough |
| `references/*.md` | Lookup warning + table |
| `glossary.md`, `change-log.md` | Title + table or entry list |

## Code-Name Density

The reader should understand the idea before seeing many source names.

- README first screen: almost no paths, functions, fields, or schemas. Link to the walkthrough.
- Walkthrough opening: explain the behavior and plain model before source locators.
- Walkthrough steps: each `##` step should move the story forward in prose—what happens, what changes, then where the code lives—without splitting every layer into its own subheading.
- Module pages: plain model, then code model with structure, API explanation, and a short inspected usage example; weave edit-order caveats only when they clarify the mechanism.
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

## Understanding Sync

The guide is a **reader mental model**. Maintenance keeps that model aligned with current source—not a file audit, not a change planner, and **not a batch job reserved for milestone closeouts**.

### Interaction-driven maintenance

Doc updates are judged **inside the user ↔ coding agent thread**:

| Interaction signal | Typical judgment |
| --- | --- |
| This turn changed code, data, config, scripts, or tests | Before replying: would the guide still teach the right model? Patch affected narrative pages if not. |
| The user asks how/why/where something works | Read guide → inspect source → if the guide should have prevented this question, patch the smallest home, then answer with a link. |
| The user corrects the agent's mental model | Stable gap; patch the owning page in the same turn. |
| The same confusion appears again in the thread | Stable gap; patch now. |
| One-off debug, local env, personal preference | Answer in chat; do not patch unless the user asks to record it. |
| The user says to leave docs untouched | Answer only; skip guide edits this turn. |

Do not wait for an explicit "sync docs" command when the conversation already shows what to fix. Explicit sync/tidy/handoff requests widen scope to a fuller [REFERENCE.md](REFERENCE.md) content alignment pass.

### One question

**What would a new reader misunderstand if they read the guide today?**

Answer from evidence: current source, tests, config, data, and `git diff` when available.

### Two triggers, one pipeline

Both triggers arrive through **conversation or the same coding thread**, not from a separate scheduler.

| Trigger | When | First move |
| --- | --- | --- |
| **Source changed** | This thread (or repo) changed code, data, config, scripts, tests, or architecture | Read `change-log.md` for the last `Synced through <sha>`; run `git diff <sha>..HEAD`; map changed paths to narrative pages that cite them |
| **Reader stuck** | A user question or correction shows the guide did not build the right model | Read guide → inspect source → decide if the gap is **stable** (future readers hit it too) or **transient** (this run only) |

Both triggers use the same patch rules:

1. Patch the **smallest narrative home** that fixes the misunderstanding.
2. Say each updated fact **once** in its best page; link elsewhere.
3. End meaningful sync work with a `change-log.md` entry that includes **`Synced through <commit-sha>`** when the repo is under git.

### Stable gap vs chat-only answer

| Signal | Action |
| --- | --- |
| Next reader would hit the same confusion without this chat | Patch guide, then answer with a link to the updated section |
| One-off debug, local env, personal preference | Answer in chat; patch only if the user asks to record it |
| Guide already answers correctly; reader has not read it yet | Point to the existing path; do not duplicate |
| Same understanding gap appears again in conversation | Treat as **stable**; patch the owning page in the same turn |

### Where to patch (reader job → home)

| Gap type | Home |
| --- | --- |
| End-to-end path wrong or incomplete | `walkthroughs/one-real-run.md` (one `##` phase) |
| One concept's mechanism unclear | `modules/<concept>.md` |
| Repeated term confusion | `glossary.md` |
| Exact name/schema lookup missing | `references/` |
| Several workflows or phases relate | `flows.md` (map only) |
| Intentionally undocumented area | `README.md` coverage note with `Planned` / `Unknown` |

Do not create pages to reduce file count anxiety. Create them when cognitive load drops.

### `change-log.md` as sync anchor

`change-log.md` is retrospective: what changed in the project and what guide work followed.

Every material guide patch from the conversation should record:

- Timestamp (`YYYY-MM-DD HH:MM TZ`)
- What triggered the update (diff summary or the question theme)
- Which guide pages changed
- **`Synced through <commit-sha>`** when git is available—the next sync starts from here

Without a sync anchor, the next update must re-derive scope from scratch or re-read broadly.

### Before finishing any turn

When `repo-docs/` exists, run the interaction check unless the user asked to leave docs untouched:

1. Did this turn change behavior-bearing source, or patch the guide?
2. Did the user ask, correct, or repeat something that implies a **stable** understanding gap?
3. If yes to either: apply the pipeline above; add `change-log.md` with `Synced through <sha>` when git is available.
4. Run `python scripts/validate_repo_docs.py <repo-docs> --repo-root <repo>` when available; treat sync-freshness and glossary warnings as patch candidates for a later turn in the same thread.

## Cleanup

If the user asks to delete repo docs, remove the docs package, stale guide links, and root maintenance rules that point at it. Do not recreate replacement docs unless asked.

## Verification

Before finishing:

- Check the required structure for Standard, Lite, or Seed mode.
- Check local Markdown links.
- Check that README and walkthrough openings are readable before source names appear.
- Check that modules explain concepts, not directory inventories.
- Check that references hold dense lookup material.
- Check page design: coherent story flow, headings that mark real beats, no duplicate facts across pages, no template `###` stacks under every walkthrough step.
- Check that uncertainty is labeled without turning the page into an audit table.
- Check root agent files: if the repo has no `AGENTS.md`, `CLAUDE.md`, or equivalent, create `AGENTS.md` with guide maintenance policy when `repo-docs/` was created or updated this turn.
- Check understanding sync: if source or guide changed this turn, `change-log.md` has a new entry with `Synced through <sha>` when git is available.
- Run `python scripts/validate_repo_docs.py <path-to-repo-docs> --repo-root <repo-root>` when available.

## Build Delivery

After a **Build** or first-time guide creation, tell the user what they can do now—not a file-count audit. Record durable facts in `repo-docs/change-log.md`; the reply is a short handoff, not a second README.

Default shape (prose first, about 8–15 lines):

1. **Outcome** — what the reader can understand or follow without opening source first.
2. **Start here** — one path: `repo-docs/README.md` → main walkthrough.
3. **What is in the package** — group by reader job (orient, main trace, concepts, lookup, glossary, root `AGENTS.md`). Path + half-sentence role each; do not paste page openings.
4. **Scope and checks** — Lite vs Standard, what is not covered yet, validator result, whether `AGENTS.md` was created or updated.

Rules:

- Lead with reader value, not "generated N files".
- Do not duplicate `README.md` routing prose or copy evidence-status lines from every page.
- Use a narrow 3-column table (`File` / `Use it when` / `Read after`) only when the package has many modules or references; small and Lite packages stay prose or a short bullet list.
- Note `Unknown` / `Planned` items honestly when they affect what the guide claims.

Sync and **widened-scope** closeouts use the layered format in [REFERENCE.md](REFERENCE.md) Closeout summary—not this Build delivery shape.

See [EXAMPLES.md](EXAMPLES.md) Build delivery example.
