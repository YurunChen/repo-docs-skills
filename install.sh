#!/usr/bin/env bash
set -euo pipefail

REPO_SLUG="YurunChen/repo-docs-skills"
REF="${REPO_DOCS_REF:-main}"
SOURCE_DIR=""
SKILL_DIR=""
ZH_SKILL_DIR=""
AGENT="auto"
UNINSTALL=0
TARGETS=()

usage() {
  cat <<'EOF'
Install repo-docs and repo-docs-zh into agent skill directories.

Usage:
  ./install.sh [--agent auto|codex|claude|agents|all] [--target <skills-dir>] [--ref <git-ref>]
  curl -fsSL https://github.com/YurunChen/repo-docs-skills/raw/main/install.sh | bash

Options:
  --agent NAME      Install into a known agent skill directory. Default: auto.
                    auto   = existing Codex/Claude/agents dirs, or Codex default
                    codex  = ${CODEX_HOME:-~/.codex}/skills
                    claude = ${CLAUDE_HOME:-~/.claude}/skills
                    agents = ${AGENTS_HOME:-~/.agents}/skills
                    all    = all three known directories
  --target DIR      Install into a specific skills parent directory. Can repeat.
  --source DIR      Copy from a local repo checkout instead of downloading.
  --ref REF         Git ref to download when not running from a checkout. Default: main.
  --uninstall       Remove repo-docs and repo-docs-zh from target directories.
  -h, --help        Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --agent)
      AGENT="${2:?--agent requires a value}"
      shift 2
      ;;
    --target)
      TARGETS+=("${2:?--target requires a value}")
      shift 2
      ;;
    --source)
      SOURCE_DIR="${2:?--source requires a value}"
      shift 2
      ;;
    --ref)
      REF="${2:?--ref requires a value}"
      shift 2
      ;;
    --uninstall)
      UNINSTALL=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

expand_path() {
  local path="$1"
  case "$path" in
    "~") printf '%s\n' "$HOME" ;;
    "~/"*) printf '%s/%s\n' "$HOME" "${path#~/}" ;;
    *) printf '%s\n' "$path" ;;
  esac
}

codex_target() {
  printf '%s/skills\n' "$(expand_path "${CODEX_HOME:-$HOME/.codex}")"
}

claude_target() {
  printf '%s/skills\n' "$(expand_path "${CLAUDE_HOME:-$HOME/.claude}")"
}

agents_target() {
  printf '%s/skills\n' "$(expand_path "${AGENTS_HOME:-$HOME/.agents}")"
}

