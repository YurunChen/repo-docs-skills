# Tabby repo-docs

Tabby is a self-hosted AI coding assistant. The useful first model is a completion service: the server starts with configured models, exposes editor-facing HTTP routes, receives cursor segments, optionally enriches the prompt with retrieval snippets, generates completion text, and logs the event.

Start with [completion request](walkthroughs/completion-request.md). It follows one `/v1/completions` request from route registration to model output. If you already know the route, read [completion service](modules/completion-service.md) or [retrieval snippets](modules/retrieval-snippets.md).

Exact source links live in [source evidence](references/source-evidence.md). Repeated terms are in [glossary](glossary.md).

Scope note: this pack covers the open-source completion route and service path. It does not cover enterprise webserver behavior, all IDE clients, model download internals, or the website.

Evidence status: Confirmed unless noted.
