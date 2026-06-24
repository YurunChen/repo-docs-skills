<div align="center">
  <h1>
    <img src="assets/logo.png" height="64" alt="Repo-Docs logo" />
    Repo-Docs
  </h1>
  <h3>让你跟得上 agent 写出来的代码。</h3>
</div>

<p align="center">
  Repo-Docs 把快速变化的仓库整理成有证据的 Markdown 文档：先帮人建立可读心智模型，再逐步给出源码定位、reference 契约、改动风险和验证方法。
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README_CN.md">中文 README</a>
</p>

---

## Repo-Docs 是什么？

Vibe coding 会让代码变化得很快，用户的项目理解容易跟不上。`repo-docs` 是一个 Codex skill，用来把项目理解贴回源码事实：先沿一条真实 workflow 讲清楚行为，再用可读概念页降低理解成本，最后给出精确 reference、改动地图和验证路径。

默认产物是 `repo-docs/` 里的 Markdown 文档。HTML 或课程材料不是默认输出。

## 当前契约

| 原则 | 含义 |
| --- | --- |
| walkthrough first | 非 Seed 项目必须用 `walkthroughs/one-real-run.md` 讲一条真实行为路径。 |
| 可读性第一 | 每篇页面先用人话解释行为，再在读者需要行动时引入代码名词。 |
| 教学检查 | README、walkthrough、module 和 change-map 都要先建立心智模型，再引入密集代码名词。 |
| Markdown 展示 | 标题、提示块、表格、代码块、图和折叠区都服务理解节奏。 |
| reference discipline | 字段、命令、schema、artifact、metric、工具参数等高密度信息放进 `references/`，不要塞进教学正文。 |
| 证据诚实 | 没有检查过的代码和数据 claim 不能写成事实，要标成推断、计划中或未确认。 |
| 按气味导航 | 每页都用"读者能得到什么"把人引向下一页；README 给出新人路径和专家快速路径。 |
| relationship map 按触发生成 | `flows.md` 只用于多 workflow、多阶段、多状态或多输出关系图，不能替代主 walkthrough。 |

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

## 教学模型

读者先理解行为，再接触代码名词：README 和 walkthrough 保持低代码密度，module 页用一个概念、一个真实例子和源码定位降低理解成本，reference 承担高密度查表。完整教学规则和 Markdown 展示协议见 [SKILL.md](SKILL.md) 和 [REFERENCE.md](REFERENCE.md)。

## 工作模式

| 模式 | 适用场景 | 输出重点 |
| --- | --- | --- |
| Seed | 项目刚开始或几乎没有代码 | 目标、决策、计划、未知项 |
| Build | 项目需要第一版 repo docs | 真实 walkthrough、可读心智模型、概念页、references |
| Sync | 代码、文档、数据、脚本或实验变了 | 当前文档和源码事实同步 |
| Cleanup / removal | 用户要求删除生成文档 | 删除文档和过期根规则 |
| Question refinement | 一个问题暴露稳定文档缺口 | 先补可复用文档，再基于证据回答 |

## 安装

```bash
mkdir -p ~/.agents/skills/repo-docs
cp SKILL.md REFERENCE.md EXAMPLES.md ~/.agents/skills/repo-docs/
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

它检查标准结构、本地链接、主 walkthrough 路由、教学小节提示、change-map 验证语言、reference 漂移、`flows.md` 是否被误用，以及导航气味（死胡同页面和无气味链接文字）。用 `--lite` 校验小仓库结构，用 `--seed` 校验 Seed 结构，用 `--repo-root <repo>` 核对文档里引用的源码定位在真实仓库中是否存在。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `SKILL.md` | 核心 workflow 和硬约束。 |
| `REFERENCE.md` | 详细写作标准、页面类型、同步规则和质量检查。 |
| `EXAMPLES.md` | 可复用输出模板、教学示例和 Markdown 展示反模式。 |
| `repo-docs-zh/SKILL.md` | 中文语言覆盖层。 |
| `scripts/validate_repo_docs.py` | 本地 repo-docs 文档包验证脚本。 |

## 质量标准

好的 repo-docs 文档包应该让新读者不用先打开源码，就能说清项目问题、沿一条真实路径走到输出、理解路径里出现的关键概念、查到精确契约，并知道改动风险和验证方法。

---

<div align="center">
  <img src="assets/logo.png" height="96" alt="Repo-Docs logo" />
  <p><strong>Repo-Docs:</strong> 让你跟得上 agent 写出来的代码。</p>
</div>
