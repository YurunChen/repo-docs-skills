# Repo-Docs Examples

Default output shapes and finished-page tone targets.

**Canonical logic:** reader outcome, package layers, narrative beats, and prose rhythm live in [SKILL.md](SKILL.md) Content Organization. Page shapes and ownership live in [SKILL.md](SKILL.md) Page Design.

See [Walkthrough Default](#walkthrough-default), [Module caveat example](#module-caveat-example), [Build Delivery Example](#build-delivery-example), and [Tone Target](#tone-target-a-full-narrative-page-english).

## Standard Non-Seed Structure

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

Triggered pages such as more walkthroughs, `flows.md`, and `evidence-ledger.md` appear only when a reader problem needs them: multiple real behaviors, several policy cases, phase/state relationships, or a separate evidence table that would otherwise clutter the explanation path.

## Build Delivery Example

Use this as the tone target for the **user-facing reply** after Build—not as a page inside `repo-docs/`.

### Small or Lite package (prose default)

````markdown
已在 `repo-docs/` 建好首版文档包。读者可以先跟通一条真实运行路径，再按需查概念或字段名，而不必先扫目录树。

**先读这里：** [repo-docs/README.md](repo-docs/README.md) → [一条真实路径](repo-docs/walkthroughs/one-real-run.md)

**本次包含：**
- 主 walkthrough：消息进入 → 事件 → 审核决定
- 根目录已新增 `AGENTS.md`，说明何时同步文档

**范围：** Lite 结构；尚无独立 concept 页或 reference 表。  
**检查：** `validate_repo_docs.py` — 0 errors。
````

### Standard package with several pages (optional narrow table)

When modules and references make a bullet list hard to scan, add one table—still task-oriented, not a content dump.

````markdown
`repo-docs/` is ready. You can follow one message from arrival to a moderation decision, then drill into concepts or field names when needed.

**Start here:** [repo-docs/README.md](repo-docs/README.md) → [one real run](repo-docs/walkthroughs/one-real-run.md)

| File | Use it when | Read after |
| --- | --- | --- |
| `walkthroughs/one-real-run.md` | You need the end-to-end behavior trace | README |
| `modules/events.md` | The event handoff is still fuzzy | the normalization phase in the walkthrough |
| `references/message-schema.md` | You need exact field names | you understand why messages become events |
| `glossary.md` | Project terms blur together | you have read the walkthrough once |

**Scope:** Covers the inbox path only; admin CLI not documented separately.  
**Checks:** validator 0 errors; created root `AGENTS.md`.
````

## README Skeleton

````markdown
# Project Name Repo Docs

This project [what it does in one or two sentences]. [Why that matters / what real behavior proves it.] Follow [one real run from input to output](walkthroughs/one-real-run.md) to see the behavior before the code names make sense. For exact field or command names, use the relevant page under `references/`.

Evidence status: Confirmed unless noted.
````

Optional when the package has many goals or walkthroughs—add `## Reader Routes` as a table instead of folding every path into the opening paragraph.

## Walkthrough Default

Default shape for `walkthroughs/one-real-run.md`—connected prose, one `##` per phase, ownership per SKILL Page Design.

````markdown
# [Human behavior title]

[Opening: what you are following, plain model in one or two paragraphs, and optional links to concept pages you will need later.]

## [First behavior phase]

[What happens—in normal prose, including cause and effect. Weave paths and functions into sentences. When this phase introduces a durable concept, link to the matching module in the same paragraph—e.g. if [why the event exists](../modules/events.md) is still fuzzy after this step.]

## [Next behavior phase]

[Connected prose for the next phase.]

[Closing: end state after the run, one verify command for the whole path, links to concept pages or references if still useful.]

```bash
pytest path/to/tests -q
```

Evidence status: Confirmed unless noted.
````

## Walkthrough Expanded Shape (Long Pages Only)

Use this only when the walkthrough is long (roughly past 120 lines) or one phase needs a dense before/after table or several locators. Do not use it as the default for short or medium pages. Keep `##` phase headings; weave mechanism, paths, and checks into connected prose—do not stamp repeated reader-state `###` subheadings.

````markdown
## [human action or event]

[What the reader sees or does, in plain language. Then the mechanism in connected
prose—weave `path/to/file`, functions, and checks into sentences. If a before/after
record shape helps, place a small table inside the flow:]

| Before | After |
| --- | --- |
| ... | ... |

[Continue the causal chain. Link to `modules/<concept>.md` when a durable concept
first matters. Save page-end verification for the walkthrough close unless this
phase needs its own distinct check.]

```bash
pytest path/to/tests -q
```
````

## Module Doc Skeleton

Default module shape—one coherent prose block; weave edit-order caveats only when they clarify the mechanism.

````markdown
# [Readable Concept]

[Reader question or statement.] [Plain model — no code names yet.] You saw this in [the first real run](../walkthroughs/one-real-run.md) when [...].

[Code model in prose: structure, what key APIs do, then snippet.]

```python
# Short usage example from inspected source
...
```

[Where the concept lives: weave `path/to/file` and `function` into a sentence. If edit order matters for understanding, say why in the same paragraph.]

Evidence status: Confirmed unless noted.
````

## Reference Opening

````markdown
# [Reference Topic]

This is lookup material. Read the walkthrough first if the behavior is not clear yet.

| Field / command / artifact | Meaning | Notes |
| --- | --- | --- |

Evidence status: Confirmed unless a row says otherwise.
````

## Root AGENTS.md Skeleton

Create at the **repository root** when no `AGENTS.md`, `CLAUDE.md`, or equivalent agent instruction file exists and you are adding or materially updating `repo-docs/`. If a root agent file already exists, patch that file instead—do not create a second one.

````markdown
# Agent Instructions

## Repo docs

The living project guide is in `repo-docs/`. Start from `repo-docs/README.md`, then follow `repo-docs/walkthroughs/one-real-run.md` for the main behavior trace.

Before answering repo-architecture, onboarding, or "how does this work" questions, read the relevant guide pages. If the guide is missing, stale, or wrong for current source, update `repo-docs/` in the same turn, then answer from evidence.

During coding with the user: when behavior changes or a question shows the guide did not build the right model, judge whether to patch `repo-docs/` before finishing the turn. Record meaningful guide work in `repo-docs/change-log.md`.
````

## Mini Style Example

Use this as the style target. It names a concrete behavior first, then introduces source names only after the reader has a simple model.

This is a fictional sample. In real repo docs, replace every path, function, field, command, test name, and expected output with inspected project evidence. Put the page-level evidence note at the end of each narrative page; add local `Confirmed` / `已确认` labels only when confidence differs nearby.

The style target is practical: say what changed in the work, explain the mechanism, give the check. This is closer to Codex and Claude Code docs than to an architecture survey.

For longer explanations, let the paragraph unfold like an engineering post: a real situation appears, the design reason becomes visible, the project makes one tradeoff, and the check shows whether it worked.

**Style target — architecture as behavior:**

> The first problem appears before scoring starts: a user request is too loose for the evaluator to grade directly. The repo handles that by turning the request into a stable task record. After that point, the runner and evaluator read the same contract, so a scoring failure can usually be traced to either the normalized task or the check that consumed it.

Source locators follow once the reader has this model.

### Concrete Expression Example

**Evaluator as a second pass:**

> The generator can produce an output that looks finished while the main action is still broken. The evaluator gives the repo a second pass: it opens the result, performs the action a user would try, and records the first place the behavior diverges from the contract.

**Config as runtime choice:**

> The config changes which runner starts. If `mode` is set to `batch`, the CLI reads every task from the input file; if it is set to `single`, it reads one task id and stops after that run.

These read as truthful because they name an action, an observation, and the limit of the claim.

### README First Screen

````markdown
# Inbox Rules Repo Docs

This project turns incoming messages into review decisions. The core idea is simple: a raw message first becomes a stable event. Policy code reads that event and decides whether a human needs to look.

Follow [one message from arrival to review decision](walkthroughs/one-real-run.md) for the full path. Field names live in [message schema](references/message-schema.md).
````

### Walkthrough Step (Flat Default)

Use this inside a walkthrough `##` phase, not the expanded `###` template.

````markdown
## A message becomes an event

The system receives one incoming message and turns it into a record that later code can inspect. A message is what the user sent; an event is the stable version inside the system. At this point, no review decision has been made. This step protects later code from raw input differences—policy code reads the event, not the original message text.

After normalization, the system holds an event with sender, channel, timestamp, and cleaned body. Message shape is owned by `src/messages/normalize.py` and `normalize_message(...)`; every later check trusts that output. If [why the event exists](../modules/events.md) is still fuzzy, read that concept page; exact fields are in [message schema](../references/message-schema.md).
````

### Module Concept Page (Flat Default)

````markdown
# Events

Why does the repo create an event before it checks policy? An event is the stable handoff between input code and decision code—it keeps later logic from depending on raw message formatting. It is evidence for decision code, not the decision itself. You saw this in [one-real-run.md](../walkthroughs/one-real-run.md) when the incoming message became a normalized record.

`normalize_message(...)` in `src/messages/normalize.py` builds the event dict; `src/messages/schema.py` defines the fields policy code reads. Callers pass raw message text plus channel metadata; the function returns a dict policy can consume without knowing the original wire format.

```python
# From tests/test_message_normalization.py — representative call
event = normalize_message(sender="alice", channel="chat", body="  hello  ")
# event => {"sender": "alice", "channel": "chat", "body": "hello", "created_at": ...}
```

Change field names or normalization rules in `src/messages/normalize.py` and `src/messages/schema.py` before touching `src/policy/checks.py`—policy code assumes the normalized event shape.

Evidence status: Confirmed unless noted.
````

### Reference Lookup Page

````markdown
# Message Schema Reference

This is lookup material. Read [one-real-run.md](../walkthroughs/one-real-run.md) first if you do not yet understand why messages become events.

| Field | Meaning | Used by |
| --- | --- | --- |
| `sender` | Normalized sender identifier | policy checks |
| `channel` | Message surface such as email or chat | routing checks |
| `body` | Cleaned message text | content checks |
| `created_at` | Event timestamp | review history output |

Evidence status: Confirmed unless a row says otherwise.
````

### Glossary row

Three columns: **Term | Plain meaning | Further reading**. Code pointers and common confusion belong inside Plain meaning.

````markdown
| Term | Plain meaning | Further reading |
| --- | --- | --- |
| Event | Stable handoff after normalization; policy reads this record, not the raw message. Lives in `normalize.py` / `schema.py`. Often confused with the incoming message. | — |
| OTLP | Trace export format this repo uses; spans leave through the configured OTLP endpoint (`OTEL_EXPORTER_OTLP_ENDPOINT`). Not the same path as Prometheus scrape. | Inferred — [OTLP spec](https://opentelemetry.io/docs/specs/otlp/) |
````

### Module caveat example

When edit order or assumptions matter for **understanding** the mechanism, weave a short caveat into the module page—do not create a separate change-plan page.

````markdown
# Events

An event is the stable handoff between input code and decision code. Policy reads the normalized event, not the raw message.

The conversion lives in `src/messages/normalize.py` and `src/messages/schema.py`. If you are tracing why a field is missing in policy output, confirm the event record first—`src/policy/checks.py` assumes normalization already happened.

```python
event = normalize_message(raw_message)
decision = apply_policy(event)
```

You saw this handoff in [one-real-run.md](../walkthroughs/one-real-run.md) when the incoming message became a normalized record. Field names: [message schema](../references/message-schema.md).

Evidence status: Confirmed unless noted.
````

## Chinese Full-Page Style Example

Use these as tone targets for `repo-docs-zh`. They are intentionally written as finished pages, not skeletons.

### `walkthroughs/one-real-run.md`

Fictional tone target—not real project evidence. Replace paths, functions, fields, tests, and outputs with inspected evidence in real docs.

````markdown
# 一条真实路径：一条消息如何变成审核决定

这一页只跟一条消息走到底。这个项目最重要的动作，是把用户发来的原始消息变成一个稳定事件，再让规则代码读取这个事件，判断它是否需要人工审核。路径可以记成三步：消息进入 → 生成事件 → 做出决定。若「事件」这个概念还抽象，读完本页后看 [事件](../modules/events.md)。

## 消息先变成事件

系统收到一条消息后，第一件事不是判断它是否违规，而是把它整理成事件。消息是入口，事件是交接物；只要事件形状稳定，后面的审核规则就可以专心判断内容，而不是处理输入来源的差异。这一步还没有产生审核决定，只是把后面规则要读取的东西固定下来。

归一化之后，系统手里有的是带有 `sender`、`channel`、`body`、`created_at` 的事件。消息形状由 `src/messages/normalize.py` 里的 `normalize_message(...)` 负责；后面所有规则都信任这一步的输出。字段名见 [消息 schema](../references/message-schema.md)。

## 规则读取事件并做出审核决定

事件固定下来之后，规则代码才开始判断这条消息是否需要人工审核。它读的是事件字段，不再回头看原始消息。规则在 `src/policy/checks.py`。

跑下面命令可验证整条路径。

```bash
pytest tests/test_pipeline.py -q
```

证据状态：除特别标注外，本页基于当前源码已确认。
````

### `modules/events.md`

````markdown
# 事件

为什么项目不直接拿原始消息做审核，而要先创建一个事件？事件是输入代码和审核代码之间的交接物：它把后面需要的信息整理成稳定结构，让规则代码只面对一套字段。事件是审核结论的输入，不是结论本身。在 [一条真实路径](../walkthroughs/one-real-run.md) 里，消息进入后先被整理成事件——那一步还没有做审核。

`normalize_message(...)` 在 `src/messages/normalize.py` 里把原始消息整理成事件 dict；字段定义在 `src/messages/schema.py`。调用方传入 sender、channel、body 等原始输入，返回供规则代码读取的稳定结构。

```python
# 来自 tests/test_message_normalization.py 的代表性用法
event = normalize_message(sender="alice", channel="chat", body="  hello  ")
# event => {"sender": "alice", "channel": "chat", "body": "hello", "created_at": ...}
```

若你在追「为什么策略输出里缺某个字段」，先确认事件记录是否已包含该字段——`src/policy/checks.py` 默认规范化已在 `src/messages/normalize.py` 和 `src/messages/schema.py` 完成。

证据状态：除特别标注外，本页基于当前源码已确认。
````

## Explanation Pass Example

Use this as an internal coverage checklist, or render it when scoping which concepts still need a readable home.

| Reader moment | Plain concept | Optional concept page | Exact lookup | Verification |
| --- | --- | --- | --- | --- |
| User runs/imports/calls ... | How a run starts | `modules/entrypoint.md` if the walkthrough gets dense | `references/commands.md` | `...` |
| System parses ... | How input becomes usable state | `modules/data-shape.md` if this concept needs explanation | `references/schema.md` | `...` |
| System writes ... | What artifact the reader can inspect | `modules/output.md` if output behavior is non-obvious | `references/artifacts.md` | `...` |

## Markdown Display Patterns

- Each durable fact lives in one best home; other pages link to it.
- Walkthrough: behavior-named `##` headings; link to the matching `modules/<concept>.md` in the phase where that concept appears; add a small flowchart when phases or branches are hard to follow in prose alone; one verify block at page end.
- README: opening prose with in-text routes; optional `## Reader Routes` table for large packages.
- Module: plain model and code model in prose + snippet; weave edit-order caveats when they clarify understanding.
- Reference: lookup warning plus table; narrative stays in walkthrough or module.
- Mermaid and tables support prose; the paragraph still carries the reasoning. Use a flowchart when it teaches the model, not when it only repeats the file tree.
- Every behavior claim points to a test, command, artifact, schema, or source locator.

## Relationship Map Trigger Example

Create `flows.md` only when the reader needs to compare several paths or states:

- startup flow vs request flow
- success path vs failure path
- authoring path vs evaluation path
- state before feedback vs state after feedback

Do not create `flows.md` when `one-real-run.md` already explains the only meaningful path.

## Voice: From AI-Tell To Human Narration

These pairs apply the writing standard. The "before" lines are technically correct but read like a generated report; the "after" lines read like a maintainer thinking out loud while showing you the code. Use them as tone targets, not as text to copy.

**Broad praise to a concrete statement**
- Before: The pipeline is a powerful and robust system that seamlessly handles incoming events.
- After: Every incoming event goes through the same three steps, so a malformed payload fails in one place instead of halfway down the pipeline.

**"Not X but Y" to a direct positive statement**
- Before: This is not a queue but a log; consumers do not pop messages but read by offset.
- After: Consumers read by offset and the log keeps the message, so two consumers can read the same event without racing.

**File index to behavior with reasoning**
- Before: `router.py` routes requests, `handler.py` handles them, and `store.py` stores results.
- After: A request lands in the router, which picks a handler by path; the handler does the work and hands the result to the store. When a route returns 404, the router is the first place to look, because it chooses the handler before any handler runs.

**Clipped facts to narration with a transition**
- Before: Validation runs first. Then normalization. Then policy. Then write.
- After: Validation runs first so the rest of the chain can assume a well-formed event. Normalization then collapses the format variants into one shape, which is what lets the policy step stay short: it only ever sees normalized fields.

**Bare locator to an articulated locator**
- Before: Scoring is in `score.py`.
- After: Scoring lives in `score.py:compute_score`, where the weight table and denominator meet—if those two disagree, every downstream report reads the wrong score even when the API returns 200.

## Tone Target: A Full Narrative Page (English)

Default walkthrough shape. Headings name behavior phases; paths and checks live in prose.

````markdown
# How a message becomes a moderation decision

A message arrives from a user, and a moment later the system has decided to allow it, hold it, or block it. This page follows one such message from arrival to the written decision. The system turns each raw message into a normalized event, runs policy checks on that event, and stores the strictest result. If [strictest-wins](../modules/decision.md) is still fuzzy, read that concept page after this walkthrough.

## The message becomes an event

A raw message is whatever the client sent. The system converts it into one normalized event so everything downstream shares one shape. After this step, no later code reads the raw message again—a field missing here is missing for every check that follows.

Conversion lives in `ingest/normalize.py:to_event`; that is where the message becomes the single event shape policy code reads.

## The event runs past the checks

Each check returns allow, hold, or block. The system keeps the strictest result, so one strict check cannot be hidden by a lenient one that ran later. Checks live in `policy/checks.py`; combination logic is `policy/decide.py:resolve`.

After the run, the system holds one decision record for review history and the UI. Verify the full path:

```bash
pytest tests/test_pipeline.py -q
```

If edit order matters: say why in the module paragraph (for example, normalize before policy).

Evidence status: Confirmed unless noted.
````
