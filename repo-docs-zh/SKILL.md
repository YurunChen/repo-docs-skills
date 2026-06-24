---
name: repo-docs-zh
description: Use when the user asks for repo-docs in Chinese, mentions repo-docs-zh, wants Chinese project documentation, or wants repo docs maintained with Chinese as the primary language.
---

# Repo-Docs ZH

## 定位

这是 `repo-docs` 的中文语言覆盖层。结构判断、证据规则、同步规则和 `repo-docs/` 输出形态继承基座 skill；本文件只收紧中文表达、中文证据披露和中文读者体验。

中文 repo docs 的目标是让用户自然、方便、可靠地理解一个正在变化的项目。它不是源码摘要，也不是文件索引；它是一条从用户意图到代码信心的理解梯度。

行动前先读基座 skill（与本覆盖层同级安装，路径相对本文件）：

1. `../repo-docs/SKILL.md`
2. 需要模板、页面细节或特殊案例时，读 `../repo-docs/REFERENCE.md`
3. 需要输出样例时，读 `../repo-docs/EXAMPLES.md`

## 中文语言规则

- 标题、解释、阅读路径、例子、注意事项和 change-log 条目使用中文。
- 源码标识保持原样：路径、命令、配置键、API 名、类/函数名、指标名、协议字段、错误字符串、包名和数据集名。
- 只有中文翻译可能遮住代码概念时，才加括号里的源术语，例如 `执行入口 (entrypoint)`。
- 默认保持单一中文文档包；不要生成中英双份文档树，除非用户明确要求。
- 用户要求删除当前项目的 repo docs 时，删除文档包和根 `AGENTS.md` / `CLAUDE.md` 中仍指向它的规则；不要在同一轮重新生成替代文档，除非用户明确要求。

## 中文理解路径

中文文档要按读者建模顺序讲：

```text
用户意图 -> 项目问题 -> 白话概念 -> 可观察行为 -> 真实例子 -> 源码定位 -> reference 契约 -> 安全改动路径
```

先让读者知道行为和概念，再逐步引入函数名、字段名、路径名。README 和 walkthrough 开头控制代码名词密度；module 页用一个概念、一个真实例子、少量源码定位、改动风险和验证方法降低理解成本；reference 才承担高密度查表。

## 中文可读性规则

中文 repo docs 以可读性为第一要义。先帮读者形成心智模型，再逐步引入源码定位。不要为了完整结构生成单独的项目理解页；项目为什么这样设计，应在 README、walkthrough 和相关 module 页面里用短段落自然解释。

中文写作要像有经验的维护者在带新人读代码。每句话都给出具体 claim、观察、风险、证据或过渡，避免大空话和泛泛评价。少用破折号、引号和装饰性强调；少用“不是……而是……”这类低信息量对比句，直接写清正向判断。风格保持干净、流畅、准确。

## 中文 Markdown 教学展示

完整展示协议见基座 `../repo-docs/REFERENCE.md`。中文增量只在标题词和提示块：

- 标题使用读者状态中文词：`你正在看什么`、`白话模型`、`注意看`、`源码定位`、`验证方法`。
- 引用块提示关键观察：`> **注意看：** ...`。

## 中文证据规则

证据规则继承基座的统一标签家族（见 `../repo-docs/SKILL.md` 的 Evidence Rules）：所有页面使用同一套状态词 `已确认 / 推断 / 计划中 / 未确认`；支撑来自仓库外的外部材料时，保留置信度标签并内联注明来源，例如 `推断（外部来源：…）`。

中文表达增量：

- 没有实际读过的文件、字段、命令、产物、指标、工具参数或测试，不能写成证据。
- 当前代码/数据和旧文档、记忆或用户印象冲突时，以当前代码/数据为准，并在相关位置写 caveat。
- 不伪造样例数据、task id、函数名、输出文件、指标分母或 schema 字段。需要示例时，使用真实项目证据，或明确标为“占位示例”。

## 页面规则

- README：用中文回答项目是什么、为什么存在、先读哪条 walkthrough、按什么目标继续读。
- walkthrough：沿真实命令、请求、任务、失败或数据路径走到底；每一步说明接收什么、改变什么、交给谁、源码在哪里。
- modules：从读者困惑和 walkthrough 中出现的位置开始，用白话模型解释概念、给真实例子、提示读者注意什么、再给源码定位、风险和验证。一个 module 页只解决一个稳定理解问题，避免堆文件名。
- references：只做字段、命令、schema、artifact、工具参数、指标等查表；不要承担主教学路径。
- `flows.md`：只在多路径、多阶段、多状态关系需要总图时使用，不能把 `one-real-run.md` 重写一遍。
- `change-map.md`：把未来改动目标映射到概念页、reference、风险和验证。
- `change-log.md`：标准文件，只记录有意义的代码、文档、数据、实验或项目理解变化。

## 输出

默认输出仍是基座 `repo-docs` 的 Markdown 文档包，位置是 `repo-docs/`。非 Seed 项目标准结构包含 `README.md`、`walkthroughs/one-real-run.md`、`modules/`、`references/`、`glossary.md`、`change-map.md` 和 `change-log.md`。

完成前运行或等价执行基座验证：检查链接、标准结构、教学检查、Markdown 展示策略、`flows.md` 触发条件，以及 code/data claim 是否有证据。
