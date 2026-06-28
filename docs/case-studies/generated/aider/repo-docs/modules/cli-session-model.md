# CLI Session Model

## Plain model

Aider turns a shell invocation into a long-lived coding session. The shell side gathers facts: args, config files, dotenv values, Git root, selected model, IO colors, history files, and runtime flags. The session side is the `Coder` object. Once `Coder.create(...)` returns, most later behavior routes through that object or through helpers attached to it.

## Code model

`aider/main.py` is the session assembler. It calls `get_parser(...)`, `load_dotenv_files(...)`, `select_default_model(...)`, builds `InputOutput`, creates `Commands`, creates `ChatSummary`, and passes the pieces into `Coder.create(...)`.

`aider/coders/base_coder.py` is the session owner. `Coder.create(...)` chooses the edit-format class. `Coder.__init__` keeps the active files, repo, model, command object, summarizer, repo map, linter, test command, and stream flags.

The important boundary is the switch from argument state to object state. Before `Coder.create(...)`, values are still launch configuration. After it, those values are behavior: edit permission, repo-map generation, chat history, linting, testing, and commit flow all read from the coder.

## Verify

Inspect `tests/basic/test_main.py` for launch behavior. It checks config precedence, `.env` loading, Git setup, ignored file handling, `--message`, model selection, and reasoning option flags.

Read next: [terminal edit run](../walkthroughs/terminal-edit-run.md) if you want the full behavior path, or [source evidence](../references/source-evidence.md) for exact files.

Evidence status: Confirmed unless noted.
