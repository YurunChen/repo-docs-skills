# Glossary

| Term | Plain meaning | Further reading |
| --- | --- | --- |
| Completion request | The JSON payload sent to `/v1/completions` with language, editor segments, debug options, and optional generation knobs. | [Completion contract module](modules/completion-contract.md) |
| `CompletionRequest` | The Rust request struct that represents the completion JSON after Axum parses the body. | [Completion contract module](modules/completion-contract.md) |
| `CompletionResponse` | The Rust response struct serialized back to JSON after model generation finishes. | [Completion contract module](modules/completion-contract.md) |
| `CompletionService::generate` | The per-request service method that chooses the prompt source, builds generation options, calls the model, logs the event, and returns the completion response. | [Completion pipeline](modules/completion-pipeline.md) |
| `CompletionError::EmptyPrompt` | The service error used when a completion request has neither a raw prompt nor the required segment/edit-history input for its mode. | [One real run](walkthroughs/one-real-run.md) |
| `serve::main` | The server startup function that merges config, loads model services, creates routers, and starts the Axum app. | [One real run](walkthroughs/one-real-run.md) |
| Segment | The editor-state object holding text before the cursor, optional text after it, file/repository identity, and optional snippets. | [One real run](walkthroughs/one-real-run.md) |
| Raw prompt | A debug path where the caller supplies the full model prompt and bypasses segment-based prompt building. | [Completion pipeline](modules/completion-pipeline.md) |
| `debug_options.raw_prompt` | The request field that bypasses segment prompt building and sends caller-provided prompt text to inference. | [Completion contract module](modules/completion-contract.md) |
| Retrieval context | Extra code snippets added to the prompt before the current prefix so the model can see related code. | [Retrieval context](modules/retrieval-context.md) |
| `PromptBuilder::collect` | The snippet collection method that combines editor-provided snippets with optional indexed-code search. | [Retrieval context](modules/retrieval-context.md) |
| Allowed code repository | The route/server-side repository allowlist used before indexed code search can use a request `git_url`. | [Retrieval context](modules/retrieval-context.md) |
| `AllowedCodeRepository` | The source type that carries the allowed repository set into the completion route and prompt builder. | [Retrieval context](modules/retrieval-context.md) |
| Prompt template | The model-specific string that arranges prefix and suffix into the form expected by the completion backend. | [Completion pipeline](modules/completion-pipeline.md) |
| `CompletionConfig` | The shared configuration object that provides completion defaults such as max input length and max decoding tokens. | [Completion contract module](modules/completion-contract.md) |
| `ServeArgs` | The CLI argument shape used during server startup, including host, port, device, and model override fields. | [Completion contract module](modules/completion-contract.md) |
| `DebugData` | The optional response object that can include collected snippets or the final prompt when debug options request them. | [Completion contract module](modules/completion-contract.md) |
| `DebugOptions` | The request object that enables raw prompt override, returned snippets, returned prompt, or retrieval disablement. | [Completion contract module](modules/completion-contract.md) |
| `segments.git_url` | The request field that identifies the repository for indexed-code search when repository access is allowed. | [Completion contract module](modules/completion-contract.md) |
| Golden test | An end-to-end test that starts a Tabby server, posts real completion requests, and snapshots the JSON result. | [Source evidence](references/source-evidence.md) |
| `400 Bad Request` | The HTTP status the completion route returns when the service rejects a malformed or incomplete completion request. | [Completion contract module](modules/completion-contract.md) |
| `501 Not Implemented` | The HTTP status registered for `/v1/completions` when the server has no completion service because no completion model is configured. | [Completion contract module](modules/completion-contract.md) |
