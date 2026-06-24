<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs
  </h1>
  <h3>让你跟得上 agent 写出来的代码。</h3>
</div>

<p align="center">
  Repo-Docs 用人话解释快速变化的仓库，然后把读者带到源码。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## Repo-Docs 是什么？

Vibe coding 会让代码变化得很快，用户的项目理解容易跟不上。`repo-docs` 是一个 Codex skill，用来把这个理解补回来。它先抓住仓库里一条真实行为，用正常技术语言讲清楚想法，再给出源码位置、契约、风险和验证方法。

默认产物是 `repo-docs/` 里的 Markdown 文档。HTML 或课程式材料不是默认输出。

## 当前契约

| 原则 | 含义 |
| --- | --- |
| walkthrough first | 从一条真实行为开始，不从目录树开始。 |
| 连贯页面设计 | 连续 prose；标题标记真实转折；每个事实有唯一归属——见 SKILL Content Organization 与 Page Design。 |
| module 代码模型 | 概念页讲结构、API 用法与来自已检查源码的短示例——见 SKILL Content Organization。 |
| 先讲机制 | README 和 walkthrough 先讲发生了什么，再引入密集源码名词。 |
| 具体工程表达 | 用具体动作、观察、检查和边界替代泛泛判断。 |
| reference 承担密度 | 字段、命令、schema、artifact、metric、工具参数放进 `references/`。 |
| 安静证据 | 源码事实可查；叙事页在**页末**写页面级默认状态，仅局部标注置信度变化。 |
| 有用导航 | 链接文字说清读者下一步会理解什么，而不是只给文件名。 |

## 输出结构

非 Seed 项目标准结构：

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

Seed 项目在真实运行证据出现前，只写状态化项目记忆：

```text
repo-docs/
  README.md
  change-map.md
  change-log.md
  glossary.md
  references/
    decisions.md
```

小型或单一用途的仓库可以用 Lite 结构（README、一条 walkthrough、change-map、change-log），等到出现需要解释的概念或查表时，再补 `modules/`、`references/` 和 `glossary.md`。

## Explanation Model

读者先理解行为，再接触代码名词。叙事页连贯可读，标题在帮助导航时出现。**内容组织逻辑**（读者收获、包层级、叙事节拍）以 [SKILL.md](SKILL.md) Content Organization 为准；页面形态与归属以 [SKILL.md](SKILL.md) Page Design 为准。

文档的真实感来自它说清仓库实际做了什么：脚本读配置，runner 启动会话，checker 抓住缺失字段，测试覆盖一个分支但漏掉另一个分支。完整规则见 [SKILL.md](SKILL.md) 和 [REFERENCE.md](REFERENCE.md)。

## 工作模式

| 模式 | 适用场景 | 输出重点 |
| --- | --- | --- |
| Seed | 项目刚开始或几乎没有代码 | 目标、决策、计划、未知项 |
| Build | 项目需要第一版 repo docs | 真实 walkthrough、可读心智模型、概念页、references |
| Sync | 代码、文档、数据、脚本或实验变了 | 当前文档和源码实际表现同步 |
| Cleanup / removal | 用户要求删除生成文档 | 删除文档和过期根规则 |
| Question refinement | 一个问题暴露稳定文档缺口 | 先补可复用文档，再基于证据回答 |

## 安装

```bash
mkdir -p ~/.agents/skills/repo-docs
cp SKILL.md REFERENCE.md EXAMPLES.md ~/.agents/skills/repo-docs/
mkdir -p ~/.agents/skills/repo-docs/scripts
cp scripts/validate_repo_docs.py ~/.agents/skills/repo-docs/scripts/
mkdir -p ~/.agents/skills/repo-docs-zh
cp repo-docs-zh/SKILL.md ~/.agents/skills/repo-docs-zh/SKILL.md
```

使用：

```text
使用 repo-docs-zh skill 为这个项目创建中文 repo docs。
```

## 验证

本包包含一个轻量验证脚本：

```bash
python scripts/validate_repo_docs.py /path/to/repo-docs
```

它检查标准结构、本地链接、路由、模板化碎裂标题、重复收尾小节、阅读路径提示、change-map 验证语言、置信标签噪声、reference 漂移、`flows.md` 误用与导航气味。用 `--lite` 校验小仓库结构，用 `--seed` 校验 Seed 结构，用 `--repo-root <repo>` 核对文档里引用的源码定位在真实仓库中是否存在。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `SKILL.md` | 核心 workflow、内容组织、页面设计与硬约束。 |
| `REFERENCE.md` | 详细写作标准、页面类型、同步规则和质量检查。 |
| `EXAMPLES.md` | 默认输出形态与成稿语气样例。 |
| `repo-docs-zh/SKILL.md` | 中文语言覆盖层。 |
| `scripts/validate_repo_docs.py` | 本地 repo-docs 文档包验证脚本。 |

## 质量标准

好的 repo-docs 文档包应该让新读者不用先打开源码，就能说清项目在做什么、沿一条真实路径走到输出、理解关键概念、查到精确契约，并知道哪里容易改坏。

---

<div align="center">
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><strong>Repo-Docs:</strong> 让你跟得上 agent 写出来的代码。</p>
</div>
