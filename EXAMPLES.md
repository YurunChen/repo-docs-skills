# Repo-Docs Examples

## Standard Non-Seed Structure

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

Triggered pages such as more walkthroughs, `flows.md`, and `evidence-ledger.md` appear only when a reader problem needs them: multiple real behaviors, several policy cases, phase/state relationships, or claim auditing that no longer fits local labels.

## README Skeleton

````markdown
# Project Name Repo Docs

This project [plain answer]. The fastest way to understand it is to follow one real behavior from entry to output, then use concept pages and references only when needed.

## Project Model

[One readable paragraph with concrete claims: what problem this project solves, what behavior proves it, and what caveats matter. Keep this understandable before source names appear.]

## First Path

Start with [one-real-run.md](walkthroughs/one-real-run.md). It explains [observable behavior] before introducing code names.

## Reader Routes

| Goal | Read first | Then use |
| --- | --- | --- |
| Understand the repo | [one-real-run.md](walkthroughs/one-real-run.md) | concept pages when a term stays fuzzy |
| Change behavior | [change-map.md](change-map.md) | concept page, files to inspect, and reference |
| Look up exact names | relevant reference | source locator |

## Current Scope And Caveats

- Confirmed: ...
- Inferred: ...
- Unknown: ...
````

## Walkthrough Skeleton

````markdown
# One Real Run: [human behavior]

This walkthrough teaches one real behavior before naming the machinery behind it.

## What You Are Looking At

In human terms, [actor] receives [request/data], changes [state/output], and the system later decides [score/policy/result].

## Plain Model

| Concept | Plain meaning |
| --- | --- |
| Input | ... |
| State change | ... |
| Decision | ... |
| Output | ... |

## Step 1: [human action or event]

### What You Are Looking At

[One or two sentences about the visible behavior. Use normal prose before code names.]

### Plain Model

[The concept this step teaches.]

> **Notice:** [The observation that helps the reader connect cause and effect.]

### What Changes

| Before | After |
| --- | --- |
| ... | ... |

### Source Locator

- Confirmed: `path/to/file`, `function_or_field`, `test_name`.

Next: this concept is explained in [module-name](../modules/module-name.md); exact fields are in [reference-name](../references/reference-name.md).

### Verification

```bash
...
```

Expected:

```text
...
```

## Change Risk

| Change | Risk | Verification |
| --- | --- | --- |

## Verification

Run: `...`
Expected: `...`
````

## Module Doc Skeleton

````markdown
# [Readable Concept]

## Reader Question

What confusion or change decision brings the reader here?

## Plain Model

Explain the concept without starting from file names.

## Where You Saw This

This concept appears in [one-real-run.md](../walkthroughs/one-real-run.md) when [...].

## One Concrete Example

| Example input or state | What happens in plain language | What proves it |
| --- | --- | --- |

## What To Notice

> **Notice:** The important detail is [...]. This is the point that keeps later source names from feeling arbitrary.

## Source Locator

- Confirmed: `path/to/file`, `function_or_field`, `test_name`.

## Change Risk

| If you change | Watch for | Verify with |
| --- | --- | --- |

## Verification

Run: `...`
Expected: `...`
````

## Reference Opening

````markdown
# [Reference Topic]

This is lookup material. Read the walkthrough first if you do not yet understand the behavior.

Evidence status: Confirmed unless a row says otherwise.

| Field / command / artifact | Meaning | Notes |
| --- | --- | --- |
````

## Mini Teaching Example

Use this as the style target for low-code-density teaching. The example names a concrete behavior first, then introduces source names only after the reader has a plain model.

This is a fictional sample. In real repo docs, replace every path, function, field, command, test name, and expected output with inspected project evidence. Do not mark anything `Confirmed` / `已确认` unless you inspected the source, data, test, artifact, or command output.

### README First Screen

````markdown
# Inbox Rules Repo Docs

This project turns incoming messages into a small set of review decisions. The important idea is simple: a raw message is first normalized into a stable event, then policy code decides whether the message needs human review.

Start with [one-real-run.md](walkthroughs/one-real-run.md). It follows one message from arrival to review decision before naming the parser, policy function, or stored fields.

## Reader Routes

| Goal | Read first | Then use |
| --- | --- | --- |
| Understand the repo | [one-real-run.md](walkthroughs/one-real-run.md) | [events](modules/events.md) if the event concept is still fuzzy |
| Change review behavior | [change-map.md](change-map.md) | [policy fields](references/policy-fields.md) |
| Look up exact field names | [message schema](references/message-schema.md) | source locator in the walkthrough |
````

### Walkthrough Step

````markdown
## Step 1: A message becomes an event

### What You Are Looking At

