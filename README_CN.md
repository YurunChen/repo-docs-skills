<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs:
  </h1>
  <h3>让项目理解跟上 agent 写代码的速度。</h3>
</div>

<p align="center">
  把 coding-agent 对话沉淀成持续维护的项目文档、进度记录、变更地图和交接上下文。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## Repo-Docs 是什么？

`repo-docs` 是一个 coding-agent skill，用来在项目开发过程中持续维护项目理解。用户提问、agent 修改代码、阶段性任务完成、项目交接发生时，`repo-docs` 会让 agent 同步更新项目 guide、`change-log.md`、`change-map.md` 和根目录 agent 规则。

它解决的是 vibe coding 带来的项目理解缺口：代码、脚本、prompt、配置和实验可以在一次会话里快速变化，但为什么这样设计、哪些决策已经确定、哪些风险需要验证，常常只留在聊天记录里。`repo-docs` 把这些内容变成后续人类和 agent 都能继续使用的 Markdown 文档。

## 为什么需要它？

| 没有 `repo-docs` | 使用 `repo-docs` |
| --- | --- |
| 决策散落在聊天记录里 | 决策进入项目文档 |
| 新 agent 每次重新读项目 | 新 agent 从 guide 接手 |
| 进度靠人记 | 进度记录在 `change-log.md` |
| 计划和已实现混在一起 | `Planned`、`Decided`、`Implemented`、`Unknown` 分开 |
| 交接依赖口头说明 | 交接依赖 docs、`AGENTS.md` 和源码证据 |

## 核心能力

| 能力 | 维护什么 |
| --- | --- |
| 项目记忆 | 当前项目目标、工作流、契约和 caveat |
| 进度记录 | 在 `change-log.md` 记录重要变更、验证和结果 |
| 变更地图 | 在 `change-map.md` 维护下一步修改、相关文件、风险和检查 |
| agent 连续性 | 在 `AGENTS.md` / `CLAUDE.md` 记录下一个 agent 必须知道的规则 |
| 空项目支持 | 项目还没有代码时，先记录目标、决策、计划和未知项 |
| 中文 guide | 通过 `repo-docs-zh` 生成中文项目文档，同时保留源码标识 |

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
Prepare this repo for handoff. Sync README.md, docs/project-guide/, AGENTS.md,
and memory pointers so the next agent can continue.
```

## 输出结构

默认输出：

```text
docs/project-guide/
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
docs/project-guide/
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

如果 `repo-docs` 能让你的 agent 项目留下更干净的项目记忆，欢迎 star 这个 repo。

---

<div align="center">
  <p><strong>Repo-Docs:</strong> 让项目理解跟上 agent 写代码的速度。</p>
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><em>感谢访问 Repo-Docs。</em></p>
  <img src="https://visitor-badge.laobi.icu/badge?page_id=YurunChen.Repo-Docs" alt="visitors" />
</div>
