# Terminal Edit Run

This walkthrough follows one Aider terminal session. The reader should finish with a concrete model: launch code prepares configuration and Git state, then a `Coder` instance owns the chat loop and the edit lifecycle.

## Step 1: launch chooses the repo and reads configuration

`main()` starts by deriving a Git root with `get_git_root()` unless a caller supplied `force_git_root`. It prepares `.aider.conf.yml` search paths for the current directory, the Git root, and the home directory, then calls `get_parser(...)` and parses command-line arguments. The same entry also loads dotenv files through `load_dotenv_files(...)`, then parses arguments again so environment-driven options can affect the session.

Source: `aider/main.py` at commit `5dc9490bb35f9729ef2c95d00a19ccd30c26339c`.

## Step 2: Git setup decides whether edits can be tracked

If Git is enabled, `setup_git(...)` either opens an existing repository or asks to initialize one outside the home directory. The helper also calls `check_gitignore(...)`, which adds `.aider*` and `.env` patterns when they are missing. That means the session prepares a safety boundary before files enter the chat or commits are made.

The current tests cover this behavior. `tests/basic/test_main.py` checks that `setup_git` creates `.gitignore`, that `.env` is added when present, and that ignored files stay out of chat unless the user opts into `--add-gitignore-files`.

## Step 3: model selection and IO become a session contract

After environment and argument handling, `main()` selects a model, creates `InputOutput`, creates `Commands`, and creates a `ChatSummary`. These are not separate side paths. They become constructor inputs to `Coder.create(...)`, which is the handoff from process setup to the interactive coding session.

The `Coder.create(...)` class method in `aider/coders/base_coder.py` chooses an edit-format-specific coder class from `aider.coders.__all__`. If the edit format changes during a switch, it summarizes old history so the new coder does not inherit misleading response format examples.

## Step 4: the coder owns files, repo map, linting, tests, and messages

`Coder.__init__` stores the active files, read-only files, Git repo, model, stream setting, and command interface. If repo-map is enabled and the selected coder has a repo-content prompt, it creates `RepoMap(...)`. It also creates `Linter(...)`, installs configured lint commands, and keeps `auto_test` and `test_cmd` for later turns.

This is why the session can answer a user message with more than model text. The coder has the current files, the repository abstraction, command helpers, and verification knobs in one object.

## Step 5: a message eventually runs through `Coder.run()`

When the user passed `--message`, `main()` adds it to input history and calls `coder.run(with_message=args.message)`. Without a one-shot message, the process enters a loop that calls `coder.run()` until the session exits or switches coder mode. A `SwitchCoder` exception creates a new coder while carrying over files, current messages, commits, commands, token counts, and ignore state.

## Step 6: edits are allowed, applied, and optionally committed

The base coder does not blindly write model output. `prepare_to_edit(...)` calls `allowed_to_edit(...)` for each target path, checks ignored files, prompts before editing files outside the chat, creates missing files only with confirmation, and asks Git to make a dirty commit when needed. `apply_updates(...)` then parses edits, applies dry-run filtering, prepares targets, writes edits, and prints each applied path.

When auto-commit is enabled, `auto_commit(...)` calls `GitRepo.commit(...)`. The repo layer builds diffs, creates a commit message from configured models when no explicit message is supplied, and applies attribution options before running `git commit`.

## Verification

Useful checks in the inspected repo:

```bash
python -m pytest tests/basic/test_main.py
python -m pytest tests/basic/test_coder.py
```

The first file directly covers launch, config, environment, Git setup, ignored files, model selection, and command-line flags. The second is the natural next check for coder behavior.

Read next: [CLI session model](../modules/cli-session-model.md) for the object handoff, then [Git safety](../modules/git-safety.md) for edit and commit boundaries.

Evidence status: Confirmed unless noted.