The system receives one incoming message and turns it into a record that later code can inspect. At this point, no review decision has been made.

### Plain Model

A message is what the user sent. An event is the stable version of that message inside the system.

> **Notice:** This step protects later code from raw input differences. The policy checker reads the event, not the original message text.

### What Changes

| Before | After |
| --- | --- |
| Raw message text and sender | Event with sender, channel, timestamp, and normalized body |

### Source Locator

- Confirmed: `src/messages/normalize.py`
- Confirmed: `normalize_message(...)`
- Confirmed: `tests/test_message_normalization.py`

Next: the event idea is explained in [events](../modules/events.md). Exact event fields are listed in [message schema](../references/message-schema.md).

### Verification

```bash
pytest tests/test_message_normalization.py -q
```

Expected:

```text
3 passed
```
````

### Module Concept Page

````markdown
# Events

## Reader Question

Why does the repo create an event before it checks policy?

## Plain Model

An event is the stable handoff between input code and decision code. It keeps later logic from depending on raw message formatting.

## Where You Saw This

You saw this in [one-real-run.md](../walkthroughs/one-real-run.md) when the incoming message became a normalized record.

## One Concrete Example

| Input state | What happens in plain language | What proves it |
| --- | --- | --- |
| Message has sender and free-form body | Normalization stores a sender and cleaned body in one event | `tests/test_message_normalization.py` |

## What To Notice

> **Notice:** The event is not the final decision. It is the evidence that the decision code will read.

## Source Locator

- Confirmed: `src/messages/normalize.py`
- Confirmed: `src/messages/schema.py`

## Change Risk

| If you change | Watch for | Verify with |
| --- | --- | --- |
| Event fields | Policy code may read a missing field | `pytest tests/test_policy.py -q` |

## Verification

Run: `pytest tests/test_message_normalization.py tests/test_policy.py -q`
````

### Reference Lookup Page

````markdown
# Message Schema Reference

This is lookup material. Read [one-real-run.md](../walkthroughs/one-real-run.md) first if you do not yet understand why messages become events.

Evidence status: Confirmed unless a row says otherwise.

| Field | Meaning | Used by |
| --- | --- | --- |
| `sender` | Normalized sender identifier | policy checks |
| `channel` | Message surface such as email or chat | routing checks |
| `body` | Cleaned message text | content checks |
| `created_at` | Event timestamp | audit output |
````

### Change Map Example

````markdown
# Change Map

| Goal | Concept to understand | Files to inspect | Reference | Risk | Verification |
| --- | --- | --- | --- | --- | --- |
| Add a new message field | [Events](modules/events.md) | `src/messages/schema.py`, `src/messages/normalize.py` | [message schema](references/message-schema.md) | Policy code may assume the old event shape | `pytest tests/test_message_normalization.py tests/test_policy.py -q` |
| Change review rules | event vs decision | `src/policy/checks.py` | [policy fields](references/policy-fields.md) | Normalization tests may pass while policy behavior changes | `pytest tests/test_policy.py -q` |
````

## Chinese Full-Page Teaching Example

Use these as tone targets for `repo-docs-zh`. They are intentionally written as finished pages, not skeletons.

### `walkthroughs/one-real-run.md`

````markdown
# 一条真实路径：一条消息如何变成审核决定

示例说明：这是一页成稿风格示例，不是真实项目证据。实际生成文档时，必须把路径、函数、字段、测试和输出替换成当前项目中已检查过的证据。

这一页只跟一条消息走到底。先不要急着看文件名。这个项目最重要的动作，是把用户发来的原始消息变成一个稳定事件，再让规则代码读取这个事件，判断它是否需要人工审核。

## 你正在看什么

假设系统收到一条来自聊天渠道的消息。用户看到的是一段文本，系统内部需要的是一个可重复检查的记录。两者不是同一种东西：文本适合人读，事件适合代码读。

## 白话模型

可以先把这条路径记成三步：

| 阶段 | 白话解释 | 读者应该记住的点 |
| --- | --- | --- |
| 消息进入 | 用户发来一段原始文本 | 这里还没有审核结论 |
| 生成事件 | 系统把文本、发送者、渠道和时间放进稳定结构 | 后面的规则只读这个结构 |
| 做出决定 | 规则代码读取事件，决定是否需要人工审核 | 决定依赖事件字段，不依赖原始输入格式 |

> **注意看：** 这条路径的关键不是“哪个函数先调用哪个函数”，而是原始输入什么时候变成后续代码都能信任的事件。

## Step 1: 消息先变成事件

### 你正在看什么

系统收到一条消息后，第一件事不是判断它是否违规，而是把它整理成事件。这样做的好处很直接：后面的代码不用关心消息来自哪个渠道，也不用反复处理原始文本里的格式差异。

