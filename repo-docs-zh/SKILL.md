---
name: repo-docs-zh
description: Use when the user asks for repo-docs in Chinese, mentions repo-docs-zh, wants Chinese project documentation, or wants repo docs maintained with Chinese as the primary language.
---

# Repo-Docs ZH

## 定位

`repo-docs` 的中文语言覆盖层。结构、页面设计、证据、同步、输出形态均以基座 skill 为准；本文件只规定中文表达与中文读者体验。

行动前读基座（同级安装）：

1. `../repo-docs/SKILL.md` — 核心思想、**Content Organization**、**Understanding sync**、模式、构建顺序、**Page Design**、证据、验证
2. `../repo-docs/REFERENCE.md` — 各页面细则、同步、质量条（内容组织与页面设计以 SKILL 为准）
3. `../repo-docs/EXAMPLES.md` — 默认成稿形态与语气样例

内容组织与页面设计**只在** `../repo-docs/SKILL.md` 定义。本文件只规定中文表达。

## 中文语言规则

- 标题、解释、阅读路径、例子、注意事项和 change-log 条目使用中文。
- 源码标识保持原样：路径、命令、配置键、API 名、类/函数名、指标名、协议字段、错误字符串、包名和数据集名。
- 只有中文可能遮住代码概念时，才加括号源术语，例如 `执行入口 (entrypoint)`。
- 默认单一中文文档包；多 walkthrough 或复杂路由时再考虑 `## Reader Routes` 表。
- 用户要求删除 repo docs 时，删除文档包和根 `AGENTS.md` / `CLAUDE.md` 中仍指向它的规则；同一轮不自动重建，除非用户明确要求。
- 创建或实质性更新 `repo-docs/` 后：若仓库根目录没有 `AGENTS.md`、`CLAUDE.md` 等等价 agent 说明文件，**在根目录创建 `AGENTS.md`**；若已有则只增补简短的 repo-docs 维护块。

## 中文可读性

目标：可读、连贯、有机制判断——不是更短，也不是模板填空。

- 参考 Karpathy / Kaiming He 式表达：简单、直接、有观察、有边界。
- 参考 Anthropic harness 博客：现象 → 设计原因 → 机制 → 结果 → 验证或局限；每段只推进一个因果节点。
- 先动作后抽象；判断后跟观察；术语前先给抓手。
- 路径、函数、测试命令写进正文句子，少用 `**源码定位。**` `**验证方法。**` 行内标签。
- 流程图服务理解，不替代叙事：见基座 [Flowcharts when understanding needs them](../repo-docs/SKILL.md#flowcharts-when-understanding-needs-them)。
- 术语表仅三列：`Term | Plain meaning | Further reading`。代码指代、易混说法写进 Plain meaning；通用大概念最多一条 `推断（外部来源：URL）`，否则填 `—`；机制放 module。
- walkthrough 某一阶段引入持久概念时，在**该阶段正文**链到对应 `modules/<concept>.md`；`references/`、`glossary.md` 在首次需要时出现。

展示增量（包层级与节拍见基座 Content Organization）：

- README：开场白话 + 文内链到 walkthrough、references、glossary；复杂项目可加 `## Reader Routes` 表。
- walkthrough：`## [行为名]`，段落承载机制；多阶段、分支或状态交接单靠 prose 难跟住时，可在该段落后加**小流程图**（Mermaid 或简短 ASCII），先有白话模型再上图；概念在哪个阶段出现，就在该阶段链到对应 module；页末一次验证命令。
- module：白话 + 代码模型（结构、API、snippet）写进 prose；若改动顺序影响理解，在同段用一句 caveat 说明原因。

## 理解同步（Understanding sync）

文档维护嵌在**用户 ↔ coding agent 的对话过程**里：每轮根据交互判断 guide 是否过时、是否存在稳定理解缺口，需要则**当轮**最小补丁，不等到单独的「同步文档」任务。

代码变更与用户提问共用基座 [Understanding sync](../repo-docs/SKILL.md#understanding-sync)：

- 核心问题：**今天读 guide 的读者会在哪里误解？**
- 稳定缺口 → 最小补丁到对应 narrative 页；`change-log.md` 记 `同步至 <sha>`（有 git 时）
- 一次性调试 / 个人偏好 → 默认只答 chat
- 同类理解问题再次出现 → 视为稳定缺口，当轮落盘

完成前运行 `python scripts/validate_repo_docs.py <path-to-repo-docs> --repo-root <repo-root>`：结构、链接、同步锚点、术语表、锚点后源码变更提示等。

## 中文证据规则

继承基座 [Evidence Rules](../repo-docs/SKILL.md#evidence-rules)：`已确认 / 推断 / 计划中 / 未确认`；外部来源用 `推断（外部来源：…）`。

- 叙事页在**页末**写一行：`证据状态：除特别标注外，本页基于当前源码已确认。`
- 证据标签服务信任，不充当正文目录；局部只在置信度变化时标注。
- 未实际检查过的路径、字段、命令、产物、测试不能写成证据；与旧文档冲突时以当前代码/数据为准并写 caveat。

## 输出与验证

默认输出：`repo-docs/` Markdown 包（结构见基座 SKILL Output Shape）。验证见上文「理解同步」与基座 Verification。

## Build 交付说明

**Build** 或首次创建文档包后，用短 prose 向用户交付（约 8–15 行），详见基座 [Build delivery](../repo-docs/SKILL.md#build-delivery) 与 [EXAMPLES Build delivery example](../repo-docs/EXAMPLES.md#build-delivery-example)：

1. 读者现在能做什么  
2. 从哪读起：`repo-docs/README.md` → 主 walkthrough  
3. 包里关键文件各管什么（路径 + 半句，不抄正文）  
4. 范围、未覆盖项、validator / `AGENTS.md` 状态  

小/Lite 包用列表；module/reference 多时可加窄表（文件 / 何时用 / 先读什么）。扩大范围的 sync / handoff / milestone 收尾用 REFERENCE Closeout summary，不用 Build 交付形态。
