# Glossary

| Term | Plain meaning | Further reading |
| --- | --- | --- |
| Chat stream | The server-sent response path that carries progress, model output, annotations, and errors for `/api/chat`. | [Chat stream](modules/chat-stream.md) |
| Context optimization | The optional summary and selected-file path that reduces project context before the final model call. | [One real run](walkthroughs/one-real-run.md) |
| Provider tag | The `[Provider: ...]` text inserted into user messages so the server can resolve the selected provider. | [Provider and model selection](modules/provider-model-selection.md) |
| Model tag | The `[Model: ...]` text inserted into user messages so the server can resolve the selected model. | [Provider and model selection](modules/provider-model-selection.md) |
| Code context | The selected files added to the build-mode prompt as a context buffer. | [Chat API contract](modules/chat-api-contract.md) |
| MCP step limit | The maximum number of model/tool steps passed from settings into the chat request. | [Chat API contract](modules/chat-api-contract.md) |
| Reasoning model | A model name matching the current `o1`, `o3`, or `gpt-5` prefix check, which uses `maxCompletionTokens`. | [Provider and model selection](modules/provider-model-selection.md) |
| `streamText()` | The server helper that resolves the selected provider/model, builds the prompt, and calls the AI SDK stream. | [Provider and model selection](modules/provider-model-selection.md) |
| `selectContext()` | The server helper that asks a model to choose a small set of relevant files for the current request. | [Chat stream](modules/chat-stream.md) |
| `<updateContextBuffer>` | The XML-like wrapper `selectContext()` requires when a model includes or excludes context files. | [Chat stream](modules/chat-stream.md) |
| `LLMManager` | The registry object that owns provider registration and static/dynamic model lookup. | [Provider and model selection](modules/provider-model-selection.md) |
| `useChat` | The Vercel AI SDK React hook that posts chat messages and body data to `/api/chat`. | [Chat API contract](modules/chat-api-contract.md) |
| `apiKeys` | The request body and cookie value that carry provider API keys into the chat route. | [Chat API contract](modules/chat-api-contract.md) |
| `promptId` | The request field that identifies the selected prompt-library entry. | [Chat API contract](modules/chat-api-contract.md) |
| `chatMode` | The request field that chooses the build prompt path or discuss prompt path. | [Chat API contract](modules/chat-api-contract.md) |
| `codeContext` | The stream annotation that reports which files were selected for prompt context. | [Chat API contract](modules/chat-api-contract.md) |
| `designScheme` | Optional design guidance sent with the chat request and passed into prompt construction. | [Chat API contract](modules/chat-api-contract.md) |
| `maxLLMSteps` | The request field that caps model/tool-call steps for the AI SDK stream options. | [Chat API contract](modules/chat-api-contract.md) |
| `chatSummary` | A stream annotation carrying the generated chat summary used during context optimization. | [Chat API contract](modules/chat-api-contract.md) |
| `contextOptimization` | The request flag that enables summary generation and selected-file context when files are present. | [Chat API contract](modules/chat-api-contract.md) |
| `maxTokens` | The AI SDK token limit parameter used for non-reasoning models in the current stream path. | [Provider and model selection](modules/provider-model-selection.md) |
