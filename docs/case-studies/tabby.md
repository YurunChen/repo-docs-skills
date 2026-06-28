# Case: TabbyML/tabby

This case applies the `repo-docs` build shape to [TabbyML/tabby](https://github.com/TabbyML/tabby), a self-hosted AI coding assistant. GitHub reported 33,654 stars when inspected on 2026-06-27.

The generated pack follows one real behavior: the server starts an Axum router, exposes `/v1/completions`, receives editor segments, optionally gathers retrieval snippets, builds a model prompt, returns a completion response, and logs the event.

Generated files:

- [README.md](generated/tabby/repo-docs/README.md)
- [walkthroughs/completion-request.md](generated/tabby/repo-docs/walkthroughs/completion-request.md)
- [modules/completion-service.md](generated/tabby/repo-docs/modules/completion-service.md)
- [modules/retrieval-snippets.md](generated/tabby/repo-docs/modules/retrieval-snippets.md)
- [references/source-evidence.md](generated/tabby/repo-docs/references/source-evidence.md)
- [glossary.md](generated/tabby/repo-docs/glossary.md)
- [change-log.md](generated/tabby/repo-docs/change-log.md)

Evidence status: Confirmed from current GitHub source unless noted.