add_target_once() {
  local target
  target="$(expand_path "$1")"
  local existing
  if [[ ${#TARGETS[@]} -gt 0 ]]; then
    for existing in "${TARGETS[@]}"; do
      [[ "$existing" == "$target" ]] && return
    done
  fi
  TARGETS+=("$target")
}

resolve_targets() {
  [[ ${#TARGETS[@]} -gt 0 ]] && return

  case "$AGENT" in
    codex)
      add_target_once "$(codex_target)"
      ;;
    claude)
      add_target_once "$(claude_target)"
      ;;
    agents)
      add_target_once "$(agents_target)"
      ;;
    all)
      add_target_once "$(codex_target)"
      add_target_once "$(claude_target)"
      add_target_once "$(agents_target)"
      ;;
    auto)
      [[ -n "${CODEX_HOME:-}" || -d "$HOME/.codex" ]] && add_target_once "$(codex_target)"
      [[ -n "${CLAUDE_HOME:-}" || -d "$HOME/.claude" ]] && add_target_once "$(claude_target)"
      [[ -n "${AGENTS_HOME:-}" || -d "$HOME/.agents" ]] && add_target_once "$(agents_target)"
      [[ ${#TARGETS[@]} -eq 0 ]] && add_target_once "$(codex_target)"
      ;;
    *)
      echo "Unknown agent: $AGENT" >&2
      exit 2
      ;;
  esac
}

require_file() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    echo "Missing required source file: $file" >&2
    exit 1
  fi
}

resolve_source_layout() {
  if [[ -f "$SOURCE_DIR/skills/repo-docs/SKILL.md" && -f "$SOURCE_DIR/skills/repo-docs/PAGE_RULES.md" ]]; then
    SKILL_DIR="$SOURCE_DIR/skills/repo-docs"
    ZH_SKILL_DIR="$SOURCE_DIR/skills/repo-docs-zh"
  elif [[ -f "$SOURCE_DIR/SKILL.md" && -f "$SOURCE_DIR/PAGE_RULES.md" ]]; then
    SKILL_DIR="$SOURCE_DIR"
    if [[ -f "$SOURCE_DIR/../repo-docs-zh/SKILL.md" ]]; then
      ZH_SKILL_DIR="$(cd "$SOURCE_DIR/../repo-docs-zh" && pwd)"
    elif [[ -f "$SOURCE_DIR/repo-docs-zh/SKILL.md" ]]; then
      ZH_SKILL_DIR="$SOURCE_DIR/repo-docs-zh"
    fi
  fi

  if [[ -z "$SKILL_DIR" || -z "$ZH_SKILL_DIR" ]]; then
    echo "Could not find repo-docs skill files under $SOURCE_DIR" >&2
    echo "Expected either skills/repo-docs/ or a direct repo-docs skill directory." >&2
    exit 1
  fi
}

prepare_source() {
  if [[ -n "$SOURCE_DIR" ]]; then
    SOURCE_DIR="$(cd "$SOURCE_DIR" && pwd)"
  else
    local script_dir
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]:-$PWD/install.sh}")" 2>/dev/null && pwd || pwd)"
    if [[ -f "$script_dir/skills/repo-docs/SKILL.md" || -f "$script_dir/SKILL.md" ]]; then
      SOURCE_DIR="$script_dir"
    fi
  fi

  if [[ -z "$SOURCE_DIR" ]] || { [[ ! -f "$SOURCE_DIR/skills/repo-docs/SKILL.md" ]] && [[ ! -f "$SOURCE_DIR/SKILL.md" ]]; }; then
    local tmp
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    local archive="$tmp/repo-docs.tar.gz"
    echo "Downloading $REPO_SLUG@$REF..."
    curl -fsSL "https://codeload.github.com/$REPO_SLUG/tar.gz/$REF" -o "$archive"
    tar -xzf "$archive" -C "$tmp"
    SOURCE_DIR="$(find "$tmp" -maxdepth 1 -type d -name 'repo-docs-skills-*' | head -n 1)"
  fi

  resolve_source_layout
  require_file "$SKILL_DIR/SKILL.md"
  require_file "$SKILL_DIR/REFERENCE.md"
  require_file "$SKILL_DIR/WRITING.md"
  require_file "$SKILL_DIR/PAGE_RULES.md"
  require_file "$SKILL_DIR/SCOPE_MODES.md"
  require_file "$SKILL_DIR/SYNC_RULES.md"
  require_file "$SKILL_DIR/QUALITY_RULES.md"
  require_file "$SKILL_DIR/EXAMPLES.md"
  require_file "$SKILL_DIR/validate_repo_docs.py"
  require_file "$SKILL_DIR/scripts/validate_repo_docs.py"
  require_file "$ZH_SKILL_DIR/SKILL.md"
}

install_to_target() {
  local skills_dir="$1"
  local repo_docs="$skills_dir/repo-docs"
  local repo_docs_zh="$skills_dir/repo-docs-zh"

  mkdir -p "$repo_docs/scripts" "$repo_docs_zh"
  cp "$SKILL_DIR/SKILL.md" \
     "$SKILL_DIR/REFERENCE.md" \
     "$SKILL_DIR/WRITING.md" \
     "$SKILL_DIR/PAGE_RULES.md" \
     "$SKILL_DIR/SCOPE_MODES.md" \
     "$SKILL_DIR/SYNC_RULES.md" \
     "$SKILL_DIR/QUALITY_RULES.md" \
     "$SKILL_DIR/EXAMPLES.md" \
     "$SKILL_DIR/validate_repo_docs.py" \
     "$repo_docs/"
  cp "$SKILL_DIR/scripts/validate_repo_docs.py" "$repo_docs/scripts/"
  cp "$ZH_SKILL_DIR/SKILL.md" "$repo_docs_zh/SKILL.md"

  [[ -f "$repo_docs/SKILL.md" ]] || { echo "Install failed: $repo_docs/SKILL.md missing" >&2; exit 1; }
  [[ -f "$repo_docs_zh/SKILL.md" ]] || { echo "Install failed: $repo_docs_zh/SKILL.md missing" >&2; exit 1; }
  echo "Installed repo-docs skills into $skills_dir"
}

uninstall_from_target() {
  local skills_dir="$1"
  rm -rf "$skills_dir/repo-docs" "$skills_dir/repo-docs-zh"
  echo "Removed repo-docs skills from $skills_dir"
}

resolve_targets

if [[ "$UNINSTALL" -eq 0 ]]; then
  prepare_source
fi

for target in "${TARGETS[@]}"; do
  if [[ "$UNINSTALL" -eq 1 ]]; then
    uninstall_from_target "$target"
  else
    install_to_target "$target"
  fi
done
