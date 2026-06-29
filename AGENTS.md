# Agent Instructions

## Project Shape

This repository publishes the `repo-docs` and `repo-docs-zh` skills.

- Skill source of truth lives in `skills/repo-docs/` and `skills/repo-docs-zh/`.
- `site/` is the homepage source.
- `docs/` is the GitHub Pages publish tree; keep mirrored public files in sync with source changes.
- `docs/SKILL.md` must match `skills/repo-docs/SKILL.md`.

## Change Rules

- Keep natural-language installation in README and site copy; command-line install may stay in details.
- When editing skill rules, update the source skill first, then mirror required public files under `docs/`.
- Keep `site/` and `docs/` mirrored for homepage assets and generated case studies.
- Use repo-relative commands and portable environment variables in committed docs.
- Keep personal absolute paths, local usernames, private tool paths, machine-specific install targets, and local-only verification notes out of committed files.

## Suggested Checks

```bash
bash -n install.sh
python -m py_compile skills/repo-docs/scripts/validate_repo_docs.py skills/repo-docs/validate_repo_docs.py docs/scripts/validate_repo_docs.py docs/validate_repo_docs.py
python skills/repo-docs/scripts/validate_repo_docs.py docs/case-studies/generated/aider/repo-docs
python skills/repo-docs/scripts/validate_repo_docs.py docs/case-studies/generated/bolt-diy/repo-docs
python skills/repo-docs/scripts/validate_repo_docs.py docs/case-studies/generated/tabby/repo-docs
git diff --check -- .
```
