# bolt.diy repo-docs

bolt.diy is a browser-based AI app builder. The useful first model is a streaming chat route: a user message reaches a Remix action, the server may summarize and select project files, MCP tool results are folded into the message list, and a model stream becomes a text-event response to the browser.

Start with [chat to stream](walkthroughs/chat-to-stream.md). It follows the observable path in `app/routes/api.chat.ts`. If you already know the request path, read [context buffer](modules/context-buffer.md) for file selection or [MCP tool loop](modules/mcp-tool-loop.md) for tool approval and result handling.

Exact source links live in [source evidence](references/source-evidence.md). Repeated terms are in [glossary](glossary.md).

Scope note: this pack covers the chat API path only. It does not cover deployment integrations, Electron packaging, UI components, or every provider implementation.

Evidence status: Confirmed unless noted.
