# Completion Contract

This module keeps request, response, runtime defaults, and verification details for the completion path. Read the walkthrough first if you do not yet understand the behavior.

## Request Fields

| Field | Meaning in this path | Source |
| --- | --- | --- |
| `language` | Optional VS Code-style language identifier; falls back to `unknown` if absent. | [`CompletionRequest`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L41-L65), [`language_or_unknown`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L84-L88) |
| `segments.prefix` | Text before the cursor. This is the main prompt input for segment-based completion. | [`Segments`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L134-L182) |
| `segments.suffix` | Optional text after the cursor. Empty or missing suffix becomes a newline during prompt templating. | [`get_default_suffix`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs#L94-L98) |
| `segments.filepath` | Optional path for the edited file; used when building indexed-code search queries. | [`Segments`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L142-L150), [`collect_snippets`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs#L206-L220) |
| `segments.git_url` | Optional repository identity; indexed search requires it and an allowed repository match. | [`PromptBuilder::collect`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs#L61-L71) |
| `segments.declarations` | Editor-provided declaration snippets with highest snippet priority. | [`extract_snippets_from_segments`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs#L145-L165) |
| `segments.relevant_snippets_from_changed_files` | Editor-provided snippets from recently changed files, used after declarations. | [`extract_snippets_from_segments`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs#L167-L181) |
| `segments.relevant_snippets_from_recently_opened_files` | Editor-provided snippets from recently opened files, used after changed-file snippets. | [`extract_snippets_from_segments`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs#L183-L197) |
| `debug_options.raw_prompt` | Direct model prompt; when present, segment-based prompt construction is skipped. | [`raw_prompt`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L90-L95), [`generate`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L382-L405) |
| `debug_options.return_snippets` | Includes collected snippets in `debug_data`. | [`DebugOptions`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L110-L128), [`debug_data`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L425-L431) |
| `debug_options.return_prompt` | Includes final prompt in `debug_data`. | [`DebugOptions`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L110-L128), [`debug_data`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L425-L431) |
| `debug_options.disable_retrieval_augmented_code_completion` | Skips snippet collection. | [`build_snippets`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L315-L329) |
| `temperature` | Optional sampling temperature passed into generation options. | [`text_generation_options`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L331-L356) |
| `seed` | Optional generation seed passed into generation options. | [`text_generation_options`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L331-L356) |
| `mode` | Defaults to `standard`; `next_edit_suggestion` takes a separate prompt path requiring `segments.edit_history`. | [`default_standard_mode`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L62-L70), [`generate_next_edit_suggestion`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L441-L500) |

## Response Fields

| Field | Meaning | Source |
| --- | --- | --- |
| `id` | Generated completion id with `cmpl-` prefix. | [`generate`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L358-L365) |
| `choices[0].text` | Generated model text. | [`Choice`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L223-L233), [`generate`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L433-L438) |
| `debug_data.snippets` | Present only when requested by debug options. | [`DebugData`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L274-L280), [`generate`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L425-L431) |
| `debug_data.prompt` | Present only when requested by debug options. | [`DebugData`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L274-L280), [`generate`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L425-L431) |
| `mode` | `standard` for normal completions, `next_edit_suggestion` for next-edit mode. | [`CompletionResponse`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L242-L280), [`generate_next_edit_suggestion`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L494-L499) |

## Runtime Defaults And Route Behavior

| Item | Value or behavior | Source |
| --- | --- | --- |
| Default host | `0.0.0.0` | [`ServeArgs`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/serve.rs#L93-L97) |
| Default port | `8080` | [`ServeArgs`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/serve.rs#L93-L97) |
| Default device | `cpu` | [`ServeArgs`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/serve.rs#L99-L101) |
| Default completion timeout | `30` seconds | [`ServerConfig`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby-common/src/config.rs#L233-L245) |
| Default completion max input length | `1536` characters | [`CompletionConfig`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby-common/src/config.rs#L386-L418) |
| Default max decoding tokens | `64` | [`CompletionConfig`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby-common/src/config.rs#L386-L418) |
| Completion route absent model | `/v1/completions` returns `501 Not Implemented` when no completion service exists. | [`api_router`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/serve.rs#L289-L310) |
| Service error at route | Route logs the error and returns `400 Bad Request`. | [`crates/tabby/src/routes/completions.rs`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/routes/completions.rs#L39-L47) |

## Verification Commands

Fast unit tests for the scoped behavior:

```bash
cargo test -p tabby services::completion::tests::test_completion_service
cargo test -p tabby services::completion::tests::test_contains_crlf
cargo test -p tabby services::completion::tests::test_override_prompt
cargo test -p tabby services::completion::tests::test_override_generated
cargo test -p tabby services::completion::completion_prompt::tests::test_collect_snippets
cargo test -p tabby services::completion::completion_prompt::tests::test_prompt_template
```

End-to-end server check:

```bash
cargo test -p tabby run_golden_tests_cpu
```

Manual request shape from project docs:

```bash
curl -X 'POST' \
  'http://localhost:8080/v1/completions' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "language": "python",
  "segments": {
    "prefix": "def fib(n):\n    ",
    "suffix": "\n        return fib(n - 1) + fib(n - 2)"
  }
}'
```

## Where to read next

Return to [the completion pipeline](completion-pipeline.md) for the mechanism that uses these fields, or audit the claim sources in [the source evidence ledger](../references/source-evidence.md).

Evidence status: Confirmed unless noted.
