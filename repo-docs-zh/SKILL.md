---
name: repo-docs-zh
description: Generate and maintain repo-docs with Chinese as the primary reader language while preserving source identifiers for lookup. Use when the user asks for Chinese repo docs, mentions repo-docs-zh, wants repo documentation in Chinese, or wants an existing repo-docs package localized for Chinese readers.
---

# Repo-Docs ZH

## Position

This is the Chinese-language overlay for `repo-docs`. Structure, page ownership, evidence rules, sync behavior, and validation come from `../repo-docs/SKILL.md`. This overlay only changes language and Chinese reader experience.

Before acting, read:

1. `../repo-docs/SKILL.md`
2. `../repo-docs/REFERENCE.md` as the topic router only when detailed rules are needed
3. The routed topic file only when needed
4. `../repo-docs/EXAMPLES.md` only for output shape or tone examples needed by the task

## Core Principle

Chinese repo-docs are not English docs translated line by line. They should rebuild the reader's conceptual handles in Chinese.

Chinese carries understanding: what this thing is, why it exists, what happens, and how to check it. English identifiers carry lookup: paths, commands, fields, API names, class/function names, metric names, package names, and dataset names.

## Language Rules

- Use Chinese for titles, explanations, reading paths, examples, caveats, and change-log entries.
- Keep source identifiers exact. Do not translate paths, commands, keys, API names, class/function names, metric names, error strings, package names, or dataset names.
- First introduce repeated project terms as `中文名（English term）` or `中文名（source identifier）`; later prefer the Chinese name.
- README route sections use `## 阅读路径`, not `## Reader Routes`.
- Glossary columns are exactly `术语 | 项目里的意思 | 延伸阅读`.
- Narrative page evidence note: `证据状态：除特别标注外，本页基于当前源码已确认。`

## Chinese Handles And Source Locators

Use a Chinese reader handle before a source locator.

| Type | Use in Chinese docs |
| --- | --- |
| 读者句柄 | The narrative subject, such as “导入流程”, “会话层”, “结果汇总”, “运行脚本”. |
| 源码定位符 | Paths, functions, classes, fields, commands, artifact paths. Link directly with a Chinese label when one locator supports one claim. |
| 精确查表名 | Metrics, schema keys, tool parameters, artifact file names. Usually belongs in `references/`. |
| 外部术语 | Terms like benchmark, agent, workspace, protocol, memory. First mention gets a Chinese handle; later prefer Chinese when the term appears in the inspected repo. |

Default locator rule:

- Prefer a Chinese visible label that links to the source file over showing the raw path as visible text.
- Use inline code only for short identifiers that matter to the mechanism.
- Create `references/source-map.md` only when many related source locations repeat across pages or need one lookup table.
- Never make a long path the visible link text in narrative prose.

Good:

- 运行脚本负责选择运行模式和输入来源。
- 会话层先取上下文，再记录本轮真实产生的输出。
- 汇总器从最终状态读取完成情况和错误原因。

Bad:

- `packages/app/scripts/run_example.sh` 是入口。
- `Session.run_task(...)` handles context and scheduled observations.
- `ResultCollector.collect(...)` records output status.

## Readability Rules

- A paragraph should still make sense after removing backticked identifiers. If not, rewrite around Chinese actions first.
- Lower code-name density by changing explanation order, not by hiding evidence.
- Give the reader a concrete handle first: a user action, visible state change, plain concept, or question they already have.
- 中文技术文档的真人感是具体、直接、敢标未确认；不要为了“有灵魂”加入第一人称、金句或情绪化评价。
- 成稿前做一次去 AI 表达：删掉“此外”“值得注意”“至关重要”“关键作用”“彰显”等空转词，少用破折号和粗体小标题。
- 避免让“不仅……而且……”或“不是……而是……”承担主解释；改成正面机制句。
- Put dense fields, command lists, schemas, artifacts, and metrics in `references/`.
- Flowcharts support prose; they do not replace it.
- A walkthrough step links to the module where a durable concept first matters.

## Page Shape Notes

- README: Chinese opening prose plus links to walkthroughs, references, and glossary. Add `## 阅读路径` only when multiple goals need a table.
- Walkthrough: numbered `## Step N: 行为名` headings; prose explains mechanism; verification appears once near the end.
- Module: keep `## 白话模型`, `## 代码模型`, `## 接下去阅读`.
- Reference: lookup table only; if it starts explaining why behavior exists, move that explanation to a walkthrough or module.

## Build Delivery

After first build, reply in Chinese with:

1. what readers can now understand or follow;
2. where to start: `repo-docs/README.md` -> main walkthrough;
3. key pages and their jobs;
4. scope, uncovered areas, validator result, and root agent-file status.

Keep the reply short. Durable guide history belongs in `repo-docs/change-log.md`.
