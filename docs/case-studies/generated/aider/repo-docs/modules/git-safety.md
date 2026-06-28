# Git Safety

## Plain model

Aider treats Git as the boundary that makes edits reversible and explainable. It first finds one repository, filters ignored files, prepares `.gitignore`, and then uses commits to preserve before-and-after states when auto-commit behavior is enabled.

## Code model

`GitRepo.__init__` in `aider/repo.py` resolves the repository from the supplied files or working directory. If files point at multiple repositories, it errors instead of making one session span unrelated repos.

`GitRepo.get_tracked_files()` reads committed tree files and staged files, normalizes paths, and removes files matched by `.aiderignore`. `GitRepo.path_in_repo(...)` uses that tracked-file set when edit permission code needs to know whether a path is already part of the repo.

`Coder.allowed_to_edit(...)` in `aider/coders/base_coder.py` uses this repo model before a write. It blocks Git-ignored files unless the user opted in, asks before editing files that were not added to the chat, creates missing files only after confirmation, and adds new repo files when auto-commit is active.

`GitRepo.commit(...)` is the commit boundary. It builds diffs, asks the model for a commit message when needed, applies author and committer attribution rules, and then calls `git commit`.

## Verify

`tests/basic/test_main.py` covers `.gitignore`, ignored files, and launch-time Git behavior. Source inspection also shows direct checks in `Coder.allowed_to_edit(...)` and `GitRepo.commit(...)`.

Read next: [source evidence](../references/source-evidence.md) for the exact paths used by this case.

Evidence status: Confirmed unless noted.
