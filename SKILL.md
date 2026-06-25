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
2. Open [REFERENCE.md](REFERENCE.md) for task routing when detailed rules are needed.
3. Open only the topic file the router points to.
4. Open [EXAMPLES.md](EXAMPLES.md) only for finished-page tone or output-shape examples.
5. Prefer bundled scripts over rewriting deterministic checks.

Keep the routing narrow. `SKILL.md` defines the contract; topic files carry the detailed rules. If a detail appears in two places, keep it in the topic file and leave a pointer here.

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
7. Wire the guide into the project's agent instruction Markdown. Search for existing files such as `AGENTS.md`, `AGENTS.override.md`, `CLAUDE.md`, `GEMINI.md`, or `.cursor/rules/*.md`; patch the ones that clearly govern coding agents for this repo. If none exists, create `AGENTS.md`. The rule must say that future repo questions and behavior-changing edits should check `repo-docs/`, patch stale guide pages in the same turn when needed, and record meaningful guide work in `repo-docs/change-log.md`.
8. Run the validator and fix structure, link, and evidence problems.

For large repos or monorepos, scope the guide to one subsystem or workflow and say what is not covered.

Build is not finished until the next coding agent can maintain the guide without rediscovering the policy. The project agent instruction Markdown is the handoff point: it should point to `repo-docs/README.md`, name the main walkthrough, and tell future agents to run an Understanding Sync check when repo questions or behavior-changing edits appear.

## Root Agent File Contract

When Build creates or updates `repo-docs/`, search the project for agent instruction Markdown before creating anything new. Look for common project files such as `AGENTS.md`, `AGENTS.override.md`, `CLAUDE.md`, `GEMINI.md`, and `.cursor/rules/*.md`, plus any nearby Markdown file whose filename or heading clearly says it is for coding agents.

Patch existing agent instruction files that already govern the repo or the package being documented. Do not create extra tool-specific files just to mirror the rule. If no such file exists, create `AGENTS.md` at the project root.

For nested packages, patch the nearest project agent instruction Markdown that governs the generated `repo-docs/` package. If the guide is created at the repository root, use the root file.

The rule should say:

- The living guide is in `repo-docs/`; start with `repo-docs/README.md`.
- The main behavior trace lives in `repo-docs/walkthroughs/one-real-run.md` when that file exists.
- Before answering architecture, onboarding, or "how does this work" questions, read the relevant guide pages and inspect the current source behind the answer.
- If the guide is missing, stale, or wrong for current source, patch the smallest owning page in the same turn before answering.
- When code, config, data, scripts, tests, or behavior change, run an Understanding Sync check before finishing unless the user asked not to touch docs.
- Record meaningful guide updates in `repo-docs/change-log.md` with verification and `Synced through <sha>` when git is available.

Default block to write:

```markdown
## Repo docs

The living project guide is in `repo-docs/`. Start with `repo-docs/README.md`; when `repo-docs/walkthroughs/one-real-run.md` exists, use it as the main behavior trace.

Before answering repo architecture, onboarding, or "how does this work" questions, read the relevant guide pages and inspect the current source behind the answer. If the guide is missing, stale, or wrong, update the smallest owning page in the same turn before answering.

When code, config, data, scripts, tests, or behavior changes, run an Understanding Sync check before finishing. Patch only the guide pages that would otherwise mislead the next reader. Record meaningful guide updates in `repo-docs/change-log.md` with verification and `Synced through <sha>` when git is available.
```

Keep this root rule short. Do not copy the guide into `AGENTS.md` or `CLAUDE.md`; those files route future agents back to `repo-docs/`.

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

Use this loop during coding-agent interaction:

1. Read the current guide page that should already answer the question or describe the changed behavior.
2. Inspect the source, config, data, tests, command output, or artifact that proves the current behavior.
3. Decide whether the gap is durable. Durable means a future reader would likely misunderstand the repo, not merely miss a one-off debugging detail.
4. Patch the owning page:
   - behavior path changed -> walkthrough
   - concept changed or became clearer -> module
   - exact field, command, config, schema, metric, or artifact changed -> reference
   - term meaning changed -> glossary
   - material guide sync happened -> change log
   - root agent routing is missing or stale -> `AGENTS.md` / `CLAUDE.md`
5. Run the smallest useful check: validator, link check, relevant test, command, or source inspection.
6. Answer the user from the updated guide or from the inspected source, and mention what changed if docs were patched.

## Writing Rules

Use [WRITING.md](WRITING.md) for voice and explanation rules. The short version:

- Start with the situation a reader can recognize, then explain the reason, mechanism, check, and caveat.
- Keep README and walkthrough openings low in code names.
- Never let a path, function, field, or metric carry the explanation.
- Use flowcharts only for phase handoffs, branching paths, or state changes.
- Put page-level evidence status at the end of narrative pages: `Evidence status: Confirmed unless noted.`

## Finish Checklist

Before delivery, confirm:

- The reader can start from `repo-docs/README.md` and reach the main walkthrough.
- `walkthroughs/one-real-run.md` follows one real behavior with numbered steps.
- Module pages use `Plain model`, `Code model`, and `Read next` when they exist.
- Exact fields, commands, schemas, metrics, and artifacts live in `references/`, not in the main narrative.
- Project agent instruction Markdown contains the `Repo docs` sync rule, or `AGENTS.md` was created.
- `change-log.md` records meaningful guide work and includes `Synced through <sha>` when git is available.
- The validator ran, or the reason it could not run is stated.

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
