#!/usr/bin/env python3
"""Validate a generated repo-docs package.

This script is intentionally conservative: it checks structure, links, and
routing hints that prevent common repo-docs drift. It does not judge prose.
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote

REQUIRED_NON_SEED_FILES = [
    "README.md",
    "walkthroughs/one-real-run.md",
    "glossary.md",
    "change-map.md",
    "change-log.md",
]
REQUIRED_NON_SEED_DIRS = ["modules", "references"]
REQUIRED_SEED_FILES = [
    "README.md",
    "change-map.md",
    "change-log.md",
    "glossary.md",
    "references/decisions.md",
]
LOCAL_LINK_PATTERN = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
IMAGE_LINK_PATTERN = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")
STEP_PATTERN = re.compile(r"^#{2,4}\s+(step\s+\d+|第\s*\d+\s*步|步骤\s*\d+)", re.IGNORECASE | re.MULTILINE)
MERMAID_PATTERN = re.compile(r"```mermaid[\s\S]*?```", re.IGNORECASE)
HEADING_PATTERN = re.compile(r"^#{1,6}\s+(.+)$", re.MULTILINE)


@dataclass
class Finding:
    severity: str
    message: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate a repo-docs package")
    parser.add_argument("repo_docs", type=Path, help="Path to repo-docs directory")
    parser.add_argument("--seed", action="store_true", help="Validate Seed-mode structure")
    return parser.parse_args()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def markdown_files(root: Path) -> list[Path]:
    return sorted(path for path in root.rglob("*.md") if path.is_file())


def link_target_exists(source: Path, target: str, root: Path) -> bool:
    target = target.strip()
    if not target or target.startswith("#"):
        return True
    if re.match(r"^[a-z][a-z0-9+.-]*:", target, re.IGNORECASE):
        return True
    path_part = unquote(target.split("#", 1)[0])
    if not path_part:
        return True
    candidate = (source.parent / path_part).resolve()
    try:
        candidate.relative_to(root.resolve())
    except ValueError:
        return False
    return candidate.exists()


def check_structure(root: Path, seed: bool) -> list[Finding]:
    findings: list[Finding] = []
    required_files = REQUIRED_SEED_FILES if seed else REQUIRED_NON_SEED_FILES
    for relative in required_files:
        if not (root / relative).is_file():
            findings.append(Finding("ERROR", f"Missing required file: {relative}"))
    if not seed:
        for relative in REQUIRED_NON_SEED_DIRS:
            directory = root / relative
            if not directory.is_dir():
                findings.append(Finding("ERROR", f"Missing required directory: {relative}/"))
            elif not any(directory.glob("*.md")):
                findings.append(Finding("WARN", f"No markdown pages found in {relative}/"))
    return findings


def check_links(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    for path in markdown_files(root):
        text = read_text(path)
        links = LOCAL_LINK_PATTERN.findall(text) + IMAGE_LINK_PATTERN.findall(text)
        for target in links:
            if not link_target_exists(path, target, root):
                relative = path.relative_to(root)
                findings.append(Finding("ERROR", f"Broken local link in {relative}: {target}"))
    return findings


def check_non_seed_routing(root: Path) -> list[Finding]:
    findings: list[Finding] = []
    readme = root / "README.md"
    walkthrough = root / "walkthroughs" / "one-real-run.md"
    change_map = root / "change-map.md"

    if readme.is_file():
        text = read_text(readme)
        if "walkthroughs/one-real-run.md" not in text and "one-real-run.md" not in text:
            findings.append(Finding("ERROR", "README.md does not link to the main walkthrough"))

    if walkthrough.is_file():
        text = read_text(walkthrough)
        if not STEP_PATTERN.search(text) and "Source Locator" not in text and "源码" not in text:
            findings.append(Finding("WARN", "Main walkthrough has no obvious steps or source locator section"))
        if not contains_any(text, ["What To Notice", "Notice:", "注意看"]):
            findings.append(Finding("WARN", "Main walkthrough does not include a What To Notice / Notice teaching cue"))
        if not contains_any(text, ["Source Locator", "源码定位", "源码"]):
            findings.append(Finding("WARN", "Main walkthrough does not include source locator language"))
        if not contains_any(text, ["Verification", "验证方法", "验证"]):
            findings.append(Finding("WARN", "Main walkthrough does not include verification language"))
        if "<details" in text.lower() and STEP_PATTERN.search(text):
            findings.append(Finding("WARN", "Main walkthrough uses <details>; confirm the main teaching path is not hidden"))
        if "modules/" not in text and "../modules/" not in text:
            findings.append(Finding("WARN", "Main walkthrough does not link to any optional concept page under modules/"))
        if "references/" not in text and "../references/" not in text:
            findings.append(Finding("WARN", "Main walkthrough does not route to any reference page"))

    if change_map.is_file():
        text = read_text(change_map)
        if "modules/" not in text:
            findings.append(Finding("WARN", "change-map.md does not point readers to any concept page under modules/"))
        if "references/" not in text:
            findings.append(Finding("WARN", "change-map.md does not point future changes to references/"))
        if not re.search(r"verify|verification|pytest|test|检查|验证|命令", text, re.IGNORECASE):
            findings.append(Finding("ERROR", "change-map.md does not include verification language"))

    flows = root / "flows.md"
    if flows.is_file():
        text = read_text(flows).lower()
        relationship_terms = ["relationship", "phase", "state", "multiple", "workflow", "关系", "阶段", "状态", "多条"]
        if not any(term in text for term in relationship_terms):
            findings.append(Finding("WARN", "flows.md exists but does not read like a relationship map"))
        if not walkthrough.is_file():
            findings.append(Finding("ERROR", "flows.md exists but the main walkthrough is missing"))

    return findings


def contains_any(text: str, needles: list[str]) -> bool:
    lowered = text.lower()
    return any(needle.lower() in lowered for needle in needles)


def check_teaching_structure(root: Path) -> list[Finding]:
    findings: list[Finding] = []

    for path in sorted((root / "modules").glob("*.md")) if (root / "modules").is_dir() else []:
        text = read_text(path)
        relative = path.relative_to(root)
        expected = [
            ("Reader Question", ["Reader Question", "读者问题", "读者困惑"]),
            ("Plain Model", ["Plain Model", "白话模型"]),
            ("Where You Saw This", ["Where You Saw This", "在哪里看到", "出现位置"]),
            ("Example", ["One Concrete Example", "真实例子", "具体例子"]),
            ("Verification", ["Verification", "验证方法", "验证"]),
        ]
        for label, variants in expected:
            if not contains_any(text, variants):
                findings.append(Finding("WARN", f"{relative} is missing teaching section: {label}"))

    for path in sorted((root / "references").glob("*.md")) if (root / "references").is_dir() else []:
        text = read_text(path)
        relative = path.relative_to(root)
        headings = "\n".join(HEADING_PATTERN.findall(text))
        if contains_any(headings, ["Why", "How it works", "Plain Model", "Reader Question", "What To Notice", "为什么", "如何工作", "白话模型", "注意看"]):
            findings.append(Finding("WARN", f"{relative} contains teaching-style headings; consider moving explanation to walkthroughs/ or modules/"))

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
        "普通页面默认使用",
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


def main() -> int:
    args = parse_args()
    root = args.repo_docs.resolve()
    if not root.is_dir():
        print(f"ERROR: not a directory: {root}")
        return 2

    findings: list[Finding] = []
    findings.extend(check_structure(root, args.seed))
    findings.extend(check_links(root))
    if not args.seed:
        findings.extend(check_non_seed_routing(root))
        findings.extend(check_teaching_structure(root))
        findings.extend(check_source_truth_hints(root))

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
