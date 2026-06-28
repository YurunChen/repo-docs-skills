# Completion Request

This walkthrough follows one Tabby `/v1/completions` request. The reader should finish with a concrete model: the server wires routes around model services, the route validates request shape, the completion service builds a prompt from editor segments and snippets, and a JSON completion response returns to the client.

## Step 1: serve builds model-backed API state

`crates/tabby/src/serve.rs` merges CLI args into config, loads configured models, creates optional embedding and code-search services, creates event logging, then calls `create_completion_service_and_chat(...)`. The returned `CompletionService` is placed behind an Axum route if completion is configured.

The same file exposes `/v1/completions`, `/v1/chat/completions`, health, model, event, and setting routes depending on available services.

## Step 2: the router adds CORS, metrics, UI, and the socket

`crates/tabby/src/routes/mod.rs` defines `run_app(...)`. It layers permissive CORS and Prometheus metrics over the API router, adds `/metrics`, optionally merges a UI router, binds a TCP listener, prints the version and address, and serves the Axum app.

## Step 3: the completion route receives editor state

`crates/tabby/src/routes/completions.rs` handles `POST /v1/completions`. It extracts `CompletionService` from state, `AllowedCodeRepository` from an extension, an optional user from headers, an optional user agent, and a JSON `CompletionRequest`. If a user header is present, it writes that user into the request before generation.

Errors from generation become `400 Bad Request`; successful responses are returned as JSON.

## Step 4: request shape separates prompt, segments, and debug controls

`CompletionRequest` in `crates/tabby/src/services/completion.rs` can carry a language, cursor `segments`, user, debug options, temperature, seed, and mode. `segments` hold prefix, suffix, filepath, git URL, declarations, changed-file snippets, recently-opened snippets, clipboard, and edit history.

If `debug_options.raw_prompt` exists, the service bypasses segment prompt building. If no raw prompt and no segments exist, generation fails with `CompletionError::EmptyPrompt`.

## Step 5: snippets can enrich the prompt

For standard completion mode, `CompletionService.generate(...)` builds `CodeGenerationOptions`, checks whether CRLF line endings should be preserved, and calls `build_snippets(...)`. Snippets come from declarations, changed files, recently opened files, and code search when a matching allowed repository exists.

`completion_prompt.rs` owns this collection and prompt rewrite. It limits snippet characters, uses declarations first, uses changed and recently opened snippets next, then asks `CodeSearch` only if there is enough remaining prompt budget and a matching `git_url`.

## Step 6: generation returns choices and optional debug data

The service builds a prompt, calls `self.engine.generate(&prompt, options).await`, restores CRLF line endings when needed, logs an `Event::Completion`, and returns `CompletionResponse` with one `Choice`. If debug options ask for snippets or prompt, the response includes those fields inside `debug_data`.

## Verification

Useful checks in the inspected repo:

```bash
cargo test -p tabby
cargo test -p tabby-common
```

The source includes unit tests for prompt templates, snippet extraction, CRLF handling, completion service behavior, and path normalization.

Read next: [completion service](../modules/completion-service.md), then [retrieval snippets](../modules/retrieval-snippets.md).

Evidence status: Confirmed unless noted.
