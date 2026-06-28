# Context Buffer

## Plain model

bolt.diy does not send every project file to the model when context optimization is enabled. It asks a model to choose a small set of relevant files, validates those paths against the known file map, and then inserts those files into the build-mode system prompt.

## Code model

`selectContext(...)` receives `messages`, `files`, provider settings, and a prior summary. It removes ignored paths using `IGNORE_PATTERNS`, preserves any current `codeContext` annotation, and asks the selected provider model to return only an `<updateContextBuffer>` block.

The parser extracts `<includeFile path="...">` and `<excludeFile path="...">` tags. A requested include is accepted only when the full path exists in the current file list. If the selector returns no files, the function throws `Bolt failed to select files`.

`streamText(...)` later receives `contextFiles`. In build mode, when context optimization is on, it calls `createFilesContext(contextFiles, true)` and appends that content to the system prompt under `CONTEXT BUFFER`.

## Verify

Inspect `app/lib/.server/llm/select-context.ts` for path filtering and response parsing. Inspect `app/lib/.server/llm/stream-text.ts` for prompt insertion.

Read next: [chat to stream](../walkthroughs/chat-to-stream.md) for the full request path.

Evidence status: Confirmed unless noted.
