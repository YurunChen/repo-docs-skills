# Completion Pipeline

## Why the route is only the boundary

The completion pipeline is the boundary between "an editor asked for help" and "a model returned text." The route does only HTTP-level work: parse JSON, attach user and repository context, and translate service errors into status codes. The service owns the behavior that changes the request into a model prompt.

The key idea is that completions depend on both runtime setup and request shape. If no completion model is configured, the route exists but returns `501 Not Implemented`. If a completion model exists, the request still needs either a raw prompt or editor segments. Segment requests may also carry local context, repository identity, and debug switches that alter prompt construction.

## How one request becomes model text

`serve::main` builds the service once and installs it into the router. `CompletionService::generate` then handles each request:

```text
CompletionRequest
-> choose raw_prompt or segments
-> collect optional snippets
-> build prompt template input
-> call CodeGeneration
-> log Event::Completion
-> return CompletionResponse
```

The route/service split is visible in [`crates/tabby/src/routes/completions.rs`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/routes/completions.rs#L26-L48) and [`CompletionService::generate`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby/src/services/completion.rs#L358-L439). Config defaults come from [`CompletionConfig`](https://github.com/TabbyML/tabby/blob/e8608d6d8f4016b9836a72037f72630d7e993468/crates/tabby-common/src/config.rs#L386-L418), where the default max input length is 1536 characters and default max decoding tokens is 64.

The main boundary to remember is `CompletionError::EmptyPrompt`: a standard completion without `debug_options.raw_prompt` and without `segments` cannot build a model input, so the route returns `400 Bad Request`.

## Where to read next

Read [the walkthrough](../walkthroughs/one-real-run.md) to see the pipeline as one request. Read [how retrieval context enters the prompt](retrieval-context.md) for the non-trivial prompt enrichment path, or use [the completion contract reference](../references/completion-contract.md) for exact fields and commands.

Evidence status: Confirmed unless noted.
