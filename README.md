<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs
  </h1>
  <h3>Keep up with the code your agents write.</h3>
</div>

<p align="center">
  Repo-Docs explains fast-changing repositories in plain technical language, then points to the code.
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## What Is Repo-Docs?

Vibe coding can make code change faster than the user can keep up. `repo-docs` is a Codex skill for rebuilding the reader's understanding. It starts with one real thing the repo does, explains the idea in normal technical language, then points to the code, contracts, risks, and checks.

The default output stays Markdown-first under `repo-docs/`. HTML or lesson-style artifacts are not the default.

## Current Contract

| Principle | What it means |
| --- | --- |
| Walkthrough first | Start with one real behavior, not the directory tree. |
| Coherent page design | Connected prose; headings mark real beats; each fact has one home—see SKILL Content Organization and Page Design. |
| Module code model | Concept pages teach structure, API use, and a short inspected snippet—see SKILL Content Organization. |
| Plain mechanism first | README and walkthroughs explain what happens before dense source names appear. |
| Concrete engineering voice | Use specific actions, observations, checks, and caveats instead of broad claims. |
| References stay dense | Fields, commands, schemas, artifacts, metrics, and tool parameters live in `references/`. |
| Quiet evidence | Source truth stays visible; page-level status at the **end** of narrative pages, local labels only where confidence differs. |
| Useful navigation | Links say what the reader will learn next, not just where the file lives. |

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

## Explanation Model

Readers understand behavior before names. Narrative pages read as connected prose. **Content organization** (reader outcome, package layers, narrative beats) is canonical in [SKILL.md](SKILL.md) Content Organization; page shapes and ownership in [SKILL.md](SKILL.md) Page Design.

The writing should feel true because it names what the repo does: a script reads config, a runner starts a session, a checker catches a missing field, a test covers one branch and misses another. The full rules live in [SKILL.md](SKILL.md) and [REFERENCE.md](REFERENCE.md).

## Modes

| Mode | Use it when | Output focus |
| --- | --- | --- |
| Seed | The repo is new or nearly empty | Goals, decisions, planned work, unknowns |
| Build | The repo needs its first docs | Real walkthrough, readable model, concept pages, references |
| Sync | Code, docs, data, scripts, or experiments changed | Current docs match what the source shows |
| Cleanup / removal | The user asks to delete generated docs | Remove docs and stale root pointers |
| Question refinement | A repo question exposes a stable docs gap | Patch reusable docs, then answer from evidence |

## Install

```bash
mkdir -p ~/.agents/skills/repo-docs
cp SKILL.md REFERENCE.md EXAMPLES.md ~/.agents/skills/repo-docs/
mkdir -p ~/.agents/skills/repo-docs/scripts
cp scripts/validate_repo_docs.py ~/.agents/skills/repo-docs/scripts/
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

It checks standard structure, local links, routing, template-stacking drift (repeated reader-state subheadings, duplicate walkthrough closing sections), reading-flow hints, change-map verification language, confidence-label noise, reference drift, `flows.md` misuse, and navigation scent. Use `--lite` for the small-repo shape, `--seed` for Seed-mode structure, and `--repo-root <repo>` to verify that cited source locators exist in the real tree.

## Included Files

| File | Purpose |
| --- | --- |
| `SKILL.md` | Core workflow, content organization, page design, and hard constraints. |
| `REFERENCE.md` | Detailed writing standards, document types, sync rules, and quality checks. |
| `EXAMPLES.md` | Default output shapes and finished-page tone targets. |
| `repo-docs-zh/SKILL.md` | Chinese language overlay. |
| `scripts/validate_repo_docs.py` | Local repo-docs package validator. |

## Quality Bar

A good repo-docs package lets a newcomer explain the repo, follow one real behavior, understand the few concepts that matter, look up exact contracts, and know where a change can break.

---

<div align="center">
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><strong>Repo-Docs:</strong> Keep up with the code your agents write.</p>
</div>
