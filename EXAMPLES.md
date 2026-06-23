# Repo-Docs Examples

## Example Main Guide Skeleton

````markdown
# Project Guide

## One-Sentence Answer

This repo ...

## Why It Exists

The project is trying to ...

## How To Read This Repo

Start with the real walkthrough, then use modules and references as support:

1. Read [one-real-run.md](walkthroughs/one-real-run.md) to see the main behavior end to end.
2. Open the module pages only after the walkthrough names the boundary you need.
3. Use references for schemas, commands, artifacts, and field catalogs.

## First Walkthrough

The first walkthrough follows a real observable path:

```text
script/request/input -> runtime -> state changes -> decision/evaluation -> output/artifact
```

## Module Map

| Module | Reader question | Details |
| --- | --- | --- |
| Runtime | How does one request/run move? | [modules/runtime.md](modules/runtime.md) |

## Change Map

| If you want to... | Start here | Risk |
| --- | --- | --- |
| Add a task | `src/data/tasks` | schema and evaluator must agree |

## Current Scope

- Confirmed: ...
- Inferred: ...
- Caveats: ...
````

## Example Walkthrough Skeleton

````markdown
# One Real Run

## Reader Question

How does one observable action become state, output, or an evaluated result?

## Path At A Glance

```text
observable entry
-> input/data/request
-> runtime path
-> state changes
-> key decision/policy/evaluation
-> output/artifact
-> change risk
-> verification
```

## Step 1: Observable Entry

The reader starts with `command_or_request`. This matters because ...

Source evidence: `path/to/file` defines ...

## Step 2: Input/Data/Request

The entrypoint receives ... and normalizes ...

Source evidence: `path/to/schema_or_config` proves ...

## Step 3: Runtime Path

`function_name()` passes ... to ...

This step changes ... and downstream code relies on ...

## Step 4: Key Decision

The important branch/check/evaluation happens in ...

Worked example: when input is ..., the result is ...

## Output And Artifact

The run produces ...

## Change Risk

If you change ..., inspect ... and verify with ...

## Verification

```bash
command to verify
```
````

## Example Module Doc Skeleton

````markdown
# Runtime Module

## Reader Question

What confusion or maintenance decision brings the reader here?

## Key Insight

This module owns ...

## Where This Appears In The Walkthrough

In [one-real-run.md](../walkthroughs/one-real-run.md), this module appears when ...

## Inputs / State / Outputs

| Receives | Changes | Outputs |
| --- | --- | --- |
| ... | ... | ... |

## Source Evidence

- `src/runner.py`: proves ...
- `tests/test_runner.py`: verifies ...

## Change Scenario

If you change ..., inspect ...

## Verification

```bash
pytest tests/test_runner.py -q
```

## Caveats

- Unknown: ...
````

## Example Follow-up Behavior

User asks: "policy 是怎么评估的？"

The agent should:

1. Read `repo-docs/README.md`, the main walkthrough, and the relevant module/reference docs if present.
2. Inspect evaluator/policy source.
3. Patch the owning walkthrough or module when stable context is missing.
4. Add terms to `glossary.md` if needed.
5. Answer briefly with links to the updated docs.
