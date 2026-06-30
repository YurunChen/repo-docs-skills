# Chat stream

## Why the stream carries more than answer text

The chat stream is the server-side work that turns a rich browser request into a sequence of progress events, model tokens, annotations, and errors. It has to preserve enough context for code work while keeping the model call bounded. That is why the route can summarize history, select files, attach annotations, and continue a response when the model stops at a token limit.

The stream is not only the answer text. It also carries `progress`, `chatSummary`, `codeContext`, and `usage` annotations that let the UI understand what happened around the answer. Source: [progress and annotations in `api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L121).

## How the route builds and merges the stream

The route creates an AI SDK data stream, performs pre-response work inside `execute()`, then merges the lower-level AI SDK stream into that data stream. Context optimization is conditional: it only runs when the request has files and `contextOptimization` is true. The route accumulates token usage from summary, context selection, and final response calls before writing the final `usage` annotation. Source: [context optimization and usage accumulation](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L121).

The lower-level `streamText()` call is responsible for prompt construction. In build mode it adds selected code context and an optional summary to the system prompt. It also adds a locked-file warning when any workbench file carries `isLocked`. Source: [system prompt assembly](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/.server/llm/stream-text.ts#L165).

The main boundary is selector output. `selectContext()` requires a model-generated XML-like wrapper and throws on invalid format or zero selected files. That keeps context selection explicit, but it also means context optimization can fail before the final model call begins. Source: [selector parse and failure checks](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/.server/llm/select-context.ts#L179).

Minimal selector response shape:

```xml
<updateContextBuffer>
  <includeFile path="app/example.tsx"/>
  <excludeFile path="app/old-context.ts"/>
</updateContextBuffer>
```

## Where to read next

To see the stream in motion, read [the prompt-to-stream walkthrough](../walkthroughs/one-real-run.md). For exact payload fields and stream annotations, use [the chat API contract](../references/chat-api-contract.md).

Evidence status: Confirmed unless noted.