### 白话模型

消息是入口，事件是交接物。只要事件形状稳定，后面的审核规则就可以专心判断内容，而不是处理输入来源的差异。

### 注意看

> **注意看：** 这一步还没有产生审核决定。它只是准备证据，把后面规则要读取的东西固定下来。

### 发生了什么变化

| 之前 | 之后 |
| --- | --- |
| 原始消息文本、发送者、渠道 | 带有 `sender`、`channel`、`body`、`created_at` 的事件 |

### 源码定位

- 已确认：`src/messages/normalize.py`
- 已确认：`normalize_message(...)`
- 已确认：`tests/test_message_normalization.py`

如果这里看起来还抽象，先读 [事件](../modules/events.md)。字段名需要查表时，再看 [消息 schema](../references/message-schema.md)。

### 验证方法

```bash
pytest tests/test_message_normalization.py -q
```

预期输出：

```text
3 passed
```

## 改动风险

| 如果你要改 | 主要风险 | 先跑什么 |
| --- | --- | --- |
| 给事件增加字段 | 审核规则可能仍然读取旧字段 | `pytest tests/test_message_normalization.py tests/test_policy.py -q` |
| 改消息清洗逻辑 | 规则看到的 `body` 可能变化 | `pytest tests/test_policy.py -q` |
````

### `modules/events.md`

````markdown
# 事件

## 读者问题

为什么项目不直接拿原始消息做审核，而要先创建一个事件？

## 白话模型

事件是输入代码和审核代码之间的交接物。原始消息来自不同渠道，格式可能不一致；事件把后面需要的信息整理成稳定结构，让规则代码只面对一套字段。

这个设计降低了两个风险。第一，审核规则不会被渠道格式拖着走。第二，测试可以直接检查事件形状，提前发现字段变化有没有破坏后续逻辑。

## 你在哪里见过它

在 [一条真实路径](../walkthroughs/one-real-run.md) 里，消息进入系统后先被整理成事件。那一步还没有做审核，只是在准备后面规则要读取的证据。

## 一个真实例子

| 输入状态 | 系统做了什么 | 证据 |
| --- | --- | --- |
| 一条消息包含发送者和自由文本 | 归一化逻辑生成包含发送者和清洗后正文的事件 | `tests/test_message_normalization.py` |

## 注意看

> **注意看：** 事件不是审核结论。它是审核结论的输入。如果你把事件字段改坏，规则代码可能还能运行，但读到的证据已经变了。

## 源码定位

- 已确认：`src/messages/normalize.py`
- 已确认：`src/messages/schema.py`
- 已确认：`tests/test_message_normalization.py`

## 改动风险

| 如果你改 | 可能坏在哪里 | 验证方法 |
| --- | --- | --- |
| 事件字段名 | 规则代码读不到字段 | `pytest tests/test_policy.py -q` |
| 正文清洗规则 | 原本应该触发审核的文本不再触发 | `pytest tests/test_policy.py -q` |
| 渠道字段 | 路由或分渠道规则可能判断错误 | `pytest tests/test_routing.py -q` |

## 验证方法

```bash
pytest tests/test_message_normalization.py tests/test_policy.py -q
```

如果只改 schema，不改规则，至少也要跑审核测试。事件是规则的输入，schema 变化通常不会只停留在输入层。
````

## Teaching Pass Example

Use this as an internal checklist, or render it when it helps future maintainers.

| Reader moment | Plain concept | Optional concept page | Exact lookup | Verification |
| --- | --- | --- | --- | --- |
| User runs/imports/calls ... | How a run starts | `modules/entrypoint.md` if the walkthrough gets dense | `references/commands.md` | `...` |
| System parses ... | How input becomes usable state | `modules/data-shape.md` if this concept needs explanation | `references/schema.md` | `...` |
| System writes ... | What artifact the reader can inspect | `modules/output.md` if output behavior is non-obvious | `references/artifacts.md` | `...` |

## Markdown Display Anti-Patterns

- Starting with `src/a.py`, `src/b.py`, and `src/c.py` before the reader knows the behavior.
- Introducing several function names before the page explains the concept they serve.
- Hiding the main walkthrough step inside `<details>`.
- Drawing a Mermaid diagram without prose that tells the reader what to notice.
- Using a table for every paragraph until the page stops reading like a lesson.
- Filling space with broad claims such as "this is powerful" without source evidence.

## Relationship Map Trigger Example

Create `flows.md` only when the reader needs to compare several paths or states:

- startup flow vs request flow
- success path vs failure path
- authoring path vs evaluation path
- state before feedback vs state after feedback

Do not create `flows.md` when `one-real-run.md` already explains the only meaningful path.
