<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs:
  </h1>
  <h3>让你跟得上 agent 写出来的代码。</h3>
</div>

<p align="center">
  Vibe coding 让项目长得很快。Repo-Docs 把解释、决策、进度和下一步放回仓库，贴着代码一起走。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## 最新更新

> 新版默认输出到根目录 `repo-docs/`，支持中文 guide，也支持空项目的 Seed 模式。
> 如果 Repo-Docs 帮你跟上 agent 写出来的项目，欢迎给这个项目一个 star 🌟。

## Repo-Docs 是什么？

Vibe coding 让代码出现得很快。文件变了，决策变了，下一步也变了；但为什么这么改、哪些已经确定、哪些只是计划，常常还留在聊天记录里。几轮会话之后，项目还能跑，用户却不一定还能完整说清它为什么长成这样。

`repo-docs` 做的事很简单：降低用户和 vibe coding 代码之间的理解差距。它让 coding agent 在工作过程中持续维护项目 guide，记录改了什么、为什么改、什么已经决定、什么只是计划、什么还没验证。

## 为什么需要它？

| 没有 `repo-docs` | 使用 `repo-docs` |
| --- | --- |
| 代码变得比你理解得更快 | 解释贴着代码留在仓库里 |
| 决策散落在聊天记录里 | 决策留在仓库里 |
| 进度靠人回忆 | 里程碑记录在 `change-log.md` |
| 计划和事实混在一起 | 计划、决定、已实现、未确认分开 |
| 再回到项目时要重新读一遍 | `repo-docs/` 告诉你当前项目状态 |

## 核心能力

| 它维护 | 你可以 |
| --- | --- |
| 项目 guide | 看懂这个 repo 现在是什么、怎么运转 |
| 进度记录 | 看到改了什么、为什么改 |
| 变更地图 | 知道下一步做什么、怎么检查 |
| agent 规则 | 让后续 coding 会话沿着同一条线走 |
| 空项目 guide | 在代码出现前先写下目标和计划 |
| 中文 guide | 通过 `repo-docs-zh` 用自然中文理解项目 |

## 快速开始

### 自然语言安装

把项目链接交给你的 coding agent：

```text
Install the repo-docs skill from this project:
https://github.com/YurunChen/Repo-Docs

Make both repo-docs and repo-docs-zh available in my agent skill directory.
```

### 命令安装

在项目目录下执行：

```bash
mkdir -p ~/.agents/skills/repo-docs
cp SKILL.md REFERENCE.md EXAMPLES.md ~/.agents/skills/repo-docs/
mkdir -p ~/.agents/skills/repo-docs-zh
cp repo-docs-zh/SKILL.md ~/.agents/skills/repo-docs-zh/SKILL.md
```

安装后可以这样使用：

```text
请用中文重建这个项目的 project guide。
```

## 工作模式

| 模式 | 适用场景 | 输出重点 |
| --- | --- | --- |
| Seed | 项目刚开始或几乎没有代码 | 目标、决策、计划、未知项 |
| Build | 项目需要第一版 guide | 主工作流、模块地图、关键契约 |
| Sync | 代码、文档、数据、脚本或实验变了 | 当前文档和源码事实同步 |
| Question refinement | 一个问题暴露 guide 缺口 | 先补文档，再基于证据回答 |

## 示例 Prompt

```text
请阅读当前文档和源码，在这次重构后更新 guide，并把变化记录到 change-log.md。
```

```text
这是一个刚开始的空项目。请创建 seed guide，并区分已实现事实、已决定事项、
计划工作和未知项。
```

```text
我想继续做这个项目，但不想重新读一遍所有代码。请把 README.md、repo-docs/、
AGENTS.md 和必要的记忆指针对齐到当前项目状态。
```

## 输出结构

默认输出是生成在 `repo-docs/` 目录下的 Markdown guide：

```text
repo-docs/
  README.md
  glossary.md
  flows.md
  change-map.md
  change-log.md
  modules/
  references/
```

空项目生成的 guide 会更轻量：

```text
repo-docs/
  README.md
  change-map.md
  change-log.md
  glossary.md                 # optional
  references/
    decisions.md              # optional
```

## 质量标准

好的 `repo-docs` guide 应该在会话结束后仍然有用。新读者应该能通过它理解项目目标、复现一条真实工作流、识别关键契约，并知道下一步改哪里、怎么验证。

重要结论需要标明可信度：

- `Confirmed`：有源码、测试、配置、数据、文档或产物支撑
- `Inferred`：由附近证据推断，并明确标记为推断
- `Unknown` / `未确认`：尚未验证

## 致谢

- [codebase-to-course](https://github.com/zarazhangrui/codebase-to-course)
- [neat-freak](https://github.com/KKKKhazix/khazix-skills)

## 支持

如果 Repo-Docs 帮你跟上 agent 写出来的代码，欢迎给这个 repo 一个 star 🌟。

---

<div align="center">
  <p><strong>Repo-Docs:</strong> 让你跟得上 agent 写出来的代码。</p>
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><em>感谢访问 Repo-Docs。</em></p>
  <img src="https://visitor-badge.laobi.icu/badge?page_id=YurunChen.Repo-Docs" alt="visitors" />
</div>
