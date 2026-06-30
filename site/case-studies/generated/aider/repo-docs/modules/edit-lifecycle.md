# Edit Lifecycle

## Why edits are gated before writes

An assistant reply is only a proposal. Before any file changes, the tool asks a short sequence of questions: does the proposal make sense, is the target allowed, would it overwrite user work, and what feedback should return if something fails?

The lifecycle gates are:

| Gate | Question answered |
| --- | --- |
| Parse | Did the model reply use an edit format this coder understands? |
| Dry run | Can the proposed edit be applied as structured edits before touching files? |
| Permission | Is each target file already approved for this session? |
| Dirty-work checkpoint | Does a target file need a pre-edit commit so user work remains undoable? |
| Write | Can the concrete coder apply the edit to disk? |
| Reflect | If parsing or matching failed, what feedback should the model see next? |
| Verify | Should lint, shell output, or tests feed back into the conversation? |

This is the concept behind the walkthrough’s hard part: the system is designed for model output that may be wrong, incomplete, or pointed at the wrong file.

## How proposals become checked file changes

The shared lifecycle lives in `Coder.apply_updates()`. It asks the concrete coder for edits, runs a dry-run application, filters edits through the preparation step, then asks the concrete coder to apply the edits for real. For diff-style edits, `EditBlockCoder` parses and applies SEARCH/REPLACE blocks.

The concrete diff coder has two notable behaviors. First, a replacement must match real file content, with a fallback that can search other in-chat files when the named file does not match. Second, failure raises a detailed edit-format error that includes the failed block and sometimes nearby matching lines. The shared lifecycle catches that error and stores it as reflected feedback.

The file authority rules live in the allowed-to-edit step: in-chat files are allowed, gitignored files are skipped, missing files require create confirmation, and existing files outside the chat require confirmation before they are added to the editable set.

The git protection rules live in the dirty-check, preparation, and dirty-commit steps. A dirty target file can be committed before Aider writes the model edit. Later, the auto-commit step commits the Aider edit itself when repo and options allow it.

## How to verify the lifecycle

Use these focused tests to verify the concept:

```bash
python -m pytest tests/basic/test_editblock.py::TestUtils::test_full_edit tests/basic/test_editblock.py::TestUtils::test_full_edit_dry_run
python -m pytest tests/basic/test_coder.py::TestCoder::test_gpt_edit_to_dirty_file tests/basic/test_coder.py::TestCoder::test_only_commit_gpt_edited_file
```

The tests prove successful edit application, dry-run no-write behavior, dirty-file pre-commit, and edited-file-only commit scope.

## Where to read next

For the end-to-end flow, read [the walkthrough of one terminal request becoming an edit](../walkthroughs/one-real-run.md). For exact claim support, audit [the source evidence ledger](../references/source-evidence.md).

Evidence status: Confirmed unless noted.
