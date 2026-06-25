#!/usr/bin/env python3
"""Validate a generated repo-docs package.

Conservative checks for structure, links, routing, sync anchors, glossary coverage,
sync freshness hints, and drift toward mechanical templates.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote

REQUIRED_NON_SEED_FILES = [
    "README.md",
    "walkthroughs/one-real-run.md",
    "glossary.md",
    "change-log.md",
]
REQUIRED_NON_SEED_DIRS = ["modules", "references"]
REQUIRED_SEED_FILES = [
    "README.md",
    "change-log.md",
    "glossary.md",
    "references/decisions.md",
]
REQUIRED_LITE_FILES = [
    "README.md",
    "walkthroughs/one-real-run.md",
    "change-log.md",
]
LOCAL_LINK_PATTERN = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
IMAGE_LINK_PATTERN = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
STEP_PATTERN = re.compile(r"^#{2,4}\s+(step\s+\d+|第\s*\d+\s*步|步骤\s*\d+)", re.IGNORECASE | re.MULTILINE)
NUMBERED_STEP_H2_PATTERN = re.compile(r"^##\s+(Step\s+\d+|第\s*\d+\s*步|步骤\s*\d+)\s*[:：]", re.IGNORECASE | re.MULTILINE)
MERMAID_PATTERN = re.compile(r"```mermaid[\s\S]*?```", re.IGNORECASE)
HEADING_PATTERN = re.compile(r"^#{1,6}\s+(.+)$", re.MULTILINE)
FENCE_PATTERN = re.compile(r"```[\s\S]*?```")
INLINE_CODE_PATTERN = re.compile(r"`([^`\n]+)`")
LINK_WITH_TEXT_PATTERN = re.compile(r"(?<!!)\[([^\]]+)\]\(([^)]+)\)")
CONFIDENCE_LABEL_PATTERN = re.compile(r"\b(Confirmed|Inferred|Planned|Unknown)\b|已确认|推断|计划中|未确认")
SOURCEY_INLINE_PATTERN = re.compile(
    r"/|\.py\b|\.js\b|\.ts\b|\.tsx\b|\.json\b|\.ya?ml\b|\.md\b|\(\.\.\.\)|^[A-Za-z_][A-Za-z0-9_]*\("
)
CODE_DENSITY_TOKEN_PATTERN = re.compile(
    r"`([^`\n]*(?:/|\.py\b|\.js\b|\.ts\b|\.tsx\b|\.json\b|\.ya?ml\b|\.toml\b|\.md\b|\(\.\.\.\)|^[A-Za-z_][A-Za-z0-9_]*\()[^`\n]*)`"
)
BROAD_VALUE_WORD_PATTERN = re.compile(
    r"\b(robust|powerful|seamless|extensible|scalable|efficient|comprehensive|"
    r"important|innovative|advanced|flexible|reliable)\b|"
    r"鲁棒|强大|无缝|可扩展|高效|全面|重要|先进|灵活|可靠|完善",
    re.IGNORECASE,
)
# Link labels that carry no information scent: they name the act of clicking or
# the file, not what the reader gains by following the link.
LOW_SCENT_LABELS = {
    "here", "this", "that", "see", "click", "click here", "read", "read more",
    "more", "link", "page", "doc", "docs", "这里", "看这里", "点击", "详情", "见此",
}
# A source locator looks like a relative path with at least one slash and a file
# extension, optionally followed by :line or :line-range. This stays narrow to
# keep false positives low; bare filenames without a slash are not checked.
SOURCE_LOCATOR_PATTERN = re.compile(r"^[\w.@-]+(?:/[\w.@-]+)+\.[A-Za-z0-9]{1,8}(?::\d+(?:-\d+)?)?$")
READER_STATE_H3_PATTERN = re.compile(
    r"^###\s+("
    r"What You Are Looking At|Plain Model|What To Notice|What Changes|Source Locator|Verification|"
    r"你正在看什么|白话模型|发生了什么变化|源码定位|验证方法"
    r")",
    re.MULTILINE | re.IGNORECASE,
)
MODULE_TEMPLATE_H2_PATTERN = re.compile(
    r"^##\s+("
    r"Reader Question|In [Cc]ode|Where You Saw This|One Concrete Example|What To Notice|Source Locator|"
    r"Change Risk|Verification|Change Risk And Verification|If you change this|"
    r"读者问题|在代码中|你在哪里见过|一个真实例子|源码定位|改动风险|验证方法|改动风险与验证|如果你要改"
    r")",
    re.MULTILINE | re.IGNORECASE,
)
MODULE_REQUIRED_H2 = [
    ("Plain model", re.compile(r"^##\s+(Plain [Mm]odel|白话模型)\s*$", re.MULTILINE)),
    ("Code model", re.compile(r"^##\s+(Code [Mm]odel|代码模型)\s*$", re.MULTILINE)),
    ("Read next", re.compile(r"^##\s+(Read [Nn]ext|接下去阅读|接下来阅读)\s*$", re.MULTILINE)),
]
REDUNDANT_WALKTHROUGH_H2_PATTERN = re.compile(
    r"^##\s+("
    r"What changes|Change risk|Verification|Plain model|What you are looking at|"
    r"发生了什么变化|改动风险|验证方法|白话模型|你正在看什么"
    r")",
    re.MULTILINE | re.IGNORECASE,
)
INLINE_LABEL_PATTERN = re.compile(
    r"\*\*(Source locator|Verification|Code [Mm]odel|源码定位|验证方法|代码模型)。\*\*",
    re.IGNORECASE,
)
PATH_IN_PROSE_PATTERN = re.compile(
    r"`[^`\n]*(?:/|\\)[^`\n]*\.(?:py|js|ts|tsx|go|rs|java|rb|md|json|ya?ml|toml)[^`\n]*`",
    re.IGNORECASE,
)
SYNC_ANCHOR_PATTERN = re.compile(
    r"Synced through\s+([0-9a-f]{7,40})|同步至\s+([0-9a-f]{7,40})",
    re.IGNORECASE,
)
SOURCE_FILE_IN_TOKEN = re.compile(
    r"\.(py|js|ts|tsx|go|rs|java|rb|json|ya?ml|toml|md)\b",
    re.IGNORECASE,
)
LOWERCASE_IDENTIFIER = re.compile(r"^[a-z_][a-z0-9_]*$")


@dataclass
class Finding:
    severity: str
    message: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate a repo-docs package")
    parser.add_argument("repo_docs", type=Path, help="Path to repo-docs directory")
    parser.add_argument("--seed", action="store_true", help="Validate Seed-mode structure")
    parser.add_argument(
        "--lite",
        action="store_true",
        help="Validate Lite-mode structure for small or single-purpose repos",
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=None,
        help="Repo root used to verify that cited source locators actually exist",
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def markdown_files(root: Path) -> list[Path]:
    return sorted(path for path in root.rglob("*.md") if path.is_file())


def link_target_exists(source: Path, target: str, root: Path, repo_root: Path | None = None) -> bool:
    target = target.strip()
    if not target or target.startswith("#"):
        return True
    if re.match(r"^[a-z][a-z0-9+.-]*:", target, re.IGNORECASE):
        return True
    path_part = unquote(target.split("#", 1)[0])
    if not path_part:
        return True
    candidate = (source.parent / path_part).resolve()
    allowed_roots = [root.resolve()]
    if repo_root is not None:
        allowed_roots.append(repo_root.resolve())
    for allowed_root in allowed_roots:
        try:
            candidate.relative_to(allowed_root)
        except ValueError:
            continue
        return candidate.exists()
    return False


def check_structure(root: Path, seed: bool, lite: bool) -> list[Finding]:
    findings: list[Finding] = []
    if seed:
        required_files = REQUIRED_SEED_FILES
    elif lite:
        required_files = REQUIRED_LITE_FILES
    else:
        required_files = REQUIRED_NON_SEED_FILES
    for relative in required_files:
        if not (root / relative).is_file():
            findings.append(Finding("ERROR", f"Missing required file: {relative}"))
    if not seed and not lite:
        for relative in REQUIRED_NON_SEED_DIRS:
            directory = root / relative
            if not directory.is_dir():
                findings.append(Finding("ERROR", f"Missing required directory: {relative}/"))
            elif not any(directory.glob("*.md")):
                findings.append(Finding("WARN", f"No markdown pages found in {relative}/"))
    return findings


def check_links(root: Path, repo_root: Path | None = None) -> list[Finding]:
    findings: list[Finding] = []
    for path in markdown_files(root):
        text = read_text(path)
        links = LOCAL_LINK_PATTERN.findall(text) + IMAGE_LINK_PATTERN.findall(text)
        for target in links:
            if not link_target_exists(path, target, root, repo_root):
                relative = path.relative_to(root)
                findings.append(Finding("ERROR", f"Broken local link in {relative}: {target}"))
    return findings


def check_non_seed_routing(root: Path, lite: bool = False) -> list[Finding]:
    findings: list[Finding] = []
    readme = root / "README.md"
    walkthrough = root / "walkthroughs" / "one-real-run.md"

    if readme.is_file():
        text = read_text(readme)
        if "walkthroughs/one-real-run.md" not in text and "one-real-run.md" not in text:
            findings.append(Finding("ERROR", "README.md does not link to the main walkthrough"))

    if walkthrough.is_file():
        text = read_text(walkthrough)
        has_step = bool(STEP_PATTERN.search(text))
        has_locator = contains_any(
            text,
            [
                "Source Locator",
                "Source locator",
                "源码定位",
                "**Source locator.**",
                "**源码定位。**",
                "source-map.md",
            ],
        ) or bool(PATH_IN_PROSE_PATTERN.search(text))
        source_link_targets = [
            target
            for target in LOCAL_LINK_PATTERN.findall(text)
            if SOURCE_FILE_IN_TOKEN.search(target) or "/" in target and target.startswith("..")
        ]
        has_locator = has_locator or bool(source_link_targets)
        if not has_step:
            findings.append(Finding("WARN", "Main walkthrough should use numbered Step headings such as `## Step 1: ...`"))
        if not has_step and not has_locator:
            findings.append(Finding("WARN", "Main walkthrough has no obvious steps or path-like source references"))
        if not has_locator:
            findings.append(Finding("WARN", "Main walkthrough does not reference source paths in prose or locator labels"))
        if not contains_any(text, ["Verification", "验证方法", "验证", "pytest", "npm test", "cargo test", "go test"]):
            findings.append(Finding("WARN", "Main walkthrough does not include verification language"))
        inline_labels = len(INLINE_LABEL_PATTERN.findall(text))
        if inline_labels >= 3:
            findings.append(
                Finding(
                    "WARN",
                    f"Main walkthrough repeats inline labels ({inline_labels}x); weave paths and checks into prose instead",
                )
            )
        numbered_steps = len(NUMBERED_STEP_H2_PATTERN.findall(text))
        if has_step and numbered_steps == 0:
            findings.append(
                Finding(
                    "WARN",
                    "Main walkthrough step headings should include a behavior name after a colon, e.g. `## Step 1: input becomes a record`",
                )
            )
        fragmented = len(READER_STATE_H3_PATTERN.findall(text))
        if fragmented >= 3:
            findings.append(
                Finding(
                    "WARN",
                    "Main walkthrough repeats reader-state ### subheadings; use numbered Step headings and prose instead",
                )
            )
        redundant_closing = len(REDUNDANT_WALKTHROUGH_H2_PATTERN.findall(text))
        if redundant_closing >= 2:
            findings.append(
                Finding(
                    "WARN",
                    "Main walkthrough has multiple closing/meta ## sections that likely repeat the steps; merge into prose or one closing block",
                )
            )
        if "<details" in text.lower() and STEP_PATTERN.search(text):
            findings.append(Finding("WARN", "Main walkthrough uses <details>; confirm the main explanation path is not hidden"))

    flows = root / "flows.md"
    if flows.is_file():
        text = read_text(flows).lower()
        relationship_terms = ["relationship", "phase", "state", "multiple", "workflow", "关系", "阶段", "状态", "多条"]
        if not any(term in text for term in relationship_terms):
            findings.append(Finding("WARN", "flows.md exists but does not read like a relationship map"))
        if not walkthrough.is_file():
            findings.append(Finding("ERROR", "flows.md exists but the main walkthrough is missing"))

    return findings


def last_sync_sha(change_log_text: str) -> str | None:
    matches = list(SYNC_ANCHOR_PATTERN.finditer(change_log_text))
    if not matches:
        return None
    match = matches[-1]
    return match.group(1) or match.group(2)


def narrative_markdown_paths(root: Path) -> list[Path]:
    paths: list[Path] = []
    for relative in ("README.md", "walkthroughs/one-real-run.md"):
        path = root / relative
        if path.is_file():
            paths.append(path)
    modules = root / "modules"
    if modules.is_dir():
        paths.extend(sorted(modules.glob("*.md")))
    return paths


def cited_source_paths(root: Path) -> set[str]:
    cited: set[str] = set()
    for path in narrative_markdown_paths(root):
        text = FENCE_PATTERN.sub("", read_text(path))
        for match in INLINE_CODE_PATTERN.finditer(text):
            token = match.group(1).strip().split(":", 1)[0].replace("\\", "/")
            if SOURCE_LOCATOR_PATTERN.match(token) or ("/" in token and SOURCE_FILE_IN_TOKEN.search(token)):
                cited.add(token)
    return cited


def git_diff_paths(repo_root: Path, since_sha: str) -> set[str] | None:
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", f"{since_sha}..HEAD"],
            cwd=repo_root,
            capture_output=True,
            text=True,
            timeout=30,
            check=False,
        )
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return None
    if result.returncode != 0:
        return None
    return {line.strip().replace("\\", "/") for line in result.stdout.splitlines() if line.strip()}


def paths_overlap(cited: str, changed: str) -> bool:
    if cited == changed:
        return True
    if cited.startswith(changed + "/") or changed.startswith(cited + "/"):
        return True
    return False


def check_change_log_anchor(root: Path) -> list[Finding]:
    path = root / "change-log.md"
    if not path.is_file():
        return []
    text = read_text(path)
    if len(text.strip()) < 80:
        return []
    if SYNC_ANCHOR_PATTERN.search(text):
        return []
    return [
        Finding(
            "WARN",
            "change-log.md has no Synced through <sha> / 同步至 <sha> anchor; add one after each sync for incremental updates",
        )
    ]


def check_sync_freshness(root: Path, repo_root: Path) -> list[Finding]:
    change_log = root / "change-log.md"
    if not change_log.is_file():
        return []
    sha = last_sync_sha(read_text(change_log))
    if not sha:
        return []
    changed = git_diff_paths(repo_root, sha)
    if changed is None or not changed:
        return []
    cited = cited_source_paths(root)
    stale = sorted({cited_path for cited_path in cited if any(paths_overlap(cited_path, diff_path) for diff_path in changed)})
    if not stale:
        return []
    preview = ", ".join(stale[:8])
    suffix = "..." if len(stale) > 8 else ""
    return [
        Finding(
            "WARN",
            f"source changed since last sync anchor ({sha[:7]}); review narrative pages citing: {preview}{suffix}",
        )
    ]


def check_glossary_coverage(root: Path) -> list[Finding]:
    glossary = root / "glossary.md"
    if not glossary.is_file():
        return []
    glossary_text = read_text(glossary).lower()
    counts: dict[str, int] = {}
    for path in narrative_markdown_paths(root):
        if path.name == "README.md":
            continue
        text = FENCE_PATTERN.sub("", read_text(path))
        for match in INLINE_CODE_PATTERN.finditer(text):
            token = match.group(1).strip()
            if "/" in token or SOURCE_FILE_IN_TOKEN.search(token):
                continue
            if LOWERCASE_IDENTIFIER.match(token):
                continue
            if len(token) < 3 or len(token) > 48:
                continue
            counts[token] = counts.get(token, 0) + 1

    findings: list[Finding] = []
    for term, count in sorted(counts.items(), key=lambda item: (-item[1], item[0])):
        if count < 2:
            continue
        if term.lower() in glossary_text:
            continue
        findings.append(
            Finding(
                "WARN",
                f"glossary.md has no entry for `{term}` (appears {count}x in narrative pages); add a row if readers confuse it",
            )
        )
    return findings[:5]


def contains_any(text: str, needles: list[str]) -> bool:
    lowered = text.lower()
    return any(needle.lower() in lowered for needle in needles)


def check_explanation_structure(root: Path) -> list[Finding]:
    findings: list[Finding] = []

    for path in sorted((root / "modules").glob("*.md")) if (root / "modules").is_dir() else []:
        text = read_text(path)
        relative = path.relative_to(root)
        for label, pattern in MODULE_REQUIRED_H2:
            if not pattern.search(text):
                findings.append(Finding("WARN", f"{relative} is missing module section: {label}"))

        has_code_model = contains_any(
            text,
            ["Code model", "Code Model", "代码模型", "In code", "在代码中"],
        ) or "```" in text
        has_usage_example = "```" in text
        if has_code_model and not has_usage_example:
            findings.append(
                Finding(
                    "WARN",
                    f"{relative} explains a code shape but has no usage snippet (add a short fenced example)",
                )
            )

        inline_labels = len(INLINE_LABEL_PATTERN.findall(text))
        if inline_labels >= 3:
            findings.append(
                Finding(
                    "WARN",
                    f"{relative} repeats inline labels ({inline_labels}x); weave paths into prose instead",
                )
            )

        template_h2 = len(MODULE_TEMPLATE_H2_PATTERN.findall(text))
        if template_h2 >= 5:
            findings.append(
                Finding(
                    "WARN",
                    f"{relative}: {template_h2} module ## headings; keep the default Plain model / Code model / Read next shape unless extra sections reduce confusion",
                )
            )

    for path in sorted((root / "references").glob("*.md")) if (root / "references").is_dir() else []:
        text = read_text(path)
        relative = path.relative_to(root)
        headings = "\n".join(HEADING_PATTERN.findall(text))
        if contains_any(headings, ["Why", "How it works", "Reader Question", "为什么", "如何工作", "读者问题"]):
            findings.append(Finding("WARN", f"{relative} contains explanation headings; consider moving them to walkthroughs/ or modules/"))

    for path in markdown_files(root):
        text = read_text(path)
        if "```mermaid" in text.lower():
            without_diagrams = MERMAID_PATTERN.sub("", text)
            if not contains_any(without_diagrams, ["diagram", "shows", "notice", "relationship", "state", "phase", "图", "关系", "注意", "阶段", "状态"]):
                relative = path.relative_to(root)
                findings.append(Finding("WARN", f"{relative} has a Mermaid diagram without obvious explanatory prose"))

    return findings


def check_source_truth_hints(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    confirmed_pattern = re.compile(r"\bConfirmed\b|已确认")
    skip_patterns = [
        "Evidence status: Confirmed unless",
        "Confirmed unless",
        "证据状态：除特别标注外",
        "| `Confirmed` |",
    ]

    for path in markdown_files(root):
        relative = path.relative_to(root)
        for lineno, line in enumerate(read_text(path).splitlines(), start=1):
            if not confirmed_pattern.search(line):
                continue
            if any(pattern in line for pattern in skip_patterns):
                continue
            has_locator = "`" in line or "](" in line or re.search(r"\b(src|tests?|scripts?|config|data|docs?|materials?)/", line)
            if not has_locator:
                findings.append(Finding("WARN", f"{relative}:{lineno} uses Confirmed/已确认 without an obvious source locator"))
    return findings


def first_content_lines(text: str, limit: int = 80) -> str:
    lines = []
    for line in FENCE_PATTERN.sub("", text).splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        lines.append(line)
        if len(lines) >= limit:
            break
    return "\n".join(lines)


def section_text(text: str, heading_pattern: str) -> str:
    match = re.search(heading_pattern, text, re.IGNORECASE | re.MULTILINE)
    if not match:
        return ""
    start = match.end()
    next_heading = re.search(r"^##\s+", text[start:], re.MULTILINE)
    end = start + next_heading.start() if next_heading else len(text)
    return text[start:end]


def code_density_count(text: str) -> int:
    return len(CODE_DENSITY_TOKEN_PATTERN.findall(FENCE_PATTERN.sub("", text)))


def check_reading_experience(root: Path) -> list[Finding]:
    """Warn when source names appear before the reader has a handle.

    These are heuristics. They do not enforce a fixed number; they catch places
    where narrative pages are likely doing lookup work too early.
    """
    findings: list[Finding] = []
    narrative_paths: list[Path] = []
    for relative in ("README.md", "walkthroughs/one-real-run.md"):
        path = root / relative
        if path.is_file():
            narrative_paths.append(path)
    modules = root / "modules"
    if modules.is_dir():
        narrative_paths.extend(sorted(modules.glob("*.md")))

    for path in narrative_paths:
        relative = path.relative_to(root)
        text = read_text(path)
        opening = first_content_lines(text)
        inline_tokens = [match.group(1).strip() for match in INLINE_CODE_PATTERN.finditer(opening)]
        sourcey_tokens = [token for token in inline_tokens if SOURCEY_INLINE_PATTERN.search(token)]
        if relative == Path("README.md") and len(sourcey_tokens) > 3:
            findings.append(
                Finding("WARN", f"{relative}: opening has high code-name density; explain what happens before source names")
            )
        elif len(sourcey_tokens) > 6:
            findings.append(
                Finding("WARN", f"{relative}: opening has high code-name density; move dense source names later or into references")
            )

        if relative.parts[0] == "modules":
            plain = section_text(text, r"^##\s+(Plain [Mm]odel|白话模型)\s*$")
            code_model = section_text(text, r"^##\s+(Code [Mm]odel|代码模型)\s*$")
            read_next = section_text(text, r"^##\s+(Read [Nn]ext|接下去阅读|接下来阅读)\s*$")
            if code_density_count(plain) > 2:
                findings.append(
                    Finding("WARN", f"{relative}: Plain model has high code-name density; move source names to Code model")
                )
            if code_density_count(code_model) > 12:
                findings.append(
                    Finding("WARN", f"{relative}: Code model is dense; consider moving lookup material to references/")
                )
            if len(LINK_WITH_TEXT_PATTERN.findall(read_next)) > 4:
                findings.append(
                    Finding("WARN", f"{relative}: Read next has many links; route to the next useful page, not a link list")
                )

        label_count = len(CONFIDENCE_LABEL_PATTERN.findall(FENCE_PATTERN.sub("", text)))
        h3_count = len(re.findall(r"^###\s+", text, re.MULTILINE))
        if relative.parts[0] == "walkthroughs" and h3_count >= 6:
            findings.append(
                Finding(
                    "WARN",
                    f"{relative}: many ### subheadings; keep numbered Step headings and connected prose",
                )
            )
        if relative.parts[0] in {"walkthroughs", "modules"} and label_count > 8:
            findings.append(
                Finding("WARN", f"{relative}: many confidence labels; prefer page-level evidence status and local labels only for confidence changes")
            )
        if relative == Path("README.md") and label_count > 5:
            findings.append(
                Finding("WARN", f"{relative}: many confidence labels in the main guide; keep evidence visible but quiet")
            )

        readme_meta_h2 = re.compile(
            r"^##\s+(Project Model|First Path|Current Scope|Plain [Mm]odel|项目模型|首读路径|当前范围)",
            re.MULTILINE,
        )
        if relative == Path("README.md") and len(readme_meta_h2.findall(text)) >= 2:
            findings.append(
                Finding(
                    "WARN",
                    f"{relative}: multiple orienting ## sections; merge thesis, model, and first path into opening prose per PAGE_RULES.md",
                )
            )

        prose = FENCE_PATTERN.sub("", text)
        broad_words = BROAD_VALUE_WORD_PATTERN.findall(prose)
        if len(broad_words) > 6:
            findings.append(
                Finding(
                    "WARN",
                    f"{relative}: many broad value words; prefer concrete actions, observations, checks, or caveats",
                )
            )
    return findings


def check_source_locators(root: Path, repo_root: Path) -> list[Finding]:
    """Verify that inline path-like source locators resolve to a real file.

    A locator is checked only when it looks like a relative path with a file
    extension (e.g. ``src/foo.py`` or ``tests/test_bar.py:42``). It passes if it
    exists under the repo root, under the repo-docs root, or relative to the
    citing page, which keeps doc-internal links from producing false warnings.
    Fenced code blocks are skipped so commands and sample output are not scanned.
    """
    findings: list[Finding] = []
    repo_root = repo_root.resolve()
    for path in markdown_files(root):
        relative = path.relative_to(root)
        if relative == Path("change-log.md"):
            continue
        text = FENCE_PATTERN.sub("", read_text(path))
        for match in INLINE_CODE_PATTERN.finditer(text):
            token = match.group(1).strip()
            if not SOURCE_LOCATOR_PATTERN.match(token):
                continue
            file_part = token.split(":", 1)[0]
            candidates = [repo_root / file_part, root / file_part, path.parent / file_part]
            if not any(candidate.exists() for candidate in candidates):
                findings.append(
                    Finding("WARN", f"{relative}: source locator `{token}` not found under repo root")
                )
    return findings


def check_scent(root: Path) -> list[Finding]:
    """Check information scent: content pages should route the reader onward, and
    onward link labels should name what the reader gains, not the file or the
    act of clicking. Both are WARN-only and add no text to generated docs; they
    enforce navigability from the author side. Reference/glossary/change-log are
    lookup leaves and are not required to route onward.
    """
    findings: list[Finding] = []
    content_paths: list[Path] = []
    readme = root / "README.md"
    if readme.is_file():
        content_paths.append(readme)
    for sub in ("walkthroughs", "modules"):
        directory = root / sub
        if directory.is_dir():
            content_paths.extend(sorted(directory.glob("*.md")))

    for path in content_paths:
        relative = path.relative_to(root)
        text = FENCE_PATTERN.sub("", read_text(path))
        onward_links = 0
        for match in LINK_WITH_TEXT_PATTERN.finditer(text):
            label = match.group(1).strip()
            target = match.group(2).strip()
            if target.startswith("#") or re.match(r"^[a-z][a-z0-9+.-]*:", target, re.IGNORECASE):
                continue
            path_part = unquote(target.split("#", 1)[0]).strip()
            if not path_part.endswith(".md"):
                continue
            if (path.parent / path_part).resolve() == path.resolve():
                continue
            onward_links += 1
            base = path_part.rsplit("/", 1)[-1]
            if label.lower() in LOW_SCENT_LABELS or label in (path_part, base, base[:-3]):
                findings.append(
                    Finding("WARN", f"{relative}: low-scent link label '{label}' — name what the reader gains, not the file")
                )
        if onward_links == 0:
            findings.append(
                Finding("WARN", f"{relative}: no onward link to another page (possible dead end)")
            )
    return findings


def main() -> int:
    args = parse_args()
    root = args.repo_docs.resolve()
    if not root.is_dir():
        print(f"ERROR: not a directory: {root}")
        return 2
    if args.seed and args.lite:
        print("ERROR: choose at most one of --seed and --lite")
        return 2

    findings: list[Finding] = []
    findings.extend(check_structure(root, args.seed, args.lite))
    findings.extend(check_links(root, args.repo_root if args.repo_root is not None and args.repo_root.is_dir() else None))
    if not args.seed:
        findings.extend(check_non_seed_routing(root, lite=args.lite))
        findings.extend(check_explanation_structure(root))
        findings.extend(check_source_truth_hints(root))
        findings.extend(check_reading_experience(root))
        findings.extend(check_scent(root))
        findings.extend(check_change_log_anchor(root))
        if not args.lite:
            findings.extend(check_glossary_coverage(root))
    if args.repo_root is not None:
        if args.repo_root.is_dir():
            findings.extend(check_source_locators(root, args.repo_root))
            if not args.seed:
                findings.extend(check_sync_freshness(root, args.repo_root))
        else:
            findings.append(Finding("ERROR", f"--repo-root is not a directory: {args.repo_root}"))

    errors = [finding for finding in findings if finding.severity == "ERROR"]
    warnings = [finding for finding in findings if finding.severity == "WARN"]

    for finding in findings:
        print(f"{finding.severity}: {finding.message}")

    if errors:
        print(f"FAILED: {len(errors)} error(s), {len(warnings)} warning(s)")
        return 1
    print(f"OK: 0 errors, {len(warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
