# Source Evidence

| Reader job | Current source |
| --- | --- |
| Server startup and route assembly | [crates/tabby/src/serve.rs](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/serve.rs) |
| Axum app runner and route exports | [crates/tabby/src/routes/mod.rs](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/routes/mod.rs) |
| `/v1/completions` route handler | [crates/tabby/src/routes/completions.rs](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/routes/completions.rs) |
| Completion request, service, response, tests | [crates/tabby/src/services/completion.rs](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs) |
| Prompt rewrite and retrieval snippets | [crates/tabby/src/services/completion/completion_prompt.rs](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion/completion_prompt.rs) |
| Code search contract and path normalization | [crates/tabby-common/src/api/code.rs](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby-common/src/api/code.rs) |

| Repository fact | Value at inspection |
| --- | --- |
| GitHub repository | `TabbyML/tabby` |
| Description | `Self-hosted AI coding assistant` |
| Stars | `33654` |
| Default branch | `main` |
| Synced source commit | `e8608d6d8f4016b9836a72037f72630d7e993468` |

Evidence status: Confirmed unless noted.
