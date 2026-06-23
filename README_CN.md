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

> 新版以真实 walkthrough 为入口，默认输出到根目录 `repo-docs/`，支持中文文档，也支持空项目的 Seed 模式。
> 如果 Repo-Docs 帮你跟上 agent 写出来的项目，欢迎给这个项目一个 star 🌟。

## Repo-Docs 是什么？

Vibe coding 让代码出现得很快。文件变了，决策变了，下一步也变了；但为什么这么改、哪些已经确定、哪些只是计划，常常还留在聊天记录里。几轮会话之后，项目还能跑，用户却不一定还能完整说清它为什么长成这样。

`repo-docs` 做的事很简单：降低用户和 vibe coding 代码之间的理解差距。它让 coding agent 在工作过程中持续维护 `repo-docs/` 文档，并先从一条真实 walkthrough 讲起：用户能观察到什么，代码、数据和状态怎么走，改了什么，为什么改，什么已经决定，什么只是计划，什么还没验证。

## 为什么需要它？

| 没有 `repo-docs` | 使用 `repo-docs` |
| --- | --- |
| 代码变得比你理解得更快 | 解释贴着代码留在仓库里 |
| 决策散落在聊天记录里 | 决策留在仓库里 |
| 进度靠人回忆 | 里程碑记录在 `change-log.md` |
| 计划和事实混在一起 | 计划、决定、已实现、未确认分开 |
| 再回到项目时要重新读一遍 | `repo-docs/` 告诉你当前项目状态 |

## 它如何缩小理解差距

| 当项目变成这样 | Repo-Docs 留下什么 |
| --- | --- |
| 你看得到文件，但看不到它们怎么连起来 | 从可观察入口到输出的真实 walkthrough |
| 你知道代码变了，但不知道为什么变 | 带有决策、原因和验证的进度记录 |
| 计划、决定和已实现事实混在一起 | 已决定、计划中、已实现、未确认的清晰状态 |
| 你想继续做，但不知道该碰哪里 | 对应文件、风险和检查方式的 change map |

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
请为这个项目创建中文 repo docs。
```

## 工作模式

| 模式 | 适用场景 | 输出重点 |
| --- | --- | --- |
| Seed | 项目刚开始或几乎没有代码 | 目标、决策、计划、未知项 |
| Build | 项目需要第一版 repo docs | 一条真实 walkthrough、模块地图、关键契约 |
| Sync | 代码、文档、数据、脚本或实验变了 | 当前文档和源码事实同步 |
| Question refinement | 一个问题暴露文档缺口 | 先补文档，再基于证据回答 |

## 示例 Prompt

项目第一次建立文档时，可以明确调用一次：

```text
使用 repo-docs skill 为这个项目创建文档。
```

之后正常对话即可。coding agent 应该在代码变化、架构问题、说明过期或阶段交接
时自行判断是否需要同步 `repo-docs/`、`change-log.md`、`change-map.md` 和
项目里的 agent 规则文件。

## 输出结构

默认输出是生成在 `repo-docs/` 目录下的 Markdown 文档包：

```text
repo-docs/
  README.md
  walkthroughs/
    one-real-run.md      # 非 Seed 项目默认需要
  glossary.md
  flows.md              # 可选，用于多路径/多状态总图
  change-map.md
  change-log.md
  modules/
  references/
```

空项目生成的文档会更轻量：

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

好的 `repo-docs/` 文档应该在会话结束后仍然有用。新读者应该能通过它理解项目目标，从一个可观察入口追踪到输出或产物，识别关键契约，并知道下一步改哪里、怎么验证。

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
