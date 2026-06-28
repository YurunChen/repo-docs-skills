# MCP Tool Loop

## Plain model

bolt.diy separates tool registration, model-visible tool declarations, approval handling, and actual execution. The model can see tool descriptions, but execution happens only after the UI has returned an approved tool invocation result.

## Code model

`MCPService` owns the MCP server config and registered tools. It can create stdio, SSE, or streamable HTTP clients, then stores both executable tools and `toolsWithoutExecute`. The API route passes `toolsWithoutExecute` to the model call, so the model sees tool schemas without receiving direct execute functions.

When the model emits a tool call, `processToolCall(...)` writes a `toolCall` message annotation with the server and tool name. When a later message returns a tool invocation result, `processToolInvocations(...)` checks that the tool exists and that the result is an approval. Only then does it call the executable tool and write a `tool_result` stream part.

Denied and failed tools are converted to explicit constants rather than being silently ignored.

## Verify

Inspect `app/lib/services/mcpService.ts` for `_createClients`, `_registerTools`, `processToolCall`, and `processToolInvocations`. Inspect `app/routes/api.chat.ts` for where `toolsWithoutExecute` and `onStepFinish` are passed into streaming options.

Evidence status: Confirmed unless noted.
