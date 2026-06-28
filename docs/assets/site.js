(() => {
  const INSTALL_TEXT = {
    en: `Install the repo-docs skill from this project:
https://github.com/YurunChen/repo-docs-skills

Make both repo-docs and repo-docs-zh available
in my agent skill directory.`,
    zh: `从这个项目安装 repo-docs skill:
https://github.com/YurunChen/repo-docs-skills

请把 repo-docs 和 repo-docs-zh 都安装到我的 agent skill 目录。`
  };

  const TEXT = {
    en: {
      lang: "en",
      title: "Repo-Docs — Keep up with the code your agents write.",
      description:
        "Vibe coding makes code move faster than memory. Repo-Docs turns each real run into walkthroughs, concepts, references, and sync rules that live beside the source.",
      copied: "Install prompt copied",
      copyFailed: "Copy failed - select text manually",
      loadingFile: "Loading generated file...",
      bindings: {
        ".skip-link": "Skip to content",
        ".nav-links a[href='#map']": "Map",
        ".nav-links a[href='#artifacts']": "Artifacts",
        ".nav-links a[href='#cases']": "Cases",
        ".nav-links a[href='#quests']": "Modes",
        ".nav-links a[href='#contribute']": "Contribute",
        ".nav-action": "Docs",
        ".eyebrow-text": "An evidence atlas for agent-built code.",
        ".hero-serif": "Keep up with the code",
        ".hero-pixel": "your agents write.",
        ".hero-lead":
          "Vibe coding makes code move faster than memory. Repo-Docs turns each real run into walkthroughs, concepts, references, and sync rules that live beside the source.",
        ".hero-aside": "Understand the repo before you memorize paths.",
        ".hero-install-top span": "repo-docs install prompt",
        "[data-copy-install]": "Copy",
        ".hero-actions .button-primary": "Explore live output",
        ".hero-actions a[href='https://github.com/YurunChen/repo-docs-skills']": "GitHub",
        ".hero-actions a[href='#contribute']": "Contribute",
        ".contrast-title": "Vibe coding moves faster than memory.",
        ".contrast-lead":
          "Repo-Docs is not a file-tree tour or a chat transcript. It keeps a small project guide beside the source so the next reader can follow proof, not guesswork.",
        ".contrast-tag--dim": "Without repo-docs",
        ".contrast-card--before li:nth-child(1)": "Code changed quickly, but the reason stayed in chat.",
        ".contrast-card--before li:nth-child(2)": "Files exist, yet no one can explain the real behavior path.",
        ".contrast-card--before li:nth-child(3)": "README, source, tests, and agent memory drift apart.",
        ".contrast-card--before li:nth-child(4)": "The next agent starts by rediscovering the same context.",
        ".contrast-tag--bright": "With repo-docs",
        ".contrast-card--after li:nth-child(1)": "A walkthrough of one real run from entry to output.",
        ".contrast-card--after li:nth-child(2)": "Concept pages for the few ideas that actually matter.",
        ".contrast-card--after li:nth-child(3)": "Reference pages for commands, fields, schemas, and evidence.",
        ".contrast-card--after li:nth-child(4)": "A sync rule that keeps future answers tied to current source.",
        ".agents-label": "Works with",
        ".world-strip article:nth-child(1) span": "Observe first",
        ".world-strip article:nth-child(1) strong": "One real behavior before file inventory.",
        ".world-strip article:nth-child(2) span": "Evidence path",
        ".world-strip article:nth-child(2) strong": "Commands, contracts, and source links stay attached.",
        ".world-strip article:nth-child(3) span": "Minimal sync",
        ".world-strip article:nth-child(3) strong": "Only the stale page gets patched.",
        "#map-title": "Keep understanding tied to the path code actually took.",
        ".map-section .section-copy p":
          "Observe one real behavior, name the concepts, anchor lookup in source evidence, then repair only the page that drifted. The loop keeps repo docs current without another full rewrite.",
        ".ledger-row[data-step='observe'] strong": "Observe",
        ".ledger-row[data-step='observe'] span": "Run a behavior through source, tests, data, or UI.",
        ".ledger-row[data-step='name'] strong": "Name",
        ".ledger-row[data-step='name'] span": "Give the stable concepts their own module pages.",
        ".ledger-row[data-step='anchor'] strong": "Anchor",
        ".ledger-row[data-step='anchor'] span": "Move exact lookup into references with source evidence.",
        ".ledger-row[data-step='repair'] strong": "Repair",
        ".ledger-row[data-step='repair'] span": "When code drifts, update the smallest owning page.",
        ".hotspot-workshop": "Artifacts",
        "#artifacts-title": "What Repo-Docs generates",
        ".workshop-copy > p":
          "The result is not a single long README. It is a small set of pages with different jobs, so narrative and lookup do not fight each other.",
        ".inventory-card:nth-child(1) h3": "Walkthroughs",
        ".inventory-card:nth-child(1) p": "Follow one behavior from entry point to output.",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dt": "Depth",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dd": "Route",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dt": "Proof",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dd": "High",
        ".inventory-card:nth-child(2) h3": "Module pages",
        ".inventory-card:nth-child(2) p": "Name the concepts and ownership boundaries.",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dt": "Scope",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dd": "Concept",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dt": "Drift",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dd": "Low",
        ".inventory-card:nth-child(3) h3": "References",
        ".inventory-card:nth-child(3) p": "Store commands, schemas, fields, and exact links.",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dt": "Lookup",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dd": "Exact",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dt": "Links",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dd": "Source",
        ".inventory-card:nth-child(4) h3": "Sync rules",
        ".inventory-card:nth-child(4) p": "Tell future agents how to keep pages current.",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dt": "Trigger",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dd": "Drift",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dt": "Patch",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dd": "Minimal",
        ".case-copy .section-note": "GitHub demo cases",
        "#case-title": "Demo output from real GitHub repos.",
        ".case-copy p:not(.section-note)":
          "These samples come from three popular public GitHub repositories that are not skill projects. Each panel shows generated repo-docs files, and every file opens the complete Markdown content grounded in inspected source.",
        ".case-tree-head a": "Open full case",
        "#case-panel-aider .case-tree-head strong": "repo-docs/ terminal edit run",
        "#case-panel-bolt .case-tree-head strong": "repo-docs/ chat streaming path",
        "#case-panel-tabby .case-tree-head strong": "repo-docs/ completion service path",
        "#quest-title": "Four modes, one rule: prove before writing.",
        ".quest-heading p":
          "Repo-Docs changes shape with the state of the project, but it keeps the same evidence discipline each time.",
        ".quest-advisor > p": "What happened?",
        "[data-quest-pick='build']": "New repo, no guide yet",
        "[data-quest-pick='sync']": "Code changed, docs stale",
        "[data-quest-pick='seed']": "Planning before code exists",
        "[data-quest-pick='refine']": "Reader model was wrong",
        ".quest-board [data-quest='build'] span": "Build",
        ".quest-board [data-quest='build'] h3": "First durable guide for a repo that already exists.",
        ".quest-board [data-quest='sync'] span": "Sync",
        ".quest-board [data-quest='sync'] h3":
          "Repair stale understanding after code, config, data, or tests change.",
        ".quest-board [data-quest='seed'] span": "Seed",
        ".quest-board [data-quest='seed'] h3":
          "Separate planned work, unknowns, and confirmed facts before code exists.",
        ".quest-board [data-quest='refine'] span": "Refine",
        ".quest-board [data-quest='refine'] h3":
          "Adjust the guide when a repo question reveals the wrong reader model.",
        "#path-title": "A small loop that keeps the guide current.",
        ".loop-step:nth-child(1) strong": "Read",
        ".loop-step:nth-child(1) p": "Open the guide page that should answer the question.",
        ".loop-step:nth-child(2) strong": "Inspect",
        ".loop-step:nth-child(2) p": "Check the current source, command, artifact, config, or data.",
        ".loop-step:nth-child(3) strong": "Patch",
        ".loop-step:nth-child(3) p": "Update the owning page only when the gap is durable.",
        ".loop-step:nth-child(4) strong": "Answer",
        ".loop-step:nth-child(4) p": "Reply from evidence and leave the repo easier to continue.",
        ".install-copy .section-note": "Open source",
        "#contribute-title": "Help make repo understanding easier to maintain.",
        ".install-copy p:not(.section-note)":
          "Repo-Docs is open source. Issues, examples, documentation fixes, and pull requests are welcome, especially when they make agent-built repositories easier to understand.",
        ".terminal-top": "open source contribution",
        ".contribution-snippet": "Issues: bugs, stale docs, missing workflows\nPRs: fixes, examples, guide improvements",
        ".terminal-actions .button-primary": "Open issue",
        ".terminal-actions .button-secondary": "Send PR",
        ".site-footer p": "Keep up with the code your agents write.",
        ".footer-links a[href='README.md']": "English README",
        ".footer-links a[href='README_CN.md']": "Chinese README",
        ".footer-links a[href='SKILL.md']": "Skill contract"
      }
    },
    zh: {
      lang: "zh-CN",
      title: "Repo-Docs — 让你跟得上 agent 写出来的代码。",
      description:
        "Vibe coding 让代码跑得很快，但理解常常还留在聊天里。Repo-Docs 把一次真实运行写成 walkthrough、概念页、reference 和同步规则，让解释跟源码一起留在仓库里。",
      copied: "安装提示词已复制",
      copyFailed: "复制失败，请手动选择文本",
      loadingFile: "正在加载生成文件...",
      bindings: {
        ".skip-link": "跳到正文",
        ".nav-links a[href='#map']": "地图",
        ".nav-links a[href='#artifacts']": "产物",
        ".nav-links a[href='#cases']": "案例",
        ".nav-links a[href='#quests']": "模式",
        ".nav-links a[href='#contribute']": "贡献",
        ".nav-action": "文档",
        ".eyebrow-text": "给 agent 写出来的代码，留一张可验证的证据地图。",
        ".hero-serif": "让你跟得上 agent",
        ".hero-pixel": "写出来的代码。",
        ".hero-lead":
          "Vibe coding 让代码跑得很快，但理解常常还留在聊天里。Repo-Docs 把一次真实运行写成 walkthrough、概念页、reference 和同步规则，让解释跟源码一起留在仓库里。",
        ".hero-aside": "先理解仓库，再记路径。",
        ".hero-install-top span": "repo-docs 安装提示词",
        "[data-copy-install]": "复制",
        ".hero-actions .button-primary": "查看真实输出",
        ".hero-actions a[href='https://github.com/YurunChen/repo-docs-skills']": "GitHub",
        ".hero-actions a[href='#contribute']": "参与贡献",
        ".contrast-title": "Vibe coding 让代码跑得比记忆更快。",
        ".contrast-lead":
          "Repo-Docs 不是文件树导览，也不是聊天记录整理。它把一份小型项目指南留在源码旁边，让下一位读者跟着证据走，而不是靠猜。",
        ".contrast-tag--dim": "没有 repo-docs",
        ".contrast-card--before li:nth-child(1)": "代码已经变了，但为什么这么变还留在聊天记录里。",
        ".contrast-card--before li:nth-child(2)": "文件很多，却没人能说清一条真实行为怎么从入口走到输出。",
        ".contrast-card--before li:nth-child(3)": "README、源码、测试和 agent memory 互相漂移。",
        ".contrast-card--before li:nth-child(4)": "下一个 agent 又要重新发现同一批上下文。",
        ".contrast-tag--bright": "有了 repo-docs",
        ".contrast-card--after li:nth-child(1)": "一条真实运行的 walkthrough，从可观察入口讲到产物。",
        ".contrast-card--after li:nth-child(2)": "少数真正支撑设计的概念页。",
        ".contrast-card--after li:nth-child(3)": "命令、字段、schema、工具和证据的 reference 页。",
        ".contrast-card--after li:nth-child(4)": "让未来 agent 按当前源码同步文档的根规则。",
        ".agents-label": "支持",
        ".world-strip article:nth-child(1) span": "先观察",
        ".world-strip article:nth-child(1) strong": "先追踪一个真实行为，再整理文件清单。",
        ".world-strip article:nth-child(2) span": "证据路径",
        ".world-strip article:nth-child(2) strong": "命令、契约和源码链接始终跟着叙事。",
        ".world-strip article:nth-child(3) span": "最小同步",
        ".world-strip article:nth-child(3) strong": "只修补真正过期的那一页。",
        "#map-title": "让理解始终跟着代码真实走过的路径。",
        ".map-section .section-copy p":
          "先观察一个真实行为，再命名概念、把查找锚到源码证据，最后只修补漂移的那一页。这个循环让 repo docs 保持新鲜，而不必整本重写。",
        ".ledger-row[data-step='observe'] strong": "观察",
        ".ledger-row[data-step='observe'] span": "沿着源码、测试、数据或 UI 跑通一个真实行为。",
        ".ledger-row[data-step='name'] strong": "命名",
        ".ledger-row[data-step='name'] span": "把稳定概念写成独立的模块页。",
        ".ledger-row[data-step='anchor'] strong": "锚定",
        ".ledger-row[data-step='anchor'] span": "把精确查找信息放进参考页，并附上源码证据。",
        ".ledger-row[data-step='repair'] strong": "修补",
        ".ledger-row[data-step='repair'] span": "代码漂移时，只更新最小的归属页面。",
        ".hotspot-workshop": "产物",
        "#artifacts-title": "Repo-Docs 会生成什么",
        ".workshop-copy > p":
          "结果不是一篇超长 README，而是一组各司其职的小页面，让叙事和查找互不抢位。",
        ".inventory-card:nth-child(1) h3": "Walkthrough",
        ".inventory-card:nth-child(1) p": "沿着一个行为从入口追到输出。",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dt": "深度",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dd": "路径",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dt": "证据",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dd": "高",
        ".inventory-card:nth-child(2) h3": "模块页",
        ".inventory-card:nth-child(2) p": "命名概念和归属边界。",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dt": "范围",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dd": "概念",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dt": "漂移",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dd": "低",
        ".inventory-card:nth-child(3) h3": "参考页",
        ".inventory-card:nth-child(3) p": "保存命令、schema、字段和精确链接。",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dt": "查找",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dd": "精确",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dt": "链接",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dd": "源码",
        ".inventory-card:nth-child(4) h3": "同步规则",
        ".inventory-card:nth-child(4) p": "告诉未来的 agent 如何保持页面新鲜。",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dt": "触发",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dd": "漂移",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dt": "补丁",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dd": "最小",
        ".case-copy .section-note": "GitHub 真实案例",
        "#case-title": "真实 GitHub 仓库的 Demo 生成效果。",
        ".case-copy p:not(.section-note)":
          "这些样例来自三个热门公开 GitHub 仓库，并且都不是 skill 项目。每个面板展示生成的 repo-docs 文件，点击文件即可查看基于源码检查写出的完整 Markdown 原文。",
        ".case-tree-head a": "打开完整案例",
        "#case-panel-aider .case-tree-head strong": "repo-docs/ 终端编辑路径",
        "#case-panel-bolt .case-tree-head strong": "repo-docs/ 聊天流式路径",
        "#case-panel-tabby .case-tree-head strong": "repo-docs/ 补全服务路径",
        "#quest-title": "四种模式，同一条规则：先证明，再书写。",
        ".quest-heading p": "Repo-Docs 会随项目状态改变形态，但每次都保留同一套证据纪律。",
        ".quest-advisor > p": "发生了什么？",
        "[data-quest-pick='build']": "新仓库，还没有指南",
        "[data-quest-pick='sync']": "代码变了，文档过期",
        "[data-quest-pick='seed']": "代码未写，先做规划",
        "[data-quest-pick='refine']": "读者模型需要校准",
        ".quest-board [data-quest='build'] span": "构建",
        ".quest-board [data-quest='build'] h3": "为已经存在的仓库生成第一份耐用指南。",
        ".quest-board [data-quest='sync'] span": "同步",
        ".quest-board [data-quest='sync'] h3": "代码、配置、数据或测试变化后，修复过期理解。",
        ".quest-board [data-quest='seed'] span": "铺底",
        ".quest-board [data-quest='seed'] h3": "在代码出现前，分清计划、未知和已确认事实。",
        ".quest-board [data-quest='refine'] span": "校准",
        ".quest-board [data-quest='refine'] h3": "当仓库问题暴露读者模型错误时，调整指南。",
        "#path-title": "一个小循环，让指南保持最新。",
        ".loop-step:nth-child(1) strong": "读取",
        ".loop-step:nth-child(1) p": "打开本该回答问题的指南页面。",
        ".loop-step:nth-child(2) strong": "检查",
        ".loop-step:nth-child(2) p": "检查当前源码、命令、产物、配置或数据。",
        ".loop-step:nth-child(3) strong": "修补",
        ".loop-step:nth-child(3) p": "只有当缺口会持续存在时，才更新归属页面。",
        ".loop-step:nth-child(4) strong": "回答",
        ".loop-step:nth-child(4) p": "基于证据回答，并让仓库更容易继续接手。",
        ".install-copy .section-note": "开源贡献",
        "#contribute-title": "一起让 repo 理解更容易维护。",
        ".install-copy p:not(.section-note)":
          "Repo-Docs 是开源项目。欢迎提交 issue、示例、文档修正和 PR，尤其是能让 agent 写出来的仓库更容易理解的改进。",
        ".terminal-top": "开源贡献",
        ".contribution-snippet": "Issues: bug、过期文档、缺失 workflow\nPRs: 修复、示例、guide 改进",
        ".terminal-actions .button-primary": "提交 issue",
        ".terminal-actions .button-secondary": "提交 PR",
        ".site-footer p": "让你跟得上 agent 写出来的代码。",
        ".footer-links a[href='README.md']": "英文 README",
        ".footer-links a[href='README_CN.md']": "中文 README",
        ".footer-links a[href='SKILL.md']": "Skill 契约"
      }
    }
  };

  const normalizeLanguage = (value) => (String(value).toLowerCase().startsWith("zh") ? "zh" : "en");

  const getLanguage = () => normalizeLanguage(document.documentElement.dataset.activeLang || "en");

  const readSavedLanguage = () => {
    try {
      return window.localStorage.getItem("repoDocsLanguage") || "";
    } catch {
      return "";
    }
  };

  const saveLanguage = (language) => {
    try {
      window.localStorage.setItem("repoDocsLanguage", language);
    } catch {
      // Language switching should still work in browser contexts that block storage.
    }
  };

  const applyLanguage = (language) => {
    const lang = normalizeLanguage(language);
    const content = TEXT[lang];

    document.documentElement.lang = content.lang;
    document.documentElement.dataset.activeLang = lang;
    document.title = content.title;

    const description = document.querySelector("meta[name='description']");
    if (description) description.setAttribute("content", content.description);

    document.querySelectorAll("[data-install-snippet]").forEach((node) => {
      node.textContent = INSTALL_TEXT[lang];
    });

    Object.entries(content.bindings).forEach(([selector, value]) => {
      document.querySelectorAll(selector).forEach((node) => {
        node.textContent = value;
      });
    });

    document.querySelector(".language-switch")?.setAttribute("aria-label", lang === "zh" ? "语言切换" : "Language");
    document
      .querySelector("[data-copy-install]")
      ?.setAttribute("aria-label", lang === "zh" ? "复制安装提示词" : "Copy install prompt");
    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      const active = button.dataset.langSwitch === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  const initLanguageSwitch = () => {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang") || "";
    const initialLanguage = queryLanguage || readSavedLanguage() || normalizeLanguage(navigator.language);
    applyLanguage(initialLanguage);

    window.repoDocsSetLanguage = (language) => {
      const lang = normalizeLanguage(language);
      saveLanguage(lang);
      applyLanguage(lang);
    };

    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      const button = target?.closest?.("[data-lang-switch]");
      if (!button) return;
      event.preventDefault();
      window.repoDocsSetLanguage(button.dataset.langSwitch);
    });
  };

  const canAnimate = () =>
    window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const appendInlineMarkdown = (parent, text, basePath) => {
    const inlinePattern = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let cursor = 0;
    const appendText = (value) => {
      if (value) parent.append(document.createTextNode(value));
    };

    for (const match of text.matchAll(inlinePattern)) {
      appendText(text.slice(cursor, match.index));
      const token = match[0];

      if (token.startsWith("`")) {
        const code = document.createElement("code");
        code.textContent = token.slice(1, -1);
        parent.append(code);
      } else {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        const anchor = document.createElement("a");
        anchor.textContent = linkMatch[1];
        anchor.href = new URL(linkMatch[2], new URL(basePath, window.location.href)).href;
        parent.append(anchor);
      }

      cursor = match.index + token.length;
    }

    appendText(text.slice(cursor));
  };

  const makeParagraph = (lines, basePath) => {
    const paragraph = document.createElement("p");
    appendInlineMarkdown(paragraph, lines.join(" "), basePath);
    return paragraph;
  };

  const parseTableRow = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const renderMarkdown = (markdown, basePath) => {
    const root = document.createElement("div");
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    let index = 0;

    const appendList = (ordered) => {
      const list = document.createElement(ordered ? "ol" : "ul");
      const marker = ordered ? /^\d+\.\s+(.+)$/ : /^-\s+(.+)$/;

      while (index < lines.length) {
        const match = lines[index].match(marker);
        if (!match) break;
        const item = document.createElement("li");
        appendInlineMarkdown(item, match[1], basePath);
        list.append(item);
        index += 1;
      }

      root.append(list);
    };

    while (index < lines.length) {
      const line = lines[index];

      if (!line.trim()) {
        index += 1;
        continue;
      }

      const fence = line.match(/^```(\w*)/);
      if (fence) {
        const codeLines = [];
        index += 1;
        while (index < lines.length && !lines[index].startsWith("```")) {
          codeLines.push(lines[index]);
          index += 1;
        }
        index += 1;

        const pre = document.createElement("pre");
        const code = document.createElement("code");
        if (fence[1]) code.dataset.language = fence[1];
        code.textContent = codeLines.join("\n");
        pre.append(code);
        root.append(pre);
        continue;
      }

      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        const level = String(Math.min(heading[1].length + 1, 5));
        const node = document.createElement(`h${level}`);
        appendInlineMarkdown(node, heading[2], basePath);
        root.append(node);
        index += 1;
        continue;
      }

      if (
        index + 1 < lines.length &&
        line.includes("|") &&
        /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
      ) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const headerRow = document.createElement("tr");

        parseTableRow(line).forEach((cell) => {
          const th = document.createElement("th");
          appendInlineMarkdown(th, cell, basePath);
          headerRow.append(th);
        });
        thead.append(headerRow);
        index += 2;

        while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
          const row = document.createElement("tr");
          parseTableRow(lines[index]).forEach((cell) => {
            const td = document.createElement("td");
            appendInlineMarkdown(td, cell, basePath);
            row.append(td);
          });
          tbody.append(row);
          index += 1;
        }

        table.append(thead, tbody);
        root.append(table);
        continue;
      }

      if (/^-\s+/.test(line)) {
        appendList(false);
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        appendList(true);
        continue;
      }

      const paragraphLines = [];
      while (
        index < lines.length &&
        lines[index].trim() &&
        !/^```/.test(lines[index]) &&
        !/^(#{1,4})\s+/.test(lines[index]) &&
        !/^-\s+/.test(lines[index]) &&
        !/^\d+\.\s+/.test(lines[index])
      ) {
        if (
          index + 1 < lines.length &&
          lines[index].includes("|") &&
          /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
        ) {
          break;
        }
        paragraphLines.push(lines[index]);
        index += 1;
      }

      if (paragraphLines.length) {
        root.append(makeParagraph(paragraphLines, basePath));
      }
    }

    return root;
  };

  const loadGeneratedFile = async (caseNode, trigger) => {
    const titleNode = caseNode.querySelector(".case-file-preview span");
    const contentNode = caseNode.querySelector(".case-file-content");
    if (!titleNode || !contentNode || !trigger.dataset.file) return;

    caseNode.querySelectorAll("button[data-file]").forEach((button) => {
      button.classList.remove("is-active");
      button.removeAttribute("aria-current");
    });

    trigger.classList.add("is-active");
    trigger.setAttribute("aria-current", "true");
    titleNode.textContent = trigger.dataset.title || trigger.textContent.trim();
    contentNode.textContent = TEXT[getLanguage()].loadingFile;

    try {
      const response = await fetch(trigger.dataset.file);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      contentNode.replaceChildren(renderMarkdown(markdown, trigger.dataset.file));
    } catch (error) {
      contentNode.textContent = `Could not load ${trigger.dataset.file}\n${error.message}`;
    }

      if (canAnimate()) {
        window.gsap.fromTo(
          [titleNode, contentNode],
          { y: 8 },
          {
            y: 0,
            duration: 0.24,
            ease: "expo.out",
            stagger: 0.04,
            overwrite: "auto"
          }
        );
      window.gsap.fromTo(
        trigger,
        { x: 0 },
        {
          x: 4,
          duration: 0.08,
          ease: "power1.inOut",
          repeat: 1,
          yoyo: true,
          overwrite: "auto",
          clearProps: "transform"
        }
      );
    }
  };

  const showToast = (message) => {
    const toast = document.querySelector(".pixel-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  const initCopyInstall = () => {
    const copyHandler = async (button) => {
      try {
        await navigator.clipboard.writeText(INSTALL_TEXT[getLanguage()]);
        showToast(TEXT[getLanguage()].copied);
        if (canAnimate()) {
          window.gsap.fromTo(button, { scale: 1 }, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 });
        }
      } catch {
        showToast(TEXT[getLanguage()].copyFailed);
      }
    };

    document.querySelectorAll("[data-copy-install]").forEach((button) => {
      button.addEventListener("click", () => copyHandler(button));
    });
  };

  const initCaseTabs = () => {
    const tabs = Array.from(document.querySelectorAll("[data-case-tab]"));
    const panels = document.querySelectorAll("[data-case-panel]");
    if (!tabs.length || !panels.length) return;

    const activate = (id) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.caseTab === id;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel.dataset.casePanel === id;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab.dataset.caseTab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        tabs[next].focus();
        activate(tabs[next].dataset.caseTab);
      });
    });

    activate(tabs[0].dataset.caseTab);
  };

  const initQuestAdvisor = () => {
    const chips = document.querySelectorAll("[data-quest-pick]");
    const cards = document.querySelectorAll(".quest-board article");
    if (!chips.length || !cards.length) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const quest = chip.dataset.questPick;
        chips.forEach((node) => node.classList.toggle("is-active", node === chip));
        cards.forEach((card) => {
          const match = card.dataset.quest === quest;
          card.classList.toggle("is-highlighted", match);
        });
        const target = document.querySelector(`.quest-board article[data-quest="${quest}"]`);
        if (target && canAnimate()) {
          window.gsap.fromTo(target, { scale: 1 }, { scale: 1.02, duration: 0.12, yoyo: true, repeat: 1 });
        }
      });
    });
  };

  const initLedgerMap = () => {
    const ledger = document.querySelector(".pixel-ledger");
    const rows = document.querySelectorAll(".ledger-row[data-step]");
    if (!rows.length) return;

    const highlight = (step) => {
      rows.forEach((row) => row.classList.toggle("is-active", row.dataset.step === step));
    };

    const clear = () => highlight("");

    rows.forEach((row) => {
      row.addEventListener("mouseenter", () => highlight(row.dataset.step));
      row.addEventListener("focus", () => highlight(row.dataset.step));
    });

    if (ledger) {
      ledger.addEventListener("mouseleave", clear);
    }
  };

  document.querySelectorAll(".case-repo-tree").forEach((caseNode) => {
    const activeFile = caseNode.querySelector("button[data-file].is-active");
    if (activeFile) loadGeneratedFile(caseNode, activeFile);

    caseNode.addEventListener("click", (event) => {
      const trigger = event.target.closest("button[data-file]");
      if (!trigger || !caseNode.contains(trigger)) return;
      loadGeneratedFile(caseNode, trigger);
    });
  });

  initLanguageSwitch();
  initCopyInstall();
  initCaseTabs();
  initQuestAdvisor();
  initLedgerMap();

  const initNavScrollSpy = () => {
    const nav = document.querySelector(".site-nav");
    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    if (!links.length) return;

    const sections = links
      .map((link) => {
        const id = link.getAttribute("href");
        const section = id ? document.querySelector(id) : null;
        return section ? { link, section } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const onScroll = () => {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12);

      const marker = window.scrollY + (nav?.offsetHeight || 0) + 80;
      let current = "";

      sections.forEach(({ link, section }) => {
        if (section.offsetTop <= marker) {
          current = link.getAttribute("href") || current;
        }
      });

      links.forEach((link) => {
        link.classList.toggle("is-active", Boolean(current) && link.getAttribute("href") === current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  initNavScrollSpy();

  if (!window.gsap) return;

  const { gsap } = window;
  const easeOut = "expo.out";
  gsap.defaults({ duration: 0.55, ease: easeOut });

  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 900px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      if (reduceMotion) return;

      gsap.from(".site-nav", { y: -12, opacity: 0, duration: 0.36, ease: easeOut });
      gsap.from(".hero-atlas .hero-copy > *", {
        y: 18,
        opacity: 0,
        stagger: 0.07,
        delay: 0.08,
        ease: easeOut
      });
      gsap.from(".world-strip article", {
        y: 10,
        opacity: 0,
        stagger: 0.08,
        delay: 0.4,
        ease: easeOut
      });

      const revealTargets = document.querySelectorAll(
        ".section, .ledger-row, .inventory-card, .case-repo-tree, .quest-board article, .loop-step, .terminal-panel, .agents-strip"
      );

      const observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            gsap.fromTo(
              entry.target,
              { y: 12, opacity: 0.92 },
              {
                y: 0,
                opacity: 1,
                duration: 0.42,
                ease: easeOut,
                clearProps: "transform,opacity"
              }
            );
            activeObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );

      revealTargets.forEach((target) => observer.observe(target));
      return () => observer.disconnect();
    }
  );
})();
