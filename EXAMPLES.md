# Repo Docs Examples

## Example Main Guide Skeleton

```markdown
# Project Guide

## One-Sentence Answer

This repo ...

## Why It Exists

The project is trying to ...

## How To Read This Repo

1. Start with ...
2. Then inspect ...
3. Use ... when debugging.

## One Real Workflow

```text
script -> cli -> runtime -> tools/state -> evaluator -> outputs
```

## Module Map

| Module | Responsibility | Details |
| --- | --- | --- |
| Runtime | Coordinates one run | [modules/runtime.md](modules/runtime.md) |

## Change Map

| If you want to... | Start here | Risk |
| --- | --- | --- |
| Add a task | `src/data/tasks` | schema and evaluator must agree |

## Current Scope

- Confirmed: ...
- Inferred: ...
- Caveats: ...
```

## Example Module Doc Skeleton

```markdown
# Runtime Module

## Summary

This module owns ...

## Inputs And Outputs

| Input | Output | Source |
| --- | --- | --- |

## Main Files

- `src/cli.py`: ...
- `src/runner.py`: ...

## Flow

1. ...
2. ...

## Change Guide

Change ... in ...; verify with ...

## Evidence

- `src/runner.py`: confirms ...
- `tests/test_runner.py`: verifies ...

## Caveats

- 未确认: ...
```

## Example Follow-up Behavior

User asks: "policy 是怎么评估的？"

The agent should:

1. Read existing `README.md`, `modules/evaluation.md`, and `references/metrics.md` if present.
2. Inspect evaluator/policy source.
3. Patch `modules/evaluation.md` or create it.
4. Add terms to `glossary.md` if needed.
5. Answer briefly with links to the updated docs.
```
