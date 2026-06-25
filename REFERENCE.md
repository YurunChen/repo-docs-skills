# Repo-Docs Reference

This file is the routing page for detailed `repo-docs` rules. Read [SKILL.md](SKILL.md) first, then open only the topic file that matches the task.

## Topic Files

| Need | Read |
| --- | --- |
| Writing style, explanation design, evidence discovery | [WRITING.md](WRITING.md) |
| Seed projects, repo scope, monorepos, specialized repo types | [SCOPE_MODES.md](SCOPE_MODES.md) |
| Reader paths, navigation, language mode, output shape, page types | [PAGE_RULES.md](PAGE_RULES.md) |
| Evidence labels, source truth, quality bar | [QUALITY_RULES.md](QUALITY_RULES.md) |
| Question-driven updates, project-change sync, widened docs sync | [SYNC_RULES.md](SYNC_RULES.md) |
| Finished output shapes and tone examples | [EXAMPLES.md](EXAMPLES.md) |

## Default Routing

- First build: `WRITING.md` -> `PAGE_RULES.md` -> `QUALITY_RULES.md`; add `SCOPE_MODES.md` for seed, large, monorepo, research, benchmark, or data-heavy repos.
- Chinese docs: read `../repo-docs-zh/SKILL.md` after the main skill, then use the same topic files only as needed.
- Follow-up repo question: `SYNC_RULES.md` for the loop, plus the owning page rules in `PAGE_RULES.md` if a doc patch is needed.
- Widened docs cleanup, handoff, or milestone sync: `SYNC_RULES.md` first, then `QUALITY_RULES.md` for verification.
- Style uncertainty: `WRITING.md` and the relevant examples in `EXAMPLES.md`.

## Core Contract

The guide should teach one real behavior before it catalogs files. It should give the reader a plain model, then source locators, then a way to verify the model. Keep exact lookup material in `references/`, concept explanation in `modules/`, and durable guide history in `change-log.md`.
