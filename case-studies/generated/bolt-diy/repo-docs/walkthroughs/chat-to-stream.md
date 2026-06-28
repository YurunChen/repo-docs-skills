# Chat To Stream

This walkthrough follows one build-mode chat request in bolt.diy. The reader should finish with a working model: the API route prepares messages and context, the model layer chooses a provider, and the response is streamed back as event data.

## Step 1: the Remix action delegates to chat handling

`app/routes/api.chat.ts` exports `action(args)` and immediately calls `chatAction(args)`. The handler reads JSON fields such as `messages`, `files`, `promptId`, `contextOptimization`, `chatMode`, `designScheme`, `supabase`, and `maxLLMSteps`. It also parses provider and API key data from cookies.

This means the API route receives both user text and the current project file map. The file map is what later enables context-buffer selection.

## Step 2: stream recovery and progress annotations are prepared

The handler creates `StreamRecoveryManager` with timeout and retry settings, creates `SwitchableStream`, tracks cumulative token usage, and increments a progress counter as summary, context, and response work happen. Progress annotations are written to the outgoing data stream so the UI can show work states while generation proceeds.

## Step 3: MCP tool results are folded into messages

Before model generation, the route gets `MCPService.getInstance()` and calls `processToolInvocations(messages, dataStream)`. The service only executes tool results that exist in the registered tool set and have an approved result state. When a tool runs, it writes a `tool_result` stream part and returns updated message parts.

This keeps tool approval and tool execution outside the main model prompt assembly.

## Step 4: optional context optimization selects files

When the request includes files and `contextOptimization` is enabled, the route first calls `createSummary(...)`, then calls `selectContext(...)`. The selector removes ignored paths, asks the current provider model to return `<updateContextBuffer>` tags, validates included paths against available files, and returns a smaller file map.

The route writes the selected file paths back as a `codeContext` message annotation. The next model call can use these files without loading the whole project.

## Step 5: streaming options wire tools and continuation behavior

The route builds `StreamingOptions` with Supabase connection state, `toolChoice: 'auto'`, tools without execute functions, `maxSteps`, and an `onStepFinish` hook. That hook processes model tool calls through `mcpService.processToolCall(...)`, adding tool-call annotations to the stream.

If a response ends because of token length, the handler appends the partial assistant content and a continuation prompt, then calls `streamText(...)` again. `MAX_RESPONSE_SEGMENTS` limits how many continuation switches are allowed.

## Step 6: `streamText` chooses provider, model, prompt, and token parameters

`app/lib/.server/llm/stream-text.ts` sanitizes previous assistant and user content, extracts model and provider metadata from the last user message, locates model details through `LLMManager`, builds the system prompt from `PromptLibrary`, adds context files in build mode, adds locked-file warnings when needed, and chooses token parameters.

Reasoning models receive `maxCompletionTokens` and a filtered option set. Other models receive `maxTokens`. The final call goes through the AI SDK `streamText` function.

## Step 7: the HTTP response returns event-stream bytes

The route converts stream chunks into bytes through a `TransformStream`, wraps thought chunks in the special `__boltThought__` div shape, and returns a `Response` with `Content-Type: text/event-stream; charset=utf-8`, `Connection: keep-alive`, and `Cache-Control: no-cache`.

## Verification

Useful checks in the inspected repo:

```bash
pnpm test
pnpm lint
```

For this specific path, inspect `app/routes/api.chat.ts`, `app/lib/.server/llm/stream-text.ts`, `app/lib/.server/llm/select-context.ts`, and `app/lib/services/mcpService.ts`.

Read next: [context buffer](../modules/context-buffer.md), then [MCP tool loop](../modules/mcp-tool-loop.md).

Evidence status: Confirmed unless noted.
