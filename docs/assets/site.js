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
        "Repo-Docs helps turn real coding runs into small, source-backed pages that stay beside the repository.",
      copied: "Install prompt copied.",
      copyFailed: "Could not copy automatically. You can select the text manually.",
      loadingFile: "Opening generated file...",
      bindings: {
        ".skip-link": "Skip to content",
        ".nav-links a[href='#map']": "Map",
        ".nav-links a[href='#artifacts']": "Artifacts",
        ".nav-links a[href='#cases']": "Cases",
        ".nav-links a[href='#quests']": "Modes",
        ".nav-links a[href='#contribute']": "Contribute",
        ".nav-action": "Docs",
        ".eyebrow-text": "A source-backed guide for agent-built code.",
        ".hero-serif": "Keep up with the code",
        ".hero-pixel": "your agents write.",
        ".hero-lead":
          "When code moves quickly, context is easy to leave behind. Repo-Docs helps you turn one real run into a few clear pages that live with the source: walkthroughs, concepts, references, and sync notes.",
        ".hero-aside": "Start with understanding, then follow the paths.",
        ".hero-install-top span": "repo-docs install prompt",
        "[data-copy-install]": "Copy",
        ".hero-actions .button-primary": "See generated docs",
        ".hero-actions a[href='https://github.com/YurunChen/repo-docs-skills']": "GitHub",
        ".hero-actions a[href='#contribute']": "Contribute",
        ".contrast-title": "Fast-moving code needs a place for context.",
        ".contrast-lead":
          "Repo-Docs is not a file-tree tour or a chat archive. It keeps a modest project guide beside the source, so the next person can see why things work instead of piecing it together from old messages.",
        ".contrast-tag--dim": "When context stays in chat",
        ".contrast-card--before li:nth-child(1)": "The code changed, but the reason is hard to find later.",
        ".contrast-card--before li:nth-child(2)": "There are many files, yet the real behavior path is still unclear.",
        ".contrast-card--before li:nth-child(3)": "README, source, tests, and agent notes slowly drift apart.",
        ".contrast-card--before li:nth-child(4)": "The next reader has to rediscover the same context again.",
        ".contrast-tag--bright": "When context lives with source",
        ".contrast-card--after li:nth-child(1)": "A walkthrough follows one real run from entry to output.",
        ".contrast-card--after li:nth-child(2)": "Short concept pages name the ideas worth remembering.",
        ".contrast-card--after li:nth-child(3)": "Evidence pages keep source proof and quality review easy to check.",
        ".contrast-card--after li:nth-child(4)": "A sync note tells future agents when a page needs a small update.",
        ".agents-label": "Works with",
        ".world-strip article:nth-child(1) span": "Start from a run",
        ".world-strip article:nth-child(1) strong": "Follow one real behavior before making a file inventory.",
        ".world-strip article:nth-child(2) span": "Keep the evidence close",
        ".world-strip article:nth-child(2) strong": "Commands, contracts, and source links stay with the explanation.",
        ".world-strip article:nth-child(3) span": "Update gently",
        ".world-strip article:nth-child(3) strong": "When something changes, patch the page that owns it.",
        "#map-title": "Keep the guide close to what the code actually does.",
        ".map-section .section-copy p:not(.section-note)":
          "Start with one behavior you can observe, name the concepts that help explain it, and keep the exact source evidence nearby. When the code changes, update the smallest page that needs it.",
        ".ledger-row[data-step='observe'] strong": "Observe",
        ".ledger-row[data-step='observe'] span": "Follow a behavior through source, tests, data, or UI.",
        ".ledger-row[data-step='name'] strong": "Name",
        ".ledger-row[data-step='name'] span": "Give stable concepts their own small module pages.",
        ".ledger-row[data-step='anchor'] strong": "Anchor",
        ".ledger-row[data-step='anchor'] span": "Keep mechanism details in modules and source evidence in references.",
        ".ledger-row[data-step='repair'] strong": "Repair",
        ".ledger-row[data-step='repair'] span": "When code changes, update the page that owns that knowledge.",
        ".hotspot-workshop": "Artifacts",
        "#artifacts-title": "What Repo-Docs generates",
        ".workshop-copy > p:not(.section-note)":
          "The output is intentionally small. Instead of one long README, Repo-Docs creates a few pages with clear jobs, so reading and lookup both stay manageable.",
        ".inventory-card:nth-child(1) h3": "Walkthroughs",
        ".inventory-card:nth-child(1) p": "Walk through one behavior from entry point to output.",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dt": "Depth",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dd": "Route",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dt": "Proof",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dd": "High",
        ".inventory-card:nth-child(2) h3": "Module pages",
        ".inventory-card:nth-child(2) p": "Explain the concepts and ownership boundaries worth keeping.",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dt": "Scope",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dd": "Concept",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dt": "Drift",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dd": "Low",
        ".inventory-card:nth-child(3) h3": "Evidence",
        ".inventory-card:nth-child(3) p": "Keep source evidence, caveats, and quality review easy to check.",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dt": "Audit",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dd": "Source",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dt": "Review",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dd": "Optional",
        ".inventory-card:nth-child(4) h3": "Sync rules",
        ".inventory-card:nth-child(4) p": "Tell future agents how to keep the pages current.",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dt": "Trigger",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dd": "Drift",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dt": "Patch",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dd": "Minimal",
        ".case-copy .section-note": "GitHub examples",
        "#case-title": "A few real repositories, with the generated docs visible.",
        ".case-copy p:not(.section-note)":
          "These examples come from public GitHub repositories that are not skill projects. Each panel shows the files Repo-Docs generated, and each file opens the Markdown content written from inspected source.",
        ".case-tree-head a": "Open full case",
        "#case-panel-aider .case-tree-head strong": "repo-docs/ CLI edit loop",
        "#case-panel-bolt .case-tree-head strong": "repo-docs/ chat streaming path",
        "#case-panel-tabby .case-tree-head strong": "repo-docs/ completion service path",
        "#quest-title": "Use the mode that matches where the repo is.",
        ".quest-heading p:not(.section-note)":
          "You can use Repo-Docs when a repo is new, when docs drift, or when a plan needs a clearer starting point. In each case, the work starts by checking what is actually true.",
        ".quest-advisor > p": "What are you trying to do?",
        "[data-quest-pick='build']": "New repo, no guide yet",
        "[data-quest-pick='sync']": "Code changed, docs stale",
        "[data-quest-pick='seed']": "Planning before code exists",
        "[data-quest-pick='refine']": "Existing guide needs care",
        ".quest-board [data-quest='build'] span": "Build",
        ".quest-board [data-quest='build'] h3": "Start a useful guide for a repo that already exists.",
        ".quest-board [data-quest='sync'] span": "Sync",
        ".quest-board [data-quest='sync'] h3":
          "Refresh the pages affected by code, config, data, or test changes.",
        ".quest-board [data-quest='seed'] span": "Seed",
        ".quest-board [data-quest='seed'] h3":
          "Separate planned work, open questions, and confirmed facts before code exists.",
        ".quest-board [data-quest='refine'] span": "Refine",
        ".quest-board [data-quest='refine'] h3":
          "Improve the guide when a real question shows what readers still need.",
        "#path-title": "A practical loop for keeping docs current.",
        ".loop-step:nth-child(1) strong": "Read",
        ".loop-step:nth-child(1) p": "Open the page that should help answer the question.",
        ".loop-step:nth-child(2) strong": "Inspect",
        ".loop-step:nth-child(2) p": "Check the current source, command, artifact, config, or data.",
        ".loop-step:nth-child(3) strong": "Patch",
        ".loop-step:nth-child(3) p": "Update the page only when the gap is likely to matter again.",
        ".loop-step:nth-child(4) strong": "Answer",
        ".loop-step:nth-child(4) p": "Answer from evidence and leave the repo a little easier to continue.",
        ".install-copy .section-note": "Open source",
        "#contribute-title": "Help make Repo-Docs easier to trust and maintain.",
        ".install-copy p:not(.section-note)":
          "Repo-Docs is open source. If it misses something in a real workflow, issues and PRs are welcome. Small fixes, examples, and clearer docs all help.",
        ".contribute-panel-head span": "GitHub",
        ".contribute-panel-head strong": "Open source contribution",
        ".contribute-action--primary span": "GitHub Issues",
        ".contribute-action--primary strong": "Open issue",
        ".contribute-action:not(.contribute-action--primary) span": "Pull Requests",
        ".contribute-action:not(.contribute-action--primary) strong": "Send PR",
        ".site-footer p": "Keep up with the code your agents write.",
        ".footer-links a[href='README.md']": "English README",
        ".footer-links a[href='README_CN.md']": "Chinese README",
        ".footer-links a[href='../skills/repo-docs/SKILL.md']": "Skill contract"
      }
    },
    zh: {
      lang: "zh-CN",
      title: "Repo-Docs — 让你跟得上 agent 写出来的代码。",
      description:
        "Repo-Docs 会把真实编码过程整理成几页贴近源码的小文档，方便后来的读者继续接手。",
      copied: "安装提示词已复制。",
      copyFailed: "没能自动复制，可以手动选择这段文本。",
      loadingFile: "正在打开生成文件...",
      bindings: {
        ".skip-link": "跳到正文",
        ".nav-links a[href='#map']": "地图",
        ".nav-links a[href='#artifacts']": "产物",
        ".nav-links a[href='#cases']": "案例",
        ".nav-links a[href='#quests']": "模式",
        ".nav-links a[href='#contribute']": "贡献",
        ".nav-action": "文档",
        ".eyebrow-text": "给 agent 写出来的代码，留一份靠近源码的说明。",
        ".hero-serif": "让你跟得上 agent",
        ".hero-pixel": "写出来的代码。",
        ".hero-lead":
          "代码走得快时，上下文很容易留在聊天里。Repo-Docs 帮你把一次真实运行整理成几页清楚的小文档：walkthrough、概念页、证据页和同步说明都跟源码放在一起。",
        ".hero-aside": "先理解发生了什么，再顺着路径继续看。",
        ".hero-install-top span": "repo-docs 安装提示词",
        "[data-copy-install]": "复制",
        ".hero-actions .button-primary": "查看生成文档",
        ".hero-actions a[href='https://github.com/YurunChen/repo-docs-skills']": "GitHub",
        ".hero-actions a[href='#contribute']": "参与贡献",
        ".contrast-title": "跑得很快的代码，也需要留下上下文。",
        ".contrast-lead":
          "Repo-Docs 不是文件树导览，也不是聊天记录整理。它只是把一份小而清楚的项目说明放在源码旁边，让后来的读者知道这些代码为什么这样工作。",
        ".contrast-tag--dim": "上下文留在聊天里",
        ".contrast-card--before li:nth-child(1)": "代码已经变了，但原因过几天就不好找了。",
        ".contrast-card--before li:nth-child(2)": "文件很多，却还不清楚一条真实行为怎么走完。",
        ".contrast-card--before li:nth-child(3)": "README、源码、测试和 agent 记录慢慢对不上。",
        ".contrast-card--before li:nth-child(4)": "下一位读者又要重新摸一遍同样的上下文。",
        ".contrast-tag--bright": "上下文跟着源码走",
        ".contrast-card--after li:nth-child(1)": "walkthrough 沿着一次真实运行，从入口讲到输出。",
        ".contrast-card--after li:nth-child(2)": "短概念页把值得记住的设计想法说明白。",
        ".contrast-card--after li:nth-child(3)": "证据页保留源码证据和质量审查，方便核对。",
        ".contrast-card--after li:nth-child(4)": "同步说明提醒未来的 agent 什么时候该小修一页。",
        ".agents-label": "支持",
        ".world-strip article:nth-child(1) span": "从一次运行开始",
        ".world-strip article:nth-child(1) strong": "先看清一个真实行为，再整理文件清单。",
        ".world-strip article:nth-child(2) span": "证据放近一点",
        ".world-strip article:nth-child(2) strong": "证据、边界和源码链接都跟着说明走。",
        ".world-strip article:nth-child(3) span": "温和地同步",
        ".world-strip article:nth-child(3) strong": "代码变了，就修补真正归属它的那一页。",
        "#map-title": "让说明尽量贴近代码真实做的事。",
        ".map-section .section-copy p:not(.section-note)":
          "先从一个能观察到的行为开始，再命名有用的概念，并把精确的源码证据放在旁边。以后代码变化时，只更新真正需要更新的那一页。",
        ".ledger-row[data-step='observe'] strong": "观察",
        ".ledger-row[data-step='observe'] span": "沿着源码、测试、数据或 UI 看完一个真实行为。",
        ".ledger-row[data-step='name'] strong": "命名",
        ".ledger-row[data-step='name'] span": "把稳定概念写成小而清楚的模块页。",
        ".ledger-row[data-step='anchor'] strong": "锚定",
        ".ledger-row[data-step='anchor'] span": "把机制细节放进模块，把源码证据放进 references/source-evidence.md。",
        ".ledger-row[data-step='repair'] strong": "修补",
        ".ledger-row[data-step='repair'] span": "代码变化时，只更新承载这段知识的页面。",
        ".hotspot-workshop": "产物",
        "#artifacts-title": "Repo-Docs 会生成什么",
        ".workshop-copy > p:not(.section-note)":
          "输出会尽量保持小而清楚。它不是一篇很长的 README，而是几类各司其职的页面，让阅读和查找都轻松一点。",
        ".inventory-card:nth-child(1) h3": "Walkthrough",
        ".inventory-card:nth-child(1) p": "沿着一个行为，从入口看到输出。",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dt": "深度",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(1) dd": "路径",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dt": "证据",
        ".inventory-card:nth-child(1) .inventory-stats div:nth-child(2) dd": "高",
        ".inventory-card:nth-child(2) h3": "模块页",
        ".inventory-card:nth-child(2) p": "说明值得保留下来的概念和边界。",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dt": "范围",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(1) dd": "概念",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dt": "漂移",
        ".inventory-card:nth-child(2) .inventory-stats div:nth-child(2) dd": "低",
        ".inventory-card:nth-child(3) h3": "证据页",
        ".inventory-card:nth-child(3) p": "保留源码证据、边界说明和质量审查，便于核对。",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dt": "审计",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(1) dd": "源码",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dt": "评审",
        ".inventory-card:nth-child(3) .inventory-stats div:nth-child(2) dd": "可选",
        ".inventory-card:nth-child(4) h3": "同步规则",
        ".inventory-card:nth-child(4) p": "告诉未来的 agent 怎么继续维护这些页面。",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dt": "触发",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(1) dd": "漂移",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dt": "补丁",
        ".inventory-card:nth-child(4) .inventory-stats div:nth-child(2) dd": "最小",
        ".case-copy .section-note": "GitHub 示例",
        "#case-title": "几个真实仓库，以及它们生成出来的文档。",
        ".case-copy p:not(.section-note)":
          "这些示例来自公开 GitHub 仓库，它们本身都不是 skill 项目。每个面板都会展示 Repo-Docs 生成的文件，点开文件可以看到基于源码检查写出的 Markdown 内容。",
        ".case-tree-head a": "打开完整案例",
        "#case-panel-aider .case-tree-head strong": "repo-docs/ CLI 编辑循环",
        "#case-panel-bolt .case-tree-head strong": "repo-docs/ 聊天流式路径",
        "#case-panel-tabby .case-tree-head strong": "repo-docs/ 补全服务路径",
        "#quest-title": "按仓库现在的状态，选择合适的模式。",
        ".quest-heading p:not(.section-note)": "仓库刚开始、文档已经过期，或计划还没落到代码里，都可以用 Repo-Docs。每种情况都先回到源码和事实，再动笔写说明。",
        ".quest-advisor > p": "你现在想做什么？",
        "[data-quest-pick='build']": "新仓库，还没有指南",
        "[data-quest-pick='sync']": "代码变了，文档过期",
        "[data-quest-pick='seed']": "代码未写，先做规划",
        "[data-quest-pick='refine']": "已有指南需要调整",
        ".quest-board [data-quest='build'] span": "构建",
        ".quest-board [data-quest='build'] h3": "为已经存在的仓库写一份有用的起步指南。",
        ".quest-board [data-quest='sync'] span": "同步",
        ".quest-board [data-quest='sync'] h3": "代码、配置、数据或测试变化后，更新受影响的页面。",
        ".quest-board [data-quest='seed'] span": "铺底",
        ".quest-board [data-quest='seed'] h3": "在代码出现前，先分清计划、问题和已经确认的事实。",
        ".quest-board [data-quest='refine'] span": "校准",
        ".quest-board [data-quest='refine'] h3": "当真实问题暴露说明不够清楚时，温和地调整指南。",
        "#path-title": "一个实用的小循环，让文档跟得上变化。",
        ".loop-step:nth-child(1) strong": "读取",
        ".loop-step:nth-child(1) p": "打开应该能帮助回答问题的那一页。",
        ".loop-step:nth-child(2) strong": "检查",
        ".loop-step:nth-child(2) p": "检查当前源码、命令、产物、配置或数据。",
        ".loop-step:nth-child(3) strong": "修补",
        ".loop-step:nth-child(3) p": "只有当这个缺口以后还会用到时，才更新归属页面。",
        ".loop-step:nth-child(4) strong": "回答",
        ".loop-step:nth-child(4) p": "基于证据回答，也让仓库变得更容易继续接手。",
        ".install-copy .section-note": "开源贡献",
        "#contribute-title": "一起让 Repo-Docs 更可靠，也更容易维护。",
        ".install-copy p:not(.section-note)":
          "Repo-Docs 是开源项目。如果它在你的真实工作流里漏了什么，欢迎提 issue 或 PR。小修正、新示例、把说明写得更清楚，都会很有帮助。",
        ".contribute-panel-head span": "GitHub",
        ".contribute-panel-head strong": "开源贡献",
        ".contribute-action--primary span": "GitHub Issues",
        ".contribute-action--primary strong": "提交 issue",
        ".contribute-action:not(.contribute-action--primary) span": "Pull Requests",
        ".contribute-action:not(.contribute-action--primary) strong": "提交 PR",
        ".site-footer p": "让你跟得上 agent 写出来的代码。",
        ".footer-links a[href='README.md']": "英文 README",
        ".footer-links a[href='README_CN.md']": "中文 README",
        ".footer-links a[href='../skills/repo-docs/SKILL.md']": "技能契约"
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

  const MOTION = {
    ease: "power3.out",
    enter: 0.64,
    fast: 0.24,
    micro: 0.12
  };

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
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.fast,
            ease: MOTION.ease,
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
          window.gsap.fromTo(button, { scale: 1 }, { scale: 0.96, duration: MOTION.micro, yoyo: true, repeat: 1 });
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
        if (active && canAnimate()) {
          window.gsap.fromTo(
            panel,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: MOTION.enter, ease: MOTION.ease, overwrite: "auto" }
          );
        }
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
          window.gsap.fromTo(target, { scale: 1 }, { scale: 1.015, duration: MOTION.micro, yoyo: true, repeat: 1 });
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

    const setActiveLink = (hash) => {
      links.forEach((link) => {
        link.classList.toggle("is-active", Boolean(hash) && link.getAttribute("href") === hash);
      });
    };

    const topSentinel = document.createElement("span");
    topSentinel.setAttribute("aria-hidden", "true");
    Object.assign(topSentinel.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "1px",
      height: "1px",
      pointerEvents: "none"
    });
    document.body.prepend(topSentinel);

    if (nav) {
      new IntersectionObserver(([entry]) => {
        nav.classList.toggle("is-scrolled", !entry.isIntersecting);
      }).observe(topSentinel);
    }

    const activeSections = new Map();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSections.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            activeSections.delete(entry.target.id);
          }
        });

        const current = Array.from(activeSections.entries()).sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
        if (current) setActiveLink(`#${current[0]}`);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.55, 1] }
    );

    sections.forEach(({ section }) => sectionObserver.observe(section));
  };

  initNavScrollSpy();

  if (!window.gsap) return;

  const { gsap } = window;
  const easeOut = MOTION.ease;
  gsap.defaults({ duration: MOTION.enter, ease: easeOut });

  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 900px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      if (reduceMotion) return;

      gsap.from(".site-nav", { y: -14, opacity: 0, duration: 0.44, ease: easeOut });
      gsap.from(".hero-atlas .hero-copy > *", {
        y: 22,
        opacity: 0,
        stagger: 0.07,
        delay: 0.08,
        duration: MOTION.enter,
        ease: easeOut
      });
      gsap.from(".world-strip article", {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        delay: 0.4,
        duration: MOTION.enter,
        ease: easeOut
      });

      const revealTargets = document.querySelectorAll(
        ".section, .ledger-row, .inventory-card, .case-repo-tree, .quest-board article, .loop-step, .contribute-panel, .agents-strip"
      );

      const observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            gsap.fromTo(
              entry.target,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: MOTION.enter,
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
