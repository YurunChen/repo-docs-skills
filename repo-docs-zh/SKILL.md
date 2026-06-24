---
name: repo-docs-zh
description: Use when the user asks for repo-docs in Chinese, mentions repo-docs-zh, wants Chinese project documentation, or wants repo docs maintained with Chinese as the primary language.
---

# Repo-Docs ZH

## 定位

`repo-docs` 的中文语言覆盖层。结构、页面设计、证据、同步、输出形态均以基座 skill 为准；本文件只规定中文表达与中文读者体验。

行动前读基座（同级安装）：

1. `../repo-docs/SKILL.md` — 核心思想、**Content Organization**、模式、构建顺序、**Page Design**、证据、验证
2. `../repo-docs/REFERENCE.md` — 各页面细则、同步、质量条（内容组织与页面设计以 SKILL 为准）
3. `../repo-docs/EXAMPLES.md` — 默认成稿形态与语气样例

内容组织与页面设计**只在** `../repo-docs/SKILL.md` 定义。本文件只规定中文表达。

## 中文语言规则

- 标题、解释、阅读路径、例子、注意事项和 change-log 条目使用中文。
- 源码标识保持原样：路径、命令、配置键、API 名、类/函数名、指标名、协议字段、错误字符串、包名和数据集名。
- 只有中文可能遮住代码概念时，才加括号源术语，例如 `执行入口 (entrypoint)`。
- 默认单一中文文档包；多 walkthrough 或复杂路由时再考虑 `## Reader Routes` 表。
- 用户要求删除 repo docs 时，删除文档包和根 `AGENTS.md` / `CLAUDE.md` 中仍指向它的规则；同一轮不自动重建，除非用户明确要求。

## 中文可读性

目标：可读、连贯、有机制判断——不是更短，也不是模板填空。

- 参考 Karpathy / Kaiming He 式表达：简单、直接、有观察、有边界。
- 参考 Anthropic harness 博客：现象 → 设计原因 → 机制 → 结果 → 验证或局限；每段只推进一个因果节点。
- 先动作后抽象；判断后跟观察；术语前先给抓手。
- 路径、函数、测试命令写进正文句子，少用 `**源码定位。**` `**验证方法。**` 行内标签。
- 路由链接放在 walkthrough 开场、收尾，或新概念首次出现处——不要每个 `##` 阶段都重复。

展示增量（包层级与节拍见基座 Content Organization）：

- README：开场白话 + 文内链到 walkthrough、change-map、references；复杂项目可加 `## Reader Routes` 表。
- walkthrough：`## [行为名]`（不必写 `Step N`），段落承载机制，页末一次验证命令。
- module：白话 + 代码模型（结构、API、snippet）写进 prose；改动链到 [change-map.md](../change-map.md)。

## 中文证据规则

继承基座 [Evidence Rules](../repo-docs/SKILL.md#evidence-rules)：`已确认 / 推断 / 计划中 / 未确认`；外部来源用 `推断（外部来源：…）`。

- 叙事页在**页末**写一行：`证据状态：除特别标注外，本页基于当前源码已确认。`
- 证据标签服务信任，不充当正文目录；局部只在置信度变化时标注。
- 未实际检查过的路径、字段、命令、产物、测试不能写成证据；与旧文档冲突时以当前代码/数据为准并写 caveat。

## 输出与验证

默认输出：`repo-docs/` Markdown 包（结构见基座 SKILL Output Shape）。

完成前运行 `python scripts/validate_repo_docs.py <path-to-repo-docs>`：结构、链接、模板化碎裂标题、重复行内标签、`flows.md` 误用、证据说法。
