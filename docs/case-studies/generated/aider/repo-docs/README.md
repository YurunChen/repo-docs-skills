# Aider repo-docs

Aider is a terminal pair-programming assistant. The useful first model is not "a Python CLI with many options"; it is a session builder that turns command-line state, environment files, Git status, model selection, and selected files into one `Coder` object that can talk, edit, lint, test, and commit.

Start with [the terminal edit run](walkthroughs/terminal-edit-run.md). It follows one observable path from `aider` launch to `Coder.run()`. If you already know the CLI shape, jump to [CLI session model](modules/cli-session-model.md) for how arguments and runtime objects become one session, or [Git safety](modules/git-safety.md) for how tracked files and auto-commit behavior are protected.

Exact evidence lives in [source-evidence](references/source-evidence.md). Repeated project terms are in [glossary](glossary.md).

Scope note: this pack covers the terminal edit path only. It does not cover the Streamlit GUI, every coder edit format, benchmark scripts, or the website.

Evidence status: Confirmed unless noted.
