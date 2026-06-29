# Repo-Docs Scope And Modes

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

### Seed next steps

Record planned implementation work in `README.md` (Next implementation steps) and explicit decisions in `references/decisions.md`. Use `change-log.md` for initialization and decision history. Do not create a separate change-plan page—the guide serves understanding, not maintenance routing.

### Seed change log

`change-log.md` should record project initialization and explicit user decisions:

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |

For seed projects, verification may be "docs scaffold created" or "decision recorded"; do not imply implementation verification when no implementation exists.

### Promotion rule

As code appears, promote seed content:

- `Planned` module -> module doc only after files or explicit architecture exist.
- `Planned` workflow -> current-state walkthrough or flow doc only after an entrypoint, script, or detailed accepted design exists. Until then, keep it in `README.md` as `Planned`.
- `Unknown` -> `Planned` when the user chooses a direction.
- `Planned` -> `Confirmed` only when repo evidence proves it.

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
