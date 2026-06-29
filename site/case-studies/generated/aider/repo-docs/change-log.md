# Change Log

## 2026-06-29 13:30 CST

- Trigger: Initial `repo-docs` build for the current Aider repository.
- Scope: Documented the CLI edit workflow from terminal startup through `Coder.create()`, `send_message()`, diff-style edit parsing, file permission checks, dirty-file protection, reflection, lint/test hooks, and auto-commit.
- Changed pages: `README.md`, `walkthroughs/one-real-run.md`, `modules/session-assembly.md`, `modules/edit-lifecycle.md`, `references/source-evidence.md`, `references/quality-review.md`, `glossary.md`, and root `AGENTS.md`.
- Verification: Source inspection completed for the scoped path. Focused pytest was attempted but blocked during import because the current Python environment is missing `oslex`. Repo-docs validator issues were fixed after the first validator run.
- Synced through 5dc9490bb.
