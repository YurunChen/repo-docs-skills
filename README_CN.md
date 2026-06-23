<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs:
  </h1>
  <h3>让项目理解跟上 agent 写代码的速度。</h3>
</div>

<p align="center">
  每次 agent 会话改变的不只是代码。Repo-Docs 把决策、进度、未知项和下一步留在仓库里。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## 最新更新

> 新版默认输出到根目录 `project-guide/`，支持中文 guide，也支持空项目的 Seed 模式。
> 如果 Repo-Docs 帮你少一次上下文重读，欢迎给这个项目一个 star 🌟。

## Repo-Docs 是什么？

`repo-docs` 是一个轻量的 agent skill，用来在项目推进时同步维护项目理解。你提问、改代码、规划下一步、交接给另一个 agent 时，它会把这次会话里有价值的上下文写成 Markdown，放回仓库。

它解决的是一个很现实的问题：vibe coding 很快，但项目理解很容易跟不上。Repo-Docs 记录改了什么、为什么改、还有什么没确认、下一个 agent 应该从哪里继续。

## 为什么需要它？

| 没有 `repo-docs` | 使用 `repo-docs` |
| --- | --- |
| 决策散落在聊天记录里 | 决策留在仓库里 |
| 新 agent 每次从零读项目 | 新 agent 从 `project-guide/` 接手 |
| 进度靠人回忆 | 进度记录在 `change-log.md` |
| 计划和事实混在一起 | 计划、决定、已实现、未确认分开 |
| 交接需要长篇解释 | 交接指向文档、规则和当前文件 |

## 核心能力

| 它维护 | 你能看到 |
| --- | --- |
| 项目 guide | 这个 repo 是什么、怎么运转、应该改哪里 |
| 进度记录 | 改了什么、为什么改、怎么验证 |
| 变更地图 | 下一步做什么、相关文件、风险和检查 |
| agent 规则 | 下一个 coding agent 不能忘的项目规则 |
| 空项目 guide | 还没代码时，先记录目标、决策、计划和未知项 |
| 中文 guide | 通过 `repo-docs-zh` 生成自然中文文档 |

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
Use repo-docs-zh to rebuild this repo's project guide.
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
Use repo-docs-zh. Read the current docs and source, then update the guide after
this refactor. Record what changed in change-log.md.
```

```text
Use repo-docs for this empty project. Create a seed guide that separates
Implemented, Decided, Planned, and Unknown items.
```

```text
Prepare this repo for handoff. Sync README.md, project-guide/, AGENTS.md,
and memory pointers so the next agent can continue.
```

## 输出结构

默认输出：

```text
project-guide/
  README.md
  glossary.md
  flows.md
  change-map.md
  change-log.md
  modules/
  references/
```

空项目会更轻量：

```text
project-guide/
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

如果 Repo-Docs 让你的下一次 agent 会话更容易继续，欢迎给这个 repo 一个 star 🌟。

---

<div align="center">
  <p><strong>Repo-Docs:</strong> 让项目理解跟上 agent 写代码的速度。</p>
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><em>感谢访问 Repo-Docs。</em></p>
  <img src="https://visitor-badge.laobi.icu/badge?page_id=YurunChen.Repo-Docs" alt="visitors" />
</div>
