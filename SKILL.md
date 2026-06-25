---
name: repo-docs
description: Build and maintain a Markdown guide that helps humans understand a repository through real behavior, concepts, and evidence. Use when a user asks to understand a repo, generate or update repo-docs, answer repo-architecture/onboarding questions, seed docs for a new project, sync docs after code changes, or delete generated repo docs.
---

# Repo-Docs

## Mission

`repo-docs` explains a repository to a human reader.

Do not make a tree tour. Build a reader model: what problem the repo solves, one real behavior it performs, the concepts behind that behavior, where source truth lives, and how to verify the understanding.

## Load Order

1. Read this file first.
2. Open [REFERENCE.md](REFERENCE.md) as the routing page only when the task needs detailed rules.
3. From that router, open only the needed topic file: writing, page rules, scope/modes, sync, or quality.
4. Open [EXAMPLES.md](EXAMPLES.md) only when the task needs finished-page tone or output-shape examples.
5. Prefer bundled scripts over rewriting deterministic checks.

## Document Contract

| File | Role |
| --- | --- |
| `SKILL.md` | Entry: mission, principles, output contract, build/sync summary, verification |
| `REFERENCE.md` | Router to topic files—open only when detail is needed |
| `WRITING.md` | Explanation design, voice, evidence discovery |
| `PAGE_RULES.md` | Reader paths, page types, output shape, navigation |
| `SCOPE_MODES.md` | Seed, large/monorepo scope, specialized repos |
| `SYNC_RULES.md` | Question loop, change sync, widened content alignment |
| `QUALITY_RULES.md` | Evidence labels, source truth, quality bar |
| `EXAMPLES.md` | Finished-page tone and output-shape examples |
| `scripts/validate_repo_docs.py` | Structure, links, sync anchors, freshness checks |
| `validate_repo_docs.py` | Compatibility wrapper for older invocations |
| `repo-docs-zh/SKILL.md` | Chinese language overlay |

## First Principles

- Behavior before inventory: teach one real workflow, request, task, failure, or data path first.
- Reader handles before locators: the handle explains; the exact path, function, field, command, or artifact proves.
- Direct source links by default: link one claim to one source with readable text. Create `references/source-map.md` only when repeated grouped locators would clutter pages.
- One durable fact, one home: concepts in `modules/`, exact lookup material in `references/`, term disambiguation in `glossary.md`, guide history in `change-log.md`.
- Evidence stays visible but quiet: current source, tests, config, data, command output, and artifacts outrank old docs, memory, and chat.

## Output Contract

Use the smallest package that teaches the repo honestly.

- Standard: `README.md`, `walkthroughs/one-real-run.md`, `modules/`, `references/`, `glossary.md`, `change-log.md`.
- Lite: `README.md`, `walkthroughs/one-real-run.md`, `change-log.md`; use for small repos with little durable terminology.
- Seed: `README.md`, `change-log.md`, `glossary.md`, `references/decisions.md`; label facts as `Confirmed`, `Planned`, or `Unknown`.

## Page Ownership

| Page | Job |
| --- | --- |
| `README.md` | Orient the reader and point to the first useful path. |
| `walkthroughs/one-real-run.md` | Follow one real behavior end to end with numbered `## Step N: behavior` headings. |
| `modules/<concept>.md` | Explain one durable concept named by the walkthrough. |
| `references/*.md` | Hold exact lookup tables: commands, schemas, artifacts, metrics, tools, grouped source maps. |
| `glossary.md` | Three columns only: `Term | Plain meaning | Further reading`. |
| `change-log.md` | Meaningful guide changes and sync anchors. |

## Build Workflow

1. Read project instructions, README, entrypoints, scripts, tests, schemas, config, data, artifacts, and existing docs.
2. Choose one representative real behavior that reveals the repo shape.
3. Write `README.md` and `walkthroughs/one-real-run.md` first.
4. Add modules only for concepts the walkthrough cannot explain cleanly inline.
5. Add references only for exact names or catalogs that would clutter narrative pages.
6. Add `glossary.md` and `change-log.md`.
7. Wire the guide into the repo-root agent file: update `AGENTS.md`, `CLAUDE.md`, or create `AGENTS.md` if none exists.
8. Run the validator and fix structure, link, and evidence problems.

For large repos or monorepos, scope the guide to one subsystem or workflow and say what is not covered.

## Modes

`repo-docs/` is maintained **during the user ↔ coding agent conversation**, not in a separate offline pass. **Except Build, Seed, and Cleanup, run [Understanding Sync](#understanding-sync) each turn** when `repo-docs/` exists. Modes name common situations—not detached jobs. Detail: [SCOPE_MODES.md](SCOPE_MODES.md), [SYNC_RULES.md](SYNC_RULES.md).

| Mode | Use when | What to do |
| --- | --- | --- |
| Seed | No real source/runtime/test/data contract yet | Status-labeled project memory; do not describe plans as implemented |
| Build | First repo docs or onboarding material | One real workflow; wire root agent file; run validator; [deliver](#delivery) |
| Sync | Interaction or repo state shows the guide may be stale | Run Understanding sync; patch only stale pages |
| Cleanup / removal | User asks to delete generated repo docs | Remove the package and stale root pointers |
| Question refinement | A repo question shows the guide built the wrong model | Smallest stable patch, anchor in `change-log.md`, answer with a link |

## Understanding Sync

When `repo-docs/` exists, ask: what would a new reader misunderstand if they read the guide today?

Patch the smallest owning page when this turn changed behavior-bearing source, data, config, scripts, or tests; a user correction revealed a stable understanding gap; or validator warnings show stale links, missing sync anchors, or likely drift.

Do not patch for one-off debug state, local environment quirks, or personal preference unless the user asks to preserve it.

Every material sync updates `repo-docs/change-log.md` with the trigger, changed pages, verification, and `Synced through <sha>` when git is available.

## Writing Rules

- Use concrete engineering prose: situation -> reason -> mechanism -> check -> caveat.
- Keep README and walkthrough openings low in code names.
- Never let a path, function, field, or metric carry the explanation.
- Link with reader handles, not raw paths as visible text.
- Before delivery, make a voice pass: remove broad praise, filler, rule-of-three padding, negative parallelisms, chatbot phrasing, decorative emphasis, and generic upbeat closers.
- For technical docs, natural voice means plain, specific, and accountable. Do not add first-person personality unless the page is explicitly editorial.
- Use flowcharts only for phase handoffs, branching paths, or state changes.
- Put page-level evidence status at the end of narrative pages: `Evidence status: Confirmed unless noted.`

## Verification

Before finishing, check structure, local links, source links, narrative flow, module ownership, and reference-page lookup behavior.

Run:

```bash
python scripts/validate_repo_docs.py <path-to-repo-docs> --repo-root <repo-root>
```

## Delivery

**First build:** tell the user what the reader can now do, where to start, the key pages, scope, validator result, and root agent-file status. Keep durable history in `change-log.md`, not in chat.

**Cleanup:** if the user asks to remove repo docs, delete the generated docs package and stale root-agent pointers. Do not recreate docs in the same turn unless explicitly asked.

**Widened sync closeout:** when the user explicitly asks to sync, tidy, hand off, or repair stale docs, follow [SYNC_RULES.md](SYNC_RULES.md) and summarize by changed layer—not a substitute for per-turn Understanding sync.
