# Retrieval Snippets

## Plain model

Tabby can enrich a completion prompt with nearby code context. It prefers snippets already supplied by the editor, then falls back to repository code search when the request includes a Git URL that matches an allowed repository.

## Code model

`PromptBuilder.collect(...)` starts with a character budget. It calls `extract_snippets_from_segments(...)`, which reads declarations first, then snippets from changed files, then snippets from recently opened files. If those snippets consume too much budget, code search is skipped.

When budget remains, `collect(...)` requires three conditions before repository search:

| Condition | Why it matters |
| --- | --- |
| `code` service exists | Search must be configured. |
| `segments.git_url` exists | The request must identify a repository. |
| `AllowedCodeRepository.closest_match(git_url)` returns a source id | The server must permit that repository. |

`collect_snippets(...)` builds a `CodeSearchQuery`, calls `search_in_language(...)`, ignores `NotReady`, logs parser and Tantivy errors, and appends hits until the snippet character budget is exhausted.

`rewrite_with_snippets(...)` turns snippets into comments at the top of the prompt when the language has a line comment marker. This lets the model see path and snippet body without changing the code prefix itself.

## Verify

Inspect `crates/tabby/src/services/completion/completion_prompt.rs` and `crates/tabby-common/src/api/code.rs`. Tests cover snippet extraction, prompt templates, readable prefix rewriting, code-search `NotReady`, and path normalization.

Evidence status: Confirmed unless noted.
