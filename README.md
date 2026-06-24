<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs
  </h1>
  <h3>Keep up with the code your agents write.</h3>
</div>

<p align="center">
  Repo-Docs turns fast-changing repositories into source-backed Markdown docs that help humans build a readable mental model before they need code names.
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## What Is Repo-Docs?

Vibe coding can make code change faster than the user can keep a working mental model. `repo-docs` is a Codex skill that keeps project understanding close to source truth. It starts with a real workflow, explains the behavior in human terms, then gives maintainers readable concept pages, exact references, a change map, and verification paths.

The default output stays Markdown-first under `repo-docs/`. HTML or course artifacts are not the default.

## Current Contract

| Principle | What it means |
| --- | --- |
| Walkthrough first | Non-Seed repos must teach one real behavior through `walkthroughs/one-real-run.md`. |
| Teaching pass | README, walkthroughs, modules, and change-map build a mental model before dense code names appear. |
| Markdown display | Headings, notice blocks, tables, code blocks, diagrams, and details blocks control the learning rhythm. |
| Reference discipline | Dense fields, commands, schemas, artifacts, metrics, and tool parameters live in `references/`, not the teaching narrative. |
| Evidence honesty | Uninspected code/data claims stay marked as inferred, planned, or unknown. |
| Navigation by scent | Each page links onward by what the reader gains; README offers a newcomer path and an expert fast-path. |
| Relationship maps by trigger | `flows.md` is only for relationships among multiple workflows, phases, states, or outputs; it does not replace the main walkthrough. |

## Output Shape

Non-Seed repos use this standard structure:

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

Seed repos use status-labeled project memory until real runtime evidence exists:

```text
repo-docs/
  README.md
  change-map.md
  change-log.md
  glossary.md
  references/
    decisions.md
```

Small or single-purpose repos can use a Lite shape (README, one walkthrough, change-map, change-log) and add `modules/`, `references/`, and `glossary.md` only when a concept or lookup table needs them.

## Teaching Model

Readers should understand behavior before code names: README and walkthroughs stay narrative and low-density, module pages teach one concept with a real example and source locators, and references hold the dense fields, commands, and schemas. The full teaching rules and Markdown display protocol live in [SKILL.md](SKILL.md) and [REFERENCE.md](REFERENCE.md).

## Modes

| Mode | Use it when | Output focus |
| --- | --- | --- |
| Seed | The repo is new or nearly empty | Goals, decisions, planned work, unknowns |
| Build | The repo needs its first docs | Real walkthrough, readable model, concept pages, references |
| Sync | Code, docs, data, scripts, or experiments changed | Current docs match source truth |
| Cleanup / removal | The user asks to delete generated docs | Remove docs and stale root pointers |
| Question refinement | A repo question exposes a stable docs gap | Patch reusable docs, then answer from evidence |

## Install

```bash
mkdir -p ~/.agents/skills/repo-docs
cp SKILL.md REFERENCE.md EXAMPLES.md ~/.agents/skills/repo-docs/
mkdir -p ~/.agents/skills/repo-docs-zh
cp repo-docs-zh/SKILL.md ~/.agents/skills/repo-docs-zh/SKILL.md
```

Then invoke it naturally:

```text
Use the repo-docs skill to create docs for this repository.
```

For Chinese docs:

```text
使用 repo-docs-zh skill 为这个项目创建中文 repo docs。
```

## Validation

The package includes a lightweight validator for generated docs:

```bash
python scripts/validate_repo_docs.py /path/to/repo-docs
```

It checks standard structure, local links, main walkthrough routing, teaching-section hints, change-map verification language, reference drift, `flows.md` misuse signals, and navigation scent (dead-end pages and low-scent link labels). Use `--lite` for the small-repo shape, `--seed` for Seed-mode structure, and `--repo-root <repo>` to verify that cited source locators exist in the real tree.

## Included Files

| File | Purpose |
| --- | --- |
| `SKILL.md` | Core workflow and hard constraints. |
| `REFERENCE.md` | Detailed writing standards, document types, sync rules, and quality checks. |
| `EXAMPLES.md` | Reusable output skeletons, teaching examples, and Markdown display anti-patterns. |
| `repo-docs-zh/SKILL.md` | Chinese language overlay. |
| `scripts/validate_repo_docs.py` | Local repo-docs package validator. |

## Quality Bar

A good repo-docs package lets a newcomer explain the project question, follow one real behavior without opening the source tree first, understand the concepts that appear in that path, look up exact contracts, and identify safe change paths with verification.

---

<div align="center">
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><strong>Repo-Docs:</strong> Keep up with the code your agents write.</p>
</div>
