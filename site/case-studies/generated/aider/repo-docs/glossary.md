# Glossary

| Term | Plain meaning | Further reading |
| --- | --- | --- |
| `Coder` | The session object that owns chat context, model sending, edit parsing, file writes, reflection, lint/test hooks, and optional commits. | [One real run](walkthroughs/one-real-run.md) |
| `main()` | The CLI entrypoint that turns arguments, config, environment, git state, and mode flags into a configured Aider session. | [Session assembly](modules/session-assembly.md) |
| `Coder.create()` | The factory that chooses the concrete coder class for an edit format and carries session context when switching coders. | [Session assembly](modules/session-assembly.md) |
| `send_message()` | The method that formats the conversation, sends it to the model layer, captures the reply, and starts the post-reply edit checks. | [One real run](walkthroughs/one-real-run.md) |
| `apply_updates()` | The shared method that parses proposed edits, dry-runs them, checks file authority, writes accepted edits, and reflects malformed output. | [Edit lifecycle](modules/edit-lifecycle.md) |
| `prepare_to_edit()` | The step inside `apply_updates()` that checks target-file authority and creates dirty-work checkpoints before final writes. | [Edit lifecycle](modules/edit-lifecycle.md) |
| `check_for_dirty_commit()` | The check that marks an already-dirty target file for a pre-edit checkpoint commit. | [One real run](walkthroughs/one-real-run.md) |
| `allowed_to_edit()` | The file authority check that decides whether a proposed target is already allowed, gitignored, new, or outside the chat. | [Edit lifecycle](modules/edit-lifecycle.md) |
| `dirty_commit()` | The method that commits marked dirty target files before the model edit is written. | [Edit lifecycle](modules/edit-lifecycle.md) |
| `EditBlockCoder` | The concrete coder for diff-style SEARCH/REPLACE edits. | [One real run](walkthroughs/one-real-run.md) |
| `EditBlockCoder.get_edits()` | The parser entrypoint that turns assistant text into structured diff edit tuples. | [Edit lifecycle](modules/edit-lifecycle.md) |
| `EditBlockCoder.apply_edits()` | The concrete write path for SEARCH/REPLACE edits, including the no-match error message. | [Edit lifecycle](modules/edit-lifecycle.md) |
| `ValueError` | The exception family this path uses to signal malformed or non-applicable edit output for reflection. | [Edit lifecycle](modules/edit-lifecycle.md) |
| Edit format | The protocol a concrete coder expects the model to use when proposing changes, such as diff-style SEARCH/REPLACE blocks. | [Edit lifecycle](modules/edit-lifecycle.md) |
| In-chat file | A file that has been added to the current session’s editable context. Aider treats it differently from files merely present in the repo. | [Edit lifecycle](modules/edit-lifecycle.md) |
| Reflected message | Feedback stored for the next model turn when an edit, lint, or test check fails. | [Edit lifecycle](modules/edit-lifecycle.md) |
| Dirty commit | A checkpoint commit for user changes that existed before Aider applies a model edit to the same target file. | [One real run](walkthroughs/one-real-run.md) |
| Auto-commit | A commit Aider may create after applying its own edit when git and options allow it. | [Edit lifecycle](modules/edit-lifecycle.md) |
| Source evidence | The guide’s claim ledger linking explanations to inspected source, tests, commands, and caveats. | [Source evidence](references/source-evidence.md) |
